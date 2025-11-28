import { useTheme } from '@/contexts/ThemeContext';
import { themeContents, ThemeType } from '@/types/theme';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Floating, { FloatingElement } from '@/components/parralax/parralax-floating';
import { Mic, ChevronLeft, ChevronRight } from 'lucide-react';

// Import generated assets (in a real scenario these would be imported or referenced by URL)
// For this demo, we'll use the paths to the artifacts we generated
const assets = {
  pizzeria: [
    '/assets/items-hero-section/pizza/pizza-slice-peperoni.png',
    '/assets/items-hero-section/pizza/pizza-slice-4-cheeses.png',
    '/assets/items-hero-section/pizza/pizza-slice-basilic.png',
    '/assets/items-hero-section/pizza/pizza-slice-mushroom.png',
    '/assets/items-hero-section/pizza/pizza-slice-bbq.png',
    '/assets/items-hero-section/pizza/pizza-slice-carbonara.png',
    '/assets/items-hero-section/pizza/pizza-slice-vegetarian.png',
    '/assets/items-hero-section/pizza/pizza-slice-ananas.png',
  ],
  snack: [
    '/assets/items-hero-section/snack/sncack-items-burger.svg',
    '/assets/items-hero-section/snack/sncack-items-fries.svg',
    '/assets/items-hero-section/snack/tacos.svg',
    '/assets/items-hero-section/snack/sncack-items-bowl.svg',
    '/assets/items-hero-section/snack/poulet.svg',
    '/assets/items-hero-section/snack/sncack-items-canetes.svg',
    '/assets/items-hero-section/snack/Tiramisu.svg',
    '/assets/items-hero-section/snack/tacos et kebab.svg',
  ],
  restaurant: [
    '/assets/items-hero-section/restaurant/restaurant-item-pasta.png',
    '/assets/items-hero-section/restaurant/restaurant-item-paella.png',
    '/assets/items-hero-section/restaurant/restaurant-item-poulet.png',
    '/assets/items-hero-section/restaurant/restaurant-item-fondant.png',
    '/assets/items-hero-section/restaurant/restaurant-item-hamberger.png',
    '/assets/items-hero-section/restaurant/restaurant-item-vin.png',
  ]
};

