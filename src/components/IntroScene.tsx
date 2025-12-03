'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useSound } from '@/hooks/useSound';

interface IntroSceneProps {
  onComplete: () => void;
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showText, setShowText] = useState(false);
  const { playTransitionSound, playClickSound } = useSound();

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

  const scene = scenes[currentScene];
  const { displayedText: mainText } = useTypingEffect(scene.text, 50, showText);
  const { displayedText: subText } = useTypingEffect(scene.subtext, 40, showText);

  useEffect(() => {
    // Start typing after character animation
    const timer = setTimeout(() => setShowText(true), 800);
    return () => {
      clearTimeout(timer);
      setShowText(false);
    };
  }, [currentScene]);

  const nextScene = () => {
    playClickSound(soundEnabled);
    if (currentScene < scenes.length - 1) {
      playTransitionSound(soundEnabled);
      setCurrentScene(currentScene + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    playClickSound(soundEnabled);
    setSkipIntro(true);
    setTimeout(() => onComplete(), 500);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    playClickSound(newState);
  };

  if (skipIntro) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-0 z-50 bg-gradient-to-br ${scene.background} flex items-center justify-center`}
      >
        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={handleSkip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 md:top-6 right-4 md:right-6 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm transition-colors z-10"
        >
          Passer l'intro →
        </motion.button>

        {/* Sound toggle */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={toggleSound}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 md:top-6 left-4 md:left-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-colors z-10"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
        </motion.button>

        {/* Scene content */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            {/* Character with bounce */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="text-6xl md:text-9xl mb-4 md:mb-6"
            >
              {scene.character}
            </motion.div>

            {/* Character name */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs md:text-sm uppercase tracking-wider text-white/60 mb-2"
            >
              {scene.characterName}
            </motion.div>

            {/* Main text with typing effect */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 min-h-[3rem] md:min-h-[5rem]"
            >
              {mainText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </motion.h1>

            {/* Subtext with typing effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-base md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 min-h-[2rem] md:min-h-[3rem]"
            >
              {subText}
            </motion.p>

            {/* Action button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={nextScene}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-bold rounded-full text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
            >
              {currentScene < scenes.length - 1 ? 'Continuer' : 'Découvrir la solution'}
              <Play className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12"
          >
            {scenes.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentScene
                    ? 'bg-white w-6 md:w-8'
                    : index < currentScene
                    ? 'bg-white/60 w-1.5 md:w-2'
                    : 'bg-white/20 w-1.5 md:w-2'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-black" />

        {/* Subtle particles in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -10, x: Math.random() * 100 + '%', opacity: 0 }}
              animate={{
                y: '110vh',
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
