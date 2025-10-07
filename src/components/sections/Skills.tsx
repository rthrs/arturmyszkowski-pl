"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TechBadgesList from "@/components/TechBadgesList";
import CTAButton from "@/components/ui/CTAButton";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import WireframeBackground from "@/components/WireframeBackground";
import { SKILLS } from "@/constants/skills";
import { DEFAULT_ICON_ANIMATION } from "@/constants/motion";
import SectionSubtitle from "../ui/SectionSubtitle";

export default function Skills({ onCtaClick }: { onCtaClick: () => void }) {
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
                <SectionSubtitle className="max-w-3xl lg:max-w-4xl text-justify">
                    My core philosophy is to continuously learn and apply the most effective technologies for each
                    project. I thrive in collaborative environments and enjoy working with diverse teams. While my main
                    expertise is in the React ecosystem, I am adaptable and comfortable working across a broad range of
                    tools and frameworks.
                </SectionSubtitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>

            <div className="text-center flex justify-center">
                <CTAButton onClick={onCtaClick} label="View Projects" />
            </div>
        </Section>
    );
}
