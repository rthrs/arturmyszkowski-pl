"use client";

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

export default function Home() {
    return (
        <main className="relative text-white">
            <NavBar onNavigate={scrollToSection} />

            <Hero
                id="hero"
                scrollButton={{
                    label: "Learn More",
                    targetSection: "about"
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
                    targetSection: "full-stack-solutions"
                }}
            />
            <FullStackSolutions
                id="full-stack-solutions"
                scrollButton={{
                    label: "Check Out My Projects",
                    targetSection: "featured-projects"
                }}
            />
            <FeaturedProjects
                id="featured-projects"
                scrollButton={{
                    label: "Learn My Journey",
                    targetSection: "experience"
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
