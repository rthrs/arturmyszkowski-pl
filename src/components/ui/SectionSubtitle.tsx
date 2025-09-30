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
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-lg text-gray-300 font-light mx-auto leading-relaxed mt-6 ${className}`}
        >
            {children}
        </motion.p>
    );
}
