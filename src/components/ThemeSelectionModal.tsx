import { useState, useEffect } from 'react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ThemeType, themeContents } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const THEME_STORAGE_KEY = 'allorestau-selected-theme';

const ThemeSelectionModal = () => {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Check if user has already selected a theme
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!savedTheme) {
      // Attendre que la page soit complètement chargée et l'animation d'entrée terminée
      // avant d'afficher le modal
      const delayTimer = setTimeout(() => {
        setIsReady(true);
        // Petit délai supplémentaire pour une transition fluide
        setTimeout(() => {
          setOpen(true);
        }, 300);
      }, 1000); // 1 seconde après le montage du composant

      return () => {
        clearTimeout(delayTimer);
      };
    }
  }, []);

  const handleThemeSelection = (selectedTheme: ThemeType) => {
    // Save theme to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);

    // Set the theme
    setTheme(selectedTheme);

    // Close modal
    setOpen(false);
  };

  const themeOptions: Array<{
    type: ThemeType;
    bgColor: string;
    image: string;
  }> = [
    {
      type: 'pizzeria',
      bgColor: '#cc1616',
      image: '/assets/items-hero-section/pizza/pizza-slice-peperoni.png'
    },
    {
      type: 'snack',
      bgColor: '#cda404',
      image: '/assets/items-hero-section/snack/sncack-items-burger.svg'
    },
    {
      type: 'restaurant',
      bgColor: '#003049',
      image: '/assets/items-hero-section/restaurant/restaurant-item-pasta.png'
    },
  ];

  return (
    <Dialog open={open} modal>
      <DialogPortal>
        {/* Custom overlay with blur and dark background - non-clickable */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="fixed inset-0 z-50 bg-black/60 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Content without background - just the cards */}
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <AnimatePresence>
            {isReady && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-[90vw] max-w-[900px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                  <DialogTitle className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#fdefd5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Quel type d'établissement êtes-vous ?
                  </DialogTitle>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {themeOptions.map((option, index) => {
            const content = themeContents[option.type];
            return (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <button
                  onClick={() => handleThemeSelection(option.type)}
                  className="group relative flex flex-col items-center justify-center p-6 sm:p-8 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:scale-105 overflow-hidden w-full"
                  style={{
                    backgroundColor: option.bgColor,
                    border: '4px solid #fdefd5',
                    boxShadow: '10px 10px 0 #fdefd5',
                    fontFamily: 'Outfit, sans-serif',
                    borderRadius: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '14px 14px 0 #fdefd5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '10px 10px 0 #fdefd5';
                  }}
                >
                {/* Image de nourriture */}
                <div className="mb-6 sm:mb-8 relative z-10">
                  <img
                    src={option.image}
                    alt={content.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl"
                    loading="eager"
                  />
                </div>

                {/* Theme name */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#fdefd5] mb-2 relative z-10" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {content.name}
                </h3>

                {/* Hover indicator */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  <span className="text-sm sm:text-base font-bold text-[#fdefd5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Choisir →
                  </span>
                </div>
              </button>
              </motion.div>
            );
          })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center text-sm text-[#fdefd5] mt-8 sm:mt-10"
            >
              Cette sélection personnalisera votre expérience
            </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default ThemeSelectionModal;
