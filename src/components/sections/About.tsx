"use client";

import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";

export default function About() {
    return (
        <Section
            id="about"
            containerClassName="max-w-4xl mx-auto"
            contentClassName="space-y-8 xl:space-y-10 flex flex-col items-center"
            scrollButton={{
                label: "Explore my skills",
                targetSection: "skills"
            }}
        >
            <div className="text-center">
                <SectionTitle>About</SectionTitle>
                <SectionSubtitle className="text-justify">
                    I&apos;m a Software Engineer with extensive experience in modern web technologies and a passion for
                    creating scalable, maintainable applications.
                    <br />
                    <br />
                    Holding a Master&apos;s degree in Computer Science from the University of Warsaw, I have a strong
                    foundation in algorithms and data structures, which enables me to solve complex problems and build
                    solutions that make a real difference.
                    <br />
                    <br />
                    Recently, I&apos;ve been expanding my expertise and exploring how to work effectively with modern AI
                    tools, with the goal of boosting my productivity and delivering high-quality results.
                </SectionSubtitle>
            </div>
        </Section>
    );
}
