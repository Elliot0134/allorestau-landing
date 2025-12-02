import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import TestIASection from '@/components/TestIASection';
import WorkflowSection from '@/components/WorkflowSection';
import MenuPricingSection from '@/components/MenuPricingSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DemoSection from '@/components/DemoSection';
import FAQSection from '@/components/FAQSection';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ThemeSelectionModal from '@/components/ThemeSelectionModal';
import Loader from '@/components/Loader';
import SpotlightOverlay from '@/components/SpotlightOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeType } from '@/types/theme';

const THEME_STORAGE_KEY = 'allorestau-selected-theme';

// Couleurs de fond par thème
const themeBackgrounds: Record<ThemeType, string> = {
  pizzeria: '#cc1616',  // Rouge pizzeria
  snack: '#cda404',     // Jaune/or snack
  restaurant: '#003049' // Bleu foncé restaurant
};

// Fonction pour récupérer le thème initial de manière synchrone
const getInitialThemeColor = (): string => {
  if (typeof window === 'undefined') return themeBackgrounds.pizzeria;

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const currentTheme: ThemeType =
    (savedTheme === 'pizzeria' || savedTheme === 'snack' || savedTheme === 'restaurant')
      ? savedTheme
      : 'pizzeria';

  return themeBackgrounds[currentTheme];
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSpotlight, setShowSpotlight] = useState(false);
  // Initialiser avec la bonne couleur dès le début
  const [loaderBg] = useState<string>(getInitialThemeColor());

  useEffect(() => {
    // Afficher le loader pendant 3 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: loaderBg
          }}
        >
          <Loader themeColor={loaderBg} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeSelectionModal />
          <SmoothScroll />
          <SpotlightOverlay isVisible={showSpotlight} onClose={() => setShowSpotlight(false)} />
          <div
            className="min-h-screen theme-transition"
            style={{ backgroundColor: 'hsl(var(--theme-bg))' }}
          >
            <Header />
            <FloatingMenuButton />
            <main>
              <HeroSection />
              <IntroSection />
              <TestIASection onStartCall={() => setShowSpotlight(true)} />
              <WorkflowSection />
              <StatsSection />
              <MenuPricingSection />
              <TestimonialsSection />
              <DemoSection />
              <FAQSection />
            </main>
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
