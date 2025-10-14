"use client";

import { motion } from "framer-motion";
import GroupedTechBadgesList from "@/components/ui/GroupedTechBadgesList";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import WireframeBackground from "@/components/backgrounds/WireframeBackground";
import { SKILLS, SKILLS_GRID_CLASS_NAME } from "@/constants/skills";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";

export default function Skills() {
    return (
        <Section
            id="skills"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="space-y-8 xl:space-y-10"
            background={<WireframeBackground />}
            scrollButton={{
                label: "View my Projects",
                targetSection: "projects"
            }}
        >
            <div className="text-center">
                <SectionTitle>Skills</SectionTitle>
                <SectionSubtitle>
                    I specialize in the React ecosystem and excel at building full-stack solutions with a focus on
                    interactive data visualization and performance optimization.
                </SectionSubtitle>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={SKILLS_GRID_CLASS_NAME}
            >
                {SKILLS.map((skill) => (
                    <Card
                        key={skill.name}
                        variant="skill"
                        className={`${skill.cardBgClass} ${skill.spanClass || ""}`}
                        hoverable={true}
                    >
                        <div className="flex items-center mb-2.5">
                            <div
                                className={`p-2 rounded-md bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-2.5 border border-gray-600/30 group-hover:border-gray-500/50`}
                            >
                                <skill.icon
                                    size={18}
                                    className="text-white transition-transform duration-200 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                        </div>
                        <div className="text-gray-300 font-light">
                            <GroupedTechBadgesList groups={skill.description} gridClass={skill.gridClass} />
                        </div>
                    </Card>
                ))}
            </motion.div>
        </Section>
    );
}
