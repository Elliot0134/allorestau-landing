import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const DemoSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script au démontage du composant
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 px-6"
      style={{
        backgroundColor: 'hsl(var(--theme-bg))',
        transition: 'background-color 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl font-bold mb-4"
            style={{
              color: '#fdefd5',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            ORGANISONS VOTRE DÉMO GRATUITE
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            border: '4px solid #000',
            borderRadius: '20px',
            boxShadow: '12px 12px 0 rgba(0,0,0,0.3)',
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/aurentia-agency/30min?hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
