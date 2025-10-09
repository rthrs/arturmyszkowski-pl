"use client";

import { motion } from "framer-motion";
import GroupedTechBadgesList from "@/components/ui/GroupedTechBadgesList";
import ScrollButton from "@/components/ui/buttons/ScrollButton";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import WireframeBackground from "@/components/backgrounds/WireframeBackground";
import { SKILLS } from "@/constants/skills";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";

export default function Skills() {

    return (
        <Section
            id="skills"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="space-y-8 xl:space-y-10"
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 xl:gap-5 auto-rows-auto items-start"
            >
                {SKILLS.map((skill) => (
                    <Card
                        key={skill.name}
                        variant="skill"
                        className={`${skill.cardBgClass} ${skill.spanClass || ""}`}
                        hoverable={true}
                    >
                        <div className="flex items-center mb-4">
                            <div
                                className={`p-2.5 rounded-lg bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-3 border border-gray-600/30 group-hover:border-gray-500/50`}
                            >
                                <skill.icon size={20} className="text-white transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <h3 className="text-xl font-medium text-white">{skill.name}</h3>
                        </div>
                        <div className="text-gray-300 font-light">
                            <GroupedTechBadgesList groups={skill.description} gridClass={skill.gridClass} />
                        </div>
                    </Card>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-2 xl:pt-4 flex flex-col gap-6 justify-center items-center"
            >
                <ScrollButton label="View my Projects" targetSection="projects" variant="gray" />
            </motion.div>
        </Section>
    );
}
