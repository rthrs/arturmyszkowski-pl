"use client";

import CTAButton from "@/components/ui/buttons/CTAButton";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/constants/socials";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import { analytics } from "@/lib/analytics";

interface ContactProps {
    id?: string;
}

export default function Contact({ id: sectionId = "contact" }: ContactProps = {}) {
    return (
        <Section
            id={sectionId}
            variant="contact"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="justify-center space-y-12"
            background={<GradientBackground direction="top" />}
        >
            <div className="text-center">
                <SectionTitle>Contact</SectionTitle>
                <SectionSubtitle>
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an
                    ambitious team. Let&apos;s connect and explore how we can work together!
                </SectionSubtitle>
            </div>

            <div className="pt-2 flex flex-col gap-6 justify-center items-center">
                {CONTACT_LINKS.map(({ id: contactId, href, label, icon: Icon, target, rel }, index) => (
                    <motion.a
                        key={contactId}
                        href={href}
                        target={target}
                        rel={rel}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        onClick={() => {
                            analytics.trackSocialClick(label, sectionId);
                        }}
                    >
                        <CTAButton
                            label={label}
                            rightIcon={
                                <Icon
                                    size={18}
                                    className="group-hover:-translate-y-0.5 transition-transform duration-200"
                                />
                            }
                        />
                    </motion.a>
                ))}
            </div>
        </Section>
    );
}
