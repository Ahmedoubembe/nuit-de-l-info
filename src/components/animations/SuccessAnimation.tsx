'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { successAnimations } from '@/lib/animations';
import { ToutatisStarIcon } from '../AsterixIcons';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  withConfetti?: boolean;
  onComplete?: () => void;
}

/**
 * Animation de succès avec confetti et étoiles "Par Toutatis!"
 */
export default function SuccessAnimation({
  show,
  message = "Par Toutatis ! Succès !",
  withConfetti = true,
  onComplete
}: SuccessAnimationProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  useEffect(() => {
    if (show && withConfetti) {
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        if (onComplete) onComplete();
      }, 5000);
    }
  }, [show, withConfetti, onComplete]);

  if (!show) return null;

  return (
    <>
      {/* Confetti */}
      {withConfetti && showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#2563EB', '#FBBF24', '#10B981', '#EF4444']}
        />
      )}

      {/* Success overlay */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-parchment-100 dark:bg-gray-800 rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center border-4 border-menhir-yellow shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Checkmark animé */}
          <motion.div className="mb-6 flex justify-center">
            <motion.svg
              className="w-24 h-24"
              viewBox="0 0 52 52"
              {...successAnimations.checkmarkDraw}
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
              <motion.path
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                d="M14 27l8 8 16-16"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.svg>
          </motion.div>

          {/* Étoiles décoratives */}
          <div className="absolute top-4 left-4">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ToutatisStarIcon className="w-8 h-8" />
            </motion.div>
          </div>
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <ToutatisStarIcon className="w-8 h-8" />
            </motion.div>
          </div>

          {/* Message */}
          <motion.h2
            className="text-3xl md:text-4xl font-comic font-bold text-gaulois-blue mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {message}
          </motion.h2>

          <motion.p
            className="text-lg font-body text-gray-600 dark:text-gray-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            "La magie a opéré !" - Panoramix
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}
