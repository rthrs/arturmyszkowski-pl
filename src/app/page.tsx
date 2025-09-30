"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

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
        <div className="text-white relative">
            <div className="absolute -inset-x-[300px] -top-72 -bottom-6 md:-inset-x-32 md:-right-48 md:-inset-y-4 md:-top-24 -rotate-[5deg] bg-gradient-to-b from-black to-gray-700 opacity-30 -z-20"></div>

            <NavBar onNavigate={scrollToSection} />

            <Hero onCtaClick={() => scrollToSection("about")} />

            <About onCtaClick={() => scrollToSection("skills")} />

            <Skills onCtaClick={() => scrollToSection("projects")} />

            <Projects onCtaClick={() => scrollToSection("contact")} />

            <Contact />

            <Footer />
        </div>
    );
}
