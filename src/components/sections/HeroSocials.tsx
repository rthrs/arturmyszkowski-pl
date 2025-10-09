"use client";

import { motion } from "framer-motion";
import { HERO_SOCIAL_LINKS } from "@/constants/socials";

export default function HeroSocials() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center space-x-8 pt-4 sm:pt-12 pb-4 sm:pb-12"
        >
            {HERO_SOCIAL_LINKS.map(({ id, href, label, icon: Icon, target, rel }) => (
                <motion.a
                    key={id}
                    href={href}
                    target={target}
                    rel={rel}
                    aria-label={label}
                    className="text-gray-400 hover:text-white relative group"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.125, ease: "easeOut" }}
                >
                    <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                    <Icon size={28} strokeWidth={1.5} className="relative z-10" />
                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900/60 backdrop-blur-sm text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap z-20">
                        {label}
                    </span>
                </motion.a>
            ))}
        </motion.div>
    );
}
