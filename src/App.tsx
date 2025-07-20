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
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

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

  const themeIcons = {
    dark: <Moon size={20} />,
    light: <Sun size={20} />,
    auto: <Monitor size={20} />
  };

  const nextTheme = {
    dark: 'light' as const,
    light: 'auto' as const,
    auto: 'dark' as const
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className={`min-h-screen ${resolvedTheme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      } flex items-center justify-center`}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`w-20 h-20 border-4 ${resolvedTheme === 'dark' ? 'border-blue-400' : 'border-blue-600'} border-t-transparent rounded-full mx-auto mb-8`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <TypewriterEffect text="Loading Portfolio..." delay={500} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${resolvedTheme === 'dark' 
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    } relative overflow-x-hidden transition-colors duration-500`}>
      <SEOHead />
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 w-full ${resolvedTheme === 'dark' 
          ? 'bg-slate-900/95 border-purple-500/20' 
          : 'bg-white/95 border-blue-200/50'
        } backdrop-blur-sm z-50 border-b transition-colors duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className={`text-2xl font-bold ${resolvedTheme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}
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
                  className={`capitalize transition-all duration-300 relative ${
                    activeSection === item 
                      ? resolvedTheme === 'dark' 
                        ? 'text-blue-400 border-b-2 border-blue-400' 
                        : 'text-blue-600 border-b-2 border-blue-600'
                      : resolvedTheme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className={`md:hidden ${resolvedTheme === 'dark' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
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
              className={`md:hidden ${resolvedTheme === 'dark' 
                ? 'bg-slate-800/95' 
                : 'bg-white/95'
              } backdrop-blur-sm`}
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
                    className={`capitalize block px-3 py-2 ${resolvedTheme === 'dark' 
                      ? 'text-gray-300 hover:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600'
                    } transition-colors duration-300 w-full text-left`}
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
        className="fixed top-20 right-4 z-40 flex flex-col gap-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className={`p-3 ${resolvedTheme === 'dark' 
            ? 'bg-slate-800/80 border-purple-500/20 text-gray-300 hover:text-white' 
            : 'bg-white/80 border-blue-200/50 text-gray-600 hover:text-gray-900'
          } backdrop-blur-sm rounded-full border transition-colors`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(nextTheme[theme])}
          title={`Switch to ${nextTheme[theme]} theme`}
        >
          {themeIcons[theme]}
        </motion.button>
      </motion.div>

      {/* Performance Indicator */}
      <motion.div
        className={`fixed bottom-4 left-4 z-40 ${resolvedTheme === 'dark' 
          ? 'bg-slate-800/80 border-green-500/20' 
          : 'bg-white/80 border-green-200/50'
        } backdrop-blur-sm rounded-lg px-3 py-2 border`}
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
        <ParallaxSection>
          <div className="text-center z-10 px-4 relative">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div 
              className={`w-32 h-32 mx-auto mb-6 rounded-full ${resolvedTheme === 'dark' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } p-1`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`w-full h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-white'} flex items-center justify-center`}>
                <User size={48} className={resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
              </div>
            </motion.div>
          </motion.div>
          
            <RevealText 
              text="Priyam Bansal"
              className={`text-5xl md:text-7xl font-bold mb-6 ${resolvedTheme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              } bg-clip-text text-transparent`}
            />
          
          <motion.div
            className={`text-xl md:text-2xl ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <KineticTypography 
              words={['Product Manager', 'API Integration Expert', 'Data Analyst', 'Innovation Driver']}
              className={`${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-semibold`}
            />
          </motion.div>
          
          <motion.p 
            className={`text-lg ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-12 max-w-2xl mx-auto`}
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
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className={`px-8 py-3 ${resolvedTheme === 'dark' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800'
              } text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 border-2 ${resolvedTheme === 'dark' 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              } rounded-full transition-all duration-300`}
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
          </div>
        </ParallaxSection>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className={`w-6 h-10 border-2 ${resolvedTheme === 'dark' ? 'border-blue-400' : 'border-blue-600'} rounded-full flex justify-center`}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className={`w-1 h-3 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2`}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 relative ${resolvedTheme === 'light' ? 'bg-white/50' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className={`text-4xl font-bold text-center mb-16 ${resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              About Me
            </h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="space-y-6">
                <p className={`text-lg ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  I'm a passionate Product Manager at ICICI Bank with a strong technical background from IIT Roorkee. 
                  I specialize in API integration, data analysis, and driving product innovation across international markets.
                </p>
                <p className={`text-lg ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  With experience spanning from fintech to data analytics, I've successfully led projects involving 
                  10+ country API integrations, reduced server execution times by 70%, and developed ML-powered solutions 
                  with 95%+ accuracy rates.
                </p>
                <StaggeredAnimation>
                  <div className="flex flex-wrap gap-4">
                    <motion.div 
                      className={`flex items-center gap-2 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <MapPin size={20} />
                      <span>India</span>
                    </motion.div>
                    <motion.div 
                      className={`flex items-center gap-2 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <GraduationCap size={20} />
                      <span>IIT Roorkee</span>
                    </motion.div>
                    <motion.div 
                      className={`flex items-center gap-2 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
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
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-2xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Quick Facts</h3>
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
                      <span className={resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{fact.label}</span>
                      <span className={`${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{fact.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 ${resolvedTheme === 'dark' ? 'bg-slate-800/30' : 'bg-gray-50/80'}`}>
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className={`text-4xl font-bold text-center mb-16 ${resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Work Experience
            </h2>
          </ScrollAnimation>
          <div className="space-y-12">
            {/* ICICI Bank */}
            <ScrollAnimation>
              <motion.div 
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Product Manager</h3>
                    <p className={`${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} text-lg`}>ICICI Bank</p>
                  </div>
                  <div className={`${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2 md:mt-0`}>
                    Jun 2024 - Present
                  </div>
                </div>
                <ul className={`space-y-3 ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Led 10-country API integration for NTS International & Trade Online application, ensuring seamless cross-border functionality via REST APIs, Postman, Swagger, and JSON payload design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Developed and deployed 10+ real-time API endpoints for global trade data exchange using Spring Boot microservices, OAuth2, API Gateway, and TLS encryption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Operated 5+ international applications across diverse geographies, managing backend workflows with 99.9% uptime</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Achieved 30% troubleshooting time reduction through API response optimization and Power BI integration</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollAnimation>

            {/* Wells Fargo */}
            <ScrollAnimation>
              <motion.div 
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Data Analyst Intern</h3>
                    <p className={`${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} text-lg`}>Wells Fargo</p>
                  </div>
                  <div className={`${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2 md:mt-0`}>
                    May 2023 - Jul 2023
                  </div>
                </div>
                <ul className={`space-y-3 ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Achieved 70% reduction in server execution time by developing a Python-based remediation pipeline to eliminate invalid email addresses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Built 15-step DNS server interaction framework using Python for rapid diagnosis and resolution of connectivity issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                    <span>Analyzed 50,000+ records using SAS and SQL to segment data and extract response code patterns, reducing error recurrence by 25%</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${resolvedTheme === 'light' ? 'bg-white/50' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className={`text-4xl font-bold text-center mb-16 ${resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Skills & Expertise
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <ScrollAnimation delay={0.1}>
              <motion.div 
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code className={resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={24} />
                  <h3 className={`text-xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h3>
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
                      <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'} rounded-full`}></div>
                      <span className={resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Product Management */}
            <ScrollAnimation delay={0.2}>
              <motion.div 
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className={resolvedTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={24} />
                  <h3 className={`text-xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Management</h3>
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
                      <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'} rounded-full`}></div>
                      <span className={resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Tools & Analytics */}
            <ScrollAnimation delay={0.3}>
              <motion.div 
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className={resolvedTheme === 'dark' ? 'text-green-400' : 'text-green-600'} size={24} />
                  <h3 className={`text-xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tools & Analytics</h3>
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
                      <div className={`w-2 h-2 ${resolvedTheme === 'dark' ? 'bg-green-400' : 'bg-green-600'} rounded-full`}></div>
                      <span className={resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <section id="projects" className={`py-20 px-4 ${resolvedTheme === 'dark' ? 'bg-slate-800/30' : 'bg-gray-50/80'} relative`}>
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <h2 className={`text-4xl font-bold text-center mb-16 ${resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Featured Projects
            </h2>
          </ScrollAnimation>
          
          <ProjectShowcase projects={projects} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${resolvedTheme === 'light' ? 'bg-white/50' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <h2 className={`text-4xl font-bold text-center mb-16 ${resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Get In Touch
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimation direction="left">
              <div className="space-y-8">
                <div>
                  <h3 className={`text-2xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Let's Connect</h3>
                  <p className={`${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed`}>
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
                      <p className={resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Email</p>
                      <a href="mailto:priyam_b@ch.iitr.ac.in" className={`${resolvedTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
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
                      <p className={resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Phone</p>
                      <a href="tel:+919588526725" className={`${resolvedTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
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
                      <p className={resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/priyambansal/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${resolvedTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
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
                className={`${resolvedTheme === 'dark' 
                  ? 'bg-slate-800/50 border-purple-500/20' 
                  : 'bg-white/80 border-blue-200/50'
                } backdrop-blur-sm rounded-2xl p-8 border`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-6">
                  <div>
                    <label className={`block ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Name</label>
                    <motion.input
                      type="text"
                      className={`w-full px-4 py-3 ${resolvedTheme === 'dark' 
                        ? 'bg-slate-700/50 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } rounded-lg focus:outline-none transition-colors`}
                      placeholder="Your Name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className={`block ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
                    <motion.input
                      type="email"
                      className={`w-full px-4 py-3 ${resolvedTheme === 'dark' 
                        ? 'bg-slate-700/50 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } rounded-lg focus:outline-none transition-colors`}
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className={`block ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Message</label>
                    <motion.textarea
                      rows={4}
                      className={`w-full px-4 py-3 ${resolvedTheme === 'dark' 
                        ? 'bg-slate-700/50 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } rounded-lg focus:outline-none resize-none transition-colors`}
                      placeholder="Your message..."
                      whileFocus={{ scale: 1.02 }}
                    ></motion.textarea>
                  </div>
                  <MagneticButton
                    type="submit"
                    className={`w-full px-6 py-3 ${resolvedTheme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800'
                    } text-white rounded-lg transition-all duration-300`}
                  >
                    Send Message
                  </MagneticButton>
                </form>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className={`py-8 px-4 ${resolvedTheme === 'dark' 
          ? 'bg-slate-900 border-purple-500/20' 
          : 'bg-gray-100 border-blue-200/50'
        } border-t`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 Priyam Bansal • Built with React, Framer Motion & Three.js
          </p>
        </div>
      </motion.footer>

      {/* Advanced Chatbot */}
      <AdvancedChatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

const AppContent = () => {
  return <App />;
};

const AppWrapper = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default AppWrapper;