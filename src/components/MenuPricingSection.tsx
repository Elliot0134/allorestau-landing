import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  const categoryTitles = {
    entrees: '🥖 ENTRÉES (Obligatoires)',
    plats: '🍝 PLATS (Options principales)',
    desserts: '🍰 DESSERTS (Premium)',
    supplements: '🧂 SUPPLÉMENTS (À la demande)'
  };

  const renderCategory = (category: 'entrees' | 'plats' | 'desserts' | 'supplements') => {
    const items = menuItems.filter(item => item.category === category);
    
    return (
      <div className="mb-12">
        <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2" style={{ borderBottomColor: 'hsl(var(--theme-accent))' }}>
          {categoryTitles[category]}
        </h3>
        
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="group">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems[item.id] || false}
                  onChange={() => toggleItem(item.id, item.required)}
                  disabled={item.required}
                  className="mt-1 w-6 h-6 rounded accent-current"
                  style={{ accentColor: 'hsl(var(--theme-accent))' }}
                />
                
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-inter text-lg font-semibold text-gray-800">
                      {item.title}
                    </span>
                    <span className="font-playfair text-2xl font-bold ml-4" style={{ color: 'hsl(var(--theme-accent))' }}>
                      {item.price}€{item.priceType === 'monthly' ? '/mois' : ''}
                    </span>
                  </div>
                  
                  <ul className="space-y-1 pl-6">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        • {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-universal mb-4">
            🍽️ NOTRE CARTE 🍽️
          </h2>
          <p className="text-xl text-universal/90">
            Composez votre menu à la carte
          </p>
          <p className="text-lg text-universal/80">
            Choisissez uniquement ce dont vous avez besoin pour votre restaurant
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="menu-card rounded-2xl p-12"
        >
          {renderCategory('entrees')}
          {renderCategory('plats')}
          {renderCategory('desserts')}
          {renderCategory('supplements')}

          {/* L'Addition */}
          <motion.div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{
              background: 'hsl(var(--theme-bg))',
              color: 'hsl(var(--text-universal))'
            }}
          >
            <h3 className="text-4xl font-bold mb-6">🧾 L'ADDITION</h3>
            
            <div className="space-y-3 mb-6 text-xl">
              <p>Base : <span className="font-bold">{monthly}€/mois</span></p>
              <p>Frais de mise en service : <span className="font-bold">{oneTime}€</span> (une seule fois)</p>
            </div>
            
            <div className="h-1 bg-white/30 my-6" />
            
            <motion.div
              key={`${monthly}-${oneTime}`}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-5xl font-black mb-8"
              style={{ color: 'hsl(var(--theme-accent))' }}
            >
              TOTAL : {monthly}€/mois
            </motion.div>

            <button
              className="w-full py-5 rounded-xl text-2xl font-bold transition-all hover:scale-105"
              style={{
                background: 'hsl(var(--theme-accent))',
                color: 'hsl(var(--theme-bg))',
                boxShadow: '0 8px 30px hsla(var(--theme-accent), 0.4)'
              }}
            >
              COMMANDER 🛎️
            </button>

            <p className="mt-6 text-universal/70 text-sm">
              Sans engagement • Annulation à tout moment
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuPricingSection;
