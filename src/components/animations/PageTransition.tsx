'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { pageTransitions } from '@/lib/animations';

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
  const transition = pageTransitions[variant];

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
