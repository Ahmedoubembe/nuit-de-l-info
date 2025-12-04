'use client';

import { motion } from 'framer-motion';
import { MenhirIcon, PotionIcon, CauldronIcon } from '../AsterixIcons';
import { loadingAnimations } from '@/lib/animations';

interface LoadingSpinnerProps {
  variant?: 'menhir' | 'potion' | 'cauldron' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

/**
 * Loading spinner avec plusieurs variantes thématiques Astérix
 */
export default function LoadingSpinner({
  variant = 'menhir',
  size = 'md',
  message
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const messages = [
    "Panoramix prépare la potion...",
    "Les Gaulois se mobilisent...",
    "Obélix soulève des menhirs...",
    "Astérix consulte le druide...",
    "La magie opère..."
  ];

  const randomMessage = message || messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      {/* Spinner */}
      {variant === 'menhir' && (
        <motion.div
          className={sizeClasses[size]}
          {...loadingAnimations.menhirSpin}
        >
          <MenhirIcon className="w-full h-full" />
        </motion.div>
      )}

      {variant === 'potion' && (
        <motion.div
          className={sizeClasses[size]}
          {...loadingAnimations.potionBubble}
        >
          <PotionIcon className="w-full h-full" />
        </motion.div>
      )}

      {variant === 'cauldron' && (
        <motion.div className={sizeClasses[size]}>
          <CauldronIcon className="w-full h-full" />
        </motion.div>
      )}

      {variant === 'dots' && (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-gaulois-blue rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Message */}
      {randomMessage && (
        <motion.p
          className="text-sm md:text-base font-body text-gray-600 dark:text-gray-400 text-center italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {randomMessage}
        </motion.p>
      )}
    </div>
  );
}
