'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { microInteractions } from '@/lib/animations';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'shield';
  withRipple?: boolean;
}

/**
 * Bouton animé avec effets de hover, tap et ripple
 */
export default function AnimatedButton({
  children,
  variant = 'primary',
  withRipple = true,
  className = '',
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withRipple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples(prev => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'relative overflow-hidden font-body font-semibold rounded-xl px-6 py-3 transition-colors';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-gaulois-blue to-forest-green text-white hover:from-forest-green hover:to-gaulois-blue',
    secondary: 'bg-parchment-200 text-gray-900 hover:bg-menhir-yellow border-2 border-menhir-yellow',
    shield: 'bg-gradient-to-br from-gaulois-blue to-forest-green text-white border-4 border-menhir-yellow font-comic text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={microInteractions.button.hover}
      whileTap={microInteractions.button.tap}
      transition={microInteractions.button.transition}
      onClick={handleClick}
      {...props}
    >
      {children}

      {/* Ripple effect */}
      {withRipple && ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
}
