"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import GoToTopButton from "@/components/ui/buttons/GoToTopButton";
import { scrollToSection } from "@/utils/scroll";
import GradientBackground from "@/components/backgrounds/GradientBackground";

const SectionPlaceholder = ({ children }: { children?: React.ReactNode }) => (
    <div className="section-base">{children}</div>
);

// Lazy load heavy sections with backgrounds
const FrontendExpertise = dynamic(() => import("@/components/sections/FrontendExpertise"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

const FullStackSolutions = dynamic(() => import("@/components/sections/FullStackSolutions"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="bottom" />
        </SectionPlaceholder>
    )
});

const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="bottom" />
        </SectionPlaceholder>
    )
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

export default function Home() {
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Skip to main content
            </a>

            <header role="banner">
                <NavBar onNavigate={scrollToSection} />
            </header>

            <main id="main-content" role="main" className="relative text-white">
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
            </main>

            <Footer />

            <GoToTopButton />
        </>
    );
}
