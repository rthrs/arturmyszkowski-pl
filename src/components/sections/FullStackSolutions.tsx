"use client";

import { motion } from "framer-motion";
import GroupedTechBadgesList from "@/components/ui/GroupedTechBadgesList";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import { OTHER_SKILLS, SKILLS_GRID_CLASS_NAME } from "@/constants/skills";
import GradientBackground from "@/components/backgrounds/GradientBackground";

interface FullStackSolutionsProps {
    id?: string;
    scrollButton?: {
        label: string;
        targetSection: string;
    };
}

export default function FullStackSolutions({
    id = "full-stack-solutions",
    scrollButton
}: FullStackSolutionsProps = {}) {
    return (
        <Section
            id={id}
            containerClassName="max-w-6xl mx-auto"
            contentClassName="justify-center space-y-8 xl:space-y-10"
            scrollButton={scrollButton}
            background={<GradientBackground direction="bottom" />}
        >
            <div className="text-center">
                <SectionTitle>Full-Stack Solutions</SectionTitle>
                <SectionSubtitle>
                    Building complete solutions with backend architecture, cloud infrastructure, database design, and
                    proven leadership in project delivery.
                </SectionSubtitle>
            </div>
            <div className={SKILLS_GRID_CLASS_NAME}>
                {OTHER_SKILLS.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Card
                            variant="skill"
                            className={`${skill.cardBgClass} ${skill.spanClass || ""}`}
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
