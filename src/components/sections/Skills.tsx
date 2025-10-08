"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TechBadgesList from "@/components/TechBadgesList";
import SectionScrollButton from "@/components/ui/SectionScrollButton";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import WireframeBackground from "@/components/WireframeBackground";
import { SKILLS } from "@/constants/skills";
import { DEFAULT_ICON_ANIMATION } from "@/constants/motion";
import SectionSubtitle from "@/components/ui/SectionSubtitle";

export default function Skills() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <Section
            id="skills"
            className="bg-gray-800/10"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="space-y-16"
            background={<WireframeBackground />}
        >
            <div className="text-center">
                <SectionTitle>Skills</SectionTitle>
                <SectionSubtitle large>
                    My core philosophy is to continuously strive to learn and apply the most effective technologies for
                    each project to deliver exceptional results. While my main expertise is in the React ecosystem, I am
                    adaptable and comfortable working across a broad range of tools and frameworks.
                </SectionSubtitle>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {SKILLS.map((skill) => (
                    <Card
                        key={skill.name}
                        variant="skill"
                        className={skill.cardBgClass}
                        hoverable={true}
                        onHoverStart={() => setHovered(skill.name)}
                        onHoverEnd={() => setHovered(null)}
                    >
                        <div className="flex items-center mb-6">
                            <div
                                className={`p-3 rounded-xl bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-4 border border-gray-600/30 hover:border-gray-500/50`}
                            >
                                <motion.div
                                    animate={hovered === skill.name ? skill.hoverAnimation : DEFAULT_ICON_ANIMATION}
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
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-2 flex flex-col gap-6 justify-center items-center"
            >
                <SectionScrollButton label="View my Projects" targetSection="projects" variant="gray" />
            </motion.div>
        </Section>
    );
}
