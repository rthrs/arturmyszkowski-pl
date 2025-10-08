"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionSubtitleProps {
    children: ReactNode;
    className?: string;
    center?: boolean;
    large?: boolean;
}

export default function SectionSubtitle({
    children,
    className = "",
    center = false,
    large = false
}: SectionSubtitleProps) {
    const alignClass = center ? "text-center" : "text-justify";
    const maxWidthClass = large ? "lg:max-w-4xl" : "";

    return (
        <motion.p
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className={`max-w-3xl ${maxWidthClass} ${alignClass} text-md lg:text-lg text-gray-300 font-light mx-auto leading-relaxed mt-6 ${className}`}
        >
            {children}
        </motion.p>
    );
}
