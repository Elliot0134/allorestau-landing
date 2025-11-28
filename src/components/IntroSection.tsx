import { useTheme } from '@/contexts/ThemeContext';
import { themeContents } from '@/types/theme';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IntroSection = () => {
  const { theme, isTransitioning } = useTheme();
  const content = themeContents[theme];
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Mots à mettre en bold par thème
  const boldWords = {
    pizzeria: ['commandes', 'rush', 'vendredi'],
    snack: ['rush', 'midi', 'déborde'],
    restaurant: ['personnel', 'salle', 'téléphone']
  };

  // Fonction pour mettre en bold certains mots
  const renderTitleWithBold = (title: string) => {
    const words = boldWords[theme];
    let result = title;

    // Remplacer chaque mot par sa version en bold (insensible à la casse)
    words.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      result = result.replace(regex, '<strong>$1</strong>');
    });

    return result;
  };

  return (
    <section ref={ref} className="relative py-32 px-6" style={{ borderTop: '8px solid #fdefd5' }}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={inView && !isTransitioning ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Brutalist Card with Title Only */}
          <div
            style={{
              border: '4px solid #000',
              backgroundColor: '#FDEFD5',
              padding: '3rem',
              boxShadow: '12px 12px 0 #000',
              fontFamily: 'Outfit, sans-serif',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            className="brutalist-card-hover"
          >
            {/* Main Title */}
            <h2
              className="text-4xl md:text-5xl font-normal leading-tight tracking-tight"
              style={{ color: 'hsl(var(--theme-bg))' }}
              dangerouslySetInnerHTML={{ __html: renderTitleWithBold(content.heroTitle.toUpperCase()) }}
            />
          </div>

          {/* Subtitle - Outside the card */}
          <p className="text-2xl md:text-3xl text-universal/90 max-w-4xl mx-auto leading-relaxed font-medium">
            {content.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
