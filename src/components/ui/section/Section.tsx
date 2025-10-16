"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import ScrollButton from "@/components/ui/buttons/ScrollButton";

interface ScrollButtonProps {
    label: string;
    targetSection: string;
}

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    background?: ReactNode;
    scrollButton?: ScrollButtonProps;
    variant?: "hero" | "contact" | "default";
}

export default function Section({
    id,
    children,
    className = "",
    containerClassName,
    contentClassName,
    background,
    scrollButton,
    variant = "default"
}: SectionProps) {
    return (
        <section
            id={id}
            data-variant={variant !== "default" ? variant : undefined}
            className={`
                section-slanted 
                flex flex-col px-6 relative
                [--section-slant:theme(--section-slant-mobile)]
                [--section-padding-y:theme(--section-padding-y)]
                md:[--section-slant:theme(--section-slant-tablet)]
                lg:[--section-slant:theme(--section-slant-desktop)]
                ${className}
            `}
        >
            {background}

            <div className={`${containerClassName} flex flex-col flex-1`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`${contentClassName} flex-1 flex flex-col justify-center`}
                >
                    {children}
                </motion.div>

                {scrollButton && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex justify-center pt-6"
                    >
                        <ScrollButton label={scrollButton.label} targetSection={scrollButton.targetSection} />
                    </motion.div>
                )}
            </div>
        </section>
    );
}
