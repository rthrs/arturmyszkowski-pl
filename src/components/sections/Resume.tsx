"use client";

import { FiDownload as Download } from "react-icons/fi";
import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";
import { RESUME_URL } from "@/constants/nav";
import { motion } from "framer-motion";

interface ResumeProps {
    onCtaClick: () => void;
}

export default function Resume({ onCtaClick }: ResumeProps) {
    return (
        <Section id="resume" containerClassName="max-w-4xl mx-auto" contentClassName="space-y-12">
            <div className="text-center">
                <SectionTitle>Resume</SectionTitle>
                <SectionSubtitle className="max-w-3xl">
                    Download my resume to learn more about my professional experience, technical expertise, and
                    achievements throughout my career.
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-2 flex flex-col gap-6 justify-center items-center"
            >
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <CTAButton label="Download Resume" rightIcon={<Download size={18} />} />
                </a>
                <CTAButton onClick={onCtaClick} label="Get in touch" variant="gray" />
            </motion.div>
        </Section>
    );
}
