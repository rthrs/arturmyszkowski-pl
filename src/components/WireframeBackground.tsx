"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface WireframeBackgroundProps {
    className?: string;
    position?: [number, number, number];
    color?: string;
    opacity?: number;
    size?: number;
    divisions?: number;
    cameraPosition?: [number, number, number];
    fov?: number;
    dpr?: [number, number];
    speed?: number;
}

function WireframeMesh({
    position = [0, 0, -3],
    color = "#64D2FF",
    opacity = 0.075,
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

export default function WireframeBackground({
    className = "",
    position = [0, 0, -3],
    color = "#64D2FF",
    opacity = 0.1,
    size = 25,
    divisions = 60,
    cameraPosition = [0, 0, 8],
    fov = 75,
    dpr = [1, 1.5],
    speed = 0.4
}: WireframeBackgroundProps) {
    return (
        <div className={`absolute top-0 bottom-0 w-full -z-10 ${className}`}>
            <Canvas
                camera={{ position: cameraPosition, fov }}
                style={{ background: "transparent" }}
                dpr={dpr}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "low-power"
                }}
            >
                <WireframeMesh
                    position={position}
                    color={color}
                    opacity={opacity}
                    size={size}
                    divisions={divisions}
                    speed={speed}
                />
            </Canvas>
        </div>
    );
}
