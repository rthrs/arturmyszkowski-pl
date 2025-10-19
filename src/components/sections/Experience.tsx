"use client";

import { FiDownload as Download } from "react-icons/fi";
import CTAButton from "@/components/ui/buttons/CTAButton";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import { SOCIAL_LINKS } from "@/constants/socials";
import { motion } from "framer-motion";
import FluidBackground from "@/components/backgrounds/fluid";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import { analytics } from "@/lib/analytics";

interface ExperienceProps {
    id?: string;
    scrollButton?: {
        label: string;
        targetSection: string;
    };
}

export default function Experience({ id: sectionId = "experience", scrollButton }: ExperienceProps = {}) {
    return (
        <Section
            id={sectionId}
            containerClassName="max-w-4xl mx-auto"
            contentClassName="justify-center space-y-12"
            background={
                <>
                    <GradientBackground direction="bottom" />
                    <FluidBackground />
                </>
            }
            scrollButton={scrollButton}
        >
            <div className="text-center">
                <SectionTitle>Experience</SectionTitle>
                <SectionSubtitle>
                    Download my resume to learn more about my professional experience, technical expertise, and
                    achievements throughout my career.
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center"
            >
                <a
                    href={SOCIAL_LINKS.resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.trackDownload("resume", SOCIAL_LINKS.resume.href, "pdf", sectionId)}
                >
                    <CTAButton
                        label="Download Resume"
                        rightIcon={
                            <Download
                                className="group-hover:translate-y-0.5 transition-transform duration-200"
                                size={18}
                            />
                        }
                    />
                </a>
            </motion.div>
        </Section>
    );
}
