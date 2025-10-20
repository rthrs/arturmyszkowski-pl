"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import ScrollButton from "@/components/ui/buttons/ScrollButton";
import { FEATURES } from "@/constants/features";

export interface ScrollButtonProps {
    label: string;
    targetSection: string;
    delay?: number;
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
    withDivider?: boolean;
}

export default function Section({
    id,
    children,
    className = "",
    containerClassName,
    contentClassName,
    background,
    scrollButton,
    variant = "default",
    withDivider = true
}: SectionProps) {
    const slantClasses = FEATURES.SLANT_ENABLED
        ? `
            slant-top-bottom
            [--slant:theme(--section-slant-mobile)]
            md:[--slant:theme(--section-slant-tablet)]
            lg:[--slant:theme(--section-slant-desktop)]
            -mb-[var(--slant)]
        `
        : "border-b border-dotted border-gray-700/50";

    return (
        <>
            <section
                id={id}
                data-variant={variant !== "default" ? variant : undefined}
                className={`
                    section-base
                    flex flex-col px-6 relative
                    [--section-padding-y:theme(--section-padding-y)]
                    ${slantClasses}
                    ${className}
                `}
            >
                {background}

                <div className={`flex flex-1 flex-col ${containerClassName}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className={`flex flex-1 flex-col py-8 sm:py-10 ${contentClassName}`}
                    >
                        {children}
                    </motion.div>

                    {scrollButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: scrollButton.delay ?? 0.3 }}
                            viewport={{ once: true }}
                            className="flex justify-center pb-10 sm:pb-12"
                        >
                            <ScrollButton label={scrollButton.label} targetSection={scrollButton.targetSection} />
                        </motion.div>
                    )}
                </div>
            </section>

            {withDivider && FEATURES.SLANT_ENABLED && (
                <div
                    className="
                        [background:repeating-linear-gradient(to_right,theme(colors.gray.700)_0_1px,transparent_1px_2px)]
                        w-full
                        opacity-50
                        slant-top-bottom
                        [--slant:theme(--section-slant-mobile)]
                        md:[--slant:theme(--section-slant-tablet)]
                        lg:[--slant:theme(--section-slant-desktop)]
                        h-[calc(var(--slant)+1px)]
                        -mb-[var(--slant)]
                    "
                />
            )}
        </>
    );
}
