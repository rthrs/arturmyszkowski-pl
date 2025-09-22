"use client";

import { motion } from "framer-motion";
import { FiMail as Mail, FiInstagram as Instagram } from "react-icons/fi";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24"
        >
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
                            I&apos;m always open to discussing new projects,
                            creative ideas, or opportunities to be part of an
                            ambitious team. Let&apos;s connect and explore how
                            we can work together!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <motion.a
                                href="mailto:contact@arturmyszkowski.pl"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
                            >
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg"></div>
                                <Mail
                                    size={24}
                                    strokeWidth={1.5}
                                    className="mr-2 relative z-10"
                                />
                                <span className="relative z-10">
                                    contact@arturmyszkowski.pl
                                </span>
                            </motion.a>
                            <motion.a
                                href="https://instagram.com/artur6strings"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg border border-gray-600/30 hover:border-gray-500/50 relative"
                            >
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-gray-500/12 to-gray-600/12 blur-lg"></div>
                                <Instagram
                                    size={24}
                                    strokeWidth={1.5}
                                    className="mr-2 relative z-10"
                                />
                                <span className="relative z-10">Instagram</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
