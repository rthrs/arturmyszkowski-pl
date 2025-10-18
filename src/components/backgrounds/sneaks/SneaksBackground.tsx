"use client";

import { useMemo } from "react";
import CanvasBackground from "../CanvasBackground";
import SneaksScene from "./SneaksScene";

interface SneaksBackgroundProps {
    className?: string;
    lineCount?: number;
    color?: string;
    opacity?: number;
    speed?: number;
}

export default function SneaksBackground({
    className = "",
    lineCount = 12,
    color = "#64D2FF",
    opacity = 0.15,
    speed = 0.2
}: SneaksBackgroundProps) {
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./sneaks.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                console.warn("Failed to create sneaks worker:", error);
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground
            className={className}
            worker={worker}
            fallbackScene={<SneaksScene lineCount={lineCount} color={color} opacity={opacity} speed={speed} />}
            fallbackBackground={null}
            camera={{ position: [0, 0, 15], fov: 60 }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "low-power"
            }}
            useOffscreen={true}
        />
    );
}
