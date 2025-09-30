"use client";

import { FiMail as Mail, FiInstagram as Instagram } from "react-icons/fi";
import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";

export default function Contact() {
    return (
        <Section
            id="contact"
            className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="space-y-12"
        >
            <div className="text-center">
                <SectionTitle>Contact</SectionTitle>
                <SectionSubtitle>
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an
                    ambitious team. Let&apos;s connect and explore how we can work together!
                </SectionSubtitle>
            </div>
            <div className="text-center space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a href="mailto:contact@arturmyszkowski.pl">
                        <CTAButton label="contact@arturmyszkowski.pl" rightIcon={<Mail size={18} />} variant="blue" />
                    </a>
                    <a href="https://instagram.com/artur6strings" target="_blank" rel="noopener noreferrer">
                        <CTAButton label="Instagram" rightIcon={<Instagram size={18} />} variant="gray" />
                    </a>
                </div>
            </div>
        </Section>
    );
}
