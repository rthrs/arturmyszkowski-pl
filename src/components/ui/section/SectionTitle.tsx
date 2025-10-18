"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
    children: ReactNode;
    className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block px-12 py-2"
        >
            <h2
                className={`text-5xl lg:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 bg-clip-text text-transparent tracking-tight leading-[1.1] ${className}`}
            >
                {children}
            </h2>
        </motion.div>
    );
}
