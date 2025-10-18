"use client";

import { useMemo } from "react";
import CanvasBackground from "./CanvasBackground";
import WireframeScene from "./WireframeScene";

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

export default function WireframeBackground({
    className = "",
    position = [-2, 0, 0],
    divisions = 60,
    cameraPosition = [0, 0, 8],
    fov = 75,
    speed = 0.2
}: WireframeBackgroundProps) {
    // Create worker instance with proper URL resolution
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./wireframe.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                console.warn("Failed to create wireframe worker:", error);
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground
            className={className}
            worker={worker}
            fallbackScene={<WireframeScene position={position} scale={1.2} divisions={divisions} speed={speed} />}
            fallbackBackground={null}
            camera={{ position: cameraPosition, fov }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "low-power"
            }}
            useOffscreen={true}
        />
    );
}
