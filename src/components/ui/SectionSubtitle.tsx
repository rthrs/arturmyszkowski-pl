"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionSubtitleProps {
    children: ReactNode;
    className?: string;
}

export default function SectionSubtitle({ children, className = "" }: SectionSubtitleProps) {
    return (
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed mt-6 ${className}`}
        >
            {children}
        </motion.p>
    );
}
