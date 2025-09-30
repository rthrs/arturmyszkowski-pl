"use client";

import CTAButton from "@/components/ui/CTAButton";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

interface AboutProps {
    onCtaClick: () => void;
}

export default function About({ onCtaClick }: AboutProps) {
    return (
        <Section
            id="about"
            className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24"
            containerClassName="max-w-4xl mx-auto"
            contentClassName="space-y-12"
        >
            <div className="text-center">
                <SectionTitle>About</SectionTitle>
            </div>
            <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed">
                <p>
                    I&apos;m a Senior Software Engineer with extensive experience in modern web technologies and a
                    passion for creating scalable, maintainable applications. I&apos;m holding a Master&apos;s degree in
                    Computer Science from the University of Warsaw. With a strong foundation in algorithms and data
                    structures, I enjoy solving complex problems and building solutions that make a real difference.
                </p>
                <p>
                    My core philosophy is to continuously learn and apply the most effective technologies for each
                    project. I thrive in collaborative environments and enjoy working with diverse teams. While my main
                    expertise is in the React ecosystem, I am adaptable and comfortable working across a broad range of
                    tools and frameworks.
                </p>

                <div className="pt-2 flex justify-center">
                    <CTAButton onClick={onCtaClick} label="Explore my skills" className="px-6 py-3" />
                </div>
            </div>
        </Section>
    );
}
