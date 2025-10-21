"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu as Menu, FiX as X } from "react-icons/fi";
import { NAV_ITEMS } from "@/constants/nav";
import { FEATURES } from "@/constants/features";

interface NavBarProps {
    onNavigate: (sectionId: string) => void;
}

export default function NavBar({ onNavigate }: NavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuId = "mobile-menu";

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        // Only add listener when menu is open
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    const slantClasses = FEATURES.SLANT_ENABLED
        ? `
            slant-bottom 
            [--slant:theme(--navbar-slant-mobile)] 
            sm:[--slant:theme(--navbar-slant-tablet)] 
            md:[--slant:theme(--navbar-slant-desktop)]
        `
        : "";

    return (
        <nav
            ref={navRef}
            role="navigation"
            aria-label="Main navigation"
            className={`fixed z-[60] w-full bg-black/50 backdrop-blur-2xl pb-1 ${slantClasses}`}
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        onClick={() => {
                            setIsMenuOpen(false);
                            onNavigate("hero");
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Go to home section"
                        className="font-medium text-xl text-gray-300 hover:text-gray-300 transition-colors duration-300 z-60 p-2 rounded-lg hover:bg-white/5 active:bg-white/10"
                    >
                        arturmyszkowski.pl
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center h-full">
                        {NAV_ITEMS.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                                onClick={() => onNavigate(item.id)}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 active:bg-white/10"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="md:hidden text-white z-60 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                        aria-controls={mobileMenuId}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id={mobileMenuId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden relative z-50 pb-4 overflow-hidden"
                        >
                            <div className="py-2 space-y-2">
                                {NAV_ITEMS.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            onNavigate(item.id);
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="block w-full text-left text-gray-400 hover:text-white transition-colors text-md font-medium px-4 py-2 rounded-lg hover:bg-white/5 active:bg-white/10"
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
