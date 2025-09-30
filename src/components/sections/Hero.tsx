"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FluidBackground from "@/components/FluidBackground";
import CTAButton from "@/components/ui/CTAButton";
import HeroSocials from "@/components/sections/HeroSocials";
import profileImage from "../../../public/images/profile.jpg";

interface HeroProps {
    onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
    return (
        <section className="flex min-h-svh items-center justify-center px-6 relative pt-24">
            <FluidBackground className="absolute rotate-[-1deg] top-0 -bottom-8 -inset-x-8 -z-10" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4 sm:space-y-8"
                >
                    <div className="size-38 sm:size-52 sm:mb-8 mx-auto rounded-full relative">
                        <Image
                            fill
                            priority
                            src={profileImage}
                            alt="Artur Myszkowski"
                            className="object-cover absolute -inset-6 blur-2xl scale-120 opacity-20 rounded-full"
                        />
                        <Image
                            fill
                            priority
                            src={profileImage}
                            alt="Artur Myszkowski"
                            className="object-cover relative z-10 rounded-full mask-radial-from-50% mask-radial-to-100% mask-radial-at-center sepia-[0.2]"
                        />
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                        <h1 className="text-4xl sm:text-7xl font-light text-white tracking-tight font-heading">
                            Artur Myszkowski
                        </h1>
                        <p className="text-lg sm:text-2xl text-gray-400 font-light">Senior Software Engineer</p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-md sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Building exceptional digital experiences with modern technologies. Passionate about clean code,
                        innovative solutions, and meaningful impact.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="pt-8 flex justify-center"
                    >
                        <CTAButton onClick={onCtaClick} label="Read about me" variant="blue" />
                    </motion.div>

                    <HeroSocials />
                </motion.div>
            </div>
        </section>
    );
}
