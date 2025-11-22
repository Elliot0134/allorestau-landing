import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WorkflowSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const steps = [
    {
      number: 1,
      icon: '📸',
      title: 'Configuration',
      description: 'Photo carte + Horaires',
      time: '⏱️ 24h'
    },
    {
      number: 2,
      icon: '🎙️',
      title: 'Personnalisation',
      description: 'Choix voix, ton, style',
      time: '⏱️ 5 min'
    },
    {
      number: 3,
      icon: '✅',
      title: 'Activation',
      description: "C'est parti! IA répond 24/7",
      time: '⏱️ Immédiat'
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
          Comment AlloRestau révolutionne votre service
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-white/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 text-center hover-scale cursor-pointer">
                {/* Number */}
                <div
                  className="text-8xl font-black mb-6"
                  style={{ color: 'hsl(var(--theme-accent))' }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6">{step.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-universal mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-universal/80 mb-4">
                  {step.description}
                </p>

                {/* Time */}
                <p className="text-universal/70 font-semibold">
                  {step.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
