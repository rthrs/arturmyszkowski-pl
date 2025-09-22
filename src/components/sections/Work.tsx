"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import { FiDownload as Download } from "react-icons/fi";
import { RESUME_URL } from "@/constants/nav";

export default function Work({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section
            id="work"
            className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-12 text-center"
                >
                    <div>
                        <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                            Work
                        </h2>
                    </div>

                    <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Download my resume to learn more about my professional
                        experience, achievements, and technical expertise.
                    </p>

                    <motion.a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
                    >
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 blur-lg"></div>
                        <Download
                            size={24}
                            strokeWidth={1.5}
                            className="mr-2 relative z-10"
                        />
                        <span className="relative z-10">Download Resume</span>
                    </motion.a>

                    <div className="flex justify-center">
                        <CTAButton onClick={onCtaClick} label="Get in touch" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
