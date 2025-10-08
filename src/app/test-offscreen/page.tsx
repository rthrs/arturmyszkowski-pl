"use client";

import { useState } from "react";
import SneaksBackgroundOffscreen from "@/components/backgrounds/SneaksBackgroundOffscreen";
import SneaksBackground from "@/components/backgrounds/SneaksBackground";

/**
 * Test page to compare the original SneaksBackground with the OffscreenCanvas version
 */
export default function TestOffscreenPage() {
    const [useOffscreen, setUseOffscreen] = useState(true);
    const [lineCount, setLineCount] = useState(12);
    const [opacity, setOpacity] = useState(0.15);
    const [speed, setSpeed] = useState(0.2);

    return (
        <div className="min-h-screen relative">
            {/* Background */}
            {useOffscreen ? (
                <SneaksBackgroundOffscreen lineCount={lineCount} opacity={opacity} speed={speed} />
            ) : (
                <SneaksBackground lineCount={lineCount} opacity={opacity} speed={speed} />
            )}

            {/* Controls */}
            <div className="relative z-10 p-8 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">OffscreenCanvas PoC Test</h1>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-white/20">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Background Type</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setUseOffscreen(true)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                useOffscreen
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        >
                            OffscreenCanvas (Worker)
                        </button>
                        <button
                            onClick={() => setUseOffscreen(false)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                !useOffscreen
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        >
                            React Three Fiber (Main Thread)
                        </button>
                    </div>
                    <p className="mt-4 text-white/80 text-sm">
                        {useOffscreen
                            ? "✨ All WebGL rendering and calculations run in a Web Worker"
                            : "⚠️ All rendering happens on the main thread"}
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-white/20">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Controls</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-white mb-2">Line Count: {lineCount}</label>
                            <input
                                type="range"
                                min="4"
                                max="20"
                                value={lineCount}
                                onChange={(e) => setLineCount(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Opacity: {opacity.toFixed(2)}</label>
                            <input
                                type="range"
                                min="0.05"
                                max="0.5"
                                step="0.05"
                                value={opacity}
                                onChange={(e) => setOpacity(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Speed: {speed.toFixed(2)}</label>
                            <input
                                type="range"
                                min="0.1"
                                max="1.0"
                                step="0.1"
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Performance Benefits</h2>
                    <ul className="space-y-2 text-white/90">
                        <li className="flex items-start">
                            <span className="mr-2">🚀</span>
                            <span>
                                <strong>Non-blocking rendering:</strong> WebGL operations don't block UI interactions
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">⚡</span>
                            <span>
                                <strong>Parallel processing:</strong> Geometry calculations happen in parallel with main
                                thread
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🎯</span>
                            <span>
                                <strong>Reduced main thread load:</strong> Frees up the main thread for React updates
                                and user interactions
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">📱</span>
                            <span>
                                <strong>Better mobile performance:</strong> Especially beneficial on lower-end devices
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="mt-6 bg-yellow-500/20 backdrop-blur-md rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-100">🔧 Testing Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2 text-yellow-50/90">
                        <li>Open browser DevTools (Performance tab)</li>
                        <li>Start recording performance</li>
                        <li>Interact with the page (scroll, click, adjust controls)</li>
                        <li>Compare main thread activity between the two modes</li>
                        <li>Check "Web Workers" section to see offscreen rendering activity</li>
                    </ol>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        </div>
    );
}
