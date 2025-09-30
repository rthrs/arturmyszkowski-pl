"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    background?: ReactNode;
}

export default function Section({
    id,
    children,
    className,
    containerClassName,
    contentClassName,
    background
}: SectionProps) {
    return (
        <section id={id} className={className}>
            {background}

            <div className={containerClassName}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={contentClassName}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
