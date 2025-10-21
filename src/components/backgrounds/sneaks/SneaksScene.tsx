"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
    Group,
    BufferGeometry,
    Float32BufferAttribute,
    ShaderMaterial,
    Mesh,
    LineSegments,
    Color,
    DoubleSide
} from "three";

interface SneaksSceneProps {
    lineCount?: number;
    color?: string;
    opacity?: number;
    speed?: number;
}

export default function SneaksScene({
    lineCount = 12,
    color = "#64D2FF",
    opacity = 0.15,
    speed = 0.2
}: SneaksSceneProps) {
    const groupRef = useRef<Group>(null);
    const bandMaterialRef = useRef<ShaderMaterial | null>(null);
    const lineMaterialRef = useRef<ShaderMaterial | null>(null);

    useEffect(() => {
        const group = new Group();

        // Create single merged geometry for all colored bands
        const allBandPositions: number[] = [];
        const allBandUvs: number[] = [];
        const allBandIndices: number[] = [];
        let vertexOffset = 0;

        for (let i = 0; i < lineCount - 1; i++) {
            const segments = 200;
            const y1 = (i / lineCount) * 20 - 10;
            const y2 = ((i + 1) / lineCount) * 20 - 10;

            // Generate vertices for the band
            for (let j = 0; j <= segments; j++) {
                const x = (j / segments) * 40 - 20;
                const u = j / segments;

                // Top row
                allBandPositions.push(x, y1, 0);
                allBandUvs.push(u, 0, i); // u, v, lineIndex

                // Bottom row
                allBandPositions.push(x, y2, 0);
                allBandUvs.push(u, 1, i);
            }

            // Create triangles
            for (let j = 0; j < segments; j++) {
                const base = vertexOffset + j * 2;
                allBandIndices.push(base, base + 1, base + 2);
                allBandIndices.push(base + 1, base + 3, base + 2);
            }

            vertexOffset += (segments + 1) * 2;
        }

        // Create single geometry for all bands
        const bandGeometry = new BufferGeometry();
        bandGeometry.setAttribute("position", new Float32BufferAttribute(allBandPositions, 3));
        bandGeometry.setAttribute("aUvAndIndex", new Float32BufferAttribute(allBandUvs, 3));
        bandGeometry.setIndex(allBandIndices);

        // Create single shader material for all bands
        const bandMaterial = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uLineCount: { value: lineCount },
                uColor1: { value: new Color("#007AFF") }, // Apple Blue
                uColor2: { value: new Color("#AF52DE") }, // Apple Purple
                uColor3: { value: new Color("#FF9500") }, // Apple Orange
                uColor4: { value: new Color("#64D2FF") }, // Cyan
                uOpacity: { value: opacity * 0.8 }
            },
            vertexShader: `
                uniform float uTime;
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
                    float wave1 = sin(pos.x * 0.3 + uTime * 1.2 + vLineIndex * 0.5) * 0.8;
                    float wave2 = sin(pos.x * 0.5 - uTime * 0.8 + vLineIndex * 0.3) * 0.5;
                    float wave3 = cos(pos.x * 0.2 + uTime * 0.6 + vLineIndex * 0.7) * 0.3;
                    
                    float totalWave = wave1 + wave2 + wave3;
                    
                    // Apply wave motion to Y, scaled by v coordinate (0 or 1)
                    pos.y += totalWave * (1.0 - vUv.y * 0.5);
                    
                    // Add Z-depth variation for 3D effect
                    pos.z += sin(pos.x * 0.4 + uTime * 1.0 + vLineIndex * 0.4) * 0.5;
                    
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
            side: DoubleSide,
            depthWrite: false
        });

        bandMaterialRef.current = bandMaterial;
        const bandMesh = new Mesh(bandGeometry, bandMaterial);
        group.add(bandMesh);

        // Create single merged geometry for all lines
        const lineGeometry = new BufferGeometry();
        const positions: number[] = [];
        const lineIndices: number[] = [];
        const lineIndexAttribute: number[] = [];

        for (let i = 0; i < lineCount; i++) {
            const segments = 200;
            const y = (i / lineCount) * 20 - 10;
            const startVertex = positions.length / 3;

            for (let j = 0; j <= segments; j++) {
                const x = (j / segments) * 40 - 20;
                positions.push(x, y, 0);
                lineIndexAttribute.push(i); // Store line index separately
            }

            // Create line indices for this line segment
            for (let j = 0; j < segments; j++) {
                lineIndices.push(startVertex + j, startVertex + j + 1);
            }
        }

        lineGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
        lineGeometry.setAttribute("aLineIndex", new Float32BufferAttribute(lineIndexAttribute, 1));
        lineGeometry.setIndex(lineIndices);

        // Create single shader material for all lines
        const lineMaterial = new ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(color) },
                uOpacity: { value: opacity * 0.4 }
            },
            vertexShader: `
                uniform float uTime;
                attribute float aLineIndex;
                
                void main() {
                    vec3 pos = position;
                    
                    float wave1 = sin(pos.x * 0.3 + uTime * 1.2 + aLineIndex * 0.5) * 0.8;
                    float wave2 = sin(pos.x * 0.5 - uTime * 0.8 + aLineIndex * 0.3) * 0.5;
                    float wave3 = cos(pos.x * 0.2 + uTime * 0.6 + aLineIndex * 0.7) * 0.3;
                    
                    pos.y += wave1 + wave2 + wave3;
                    pos.z += sin(pos.x * 0.4 + uTime * 1.0 + aLineIndex * 0.4) * 0.5;
                    
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

        lineMaterialRef.current = lineMaterial;
        const lineSegments = new LineSegments(lineGeometry, lineMaterial);
        group.add(lineSegments);

        if (groupRef.current) {
            // Clear existing children
            while (groupRef.current.children.length > 0) {
                groupRef.current.remove(groupRef.current.children[0]);
            }
            // Add new group
            groupRef.current.add(group);
        }

        return () => {
            bandMaterial.dispose();
            bandGeometry.dispose();
            lineMaterial.dispose();
            lineGeometry.dispose();
            group.clear();
        };
    }, [lineCount, color, opacity]);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime() * speed;

        // Update only two materials instead of looping through many
        if (bandMaterialRef.current) {
            bandMaterialRef.current.uniforms.uTime.value = time;
        }
        if (lineMaterialRef.current) {
            lineMaterialRef.current.uniforms.uTime.value = time;
        }

        // Gentle rotation of entire group
        groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.03;
    });

    return <group ref={groupRef} />;
}
