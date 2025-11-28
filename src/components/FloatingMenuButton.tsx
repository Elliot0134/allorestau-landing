import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const menuSection = document.getElementById('menu-pricing');
      const scrollY = window.scrollY;

      if (menuSection) {
        const menuRect = menuSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Afficher le bouton si on a scrollé plus de 50px
        const hasScrolled = scrollY > 50;

        // Cacher le bouton si la section menu est visible à l'écran
        const isMenuVisible = menuRect.top < windowHeight && menuRect.bottom > 0;

        // Le bouton est visible si on a scrollé ET qu'on n'est pas encore à la section menu
        setIsVisible(hasScrolled && !isMenuVisible);
      }
    };

    // Écouter le scroll
    window.addEventListener('scroll', handleScroll);

    // Vérifier au chargement
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-pricing');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              rotate: [0, -3, 3, -3, 3, 0],
              x: [0, -2, 2, -2, 2, 0]
            }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { type: "spring", stiffness: 300, damping: 30 },
              rotate: {
                repeat: Infinity,
                repeatDelay: 2,
                duration: 0.5,
                ease: "easeInOut"
              },
              x: {
                repeat: Infinity,
                repeatDelay: 2,
                duration: 0.5,
                ease: "easeInOut"
              }
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.5 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToMenu}
            className="px-8 py-4 text-xl font-bold rounded-full shadow-2xl focus:outline-none pointer-events-auto relative overflow-hidden"
            style={{
              backgroundColor: '#fdefd5',
              color: 'hsl(var(--theme-bg))',
              fontFamily: 'Fredoka, sans-serif'
            } as React.CSSProperties}
            aria-label="Voir la carte des tarifs"
          >
            {/* Effet de brillance animé */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
                repeatDelay: 2
              }}
              style={{ pointerEvents: 'none' }}
            />
            <span className="relative z-10">🍽️ VOIR LA CARTE</span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingMenuButton;
