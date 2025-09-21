"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import FluidBackground from "@/components/FluidBackground";
import { 
  Github, 
  Mail, 
  Download, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  Menu,
  X,
  ArrowRight,
  Instagram,
  FileText
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Close mobile menu first so header height collapses before measuring
    setIsMenuOpen(false);

    const performScroll = () => {
      const header = document.querySelector('nav') as HTMLElement | null;
      const headerHeight = header?.offsetHeight ?? 64; // fallback for safety
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight - 24; // small gap
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // Wait for layout to settle (menu collapse, address bar changes on mobile)
    requestAnimationFrame(() => {
      requestAnimationFrame(performScroll);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const skills = [
    { 
      name: "Frontend Development", 
      icon: Globe, 
      description: "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3/Sass, Tailwind CSS, Styled-Components, Chakra-UI",
      iconColorClass: "from-blue-900/50 to-gray-900/50 group-hover:bg-blue-700/50",
      cardBgClass: "from-blue-900/8 to-gray-900/50 hover:from-blue-800/20 hover:to-gray-800/40",
      animation: "rotate",
      hoverAnimation: {
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1.1, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
    { 
      name: "Mobile Development", 
      icon: Smartphone, 
      description: "React Native, iOS, Android",
      iconColorClass: "from-purple-900/50 to-gray-900/50 group-hover:bg-purple-700/50",
      cardBgClass: "from-purple-900/8 to-gray-900/50 hover:from-purple-800/20 hover:to-gray-800/40",
      animation: "bounce",
      hoverAnimation: {
        y: [0, -8, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
    { 
      name: "Backend & Databases", 
      icon: Database, 
      description: "Node.js, Express, Python, Django, Firebase, PostgreSQL, DuckDB, Firestore",
      iconColorClass: "from-green-900/50 to-gray-900/50 group-hover:bg-green-700/50",
      cardBgClass: "from-green-900/8 to-gray-900/50 hover:from-green-800/20 hover:to-gray-800/40",
      animation: "scale",
      hoverAnimation: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
    { 
      name: "Graphics & Visualization", 
      icon: Code, 
      description: "WebGL, Three.js, D3.js",
      iconColorClass: "from-pink-900/50 to-gray-900/50 group-hover:bg-pink-700/50",
      cardBgClass: "from-pink-900/8 to-gray-900/50 hover:from-pink-800/20 hover:to-gray-800/40",
      animation: "pulse",
      hoverAnimation: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
    { 
      name: "State Management", 
      icon: Code, 
      description: "Redux, Redux Saga, Immer, TanStack Query, RxJS",
      iconColorClass: "from-yellow-900/50 to-gray-900/50 group-hover:bg-yellow-700/50",
      cardBgClass: "from-yellow-900/8 to-gray-900/50 hover:from-yellow-800/20 hover:to-gray-800/40",
      animation: "wiggle",
      hoverAnimation: {
        rotate: [0, -5, 5, -5, 0],
        scale: [1, 1.1, 1.1, 1.1, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
    { 
      name: "DevOps & Leadership", 
      icon: Code, 
      description: "Git, Webpack, Rollup, AWS, Netlify, Hugo, Mentoring, Agile Methodologies",
      iconColorClass: "from-cyan-900/50 to-gray-900/50 group-hover:bg-cyan-700/50",
      cardBgClass: "from-cyan-900/8 to-gray-900/50 hover:from-cyan-800/20 hover:to-gray-800/40",
      animation: "float",
      hoverAnimation: {
        y: [0, -5, -10, -5, 0],
        scale: [1, 1.05, 1.1, 1.05, 1],
        transition: { duration: 0.9, ease: "easeInOut" as const }
      }
    },
  ];

  const defaultAnimation = {
    rotate: 0,
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const }
  };

  return (
    <div className="min-h-screen text-white relative">
    
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={scrollToTop}
              className="font-medium text-lg text-white hover:text-gray-300 transition-colors duration-300 font-mono z-60"
            >
              arturmyszkowski.pl
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center h-full">
              {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium px-4"
                >
                  {item}
                </button>
              ))}
              <a
                href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium px-4"
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Backdrop (closes menu on outside click) */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden
            />
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden relative z-50"
            >
              <div className="py-2 space-y-2">
                {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-gray-200 hover:text-white transition-colors text-base font-medium px-5 py-4 rounded-lg hover:bg-white/5"
                  >
                    {item}
                  </button>
                ))}
                <a
                  href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left text-gray-200 hover:text-white transition-colors text-base font-medium px-5 py-4 rounded-lg hover:bg-white/5"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Background Gradient */}
      <div className="absolute -inset-x-[300px] -top-72 -bottom-6 md:-inset-x-32 md:-right-48 md:-inset-y-4 md:-top-24 -rotate-[5deg] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-30"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative scroll-mt-20 sm:scroll-mt-24 pt-20 sm:pt-24">
        {/* WebGL Fluid Background */}
        <FluidBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
                  {/* Profile Photo */}
                  <div className="w-48 h-48 mx-auto mb-8 rounded-full relative">
                    {/* Enhanced blurred background photo */}
                    <Image
                      src="/images/profile.webp"
                      alt=""
                      fill
                      className="object-cover absolute -inset-6 blur-2xl scale-110 opacity-20 rounded-full"
                      priority
                    />
                    {/* Main profile photo */}
                    <Image
                      src="/images/profile.webp"
                      alt="Artur Myszkowski"
                      fill
                      className="object-cover relative z-10 rounded-full"
                      priority
                    />
                  </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-light text-white tracking-tight font-heading">
                Artur Myszkowski
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 font-light font-mono">
                Senior Software Engineer
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Building exceptional digital experiences with modern technologies. 
              Passionate about clean code, innovative solutions, and meaningful impact.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8"
            >
              <motion.button
                onClick={() => scrollToSection('work')}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                // transition={{ duration: 0.8, delay: 0 }}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg"></div>
                <span className="relative z-10">View My Work</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200 relative z-10" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center space-x-8 pt-12"
            >
              <motion.a
                href="https://github.com/rthrs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white relative group"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                <Github size={28} strokeWidth={1.5} className="relative z-10" />
              </motion.a>
              <motion.a
                href="https://instagram.com/artur6strings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white relative group"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                <Instagram size={28} strokeWidth={1.5} className="relative z-10" />
              </motion.a>
              <motion.a
                href="mailto:contact@arturmyszkowski.pl"
                className="text-gray-400 hover:text-white relative group"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                <Mail size={28} strokeWidth={1.5} className="relative z-10" />
              </motion.a>
              <motion.a
                href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white relative group"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-2 rounded-full bg-gray-500/12 blur-md"></div>
                <FileText size={28} strokeWidth={1.5} className="relative z-10" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                About
              </h2>
            </div>

            <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed">
              <p>
              I&apos;m a Senior Software Engineer with extensive experience in modern web technologies 
                and a passion for creating scalable, maintainable applications. I&apos;m holding a Master&apos;s degree
                in Computer Science from the University of Warsaw. With a strong foundation 
                in algorithms and data structures, I enjoy solving complex problems and building 
                solutions that make a real difference.
              </p>
              <p>
                My core philosophy is to continuously learn and apply the most effective technologies for each project. I thrive in collaborative environments and enjoy working with diverse teams. While my main expertise is in the React ecosystem, I am adaptable and comfortable working across a broad range of tools and frameworks.
              </p>
            
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 lg:px-8 relative scroll-mt-24">
      
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                Skills
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className={`group p-8 border border-gray-800 rounded-md hover:border-gray-700 transition-all duration-300 bg-gradient-to-bl ${skill.cardBgClass}`}
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl bg-gray-800 bg-gradient-to-bl ${skill.iconColorClass} transition-all duration-300 mr-4 border border-gray-600/30 hover:border-gray-500/50`}>
                      <motion.div
                        animate={hoveredSkill === skill.name ? skill.hoverAnimation : defaultAnimation}
                        className="text-white"
                      >
                        <skill.icon size={24} />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-medium text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light font-mono">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Work Section */}
      <section id="work" className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12 text-center"
          >
            <div>
              <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                Work
              </h2>
            </div>

            <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Download my resume to learn more about my professional experience, 
              achievements, and technical expertise.
            </p>

            <motion.a
              href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 blur-lg"></div>
              <Download size={24} strokeWidth={1.5} className="mr-2 relative z-10" />
              <span className="relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 relative z-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="inline-block text-5xl sm:text-6xl font-semibold bg-gradient-to-br from-gray-300 to-gray-400 mb-2 bg-clip-text text-transparent font-heading tracking-tight">
                Contact
              </h2>
            </div>

            <div className="text-center space-y-8">
              <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities 
                to be part of an ambitious team. Let&apos;s connect and explore how we can work together!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="mailto:contact@arturmyszkowski.pl"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-medium rounded-xl shadow-md hover:shadow-lg border border-blue-700/30 hover:border-blue-600/50 relative"
                >
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/12 to-blue-700/12 blur-lg"></div>
                  <Mail size={24} strokeWidth={1.5} className="mr-2 relative z-10" />
                  <span className="relative z-10">contact@arturmyszkowski.pl</span>
                </motion.a>
                <motion.a
                  href="https://instagram.com/artur6strings"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium rounded-xl shadow-md hover:shadow-lg border border-gray-600/30 hover:border-gray-500/50 relative"
                >
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-gray-500/12 to-gray-600/12 blur-lg"></div>
                  <Instagram size={24} strokeWidth={1.5} className="mr-2 relative z-10" />
                  <span className="relative z-10">Instagram</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p className="text-gray-400 font-light font-mono mb-1">
            © 2025 Artur Myszkowski
            </p>
            <p className="text-gray-400 font-light font-mono text-xs">
            Built with{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-500/50 hover:decoration-blue-400/70"
            >
              Next.js
            </a>
            {', '}
            <a 
              href="https://tailwindcss.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline decoration-cyan-500/50 hover:decoration-cyan-400/70"
            >
              Tailwind CSS
            </a>
            {', '}
            <a 
              href="https://www.framer.com/motion/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline decoration-purple-500/50 hover:decoration-purple-400/70"
            >
              Framer Motion
            </a>
            {' and '}
            <a 
              href="https://threejs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-500/50 hover:decoration-emerald-400/70"
            >
              Three.js
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
