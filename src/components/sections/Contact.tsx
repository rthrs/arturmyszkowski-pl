"use client";

import { motion } from "framer-motion";
import { FiMail as Mail, FiInstagram as Instagram } from "react-icons/fi";
import CTAButton from "@/components/ui/CTAButton";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center">
                        <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                            Contact
                        </h2>
                    </div>

                    <div className="text-center space-y-8">
                        <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part
                            of an ambitious team. Let&apos;s connect and explore how we can work together!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="mailto:contact@arturmyszkowski.pl">
                                <CTAButton
                                    label="contact@arturmyszkowski.pl"
                                    rightIcon={<Mail size={18} />}
                                    variant="blue"
                                />
                            </a>
                            <a href="https://instagram.com/artur6strings" target="_blank" rel="noopener noreferrer">
                                <CTAButton label="Instagram" rightIcon={<Instagram size={18} />} variant="gray" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
