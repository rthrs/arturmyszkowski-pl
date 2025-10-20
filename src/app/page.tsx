"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import GoToTopButton from "@/components/ui/buttons/GoToTopButton";
import { scrollToSection } from "@/utils/scroll";

const SectionLoading = () => <div className="h-screen bg-gradient-to-b from-slate-900 to-slate-800" />;

// Lazy load heavy sections with backgrounds
const FrontendExpertise = dynamic(() => import("@/components/sections/FrontendExpertise"), {
    ssr: false,
    loading: SectionLoading
});

const FullStackSolutions = dynamic(() => import("@/components/sections/FullStackSolutions"), {
    ssr: false,
    loading: SectionLoading
});

const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects"), {
    ssr: false,
    loading: SectionLoading
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
    ssr: false,
    loading: SectionLoading
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
    ssr: false,
    loading: SectionLoading
});

export default function Home() {
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
