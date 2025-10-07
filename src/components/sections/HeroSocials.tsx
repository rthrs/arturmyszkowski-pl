"use client";

import { motion } from "framer-motion";
import { FiGithub as Github, FiMail as Mail, FiInstagram as Instagram, FiFileText as FileText } from "react-icons/fi";
import type { IconType } from "react-icons";
import { RESUME_URL } from "@/constants/nav";

interface SocialLink {
    href: string;
    label: string;
    icon: IconType;
    target?: string;
    rel?: string;
}

const socialLinks: SocialLink[] = [
    {
        href: "https://github.com/rthrs",
        label: "GitHub",
        icon: Github,
        target: "_blank",
        rel: "noopener noreferrer"
    },
    {
        href: "https://instagram.com/artur6strings",
        label: "Instagram",
        icon: Instagram,
        target: "_blank",
        rel: "noopener noreferrer"
    },
    {
        href: "mailto:contact@arturmyszkowski.pl",
        label: "Email",
        icon: Mail
    },
    {
        href: RESUME_URL,
        label: "Resume",
        icon: FileText,
        target: "_blank",
        rel: "noopener noreferrer"
    }
];

export default function HeroSocials() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center space-x-8 pt-4 sm:pt-12 pb-4 sm:pb-12"
        >
            {socialLinks.map(({ href, label, icon: Icon, target, rel }) => (
                <motion.a
                    key={label}
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
                </motion.a>
            ))}
        </motion.div>
    );
}
