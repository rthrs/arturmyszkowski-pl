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
import { scrollToSection } from "@/utils/scroll";

export default function Home() {
    return (
        <main className="relative text-white">
            <BackgroundGradient />

            <NavBar onNavigate={scrollToSection} />

            <Hero />
            <div className="divider" />
            <About />
            <div className="divider" />
            <Skills />
            <div className="divider" />
            <Projects />
            <div className="divider" />
            <Resume />
            <div className="divider" />
            <Contact />

            <Footer />

            <GoToTopButton />
        </main>
    );
}
