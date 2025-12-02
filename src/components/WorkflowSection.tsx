import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type ViewMode = 'client' | 'restaurateur';

const WorkflowSection = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [viewMode, setViewMode] = useState<ViewMode>('client');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fonction pour scroller vers la gauche/droite
  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300; // Distance de scroll
    const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Vérifier l'état après le scroll avec un délai pour que l'animation se termine
    setTimeout(() => {
      checkScrollability();
    }, 350);
  };

  // Vérifier si on peut scroller à gauche ou à droite
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  // Étapes adaptées selon le thème
  const getClientSteps = () => {
    const baseSteps = [
      {
        number: 1,
        icon: '📞',
        title: 'J\'appelle',
        description: 'Je compose le numéro comme d\'habitude',
        time: '⏱️ Immédiat'
      },
      {
        number: 2,
        icon: '🤖',
        title: 'L\'IA répond',
        description: 'Une voix chaleureuse me répond instantanément, sans attente',
        time: '⏱️ 0 sec d\'attente'
      }
    ];

    if (theme === 'restaurant') {
      return [
        ...baseSteps,
        {
          number: 3,
          icon: '🎯',
          title: 'Je réserve ou commande',
          description: 'Je réserve ma table ou commande à emporter naturellement',
          time: '⏱️ 1-2 min'
        },
        {
          number: 4,
          icon: '✅',
          title: 'Je reçois un SMS',
          description: 'Confirmation instantanée avec tous les détails de ma réservation',
          time: '⏱️ Instantané'
        }
      ];
    } else if (theme === 'pizzeria') {
      return [
        ...baseSteps,
        {
          number: 3,
          icon: '🍕',
          title: 'Je commande ma pizza',
          description: 'Je choisis ma pizza, les garnitures et suppléments. À emporter ou sur place',
          time: '⏱️ 1-2 min'
        },
        {
          number: 4,
          icon: '✅',
          title: 'SMS + Préparation',
          description: 'Confirmation par SMS. Ma pizza est prête quand j\'arrive',
          time: '⏱️ Instantané'
        }
      ];
    } else { // snack
      return [
        ...baseSteps,
        {
          number: 3,
          icon: '🍔',
          title: 'Je commande mon menu',
          description: 'Menu, formule, sauces... Tout est pris en compte. Emporter ou sur place',
          time: '⏱️ 1-2 min'
        },
        {
          number: 4,
          icon: '✅',
          title: 'SMS + C\'est prêt',
          description: 'Confirmation par SMS. Commande prête à mon arrivée',
          time: '⏱️ Instantané'
        }
      ];
    }
  };

  const clientSteps = getClientSteps();

  const getRestaurateurSteps = () => {
    const baseSteps = [
      {
        number: 1,
        icon: '📞',
        title: 'Un client appelle',
        description: theme === 'restaurant'
          ? 'Téléphone qui sonne, même pendant le service'
          : 'Téléphone qui sonne, même pendant le coup de feu',
        time: ''
      },
      {
        number: 2,
        icon: '🤖',
        title: 'L\'IA décroche',
        description: theme === 'restaurant'
          ? 'AlloRestau répond automatiquement et prend la réservation ou commande'
          : 'AlloRestau répond automatiquement et prend la commande',
        time: '⏱️ Réponse instantanée'
      },
      {
        number: 3,
        icon: '💻',
        title: theme === 'restaurant' ? 'Réservation enregistrée' : 'Commande transmise',
        description: theme === 'restaurant'
          ? 'La réservation ou commande arrive dans votre système'
          : 'La commande arrive dans votre caisse ou par ticket imprimé',
        time: '⏱️ Temps réel'
      },
      {
        number: 4,
        icon: '👨‍🍳',
        title: 'Équipe concentrée',
        description: theme === 'restaurant'
          ? 'Votre personnel reste focus sur le service en salle'
          : theme === 'pizzeria'
          ? 'Vous restez concentré sur vos pizzas et la qualité'
          : 'Vous restez focus sur la préparation des plats',
        time: ''
      },
      {
        number: 5,
        icon: '📊',
        title: 'Analytics',
        description: 'Statistiques et insights pour optimiser votre activité',
        time: '⏱️ 24/7'
      }
    ];

    return baseSteps;
  };

  const restaurateurSteps = getRestaurateurSteps();

  const steps = viewMode === 'client' ? clientSteps : restaurateurSteps;

  // Vérifier le scroll au chargement et à chaque changement
  useEffect(() => {
    if (viewMode === 'restaurateur') {
      // Délai pour laisser le DOM se mettre à jour
      setTimeout(() => {
        checkScrollability();
      }, 150);
    }
  }, [viewMode]);

  // Gestion du scroll horizontal avec la molette de souris
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || viewMode !== 'restaurateur') return;

    // Écouter les événements de scroll pour mettre à jour les boutons
    scrollContainer.addEventListener('scroll', checkScrollability);

    const handleWheel = (e: WheelEvent) => {
      // Ne rien faire si on scroll verticalement et qu'on n'est pas dans le container
      const rect = scrollContainer.getBoundingClientRect();
      const isInView = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!isInView) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

      // Si on scroll vers le bas et qu'on n'est pas à la fin, convertir en scroll horizontal
      if (e.deltaY !== 0) {
        // Si on est au début et qu'on scroll vers le haut, laisser le scroll normal
        if (isAtStart && e.deltaY < 0) return;

        // Si on est à la fin et qu'on scroll vers le bas, laisser le scroll normal
        if (isAtEnd && e.deltaY > 0) return;

        // Sinon, empêcher le scroll vertical et scroller horizontalement
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('scroll', checkScrollability);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [viewMode]);

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-universal text-center mb-10"
        >
          Comment ça marche ?
        </motion.h2>

        {/* Switch Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setViewMode('client')}
            className="px-6 py-3 font-black text-base transition-all"
            style={{
              fontFamily: 'Outfit, sans-serif',
              border: '4px solid #000',
              backgroundColor: viewMode === 'client' ? '#000' : '#FDEFD5',
              color: viewMode === 'client' ? '#FDEFD5' : '#000',
              boxShadow: viewMode === 'client' ? '8px 8px 0 rgba(0,0,0,0.3)' : '4px 4px 0 rgba(0,0,0,0.2)',
              transform: viewMode === 'client' ? 'translate(-2px, -2px)' : 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
            aria-label="Vue client"
          >
            👤 CLIENT
          </button>
          <button
            onClick={() => setViewMode('restaurateur')}
            className="px-6 py-3 font-black text-base transition-all"
            style={{
              fontFamily: 'Outfit, sans-serif',
              border: '4px solid #000',
              backgroundColor: viewMode === 'restaurateur' ? '#000' : '#FDEFD5',
              color: viewMode === 'restaurateur' ? '#FDEFD5' : '#000',
              boxShadow: viewMode === 'restaurateur' ? '8px 8px 0 rgba(0,0,0,0.3)' : '4px 4px 0 rgba(0,0,0,0.2)',
              transform: viewMode === 'restaurateur' ? 'translate(-2px, -2px)' : 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
            aria-label="Vue restaurateur"
          >
            🍽️ RESTAURATEUR
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            {viewMode === 'client' ? (
              // Grille statique pour la vue client (4 cartes)
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-black/30" />

                {steps.map((step, index) => (
                  <motion.div
                    key={`${viewMode}-${step.number}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative z-10"
                  >
                    <div
                      style={{
                        border: '4px solid #000',
                        backgroundColor: '#FDEFD5',
                        padding: '1.5rem',
                        boxShadow: '10px 10px 0 #000',
                        fontFamily: 'Outfit, sans-serif',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        minHeight: '400px'
                      }}
                      className="text-center brutalist-card-hover h-full flex flex-col"
                      tabIndex={0}
                      role="article"
                      aria-label={`Étape ${step.number}: ${step.title}`}
                    >
                      {/* Number Badge */}
                      <div
                        className="inline-block px-5 py-2 mb-4 mx-auto"
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          fontSize: '2.5rem',
                          fontWeight: 900,
                          fontFamily: 'Outfit, sans-serif',
                          border: '3px solid #000',
                          boxShadow: '5px 5px 0 rgba(0,0,0,0.2)'
                        }}
                      >
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="text-5xl mb-4">{step.icon}</div>

                      {/* Title */}
                      <h3
                        className="text-xl font-black uppercase mb-3"
                        style={{
                          fontFamily: 'Outfit, sans-serif',
                          color: '#000',
                          borderBottom: '3px solid #000',
                          paddingBottom: '0.5rem'
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-bold mb-4 flex-grow"
                        style={{
                          color: '#000',
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '0.875rem'
                        }}
                      >
                        {step.description}
                      </p>

                      {/* Time Badge */}
                      {step.time && (
                        <div
                          className="inline-block px-3 py-2 mt-2"
                          style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            fontFamily: 'Outfit, sans-serif',
                            border: '2px solid #000'
                          }}
                        >
                          {step.time}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Défilement horizontal pour la vue restaurateur (5 cartes)
              <div className="relative">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#000 #FDEFD5',
                    padding: '10px 10px 20px 10px',
                    margin: '-10px -10px -20px -10px'
                  }}
                >
                  {steps.map((step, index) => (
                    <motion.div
                      key={`${viewMode}-${step.number}`}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex-shrink-0 snap-center"
                      style={{
                        width: '280px'
                      }}
                    >
                      <div
                        style={{
                          border: '4px solid #000',
                          backgroundColor: '#FDEFD5',
                          padding: '1.5rem',
                          boxShadow: '10px 10px 0 #000',
                          fontFamily: 'Outfit, sans-serif',
                          cursor: 'pointer',
                          borderRadius: '10px',
                          minHeight: '420px'
                        }}
                        className="text-center brutalist-card-hover h-full flex flex-col"
                        tabIndex={0}
                        role="article"
                        aria-label={`Étape ${step.number}: ${step.title}`}
                      >
                        {/* Number Badge */}
                        <div
                          className="inline-block px-5 py-2 mb-4 mx-auto"
                          style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            fontFamily: 'Outfit, sans-serif',
                            border: '3px solid #000',
                            boxShadow: '5px 5px 0 rgba(0,0,0,0.2)'
                          }}
                        >
                          {step.number}
                        </div>

                        {/* Icon */}
                        <div className="text-5xl mb-4">{step.icon}</div>

                        {/* Title */}
                        <h3
                          className="text-xl font-black uppercase mb-3"
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            color: '#000',
                            borderBottom: '3px solid #000',
                            paddingBottom: '0.5rem'
                          }}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="font-bold mb-4 flex-grow"
                          style={{
                            color: '#000',
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.875rem'
                          }}
                        >
                          {step.description}
                        </p>

                        {/* Time Badge */}
                        {step.time && (
                          <div
                            className="inline-block px-3 py-2 mt-2"
                            style={{
                              backgroundColor: '#000',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              fontFamily: 'Outfit, sans-serif',
                              border: '2px solid #000'
                            }}
                          >
                            {step.time}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Boutons de navigation en dessous - côte à côte */}
                <div className="flex justify-center items-center gap-2 mt-6">
                  {/* Bouton gauche */}
                  <button
                    onClick={() => scrollTo('left')}
                    disabled={!canScrollLeft}
                    className="p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#FDEFD5',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0 #000'
                    }}
                    aria-label="Carte précédente"
                  >
                    <ChevronLeft className="w-6 h-6" style={{ color: '#000' }} />
                  </button>

                  {/* Bouton droit */}
                  <button
                    onClick={() => scrollTo('right')}
                    disabled={!canScrollRight}
                    className="p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#FDEFD5',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0 #000'
                    }}
                    aria-label="Carte suivante"
                  >
                    <ChevronRight className="w-6 h-6" style={{ color: '#000' }} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkflowSection;
