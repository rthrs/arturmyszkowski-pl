"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface FluidBackgroundProps {
    className?: string;
}

function FluidPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.PlaneGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

    useEffect(() => {
        // Create much larger geometry to cover full hero section
        const planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        setGeometry(planeGeometry);

        // Create fluid shader material
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color("#007AFF") }, // Apple Blue
                uColor2: { value: new THREE.Color("#AF52DE") }, // Apple Purple
                uColor3: { value: new THREE.Color("#FF3B30") }, // Apple Red
                uColor4: { value: new THREE.Color("#FF9500") }, // Apple Orange
                uColor5: { value: new THREE.Color("#30D158") }, // Apple Green
                uColor6: { value: new THREE.Color("#64D2FF") }, // Apple Cyan
            },
            vertexShader: `
        varying vec2 vUv;
        varying float vScreenY;
        
        void main() {
          vUv = uv;
          vec4 clipPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = clipPosition;
          // Convert to NDC and then to 0-1 screen space Y
          float ndcY = clipPosition.y / clipPosition.w;
          vScreenY = ndcY * 0.5 + 0.5;
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        varying vec2 vUv;
        varying float vScreenY;
        
        // Liquid-like gradient function - slowed down
        float liquidGradient(vec2 uv, vec2 center, float radius, float time) {
          vec2 dist = uv - center;
          float wave = sin(length(dist) * 8.0 - time * 0.8) * 0.5 + 0.5;
          float falloff = 1.0 - smoothstep(0.0, radius, length(dist));
          return wave * falloff;
        }
        
        // Smooth liquid flow - slowed down
        vec2 liquidFlow(vec2 uv, float time) {
          return vec2(
            sin(uv.y * 2.0 + time * 0.3) * 0.08,
            cos(uv.x * 2.0 + time * 0.2) * 0.08
          );
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Create liquid-like flowing centers concentrated in center area for smooth blending
          vec2 center1 = vec2(0.4, 0.4) + liquidFlow(uv, uTime * 0.2);
          vec2 center2 = vec2(0.6, 0.6) + liquidFlow(uv, uTime * 0.25);
          vec2 center3 = vec2(0.5, 0.3) + liquidFlow(uv, uTime * 0.15);
          vec2 center4 = vec2(0.3, 0.7) + liquidFlow(uv, uTime * 0.3);
          vec2 center5 = vec2(0.7, 0.3) + liquidFlow(uv, uTime * 0.22);
          vec2 center6 = vec2(0.45, 0.75) + liquidFlow(uv, uTime * 0.18);
          vec2 center7 = vec2(0.65, 0.45) + liquidFlow(uv, uTime * 0.28);
          vec2 center8 = vec2(0.35, 0.55) + liquidFlow(uv, uTime * 0.24);
          
          // Create liquid gradient blobs - slowed down
          float liquid1 = liquidGradient(uv, center1, 0.35, uTime * 0.4);
          float liquid2 = liquidGradient(uv, center2, 0.32, uTime * 0.5);
          float liquid3 = liquidGradient(uv, center3, 0.28, uTime * 0.3);
          float liquid4 = liquidGradient(uv, center4, 0.25, uTime * 0.6);
          float liquid5 = liquidGradient(uv, center5, 0.26, uTime * 0.35);
          float liquid6 = liquidGradient(uv, center6, 0.3, uTime * 0.45);
          float liquid7 = liquidGradient(uv, center7, 0.27, uTime * 0.38);
          float liquid8 = liquidGradient(uv, center8, 0.29, uTime * 0.42);
          
          // Blend liquid gradients smoothly
          float totalLiquid = liquid1 + liquid2 * 0.8 + liquid3 * 0.6 + liquid4 * 0.7 + liquid5 * 0.9 + liquid6 * 0.75 + liquid7 * 0.85 + liquid8 * 0.65;
          totalLiquid = smoothstep(0.0, 1.0, totalLiquid);
          
          // Create liquid color mixing with more colors
          vec3 color1 = mix(uColor1, uColor2, liquid1);
          vec3 color2 = mix(uColor3, uColor4, liquid2);
          vec3 color3 = mix(uColor5, uColor6, liquid3);
          vec3 color4 = mix(uColor1, uColor3, liquid4);
          vec3 color5 = mix(uColor2, uColor5, liquid5);
          vec3 color6 = mix(uColor4, uColor6, liquid6);
          vec3 color7 = mix(uColor1, uColor5, liquid7);
          vec3 color8 = mix(uColor3, uColor6, liquid8);
          
          // Blend colors based on liquid intensity
          vec3 finalColor = mix(color1, color2, liquid2);
          finalColor = mix(finalColor, color3, liquid3 * 0.6);
          finalColor = mix(finalColor, color4, liquid4 * 0.4);
          finalColor = mix(finalColor, color5, liquid5 * 0.5);
          finalColor = mix(finalColor, color6, liquid6 * 0.45);
          finalColor = mix(finalColor, color7, liquid7 * 0.35);
          finalColor = mix(finalColor, color8, liquid8 * 0.3);
          
          // Add liquid-like glow and smoothness
          float glow = sin(totalLiquid * 3.14159) * 0.3 + 0.7;
          finalColor *= glow;
          
          // Create smooth fade-out towards center for background blending
          float centerDistance = length(uv - vec2(0.5, 0.5));
          float fadeOut = 1.0 - smoothstep(0.3, 0.8, centerDistance);

          // Screen-space bottom fade (align with canvas). 0.0 at bottom, 1.0 at top
          // Make band a bit smaller
          float bottomMask = smoothstep(0.0, 0.2, vScreenY);
          
          // Liquid-like opacity with smooth transitions and edge fading
          float alpha = (totalLiquid * 0.22 + 0.08) * fadeOut * bottomMask;
          alpha = clamp(alpha, 0.0, 0.35);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.NormalBlending,
        });

        setMaterial(shaderMaterial);
    }, []);

    useFrame((state) => {
        if (material) {
            // Slow down animation when page is not visible
            material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.3;
        }
    });

    if (!geometry || !material) {
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            material={material}
            position={[0, 0, -8]}
        />
    );
}

// Floating geometric shapes for modern tech aesthetic
function MorphingGeometry({
    position,
    scale = 1,
    speed = 1,
}: {
    position: [number, number, number];
    scale?: number;
    speed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

    useEffect(() => {
        // Create icosahedron geometry that will morph
        const geo = new THREE.IcosahedronGeometry(0.8 * scale, 2);
        setGeometry(geo);

        // Create morphing shader material
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uOpacity: { value: 0.15 },
                uColor: { value: new THREE.Color("#64D2FF") }, // Apple Cyan
            },
            vertexShader: `
                uniform float uTime;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    vPosition = position;
                    vNormal = normal;
                    
                    // Subtle morphing animation
                    vec3 pos = position;
                    pos += normal * sin(uTime * 0.5 + position.x * 2.0) * 0.1;
                    pos += normal * cos(uTime * 0.3 + position.y * 3.0) * 0.08;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform float uOpacity;
                uniform vec3 uColor;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    // Create subtle gradient based on position and normal
                    float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
                    float intensity = fresnel * 0.8 + 0.2;
                    
                    // Subtle pulsing effect
                    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
                    
                    gl_FragColor = vec4(uColor * intensity * pulse, uOpacity);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });

        setMaterial(shaderMaterial);
    }, [scale]);

    useFrame((state) => {
        if (material && meshRef.current) {
            material.uniforms.uTime.value =
                state.clock.getElapsedTime() * speed;

            // Subtle rotation
            meshRef.current.rotation.x += 0.002 * speed;
            meshRef.current.rotation.y += 0.003 * speed;

            // Gentle floating motion
            meshRef.current.position.y +=
                Math.sin(state.clock.getElapsedTime() * 0.5 * speed) * 0.002;
        }
    });

    if (!geometry || !material) {
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            material={material}
            position={position}
        />
    );
}

