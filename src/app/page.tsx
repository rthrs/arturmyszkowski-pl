"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: "Frontend", icon: Globe, description: "React, Next.js, TypeScript" },
    { name: "Backend", icon: Database, description: "Node.js, Python, APIs" },
    { name: "Mobile", icon: Smartphone, description: "React Native, iOS, Android" },
    { name: "DevOps", icon: Code, description: "Docker, AWS, CI/CD" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
    
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-medium text-lg text-white"
            >
              artur.myszkowski
            </motion.div>
            
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
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Profile Photo Placeholder */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">AM</span>
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
              <button
                onClick={() => scrollToSection('work')}
                className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              >
                View My Work
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center space-x-8 pt-12"
            >
              <a
                href="https://github.com/arturmyszkowski"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/arturmyszkowski"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:artur@myszkowski.pl"
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
                and a passion for creating scalable, maintainable applications. With a strong foundation 
                in both frontend and backend development, I enjoy solving complex problems and building 
                solutions that make a real difference.
              </p>
              <p>
                My journey in software development has led me to work with diverse teams and technologies, 
                from startups to enterprise environments. I&apos;m particularly passionate about clean code, 
                user experience, and staying current with the latest industry trends and best practices.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open source 
                projects, or sharing knowledge with the developer community. I&apos;m always eager to take on new 
                challenges and opportunities for growth.
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </motion.button>
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
                I&apos;m always interested in new opportunities and exciting projects. 
                Let&apos;s connect and discuss how we can work together!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:artur@myszkowski.pl"
                  className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
                >
                  <Mail size={20} className="mr-2" />
                  artur@myszkowski.pl
                </a>
                <a
                  href="https://linkedin.com/in/arturmyszkowski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-8 py-4 border border-gray-800 hover:border-gray-700 text-white font-medium rounded-lg transition-all duration-300"
                >
                  <Linkedin size={20} className="mr-2" />
                  LinkedIn
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
            © 2024 Artur Myszkowski. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
