"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasVisibility } from "@/hooks/useCanvasVisibility";

interface WireframeBackgroundProps {
    className?: string;
    position?: [number, number, number];
    color?: string;
    opacity?: number;
    size?: number;
    divisions?: number;
    cameraPosition?: [number, number, number];
    fov?: number;
    speed?: number;
}

function WireframeMesh({
    position = [0, 0, -3],
    color = "#64D2FF",
    opacity = 1,
    size = 25,
    divisions = 60,
    speed = 0.4
}: {
    position: [number, number, number];
    color: string;
    opacity: number;
    size: number;
    divisions: number;
    speed: number;
}) {
    const gridRef = useRef<THREE.LineSegments>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [originalPositions, setOriginalPositions] = useState<Float32Array | null>(null);

    useEffect(() => {
        // Create grid geometry
        const gridGeometry = new THREE.BufferGeometry();
        const points: number[] = [];

        const step = size / divisions;
        const halfSize = size / 2;

        // Grid lines
        for (let i = 0; i <= divisions; i++) {
            const x = -halfSize + i * step;
            points.push(x, -halfSize, 0, x, halfSize, 0);
            points.push(-halfSize, -halfSize + i * step, 0, halfSize, -halfSize + i * step, 0);
        }

        const positions = new THREE.Float32BufferAttribute(points, 3);
        gridGeometry.setAttribute("position", positions);
        setOriginalPositions(positions.array as Float32Array);
        setGeometry(gridGeometry);
    }, [size, divisions]);

    useFrame((state) => {
        if (gridRef.current && geometry && originalPositions) {
            // Use speed prop to control animation speed
            const time = state.clock.getElapsedTime() * speed;

            // Get the position attribute
            const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
            const positions = positionAttribute.array as Float32Array;

            // Create cloth-like morphing effect - reduced complexity
            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const y = originalPositions[i + 1];

                // Simplified waves for better performance
                const windWave1 = Math.sin(x * 0.3 + time * 0.6) * Math.cos(y * 0.15) * 1.5;
                const windWave2 = Math.cos(x * 0.25 + y * 0.3 + time * 0.4) * 1.0;
                const ripple1 = Math.sin(x * 0.6 + time * 0.8) * Math.cos(y * 0.4 + time * 0.3) * 0.5;

                // Combine waves for cloth-like movement
                positions[i + 2] = windWave1 + windWave2 + ripple1;
            }

            // Mark the attribute as needing update
            positionAttribute.needsUpdate = true;

            // Slight rotation to fit section edges
            gridRef.current.rotation.z = 2 * (Math.PI / 180);
        }
    });

    if (!geometry) {
        return null;
    }

    return (
        <lineSegments ref={gridRef} geometry={geometry} position={position}>
            <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineSegments>
    );
}

// Morphing wireframe grid using morph targets
type MorphingWireframeProps = {
    position: [number, number, number];
    scale?: number;
    divisions?: number;
    speed?: number;
};

function MorphingWireframe({ position, scale = 1, divisions = 60, speed = 0.5 }: MorphingWireframeProps) {
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

export default function WireframeBackground({
    className = "",
    position = [0, 0, 0],
    divisions = 60,
    cameraPosition = [0, 0, 8],
    fov = 75,
    speed = 0.2
}: WireframeBackgroundProps) {
    const [hasError, setHasError] = useState(false);
    const { ref: containerRef, shouldAnimate, isClient } = useCanvasVisibility<HTMLDivElement>({ threshold: 0.1 });

    if (hasError || !isClient) {
        return null;
    }
    return (
        <div ref={containerRef} className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${className}`}>
            <Canvas
                camera={{ position: cameraPosition, fov }}
                onError={() => setHasError(true)}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "low-power" // Use integrated GPU
                }}
                frameloop={shouldAnimate ? "always" : "demand"}
            >
                <MorphingWireframe position={position} scale={1.2} divisions={divisions} speed={speed} />
            </Canvas>
        </div>
    );
}
