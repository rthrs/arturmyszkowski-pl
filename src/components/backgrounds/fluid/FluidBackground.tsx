"use client";

import { useMemo } from "react";
import CanvasBackground from "../CanvasBackground";
import FluidScene from "./FluidScene";

interface FluidBackgroundProps {
    className?: string;
    speed?: number;
}

export default function FluidBackground({ className = "", speed = 0.2 }: FluidBackgroundProps) {
    const worker = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return new Worker(new URL("./fluid.worker.tsx", import.meta.url), { type: "module" });
            } catch (error) {
                console.warn("Failed to create fluid worker:", error);
                return null;
            }
        }
        return null;
    }, []);

    return (
        <CanvasBackground
            className={className}
            worker={worker}
            fallbackScene={<FluidScene speed={speed} />}
            fallbackBackground={
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-orange-500/6" />
            }
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "low-power"
            }}
            useOffscreen={true}
        />
    );
}
