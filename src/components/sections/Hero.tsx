"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/section/Section";
import HeroSocials from "@/components/sections/HeroSocials";
import profileImage from "../../../public/images/profile.jpeg";
import SneaksBackground from "@/components/backgrounds/sneaks";

interface HeroProps {
    id?: string;
    scrollButton?: {
        label: string;
        targetSection: string;
    };
}

export default function Hero({ id = "hero", scrollButton }: HeroProps = {}) {
    return (
        <Section
            id={id}
            variant="hero"
            containerClassName="max-w-4xl mx-auto text-center relative z-10"
            contentClassName="justify-center"
            background={<SneaksBackground />}
            scrollButton={scrollButton}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="size-38 sm:size-52 mx-auto rounded-full relative mb-4 sm:mb-8"
            >
                <Image
                    fill
                    priority
                    src={profileImage}
                    alt="Artur Myszkowski"
                    sizes="(min-width: 640px) 208px, 152px"
                    className="object-cover absolute -inset-6 blur-xl scale-125 opacity-10 rounded-full"
                />
                <Image
                    fill
                    priority
                    src={profileImage}
                    alt="Artur Myszkowski"
                    sizes="(min-width: 640px) 208px, 152px"
                    className="object-cover relative z-10 rounded-full mask-radial-from-50% mask-radial-to-100% mask-radial-at-center"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-2 sm:space-y-4 mb-4 sm:mb-8"
            >
                <h1 className="text-4xl sm:text-7xl font-light text-white tracking-tight">Artur Myszkowski</h1>
                <p className="text-lg sm:text-2xl text-gray-400 font-light">Software Engineer</p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-md sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-ligh mb-8 sm:mb-16"
            >
                I build high-performance web applications that bring complex data to life. Passionate about clean code,
                innovative solutions, and creating meaningful user impact.
            </motion.p>

            <HeroSocials />
        </Section>
    );
}
