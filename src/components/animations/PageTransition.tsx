'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  variant?: 'pageTurn' | 'slideParallax' | 'fadeScale' | 'bounceIn';
}

/**
 * Wrapper pour les transitions de pages
 * Utilise le pathname pour déclencher les animations
 */
export default function PageTransition({
  children,
  variant = 'fadeScale'
}: PageTransitionProps) {
  const pathname = usePathname();

  const transitions = {
    pageTurn: {
      initial: { rotateY: -90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: 90, opacity: 0 },
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    slideParallax: {
      initial: { x: 100, opacity: 0, scale: 0.95 },
      animate: { x: 0, opacity: 1, scale: 1 },
      exit: { x: -100, opacity: 0, scale: 0.95 },
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    fadeScale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: { duration: 0.4 }
    },
    bounceIn: {
      initial: { y: -100, opacity: 0, rotate: -10 },
      animate: { y: 0, opacity: 1, rotate: 0 },
      exit: { y: 100, opacity: 0, rotate: 10 },
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  };

  const transition = transitions[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={transition.transition}
        style={{
          width: '100%',
          minHeight: '100vh'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
