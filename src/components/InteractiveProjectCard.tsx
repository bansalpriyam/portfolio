import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface InteractiveProjectCardProps {
  project: Project;
  index: number;
}

export const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  project,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.4)' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.h3
              className="text-xl font-bold text-white"
              animate={{ color: isHovered ? '#3B82F6' : '#ffffff' }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Play size={16} />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                </motion.a>
              )}
            </motion.div>
          </div>

          <p className="text-gray-300 mb-4">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <motion.div
              className="grid grid-cols-2 gap-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {project.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="text-center">
                  <motion.div
                    className="text-2xl font-bold text-blue-400"
                    initial={{ scale: 1 }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                  >
                    {metric.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-purple-500/20 pt-4 mt-4"
              >
                <p className="text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <ExternalLink size={16} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};