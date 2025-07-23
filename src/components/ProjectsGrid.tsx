import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleTechnologies = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTechnologies(!showAllTechnologies);
  };

  const displayedTechnologies = showAllTechnologies 
    ? project.technologies 
    : project.technologies.slice(0, 3);

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 group cursor-pointer overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03, 
        y: -10,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
        borderColor: 'rgba(139, 92, 246, 0.6)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        {/* Image with enhanced hover effects */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent group-hover:from-slate-900/60 transition-all duration-300" />
        
        {/* Hover Overlay with Project Details */}
        <motion.div
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col justify-center items-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.h4 
              className="text-lg font-bold text-white mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ delay: 0.1 }}
            >
              View Project Details
            </motion.h4>
            <motion.p 
              className="text-gray-300 text-sm mb-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ delay: 0.15 }}
            >
              Click to explore this project in detail
            </motion.p>
            <motion.div
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -180
              }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <Play size={16} className="text-white ml-0.5" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.h3 
        className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
        whileHover={{ x: 5 }}
      >
        {project.title}
      </motion.h3>
      <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <AnimatePresence>
          {displayedTechnologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: techIndex * 0.03 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(59, 130, 246, 0.4)',
                y: -2
              }}
            >
              {tech}
            </motion.span>
          ))}
        </AnimatePresence>
        
        {project.technologies.length > 3 && (
          <motion.button
            onClick={toggleTechnologies}
            className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-sm hover:bg-gray-500/30 hover:text-gray-300 transition-all duration-200 cursor-pointer border border-gray-500/20 hover:border-gray-400/40"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(107, 114, 128, 0.4)',
              borderColor: 'rgba(156, 163, 175, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllTechnologies 
              ? 'Show less' 
              : `+${project.technologies.length - 3} more`
            }
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {project.metrics.slice(0, 2).map((metric, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="text-lg font-bold text-blue-400"
              whileHover={{ scale: 1.2, color: '#60A5FA' }}
            >
              {metric.value}
            </motion.div>
            <div className="text-xs text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>
      </div>

      {/* Subtle Corner Accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};