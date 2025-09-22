"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TechBadgesList from "@/components/TechBadgesList";
import CTAButton from "@/components/ui/CTAButton";
import { SKILLS } from "@/constants/skills";
import { DEFAULT_ICON_ANIMATION } from "@/constants/motion";

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
                                                    ? skill.hoverAnimation
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
