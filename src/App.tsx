import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, X, Linkedin, Mail, Phone, MapPin, MessageCircle, Send, 
  User, Briefcase, GraduationCap, Code, Award, ExternalLink, 
  Github, Calendar, Users, Target, TrendingUp, Database, 
  Settings, Zap, CheckCircle, Play, ChevronRight, Star,
  Globe, Cpu, BarChart3, Shield, Rocket, Brain
} from 'lucide-react';
import { ThreeHero } from './components/ThreeHero';
import { AnimatedBackground } from './components/AnimatedBackground';
import { GSAPScrollAnimation, GSAPStaggerAnimation, GSAPParallax } from './components/GSAPAnimations';
import { KineticTypography, TypewriterEffect, MorphingText, GlitchText } from './components/KineticTypography';
import { InteractiveButton, RippleButton, MorphButton, ParticleButton } from './components/InteractiveButtons';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
    );

    gsap.fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.3 }
    );

    gsap.fromTo('.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.6 }
    );

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Star },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const experiences = [
    {
      title: 'Product Manager',
      company: 'ICICI Bank',
      period: 'Jun 2024 - Present',
      location: 'Mumbai, India',
      description: 'Leading API integration for international trade applications across 10+ countries with 99.9% uptime.',
      achievements: [
        '10-country API integration led for NTS International & Trade Online application',
        '10+ real-time API endpoints developed using Spring Boot microservices',
        '5+ international applications operated with 99.9% uptime',
        '30% troubleshooting time reduction through API response optimization',
        'Analyzed and resolved 30+ cross-geo API failures through advanced SQL'
      ],
      technologies: ['Spring Boot', 'REST APIs', 'OAuth2', 'Microservices', 'API Gateway', 'SQL', 'Power BI']
    },
    {
      title: 'Data Analyst Intern',
      company: 'Wells Fargo',
      period: 'May 2023 - Jul 2023',
      location: 'Bangalore, India',
      description: 'Achieved 70% reduction in server execution time through Python automation and analyzed 50,000+ records.',
      achievements: [
        '70% reduction in server execution time through Python automation',
        '15-step DNS server interaction framework built using Python',
        'Analyzed 50,000+ records using SAS and SQL for data segmentation',
        'Enhanced system performance metrics and reduced error recurrence by 25%'
      ],
      technologies: ['Python', 'SAS', 'SQL', 'Data Analysis', 'Automation', 'DNS Systems']
    }
  ];

  const education = {
    institution: 'Indian Institute of Technology Roorkee',
    degree: 'Bachelor of Technology',
    period: 'Oct 2020 - May 2024',
    cgpa: '8.18 / 10.0',
    positions: [
      'Secretary | AirSoc - IIT Roorkee',
      'Placement Manager | PIC - IIT Roorkee'
    ]
  };

  const skills = [
    {
      category: 'Product Management',
      skills: [
        { name: 'Product Lifecycle Management', level: 95 },
        { name: 'Strategic Problem Solving', level: 92 },
        { name: 'Cross-functional Leadership', level: 90 },
        { name: 'Stakeholder Management', level: 88 }
      ]
    },
    {
      category: 'Programming & APIs',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'SQL', level: 88 },
        { name: 'REST APIs', level: 92 },
        { name: 'Spring Boot', level: 85 }
      ]
    },
    {
      category: 'Data & Analytics',
      skills: [
        { name: 'Data Analysis', level: 90 },
        { name: 'SAS', level: 85 },
        { name: 'A/B Testing', level: 88 },
        { name: 'Statistical Analysis', level: 87 }
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'JIRA', level: 90 },
        { name: 'Confluence', level: 88 },
        { name: 'Postman', level: 92 },
        { name: 'Advanced Excel', level: 85 }
      ]
    }
  ];

  const projects = [
    {
      id: '1',
      title: 'NTS International Trade Platform',
      description: 'Led API integration for international trade applications across 10+ countries with 99.9% uptime.',
      longDescription: 'Developed and managed a comprehensive international trade platform that revolutionized cross-border transactions. The platform integrates with multiple banking systems and regulatory frameworks across different countries.',
      technologies: ['Spring Boot', 'REST APIs', 'OAuth2', 'Microservices', 'API Gateway', 'TLS Encryption'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: [
        { label: 'Countries', value: '10+' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'API Endpoints', value: '15+' },
        { label: 'Daily Transactions', value: '1000+' }
      ]
    },
    {
      id: '2',
      title: 'AI Chat Bot with NLP/ML',
      description: 'Developed an intelligent chatbot achieving 95%+ accuracy using advanced NLP and machine learning.',
      longDescription: 'Built a sophisticated AI-powered chatbot using natural language processing and machine learning algorithms. The system processes user queries, understands context, and provides accurate responses.',
      technologies: ['Python', 'NLP', 'Machine Learning', 'TensorFlow', 'NLTK', 'Scikit-learn'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: [
        { label: 'Accuracy', value: '95%+' },
        { label: 'Response Time', value: '<2s' },
        { label: 'Languages', value: '5+' },
        { label: 'Training Data', value: '10K+' }
      ]
    },
    {
      id: '3',
      title: 'Payload Dropping VTOL Prototype',
      description: 'Engineered a VTOL prototype with 40% increased payload capacity and 90%+ targeting accuracy.',
      longDescription: 'Designed and built a vertical take-off and landing aircraft prototype with advanced payload delivery capabilities. The project involved aerodynamic design and precision targeting algorithms.',
      technologies: ['SIFT Algorithm', 'Computer Vision', 'Flight Control', 'Aerodynamics', 'Embedded Systems'],
      image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: [
        { label: 'Payload Increase', value: '40%' },
        { label: 'Targeting Accuracy', value: '90%+' },
        { label: 'Flight Time', value: '45min' },
        { label: 'Range', value: '15km' }
      ]
    }
  ];

  const certifications = [
    {
      title: 'McKinsey.org Forward Program',
      issuer: 'McKinsey & Company',
      date: 'Jul 2025',
      description: 'Strategic business leadership and consulting methodologies',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Python & Gen AI Basics',
      issuer: 'Udemy',
      date: 'Feb 2025',
      credentialId: 'UC-e5e71b61-a7c9-4167-9abd-c3430861ac6c',
      skills: ['Python', 'Machine Learning', 'Generative AI', 'Data Science'],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Certification Of Merit',
      issuer: 'Cognizance, IIT Roorkee',
      date: 'Jul 2022',
      credentialId: '55558088-c555-4c22-97b9-b093567c2391',
      description: 'Technical excellence and innovation in engineering projects',
      image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      {/* Advanced Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Priyam Bansal
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-slate-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
        {/* 3D Hero Background */}
        <ThreeHero />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1
            className="hero-title text-5xl md:text-7xl font-bold mb-6"
          >
            <MorphingText 
              text="Priyam Bansal"
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            />
          </h1>

          <div
            className="hero-subtitle text-2xl md:text-3xl text-gray-300 mb-8"
          >
            <span className="font-semibold">
              <KineticTypography 
                words={['Product Manager', 'API Integration Expert', 'Data Analysis Specialist', 'Strategic Problem Solver']}
                className="text-2xl md:text-3xl"
              />
            </span>
          </div>

          <p
            className="hero-description text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            <TypewriterEffect 
              text="Driving innovation through data-driven solutions and strategic problem-solving. Specializing in API integration, product lifecycle management, and cross-functional leadership."
              delay={2000}
              speed={30}
            />
          </p>

          <div
            className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center"
          >
            <InteractiveButton
              variant="magnetic"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </InteractiveButton>
            <RippleButton
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </RippleButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate Product Manager at ICICI Bank with a strong background in API integration, 
                data analysis, and strategic problem-solving. With experience spanning across international 
                trade applications and financial technology, I specialize in driving innovation through 
                data-driven solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey began at IIT Roorkee, where I developed a solid foundation in technology and 
                leadership. I've since applied these skills to achieve remarkable results, including 
                leading API integrations across 10+ countries with 99.9% uptime and reducing server 
                execution time by 70% through Python automation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in the power of cross-functional collaboration and strategic thinking to solve 
                complex business challenges. My approach combines technical expertise with business acumen 
                to deliver solutions that drive real impact.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                    <div className="text-sm text-gray-400">Countries Integrated</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                    <div className="text-sm text-gray-400">System Uptime</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-green-400 mb-2">70%</div>
                    <div className="text-sm text-gray-400">Performance Improvement</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                    <div className="text-sm text-gray-400">Records Analyzed</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span className="text-blue-400 font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: achIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{education.degree}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span className="text-blue-400 font-semibold">{education.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{education.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                CGPA: {education.cgpa}. Active in leadership roles including Secretary at AirSoc and Placement Manager at PIC.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Leadership Positions:</h4>
                <ul className="space-y-2">
                  {education.positions.map((position, posIndex) => (
                    <motion.li
                      key={posIndex}
                      className="flex items-start gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: posIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      {position}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Leadership', 'Project Management', 'Technical Skills', 'Team Management'].map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code className="text-blue-400" size={24} />
                  {skillGroup.category}
                </h3>
                <div className="space-y-4">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-blue-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-sm">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-blue-400">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Licenses
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <Star className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                    <p className="text-blue-400 font-semibold text-sm">{cert.issuer}</p>
                  </div>
                </div>

                <div className="text-gray-400 text-sm mb-3">
                  Issued {cert.date}
                </div>

                {cert.credentialId && (
                  <div className="text-xs text-gray-500 mb-3 font-mono">
                    ID: {cert.credentialId}
                  </div>
                )}

                {cert.description && (
                  <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                )}

                {cert.skills && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPScrollAnimation animation="scaleIn">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <GlitchText 
                text="Get In Touch"
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              />
            </h2>
          </GSAPScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12">
            <GSAPScrollAnimation animation="fadeInLeft">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    <MorphingText text="Let's Connect" />
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm always interested in discussing new opportunities, innovative projects, 
                    and potential collaborations. Whether you're looking for a product manager, 
                    need consultation on API integration, or want to explore data-driven solutions, 
                    I'd love to hear from you.
                  </p>
                </div>

                <GSAPStaggerAnimation stagger={0.1}>
                  <div className="space-y-4">
                    <motion.a
                      href="mailto:priyam_b@ch.iitr.ac.in"
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                      whileHover={{ scale: 1.02, x: 10, rotateY: 5 }}
                    >
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <Mail className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Email</div>
                        <div className="text-gray-400">priyam_b@ch.iitr.ac.in</div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="tel:+919588526725"
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                      whileHover={{ scale: 1.02, x: 10, rotateY: -5 }}
                    >
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                        <Phone className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Phone</div>
                        <div className="text-gray-400">+91 9588526725</div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/priyambansal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                      whileHover={{ scale: 1.02, x: 10, rotateY: 5 }}
                    >
                      <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Linkedin className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-semibold">LinkedIn</div>
                        <div className="text-gray-400">linkedin.com/in/priyambansal</div>
                      </div>
                    </motion.a>

                    <motion.div
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg"
                      whileHover={{ scale: 1.02, rotateY: -5 }}
                    >
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <MapPin className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Location</div>
                        <div className="text-gray-400">Mumbai, India</div>
                      </div>
                    </motion.div>
                  </div>
                </GSAPStaggerAnimation>
              </div>
            </GSAPScrollAnimation>

            <GSAPScrollAnimation animation="fadeInRight">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-6">
                  <MorphingText text="Send a Message" />
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <motion.input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <motion.textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors resize-none"
                      whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
                    />
                  </div>
                  <ParticleButton className="w-full flex items-center justify-center gap-2">
                    <Send size={20} />
                    Send Message
                  </ParticleButton>
                </form>
              </div>
            </GSAPScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Priyam Bansal. All rights reserved.</p>
            <p className="mt-2">Built with React, TypeScript, and Framer Motion</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;