"use client";

import { useState, ReactNode } from "react";
import { Canvas } from "@react-three/offscreen";
import { Canvas as FallbackCanvas } from "@react-three/fiber";
import { useCanvasVisibility } from "@/hooks/useCanvasVisibility";

/**
 * Generic background component that handles offscreen canvas rendering with web workers.
 *
 * Features:
 * - Automatic worker creation and management
 * - 3-level fallback system for maximum compatibility
 * - Visibility detection for performance optimization
 * - Comprehensive error handling
 *
 * Fallback Levels:
 * - Level 1 (Best): Offscreen canvas with worker (Chrome, Firefox, Edge)
 * - Level 2 (Good): Main thread canvas (Safari, or if worker fails)
 * - Level 3 (Simple): Custom background (SSR, errors, if provided)
 *
 * Usage:
 * 1. Create a Scene component (e.g., MyScene.tsx)
 * 2. Create a worker file (e.g., my-scene.worker.tsx)
 * 3. Use CanvasBackground with workerUrl and fallbackScene props
 *
 * Example:
 * ```tsx
 * // my-scene.worker.tsx
 * import { render } from "@react-three/offscreen";
 * import MyScene from "./MyScene";
 * render(<MyScene />);
 *
 * // MyBackground.tsx
 * const worker = useMemo(
 *   () => new Worker(new URL("./my-scene.worker.tsx", import.meta.url), { type: "module" }),
 *   []
 * );
 *
 * <CanvasBackground
 *   worker={worker}
 *   fallbackScene={<MyScene />}
 *   fallbackBackground={<div className="bg-gradient..." />}
 *   camera={{ position: [0, 0, 10], fov: 60 }}
 * />
 * ```
 */
interface CanvasBackgroundProps {
    className?: string;
    worker?: Worker | null;
    fallbackScene: ReactNode;
    fallbackBackground?: ReactNode;
    camera?: {
        position?: [number, number, number];
        fov?: number;
    };
    gl?: {
        alpha?: boolean;
        antialias?: boolean;
        powerPreference?: "high-performance" | "low-power" | "default";
    };
    useOffscreen?: boolean;
    onError?: () => void;
}

export default function CanvasBackground({
    className = "",
    worker,
    fallbackScene,
    fallbackBackground,
    camera = { position: [0, 0, 10], fov: 60 },
    gl = {
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
    },
    useOffscreen = true,
    onError
}: CanvasBackgroundProps) {
    const [hasError, setHasError] = useState(false);
    const { ref: containerRef, shouldAnimate, isClient } = useCanvasVisibility<HTMLDivElement>({ threshold: 0.1 });

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    // Level 3 Fallback: Show simple background for SSR or when there's an error (if provided)
    if (!isClient) {
        return fallbackBackground ? fallbackBackground : null;
    }

    // Level 3 Fallback: Show simple background if canvas rendering has errored (if provided)
    if (hasError && fallbackBackground) {
        return fallbackBackground;
    }

    // Level 2 Fallback: Use main thread canvas if worker unavailable, offscreen disabled, or error occurred
    if (!worker || !useOffscreen || hasError) {
        return (
            <div ref={containerRef} className={`absolute -z-10 top-0 bottom-0 left-0 right-0 ${className}`}>
                <FallbackCanvas
                    camera={camera}
                    onError={handleError}
                    gl={gl}
                    frameloop={shouldAnimate ? "always" : "demand"}
                >
                    {fallbackScene}
                </FallbackCanvas>
            </div>
        );
    }

    // Level 1: Use offscreen canvas with worker (best performance)
    return (
        <div ref={containerRef} className={`absolute -z-10 top-0 bottom-0 left-0 right-0 ${className}`}>
            <Canvas
                worker={worker}
                fallback={fallbackScene}
                camera={camera}
                gl={gl}
                frameloop={shouldAnimate ? "always" : "demand"}
            />
        </div>
    );
}
