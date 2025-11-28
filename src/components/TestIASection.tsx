import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import ElevenLabsVoiceAgent from '@/components/ElevenLabsVoiceAgent';

const TestIASection = () => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  // ElevenLabs Agent ID
  const AGENT_ID = 'agent_6201kb2b1cqff8v9d5vxdk3rhc4g';

  const handleConversationEnd = () => {
    // Show modal after conversation ends
    setShowModal(true);
  };

  return (
    <section id="test-ia" className="relative py-12 md:py-32 my-[100vh] md:my-0 px-6 overflow-hidden flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          📞
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-10 text-8xl opacity-10"
        >
          🍝
        </motion.div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          {/* Titre et description - Pleine largeur */}
          <div className="mb-4 md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-universal mb-4 md:mb-6 drop-shadow-lg text-center"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Testez l'agent vocal maintenant !
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-universal/90 text-center max-w-3xl md:max-w-5xl mx-auto"
            >
              Appelez notre restaurant fictif <strong>Pasta O Plomo</strong> et commandez des pâtes italiennes par téléphone. L'assistant IA prendra votre commande en temps réel !
            </motion.p>
          </div>

          {/* Agent vocal + Container d'exemples + Image - Sur la même ligne */}
          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8">
            {/* Colonne gauche: Agent vocal + Container d'exemples */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Agent vocal ElevenLabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ElevenLabsVoiceAgent
                  agentId={AGENT_ID}
                  onConversationEnd={handleConversationEnd}
                />
              </motion.div>

              {/* Container d'exemples */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex-1 p-6 md:p-8 rounded-2xl"
                style={{
                  backgroundColor: theme === 'snack' ? 'rgba(253, 239, 213, 0.7)' : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="w-full">
                  <p
                    className="text-base md:text-lg mb-4 font-black uppercase tracking-wider"
                    style={{ color: theme === 'snack' ? '#000' : '#fff' }}
                  >
                    💡 Exemples de ce que vous pouvez dire :
                  </p>
                  <div className="space-y-3">
                    <p
                      className="text-lg md:text-xl flex items-start gap-2"
                      style={{ fontStyle: 'normal', color: theme === 'snack' ? '#000' : '#fff' }}
                    >
                      <span className="flex-shrink-0" style={{ color: theme === 'snack' ? '#666' : 'rgba(255, 255, 255, 0.7)' }}>→</span>
                      <span>&quot;Bonjour, je voudrais des Spaghetti Carbonara et une eau gazeuse&quot;</span>
                    </p>
                    <p
                      className="text-lg md:text-xl flex items-start gap-2"
                      style={{ fontStyle: 'normal', color: theme === 'snack' ? '#000' : '#fff' }}
                    >
                      <span className="flex-shrink-0" style={{ color: theme === 'snack' ? '#666' : 'rgba(255, 255, 255, 0.7)' }}>→</span>
                      <span>&quot;Bonjour, est-il possible de réserver une table pour 2 personnes ?&quot;</span>
                    </p>
                    <p
                      className="text-lg md:text-xl flex items-start gap-2"
                      style={{ fontStyle: 'normal', color: theme === 'snack' ? '#000' : '#fff' }}
                    >
                      <span className="flex-shrink-0" style={{ color: theme === 'snack' ? '#666' : 'rgba(255, 255, 255, 0.7)' }}>→</span>
                      <span>&quot;Quels sont les plats chauds de votre carte ?&quot;</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Image Pasta O Plomo - Verticale à droite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex-shrink-0 hidden md:block"
              style={{ transformOrigin: 'center center' }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl h-full"
                style={{
                  width: '280px',
                  minHeight: '100%',
                  border: '6px solid #000',
                  boxShadow: '15px 15px 0 #000',
                  backgroundColor: '#fff'
                }}
              >
                <img
                  src="/assets/pasta_plate_1763911209923.png"
                  alt="Pâtes italiennes chez Pasta O Plomo"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient pour plus de profondeur */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
              </motion.div>

              {/* Badge animé */}
              <motion.div
                animate={{
                  rotate: [-3, 3, -3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -right-4 px-6 py-3 font-black text-base"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  color: '#fdefd5',
                  border: '5px solid #000',
                  fontFamily: 'Outfit, sans-serif',
                  boxShadow: '6px 6px 0 #000',
                  borderRadius: '12px'
                }}
              >
                ⚡ DÉMO LIVE
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-6"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl max-w-lg w-full"
            style={{
              background: 'linear-gradient(135deg, #fdefd5 0%, #fce4b8 100%)',
              border: '6px solid #000',
              boxShadow: '20px 20px 0 #000'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confettis décoratifs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{ y: -100, x: Math.random() * 100 + '%', rotate: 0 }}
                  animate={{
                    y: ['100%', '100%'],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{ left: `${i * 15}%` }}
                >
                  {['🍝', '🎉', '⭐', '✨', '🎊', '👏'][i]}
                </motion.div>
              ))}
            </div>

            <div className="relative p-10 md:p-12 text-center">
              {/* Emoji animé */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-8xl mb-6"
              >
                🤩
              </motion.div>

              <h3
                className="text-4xl md:text-5xl font-black mb-4"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  color: '#000',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                }}
              >
                Impressionnant, non ?
              </h3>

              <p className="text-lg md:text-xl mb-8 leading-relaxed font-medium" style={{ color: '#333' }}>
                Imaginez cette IA qui répond <strong>à VOS clients</strong>,<br />
                prend leurs commandes <strong>24h/24</strong> et <strong>7j/7</strong>,<br />
                sans jamais se tromper ni perdre patience !
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 rounded-2xl font-black text-xl md:text-2xl mb-4 transition-all focus:outline-none focus:ring-4 focus:ring-offset-2"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  color: '#fdefd5',
                  border: '5px solid #000',
                  boxShadow: '8px 8px 0 #000',
                  fontFamily: 'Outfit, sans-serif',
                  '--tw-ring-color': '#000',
                  borderRadius: '10px'
                } as React.CSSProperties}
                aria-label="Demander une démonstration personnalisée"
              >
                🚀 OUI, JE VEUX UNE DÉMO !
              </motion.button>

              <motion.button
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold transition-all focus:outline-none focus:ring-2"
                style={{
                  color: '#666',
                  border: '3px solid transparent',
                  fontFamily: 'Outfit, sans-serif',
                  background: 'transparent'
                }}
                aria-label="Fermer et continuer à explorer"
              >
                Non merci, je continue à explorer →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default TestIASection;
