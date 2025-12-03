'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';

export default function VoiceInfoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if banner has been dismissed
    const dismissed = localStorage.getItem('voice-info-dismissed');
    if (!dismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('voice-info-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-blue-300 dark:border-blue-600 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="p-4 pr-12 relative">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4 text-blue-700 dark:text-blue-300" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1 flex items-center gap-2">
                    💡 Astuce
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Activez le son <Volume2 className="w-4 h-4 inline" /> en haut à droite pour
                    entendre les dialogues lus automatiquement !
                  </p>
                </div>
              </div>

              {/* Dismiss link */}
              <button
                onClick={handleDismiss}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 ml-13"
              >
                Ne plus afficher
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
