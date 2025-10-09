"use client";

import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import ScrollButton from "@/components/ui/buttons/ScrollButton";
import { motion } from "framer-motion";

export default function About() {
    return (
        <Section
            id="about"
            containerClassName="max-w-4xl mx-auto"
            contentClassName="space-y-8 xl:space-y-10 flex flex-col items-center"
        >
            <div className="text-center">
                <SectionTitle>About</SectionTitle>
                <SectionSubtitle className="text-justify">
                    I&apos;m a Senior Software Engineer with extensive experience in modern web technologies and a
                    passion for creating scalable, maintainable applications.
                    <br />
                    <br />
                    Holding a Master&apos;s degree in Computer Science from the University of Warsaw, I have a strong
                    foundation in algorithms and data structures, which enables me to solve complex problems and build
                    solutions that make a real difference.
                    <br />
                    <br />
                    Recently, I&apos;ve been expanding my expertise and exploring how to work effectively with modern AI
                    tools, with the goal of significantly boosting my productivity and delivering high-quality results.
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8"
            >
                <ScrollButton label="Explore my skills" targetSection="skills" variant="gray" />
            </motion.div>
        </Section>
    );
}
