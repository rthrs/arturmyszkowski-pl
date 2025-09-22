"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import TechBadgesList from "@/components/TechBadgesList";
import CTAButton from "@/components/ui/CTAButton";
import { SKILLS } from "@/constants/skills";
import { DEFAULT_ICON_ANIMATION } from "@/constants/motion";

// Morphing wireframe for skills section
function SkillsWireframe() {
    const gridRef = useRef<THREE.LineSegments>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [originalPositions, setOriginalPositions] = useState<Float32Array | null>(null);

    useEffect(() => {
        // Create grid geometry
        const gridGeometry = new THREE.BufferGeometry();
        const points: number[] = [];

        const size = 25;
        const divisions = 60;
        const step = size / divisions;
        const halfSize = size / 2;

        // Grid lines
        for (let i = 0; i <= divisions; i++) {
            const x = -halfSize + i * step;
            points.push(x, -halfSize, 0, x, halfSize, 0);
            points.push(
                -halfSize,
                -halfSize + i * step,
                0,
                halfSize,
                -halfSize + i * step,
                0
            );
        }

        const positions = new THREE.Float32BufferAttribute(points, 3);
        gridGeometry.setAttribute("position", positions);
        setOriginalPositions(positions.array as Float32Array);
        setGeometry(gridGeometry);
    }, []);

    useFrame((state) => {
        if (gridRef.current && geometry && originalPositions) {
            const time = state.clock.getElapsedTime();

            // Get the position attribute
            const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
            const positions = positionAttribute.array as Float32Array;

            // Create cloth-like morphing effect
            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const y = originalPositions[i + 1];

                // Cloth-like flowing waves
                const windWave1 = Math.sin(x * 0.4 + time * 0.8) * Math.cos(y * 0.2) * 2.0;
                const windWave2 = Math.cos(x * 0.3 + y * 0.35 + time * 0.6) * 1.5;
                const windWave3 = Math.sin(x * 0.6 + y * 0.4 + time * 0.4) * Math.sin(y * 0.3) * 1.0;
                const ripple1 = Math.sin(x * 0.8 + time * 1.2) * Math.cos(y * 0.6 + time * 0.5) * 0.8;

                // Combine waves for cloth-like movement
                positions[i + 2] = windWave1 + windWave2 + windWave3 + ripple1;
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
        <lineSegments ref={gridRef} geometry={geometry} position={[0, 0, -3]}>
            <lineBasicMaterial color="#64D2FF" transparent opacity={0.12} />
        </lineSegments>
    );
}

export default function Skills({ onCtaClick }: { onCtaClick: () => void }) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [inputMode, setInputMode] = useState<"touch" | "mouse" | "unknown">(
        "unknown"
    );

    useEffect(() => {
        const mq = window.matchMedia("(hover: none), (pointer: coarse)");
        setInputMode(mq.matches ? "touch" : "mouse");
    }, []);

    return (
        <section
            id="skills"
            className="py-24 px-6 lg:px-8 relative scroll-mt-24"
        >
            {/* Morphing wireframe background */}
            <div className="absolute -z-10 rotate-[-2deg] top-0 -bottom-8 -inset-x-8 opacity-50">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 75 }}
                    style={{ background: "transparent" }}
                    dpr={[1, 2]}
                    gl={{ alpha: true, antialias: true }}
                >
                    <SkillsWireframe />
                </Canvas>
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-16"
                >
                    <div className="text-center">
                        <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                            Skills
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {SKILLS.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={false}
                                whileInView={
                                    inputMode === "mouse"
                                        ? { opacity: 1 }
                                        : undefined
                                }
                                transition={
                                    inputMode === "mouse"
                                        ? { duration: 0.8, delay: index * 0.1 }
                                        : undefined
                                }
                                viewport={
                                    inputMode === "mouse"
                                        ? { once: true }
                                        : undefined
                                }
                                onHoverStart={() => setHovered(skill.name)}
                                onHoverEnd={() => setHovered(null)}
                                onTapStart={() => setHovered(skill.name)}
                                onTap={() =>
                                    setTimeout(() => setHovered(null), 500)
                                }
                                onTapCancel={() => setHovered(null)}
                                className={`group px-8 py-6 border border-gray-800 rounded-md hover:border-gray-700 transition-all duration-300 bg-gradient-to-bl transform-gpu ${skill.cardBgClass}`}
                            >
                                <div className="flex items-center mb-6">
                                    <div
                                        className={`p-3 rounded-xl bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-4 border border-gray-600/30 hover:border-gray-500/50`}
                                    >
                                        <motion.div
                                            animate={
                                                hovered === skill.name
                                                    ? skill.hoverAnimation as any
                                                    : DEFAULT_ICON_ANIMATION
                                            }
                                            className="text-white transform-gpu will-change-transform"
                                        >
                                            <skill.icon size={24} />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-xl font-medium text-white">
                                        {skill.name}
                                    </h3>
                                </div>
                                <div className="text-gray-300 font-light">
                                    <TechBadgesList csv={skill.description} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center pt-4 flex justify-center">
                        <CTAButton
                            onClick={onCtaClick}
                            label="See my work"
                            className="px-6 py-3"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
