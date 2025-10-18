"use client";

import { motion } from "framer-motion";
import GroupedTechBadgesList from "@/components/ui/GroupedTechBadgesList";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import WireframeBackground from "@/components/backgrounds/wireframe";
import { FRONTEND_EXPERTISE_SKILLS, SKILLS_GRID_CLASS_NAME } from "@/constants/skills";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import GradientBackground from "@/components/backgrounds/GradientBackground";

interface FrontendExpertiseProps {
    id?: string;
    scrollButton?: {
        label: string;
        targetSection: string;
    };
}

export default function FrontendExpertise({ id = "frontend-expertise", scrollButton }: FrontendExpertiseProps = {}) {
    return (
        <Section
            id={id}
            containerClassName="max-w-6xl mx-auto"
            contentClassName="justify-center space-y-8 xl:space-y-10"
            background={
                <>
                    <GradientBackground direction="top" />
                    <WireframeBackground />
                </>
            }
            scrollButton={scrollButton}
        >
            <div className="text-center">
                <SectionTitle>Frontend Expertise</SectionTitle>
                <SectionSubtitle className="sm:max-w-4xl">
                    I specialize in the React ecosystem and excel at building modern, performant web applications with a
                    focus on interactive data visualization and seamless user experiences.
                </SectionSubtitle>
            </div>
            <div className={SKILLS_GRID_CLASS_NAME}>
                {FRONTEND_EXPERTISE_SKILLS.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <Card
                            variant="skill"
                            className={`h-full ${skill.cardBgClass} ${skill.spanClass || ""}`}
                            hoverable={true}
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className={`p-3 rounded-lg bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-3 border border-gray-600/30 group-hover:border-gray-500/50`}
                                >
                                    <skill.icon
                                        size={24}
                                        className="text-white transition-transform duration-200 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                            </div>
                            <div className="text-gray-300 font-light text-sm">
                                <GroupedTechBadgesList groups={skill.description} gridClass={skill.gridClass} />
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
