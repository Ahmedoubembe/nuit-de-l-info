'use client';

import { motion } from 'framer-motion';

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
}

export default function CharacterDialogue({
  character,
  dialogue,
  position = 'left',
}: CharacterDialogueProps) {
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end flex-row-reverse',
    center: 'justify-center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -50 : position === 'right' ? 50 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-start gap-4 mb-6 ${positionClasses[position]}`}
    >
      {/* Character avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${character.color} rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg`}
      >
        {character.emoji}
      </motion.div>

      {/* Dialogue bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className={`max-w-md ${
          position === 'right' ? 'text-right' : position === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
          {character.name}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-900 dark:text-white">{dialogue}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
