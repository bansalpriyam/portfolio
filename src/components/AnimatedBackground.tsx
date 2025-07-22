import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.005;
      
      // Create animated gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Dynamic color stops that change over time
      const hue1 = (220 + Math.sin(time) * 30) % 360;
      const hue2 = (260 + Math.cos(time * 0.7) * 40) % 360;
      const hue3 = (200 + Math.sin(time * 1.2) * 35) % 360;
      
      gradient.addColorStop(0, `hsl(${hue1}, 70%, ${15 + Math.sin(time * 0.5) * 5}%)`);
      gradient.addColorStop(0.5, `hsl(${hue2}, 60%, ${20 + Math.cos(time * 0.3) * 8}%)`);
      gradient.addColorStop(1, `hsl(${hue3}, 80%, ${10 + Math.sin(time * 0.8) * 3}%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add floating particles with trails
      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(time + i * 0.1) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.7 + i * 0.15) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(time + i) * 3 + 4;
        const opacity = 0.1 + Math.sin(time + i) * 0.15;
        
        // Create particle trail
        const trailLength = 5;
        for (let j = 0; j < trailLength; j++) {
          const trailX = x - Math.sin(time + i * 0.1) * j * 2;
          const trailY = y - Math.cos(time * 0.7 + i * 0.15) * j * 2;
          const trailSize = size * (1 - j / trailLength);
          const trailOpacity = opacity * (1 - j / trailLength);
          
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${trailOpacity})`;
          ctx.fill();
        }
      }

      // Add morphing shapes
      for (let i = 0; i < 5; i++) {
        const centerX = canvas.width * (0.2 + i * 0.15);
        const centerY = canvas.height * 0.5;
        const radius = 50 + Math.sin(time + i) * 20;
        const sides = 6;
        
        ctx.beginPath();
        for (let j = 0; j <= sides; j++) {
          const angle = (j / sides) * Math.PI * 2 + time;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(139, 92, 246, ${0.05 + Math.sin(time + i) * 0.03})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};