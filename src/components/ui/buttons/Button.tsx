"use client";

import type { ReactNode, ComponentProps } from "react";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "default" | "md" | "sm" | "icon";

export interface ButtonProps extends ComponentProps<typeof motion.button> {
    label?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

const baseClasses = "group inline-flex items-center border relative rounded-full";
const sizeClasses: Record<ButtonSize, string> = {
    default: "px-6 sm:px-8 py-3.5 text-base sm:text-lg font-semibold",
    md: "px-5 sm:px-6 py-3 text-sm sm:text-base font-medium",
    sm: "px-4 sm:px-5 py-2.5 text-sm font-medium",
    icon: "p-3"
};

export const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-gradient-to-r from-slate-900/40 to-slate-950/80 hover:bg-slate-900 text-white border-slate-300/50 hover:border-slate-20070 shadow-md hover:shadow-lg",
    secondary: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border-white/30 hover:border-white/50"
};

const glowVariantClasses: Record<ButtonVariant, string> = {
    primary: "absolute -inset-1 bg-slate-800/15 blur-lg",
    secondary: "absolute -inset-1 bg-slate-900/15 blur-md"
};

export default function Button({
    label,
    rightIcon,
    leftIcon,
    variant = "primary",
    size = "default",
    className = "",
    ...rest
}: ButtonProps) {
    const hoverAnimation = size === "icon" ? { scale: 1.1, y: -2 } : { scale: 1.05, y: -1 };

    return (
        <motion.button
            whileHover={hoverAnimation}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.125, ease: "easeOut" }}
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...rest}
        >
            <div className={`${glowVariantClasses[variant]} rounded-full`} />
            {leftIcon && <span className="relative z-10">{leftIcon}</span>}
            {label && <span className={`relative z-10 ${leftIcon ? "ml-2" : ""}`}>{label}</span>}
            {rightIcon && <span className={`relative z-10 ${label || leftIcon ? "ml-2" : ""}`}>{rightIcon}</span>}
        </motion.button>
    );
}
