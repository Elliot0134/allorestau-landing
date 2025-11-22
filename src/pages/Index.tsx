import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TestIASection from '@/components/TestIASection';
import WorkflowSection from '@/components/WorkflowSection';
import MenuPricingSection from '@/components/MenuPricingSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen theme-transition">
        <Header />
        <main>
          <HeroSection />
          <TestIASection />
          <WorkflowSection />
          <StatsSection />
          <MenuPricingSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
