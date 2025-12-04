'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { backgroundEffects } from '@/lib/animations';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'gradient' | 'stars';
  particleCount?: number;
  className?: string;
}

/**
 * Arrière-plans animés avec particules flottantes, gradients ou étoiles
 */
export default function AnimatedBackground({
  variant = 'particles',
  particleCount = 20,
  className = ''
}: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    if (variant === 'particles' || variant === 'stars') {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15
      }));
      setParticles(newParticles);
    }
  }, [variant, particleCount]);

  if (variant === 'gradient') {
    return (
      <motion.div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)',
          backgroundSize: '200% 200%'
        }}
        {...backgroundEffects.gradientShift}
      />
    );
  }

  if (variant === 'stars') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-menhir-yellow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size * 2}px`
            }}
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut'
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>
    );
  }

  // Particles variant (default)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
