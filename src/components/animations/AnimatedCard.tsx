'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { microInteractions } from '@/lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  enable3D?: boolean;
  onClick?: () => void;
}

/**
 * Card animée avec effet 3D au hover
 * La card suit la souris et s'incline
 */
export default function AnimatedCard({
  children,
  className = '',
  enable3D = true,
  onClick
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values pour le tracking de la souris
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring pour un mouvement fluide
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3D || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    if (!enable3D) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={enable3D ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={microInteractions.card}
    >
      {children}
    </motion.div>
  );
}
