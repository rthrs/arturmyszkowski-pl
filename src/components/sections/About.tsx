"use client";

import Section, { ScrollButtonProps } from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";
import GradientBackground from "@/components/backgrounds/GradientBackground";

interface AboutProps {
    id?: string;
    scrollButton?: ScrollButtonProps;
}

export default function About({ id: sectionId = "about", scrollButton }: AboutProps = {}) {
    return (
        <Section
            id={sectionId}
            containerClassName="max-w-4xl mx-auto"
            contentClassName="justify-center space-y-8 xl:space-y-10"
            scrollButton={scrollButton}
            background={<GradientBackground direction="bottom" />}
        >
            <div className="text-center">
                <SectionTitle>About Me</SectionTitle>
                <SectionSubtitle>
                    I am an experienced Software Engineer with a Master's in Computer Science specializing
                    in architecting scalable web applications. My deep foundation in algorithms and system
                    design allows me to transform complex business challenges into robust, high-impact technical
                    solutions. I also actively leverage modern AI tools to accelerate development cycles, enhance
                    code quality, and efficiently deliver value.
                </SectionSubtitle>
            </div>
        </Section>
    );
}
