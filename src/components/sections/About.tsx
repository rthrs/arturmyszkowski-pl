"use client";

import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";

export default function About() {
    return (
        <Section
            id="about"
            containerClassName="max-w-4xl mx-auto"
            contentClassName="justify-center space-y-8 xl:space-y-10"
            scrollButton={{
                label: "Explore My Skills",
                targetSection: "frontend-expertise"
            }}
        >
            <div className="text-center">
                <SectionTitle>About Me</SectionTitle>
                <SectionSubtitle className="text-justify">
                    I am a Software Engineer specializing in high-performance web applications. My passion lies in
                    building scalable, maintainable solutions that effectively solve complex problems.
                    <br />
                    <br />
                    With a Master&apos;s in Computer Science from the University of Warsaw, I have a deep foundation in
                    algorithms and data structures. This allows me to architect and build solutions that not only
                    function flawlessly but also deliver significant impact.
                    <br />
                    <br />I am currently integrating modern AI tools into my workflow to further enhance productivity
                    and push the boundaries of what&apos;s possible in web development.
                </SectionSubtitle>
            </div>
        </Section>
    );
}
