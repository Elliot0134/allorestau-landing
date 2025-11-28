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
      icon: '🎯',
      title: 'Qualification',
      description: 'L\'IA identifie l\'intention du client',
      time: '⏱️ 2 sec'
    },
    {
      number: 2,
      icon: '🔀',
      title: 'Redirection',
      description: 'Orientation automatique vers le bon service',
      time: '⏱️ Instantané'
    },
    {
      number: 3,
      icon: '🤝',
      title: 'Traitement',
      description: 'Réservation, Info ou Livraison',
      time: '⏱️ 30 sec'
    },
    {
      number: 4,
      icon: '✅',
      title: 'Confirmation',
      description: 'Récapitulatif envoyé au client',
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
          Comment fonctionne un appel
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line - now with brutalist style */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-black/30" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative z-10"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`
              }}
            >
              <div
                style={{
                  border: '4px solid #000',
                  backgroundColor: '#FDEFD5',
                  padding: '2rem',
                  boxShadow: '10px 10px 0 #000',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  borderRadius: '10px'
                }}
                className="text-center brutalist-card-hover"
                tabIndex={0}
                role="article"
                aria-label={`Étape ${step.number}: ${step.title}`}
              >
                {/* Number Badge */}
                <div
                  className="inline-block px-6 py-3 mb-6"
                  style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '3rem',
                    fontWeight: 900,
                    fontFamily: 'Outfit, sans-serif',
                    border: '3px solid #000',
                    boxShadow: '5px 5px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6">{step.icon}</div>

                {/* Title */}
                <h3
                  className="text-2xl font-black uppercase mb-4"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    color: '#000',
                    borderBottom: '3px solid #000',
                    paddingBottom: '0.75rem'
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="font-bold mb-4"
                  style={{
                    color: '#000',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  {step.description}
                </p>

                {/* Time Badge */}
                <div
                  className="inline-block px-4 py-2 mt-2"
                  style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    fontFamily: 'Outfit, sans-serif',
                    border: '2px solid #000'
                  }}
                >
                  {step.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
