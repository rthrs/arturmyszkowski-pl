"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section, { ScrollButtonProps } from "@/components/ui/section/Section";
import profileImage from "../../../public/images/profile.jpeg";
import SneaksBackground from "@/components/backgrounds/sneaks";
import { HERO_SOCIAL_LINKS } from "@/constants/socials";
import { analytics } from "@/lib/analytics";

interface HeroProps {
    id?: string;
    scrollButton?: ScrollButtonProps;
}

export default function Hero({ id: sectionId = "hero", scrollButton }: HeroProps = {}) {
    return (
        <Section
            id={sectionId}
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
                    fetchPriority="high"
                    src={profileImage}
                    alt=""
                    sizes="(min-width: 640px) 208px, 152px"
                    className="object-cover absolute -inset-6 blur-xl scale-125 opacity-10 rounded-full"
                    aria-hidden="true"
                    quality={10}
                />
                <Image
                    fill
                    priority
                    fetchPriority="high"
                    src={profileImage}
                    alt="Artur Myszkowski"
                    sizes="(min-width: 640px) 208px, 152px"
                    className="object-cover relative z-10 rounded-full mask-radial-from-50% mask-radial-to-100% mask-radial-at-center"
                    quality={75}
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

            <div className="flex justify-center space-x-8">
                {HERO_SOCIAL_LINKS.map(({ id: socialId, href, label, icon: Icon, target, rel }, index) => (
                    <motion.a
                        key={socialId}
                        href={href}
                        target={target}
                        rel={rel}
                        aria-label={target === "_blank" ? `${label} (opens in new tab)` : label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }
                        }}
                        transition={{ duration: 0.125 }}
                        className="text-gray-400 hover:text-white relative group"
                        whileHover={{ scale: 1.15, y: -2, transition: { duration: 0.125 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.125 } }}
                        onClick={() => {
                            if (socialId === "resume") {
                                analytics.trackDownload(href, "pdf", sectionId);
                            } else {
                                analytics.trackSocialClick(socialId, sectionId);
                            }
                        }}
                    >
                        <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                        <Icon size={28} strokeWidth={1.5} className="relative z-10" />

                        {/* Tooltip */}
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900/60 backdrop-blur-sm text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap z-20">
                            {label}
                        </span>
                    </motion.a>
                ))}
            </div>
        </Section>
    );
}
