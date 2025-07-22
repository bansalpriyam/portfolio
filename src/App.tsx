import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Phone, MapPin, MessageCircle, Send, User, Briefcase, GraduationCap, Code, Award, ExternalLink, Github, Calendar, Users, Target, TrendingUp, Database, Settings, Zap, CheckCircle } from 'lucide-react';
import { ThreeHero } from './components/ThreeHero';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollAnimation } from './components/ScrollAnimations';
import { KineticTypography, TypewriterEffect } from './components/KineticTypography';
import { AdvancedChatbot } from './components/AdvancedChatbot';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { SEOHead } from './components/SEOHead';
import { HelmetProvider } from 'react-helmet-async';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <motion.button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
    </motion.button>
  );
};

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <TypewriterEffect text="Loading Portfolio..." delay={500} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const projects = [
    {
      id: '1',
      title: 'NTS International Trade Platform',
      description: 'Led API integration for international trade applications across 10+ countries with 99.9% uptime.',
      longDescription: 'Developed and managed a comprehensive international trade platform that revolutionized cross-border transactions. The platform integrates with multiple banking systems and regulatory frameworks across different countries, ensuring seamless trade finance operations.',
      technologies: ['Spring Boot', 'REST APIs', 'OAuth2', 'Microservices', 'API Gateway', 'TLS Encryption'],
      images: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'],
      metrics: [
        { label: 'Countries', value: '10+' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'API Endpoints', value: '15+' },
        { label: 'Daily Transactions', value: '1000+' }
      ],
      features: [
        'Real-time API integration across multiple countries',
        'OAuth2 authentication and TLS encryption',
        'Microservices architecture with API Gateway',
        'Automated compliance checking',
        'Multi-currency transaction support'
      ],
      challenges: [
        'Complex regulatory requirements across different countries',
        'High-availability requirements (99.9% uptime)',
        'Security compliance for financial transactions',
        'Integration with legacy banking systems'
      ],
      solutions: [
        'Implemented robust error handling and retry mechanisms',
        'Used circuit breaker patterns for fault tolerance',
        'Applied comprehensive security protocols',
        'Created adapter patterns for legacy system integration'
      ]
    },
    {
      id: '2',
      title: 'AI Chat Bot with NLP/ML',
      description: 'Developed an intelligent chatbot achieving 95%+ accuracy using advanced NLP and machine learning.',
      longDescription: 'Built a sophisticated AI-powered chatbot using natural language processing and machine learning algorithms. The system processes user queries, understands context, and provides accurate responses with continuous learning capabilities.',
      technologies: ['Python', 'NLP', 'Machine Learning', 'TensorFlow', 'NLTK', 'Scikit-learn'],
      images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'],
      metrics: [
        { label: 'Accuracy', value: '95%+' },
        { label: 'Response Time', value: '<2s' },
        { label: 'Languages', value: '5+' },
        { label: 'Training Data', value: '10K+' }
      ],
      features: [
        'Advanced natural language understanding',
        'Context-aware conversation handling',
        'Multi-language support',
        'Continuous learning from interactions',
        'Integration with knowledge bases'
      ],
      challenges: [
        'Understanding context in complex conversations',
        'Handling ambiguous user queries',
        'Maintaining conversation flow',
        'Scaling to handle multiple languages'
      ],
      solutions: [
        'Implemented attention mechanisms for context understanding',
        'Used ensemble methods for query disambiguation',
        'Applied conversation state management',
        'Leveraged transfer learning for multi-language support'
      ]
    },
    {
      id: '3',
      title: 'Payload Dropping VTOL Prototype',
      description: 'Engineered a VTOL prototype with 40% increased payload capacity and 90%+ targeting accuracy.',
      longDescription: 'Designed and built a vertical take-off and landing (VTOL) aircraft prototype with advanced payload delivery capabilities. The project involved aerodynamic design, flight control systems, and precision targeting algorithms.',
      technologies: ['SIFT Algorithm', 'Computer Vision', 'Flight Control', 'Aerodynamics', 'Embedded Systems'],
      images: ['https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800'],
      metrics: [
        { label: 'Payload Increase', value: '40%' },
        { label: 'Targeting Accuracy', value: '90%+' },
        { label: 'Flight Time', value: '45min' },
        { label: 'Range', value: '15km' }
      ],
      features: [
        'Vertical take-off and landing capabilities',
        'Advanced payload delivery system',
        'Computer vision-based targeting',
        'Autonomous flight control',
        'Real-time telemetry monitoring'
      ],
      challenges: [
        'Balancing payload capacity with flight stability',
        'Achieving precise targeting in various weather conditions',
        'Optimizing power consumption for extended flight time',
        'Ensuring reliable autonomous operation'
      ],
      solutions: [
        'Optimized aerodynamic design using CFD analysis',
        'Implemented SIFT algorithm for robust target recognition',
        'Used advanced battery management systems',
        'Applied redundant control systems for safety'
      ]
    }
  ];

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
        { name: 'Swagger', level: 85 }
      ]
    }
  ];

  const experiences = [
    {
      title: 'Product Manager',
      company: 'ICICI Bank',
      period: '2023 - Present',
      location: 'Mumbai, India',
      description: 'Leading API integration for international trade applications across 10+ countries with 99.9% uptime.',
      achievements: [
        'Led API integration across 10+ countries with 99.9% uptime',
        'Improved troubleshooting efficiency by 30%',
        'Managed cross-functional teams for product development',
        'Implemented OAuth2 authentication and TLS encryption'
      ],
      technologies: ['Spring Boot', 'REST APIs', 'OAuth2', 'Microservices', 'API Gateway']
    },
    {
      title: 'Data Analyst Intern',
      company: 'Wells Fargo',
      period: '2022',
      location: 'Bangalore, India',
      description: 'Achieved 70% reduction in server execution time through Python automation and analyzed 50,000+ records.',
      achievements: [
        '70% reduction in server execution time through Python automation',
        'Analyzed 50,000+ records using SAS and SQL',
        'Developed automated reporting systems',
        'Optimized database queries for better performance'
      ],
      technologies: ['Python', 'SAS', 'SQL', 'Data Analysis', 'Automation']
    },
    {
      title: 'Bachelor of Technology',
      company: 'IIT Roorkee',
      period: '2019 - 2023',
      location: 'Roorkee, India',
      description: 'CGPA: 8.18/10.0. Secretary at AirSoc (Aerospace Society), Placement Manager at PIC.',
      achievements: [
        'Maintained CGPA of 8.18/10.0',
        'Secretary at AirSoc (Aerospace Society)',
        'Placement Manager at PIC (Placement and Internship Cell)',
        'Led multiple technical and leadership initiatives'
      ],
      technologies: ['Leadership', 'Project Management', 'Technical Skills', 'Team Management']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      <SEOHead />
      <LoadingScreen isLoading={isLoading} />
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
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
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
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <ThreeHero />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <ScrollAnimation>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Priyam Bansal
              </span>
            </motion.h1>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <motion.div
              className="text-2xl md:text-3xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <KineticTypography
                words={['Product Manager', 'API Integration Expert', 'Data Analyst', 'Strategic Problem Solver']}
                className="font-semibold"
              />
            </motion.div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.6}>
            <motion.p
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Driving innovation through data-driven solutions and strategic problem-solving. 
              Specializing in API integration, product lifecycle management, and cross-functional leadership.
            </motion.p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.9}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="space-y-6">
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
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="relative">
                <motion.div
                  className="relative z-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </ScrollAnimation>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400">
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <ScrollAnimation key={groupIndex} delay={groupIndex * 0.2}>
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollAnimation key={project.id} delay={index * 0.1}>
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={project.images[0]}
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollAnimation direction="left">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm always interested in discussing new opportunities, innovative projects, 
                    and potential collaborations. Whether you're looking for a product manager, 
                    need consultation on API integration, or want to explore data-driven solutions, 
                    I'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.a
                    href="mailto:priyam_b@ch.iitr.ac.in"
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                    whileHover={{ scale: 1.02, x: 10 }}
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
                    whileHover={{ scale: 1.02, x: 10 }}
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
                    whileHover={{ scale: 1.02, x: 10 }}
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
                    whileHover={{ scale: 1.02 }}
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
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <motion.div
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <motion.input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <motion.textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white transition-colors resize-none"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </ScrollAnimation>
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

      {/* Advanced Chatbot */}
      <AdvancedChatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;