"use client";

import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";
import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/constants/socials";

export default function Contact() {
    return (
        <Section id="contact" containerClassName="max-w-6xl mx-auto" contentClassName="space-y-12">
            <div className="text-center">
                <SectionTitle>Contact</SectionTitle>
                <SectionSubtitle center>
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an
                    ambitious team. Let&apos;s connect and explore how we can work together!
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="pt-2 flex flex-col gap-6 justify-center items-center"
            >
                {CONTACT_LINKS.map(({ id, href, label, icon: Icon, target, rel }) => (
                    <a key={id} href={href} target={target} rel={rel}>
                        <CTAButton
                            label={label}
                            variant="blue"
                            rightIcon={
                                <Icon
                                    size={18}
                                    className="group-hover:-translate-y-0.5 transition-transform duration-200"
                                />
                            }
                        />
                    </a>
                ))}
                <CTAButton
                    label="Go to top"
                    variant="gray"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}
                />
            </motion.div>
        </Section>
    );
}
