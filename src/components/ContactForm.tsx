import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<boolean>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // If custom onSubmit is provided, use it
      if (onSubmit) {
        const success = await onSubmit(formData);
        setSubmitStatus(success ? 'success' : 'error');
      } else {
        // Default form submission using Netlify Forms
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            ...formData
          }).toString()
        });
        
        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-6">
        Send a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6" name="contact" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
            Name *
          </label>
          <motion.input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none text-white transition-all duration-300 ${
              errors.name 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-400'
            }`}
            placeholder="Your full name"
            whileFocus={{ scale: 1.02 }}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={14} />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
            Email *
          </label>
          <motion.input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none text-white transition-all duration-300 ${
              errors.email 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-400'
            }`}
            placeholder="your.email@example.com"
            whileFocus={{ scale: 1.02 }}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={14} />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium">
            Subject *
          </label>
          <motion.input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none text-white transition-all duration-300 ${
              errors.subject 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-400'
            }`}
            placeholder="What's this about?"
            whileFocus={{ scale: 1.02 }}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={14} />
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
            Message *
          </label>
          <motion.textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none text-white transition-all duration-300 resize-none ${
              errors.message 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-blue-400'
            }`}
            placeholder="Tell me about your project, opportunity, or just say hello..."
            whileFocus={{ scale: 1.02 }}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  className="text-red-400 text-sm flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={14} />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
            <span className={`text-sm ${
              formData.message.length < 10 ? 'text-gray-500' : 'text-green-400'
            }`}>
              {formData.message.length}/500
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
          } text-white`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader size={20} />
                </motion.div>
                Sending...
              </motion.div>
            ) : (
              <motion.div
                key="send"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Send size={20} />
                Send Message
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckCircle size={20} />
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm text-green-300">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertCircle size={20} />
              <div>
                <p className="font-semibold">Failed to send message</p>
                <p className="text-sm text-red-300">Please try again or contact me directly via email.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};