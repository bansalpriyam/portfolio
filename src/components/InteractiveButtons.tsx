import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'magnetic' | 'liquid' | 'neon';
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = ''
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || variant !== 'magnetic') return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
    setIsHovered(false);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white';
      case 'magnetic':
        return 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg';
      case 'liquid':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white overflow-hidden relative';
      case 'neon':
        return 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:text-black relative overflow-hidden';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${getVariantClasses()} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: variant === 'magnetic' ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Liquid effect */}
      {variant === 'liquid' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '0%' : '-100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Neon effect */}
      {variant === 'neon' && isHovered && (
        <>
          <motion.div
            className="absolute inset-0 bg-cyan-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 shadow-[0_0_20px_#00ffff,0_0_40px_#00ffff,0_0_60px_#00ffff]" />
        </>
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export const RippleButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  className = ''
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      className={`relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {children}
    </button>
  );
};

export const MorphButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  className = ''
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
    onClick?.();
  };

  return (
    <motion.button
      className={`px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold ${className}`}
      onClick={handleClick}
      animate={{
        borderRadius: isClicked ? '50%' : '8px',
        scale: isClicked ? [1, 1.2, 1] : 1,
        rotate: isClicked ? [0, 180, 360] : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
      whileHover={{ 
        boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)',
        scale: 1.05 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={{
          opacity: isClicked ? [1, 0, 1] : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export const ParticleButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  className = ''
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
    }, 1000);
    
    onClick?.();
  };

  return (
    <button
      className={`relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 ${className}`}
      onClick={handleClick}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            x: Math.cos((index * 30) * Math.PI / 180) * 100,
            y: Math.sin((index * 30) * Math.PI / 180) * 100,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
      {children}
    </button>
  );
};