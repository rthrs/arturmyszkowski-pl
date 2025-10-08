/**
 * Web Worker for SneaksBackground - Handles all WebGL rendering and geometry calculations off the main thread
 * This worker uses OffscreenCanvas to perform GPU-accelerated rendering without blocking the main thread
 */

import * as THREE from "three";

interface WorkerConfig {
    lineCount: number;
    color: string;
    opacity: number;
    speed: number;
    width: number;
    height: number;
}

interface WorkerMessage {
    type: "init" | "resize" | "config" | "start" | "stop";
    canvas?: OffscreenCanvas;
    config?: Partial<WorkerConfig>;
    width?: number;
    height?: number;
}

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let materials: THREE.ShaderMaterial[] = [];
let group: THREE.Group | null = null;
let clock: THREE.Clock | null = null;
let animationId: number | null = null;
const config: WorkerConfig = {
    lineCount: 12,
    color: "#64D2FF",
    opacity: 0.15,
    speed: 0.2,
    width: 800,
    height: 600
};

/**
 * Creates the geometry for flowing lines with animated bands
 */
function createGeometry() {
    if (!scene) return;

    // Clear existing geometry
    if (group) {
        group.clear();
        scene.remove(group);
    }

    materials.forEach((mat) => mat.dispose());
    materials = [];

    group = new THREE.Group();
    const shaderMaterials: THREE.ShaderMaterial[] = [];

    // Create colored bands between lines
    for (let i = 0; i < config.lineCount - 1; i++) {
        const segments = 200;
        const positions: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        // Create two parallel curves for top and bottom of the band
        const y1 = (i / config.lineCount) * 20 - 10;
        const y2 = ((i + 1) / config.lineCount) * 20 - 10;

        // Generate vertices for the band (two rows of vertices)
        for (let j = 0; j <= segments; j++) {
            const x = (j / segments) * 40 - 20;
            const u = j / segments;

            // Top row
            positions.push(x, y1, 0);
            uvs.push(u, 0, i); // u, v, lineIndex

            // Bottom row
            positions.push(x, y2, 0);
            uvs.push(u, 1, i);
        }

        // Create triangles between the two rows
        for (let j = 0; j < segments; j++) {
            const base = j * 2;
            // Triangle 1
            indices.push(base, base + 1, base + 2);
            // Triangle 2
            indices.push(base + 1, base + 3, base + 2);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("aUvAndIndex", new THREE.Float32BufferAttribute(uvs, 3));
        geometry.setIndex(indices);

        // Create shader material for animated colored bands
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uLineIndex: { value: i },
                uLineCount: { value: config.lineCount },
                uColor1: { value: new THREE.Color("#007AFF") }, // Apple Blue
                uColor2: { value: new THREE.Color("#AF52DE") }, // Apple Purple
                uColor3: { value: new THREE.Color("#FF9500") }, // Apple Orange
                uColor4: { value: new THREE.Color("#64D2FF") }, // Cyan
                uOpacity: { value: config.opacity * 0.8 }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uLineIndex;
                uniform float uLineCount;
                attribute vec3 aUvAndIndex;
                varying vec2 vUv;
                varying float vLineIndex;
                varying float vWaveIntensity;
                
                void main() {
                    vec3 pos = position;
                    vUv = aUvAndIndex.xy;
                    vLineIndex = aUvAndIndex.z;
                    
                    // Create flowing wave motion with multiple frequencies
                    float wave1 = sin(pos.x * 0.3 + uTime * 1.2 + uLineIndex * 0.5) * 0.8;
                    float wave2 = sin(pos.x * 0.5 - uTime * 0.8 + uLineIndex * 0.3) * 0.5;
                    float wave3 = cos(pos.x * 0.2 + uTime * 0.6 + uLineIndex * 0.7) * 0.3;
                    
                    float totalWave = wave1 + wave2 + wave3;
                    
                    // Apply wave motion to Y, scaled by v coordinate (0 or 1)
                    pos.y += totalWave * (1.0 - vUv.y * 0.5);
                    
                    // Add Z-depth variation for 3D effect
                    pos.z += sin(pos.x * 0.4 + uTime * 1.0 + uLineIndex * 0.4) * 0.5;
                    
                    // Pass wave intensity to fragment shader
                    vWaveIntensity = (totalWave + 1.6) / 3.2;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uColor3;
                uniform vec3 uColor4;
                uniform float uOpacity;
                uniform float uTime;
                uniform float uLineIndex;
                varying vec2 vUv;
                varying float vLineIndex;
                varying float vWaveIntensity;
                
                void main() {
                    // Create flowing gradient based on position along band
                    float gradient = vUv.x + sin(uTime * 0.5 + vLineIndex * 0.3) * 0.2;
                    
                    // Mix colors based on gradient and wave intensity
                    vec3 color1 = mix(uColor1, uColor2, gradient);
                    vec3 color2 = mix(uColor3, uColor4, 1.0 - gradient);
                    vec3 finalColor = mix(color1, color2, vWaveIntensity);
                    
                    // Add vertical gradient for depth
                    float verticalGradient = 1.0 - vUv.y * 0.3;
                    
                    // Add subtle glow based on wave intensity
                    float glow = 1.0 + vWaveIntensity * 0.4;
                    
                    gl_FragColor = vec4(finalColor * glow * verticalGradient, uOpacity);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        shaderMaterials.push(material);

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
    }

    // Add thin lines on top for definition
    for (let i = 0; i < config.lineCount; i++) {
        const segments = 200;
        const positions: number[] = [];

        const y = (i / config.lineCount) * 20 - 10;
        for (let j = 0; j <= segments; j++) {
            const x = (j / segments) * 40 - 20;
            positions.push(x, y, 0);
        }

        const points: THREE.Vector3[] = [];
        for (let j = 0; j < positions.length; j += 3) {
            points.push(new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(segments);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

        // Simple line material
        const lineMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uLineIndex: { value: i },
                uColor: { value: new THREE.Color(config.color) },
                uOpacity: { value: config.opacity * 0.4 }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uLineIndex;
                
                void main() {
                    vec3 pos = position;
                    
                    float wave1 = sin(pos.x * 0.3 + uTime * 1.2 + uLineIndex * 0.5) * 0.8;
                    float wave2 = sin(pos.x * 0.5 - uTime * 0.8 + uLineIndex * 0.3) * 0.5;
                    float wave3 = cos(pos.x * 0.2 + uTime * 0.6 + uLineIndex * 0.7) * 0.3;
                    
                    pos.y += wave1 + wave2 + wave3;
                    pos.z += sin(pos.x * 0.4 + uTime * 1.0 + uLineIndex * 0.4) * 0.5;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float uOpacity;
                
                void main() {
                    gl_FragColor = vec4(uColor, uOpacity);
                }
            `,
            transparent: true,
            depthWrite: false
        });

        shaderMaterials.push(lineMaterial);

        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
    }

    scene.add(group);
    materials = shaderMaterials;
}

/**
 * Initialize the WebGL renderer with OffscreenCanvas
 */
function initialize(canvas: OffscreenCanvas, width: number, height: number) {
    config.width = width;
    config.height = height;

    // Set OffscreenCanvas dimensions BEFORE creating renderer
    // OffscreenCanvas has settable width/height properties
    canvas.width = width;
    canvas.height = height;

    // Create renderer with OffscreenCanvas
    renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
    });
    renderer.setSize(width, height, false); // false = don't update style
    renderer.setClearColor(0x000000, 0);

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // Create clock for animation timing
    clock = new THREE.Clock();

    // Create initial geometry
    createGeometry();

    console.log("[Worker] Initialized WebGL renderer with OffscreenCanvas");
}

/**
 * Resize the canvas and update camera
 */
function resize(width: number, height: number) {
    if (!renderer || !camera) return;

    config.width = width;
    config.height = height;

    // Get the OffscreenCanvas and set its dimensions
    const canvas = renderer.domElement as unknown as OffscreenCanvas;
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
    }

    renderer.setSize(width, height, false); // false = don't update style
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    console.log(`[Worker] Resized to ${width}x${height}`);
}

/**
 * Update configuration and recreate geometry if needed
 */
function updateConfig(newConfig: Partial<WorkerConfig>) {
    const needsGeometryUpdate = newConfig.lineCount !== undefined && newConfig.lineCount !== config.lineCount;

    Object.assign(config, newConfig);

    if (needsGeometryUpdate) {
        createGeometry();
    } else {
        // Just update material uniforms
        materials.forEach((material, idx) => {
            if (material.uniforms.uOpacity) {
                if (idx < (config.lineCount - 1) * 2) {
                    // Band materials
                    material.uniforms.uOpacity.value = config.opacity * 0.8;
                } else {
                    // Line materials
                    material.uniforms.uOpacity.value = config.opacity * 0.4;
                }
            }
            if (material.uniforms.uColor) {
                material.uniforms.uColor.value = new THREE.Color(config.color);
            }
        });
    }

    console.log("[Worker] Config updated:", config);
}

/**
 * Animation loop - runs off the main thread
 */
function animate() {
    if (!renderer || !scene || !camera || !clock || !group) return;

    const time = clock.getElapsedTime() * config.speed;

    // Update shader uniforms
    materials.forEach((material) => {
        if (material.uniforms.uTime) {
            material.uniforms.uTime.value = time;
        }
    });

    // Gentle rotation of entire group
    group.rotation.z = Math.sin(time * 0.2) * 0.05;
    group.rotation.x = Math.sin(time * 0.15) * 0.03;

    // Render the scene
    renderer.render(scene, camera);

    // Continue animation loop
    animationId = requestAnimationFrame(animate);
}

/**
 * Start the animation loop
 */
function start() {
    if (animationId !== null) return; // Already running
    console.log("[Worker] Starting animation");
    animate();
}

/**
 * Stop the animation loop
 */
function stop() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
        console.log("[Worker] Stopped animation");
    }
}

/**
 * Clean up resources
 */
function dispose() {
    stop();

    if (group) {
        group.clear();
    }

    materials.forEach((mat) => mat.dispose());
    materials = [];

    if (renderer) {
        renderer.dispose();
        renderer = null;
    }

    scene = null;
    camera = null;
    clock = null;
    group = null;

    console.log("[Worker] Disposed resources");
}

// Message handler
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const { type, canvas, config: newConfig, width, height } = event.data;

    try {
        switch (type) {
            case "init":
                if (canvas && width && height) {
                    if (newConfig) {
                        Object.assign(config, newConfig);
                    }
                    initialize(canvas, width, height);
                    start();
                }
                break;

            case "resize":
                if (width && height) {
                    resize(width, height);
                }
                break;

            case "config":
                if (newConfig) {
                    updateConfig(newConfig);
                }
                break;

            case "start":
                start();
                break;

            case "stop":
                stop();
                break;

            default:
                console.warn(`[Worker] Unknown message type: ${type}`);
        }
    } catch (error) {
        console.error("[Worker] Error processing message:", error);
        self.postMessage({ type: "error", error: String(error) });
    }
};

// Clean up on worker termination
self.addEventListener("beforeunload", () => {
    dispose();
});

console.log("[Worker] SneaksBackground worker loaded");
