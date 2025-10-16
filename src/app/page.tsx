"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FrontendExpertise from "@/components/sections/FrontendExpertise";
import FullStackSolutions from "@/components/sections/FullStackSolutions";
import Projects from "@/components/sections/Projects";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import GoToTopButton from "@/components/ui/buttons/GoToTopButton";
import { scrollToSection } from "@/utils/scroll";

export default function Home() {
    return (
        <main className="relative text-white">
            <NavBar onNavigate={scrollToSection} />

            <Hero />
            <About />
            <FrontendExpertise />
            <FullStackSolutions />
            <Projects />
            <Resume />
            <Contact />

            <Footer />

            <GoToTopButton />
        </main>
    );
}
