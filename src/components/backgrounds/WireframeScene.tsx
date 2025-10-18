"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Morphing wireframe grid using morph targets
interface WireframeSceneProps {
    position: [number, number, number];
    scale?: number;
    divisions?: number;
    speed?: number;
}

export default function WireframeScene({ position, scale = 1, divisions = 60, speed = 0.5 }: WireframeSceneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [material, setMaterial] = useState<THREE.MeshBasicMaterial | null>(null);

    useEffect(() => {
        // Create base wireframe geometry
        const baseGeometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const triangleIndices: number[] = [];

        const size = 25 * scale;
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

        setGeometry(baseGeometry);

        // Create wireframe material that supports morphing
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: "#64D2FF",
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });

        setMaterial(wireframeMaterial);

        return () => {
            wireframeMaterial.dispose();
            baseGeometry.dispose();
        };
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
        meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.3 * maxRotation;
        meshRef.current.rotation.x = Math.sin(time * 0.2 + Math.PI / 4) * maxRotation * 0.3;
        meshRef.current.rotation.y = Math.sin(time * 0.25 + Math.PI / 2) * maxRotation * 0.3;

        // Gentle floating
        meshRef.current.position.y += Math.sin(time * 0.05) * 0.0001;
    });

    if (!geometry || !material) {
        return null;
    }

    return <mesh ref={meshRef} geometry={geometry} material={material} position={position} />;
}
