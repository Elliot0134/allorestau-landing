import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = () => {
  useEffect(() => {
    // Initialiser Lenis avec des options pour un scroll fluide
    const lenis = new Lenis({
      duration: 1.2, // Durée de l'animation (plus élevé = plus lent/fluide)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fonction d'easing
      smoothWheel: true, // Active le smooth scroll pour la molette
      smoothTouch: false, // Désactive pour le touch (meilleure performance mobile)
    });

    // Ajouter la classe lenis à l'élément html
    document.documentElement.classList.add('lenis');

    // Fonction de mise à jour appelée à chaque frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return null;
};

export default SmoothScroll;
