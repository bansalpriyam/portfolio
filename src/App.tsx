import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Download, MessageCircle, Send, User, Briefcase, GraduationCap, Code, Award, ExternalLink } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Priyam\'s AI assistant. Ask me anything about his experience, skills, or projects!' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Priyam Bansal
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="text-center z-10 px-4">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={48} className="text-blue-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Priyam Bansal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            Product Manager | API Integration Expert | Data Analyst
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
            Driving product innovation at ICICI Bank with expertise in cross-border API integration, 
            data analysis, and strategic problem-solving across international markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <MapPin size={20} />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <GraduationCap size={20} />
                  <span>IIT Roorkee</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Briefcase size={20} />
                  <span>ICICI Bank</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Role</span>
                  <span className="text-white">Product Manager</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Company</span>
                  <span className="text-white">ICICI Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Education</span>
                  <span className="text-white">B.Tech, IIT Roorkee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CGPA</span>
                  <span className="text-white">8.18/10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white">2+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="space-y-12">
            {/* ICICI Bank */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
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
            </div>

            {/* Wells Fargo */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">Technical Skills</h3>
              </div>
              <div className="space-y-3">
                {['Python', 'SQL', 'API Integration', 'Spring Boot', 'REST APIs', 'OAuth2', 'JSON', 'Power BI'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Management */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold text-white">Product Management</h3>
              </div>
              <div className="space-y-3">
                {['Product Lifecycle Management', 'A/B Testing', 'Strategic Problem Solving', 'Stakeholder Collaboration', 'Cross-functional Leadership', 'Business Ownership', 'Growth Strategy', 'Process Optimization'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Analytics */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-green-400" size={24} />
                <h3 className="text-xl font-bold text-white">Tools & Analytics</h3>
              </div>
              <div className="space-y-3">
                {['JIRA', 'Confluence', 'MIRO', 'Advanced Excel', 'Data Analysis', 'SAS', 'Postman', 'Swagger'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* NTS International Trade Platform */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <ExternalLink className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">NTS International Trade Platform</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Led API integration across 10+ countries for international trade applications with real-time data exchange and 99.9% uptime.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">REST APIs</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Spring Boot</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">OAuth2</span>
              </div>
              <div className="text-sm text-gray-400">Current Project at ICICI Bank</div>
            </div>

            {/* Chat Bot */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">AI Chat Bot</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Engineered an end-to-end chatbot system using NLP and ML, achieving 95%+ response accuracy with advanced preprocessing and entity recognition.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">NLP</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Machine Learning</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Python</span>
              </div>
              <div className="text-sm text-gray-400">Apr 2023 - May 2023</div>
            </div>

            {/* VTOL Prototype */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Payload Dropping VTOL</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Designed a UAV with 227mm rotor diameter, optimizing structural integrity to increase payload capacity by 40% while maintaining flight balance.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">UAV Design</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">SIFT Algorithm</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Autonomous Systems</span>
              </div>
              <div className="text-sm text-gray-400">AirSoc IITR • Feb 2023 - Mar 2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm always interested in discussing new opportunities, innovative projects, 
                  and collaborations in product management and technology. Feel free to reach out!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a href="mailto:priyam_b@ch.iitr.ac.in" className="text-blue-400 hover:text-blue-300 transition-colors">
                      priyam_b@ch.iitr.ac.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a href="tel:+919588526725" className="text-blue-400 hover:text-blue-300 transition-colors">
                      +91 9588526725
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Priyam Bansal
          </p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl z-50 flex flex-col">
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Chat with Priyam's AI</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-300'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask about Priyam's experience..."
                className="flex-1 px-3 py-2 bg-slate-700/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white text-sm"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
