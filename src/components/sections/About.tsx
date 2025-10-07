"use client";

import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import { motion } from "framer-motion";
import { RESUME_URL } from "@/constants/nav";
import { FiDownload as Download } from "react-icons/fi";

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
                <SectionSubtitle className="max-w-3xl lg:max-w-4xl text-justify">
                    I&apos;m a Senior Software Engineer with extensive experience in modern web technologies and a
                    passion for creating scalable, maintainable applications. I&apos;m holding a Master&apos;s degree in
                    Computer Science from the University of Warsaw. With a strong foundation in algorithms and data
                    structures, I enjoy solving complex problems and building solutions that make a real difference.
                </SectionSubtitle>

                <SectionSubtitle className="max-w-3xl lg:max-w-4xl text-justify">
                    Download my resume to learn more about my professional experience, achievements, and technical
                    expertise.
                </SectionSubtitle>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="pt-2 flex flex-col gap-6 justify-center items-center"
                >
                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                        <CTAButton label="Download Resume" rightIcon={<Download size={18} />} variant="blue" />
                    </a>
                    <CTAButton onClick={onCtaClick} label="Explore my skills" />
                </motion.div>
            </div>
        </Section>
    );
}
