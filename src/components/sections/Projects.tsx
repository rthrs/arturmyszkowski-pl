"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiFileText } from "react-icons/fi";
import SectionScrollButton from "@/components/ui/SectionScrollButton";
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
    paperUrl?: string;
    image?: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        title: "Networks Centrality",
        description:
            "High-performance web app for interactive network analysis and visualization. Its key feature is a custom WebGL and Three.js rendering engine created to handle large-scale graphs of over 500,000 vertices in real-time.",
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
        image: "/images/projects/networks-centrality.png"
    },
    {
        title: "igraph-community.js",
        description:
            "Open-source JavaScript library for community detection, compiling C/C++ to WebAssembly with Emscripten for near-native browser speeds. It features three novel algorithms I designed for specific network types and serves as the core analysis engine for Networks Centrality app.",
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
        paperUrl: "/documents/igraph-community-js-paper.pdf",
        image: "/images/projects/igraph-community.png"
    },
    {
        title: "333 Daily",
        description:
            "Modern, responsive React PWA to help people implement Oliver Burkeman's 3/3/3 productivity method. The app uses an intuitive interface and progress tracking to guide users through their daily goals: three hours on a main project, three urgent tasks, and three maintenance items.",
        technologies: ["React", "PWA", "Tailwind CSS", "Vite", "Framer Motion", "Netlify"],
        githubUrl: "https://github.com/rthrs/333daily",
        liveUrl: "https://333daily.netlify.app",
        image: "/images/projects/333daily.png"
    },
    {
        title: "arturmyszkowski.pl",
        description:
            "My personal portfolio as an open-source project using Next.js. The goal was to create a visually engaging and responsive platform to showcase my professional journey, with the code publicly available for exploration.",
        technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "React"],
        githubUrl: "https://github.com/rthrs/arturmyszkowski-pl",
        image: "/images/projects/arturmyszkowski-pl.png"
    }
];

export default function Projects() {
    return (
        <Section id="projects" containerClassName="max-w-6xl mx-auto" contentClassName="space-y-16">
            <div className="text-center">
                <SectionTitle>Featured Projects</SectionTitle>
                <SectionSubtitle center large>
                    My experience spans across full-stack development, network analysis, and performance optimization. I
                    thrive in collaborative environments and enjoy working with diverse teams.
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {projects.map((project) => (
                    <Card key={project.title} featured={project.featured} className="flex flex-col">
                        {project.image && (
                            <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                            </div>
                        )}
                        <div className="p-6 flex flex-col space-y-4 flex-1">
                            <h4 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                                {project.title}
                            </h4>

                            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 p-1 mt-auto">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
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
                                {project.paperUrl && (
                                    <motion.a
                                        href={project.paperUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        <FiFileText size={16} />
                                        <span>Paper</span>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 justify-center items-center"
            >
                <SectionScrollButton label="View my Resume" targetSection="resume" variant="gray" />
            </motion.div>
        </Section>
    );
}
