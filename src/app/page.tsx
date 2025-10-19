"use client";

import { useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FrontendExpertise from "@/components/sections/FrontendExpertise";
import FullStackSolutions from "@/components/sections/FullStackSolutions";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import GoToTopButton from "@/components/ui/buttons/GoToTopButton";
import { scrollToSection } from "@/utils/scroll";
import { useScrollSnap } from "@/hooks/useScrollSnap";

export default function Home() {
    const snapEnabled = useScrollSnap();

    useEffect(() => {
        const html = document.documentElement;

        if (snapEnabled) {
            html.classList.add("snap-y", "snap-mandatory");
        } else {
            html.classList.remove("snap-y", "snap-mandatory");
        }
    }, [snapEnabled]);

    return (
        <main className="relative text-white">
            <NavBar onNavigate={scrollToSection} />

            <Hero
                id="hero"
                scrollButton={{
                    label: "Learn More",
                    targetSection: "about",
                    delay: 0.7
                }}
            />
            <About
                id="about"
                scrollButton={{
                    label: "Explore My Skills",
                    targetSection: "frontend-expertise"
                }}
            />
            <FrontendExpertise
                id="frontend-expertise"
                scrollButton={{
                    label: "See the Full Picture",
                    targetSection: "full-stack-solutions",
                    delay: 0.8
                }}
            />
            <FullStackSolutions
                id="full-stack-solutions"
                scrollButton={{
                    label: "Check Out My Projects",
                    targetSection: "featured-projects",
                    delay: 0.8
                }}
            />
            <FeaturedProjects
                id="featured-projects"
                scrollButton={{
                    label: "Learn My Journey",
                    targetSection: "experience",
                    delay: 0.6
                }}
            />
            <Experience
                id="experience"
                scrollButton={{
                    label: "Let's Connect!",
                    targetSection: "contact"
                }}
            />
            <Contact id="contact" />

            <Footer />

            <GoToTopButton />
        </main>
    );
}
