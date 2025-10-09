"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    featured?: boolean;
    featuredLabel?: string;
    variant?: "default" | "skill";
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export default function Card({
    children,
    className = "",
    hoverable = true,
    featured = false,
    featuredLabel = "Featured",
    variant = "default",
    onHoverStart,
    onHoverEnd
}: CardProps) {
    return (
        <motion.div
            whileHover={
                hoverable
                    ? {
                          x: 1,
                          y: 1,
                          scale: 1.02,
                          transition: { duration: 0.1, ease: "easeOut" }
                      }
                    : undefined
            }
            transition={{ duration: 0.1, ease: "easeOut" }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            className={`group relative transform-gpu ${
                variant === "skill"
                    ? "p-6 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 bg-gradient-to-bl"
                    : "bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/50 transition-all duration-300"
            } ${className}`}
        >
            {featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {featuredLabel}
                </div>
            )}
            {children}
        </motion.div>
    );
}
