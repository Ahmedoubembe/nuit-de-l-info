'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToutatisStarIcon, BoarIcon } from './AsterixIcons';

export default function AsterixEasterEggs() {
  const [toutatisStars, setToutatisStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showObelix, setShowObelix] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    let clickTimeout: NodeJS.Timeout;
    let clickCount = 0;
    const CLICK_THRESHOLD = 5; // 5 clics rapides
    const CLICK_TIMEOUT = 2000; // 2 secondes

    // Easter Egg: Clics multiples rapides = "Par Toutatis!"
    const handleClick = (e: MouseEvent) => {
      clickCount++;

      if (clickCount === 1) {
        clickTimeout = setTimeout(() => {
          clickCount = 0;
        }, CLICK_TIMEOUT);
      }

      if (clickCount >= CLICK_THRESHOLD) {
        // Créer des étoiles "Par Toutatis!" à la position du clic
        const newStars = Array.from({ length: 8 }, (_, i) => ({
          id: Date.now() + i,
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
        }));

        setToutatisStars(prev => [...prev, ...newStars]);

        // Jouer un son ou afficher un message
        console.log('Par Toutatis ! 💫');

        // Nettoyer les étoiles après l'animation
        setTimeout(() => {
          setToutatisStars(prev => prev.filter(star => !newStars.find(s => s.id === star.id)));
        }, 1000);

        clickCount = 0;
        clearTimeout(clickTimeout);
      }
    };

    // Easter Egg: Konami Code = Obélix apparaît
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiProgress]) {
        setKonamiProgress(prev => prev + 1);

        if (konamiProgress === konamiCode.length - 1) {
          // Konami code complet !
          setShowObelix(true);
          console.log('🐗 Obélix: "Ils sont fous ces Romains !" 🐗');

          setTimeout(() => {
            setShowObelix(false);
            setKonamiProgress(0);
          }, 5000);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(clickTimeout);
    };
  }, [konamiProgress]);

  return (
    <>
      {/* Étoiles "Par Toutatis!" */}
      <AnimatePresence>
        {toutatisStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ scale: 2, rotate: 360, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed pointer-events-none z-[9999]"
            style={{ left: star.x, top: star.y }}
          >
            <ToutatisStarIcon className="w-12 h-12" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-comic font-bold text-menhir-yellow whitespace-nowrap drop-shadow-lg">
              Par Toutatis !
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Obélix apparaît (Konami Code) */}
      <AnimatePresence>
        {showObelix && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed bottom-8 left-8 z-[9999] pointer-events-none"
          >
            <div className="relative">
              {/* Bulle de dialogue */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white border-4 border-gray-800 rounded-3xl px-6 py-4 shadow-2xl min-w-[300px]"
              >
                <div className="text-center">
                  <p className="font-comic text-xl font-bold text-gray-900 mb-2">
                    "Ils sont fous ces Romains !"
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    - Obélix, à propos des Big Tech
                  </p>
                </div>
                {/* Petite pointe de la bulle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-gray-800" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white" />
                </div>
              </motion.div>

              {/* Obélix (représenté par un sanglier et des emojis) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-6 border-4 border-gray-800 shadow-2xl"
              >
                <div className="flex flex-col items-center gap-2">
                  <BoarIcon className="w-20 h-20" />
                  <div className="text-4xl">🧔</div>
                  <div className="text-xl">🥖</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateur visuel discret du Konami code (pour le debug) */}
      {process.env.NODE_ENV === 'development' && konamiProgress > 0 && (
        <div className="fixed top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono z-[9999]">
          Konami: {konamiProgress}/{konamiCode.length}
        </div>
      )}
    </>
  );
}
