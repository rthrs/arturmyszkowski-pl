"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FluidBackground from "@/components/FluidBackground";
import CTAButton from "@/components/ui/CTAButton";
import {
    FiGithub as Github,
    FiMail as Mail,
    FiInstagram as Instagram,
    FiFileText as FileText,
} from "react-icons/fi";

interface HeroProps {
    onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative scroll-mt-20 sm:scroll-mt-24 pt-20 sm:pt-24">
            <FluidBackground />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="w-48 h-48 mx-auto mb-8 rounded-full relative">
                        <Image
                            src="/images/profile.webp"
                            alt=""
                            fill
                            className="object-cover absolute -inset-6 blur-2xl scale-110 opacity-20 rounded-full"
                            priority
                        />
                        <Image
                            src="/images/profile.webp"
                            alt="Artur Myszkowski"
                            fill
                            className="object-cover relative z-10 rounded-full"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-7xl font-light text-white tracking-tight font-heading">
                            Artur Myszkowski
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-400 font-light font-mono">
                            Senior Software Engineer
                        </p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Building exceptional digital experiences with modern
                        technologies. Passionate about clean code, innovative
                        solutions, and meaningful impact.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="pt-8 flex justify-center"
                    >
                        <CTAButton
                            onClick={onCtaClick}
                            label="Read about me"
                            variant="blue"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex justify-center space-x-8 pt-12"
                    >
                        <motion.a
                            href="https://github.com/rthrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white relative group"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                            <Github
                                size={28}
                                strokeWidth={1.5}
                                className="relative z-10"
                            />
                        </motion.a>
                        <motion.a
                            href="https://instagram.com/artur6strings"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white relative group"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                            <Instagram
                                size={28}
                                strokeWidth={1.5}
                                className="relative z-10"
                            />
                        </motion.a>
                        <motion.a
                            href="mailto:contact@arturmyszkowski.pl"
                            className="text-gray-400 hover:text-white relative group"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                            <Mail
                                size={28}
                                strokeWidth={1.5}
                                className="relative z-10"
                            />
                        </motion.a>
                        <motion.a
                            href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white relative group"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                            <FileText
                                size={28}
                                strokeWidth={1.5}
                                className="relative z-10"
                            />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
