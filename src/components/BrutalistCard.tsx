import React from 'react';
import { motion } from 'framer-motion';

interface BrutalistCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  onHoverY?: number;
  tabIndex?: number;
  role?: string;
  ariaLabel?: string;
  useWhiteBackground?: boolean; // true = fond blanc, false = fond avec couleur du thème
  backgroundColor?: string; // Couleur de fond personnalisée (override useWhiteBackground)
  disableHover?: boolean; // Désactive l'effet hover
  removeShadowOnMobile?: boolean; // Retire l'ombre en version mobile
}

const BrutalistCard = ({
  children,
  className = '',
  delay = 0,
  inView = true,
  onHoverY = -8,
  tabIndex = 0,
  role = "article",
  ariaLabel,
  useWhiteBackground = false,
  backgroundColor: customBackgroundColor,
  disableHover = false,
  removeShadowOnMobile = false
}: BrutalistCardProps) => {
  const backgroundColor = customBackgroundColor || (useWhiteBackground ? '#ffffff' : 'hsl(var(--theme-bg))');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={disableHover ? {} : {
        x: -2,
        y: -2,
        scale: 1.02,
        boxShadow: '12px 12px 0 #000',
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className={`brutalist-card ${removeShadowOnMobile ? 'shadow-none md:shadow-[10px_10px_0_#000]' : ''} ${className}`}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      style={{
        border: '4px solid #000',
        backgroundColor: backgroundColor,
        padding: '2rem',
        boxShadow: removeShadowOnMobile ? undefined : '10px 10px 0 #000',
        fontFamily: 'Outfit, sans-serif',
        cursor: disableHover ? 'default' : 'pointer',
        borderRadius: '10px'
      }}
    >
      {children}
    </motion.div>
  );
};

export default BrutalistCard;
