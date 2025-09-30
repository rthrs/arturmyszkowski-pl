"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import BackgroundGradient from "@/components/BackgroundGradient";

export default function Home() {
    const scrollToSection = (sectionId: string) => {
        // Handle special case for scrolling to top
        if (sectionId === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const element = document.getElementById(sectionId);
        if (!element) return;

        const performScroll = () => {
            const y = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: "smooth" });
        };
        requestAnimationFrame(() => requestAnimationFrame(performScroll));
    };

    return (
        <main className="relative text-white">
            <BackgroundGradient />

            <NavBar onNavigate={scrollToSection} />

            <Hero onCtaClick={() => scrollToSection("about")} />
            <About onCtaClick={() => scrollToSection("skills")} />
            <Skills onCtaClick={() => scrollToSection("projects")} />
            <Projects onCtaClick={() => scrollToSection("contact")} />
            <Contact />

            <Footer />
        </main>
    );
}
