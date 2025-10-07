"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import BackgroundGradient from "@/components/BackgroundGradient";
import GoToTopButton from "@/components/ui/GoToTopButton";

export default function Home() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <main className="relative text-white">
            <BackgroundGradient />

            <NavBar onNavigate={scrollToSection} />

            <Hero onCtaClick={() => scrollToSection("about")} />
            <div className="divider" />
            <About onCtaClick={() => scrollToSection("skills")} />
            <div className="divider" />
            <Skills onCtaClick={() => scrollToSection("projects")} />
            <div className="divider" />
            <Projects onCtaClick={() => scrollToSection("resume")} />
            <div className="divider" />
            <Resume onCtaClick={() => scrollToSection("contact")} />
            <div className="divider" />
            <Contact />

            <Footer />

            <GoToTopButton />
        </main>
    );
}
