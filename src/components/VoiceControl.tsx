'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface VoiceControlProps {
  className?: string;
}

export default function VoiceControl({ className = '' }: VoiceControlProps) {
  const { enabled, speaking, toggle, available } = useSpeech();

  // Don't render if speech synthesis is not available
  if (!available) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className={`fixed top-4 right-4 z-50 ${className}`}
    >
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={speaking ? { scale: [1, 1.1, 1] } : {}}
        transition={speaking ? { duration: 0.8, repeat: Infinity } : {}}
        className={`
          group relative p-3 rounded-full shadow-lg backdrop-blur-sm
          transition-all duration-300
          ${
            enabled
              ? 'bg-green-500/90 hover:bg-green-600/90'
              : 'bg-gray-500/90 hover:bg-gray-600/90'
          }
        `}
        title={enabled ? 'Désactiver la lecture vocale' : 'Activer la lecture vocale'}
      >
        {/* Icon */}
        <motion.div
          initial={false}
          animate={{ rotate: enabled ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {enabled ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </motion.div>

        {/* Pulse indicator when speaking */}
        {speaking && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-green-400"
          />
        )}

        {/* Tooltip */}
        <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
            {enabled ? '🔊 Lecture vocale activée' : '🔇 Lecture vocale désactivée'}
            <div className="text-gray-400 text-[10px] mt-1">
              Cliquez pour {enabled ? 'désactiver' : 'activer'}
            </div>
            {/* Arrow */}
            <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45" />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
