import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AdvancedChatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      message: 'Hi! I\'m Priyam\'s AI assistant. I can help you learn about his experience, skills, projects, and more. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced responses with more detail
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return 'Priyam is currently a Product Manager at ICICI Bank, where he leads API integration for international trade applications across 10+ countries with 99.9% uptime. Previously, he worked as a Data Analyst Intern at Wells Fargo, where he achieved a remarkable 70% reduction in server execution time through Python automation and analyzed 50,000+ records using SAS and SQL.';
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('iit')) {
      return 'Priyam graduated from IIT Roorkee with a Bachelor of Technology degree, maintaining an impressive CGPA of 8.18/10.0. During his time there, he was actively involved in leadership roles including Secretary at AirSoc (Aerospace Society) and Placement Manager at PIC (Placement and Internship Cell).';
    }
    
    if (lowerMessage.includes('skills') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return 'Priyam\'s technical expertise includes Product Lifecycle Management, SQL, Python, API Integration (REST APIs, OAuth2, Spring Boot), Data Analysis, A/B Testing, and Strategic Problem Solving. He\'s proficient with tools like JIRA, Confluence, MIRO, Advanced Excel, Postman, and Swagger. His cross-functional collaboration skills make him excellent at leading diverse teams.';
    }
    
    if (lowerMessage.includes('projects') || lowerMessage.includes('project')) {
      return 'Priyam has worked on several impressive projects: 1) NTS International Trade Platform with API integration across 10+ countries, 2) An AI Chat Bot achieving 95%+ accuracy using NLP/ML with advanced preprocessing, and 3) A Payload Dropping VTOL prototype with 40% increased payload capacity and 90%+ targeting accuracy using SIFT algorithm.';
    }
    
    if (lowerMessage.includes('api') || lowerMessage.includes('integration')) {
      return 'Priyam specializes in API integration and has led the development of 10+ real-time API endpoints for global trade data exchange. He uses Spring Boot microservices, OAuth2 authentication, API Gateway, and TLS encryption to ensure secure and efficient data transfer across international markets.';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return 'You can reach Priyam at priyam_b@ch.iitr.ac.in or call him at +91 9588526725. He\'s also active on LinkedIn at linkedin.com/in/priyambansal/ where he shares insights about product management and technology trends.';
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Great to meet you! I\'m here to help you learn more about Priyam Bansal. He\'s a talented Product Manager with expertise in API integration, data analysis, and strategic problem-solving. What specific aspect of his background interests you most?';
    }
    
    if (lowerMessage.includes('achievements') || lowerMessage.includes('accomplishments')) {
      return 'Priyam has achieved remarkable results: 70% reduction in server execution time at Wells Fargo, 99.9% uptime for international trade applications, 30% improvement in troubleshooting efficiency, 95%+ accuracy in AI chatbot development, and successful leadership of 10+ country API integrations at ICICI Bank.';
    }
    
    if (lowerMessage.includes('leadership') || lowerMessage.includes('management')) {
      return 'Priyam has demonstrated strong leadership as Secretary at AirSoc and Placement Manager at PIC during his time at IIT Roorkee. Currently, as a Product Manager at ICICI Bank, he leads cross-functional teams, manages international stakeholders, and drives product innovation across multiple geographies.';
    }
    
    // Default response
    return 'That\'s an interesting question! Priyam is a Product Manager at ICICI Bank with strong technical skills in Python, SQL, and API integration. He\'s passionate about solving complex problems and driving product innovation. You can ask me about his experience, education, projects, skills, achievements, or how to contact him!';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: generateResponse(userMessage.message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    "Tell me about his experience",
    "What are his technical skills?",
    "Show me his projects",
    "How can I contact him?"
  ];

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
    setTimeout(() => {
      const form = document.querySelector('#chat-form') as HTMLFormElement;
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }, 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={20} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Priyam's AI Assistant</h3>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-gray-400">Online & Ready to Help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {msg.type === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                      </div>
                      <motion.div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-slate-800 text-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-slate-800 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-3 py-1 bg-slate-800 text-gray-300 rounded-full text-xs hover:bg-slate-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form id="chat-form" onSubmit={handleSubmit} className="p-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask about Priyam's experience..."
                  className="flex-1 px-3 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none text-white text-sm transition-colors"
                  whileFocus={{ scale: 1.02 }}
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
};