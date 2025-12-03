'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface IntroSceneProps {
  onComplete: () => void;
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const scenes = [
    {
      background: 'from-gray-700 via-gray-800 to-gray-900',
      character: '👨‍💼',
      characterName: 'M. Dubois, Proviseur',
      text: "Mauvaise nouvelle ce matin...",
      subtext: "Bureau du proviseur, 8h00",
    },
    {
      background: 'from-red-700 via-red-800 to-red-900',
      character: '📧',
      characterName: 'Email Microsoft',
      text: "Microsoft vient de DOUBLER ses prix !",
      subtext: "Notre budget IT va exploser...",
    },
    {
      background: 'from-orange-700 via-orange-800 to-orange-900',
      character: '💰',
      characterName: 'Le comptable',
      text: "Impossible de payer ! On n'a pas le budget !",
      subtext: "Il faut trouver une solution...",
    },
    {
      background: 'from-blue-700 via-blue-800 to-blue-900',
      character: '👨‍🏫',
      characterName: 'Prof de Techno',
      text: "Et si on essayait... Linux ?",
      subtext: "Gratuit, performant, écologique !",
    },
    {
      background: 'from-green-700 via-green-800 to-green-900',
      character: '🤔',
      characterName: 'Vous',
      text: "Mais combien peut-on vraiment économiser ?",
      subtext: "Il n'y a qu'un seul moyen de le savoir...",
    },
  ];

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    setSkipIntro(true);
    setTimeout(() => onComplete(), 500);
  };

  if (skipIntro) {
    return null;
  }

  const scene = scenes[currentScene];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-gradient-to-br ${scene.background} flex items-center justify-center`}
    >
      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleSkip}
        className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-sm transition-colors"
      >
        Passer l'intro →
      </motion.button>

      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 left-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-colors"
      >
        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {/* Scene content */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            {/* Character */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-9xl mb-6"
            >
              {scene.character}
            </motion.div>

            {/* Character name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-wider text-white/60 mb-2"
            >
              {scene.characterName}
            </motion.div>

            {/* Main text */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {scene.text}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-2xl text-white/80 mb-8"
            >
              {scene.subtext}
            </motion.p>

            {/* Action button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextScene}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
            >
              {currentScene < scenes.length - 1 ? 'Continuer' : 'Découvrir la solution'}
              <Play className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex justify-center gap-2 mt-12"
        >
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentScene
                  ? 'bg-white w-8'
                  : index < currentScene
                  ? 'bg-white/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black" />
    </motion.div>
  );
}