// Morphing wireframe grid using morph targets
function MorphingWireframe({
    position,
    scale = 1,
}: {
    position: [number, number, number];
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.MeshBasicMaterial | null>(null);

    useEffect(() => {
        // Create base wireframe geometry
        const baseGeometry = new THREE.BufferGeometry();
        const points: number[] = [];
        const indices: number[] = [];

        const size = 20 * scale;
        const divisions = 40;
        const step = size / divisions;
        const halfSize = size / 2;

        // Create triangular wireframe pattern
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;
                
                // Create triangles by connecting points
                if (i < divisions && j < divisions) {
                    // Triangle 1: (i,j) -> (i+1,j) -> (i,j+1)
                    points.push(x, y, 0, x + step, y, 0, x, y + step, 0);
                    indices.push(points.length/3 - 3, points.length/3 - 2, points.length/3 - 1);
                    
                    // Triangle 2: (i+1,j) -> (i+1,j+1) -> (i,j+1)
                    points.push(x + step, y, 0, x + step, y + step, 0, x, y + step, 0);
                    indices.push(points.length/3 - 3, points.length/3 - 2, points.length/3 - 1);
                }
            }
        }

        baseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        baseGeometry.setIndex(indices);
        
        // Initialize morph attributes array
        baseGeometry.morphAttributes = {};

        // Create morph target 1: Wave distortion
        const waveGeometry = new THREE.BufferGeometry();
        const wavePoints: number[] = [];
        
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;
                
                if (i < divisions && j < divisions) {
                    // Add wave distortion
                    const waveZ1 = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;
                    const waveZ2 = Math.sin((x + step) * 0.1) * Math.cos(y * 0.1) * 2;
                    const waveZ3 = Math.sin(x * 0.1) * Math.cos((y + step) * 0.1) * 2;
                    
                    wavePoints.push(x, y, waveZ1, x + step, y, waveZ2, x, y + step, waveZ3);
                    
                    const waveZ4 = Math.sin((x + step) * 0.1) * Math.cos(y * 0.1) * 2;
                    const waveZ5 = Math.sin((x + step) * 0.1) * Math.cos((y + step) * 0.1) * 2;
                    const waveZ6 = Math.sin(x * 0.1) * Math.cos((y + step) * 0.1) * 2;
                    
                    wavePoints.push(x + step, y, waveZ4, x + step, y + step, waveZ5, x, y + step, waveZ6);
                }
            }
        }

        // Create morph target 2: Spherical distortion
        const sphereGeometry = new THREE.BufferGeometry();
        const spherePoints: number[] = [];
        
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;
                
                if (i < divisions && j < divisions) {
                    // Create spherical distortion
                    const dist1 = Math.sqrt(x * x + y * y);
                    const sphereZ1 = Math.sqrt(Math.max(0, 100 - dist1 * 0.1)) - 10;
                    const sphereZ2 = Math.sqrt(Math.max(0, 100 - ((x + step) * (x + step) + y * y) * 0.1)) - 10;
                    const sphereZ3 = Math.sqrt(Math.max(0, 100 - (x * x + (y + step) * (y + step)) * 0.1)) - 10;
                    
                    spherePoints.push(x, y, sphereZ1, x + step, y, sphereZ2, x, y + step, sphereZ3);
                    
                    const sphereZ4 = Math.sqrt(Math.max(0, 100 - ((x + step) * (x + step) + y * y) * 0.1)) - 10;
                    const sphereZ5 = Math.sqrt(Math.max(0, 100 - ((x + step) * (x + step) + (y + step) * (y + step)) * 0.1)) - 10;
                    const sphereZ6 = Math.sqrt(Math.max(0, 100 - (x * x + (y + step) * (y + step)) * 0.1)) - 10;
                    
                    spherePoints.push(x + step, y, sphereZ4, x + step, y + step, sphereZ5, x, y + step, sphereZ6);
                }
            }
        }

        // Create morph target 3: Twisted distortion
        const twistGeometry = new THREE.BufferGeometry();
        const twistPoints: number[] = [];
        
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;
                
                if (i < divisions && j < divisions) {
                    // Create twisted distortion
                    const angle1 = Math.atan2(y, x) + x * 0.05;
                    const twistZ1 = Math.sin(angle1 * 3) * 1.5;
                    const angle2 = Math.atan2(y, x + step) + (x + step) * 0.05;
                    const twistZ2 = Math.sin(angle2 * 3) * 1.5;
                    const angle3 = Math.atan2(y + step, x) + x * 0.05;
                    const twistZ3 = Math.sin(angle3 * 3) * 1.5;
                    
                    twistPoints.push(x, y, twistZ1, x + step, y, twistZ2, x, y + step, twistZ3);
                    
                    const angle4 = Math.atan2(y, x + step) + (x + step) * 0.05;
                    const twistZ4 = Math.sin(angle4 * 3) * 1.5;
                    const angle5 = Math.atan2(y + step, x + step) + (x + step) * 0.05;
                    const twistZ5 = Math.sin(angle5 * 3) * 1.5;
                    const angle6 = Math.atan2(y + step, x) + x * 0.05;
                    const twistZ6 = Math.sin(angle6 * 3) * 1.5;
                    
                    twistPoints.push(x + step, y, twistZ4, x + step, y + step, twistZ5, x, y + step, twistZ6);
                }
            }
        }

        // Set up morph targets
        baseGeometry.morphAttributes.position = [
            new THREE.Float32BufferAttribute(wavePoints, 3),
            new THREE.Float32BufferAttribute(spherePoints, 3),
            new THREE.Float32BufferAttribute(twistPoints, 3)
        ];

        // Ensure the geometry is properly computed
        baseGeometry.computeBoundingBox();
        baseGeometry.computeBoundingSphere();

        setGeometry(baseGeometry);

        // Create wireframe material that supports morphing
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: "#64D2FF",
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });
        
        // Enable morph targets on the material (TypeScript workaround)
        (wireframeMaterial as any).morphTargets = true;

        setMaterial(wireframeMaterial);
    }, [scale]);

    // Initialize morphTargetInfluences when mesh is created
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.morphTargetInfluences = [0, 0, 0];
        }
    }, [geometry, material]);

    useFrame((state) => {
        if (meshRef.current && geometry) {
            const time = state.clock.getElapsedTime();
            
            // Initialize morphTargetInfluences if not already set
            if (!meshRef.current.morphTargetInfluences) {
                meshRef.current.morphTargetInfluences = [0, 0, 0];
            }
            
            // Only animate if morph targets are properly set up
            if (meshRef.current.morphTargetInfluences.length >= 3) {
                // Animate between different morph targets
                const morph1 = (Math.sin(time * 0.3) + 1) * 0.5;
                const morph2 = (Math.sin(time * 0.4 + Math.PI / 3) + 1) * 0.5;
                const morph3 = (Math.sin(time * 0.5 + Math.PI * 2 / 3) + 1) * 0.5;
                
                meshRef.current.morphTargetInfluences[0] = morph1;
                meshRef.current.morphTargetInfluences[1] = morph2;
                meshRef.current.morphTargetInfluences[2] = morph3;
            }

            // Subtle rotation
            meshRef.current.rotation.z += 0.0001;
            meshRef.current.rotation.x += 0.00005;
            meshRef.current.rotation.y += 0.00008;

            // Gentle floating
            meshRef.current.position.y += Math.sin(time * 0.05) * 0.0001;
        }
    });

    if (!geometry || !material) {
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            material={material}
            position={position}
        />
    );
}

