import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Download, MessageCircle, Send, User, Briefcase, GraduationCap, Code, Award, ExternalLink } from 'lucide-react';
import { ThreeHero } from './components/ThreeHero';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollAnimation, StaggeredAnimation } from './components/ScrollAnimations';
import { InteractiveProjectCard } from './components/InteractiveProjectCard';
import { KineticTypography, TypewriterEffect } from './components/KineticTypography';
import { PerformanceOptimizedImage } from './components/PerformanceOptimizedImage';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Priyam\'s AI assistant. Ask me anything about his experience, skills, or projects!' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced projects data
  const projects = [
    {
      title: 'NTS International Trade Platform',
      description: 'Led API integration across 10+ countries for international trade applications with real-time data exchange and 99.9% uptime.',
      longDescription: 'Comprehensive trade platform enabling seamless cross-border transactions through advanced API integration, microservices architecture, and real-time data synchronization across multiple international markets.',
      technologies: ['REST APIs', 'Spring Boot', 'OAuth2', 'Microservices', 'TLS Encryption'],
      metrics: [
        { label: 'Countries', value: '10+' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'API Endpoints', value: '10+' },
        { label: 'Performance Boost', value: '30%' }
      ]
    },
    {
      title: 'AI Chat Bot',
      description: 'Engineered an end-to-end chatbot system using NLP and ML, achieving 95%+ response accuracy with advanced preprocessing and entity recognition.',
      longDescription: 'Advanced conversational AI system built with natural language processing and machine learning algorithms, featuring context awareness, entity recognition, and continuous learning capabilities.',
      technologies: ['NLP', 'Machine Learning', 'Python', 'TensorFlow', 'Entity Recognition'],
      metrics: [
        { label: 'Accuracy', value: '95%+' },
        { label: 'Response Time', value: '<200ms' },
        { label: 'False Positives', value: '-30%' },
        { label: 'Resolution Rate', value: '+20%' }
      ]
    },
    {
      title: 'Payload Dropping VTOL',
      description: 'Designed a UAV with 227mm rotor diameter, optimizing structural integrity to increase payload capacity by 40% while maintaining flight balance.',
      longDescription: 'Innovative vertical takeoff and landing aircraft design featuring autonomous targeting systems, advanced flight control algorithms, and precision payload delivery mechanisms.',
      technologies: ['UAV Design', 'SIFT Algorithm', 'Autonomous Systems', 'Flight Control', 'Computer Vision'],
      metrics: [
        { label: 'Payload Increase', value: '40%' },
        { label: 'Accuracy', value: '90%+' },
        { label: 'Rotor Diameter', value: '227mm' },
        { label: 'Max Payload', value: '200g' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setCurrentMessage('');

    // Simple chatbot responses based on keywords
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        botResponse = 'Priyam is currently a Product Manager at ICICI Bank, where he leads API integration for international trade applications across 10+ countries. He previously worked as a Data Analyst Intern at Wells Fargo, achieving 70% reduction in server execution time through Python automation.';
      } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college')) {
        botResponse = 'Priyam graduated from IIT Roorkee with a Bachelor of Technology degree, maintaining a CGPA of 8.18/10.0. He was actively involved in leadership roles including Secretary at AirSoc and Placement Manager at PIC.';
      } else if (lowerMessage.includes('skills') || lowerMessage.includes('technology')) {
        botResponse = 'Priyam\'s key skills include Product Lifecycle Management, SQL, Python, API Integration, Data Analysis, A/B Testing, Strategic Problem Solving, and Cross-functional Collaboration. He\'s experienced with tools like JIRA, Confluence, MIRO, and Advanced Excel.';
      } else if (lowerMessage.includes('projects') || lowerMessage.includes('project')) {
        botResponse = 'Priyam has worked on several impressive projects including: 1) A Chat Bot with 95%+ accuracy using NLP/ML, 2) A Payload Dropping VTOL prototype with 40% increased payload capacity, and 3) NTS International Trade Platform with real-time API endpoints.';
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        botResponse = 'You can reach Priyam at priyam_b@ch.iitr.ac.in or call him at +91 9588526725. He\'s also active on LinkedIn at linkedin.com/in/priyambansal/';
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        botResponse = 'Hello! I\'m here to help you learn more about Priyam Bansal. He\'s a talented Product Manager with expertise in API integration, data analysis, and strategic problem-solving. What would you like to know?';
      } else {
        botResponse = 'That\'s an interesting question! Priyam is a Product Manager at ICICI Bank with strong technical skills in Python, SQL, and API integration. He\'s passionate about solving complex problems and driving product innovation. Feel free to ask about his experience, education, or projects!';
      }

      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <TypewriterEffect text="Loading Portfolio..." delay={500} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-purple-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Priyam Bansal
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-blue-400 relative ${
                    activeSection === item ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-slate-800/95 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="capitalize block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 w-full text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Theme Toggle */}
      <motion.div
        className="fixed top-20 right-4 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-purple-500/20 text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Performance Indicator */}
      <motion.div
        className="fixed bottom-4 left-4 z-40 bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-medium">98+ Performance Score</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ThreeHero />
        <div className="text-center z-10 px-4 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div 
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={48} className="text-blue-400" />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Priyam Bansal
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <KineticTypography 
              words={['Product Manager', 'API Integration Expert', 'Data Analyst', 'Innovation Driver']}
              className="text-blue-400 font-semibold"
            />
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Driving product innovation at ICICI Bank with expertise in cross-border API integration, 
            data analysis, and strategic problem-solving across international markets.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, backgroundColor: '#3B82F6', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a passionate Product Manager at ICICI Bank with a strong technical background from IIT Roorkee. 
                  I specialize in API integration, data analysis, and driving product innovation across international markets.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With experience spanning from fintech to data analytics, I've successfully led projects involving 
                  10+ country API integrations, reduced server execution times by 70%, and developed ML-powered solutions 
                  with 95%+ accuracy rates.
                </p>
                <StaggeredAnimation>
                  <div className="flex flex-wrap gap-4">
                    <motion.div 
                      className="flex items-center gap-2 text-blue-400"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <MapPin size={20} />
                      <span>India</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-blue-400"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <GraduationCap size={20} />
                      <span>IIT Roorkee</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-blue-400"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Briefcase size={20} />
                      <span>ICICI Bank</span>
                    </motion.div>
                  </div>
                </StaggeredAnimation>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right">
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Current Role', value: 'Product Manager' },
                    { label: 'Company', value: 'ICICI Bank' },
                    { label: 'Education', value: 'B.Tech, IIT Roorkee' },
                    { label: 'CGPA', value: '8.18/10.0' },
                    { label: 'Experience', value: '2+ Years' }
                  ].map((fact, index) => (
                    <motion.div 
                      key={fact.label}
                      className="flex justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-400">{fact.label}</span>
                      <span className="text-white font-medium">{fact.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work Experience
            </h2>
          </ScrollAnimation>
          <div className="space-y-12">
            {/* ICICI Bank */}
            <ScrollAnimation>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Product Manager</h3>
                    <p className="text-blue-400 text-lg">ICICI Bank</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    Jun 2024 - Present
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Led 10-country API integration for NTS International & Trade Online application, ensuring seamless cross-border functionality via REST APIs, Postman, Swagger, and JSON payload design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Developed and deployed 10+ real-time API endpoints for global trade data exchange using Spring Boot microservices, OAuth2, API Gateway, and TLS encryption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Operated 5+ international applications across diverse geographies, managing backend workflows with 99.9% uptime</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Achieved 30% troubleshooting time reduction through API response optimization and Power BI integration</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollAnimation>

            {/* Wells Fargo */}
            <ScrollAnimation>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Data Analyst Intern</h3>
                    <p className="text-blue-400 text-lg">Wells Fargo</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    May 2023 - Jul 2023
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Achieved 70% reduction in server execution time by developing a Python-based remediation pipeline to eliminate invalid email addresses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Built 15-step DNS server interaction framework using Python for rapid diagnosis and resolution of connectivity issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Analyzed 50,000+ records using SAS and SQL to segment data and extract response code patterns, reducing error recurrence by 25%</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <ScrollAnimation delay={0.1}>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code className="text-blue-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Technical Skills</h3>
                </div>
                <div className="space-y-3">
                  {['Python', 'SQL', 'API Integration', 'Spring Boot', 'REST APIs', 'OAuth2', 'JSON', 'Power BI'].map((skill, index) => (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Product Management */}
            <ScrollAnimation delay={0.2}>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="text-purple-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Product Management</h3>
                </div>
                <div className="space-y-3">
                  {['Product Lifecycle Management', 'A/B Testing', 'Strategic Problem Solving', 'Stakeholder Collaboration', 'Cross-functional Leadership', 'Business Ownership', 'Growth Strategy', 'Process Optimization'].map((skill, index) => (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Tools & Analytics */}
            <ScrollAnimation delay={0.3}>
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-green-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Tools & Analytics</h3>
                </div>
                <div className="space-y-3">
                  {['JIRA', 'Confluence', 'MIRO', 'Advanced Excel', 'Data Analysis', 'SAS', 'Postman', 'Swagger'].map((skill, index) => (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <section id="projects" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <InteractiveProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimation direction="left">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I'm always interested in discussing new opportunities, innovative projects, 
                    and collaborations in product management and technology. Feel free to reach out!
                  </p>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <a href="mailto:priyam_b@ch.iitr.ac.in" className="text-blue-400 hover:text-blue-300 transition-colors">
                        priyam_b@ch.iitr.ac.in
                      </a>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <a href="tel:+919588526725" className="text-blue-400 hover:text-blue-300 transition-colors">
                        +91 9588526725
                      </a>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                      <Linkedin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/priyambansal/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        linkedin.com/in/priyambansal
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right">
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      placeholder="Your Name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <motion.input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <motion.textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white resize-none transition-colors"
                      placeholder="Your message..."
                      whileFocus={{ scale: 1.02 }}
                    ></motion.textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-4 bg-slate-900 border-t border-purple-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Priyam Bansal • Built with React, Framer Motion & Three.js
          </p>
        </div>
      </motion.footer>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Enhanced Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Priyam's AI Assistant</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <AnimatePresence>
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-slate-700 text-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask about Priyam's experience..."
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white text-sm transition-colors"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;