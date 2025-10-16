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
    return (
        <>
            <section
                id={id}
                data-variant={variant !== "default" ? variant : undefined}
                className={`
                    section-base
                    slant-top-bottom
                    flex flex-col px-6 relative
                    [--section-padding-y:theme(--section-padding-y)]
                    [--slant:theme(--section-slant-mobile)]
                    md:[--slant:theme(--section-slant-tablet)]
                    lg:[--slant:theme(--section-slant-desktop)]
                    -mb-[var(--slant)]
                    ${className}
                `}
            >
                {background}

                <div className={`flex flex-1 flex-col ${containerClassName}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className={`flex flex-1 flex-col py-8 sm:py-12 ${contentClassName}`}
                    >
                        {children}
                    </motion.div>

                    {scrollButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex justify-center pb-[calc(var(--slant)_+_theme(spacing.6))] sm:pb-[calc(var(--slant)_+_theme(spacing.12))]"
                        >
                            <ScrollButton label={scrollButton.label} targetSection={scrollButton.targetSection} />
                        </motion.div>
                    )}
                </div>
            </section>

            {withDivider && (
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