// Morphing triangles with per-vertex independent noise
function MorphingTriangles({
    position,
    scale = 1,
    speed = 1,
}: {
    position: [number, number, number];
    scale?: number;
    speed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

    useEffect(() => {
        // Create more triangular geometry with proper UV coordinates
        const triangleGeometry = new THREE.BufferGeometry();
        
        // Create multiple triangles with different shapes and sizes
        const vertices: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];
        
        // Generate 3-4 different triangle shapes
        const triangleShapes = [
            // Sharp triangle
            [-0.4, -0.4, 0, 0.4, -0.4, 0, 0.0, 0.6, 0],
            // Wide triangle  
            [-0.6, -0.2, 0, 0.6, -0.2, 0, 0.0, 0.4, 0],
            // Tall triangle
            [-0.3, -0.5, 0, 0.3, -0.5, 0, 0.0, 0.7, 0],
            // Irregular triangle
            [-0.5, -0.3, 0, 0.3, -0.4, 0, -0.1, 0.5, 0]
        ];
        
        let vertexIndex = 0;
        triangleShapes.forEach((shape, shapeIndex) => {
            // Add vertices
            shape.forEach((coord, coordIndex) => {
                if (coordIndex % 3 === 0) {
                    vertices.push(coord * 0.8); // Scale down each triangle
                } else if (coordIndex % 3 === 1) {
                    vertices.push(coord * 0.8);
                } else {
                    vertices.push(coord);
                }
            });
            
            // Add UV coordinates for each vertex (unique per triangle)
            const baseU = (shapeIndex % 2) * 0.5; // 0 or 0.5
            const baseV = Math.floor(shapeIndex / 2) * 0.5; // 0 or 0.5
            
            uvs.push(baseU, baseV);
            uvs.push(baseU + 0.5, baseV);
            uvs.push(baseU + 0.25, baseV + 0.5);
            
            // Add indices
            indices.push(vertexIndex, vertexIndex + 1, vertexIndex + 2);
            vertexIndex += 3;
        });
        
        triangleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        triangleGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        triangleGeometry.setIndex(indices);
        setGeometry(triangleGeometry);

        // Enhanced noise functions for per-vertex morphing
        const noiseFunction = `
            // High-quality 2D noise
            vec2 random2(vec2 st) {
                st = vec2(dot(st, vec2(127.1, 311.7)),
                         dot(st, vec2(269.5, 183.3)));
                return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
            }
            
            // Perlin noise
            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                
                vec2 u = f * f * (3.0 - 2.0 * f);
                
                return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                           mix(dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                           mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                           mix(dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
            }
            
            // Fractal noise with multiple octaves
            float fractalNoise(vec2 st) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                
                for(int i = 0; i < 6; i++) {
                    value += amplitude * noise(st * frequency);
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                
                return value;
            }
            
            // Ridged noise for more organic shapes
            float ridgedNoise(vec2 st) {
                return 1.0 - abs(fractalNoise(st));
            }
        `;

        // Create morphing shader material with per-vertex noise
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uOpacity: { value: 0.12 },
                uColor: { value: new THREE.Color("#64D2FF") },
                uScale: { value: 1.0 },
                uNoiseScale: { value: 3.0 },
                uNoiseIntensity: { value: 0.4 },
                uMorphSpeed: { value: 0.5 },
            },
            vertexShader: `
                uniform float uTime;
                uniform float uScale;
                uniform float uNoiseScale;
                uniform float uNoiseIntensity;
                uniform float uMorphSpeed;
                attribute vec2 uv;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vNoise;
                varying vec2 vUv;
                
                ${noiseFunction}
                
                void main() {
                    vPosition = position;
                    vNormal = normal;
                    vUv = uv;
                    
                    // Create unique noise coordinates for each vertex using UV + time + position
                    vec2 noiseCoord = uv * uNoiseScale + position.xy * 0.5 + uTime * uMorphSpeed;
                    
                    // Different noise types for different effects
                    float noise1 = fractalNoise(noiseCoord);
                    float noise2 = ridgedNoise(noiseCoord + vec2(100.0, 0.0));
                    float noise3 = noise(noiseCoord * 2.0 + vec2(0.0, 100.0));
                    
                    // Combine different noise types
                    float combinedNoise = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
                    vNoise = combinedNoise;
                    
                    // Per-vertex morphing - each vertex moves independently
                    vec3 pos = position;
                    
                    // X displacement - each vertex has unique pattern
                    pos.x += (noise1 - 0.5) * uNoiseIntensity * 0.4;
                    pos.x += sin(uTime * 0.8 + position.y * 2.0 + uv.x * 10.0) * 0.1;
                    
                    // Y displacement - different pattern for each vertex
                    pos.y += (noise2 - 0.5) * uNoiseIntensity * 0.3;
                    pos.y += cos(uTime * 0.6 + position.x * 1.5 + uv.y * 8.0) * 0.08;
                    
                    // Z displacement - creates depth variation
                    pos.z += (noise3 - 0.5) * uNoiseIntensity * 0.2;
                    pos.z += sin(uTime * 1.2 + position.x * position.y * 3.0) * 0.05;
                    
                    // Per-vertex scale variation - each vertex scales differently
                    float vertexScale = 1.0 + (combinedNoise - 0.5) * uNoiseIntensity * 0.6;
                    pos *= uScale * vertexScale;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform float uOpacity;
                uniform vec3 uColor;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vNoise;
                varying vec2 vUv;
                
                void main() {
                    // Create gradient based on position and noise
                    float gradient = length(vPosition) * 0.8 + 0.2;
                    
                    // UV-based color variation for each triangle
                    float uvGradient = length(vUv - vec2(0.5)) * 1.5;
                    
                    // Noise-influenced pulsing effect
                    float pulse = sin(uTime * 2.5 + vNoise * 15.0) * 0.3 + 0.7;
                    
                    // Noise-based color variation
                    float colorNoise = vNoise * 0.4 + 0.6;
                    vec3 finalColor = uColor * gradient * pulse * colorNoise * (1.0 - uvGradient * 0.3);
                    
                    // Noise-based opacity variation
                    float opacityNoise = vNoise * 0.3 + 0.7;
                    
                    gl_FragColor = vec4(finalColor, uOpacity * opacityNoise);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });

        setMaterial(shaderMaterial);
    }, [scale]);

    useFrame((state) => {
        if (material && meshRef.current) {
            const time = state.clock.getElapsedTime() * speed;
            material.uniforms.uTime.value = time;

            // More varied scale animation
            const baseScale = Math.sin(time * 0.3) * 0.4 + 0.6;
            const noiseScale = Math.sin(time * 0.7 + position[0] * 0.8) * 0.3 + 0.7;
            const finalScale = baseScale * noiseScale * scale;
            material.uniforms.uScale.value = finalScale;

            // More organic rotation
            const rotationNoise = Math.sin(time * 0.4 + position[1] * 0.6) * 0.5 + 0.5;
            meshRef.current.rotation.x += (0.0008 + rotationNoise * 0.0003) * speed;
            meshRef.current.rotation.y += (0.0012 + rotationNoise * 0.0005) * speed;
            meshRef.current.rotation.z += (0.001 + rotationNoise * 0.0004) * speed;

            // More varied floating motion
            const floatNoiseX = Math.sin(time * 0.25 + position[0] * 0.6) * 0.4 + 0.6;
            const floatNoiseY = Math.cos(time * 0.35 + position[1] * 0.5) * 0.4 + 0.6;
            const floatNoiseZ = Math.sin(time * 0.2 + position[2] * 0.3) * 0.3 + 0.7;
            
            meshRef.current.position.y += Math.sin(time * 0.4) * 0.0008 * floatNoiseY;
            meshRef.current.position.x += Math.cos(time * 0.3) * 0.0006 * floatNoiseX;
            meshRef.current.position.z += Math.sin(time * 0.18 + position[2] * 0.4) * 0.0004 * floatNoiseZ;
        }
    });

    if (!geometry || !material) {
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            material={material}
            position={position}
        />
    );
}

export default function FluidBackground({
    className = "",
}: FluidBackgroundProps) {
    const [isClient, setIsClient] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsClient(true);
        
        // Pause animations when page is not visible
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    if (!isClient || hasError) {
        // Fallback gradient while loading or on error
        return (
            <div
                className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-orange-500/6" />
            </div>
        );
    }

    return (
        <div
            className={`absolute rotate-[-2deg] top-0 -bottom-8 -inset-x-8  -z-10 ${className}`}
        >
            <div className="w-full h-full">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    style={{ background: "transparent" }}
                    dpr={[1, 1.5]} // Reduced pixel ratio for better performance
                    onError={() => setHasError(true)}
                    gl={{ 
                        alpha: true, 
                        antialias: false, // Disable antialiasing for performance
                        powerPreference: "low-power" // Use integrated GPU
                    }}
                    frameloop={isVisible ? "always" : "demand"} // Pause when not visible
                >
                    <FluidPlane />

                    {/* Morphing wireframe grid with morph targets */}
                    <MorphingWireframe position={[0, 0, -9]} scale={2.0} />

                    {/* Morphing triangles with varying sizes */}
                    <MorphingTriangles position={[-3, 2, -5]} scale={0.8} speed={0.6} />
                    <MorphingTriangles position={[3, -1, -6]} scale={1.2} speed={0.8} />
                    <MorphingTriangles position={[-2, -2, -4]} scale={0.6} speed={1.0} />
                    <MorphingTriangles position={[4, 1, -7]} scale={0.9} speed={0.7} />
                    <MorphingTriangles position={[-1, 3, -5.5]} scale={1.1} speed={0.9} />
                    <MorphingTriangles position={[2, -3, -6.5]} scale={0.7} speed={1.2} />
                </Canvas>
            </div>
        </div>
    );
}
