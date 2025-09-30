"use client";

import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import { motion } from "framer-motion";

interface AboutProps {
    onCtaClick: () => void;
}

export default function About({ onCtaClick }: AboutProps) {
    return (
        <Section id="about" containerClassName="max-w-4xl mx-auto" contentClassName="space-y-12">
            <div className="text-center">
                <SectionTitle>About</SectionTitle>
            </div>

            <div className="space-y-8">
                <SectionSubtitle className="max-w-3xl lg:max-w-4xl">
                    I&apos;m a Senior Software Engineer with extensive experience in modern web technologies and a
                    passion for creating scalable, maintainable applications. I&apos;m holding a Master&apos;s degree in
                    Computer Science from the University of Warsaw. With a strong foundation in algorithms and data
                    structures, I enjoy solving complex problems and building solutions that make a real difference.
                </SectionSubtitle>

                <SectionSubtitle className="max-w-3xl lg:max-w-4xl">
                    My core philosophy is to continuously learn and apply the most effective technologies for each
                    project. I thrive in collaborative environments and enjoy working with diverse teams. While my main
                    expertise is in the React ecosystem, I am adaptable and comfortable working across a broad range of
                    tools and frameworks.
                </SectionSubtitle>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="pt-2 flex justify-center"
                >
                    <CTAButton onClick={onCtaClick} label="Explore my skills" className="px-6 py-3" />
                </motion.div>
            </div>
        </Section>
    );
}
