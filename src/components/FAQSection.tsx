import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showPricingButton, setShowPricingButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('menu-pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        // Cache le bouton si on a dépassé le haut de la section pricing
        setShowPricingButton(rect.top > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier au chargement

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "Combien coûte AlloRestau ?",
      answer: "7 jours d'essai gratuit pour tester le service sans engagement ! Ensuite, le prix dépend des fonctionnalités que vous souhaitez : réception d'appels simple, prise de commandes, réservations, multilingue, etc.",
      hasButton: true
    },
    {
      question: "Comment l'IA apprend-elle ma carte et mes spécificités ?",
      answer: "C'est très simple ! Vous nous envoyez une photo de votre carte et vos informations pratiques. La configuration prend 48h car nous achetons et attribuons un numéro de téléphone français 🇫🇷 dédié à votre établissement. L'IA est ensuite entraînée spécifiquement sur VOTRE menu, vos prix, vos promotions."
    },
    {
      question: "Que se passe-t-il si l'IA ne comprend pas le client ?",
      answer: "L'IA AlloRestau comprend plus de 95% des demandes grâce à sa technologie de pointe. Mais dans les rares cas où elle rencontre une difficulté (accent très prononcé, demande très spécifique), elle peut soit demander poliment au client de reformuler, soit transférer l'appel directement vers votre ligne habituelle. Vous gardez toujours le contrôle et aucune commande n'est perdue !"
    },
    {
      question: "Puis-je personnaliser la voix et le ton de l'assistant ?",
      answer: "Absolument ! Vous choisissez parmi plusieurs voix françaises (masculine, féminine, différents accents), le ton de communication (professionnel, chaleureux, dynamique) et même des phrases personnalisées. Vous pouvez faire dire à votre assistant IA des expressions typiques de votre établissement pour renforcer votre identité de marque. L'assistant peut même parler plusieurs langues si vous recevez une clientèle internationale."
    },
    {
      question: "Combien de temps faut-il pour mettre en place AlloRestau ?",
      answer: "La mise en place est ultra-rapide :\n\n1️⃣ Vous nous envoyez votre carte et vos informations (5 minutes)\n\n2️⃣ Nous configurons votre assistant IA personnalisé (48h maximum)\n\n3️⃣ Vous testez et validez la configuration (5-10 minutes)\n\n4️⃣ L'IA est activée et répond à vos clients !\n\nEn moins de 48h, votre assistant vocal est opérationnel. Aucune installation technique de votre côté."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('menu-pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 px-6 pb-32" style={{ backgroundColor: '#fdefd5' }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-7xl opacity-10"
        >
          ❓
        </motion.div>
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 text-8xl opacity-10"
        >
          💡
        </motion.div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              color: 'hsl(var(--theme-bg))',
              fontFamily: 'Outfit, sans-serif',
              textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
            }}
          >
            Questions fréquentes
          </h2>
          <p
            className="text-xl md:text-2xl font-bold"
            style={{
              color: '#000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Tout ce que vous devez savoir sur AlloRestau
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                style={{
                  border: '4px solid #000',
                  backgroundColor: '#ffffff',
                  boxShadow: '8px 8px 0 #000',
                  fontFamily: 'Outfit, sans-serif',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="hover:shadow-[12px_12px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                {/* Question - Cliquable */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none focus:ring-4 focus:ring-offset-2"
                  style={{
                    backgroundColor: openIndex === index ? 'hsl(var(--theme-bg))' : '#ffffff',
                    transition: 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    '--tw-ring-color': '#000'
                  } as React.CSSProperties}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3
                    className="text-xl md:text-2xl font-black pr-4 flex items-start gap-3"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      color: openIndex === index ? '#fdefd5' : '#000',
                      transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <span
                      className="flex-shrink-0 text-2xl md:text-3xl"
                      style={{
                        color: openIndex === index ? '#fdefd5' : 'hsl(var(--theme-bg))',
                        transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      {index + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </h3>

                  {/* Icône flèche avec rotation */}
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="flex-shrink-0"
                    style={{
                      color: openIndex === index ? '#fdefd5' : '#000',
                      transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <ChevronDown className="w-8 h-8" strokeWidth={3} />
                  </motion.div>
                </button>

                {/* Réponse - Avec animation de dépliage */}
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        height: {
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        },
                        opacity: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                      style={{
                        overflow: 'hidden'
                      }}
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="px-6 md:px-8 pb-6 md:pb-8 pt-4"
                        style={{
                          borderTop: '3px solid #000'
                        }}
                      >
                        <p
                          className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            color: '#333',
                            fontWeight: 500
                          }}
                        >
                          {faq.answer}
                        </p>

                        {faq.hasButton && showPricingButton && (
                          <motion.button
                            onClick={scrollToPricing}
                            whileHover={{ scale: 1.05, x: -2, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 px-8 py-4 text-lg font-black"
                            style={{
                              backgroundColor: 'hsl(var(--theme-bg))',
                              color: '#fdefd5',
                              border: '4px solid #000',
                              boxShadow: '6px 6px 0 #000',
                              borderRadius: '8px',
                              fontFamily: 'Outfit, sans-serif'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '10px 10px 0 #000';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '6px 6px 0 #000';
                            }}
                          >
                            Voir nos prix
                          </motion.button>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA en bas de FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block px-8 py-6 md:px-12 md:py-8"
            style={{
              backgroundColor: 'hsl(var(--theme-bg))',
              border: '4px solid #000',
              boxShadow: '10px 10px 0 #000',
              borderRadius: '10px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            <p
              className="text-2xl md:text-3xl font-black mb-4"
              style={{ color: '#fdefd5' }}
            >
              Vous avez d'autres questions ?
            </p>
            <p
              className="text-lg md:text-xl font-bold"
              style={{ color: '#fdefd5' }}
            >
              📞 🇫🇷 Contactez-nous : <a href="tel:+33123456789" className="underline hover:no-underline">01 23 45 67 89</a>
              <br />
              ✉️ Email : <a href="mailto:contact@allorestau.fr" className="underline hover:no-underline">contact@allorestau.fr</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
