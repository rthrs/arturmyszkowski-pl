"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface FluidBackgroundProps {
    className?: string;
    speed?: number;
}

function FluidPlane({ speed = 0.3 }: { speed?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

    useEffect(() => {
        // Create fluid shader material
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color("#007AFF") }, // Apple Blue
                uColor2: { value: new THREE.Color("#AF52DE") }, // Apple Purple
                uColor3: { value: new THREE.Color("#FF3B30") }, // Apple Red
                uColor4: { value: new THREE.Color("#FF9500") }, // Apple Orange
                uColor5: { value: new THREE.Color("#30D158") }, // Apple Green
                uColor6: { value: new THREE.Color("#64D2FF") } // Apple Cyan
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
            blending: THREE.NormalBlending
        });

        setMaterial(shaderMaterial);
    }, []);

    useFrame((state) => {
        if (material) {
            // Use speed prop to control animation speed
            material.uniforms.uTime.value = state.clock.getElapsedTime() * speed;
        }
    });

    if (!material) {
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            geometry={new THREE.PlaneGeometry(50, 50, 1, 1)}
            material={material}
            position={[0, 0, -8]}
        />
    );
}

// Morphing wireframe grid using morph targets
function MorphingWireframe({
    position,
    scale = 1,
    divisions = 60,
    speed = 0.5
}: {
    position: [number, number, number];
    scale?: number;
    divisions?: number;
    speed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.MeshBasicMaterial | null>(null);

    useEffect(() => {
        // Create base wireframe geometry
        const baseGeometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const triangleIndices: number[] = [];

        const size = 20 * scale;
        const step = size / divisions;
        const halfSize = size / 2;

        // Create all vertices
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;
                vertices.push(x, y, 0);
            }
        }

        // Create triangles using vertex indices
        for (let i = 0; i < divisions; i++) {
            for (let j = 0; j < divisions; j++) {
                const a = i * (divisions + 1) + j;
                const b = (i + 1) * (divisions + 1) + j;
                const c = i * (divisions + 1) + (j + 1);
                const d = (i + 1) * (divisions + 1) + (j + 1);

                // Create two triangles per quad, alternating pattern
                if ((i + j) % 2 === 0) {
                    triangleIndices.push(a, b, c, b, d, c);
                } else {
                    triangleIndices.push(a, b, d, a, d, c);
                }
            }
        }

        baseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        baseGeometry.setIndex(triangleIndices);

        // Initialize morph attributes array
        baseGeometry.morphAttributes = {};

        // Create morph targets
        const wavePoints: number[] = [];
        const spherePoints: number[] = [];
        const twistPoints: number[] = [];

        // Generate all morph targets in a single loop for efficiency
        for (let i = 0; i <= divisions; i++) {
            for (let j = 0; j <= divisions; j++) {
                const x = -halfSize + i * step;
                const y = -halfSize + j * step;

                // Wave distortion
                const waveZ = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 1.2;
                wavePoints.push(x, y, waveZ);

                // Spherical distortion
                const dist = Math.sqrt(x * x + y * y);
                const sphereZ = Math.sqrt(Math.max(0, 80 - dist * 0.08)) - 8;
                spherePoints.push(x, y, sphereZ);

                // Twisted distortion using smooth spiral pattern
                // Avoid atan2 discontinuity by using a different approach
                const spiralPhase = Math.sqrt(x * x + y * y) * 0.3 + x * 0.1;
                const twistZ = Math.cos(spiralPhase) * 2;
                twistPoints.push(x, y, twistZ);
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

        setMaterial(wireframeMaterial);
    }, [scale, divisions]);

    useFrame((state) => {
        if (!meshRef.current || !geometry) return;

        const time = state.clock.getElapsedTime() * speed;

        // Initialize morphTargetInfluences if not already set
        if (!meshRef.current.morphTargetInfluences) {
            meshRef.current.morphTargetInfluences = [0, 0, 0];
        }

        // Animate between different morph targets
        const morph1 = (Math.sin(time * 0.3) + 1) * 0.5;
        const morph2 = (Math.sin(time * 0.4 + Math.PI / 3) + 1) * 0.5;
        const morph3 = (Math.sin(time * 0.5 + (Math.PI * 2) / 3) + 1) * 0.5;

        meshRef.current.morphTargetInfluences[0] = morph1;
        meshRef.current.morphTargetInfluences[1] = morph2;
        meshRef.current.morphTargetInfluences[2] = morph3;

        const maxRotation = 0.25;

        // Oscillating rotation
        meshRef.current.rotation.z = Math.sin(time * 0.3) * maxRotation;
        meshRef.current.rotation.x = Math.sin(time * 0.2 + Math.PI / 4) * maxRotation * 0.5;
        meshRef.current.rotation.y = Math.sin(time * 0.25 + Math.PI / 2) * maxRotation * 0.3;

        // Gentle floating
        meshRef.current.position.y += Math.sin(time * 0.05) * 0.0001;
    });

    if (!geometry || !material) {
        return null;
    }

    return <mesh ref={meshRef} geometry={geometry} material={material} position={position} />;
}

export default function FluidBackground({ className = "", speed = 0.3 }: FluidBackgroundProps) {
    const [isClient, setIsClient] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsClient(true);

        // Pause animations when page is not visible
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (!isClient || hasError) {
        // Fallback gradient while loading or on error
        return (
            <div className={className}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-orange-500/6" />
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="w-full h-full">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    style={{ background: "transparent" }}
                    dpr={[1, 1.5]} // Reduced pixel ratio for better performance
                    onError={() => setHasError(true)}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "low-power" // Use integrated GPU
                    }}
                    frameloop={isVisible ? "always" : "demand"} // Pause when not visible
                >
                    <FluidPlane speed={speed} />

                    {/* Morphing wireframe grid with morph targets */}
                    <MorphingWireframe position={[0, 0, 0]} scale={1.2} divisions={60} speed={speed} />
                </Canvas>
            </div>
        </div>
    );
}
