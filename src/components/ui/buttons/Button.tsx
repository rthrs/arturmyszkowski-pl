"use client";

import type { ReactNode, ComponentProps } from "react";
import { motion } from "framer-motion";

export type ButtonVariant = "blue" | "gray" | "ghost";
export type ButtonSize = "default" | "icon";

export interface ButtonProps extends ComponentProps<typeof motion.button> {
    label?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    rounded?: boolean;
    className?: string;
}

const baseClasses = "group inline-flex items-center border relative";
const sizeClasses: Record<ButtonSize, string> = {
    default: "px-6 sm:px-8 py-3.5 text-md lg:text-lg font-medium",
    icon: "p-3"
};

export const variantClasses: Record<ButtonVariant, string> = {
    blue: "bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white border-blue-700/30 hover:border-blue-600/50 shadow-md hover:shadow-lg",
    gray: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border-gray-600/30 hover:border-gray-500/50 shadow-md hover:shadow-lg",
    ghost: "bg-black/20 hover:bg-black/30 text-white border-white/50 hover:border-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
};

const glowVariantClasses: Record<ButtonVariant, string> = {
    blue: "absolute -inset-1 bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg",
    gray: "absolute -inset-1 bg-gradient-to-r from-gray-600/12 to-gray-700/12 blur-lg",
    ghost: "absolute -inset-1 bg-gradient-to-r from-gray-600/12 to-gray-700/12 blur-lg"
};

export default function Button({
    label,
    rightIcon,
    leftIcon,
    variant = "blue",
    size = "default",
    rounded = false,
    className = "",
    ...rest
}: ButtonProps) {
    const hoverAnimation = size === "icon" ? { scale: 1.1, y: -2 } : { scale: 1.05, y: -1 };
    const roundedClass = rounded ? "rounded-full" : "rounded-xl";

    return (
        <motion.button
            whileHover={hoverAnimation}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.125, ease: "easeOut" }}
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClass} ${className}`}
            {...rest}
        >
            <div className={`${glowVariantClasses[variant]} ${roundedClass}`} />
            {leftIcon && <span className="relative z-10">{leftIcon}</span>}
            {label && <span className={`relative z-10 ${leftIcon ? "ml-2" : ""}`}>{label}</span>}
            {rightIcon && <span className={`relative z-10 ${label || leftIcon ? "ml-2" : ""}`}>{rightIcon}</span>}
        </motion.button>
    );
}
