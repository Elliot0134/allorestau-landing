import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ReceiptItem {
  id: string;
  title: string;
  price: number;
  priceType: 'monthly' | 'oneTime';
}

interface ReceiptTicketProps {
  items: ReceiptItem[];
  monthly: number;
  oneTime: number;
}

const ReceiptTicket = ({ items, monthly, oneTime }: ReceiptTicketProps) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    setCurrentTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="receipt-container"
      style={{
        position: 'relative',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Wrapper */}
      <div
        style={{
          position: 'relative',
        }}
      >
        {/* Top Scalloped Edge - Triangular teeth */}
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

        {/* Main receipt body */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#F5F5F0',
            padding: '2rem 1.5rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}
        >

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            paddingTop: '0.5rem',
          }}
        >
          <h3
            style={{
              fontSize: '2rem',
              fontWeight: '900',
              letterSpacing: '0.1em',
              color: 'hsl(var(--theme-bg))',
              fontFamily: 'Outfit, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            L'ADDITION
          </h3>
        </motion.div>

        {/* Items List */}
        <div style={{ marginBottom: '1rem' }}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.1,
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.95rem',
                color: '#333',
                lineHeight: '1.4',
              }}
            >
              <span style={{ flex: 1, paddingRight: '1rem' }}>
                {index + 1}. {item.title}
              </span>
              <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {item.price}€{item.priceType === 'monthly' ? '/mois' : ''}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Dotted Line Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scaleX: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.3 + items.length * 0.1,
          }}
          style={{
            borderTop: '2px dashed #999',
            margin: '1rem 0',
            transformOrigin: 'left',
          }}
        />

        {/* Subtotals */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.4 + items.length * 0.1,
          }}
          style={{
            marginBottom: '1rem',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.9rem',
            color: '#555',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Abonnement mensuel</span>
            <span style={{ fontWeight: 'bold' }}>{monthly}€/mois</span>
          </div>
          {oneTime > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Mise en service (unique)</span>
              <span style={{ fontWeight: 'bold' }}>{oneTime}€</span>
            </div>
          )}
        </motion.div>

        {/* Dotted Line Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scaleX: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.5 + items.length * 0.1,
          }}
          style={{
            borderTop: '2px dashed #999',
            margin: '1rem 0',
            transformOrigin: 'left',
          }}
        />

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.6 + items.length * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.75rem',
            fontWeight: '900',
            color: 'hsl(var(--theme-bg))',
          }}
        >
          <span>TOTAL</span>
          <span>{monthly}€/mois</span>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.7 + items.length * 0.1,
          }}
          style={{
            textAlign: 'center',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.85rem',
            color: '#666',
            marginBottom: '1.5rem',
          }}
        >
          DATE/HEURE: {currentDate} {currentTime}
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.8 + items.length * 0.1,
          }}
          style={{
            textAlign: 'center',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
          }}
        >
          Merci pour votre confiance !
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.9 + items.length * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.03,
            y: -2,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'hsl(var(--theme-bg))',
            color: '#ffffff',
            borderRadius: '9999px',
            transition: 'all 0.2s ease',
          }}
          aria-label="Commander maintenant"
        >
          COMMANDER 🛎️
        </motion.button>

        {/* Fine Print */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 1.2 + items.length * 0.1,
          }}
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#999',
            fontFamily: "'Courier New', Courier, monospace",
            paddingBottom: '0.5rem',
          }}
        >
          Sans engagement • Annulation à tout moment
        </motion.p>
      </div>
      </div>

        {/* Bottom Scalloped Edge - Triangular teeth */}
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
            d={`M 0,0 ${Array.from({ length: 12 }).map((_, i) => {
              const width = 400 / 12;
              return `L ${i * width + width / 2},18 L ${(i + 1) * width},0`;
            }).join(' ')} L 400,0 L 0,0 Z`}
            fill="#F5F5F0"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default ReceiptTicket;
