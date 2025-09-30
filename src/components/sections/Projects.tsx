"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiDownload as Download } from "react-icons/fi";
import CTAButton from "@/components/ui/CTAButton";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";
import { RESUME_URL } from "@/constants/nav";

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
        title: "E-Commerce Platform",
        description:
            "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
        githubUrl: "https://github.com/arturmyszkowski/ecommerce-platform",
        liveUrl: "https://ecommerce-demo.vercel.app",
        featured: true
    },
    {
        title: "Real-time Chat Application",
        description:
            "Modern chat application with real-time messaging, file sharing, and video calls. Built with React Native for cross-platform compatibility.",
        technologies: ["React Native", "Socket.io", "Firebase", "WebRTC"],
        githubUrl: "https://github.com/arturmyszkowski/chat-app",
        liveUrl: "https://chat-demo.netlify.app"
    },
    {
        title: "Data Visualization Dashboard",
        description:
            "Interactive dashboard for data analysis and visualization using D3.js and Three.js. Features 3D charts, real-time updates, and custom animations.",
        technologies: ["React", "D3.js", "Three.js", "WebGL", "TypeScript"],
        githubUrl: "https://github.com/arturmyszkowski/data-viz-dashboard",
        liveUrl: "https://data-viz-demo.vercel.app"
    },
    {
        title: "Task Management System",
        description:
            "Collaborative task management tool with drag-and-drop functionality, team collaboration features, and project tracking capabilities.",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion", "Tailwind CSS"],
        githubUrl: "https://github.com/arturmyszkowski/task-manager",
        liveUrl: "https://task-manager-demo.vercel.app"
    }
];

export default function Projects({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <Section
            id="projects"
            className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24"
            containerClassName="max-w-6xl mx-auto"
            contentClassName="space-y-16"
        >
            <div className="text-center">
                <SectionTitle>Featured Projects</SectionTitle>
                <SectionSubtitle>
                    Explore my portfolio of projects and download my resume to learn more about my professional
                    experience, achievements, and technical expertise.
                </SectionSubtitle>
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

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <CTAButton label="Download Resume" rightIcon={<Download size={18} />} variant="blue" />
                </a>

                <div className="w-fit">
                    <CTAButton onClick={onCtaClick} label="Get in touch" />
                </div>
            </div>
        </Section>
    );
}
