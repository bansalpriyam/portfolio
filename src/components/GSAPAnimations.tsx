import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  trigger?: string;
}

export const GSAPScrollAnimation: React.FC<GSAPScrollAnimationProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  trigger
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let initialState: any = {};
    let animateState: any = {};

    switch (animation) {
      case 'fadeInUp':
        initialState = { opacity: 0, y: 50 };
        animateState = { opacity: 1, y: 0 };
        break;
      case 'fadeInLeft':
        initialState = { opacity: 0, x: -50 };
        animateState = { opacity: 1, x: 0 };
        break;
      case 'fadeInRight':
        initialState = { opacity: 0, x: 50 };
        animateState = { opacity: 1, x: 0 };
        break;
      case 'scaleIn':
        initialState = { opacity: 0, scale: 0.8 };
        animateState = { opacity: 1, scale: 1 };
        break;
      case 'rotateIn':
        initialState = { opacity: 0, rotation: -180, scale: 0.5 };
        animateState = { opacity: 1, rotation: 0, scale: 1 };
        break;
    }

    gsap.set(element, initialState);

    gsap.to(element, {
      ...animateState,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration, trigger]);

  return <div ref={elementRef}>{children}</div>;
};

export const GSAPStaggerAnimation: React.FC<{ children: React.ReactNode; stagger?: number }> = ({
  children,
  stagger = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childElements = container.children;

    gsap.set(childElements, { opacity: 0, y: 30 });

    gsap.to(childElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stagger]);

  return <div ref={containerRef}>{children}</div>;
};

export const GSAPParallax: React.FC<{ children: React.ReactNode; speed?: number }> = ({
  children,
  speed = 0.5
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return <div ref={elementRef}>{children}</div>;
};