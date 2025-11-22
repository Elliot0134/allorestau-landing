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
      icon: '💰',
      number: 15000,
      suffix: '€',
      label: 'Perdus par mois sans AlloRestau'
    },
    {
      icon: '⏰',
      number: 20,
      suffix: 'h',
      label: 'Gagnées par mois avec AlloRestau'
    },
    {
      icon: '📞',
      number: 65,
      suffix: '%',
      label: "D'appels manqués récupérés"
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
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-universal text-center mb-20"
        >
          Les chiffres qui parlent
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-3xl p-12 text-center hover-scale cursor-pointer"
            >
              <div className="text-6xl mb-6">{stat.icon}</div>
              
              <div
                className="font-poppins text-7xl font-black mb-4 animate-counter"
                style={{
                  color: 'hsl(var(--theme-accent))',
                  textShadow: '0 0 30px hsla(var(--theme-accent), 0.5)'
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
              
              <p className="text-universal/90 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
