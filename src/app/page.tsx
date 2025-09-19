"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  Instagram
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: "Frontend Development", icon: Globe, description: "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3/Sass, Tailwind CSS, Styled-Components, Chakra-UI" },
    { name: "Mobile Development", icon: Smartphone, description: "React Native, iOS, Android" },
    { name: "Backend & Databases", icon: Database, description: "Node.js, Express, Python, Django, Firebase, PostgreSQL, DuckDB, Firestore" },
    { name: "Graphics & Visualization", icon: Code, description: "WebGL, Three.js, D3.js" },
    { name: "State Management", icon: Code, description: "Redux, Redux Saga, Immer, TanStack Query, RxJS" },
    { name: "DevOps & Leadership", icon: Code, description: "Git, Webpack, Rollup, AWS, Netlify, Hugo, Mentoring, Agile Methodologies" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
    
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={scrollToTop}
              className="font-medium text-lg text-white hover:text-gray-300 transition-colors duration-300"
            >
              arturmyszkowski.pl
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-4">
                {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Profile Photo */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-gray-700 relative">
              <Image 
                src="/images/profile.webp" 
                alt="Artur Myszkowski" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-light text-white tracking-tight">
                Artur Myszkowski
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 font-light">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View My Work
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center space-x-8 pt-12"
            >
              <a
                href="https://github.com/rthrs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/artur6strings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:contact@arturmyszkowski.pl"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
                About
              </h2>
              <div className="w-24 h-px bg-blue-600 mx-auto"></div>
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

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
                Skills
              </h2>
              <div className="w-24 h-px bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  
                  className="group p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors duration-300 mr-4">
                      <skill.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12 text-center"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
                Work
              </h2>
              <div className="w-24 h-px bg-blue-600 mx-auto"></div>
            </div>

            <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Download my resume to learn more about my professional experience, 
              achievements, and technical expertise.
            </p>

            <motion.a
              href="/documents/Artur_Myszkowski_Resume_2025_v4.pdf"
              download="Artur_Myszkowski_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
                Contact
              </h2>
              <div className="w-24 h-px bg-blue-600 mx-auto"></div>
            </div>

            <div className="text-center space-y-8">
              <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities 
                to be part of an ambitious team. Let&apos;s connect and explore how we can work together!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:contact@arturmyszkowski.pl"
                  className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail size={20} className="mr-2" />
                  contact@arturmyszkowski.pl
                </a>
                <a
                  href="https://instagram.com/artur6strings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Instagram size={20} className="mr-2" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 font-light">
            © 2025 Artur Myszkowski. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
