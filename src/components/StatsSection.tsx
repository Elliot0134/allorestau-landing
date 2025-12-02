import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const stats = [
    {
      icon: '⏰',
      number: 20,
      suffix: 'h',
      label: 'Gagnées par mois avec AlloRestau'
    },
    {
      icon: '📞',
      number: 100,
      suffix: '%',
      label: "D'appels récupérés"
    },
    {
      icon: '🚀',
      number: 30,
      suffix: '%',
      label: 'De commandes en plus',
      prefix: '+'
    }
  ];

  return (
    <section ref={ref} className="relative py-32 px-6" style={{ backgroundColor: '#fdefd5' }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-20"
          style={{ color: 'hsl(var(--theme-bg))' }}
        >
          Les chiffres qui parlent
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                border: '4px solid #000',
                backgroundColor: 'hsl(var(--theme-bg))',
                padding: '2rem',
                boxShadow: '10px 10px 0 #000',
                fontFamily: 'Outfit, sans-serif',
                cursor: 'pointer',
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                transition: 'background-color 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '10px'
              }}
              className="text-center brutalist-card-hover"
              tabIndex={0}
              role="article"
              aria-label={`Statistique: ${stat.label}`}
            >
              <motion.div
                className="text-6xl mb-6 inline-block"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>

              <div
                className="text-7xl font-black mb-4"
                style={{
                  color: '#fdefd5',
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                }}
              >
                {inView ? (
                  <>
                    {stat.prefix}
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2.5}
                      separator=" "
                    />
                    {stat.suffix}
                  </>
                ) : (
                  `${stat.prefix || ''}0${stat.suffix}`
                )}
              </div>

              <p
                className="text-lg font-bold uppercase tracking-wide"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  color: '#fdefd5',
                  borderTop: '2px solid #fdefd5',
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Message brutaliste sur les appels manqués */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto relative"
        >
          {/* Guillemet gauche */}
          <div
            style={{
              position: 'absolute',
              left: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'hsl(var(--theme-bg))',
              opacity: 0.3,
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
              pointerEvents: 'none'
            }}
            className="hidden md:block"
          >
            "
          </div>

          {/* Guillemet droit */}
          <div
            style={{
              position: 'absolute',
              right: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'hsl(var(--theme-bg))',
              opacity: 0.3,
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
              pointerEvents: 'none'
            }}
            className="hidden md:block"
          >
            "
          </div>

          <div
            style={{
              border: '4px solid #000',
              backgroundColor: '#fdefd5',
              padding: '2rem 3rem',
              boxShadow: '12px 12px 0 rgba(0,0,0,0.3)',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px',
              textAlign: 'center',
              transition: 'background-color 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <p
              style={{
                color: 'hsl(var(--theme-bg))',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 1.4,
                letterSpacing: '0.05em',
                transition: 'color 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="text-xl md:text-3xl"
            >
              Un appel manqué pour vous,<br />
              c'est un client en plus pour votre concurrent
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
