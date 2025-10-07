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
                <SectionSubtitle large>
                    I&apos;m a Senior Software Engineer with extensive experience in modern web technologies and a
                    passion for creating scalable, maintainable applications. Holding a Master&apos;s degree in Computer
                    Science from the University of Warsaw, I have a strong foundation in algorithms and data structures,
                    which enables me to solve complex problems and build solutions that make a real difference.
                </SectionSubtitle>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="pt-8 flex justify-center"
                >
                    <CTAButton onClick={onCtaClick} label="Explore my skills" variant="gray" />
                </motion.div>
            </div>
        </Section>
    );
}
