"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FluidBackground from "@/components/FluidBackground";
import SectionScrollButton from "@/components/ui/SectionScrollButton";
import Section from "@/components/ui/Section";
import HeroSocials from "@/components/sections/HeroSocials";
import profileImage from "../../../public/images/profile.jpg";

export default function Hero() {
    return (
        <Section
            id="hero"
            className="pt-21 pb-12"
            containerClassName="max-w-4xl mx-auto text-center relative z-10"
            contentClassName="space-y-4 sm:space-y-8"
            background={<FluidBackground />}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="size-38 sm:size-52 sm:mb-8 mx-auto rounded-full relative"
            >
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
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-2 sm:space-y-4"
            >
                <h1 className="text-4xl sm:text-7xl font-light text-white tracking-tight">Artur Myszkowski</h1>
                <p className="text-lg sm:text-2xl text-gray-400 font-light">Senior Software Engineer</p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-md sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
            >
                Building exceptional digital experiences with modern technologies. Passionate about clean code,
                innovative solutions, and meaningful impact.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-4 sm:pt-8 flex justify-center"
            >
                <SectionScrollButton label="Read about me" targetSection="about" />
            </motion.div>

            <HeroSocials />
        </Section>
    );
}
