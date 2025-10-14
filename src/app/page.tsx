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
import GradientBackground from "@/components/backgrounds/GradientBackground";
import GoToTopButton from "@/components/ui/buttons/GoToTopButton";
import Divider from "@/components/ui/Divider";
import { scrollToSection } from "@/utils/scroll";

export default function Home() {
    return (
        <main className="relative text-white">
            <GradientBackground />

            <NavBar onNavigate={scrollToSection} />

            <Hero />
            <Divider />
            <About />
            <Divider />
            <FrontendExpertise />
            <Divider />
            <FullStackSolutions />
            <Divider />
            <Projects />
            <Divider />
            <Resume />
            <Divider />
            <Contact />

            <Footer />

            <GoToTopButton />
        </main>
    );
}
