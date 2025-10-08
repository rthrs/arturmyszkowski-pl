"use client";

import { useRef, useEffect, useState } from "react";
import { useCanvasVisibility } from "@/hooks/useCanvasVisibility";

interface SneaksBackgroundProps {
    className?: string;
    lineCount?: number;
    color?: string;
    opacity?: number;
    speed?: number;
}

/**
 * SneaksBackground using OffscreenCanvas and Web Workers
 * This moves all WebGL rendering and geometry calculations off the main thread
 * for better performance and responsiveness.
 */
export default function SneaksBackgroundOffscreen({
    className = "",
    lineCount = 12,
    color = "#64D2FF",
    opacity = 0.15,
    speed = 0.2
}: SneaksBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const workerRef = useRef<Worker | null>(null);
    const [hasError, setHasError] = useState(false);
    const {
        ref: containerRef,
        shouldAnimate,
        isClient
    } = useCanvasVisibility<HTMLDivElement>({
        threshold: 0.1
    });

    // Initialize worker and canvas
    useEffect(() => {
        if (!isClient || !canvasRef.current) return;

        // Check for OffscreenCanvas support
        if (typeof OffscreenCanvas === "undefined") {
            console.warn("OffscreenCanvas not supported in this browser");
            setHasError(true);
            return;
        }

        const canvas = canvasRef.current;
        let worker: Worker | null = null;

        try {
            // Create worker
            worker = new Worker(new URL("@/workers/sneaksBackground.worker.ts", import.meta.url), { type: "module" });

            workerRef.current = worker;

            // Get canvas dimensions
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const width = rect.width * dpr;
            const height = rect.height * dpr;

            // Set canvas size
            canvas.width = width;
            canvas.height = height;

            // Transfer canvas to worker
            const offscreenCanvas = canvas.transferControlToOffscreen();

            worker.postMessage(
                {
                    type: "init",
                    canvas: offscreenCanvas,
                    width,
                    height,
                    config: {
                        lineCount,
                        color,
                        opacity,
                        speed
                    }
                },
                [offscreenCanvas]
            );

            // Handle worker messages
            worker.onmessage = (event) => {
                if (event.data.type === "error") {
                    console.error("Worker error:", event.data.error);
                    setHasError(true);
                }
            };

            // Handle worker errors
            worker.onerror = (error) => {
                console.error("Worker error:", error);
                setHasError(true);
            };

            console.log("SneaksBackground worker initialized");
        } catch (error) {
            console.error("Failed to initialize worker:", error);
            setHasError(true);
            if (worker) {
                worker.terminate();
            }
        }

        // Cleanup
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [isClient, lineCount, color, opacity, speed]);

    // Handle resize
    useEffect(() => {
        if (!isClient || !canvasRef.current || !workerRef.current) return;

        const handleResize = () => {
            const canvas = canvasRef.current;
            const worker = workerRef.current;
            if (!canvas || !worker) return;

            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const width = rect.width * dpr;
            const height = rect.height * dpr;

            // DON'T set canvas.width/height here - canvas control was transferred to worker
            // The worker will handle the resize internally
            worker.postMessage({
                type: "resize",
                width,
                height
            });
        };

        // Add resize listener
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isClient]);

    // Handle animation start/stop based on visibility
    useEffect(() => {
        if (!workerRef.current) return;

        workerRef.current.postMessage({
            type: shouldAnimate ? "start" : "stop"
        });
    }, [shouldAnimate]);

    // Handle config updates
    useEffect(() => {
        if (!workerRef.current) return;

        workerRef.current.postMessage({
            type: "config",
            config: {
                lineCount,
                color,
                opacity,
                speed
            }
        });
    }, [lineCount, color, opacity, speed]);

    if (hasError || !isClient) {
        return null;
    }

    return (
        <div ref={containerRef} className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            />
        </div>
    );
}
