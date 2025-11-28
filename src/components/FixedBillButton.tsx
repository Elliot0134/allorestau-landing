import { motion, AnimatePresence } from 'framer-motion';

interface FixedBillButtonProps {
  monthly: number;
  isVisible: boolean;
  onClick: () => void;
}

const FixedBillButton = ({ monthly, isVisible, onClick }: FixedBillButtonProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center"
          style={{
            pointerEvents: 'auto'
          }}
        >
          <motion.div
            onClick={onClick}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            style={{
              cursor: 'pointer',
              width: '90%'
            }}
            aria-label="Voir l'addition complète"
          >
            {/* Wrapper with shadow */}
            <div
              style={{
                position: 'relative',
                boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
              }}
            >
              {/* Top Scalloped Edge */}
              <svg
                style={{
                  display: 'block',
                  width: '100%',
                  height: '18px',
                }}
                preserveAspectRatio="none"
                viewBox="0 0 400 18"
              >
                <path
                  d={`M 0,18 ${Array.from({ length: 12 }).map((_, i) => {
                    const width = 400 / 12;
                    return `L ${i * width + width / 2},0 L ${(i + 1) * width},18`;
                  }).join(' ')} L 400,18 L 0,18 Z`}
                  fill="#F5F5F0"
                />
              </svg>

              {/* Main receipt body - Plus haut et va jusqu'au bas de l'écran */}
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#F5F5F0',
                  padding: '1rem 2rem 3.5rem 2rem',
                  minHeight: '230px',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      letterSpacing: '0.1em',
                      color: 'hsl(var(--theme-bg))',
                      fontFamily: 'Outfit, sans-serif',
                      textTransform: 'uppercase',
                    }}
                  >
                    L'ADDITION
                  </h3>
                </div>

                {/* Dotted Line Separator */}
                <div
                  style={{
                    borderTop: '2px dashed #999',
                    margin: '0.5rem 0',
                  }}
                />

                {/* Total */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    color: 'hsl(var(--theme-bg))',
                    marginTop: '0.5rem',
                  }}
                >
                  <span>TOTAL</span>
                  <span>{monthly}€/mois</span>
                </div>

                {/* Dotted Line Separator */}
                <div
                  style={{
                    borderTop: '2px dashed #999',
                    margin: '0.5rem 0',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixedBillButton;
