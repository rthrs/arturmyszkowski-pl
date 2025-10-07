"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import CTAButton from "@/components/ui/CTAButton";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        title: "Networks Centrality",
        description:
            "Authored a high-performance, interactive web application for the in-depth analysis of network data, focusing on centrality measures and community detection. A key innovation of this project is the custom-built graph rendering engine, which I engineered from the ground up using WebGL and Three.js to achieve real-time visualization of large-scale networks exceeding 500,000 vertices.",
        technologies: [
            "React",
            "Three.js",
            "WebGL",
            "Styled-Components",
            "WebWorkers",
            "Community Detection",
            "Rollup",
            "Shaders"
        ],
        liveUrl: "https://network-centrality.firebaseapp.com/graph",
        featured: true
    },
    {
        title: "igraph-community.js",
        description:
            "Developed a high-performance JavaScript library for community detection, achieving near-native browser speeds by compiling C/C++ to WebAssembly using Emscripten. This library introduces three novel algorithms I designed for networks with pre-existing structural knowledge and serves as the core community detection engine for Networks Centrality application.",
        technologies: [
            "JavaScript",
            "WebAssembly",
            "Emscripten",
            "C/C++",
            "Community Detection",
            "Graph Theory",
            "Network Analysis"
        ],
        githubUrl: "https://github.com/rthrs/igraph-community.js",
        featured: true
    },
    {
        title: "333daily",
        description:
            "Creator of a modern, responsive React Progressive Web App (PWA) designed to implement Oliver Burkeman's 3/3/3 productivity method. Featuring an intuitive interface and progress tracking, the app guides users to dedicate 3 hours to their most important project, complete 3 urgent tasks, and tackle 3 daily maintenance activities",
        technologies: ["React", "JavaScript", "Tailwind CSS", "Vite", "Framer Motion", "Netlify", "PWA"],
        githubUrl: "https://github.com/rthrs/333daily",
        liveUrl: "https://333daily.netlify.app",
        featured: true
    },
    {
        title: "arturmyszkowski.pl",
        description:
            "This website serves as my digital portfolio, which I built as an open-source project using Next.js. My goal was to create a visually engaging and responsive platform to detail my professional journey, with the code publicly available for others to explore.",
        technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "React"],
        githubUrl: "https://github.com/rthrs/arturmyszkowski-pl",
        featured: true
    }
];

export default function Projects({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <Section id="projects" containerClassName="max-w-6xl mx-auto" contentClassName="space-y-16">
            <div className="text-center">
                <SectionTitle>Featured Projects</SectionTitle>
                {/* <SectionSubtitle className="max-w-3xl">Explore my portfolio of projects.</SectionSubtitle> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Card key={project.title} featured={project.featured}>
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                                {project.title}
                            </h4>

                            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                                {project.githubUrl && (
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        <FiGithub size={16} />
                                        <span>Code</span>
                                    </motion.a>
                                )}
                                {project.liveUrl && (
                                    <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        <FiExternalLink size={16} />
                                        <span>Live Demo</span>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col gap-6 justify-center items-center">
                <CTAButton onClick={onCtaClick} label="Get in touch" />
            </div>
        </Section>
    );
}
