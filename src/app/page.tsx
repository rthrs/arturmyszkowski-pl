"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { scrollToSection } from "@/utils/scroll";
import GradientBackground from "@/components/backgrounds/GradientBackground";

const SectionPlaceholder = ({ children }: { children?: React.ReactNode }) => (
    <div className="section-base">{children}</div>
);

const LazyFrontendExpertise = dynamic(() => import("@/components/sections/FrontendExpertise"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

const LazyFullStackSolutions = dynamic(() => import("@/components/sections/FullStackSolutions"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="bottom" />
        </SectionPlaceholder>
    )
});

const LazyFeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

const LazyResume = dynamic(() => import("@/components/sections/Resume"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="bottom" />
        </SectionPlaceholder>
    )
});

const LazyContact = dynamic(() => import("@/components/sections/Contact"), {
    ssr: false,
    loading: () => (
        <SectionPlaceholder>
            <GradientBackground direction="top" />
        </SectionPlaceholder>
    )
});

// Lazy load GoToTopButton since it's not immediately visible
const LazyGoToTopButton = dynamic(() => import("@/components/ui/buttons/GoToTopButton"), {
    ssr: false
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
                        label: "Read About Me",
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
                <LazyFrontendExpertise
                    id="frontend-expertise"
                    scrollButton={{
                        label: "See the Full Picture",
                        targetSection: "full-stack-solutions",
                        delay: 0.8
                    }}
                />
                <LazyFullStackSolutions
                    id="full-stack-solutions"
                    scrollButton={{
                        label: "See My Skills in Action",
                        targetSection: "featured-projects",
                        delay: 0.8
                    }}
                />
                <LazyFeaturedProjects
                    id="featured-projects"
                    scrollButton={{
                        label: "View My Full Resume",
                        targetSection: "resume",
                        delay: 0.6
                    }}
                />
                <LazyResume
                    id="resume"
                    scrollButton={{
                        label: "Let's Connect!",
                        targetSection: "contact"
                    }}
                />
                <LazyContact id="contact" />
            </main>

            <Footer />

            <LazyGoToTopButton />
        </>
    );
}
