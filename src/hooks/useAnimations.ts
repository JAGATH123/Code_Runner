'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AnimeInstance {
  (...args: any[]): any;
  timeline?: () => any;
  stagger?: (delay: number, options?: any) => any;
  random?: (min: number, max: number) => number;
}

export function useAnimations() {
  const animeRef = useRef<AnimeInstance | null>(null);
  const isLoadedRef = useRef(false);

  // Load Anime.js dynamically with better error handling
  useEffect(() => {
    const loadAnime = async () => {
      // Temporarily disable anime.js to focus on portal system
      console.log('Anime.js disabled - using CSS fallbacks only');
      isLoadedRef.current = false;
      
      // Always mark as "loaded" after a short delay to enable CSS animations
      setTimeout(() => {
        isLoadedRef.current = true;
        console.log('Using CSS-based animations as fallback');
      }, 500);
    };

    loadAnime();
  }, []);

  // Create matrix rain effect
  const createMatrixRain = useCallback((container: HTMLElement) => {
    if (!animeRef.current || !container) return;

    const anime = animeRef.current;
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Clear existing rain
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
      const drop = document.createElement('div');
      drop.textContent = characters[Math.floor(Math.random() * characters.length)];
      drop.className = 'absolute text-neon-cyan opacity-30 font-mono text-xs pointer-events-none z-0';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.top = '-20px';
      drop.style.fontSize = Math.random() * 10 + 8 + 'px';
      
      container.appendChild(drop);
      
      anime({
        targets: drop,
        translateY: window.innerHeight + 100,
        opacity: [0.3, 0.1, 0.3, 0],
        duration: Math.random() * 5000 + 3000,
        delay: Math.random() * 2000,
        loop: true,
        easing: 'linear'
      });
    }
  }, []);

  // Create floating particles
  const createFloatingParticles = useCallback((container: HTMLElement) => {
    if (!animeRef.current || !container) return;

    const anime = animeRef.current;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      const colors = ['bg-neon-cyan', 'bg-neon-purple', 'bg-neon-green', 'bg-plasma-pink'];
      particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      particle.style.opacity = '0.6';
      particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
      
      container.appendChild(particle);
      
      anime({
        targets: particle,
        translateX: () => Math.random() * 400 - 200,
        translateY: () => Math.random() * 400 - 200,
        scale: [0.5, 1.5, 0.8],
        rotate: 360,
        opacity: [0.3, 0.8, 0.4],
        duration: Math.random() * 8000 + 10000,
        delay: Math.random() * 2000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }
  }, []);

  // Animate hero section entrance
  const animateHeroEntrance = useCallback(() => {
    if (animeRef.current) {
      const anime = animeRef.current;
      
      // Set initial invisible state and then animate
      const elements = ['.hero-badge', '.main-title', '.hero-subtitle', '.hero-description'];
      elements.forEach(selector => {
        const el = document.querySelector(selector) as HTMLElement;
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px) scale(0.9)';
        }
      });

      // Hero badge animation
      anime({
        targets: '.hero-badge',
        opacity: [0, 1],
        scale: [0.8, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 300,
        easing: 'easeOutElastic(1, .8)'
      });

      // Main title animation
      anime({
        targets: '.main-title',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 1200,
        delay: 600,
        easing: 'easeOutExpo'
      });

      // Subtitle animation
      anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 1000,
        easing: 'easeOutQuart'
      });

      // Description animation
      anime({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 1200,
        easing: 'easeOutQuart'
      });
    } else {
      // CSS-based fallback animations - elements are already visible, just add entrance effects
      const elements = [
        { selector: '.hero-badge', delay: 300 },
        { selector: '.main-title', delay: 600 },
        { selector: '.hero-subtitle', delay: 1000 },
        { selector: '.hero-description', delay: 1200 }
      ];

      elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          // Set initial state
          element.style.opacity = '0';
          element.style.transform = 'translateY(50px) scale(0.9)';
          
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          }, delay);
        }
      });
    }
  }, []);

  // Animate cards entrance
  const animateCardsEntrance = useCallback(() => {
    if (animeRef.current) {
      const anime = animeRef.current;
      
      // Set initial state for cards
      const cards = document.querySelectorAll('.mission-card');
      cards.forEach(card => {
        const element = card as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(80px) scale(0.9)';
      });
      
      anime({
        targets: '.mission-card',
        opacity: [0, 1],
        translateY: [80, 0],
        scale: [0.9, 1],
        duration: 1000,
        delay: (el, i) => i * 200 + 1500,
        easing: 'easeOutElastic(1, .6)'
      });
    } else {
      // CSS-based fallback for cards
      const cards = document.querySelectorAll('.mission-card');
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(80px) scale(0.9)';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) scale(1)';
          element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, index * 200 + 1500);
      });
    }
  }, []);

  // Card hover animation
  const animateCardHover = useCallback((element: HTMLElement, isEntering: boolean) => {
    if (animeRef.current) {
      const anime = animeRef.current;
      
      if (isEntering) {
        anime({
          targets: element,
          scale: 1.03,
          translateY: -5,
          duration: 300,
          easing: 'easeOutQuart'
        });
      } else {
        anime({
          targets: element,
          scale: 1,
          translateY: 0,
          duration: 300,
          easing: 'easeOutQuart'
        });
      }
    } else {
      // CSS-based hover fallback
      if (isEntering) {
        element.style.transform = 'scale(1.03) translateY(-5px)';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      } else {
        element.style.transform = 'scale(1) translateY(0)';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    }
  }, []);

  // Add subtle glitch effect to title
  const addGlitchEffect = useCallback(() => {
    if (animeRef.current) {
      const anime = animeRef.current;
      
      setTimeout(() => {
        anime({
          targets: '.main-title',
          translateX: [0, -1, 1, 0],
          duration: 100,
          delay: 3000,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutQuad',
          loopComplete: () => {
            // Random interval between glitches
            anime.remove('.main-title');
            setTimeout(() => addGlitchEffect(), Math.random() * 5000 + 3000);
          }
        });
      }, 2000);
    } else {
      // CSS-based glitch effect fallback
      setTimeout(() => {
        const element = document.querySelector('.main-title') as HTMLElement;
        if (element) {
          element.style.animation = 'glitch-shake 0.1s infinite alternate';
          setTimeout(() => {
            element.style.animation = '';
            setTimeout(() => addGlitchEffect(), Math.random() * 5000 + 3000);
          }, 200);
        }
      }, 5000);
    }
  }, []);

  return {
    isLoaded: isLoadedRef.current,
    createMatrixRain,
    createFloatingParticles,
    animateHeroEntrance,
    animateCardsEntrance,
    animateCardHover,
    addGlitchEffect
  };
}