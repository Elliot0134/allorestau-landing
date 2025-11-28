import { motion, AnimatePresence } from 'framer-motion';

interface SpotlightOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const SpotlightOverlay = ({ isVisible, onClose }: SpotlightOverlayProps) => {
  console.log('SpotlightOverlay isVisible:', isVisible);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Overlay flouté */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              cursor: 'pointer'
            }}
            onClick={() => {
              console.log('Overlay clicked!');
              onClose();
            }}
          />

          {/* Container texte en bas à droite avec fond sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed z-[100000] pointer-events-none px-4 rounded-tl-3xl"
            style={{
              bottom: '0',
              right: '0',
              paddingTop: '1.5rem',
              paddingBottom: '250px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-2 text-center"
              style={{
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '0.03em'
              }}
            >
              Appelez pour tester<br/>AlloRestau
            </h2>
            <p
              className="text-white/70 text-sm md:text-base text-center"
              style={{
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Cliquez sur le widget
            </p>
          </motion.div>

          {/* Flèches pointant vers le widget */}
          <div className="fixed z-[100000]" style={{ pointerEvents: 'none' }}>
            {/* Flèche 1 - depuis le haut, va-et-vient vertical */}
            <motion.img
              key="arrow-1"
              src="/assets/fleches/1.png"
              alt="Flèche 1"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{
                opacity: 1,
                rotate: 90,
                y: [0, 10, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                y: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="fixed"
              style={{
                bottom: '9rem',
                right: '5rem',
                width: '70px',
                height: '70px',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />

            {/* Flèche 2 - depuis la gauche, pointe vers la droite */}
            <motion.img
              key="arrow-2"
              src="/assets/fleches/2.png"
              alt="Flèche 2"
              initial={{ opacity: 0, rotate: 15 }}
              animate={{
                opacity: 1,
                rotate: 15,
                x: [0, 6, 0],
                y: [0, 0, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                x: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                },
                y: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }}
              className="fixed"
              style={{
                bottom: '3rem',
                right: '11rem',
                width: '70px',
                height: '70px',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />

            {/* Flèche 3 - va-et-vient diagonal */}
            <motion.img
              key="arrow-3"
              src="/assets/fleches/3.png"
              alt="Flèche 3"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{
                opacity: 1,
                rotate: 45,
                x: [0, 10, 0],
                y: [0, 10, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }}
              className="fixed"
              style={{
                bottom: '7rem',
                right: '9rem',
                width: '75px',
                height: '75px',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SpotlightOverlay;
