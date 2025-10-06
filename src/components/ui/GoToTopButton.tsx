"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";

export default function GoToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px or more
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.125, ease: "easeOut" }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white p-3 rounded-full shadow-lg hover:shadow-xl border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300"
                    aria-label="Go to top"
                >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg" />
                    <FiChevronUp size={20} className="relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
