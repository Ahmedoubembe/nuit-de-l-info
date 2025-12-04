'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Barre de progression qui suit le scroll
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gaulois-blue via-menhir-yellow to-forest-green z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}
