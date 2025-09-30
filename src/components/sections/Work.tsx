"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import { FiDownload as Download, FiExternalLink, FiGithub } from "react-icons/fi";
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

export default function Work({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section id="work" className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-16 text-center"
                >
                    <div>
                        <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                            Work
                        </h2>
                    </div>

                    <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Explore my portfolio of projects and download my resume to learn more about my professional
                        experience, achievements, and technical expertise.
                    </p>

                    {/* Portfolio Section */}
                    <div className="mt-16">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-12"
                        >
                            Featured Projects
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.02,
                                        transition: { duration: 0.1, ease: "easeOut" }
                                    }}
                                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300"
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1
                                    }}
                                >
                                    {project.featured && (
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-medium px-3 py-1 rounded-full">
                                            Featured
                                        </div>
                                    )}

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
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Resume Download Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-200">Download Resume</h3>

                            <motion.a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
                            >
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 blur-lg"></div>
                                <Download size={24} strokeWidth={1.5} className="mr-2 relative z-10" />
                                <span className="relative z-10">Download Resume</span>
                            </motion.a>
                        </div>

                        <div className="flex justify-center">
                            <CTAButton onClick={onCtaClick} label="Get in touch" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
