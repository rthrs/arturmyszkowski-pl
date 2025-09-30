"use client";

import { motion } from "framer-motion";
import TechBadgesList from "@/components/TechBadgesList";
import CTAButton from "@/components/ui/CTAButton";
import Card from "@/components/ui/Card";
import WireframeBackground from "@/components/WireframeBackground";
import { SKILLS } from "@/constants/skills";

export default function Skills({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section id="skills" className="py-24 px-6 lg:px-8 relative scroll-mt-24">
            <WireframeBackground className="absolute -z-10 rotate-[-1deg] top-0 -bottom-8 -inset-x-8" />

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
                        {SKILLS.map((skill) => (
                            <Card key={skill.name} variant="skill" className={skill.cardBgClass} hoverable={true}>
                                <div className="flex items-center mb-6">
                                    <div
                                        className={`p-3 rounded-xl bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-4 border border-gray-600/30 hover:border-gray-500/50`}
                                    >
                                        <motion.div
                                            animate={skill.hoverAnimation}
                                            className="text-white transform-gpu will-change-transform"
                                        >
                                            <skill.icon size={24} />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-xl font-medium text-white">{skill.name}</h3>
                                </div>
                                <div className="text-gray-300 font-light">
                                    <TechBadgesList csv={skill.description} />
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center pt-4 flex justify-center">
                        <CTAButton onClick={onCtaClick} label="View Projects" className="px-6 py-3" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
