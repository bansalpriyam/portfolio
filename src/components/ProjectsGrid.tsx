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

  const toggleTechnologies = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTechnologies(!showAllTechnologies);
  };

  const displayedTechnologies = showAllTechnologies 
    ? project.technologies 
    : project.technologies.slice(0, 3);

  return (
    <motion.div
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
        <AnimatePresence>
          {displayedTechnologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: techIndex * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
            >
              {tech}
            </motion.span>
          ))}
        </AnimatePresence>
        
        {project.technologies.length > 3 && (
          <motion.button
            onClick={toggleTechnologies}
            className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-sm hover:bg-gray-500/30 hover:text-gray-300 transition-all duration-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
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
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-lg font-bold text-blue-400">{metric.value}</div>
            <div className="text-xs text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>
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