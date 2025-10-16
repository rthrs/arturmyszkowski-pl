"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiFileText } from "react-icons/fi";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/section/Section";
import SectionTitle from "@/components/ui/section/SectionTitle";
import SectionSubtitle from "@/components/ui/section/SectionSubtitle";

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
            "An interactive network analysis tool capable of visualizing massive datasets. I engineered a custom WebGL rendering engine that achieves real-time interaction with graphs of over 500,000 vertices, overcoming typical browser performance limitations.",
        technologies: ["React", "Three.js", "WebGL", "WebWorkers", "Rollup", "Graph Theory", "Network Analysis"],
        liveUrl: "https://network-centrality.firebaseapp.com/graph",
        image: "/images/projects/networks-centrality.png"
    },
    {
        title: "igraph-community.js",
        description:
            "A high-speed JavaScript library for community detection in networks. By compiling C/C++ to WebAssembly, the library achieves near-native performance in the browser. It features three novel algorithms I designed and serves as the core analysis engine for the Networks Centrality project.",
        technologies: ["JavaScript", "C/C++", "WebAssembly", "Emscripten"],
        githubUrl: "https://github.com/rthrs/igraph-community.js",
        paperUrl: "/documents/igraph-community-js-paper.pdf",
        image: "/images/projects/igraph-community.png"
    },
    {
        title: "333 Daily",
        description:
            "A responsive Progressive Web App (PWA) designed to implement the 3/3/3 productivity method. I focused on creating an intuitive, minimalist user interface with clear progress tracking to help users effortlessly manage their daily goals and stay productive.",
        technologies: ["React", "PWA", "Tailwind CSS", "Framer Motion", "Netlify", "Vite"],
        githubUrl: "https://github.com/rthrs/333daily",
        liveUrl: "https://333daily.netlify.app",
        image: "/images/projects/333daily.png"
    },
    {
        title: "arturmyszkowski.pl",
        description:
            "My personal portfolio as an open-source project using Next.js. The goal was to create a visually engaging and responsive platform to showcase my professional journey, with the code publicly available for exploration.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Three Fiber"],
        githubUrl: "https://github.com/rthrs/arturmyszkowski-pl",
        image: "/images/projects/arturmyszkowski-pl.png"
    }
];

export default function Projects() {
    return (
        <Section
            id="projects"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="justify-center space-y-8 xl:space-y-10"
            scrollButton={{
                label: "Learn My Journey",
                targetSection: "resume"
            }}
        >
            <div className="text-center">
                <SectionTitle>Featured Projects</SectionTitle>
                <SectionSubtitle>
                    I enjoy building high-performance web applications combining advanced algorithms, interactive
                    visualizations, and modern development practices.
                </SectionSubtitle>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {projects.map((project) => (
                    <Card key={project.title} featured={project.featured} className="flex flex-col">
                        {project.image && (
                            <div className="relative w-full h-32 rounded-t-xl overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent" />
                            </div>
                        )}
                        <div className="p-4 flex flex-col space-y-3 flex-1">
                            <h4 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors">
                                {project.title}
                            </h4>

                            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-1">
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
        </Section>
    );
}
