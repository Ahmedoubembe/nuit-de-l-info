'use client';

import { motion } from 'framer-motion';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useSpeech } from '@/hooks/useSpeech';
import { useState, useEffect } from 'react';

export interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const characters: Record<string, Character> = {
  proviseur: {
    id: 'proviseur',
    name: 'M. Dubois',
    emoji: '👨‍💼',
    color: 'from-blue-600 to-blue-700',
  },
  profTechno: {
    id: 'profTechno',
    name: 'Mme Martin',
    emoji: '👩‍🏫',
    color: 'from-purple-600 to-purple-700',
  },
  eleveGeek: {
    id: 'eleveGeek',
    name: 'Lucas',
    emoji: '🧑‍💻',
    color: 'from-green-600 to-green-700',
  },
  comptable: {
    id: 'comptable',
    name: 'M. Bernard',
    emoji: '👨‍💼',
    color: 'from-orange-600 to-orange-700',
  },
  narrator: {
    id: 'narrator',
    name: 'Narrateur',
    emoji: '📖',
    color: 'from-gray-600 to-gray-700',
  },
};

interface CharacterDialogueProps {
  character: Character;
  dialogue: string;
  position?: 'left' | 'right' | 'center';
  enableTyping?: boolean;
}

export default function CharacterDialogue({
  character,
  dialogue,
  position = 'left',
  enableTyping = false,
}: CharacterDialogueProps) {
  const [showText, setShowText] = useState(false);
  const { displayedText } = useTypingEffect(dialogue, 30, showText && enableTyping);
  const { speak, speaking } = useSpeech();

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Trigger speech synthesis after component appears
  useEffect(() => {
    const speakTimer = setTimeout(() => {
      speak(dialogue);
    }, 500);

    return () => clearTimeout(speakTimer);
  }, [dialogue, speak]);

  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end flex-row-reverse',
    center: 'justify-center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -50 : position === 'right' ? 50 : 0, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`flex items-start gap-3 md:gap-4 mb-4 md:mb-6 ${positionClasses[position]}`}
    >
      {/* Character avatar with bounce and pulse */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="relative flex-shrink-0"
      >
        <motion.div
          animate={
            speaking
              ? { scale: [1, 1.1, 1] }
              : { scale: [1, 1.05, 1] }
          }
          transition={
            speaking
              ? { duration: 1, repeat: Infinity, repeatType: 'loop' }
              : { duration: 2, repeat: Infinity, repeatType: 'loop' }
          }
          className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${character.color} rounded-full flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shadow-lg`}
        >
          {character.emoji}
        </motion.div>

        {/* Pulsing ring effect */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className={`absolute inset-0 bg-gradient-to-br ${character.color} rounded-full`}
        />
      </motion.div>

      {/* Dialogue bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        className={`max-w-sm md:max-w-md ${
          position === 'right' ? 'text-right' : position === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 md:mb-2"
        >
          {character.name}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200 dark:border-gray-700 relative"
        >
          <p className="text-sm md:text-base text-gray-900 dark:text-white">
            {enableTyping ? displayedText : dialogue}
            {enableTyping && !displayedText.endsWith(dialogue.slice(-1)) && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            )}
          </p>

          {/* Speech bubble tail */}
          <div
            className={`absolute top-4 ${
              position === 'left'
                ? '-left-2'
                : position === 'right'
                ? '-right-2'
                : 'hidden'
            } w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent ${
              position === 'left'
                ? 'border-r-8 border-r-white dark:border-r-gray-800'
                : 'border-l-8 border-l-white dark:border-l-gray-800'
            }`}
          />
        </motion.div>

        {/* Speaking indicator */}
        {speaking && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 mt-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            ))}
            <span className="text-xs text-blue-500 ml-1">En lecture...</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
