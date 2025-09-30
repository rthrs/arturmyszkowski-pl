"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
    children: ReactNode;
    className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent tracking-tight ${className}`}
        >
            {children}
        </motion.h2>
    );
}
