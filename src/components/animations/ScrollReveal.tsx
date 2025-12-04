'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { scrollAnimations } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: keyof typeof scrollAnimations;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

/**
 * Composant pour révéler les éléments au scroll
 * Usage: <ScrollReveal animation="fadeInUp">...</ScrollReveal>
 */
export default function ScrollReveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  threshold = 0.1,
  once = true,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-50px',
    amount: threshold
  });

  const variants = scrollAnimations[animation];

  // Override duration if provided
  const customVariants: Variants = duration
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as any).transition,
            duration,
            delay
          }
        }
      }
    : {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as any).transition,
            delay
          }
        }
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
