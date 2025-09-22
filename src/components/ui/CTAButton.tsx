"use client";

import type { ReactNode, ComponentProps } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

type CTAButtonVariant = "blue" | "gray";

interface CTAButtonProps extends ComponentProps<typeof motion.button> {
    label: string;
    rightIcon?: ReactNode;
    variant?: CTAButtonVariant;
    className?: string;
}

const baseClasses =
    "group inline-flex items-center rounded-xl border relative transition-transform";
const sizeClasses = "px-8 py-4 text-base sm:text-lg font-medium";

const variantClasses: Record<CTAButtonVariant, string> = {
    blue: "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white border-blue-700/30 hover:border-blue-600/50 shadow-md hover:shadow-lg",
    gray: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border-gray-600/30 hover:border-gray-500/50",
};

export default function CTAButton({
    label,
    rightIcon,
    variant = "gray",
    className = "",
    ...rest
}: CTAButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}
            {...rest}
        >
            {variant === "blue" && (
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg" />
            )}
            <span className="relative z-10">{label}</span>
            <span className="ml-2 relative z-10">
                {rightIcon ?? (
                    <FiArrowRight
                        size={18}
                        className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
                )}
            </span>
        </motion.button>
    );
}
