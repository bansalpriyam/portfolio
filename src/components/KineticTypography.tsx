import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface KineticTypographyProps {
  words: string[];
  className?: string;
  speed?: number;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  words,
  className = '',
  speed = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, speed);

    return () => clearInterval(interval);
  }, [words.length, speed]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            y: 20, 
            rotateX: -90,
            scale: 0.8
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            rotateX: 90,
            scale: 0.8
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
          className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const TypewriterEffect: React.FC<{ 
  text: string; 
  delay?: number;
  speed?: number;
  className?: string;
}> = ({
  text,
  delay = 0,
  speed = 50,
  className = ''
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }, delay + currentIndex * speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed]);

  return (
    <span className={`relative ${className}`}>
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: isComplete ? 0 : Infinity, 
          repeatType: 'reverse' 
        }}
      />
    </span>
  );
};

export const MorphingText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const chars = text.split('');
    element.innerHTML = chars.map(char => 
      `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const charElements = element.querySelectorAll('span');

    gsap.set(charElements, { 
      opacity: 0, 
      y: 50, 
      rotationX: -90,
      transformOrigin: "center bottom"
    });

    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.5
    });

    // Add hover effect
    charElements.forEach((char, index) => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          y: -10,
          scale: 1.2,
          color: '#3B82F6',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          y: 0,
          scale: 1,
          color: 'inherit',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

  }, [text]);

  return <span ref={textRef} className={className}></span>;
};

export const GlitchText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={`${isGlitching ? 'animate-pulse' : ''}`}>
        {text}
      </span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 opacity-70"
            style={{ 
              transform: 'translate(-2px, -1px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 text-blue-500 opacity-70"
            style={{ 
              transform: 'translate(2px, 1px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};