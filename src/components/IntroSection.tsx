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
    pizzeria: ['rush', 'vendredi', 'noie'],
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
    <section ref={ref} className="relative py-32 px-4 sm:px-6 overflow-x-hidden" style={{ borderTop: '8px solid #fdefd5' }}>
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={inView && !isTransitioning ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8 w-full"
        >
          {/* Brutalist Card with Title Only */}
          <div
            style={{
              border: '4px solid #000',
              backgroundColor: '#FDEFD5',
              fontFamily: 'Outfit, sans-serif',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              borderRadius: '16px'
            }}
            className="brutalist-card-hover p-6 sm:p-12 w-full"
          >
            {/* Main Title */}
            <h2
              className="text-3xl md:text-5xl font-normal leading-tight tracking-tight break-words text-center"
              style={{
                color: 'hsl(var(--theme-bg))',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}
              dangerouslySetInnerHTML={{ __html: renderTitleWithBold(content.heroTitle.toUpperCase()) }}
            />
          </div>

          {/* Subtitle - Outside the card */}
          <p className="text-lg md:text-3xl text-universal/90 max-w-4xl mx-auto leading-relaxed font-medium break-words text-center w-full">
            {content.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
