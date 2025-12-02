import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReceiptTicket from './ReceiptTicket';
import BrutalistCard from './BrutalistCard';
import FixedBillButton from './FixedBillButton';

interface MenuItem {
  id: string;
  title: string;
  price: number;
  priceType: 'monthly' | 'oneTime';
  description: string[];
  category: 'entrees' | 'plats' | 'desserts' | 'supplements';
  required?: boolean;
}

const MenuPricingSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Observer pour détecter si on est dans la section (pour le pop-up mobile)
  const [sectionObserverRef, sectionInView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const [receiptObserverRef, receiptInView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const receiptScrollRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    // ENTRÉES (Obligatoires)
    {
      id: 'base',
      title: 'Réception téléphonique IA',
      price: 30,
      priceType: 'monthly',
      description: [
        'Appels illimités 24/7',
        'Prise de commandes',
        'Gestion réservations',
        'Hébergement France (RGPD)'
      ],
      category: 'entrees',
      required: true
    },
    {
      id: 'setup',
      title: 'Frais de mise en service',
      price: 500,
      priceType: 'oneTime',
      description: [
        'Installation en 24h',
        'Configuration IA',
        'Intégration carte complète',
        'Formation de l&apos;équipe'
      ],
      category: 'entrees',
      required: true
    },
    // PLATS
    {
      id: 'backoffice',
      title: 'Back-Office intégré',
      price: 50,
      priceType: 'monthly',
      description: [
        'Tableau de bord complet',
        'Gestion commandes en temps réel',
        'Statistiques détaillées',
        'Export des données'
      ],
      category: 'plats'
    },
    {
      id: 'caisse',
      title: 'Intégration caisse',
      price: 80,
      priceType: 'monthly',
      description: [
        'Connexion directe à votre caisse',
        'Synchronisation automatique',
        'Pas de double saisie',
        'Support tickets de caisse'
      ],
      category: 'plats'
    },
    {
      id: 'sms',
      title: 'SMS confirmations clients',
      price: 30,
      priceType: 'monthly',
      description: [
        '100 SMS inclus par mois',
        'Confirmation automatique commande',
        'Rappel réservation',
        'Messages personnalisables'
      ],
      category: 'plats'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Business',
      price: 40,
      priceType: 'monthly',
      description: [
        'Commandes par WhatsApp',
        'IA aussi sur WhatsApp',
        'Catalogue produits intégré',
        'Notifications temps réel'
      ],
      category: 'plats'
    },
    // DESSERTS
    {
      id: 'voix',
      title: 'Voix personnalisée (clone)',
      price: 100,
      priceType: 'oneTime',
      description: [
        'Enregistrement professionnel',
        'Clonage de VOTRE voix',
        'Accent régional possible',
        'Intonation naturelle'
      ],
      category: 'desserts'
    },
    {
      id: 'analytics',
      title: 'Analytics avancés',
      price: 60,
      priceType: 'monthly',
      description: [
        'Heures de pointe identifiées',
        'Produits les plus commandés',
        'Taux de conversion détaillé',
        'Recommandations IA personnalisées'
      ],
      category: 'desserts'
    },
    {
      id: 'support',
      title: 'Support prioritaire',
      price: 90,
      priceType: 'monthly',
      description: [
        'Hotline dédiée 24/7',
        'Réponse garantie < 2h',
        'Account manager personnel',
        'Formations régulières'
      ],
      category: 'desserts'
    },
    // SUPPLÉMENTS
    {
      id: 'langues',
      title: 'Langues supplémentaires',
      price: 20,
      priceType: 'monthly',
      description: [
        'Anglais, Espagnol, Italien, etc.'
      ],
      category: 'supplements'
    },
    {
      id: 'numero',
      title: 'Numéro dédié',
      price: 15,
      priceType: 'monthly',
      description: [
        'Numéro spécifique AlloRestau'
      ],
      category: 'supplements'
    }
  ];

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    base: true,
    setup: true
  });

  const toggleItem = (id: string, required?: boolean) => {
    if (required) return;
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    let monthly = 0;
    let oneTime = 0;

    Object.keys(selectedItems).forEach(id => {
      if (selectedItems[id]) {
        const item = menuItems.find(i => i.id === id);
        if (item) {
          if (item.priceType === 'monthly') {
            monthly += item.price;
          } else {
            oneTime += item.price;
          }
        }
      }
    });

    return { monthly, oneTime };
  };

  const { monthly, oneTime } = calculateTotal();

  const scrollToBill = () => {
    // En mobile, scroll vers le ReceiptTicket qui est en dessous de la liste des items
    if (receiptScrollRef.current) {
      receiptScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const categoryTitles = {
    entrees: { main: 'ENTRÉES', sub: 'Obligatoires' },
    plats: { main: 'PLATS', sub: 'Options principales' },
    desserts: { main: 'DESSERTS', sub: 'Premium' },
    supplements: { main: 'SUPPLÉMENTS', sub: 'À la demande' }
  };

  const renderCategory = (category: 'entrees' | 'plats' | 'desserts' | 'supplements') => {
    const items = menuItems.filter(item => item.category === category);
    const title = categoryTitles[category];

    return (
      <div className="mb-12">
        <h3 className="text-4xl font-bold mb-8 pb-4 border-b-4 border-black inline-block pr-12" style={{ fontFamily: 'Outfit, sans-serif', color: '#000' }}>
          {title.main} <span style={{ fontSize: '1.25rem', fontWeight: 'normal', fontStyle: 'italic' }}>({title.sub})</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <label className="flex flex-col h-full cursor-pointer p-4 rounded-lg transition-all duration-200 border-2 border-black/20 hover:border-black/40"
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={selectedItems[item.id] ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems[item.id] || false}
                        onChange={() => toggleItem(item.id, item.required)}
                        disabled={item.required}
                        className="w-6 h-6 rounded cursor-pointer appearance-none border-2 border-black checked:bg-black transition-all duration-200 relative"
                        style={{
                          backgroundImage: selectedItems[item.id] ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")` : 'none',
                          backgroundSize: '80%',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                        aria-label={`Sélectionner ${item.title}`}
                      />
                    </motion.div>
                    <span className="text-lg font-bold leading-tight" style={{ color: '#000', fontFamily: 'Outfit, sans-serif' }}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xl font-bold whitespace-nowrap" style={{ color: '#000', fontFamily: 'Outfit, sans-serif' }}>
                    {item.price}€
                  </span>
                </div>

                <ul className="space-y-1 pl-8 text-sm text-black/80" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.description.slice(0, 2).map((desc, i) => (
                    <li key={i} className="list-disc">
                      {desc}
                    </li>
                  ))}
                </ul>
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="menu-pricing"
      ref={(node) => {
        ref(node);
        sectionObserverRef(node);
      }}
      className="relative py-32 px-6 md:px-8 lg:px-6"
      aria-labelledby="pricing-title"
    >
      {/* Grid Pattern Background */}
      <div
        className="absolute top-0 right-0 left-0 pointer-events-none"
        style={{
          height: '2400px',
          zIndex: 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: 'linear-gradient(to right, rgba(226, 232, 240, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.2) 1px, transparent 1px)',
            backgroundSize: '20px 30px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-8">
          {/* Menu Items Column */}
          <div className="lg:col-span-2 w-full mx-auto">
            <BrutalistCard
              backgroundColor="#FDEFD5"
              delay={0.2}
              ariaLabel="Menu du restaurant"
              className="h-full"
              disableHover={true}
              removeShadowOnMobile={true}
            >
              <div className="space-y-12">
                <div className="text-center mb-8">
                  <h2 id="pricing-title" className="text-5xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#000', textTransform: 'uppercase' }}>
                    🍽️ NOTRE MENU 🍽️
                  </h2>
                  <p className="text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                    Composez votre formule à la carte
                  </p>
                </div>
                {renderCategory('entrees')}
                {renderCategory('plats')}
                {renderCategory('desserts')}
                {renderCategory('supplements')}
              </div>
            </BrutalistCard>
          </div>

          {/* Sticky Cart Column */}
          <div className="lg:col-span-1 relative h-full w-full mx-auto">
            <motion.div
              ref={(node) => {
                receiptObserverRef(node);
                if (node && receiptScrollRef) {
                  (receiptScrollRef as any).current = node;
                }
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-24"
            >
              <ReceiptTicket
                items={menuItems.filter(item => selectedItems[item.id])}
                monthly={monthly}
                oneTime={oneTime}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fixed Bill Button - Mobile Only - Visible uniquement dans la section */}
      <FixedBillButton
        monthly={monthly}
        isVisible={sectionInView && !receiptInView}
        onClick={scrollToBill}
      />
    </section>
  );
};

export default MenuPricingSection;
