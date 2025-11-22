import { useTheme } from '@/contexts/ThemeContext';
import { themeContents } from '@/types/theme';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const { theme, isTransitioning } = useTheme();
  const content = themeContents[theme];
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      
      const items = parallaxRef.current.querySelectorAll('.parallax-item');
      items.forEach((item, index) => {
        const speed = parseFloat(item.getAttribute('data-speed') || '0.1');
        const yPos = scrollY * speed;
        gsap.to(item, {
          y: -yPos,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTest = () => {
    const testSection = document.getElementById('test-ia');
    testSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax items configuration per theme
  const parallaxItems = {
    pizzeria: [
      { emoji: '🍕', size: 120, speed: 0.3, blur: 0, opacity: 0.95, left: '10%', top: '20%' },
      { emoji: '🍕', size: 100, speed: 0.25, blur: 0, opacity: 0.9, left: '80%', top: '15%' },
      { emoji: '🍕', size: 90, speed: 0.2, blur: 2, opacity: 0.75, left: '25%', top: '60%' },
      { emoji: '🍕', size: 110, speed: 0.28, blur: 0, opacity: 0.92, left: '70%', top: '55%' },
      { emoji: '🍕', size: 85, speed: 0.18, blur: 2, opacity: 0.7, left: '45%', top: '25%' },
      { emoji: '🍕', size: 95, speed: 0.22, blur: 2, opacity: 0.8, left: '15%', top: '75%' },
      { emoji: '🍕', size: 75, speed: 0.15, blur: 4, opacity: 0.6, left: '88%', top: '70%' },
      { emoji: '🍕', size: 80, speed: 0.16, blur: 4, opacity: 0.55, left: '55%', top: '80%' },
      { emoji: '🍕', size: 105, speed: 0.27, blur: 0, opacity: 0.9, left: '35%', top: '40%' },
      { emoji: '🍕', size: 90, speed: 0.2, blur: 2, opacity: 0.75, left: '65%', top: '30%' },
    ],
    snack: [
      { emoji: '🍔', size: 110, speed: 0.3, blur: 0, opacity: 0.95, left: '12%', top: '18%' },
      { emoji: '🍟', size: 95, speed: 0.25, blur: 0, opacity: 0.9, left: '75%', top: '12%' },
      { emoji: '🌮', size: 100, speed: 0.28, blur: 0, opacity: 0.92, left: '20%', top: '55%' },
      { emoji: '🍔', size: 85, speed: 0.2, blur: 2, opacity: 0.75, left: '82%', top: '58%' },
      { emoji: '🍟', size: 90, speed: 0.22, blur: 2, opacity: 0.8, left: '42%', top: '22%' },
      { emoji: '🌯', size: 105, speed: 0.27, blur: 0, opacity: 0.9, left: '65%', top: '35%' },
      { emoji: '🍔', size: 75, speed: 0.15, blur: 4, opacity: 0.6, left: '15%', top: '78%' },
      { emoji: '🍟', size: 80, speed: 0.18, blur: 4, opacity: 0.55, left: '88%', top: '75%' },
      { emoji: '🌮', size: 95, speed: 0.23, blur: 2, opacity: 0.78, left: '50%', top: '70%' },
      { emoji: '🥙', size: 100, speed: 0.26, blur: 0, opacity: 0.88, left: '35%', top: '45%' },
    ],
    restaurant: [
      { emoji: '🍝', size: 110, speed: 0.3, blur: 0, opacity: 0.95, left: '15%', top: '20%' },
      { emoji: '🍷', size: 95, speed: 0.25, blur: 0, opacity: 0.9, left: '78%', top: '15%' },
      { emoji: '🥗', size: 100, speed: 0.28, blur: 0, opacity: 0.92, left: '25%', top: '58%' },
      { emoji: '🍝', size: 90, speed: 0.22, blur: 2, opacity: 0.8, left: '70%', top: '52%' },
      { emoji: '🍷', size: 85, speed: 0.2, blur: 2, opacity: 0.75, left: '45%', top: '25%' },
      { emoji: '🥘', size: 105, speed: 0.27, blur: 0, opacity: 0.9, left: '62%', top: '38%' },
      { emoji: '🍰', size: 80, speed: 0.18, blur: 4, opacity: 0.6, left: '18%', top: '75%' },
      { emoji: '☕', size: 75, speed: 0.15, blur: 4, opacity: 0.55, left: '85%', top: '72%' },
      { emoji: '🍝', size: 95, speed: 0.24, blur: 2, opacity: 0.78, left: '52%', top: '68%' },
      { emoji: '🥘', size: 100, speed: 0.26, blur: 0, opacity: 0.88, left: '38%', top: '42%' },
    ],
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 theme-transition">
      {/* Parallax Background Items */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        {parallaxItems[theme].map((item, index) => (
          <motion.div
            key={`${theme}-${index}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: item.opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="parallax-item absolute animate-float"
            data-speed={item.speed}
            style={{
              left: item.left,
              top: item.top,
              fontSize: `${item.size}px`,
              filter: `blur(${item.blur}px)`,
              opacity: item.opacity,
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${3 + (index % 3)}s`
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8 content-transition"
        >
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-universal leading-tight">
            {content.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-universal/90 max-w-3xl mx-auto leading-relaxed">
            {content.heroSubtitle}
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToTest}
            className="mt-12 px-12 py-5 rounded-full text-2xl font-bold transition-all duration-300 hover:scale-105 animate-pulse-glow"
            style={{
              background: 'hsl(var(--theme-accent))',
              color: 'hsl(var(--theme-bg))',
              boxShadow: '0 10px 40px hsla(var(--theme-accent), 0.5)'
            }}
            whileHover={{
              boxShadow: '0 15px 50px hsla(var(--theme-accent), 0.7)'
            }}
          >
            🎙️ TESTER L'IA MAINTENANT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