const HeroSection = () => {
  const { theme, setTheme, isTransitioning } = useTheme();
  const content = themeContents[theme];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax disabled - simplified for better performance
  // const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  // const y2 = useTransform(scrollY, [0, 500], [0, -200]);
  // const y3 = useTransform(scrollY, [0, 500], [0, -50]);

  const scrollToTest = () => {
    const testSection = document.getElementById('test-ia');
    testSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Logos dynamiques par thème
  const themeLogo = {
    pizzeria: '/assets/logos/logo+titre-pizzeria-v2.png',
    snack: '/assets/logos/logo+titre-snack-v2.png',
    restaurant: '/assets/logos/logo+titre-restaurant-v2.png'
  };

  // SVG de fond par thème
  const themeBgSvg = {
    pizzeria: '/assets/bg-hero-section/bg-hero-pizza.svg',
    snack: '/assets/bg-hero-section/bg-hero-snack.svg',
    restaurant: '/assets/bg-hero-section/bg-hero-restau.svg'
  };

  // Different positions per theme - 3 layers of depth: foreground (blurred, large), middle (sharp, medium), background (slightly blurred, small)
  const floatingImagesByTheme = {
    pizzeria: [
      // === PREMIER PLAN - Très flou, très gros, overflowing ===
      // Pepperoni - top left overflowing
      { src: assets.pizzeria[0], width: 480, top: '-8%', left: '-16%', rotate: -30, depth: 2.0, blur: 18, zIndex: 11 },
      // Mushroom - bottom left overflowing
      { src: assets.pizzeria[3], width: 500, bottom: '-12%', left: '-14%', rotate: -25, depth: 2.1, blur: 16, zIndex: 10 },
      // Ananas - bottom right overflowing
      { src: assets.pizzeria[7], width: 490, bottom: '-14%', right: '-18%', rotate: 25, depth: 2.0, blur: 17, zIndex: 10 },

      // === PLAN MOYEN - Net, bien espacé, même plan que le logo ===
      // 4 Cheeses - top left
      { src: assets.pizzeria[1], width: 320, top: '8%', left: '10%', rotate: -20, depth: 1.5, blur: 0, zIndex: 8 },
      // Basilic - top right
      { src: assets.pizzeria[2], width: 280, top: '14%', right: '6%', rotate: 18, depth: 1.5, blur: 0, zIndex: 8 },
      // BBQ - middle right
      { src: assets.pizzeria[4], width: 310, top: '46%', right: '8%', rotate: 15, depth: 1.6, blur: 0, zIndex: 8 },
      // Vegetarian - middle left
      { src: assets.pizzeria[6], width: 290, top: '42%', left: '4%', rotate: -12, depth: 1.5, blur: 0, zIndex: 8 },

      // === ARRIÈRE-PLAN - Légèrement flou, petit ===
      // Carbonara - middle center background
      { src: assets.pizzeria[5], width: 200, top: '56%', left: '36%', rotate: -8, depth: 0.9, blur: 6, zIndex: 3 },
      // BBQ - top center background
      { src: assets.pizzeria[4], width: 190, top: '22%', left: '42%', rotate: 10, depth: 0.8, blur: 7, zIndex: 3 },
      // Vegetarian - bottom right background
      { src: assets.pizzeria[6], width: 180, bottom: '20%', right: '18%', rotate: -6, depth: 0.85, blur: 7, zIndex: 3 },
    ],
    snack: [
      // === PREMIER PLAN - Très flou, très gros, overflowing ===
      // Poulet - top left overflowing
      { src: assets.snack[4], width: 470, top: '-10%', left: '-14%', rotate: -28, depth: 2.0, blur: 17, zIndex: 11 },
      // Canettes - bottom right overflowing
      { src: assets.snack[5], width: 490, bottom: '-12%', right: '-17%', rotate: 28, depth: 2.1, blur: 16, zIndex: 10 },
      // Burger - bottom left overflowing
      { src: assets.snack[0], width: 480, bottom: '-14%', left: '-16%', rotate: -32, depth: 2.0, blur: 18, zIndex: 10 },

      // === PLAN MOYEN - Net, bien espacé, même plan que le logo ===
      // Burger - top left
      { src: assets.snack[0], width: 340, top: '6%', left: '12%', rotate: -18, depth: 1.6, blur: 0, zIndex: 8 },
      // Frites - top right
      { src: assets.snack[1], width: 270, top: '13%', right: '8%', rotate: 15, depth: 1.5, blur: 0, zIndex: 8 },
      // Bowl - middle left
      { src: assets.snack[3], width: 300, top: '40%', left: '6%', rotate: -12, depth: 1.6, blur: 0, zIndex: 8 },
      // Tacos - middle right
      { src: assets.snack[2], width: 280, top: '48%', right: '10%', rotate: -15, depth: 1.5, blur: 0, zIndex: 8 },

      // === ARRIÈRE-PLAN - Légèrement flou, petit ===
      // Tacos et kebab - middle right background
      { src: assets.snack[7], width: 210, top: '44%', left: '48%', rotate: 10, depth: 0.9, blur: 6, zIndex: 3 },
      // Tiramisu - bottom left background
      { src: assets.snack[6], width: 190, bottom: '16%', left: '18%', rotate: -5, depth: 0.8, blur: 7, zIndex: 3 },
      // Frites - top center background
      { src: assets.snack[1], width: 180, top: '24%', left: '40%', rotate: 8, depth: 0.85, blur: 6, zIndex: 3 },
    ],
    restaurant: [
      // === PREMIER PLAN - Très flou, très gros, overflowing ===
      // Vin - top left overflowing
      { src: assets.restaurant[5], width: 480, top: '-8%', left: '-16%', rotate: -30, depth: 2.0, blur: 18, zIndex: 11 },
      // Paella - bottom left overflowing
      { src: assets.restaurant[1], width: 500, bottom: '-12%', left: '-14%', rotate: -25, depth: 2.1, blur: 16, zIndex: 10 },
      // Paella - bottom right overflowing
      { src: assets.restaurant[1], width: 490, bottom: '-14%', right: '-18%', rotate: 25, depth: 2.0, blur: 17, zIndex: 10 },

      // === PLAN MOYEN - Net, bien espacé, même plan que le logo ===
      // Pasta - top left
      { src: assets.restaurant[0], width: 320, top: '8%', left: '10%', rotate: -20, depth: 1.5, blur: 0, zIndex: 8 },
      // Poulet - top right
      { src: assets.restaurant[2], width: 280, top: '14%', right: '6%', rotate: 18, depth: 1.5, blur: 0, zIndex: 8 },
      // Vin - middle right
      { src: assets.restaurant[5], width: 310, top: '46%', right: '8%', rotate: 15, depth: 1.6, blur: 0, zIndex: 8 },
      // Fondant - middle left
      { src: assets.restaurant[3], width: 290, top: '42%', left: '4%', rotate: -12, depth: 1.5, blur: 0, zIndex: 8 },

      // === ARRIÈRE-PLAN - Légèrement flou, petit ===
      // Hamburger - top center background
      { src: assets.restaurant[4], width: 200, top: '26%', left: '38%', rotate: 10, depth: 0.9, blur: 6, zIndex: 3 },
      // Paella - bottom left background
      { src: assets.restaurant[1], width: 190, bottom: '20%', left: '22%', rotate: -8, depth: 0.8, blur: 7, zIndex: 3 },
      // Pasta - bottom right background
      { src: assets.restaurant[0], width: 185, bottom: '24%', right: '24%', rotate: 12, depth: 0.85, blur: 7, zIndex: 3 },
    ]
  };

  const floatingImages = floatingImagesByTheme[theme];

  // Navigation entre thèmes
  const themes: ThemeType[] = ['pizzeria', 'snack', 'restaurant'];
  const currentThemeIndex = themes.indexOf(theme);

  const navigateTheme = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentThemeIndex + 1) % themes.length
      : (currentThemeIndex - 1 + themes.length) % themes.length;
    setTheme(themes[newIndex]);
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 theme-transition" style={{ borderBottom: '8px solid #fdefd5' }}>
      {/* Background SVG - thème dynamique */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-svg-${theme}`}
          initial={{
            opacity: 0,
            scale: 1.05
          }}
          animate={{
            opacity: 0.4,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.95
          }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <img
            src={themeBgSvg[theme]}
            alt=""
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center',
              objectFit: 'cover'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/patterns/pattern-snack.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '600px 600px',
          opacity: 0.15,
          mixBlendMode: 'overlay',
          zIndex: 2
        }}
      />

      {/* Parallax Background Images with Mouse Tracking - Hidden on mobile */}
      <Floating
        className="absolute inset-0 overflow-hidden hidden md:block"
        sensitivity={0.5}
        easingFactor={0.12}
        disabled={isTransitioning}
      >
        <AnimatePresence mode="wait">
          {floatingImages.map((img, index) => (
            <FloatingElement
              key={`floating-${theme}-${index}`}
              depth={img.depth}
              className="pointer-events-none"
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                bottom: img.bottom,
                width: img.width,
                zIndex: img.zIndex
              } as React.CSSProperties}
            >
              <motion.div
                style={{
                  rotate: img.rotate,
                  width: '100%',
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  filter: `blur(${img.blur + 10}px)`,
                  y: 150
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: `blur(${img.blur}px)`,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  filter: `blur(${img.blur + 8}px)`,
                  y: 150,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.04,
                    ease: [0.4, 0, 0.6, 1]
                  }
                }}
                transition={{
                  opacity: { duration: 0.6, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 0.6, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] },
                  filter: { duration: 0.6, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] },
                  y: { duration: 0.6, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                <img
                  src={img.src}
                  alt="Food"
                  className="w-full h-auto drop-shadow-2xl"
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </FloatingElement>
          ))}
        </AnimatePresence>
      </Floating>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-6">
          {/* Logo AlloRestau dynamique - Conteneur avec hauteur fixe pour éviter le "jump" */}
          <div className="flex justify-center" style={{ minHeight: '200px' }}>
            <AnimatePresence mode="wait">
              <motion.div
              key={`logo-${theme}`}
              initial={{
                opacity: 0,
                scale: 0.96,
                filter: 'blur(6px)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                scale: 1.04,
                filter: 'blur(6px)'
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex justify-center"
            >
              <img
                src={themeLogo[theme]}
                alt={`AlloRestau ${content.name} - Ne perdez plus jamais une commande`}
                className="w-full max-w-md h-auto drop-shadow-2xl"
              />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Button - Brutalist Style */}
          <motion.button
            onClick={scrollToTest}
            className="px-16 py-6 text-2xl font-bold focus:outline-none transition-all duration-200 flex items-center gap-3 mx-auto hover:translate-x-[-4px] hover:translate-y-[-4px]"
            style={{
              backgroundColor: '#fdefd5',
              color: '#000000',
              border: '4px solid #000',
              boxShadow: '10px 10px 0 #000',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '14px 14px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '10px 10px 0 #000';
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Accéder à la section de test gratuit"
          >
            <Mic className="w-7 h-7" />
            Tester l'agent vocal IA
          </motion.button>
        </div>
      </div>

      {/* Navigation des thèmes - Discrète */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Flèche gauche */}
        <button
          onClick={() => navigateTheme('prev')}
          disabled={isTransitioning}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-30"
          style={{
            backgroundColor: 'rgba(253, 239, 213, 0.15)',
            border: '2px solid rgba(253, 239, 213, 0.3)',
          }}
          aria-label="Thème précédent"
        >
          <ChevronLeft className="w-5 h-5 text-[#fdefd5]" />
        </button>

        {/* Indicateurs de points */}
        <div className="flex gap-3">
          {themes.map((t, index) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              disabled={isTransitioning}
              className="transition-all duration-300 disabled:opacity-50"
              aria-label={`Passer au thème ${themeContents[t].name}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === currentThemeIndex ? '32px' : '10px',
                  height: '10px',
                  backgroundColor: index === currentThemeIndex
                    ? '#fdefd5'
                    : 'rgba(253, 239, 213, 0.3)',
                  border: index === currentThemeIndex
                    ? '2px solid #fdefd5'
                    : '2px solid rgba(253, 239, 213, 0.3)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Flèche droite */}
        <button
          onClick={() => navigateTheme('next')}
          disabled={isTransitioning}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-30"
          style={{
            backgroundColor: 'rgba(253, 239, 213, 0.15)',
            border: '2px solid rgba(253, 239, 213, 0.3)',
          }}
          aria-label="Thème suivant"
        >
          <ChevronRight className="w-5 h-5 text-[#fdefd5]" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
