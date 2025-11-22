import { useState } from 'react';
import { motion } from 'framer-motion';

const TestIASection = () => {
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCall = () => {
    // Simulate call - in real app, integrate Vapi.ai here
    setIsActive(!isActive);
    
    if (!isActive) {
      // Simulate end of call after 10 seconds
      setTimeout(() => {
        setIsActive(false);
        setShowModal(true);
      }, 10000);
    }
  };

  return (
    <section id="test-ia" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-universal mb-6">
            🎙️ ESSAYEZ L'ASSISTANT IA EN DIRECT
          </h2>
          
          <p className="text-xl text-universal/90 mb-4 max-w-2xl mx-auto">
            Appelez AlloRestau comme si vous étiez un client de votre restaurant.
            Passez une commande fictive et découvrez comment l'IA répond naturellement.
          </p>

          <motion.button
            onClick={handleCall}
            className={`
              mt-12 px-16 py-8 rounded-full text-2xl font-bold
              transition-all duration-300 cursor-pointer
              ${isActive ? 'animate-pulse-active' : 'animate-pulse-glow'}
            `}
            style={{
              background: isActive ? 'hsl(var(--success))' : 'hsl(var(--theme-accent))',
              color: 'hsl(var(--theme-bg))',
              boxShadow: `0 10px 40px hsla(var(--theme-accent), 0.5)`
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 15px 50px hsla(var(--theme-accent), 0.7)`
            }}
          >
            {isActive ? (
              <>
                📞 En cours d&apos;appel...
                <div className="inline-block ml-3">
                  <div className="flex gap-1">
                    <span className="animate-bounce inline-block delay-0">●</span>
                    <span className="animate-bounce inline-block delay-100">●</span>
                    <span className="animate-bounce inline-block delay-200">●</span>
                  </div>
                </div>
              </>
            ) : (
              <>🎙️ APPELER L&apos;ASSISTANT</>
            )}
          </motion.button>

          <div className="mt-8 p-6 glass rounded-2xl max-w-2xl mx-auto">
            <p className="text-universal/80 text-sm mb-2">💡 Exemple de ce que vous pouvez dire :</p>
            <p className="text-universal italic">
              &quot;Je voudrais commander 2 pizzas Margherita pour 20h ce soir&quot;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-12 max-w-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-6">😍</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Impressionné ?</h3>
            <p className="text-lg text-gray-700 mb-8">
              L&apos;IA peut faire ça pour VOTRE restaurant 24h/24, 7j/7.
            </p>
            
            <button
              className="w-full py-4 rounded-full font-bold text-xl mb-4 transition-all hover:scale-105"
              style={{
                background: 'hsl(var(--theme-accent))',
                color: 'hsl(var(--theme-bg))'
              }}
            >
              OUI, JE VEUX UNE DÉMO !
            </button>
            
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-4 rounded-full font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-50 transition-all"
            >
              Non merci, je continue à explorer
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default TestIASection;
