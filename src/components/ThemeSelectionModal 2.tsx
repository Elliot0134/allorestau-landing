import { useState, useEffect } from 'react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ThemeType, themeContents } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';

export const THEME_STORAGE_KEY = 'allorestau-selected-theme';

const ThemeSelectionModal = () => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Check if user has already selected a theme
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!savedTheme) {
      setOpen(true);
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
      image: '/assets/pasta_plate_1763911209923.png'
    },
  ];

  return (
    <Dialog open={open} modal>
      <DialogPortal>
        {/* Custom overlay with blur and dark background - non-clickable */}
        <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none" />

        {/* Content without background - just the cards */}
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="w-[90vw] max-w-[900px]">
            <DialogTitle className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#fdefd5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quel type d'établissement êtes-vous ?
            </DialogTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {themeOptions.map((option) => {
            const content = themeContents[option.type];
            return (
              <button
                key={option.type}
                onClick={() => handleThemeSelection(option.type)}
                className="group relative flex flex-col items-center justify-center p-6 sm:p-8 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:scale-105 overflow-hidden"
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
            );
          })}
            </div>

            <p className="text-center text-sm text-[#fdefd5] mt-8 sm:mt-10 opacity-80">
              Cette sélection personnalisera votre expérience
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default ThemeSelectionModal;
