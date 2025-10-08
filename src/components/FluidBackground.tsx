"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasVisibility } from "@/hooks/useCanvasVisibility";

interface FluidBackgroundProps {
    className?: string;
    speed?: number;
}

type FluidPlaneProps = {
    speed?: number;
};

function FluidPlane({ speed = 0.3 }: FluidPlaneProps) {
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
          float bottomMask = smoothstep(0.0, 0.5, vScreenY);
          
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

// Thin flowing lines overlay
type FlowingLinesProps = {
    lineCount?: number;
    color?: string;
    opacity?: number;
    speed?: number;
};

function FlowingLines({ lineCount = 12, color = "#64D2FF", opacity = 0.08, speed = 0.3 }: FlowingLinesProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [materials, setMaterials] = useState<THREE.ShaderMaterial[]>([]);

    useEffect(() => {
        const group = new THREE.Group();
        const shaderMaterials: THREE.ShaderMaterial[] = [];

        // Add thin vertical lines for definition
        for (let i = 0; i < lineCount; i++) {
            const segments = 200;
            const positions: number[] = [];

            // Create vertical lines (swap x and y)
            const x = (i / lineCount) * 16 - 8; // Reduced from 20 to 16 to fit in viewport
            for (let j = 0; j <= segments; j++) {
                const y = (j / segments) * 20 - 10; // Lines go vertically
                positions.push(x, y, 0);
            }

            const points: THREE.Vector3[] = [];
            for (let j = 0; j < positions.length; j += 3) {
                points.push(new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const curvePoints = curve.getPoints(segments);
            const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

            // Simple line material with wave animation (adapted for vertical lines)
            const lineMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uLineIndex: { value: i },
                    uColor: { value: new THREE.Color(color) },
                    uOpacity: { value: opacity * 0.4 }
                },
                vertexShader: `
                    uniform float uTime;
                    uniform float uLineIndex;
                    
                    void main() {
                        vec3 pos = position;
                        
                        // Wave motion along Y axis (vertical lines)
                        float wave1 = sin(pos.y * 0.3 + uTime * 1.2 + uLineIndex * 0.5) * 0.8;
                        float wave2 = sin(pos.y * 0.5 - uTime * 0.8 + uLineIndex * 0.3) * 0.5;
                        float wave3 = cos(pos.y * 0.2 + uTime * 0.6 + uLineIndex * 0.7) * 0.3;
                        
                        // Apply wave to X (horizontal displacement for vertical lines)
                        pos.x += wave1 + wave2 + wave3;
                        pos.z += sin(pos.y * 0.4 + uTime * 1.0 + uLineIndex * 0.4) * 0.5;
                        
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

        if (groupRef.current) {
            // Clear existing children
            while (groupRef.current.children.length > 0) {
                groupRef.current.remove(groupRef.current.children[0]);
            }
            // Add new group
            groupRef.current.add(group);
        }

        setMaterials(shaderMaterials);

        return () => {
            shaderMaterials.forEach((mat) => mat.dispose());
            group.clear();
        };
    }, [lineCount, color, opacity]);

    useFrame((state) => {
        if (!groupRef.current || materials.length === 0) return;

        const time = state.clock.getElapsedTime() * speed;

        // Update shader uniforms
        materials.forEach((material) => {
            material.uniforms.uTime.value = time;
        });

        // Gentle rotation of entire group
        groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.03;
    });

    return <group ref={groupRef} />;
}

export default function FluidBackground({ className = "", speed = 0.2 }: FluidBackgroundProps) {
    const [hasError, setHasError] = useState(false);
    const { ref: containerRef, shouldAnimate, isClient } = useCanvasVisibility<HTMLDivElement>({ threshold: 0.1 });

    if (hasError || !isClient) {
        // Fallback gradient while loading or on error
        return (
            <div className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-orange-500/6" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                onError={() => setHasError(true)}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "low-power" // Use integrated GPU
                }}
                frameloop={shouldAnimate ? "always" : "demand"}
            >
                <FluidPlane speed={speed} />
                <FlowingLines lineCount={16} speed={speed} opacity={0.35} color="#64D2FF" />
            </Canvas>
        </div>
    );
}
