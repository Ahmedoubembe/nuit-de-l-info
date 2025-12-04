'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Info } from 'lucide-react';

interface Software {
  id: number;
  name: string;
  category: 'libre' | 'propriétaire';
  explanation: string;
  icon: string;
}

const softwares: Software[] = [
  { id: 1, name: 'Firefox', category: 'libre', explanation: 'Navigateur web open source développé par Mozilla', icon: '🦊' },
  { id: 2, name: 'Chrome', category: 'propriétaire', explanation: 'Navigateur développé par Google (Chromium est libre, mais Chrome est propriétaire)', icon: '🌐' },
  { id: 3, name: 'GIMP', category: 'libre', explanation: 'Logiciel de retouche d\'image libre, alternative à Photoshop', icon: '🎨' },
  { id: 4, name: 'Photoshop', category: 'propriétaire', explanation: 'Logiciel propriétaire d\'Adobe pour la retouche d\'images', icon: '📸' },
  { id: 5, name: 'LibreOffice', category: 'libre', explanation: 'Suite bureautique libre et gratuite', icon: '📝' },
  { id: 6, name: 'Microsoft Office', category: 'propriétaire', explanation: 'Suite bureautique propriétaire de Microsoft', icon: '📊' },
  { id: 7, name: 'VLC', category: 'libre', explanation: 'Lecteur multimédia libre très populaire', icon: '🎬' },
  { id: 8, name: 'Windows Media Player', category: 'propriétaire', explanation: 'Lecteur multimédia propriétaire de Microsoft', icon: '▶️' },
  { id: 9, name: 'Blender', category: 'libre', explanation: 'Logiciel de modélisation 3D open source professionnel', icon: '🎭' },
  { id: 10, name: '3ds Max', category: 'propriétaire', explanation: 'Logiciel de modélisation 3D propriétaire d\'Autodesk', icon: '🎮' },
  { id: 11, name: 'Audacity', category: 'libre', explanation: 'Éditeur audio libre et multiplateforme', icon: '🎵' },
  { id: 12, name: 'Adobe Premiere', category: 'propriétaire', explanation: 'Logiciel de montage vidéo propriétaire d\'Adobe', icon: '🎞️' },
  { id: 13, name: 'Linux', category: 'libre', explanation: 'Système d\'exploitation libre et open source', icon: '🐧' },
  { id: 14, name: 'macOS', category: 'propriétaire', explanation: 'Système d\'exploitation propriétaire d\'Apple', icon: '🍎' },
  { id: 15, name: 'Inkscape', category: 'libre', explanation: 'Logiciel de dessin vectoriel libre', icon: '✏️' },
];

export default function SoftwareSortGame() {
  const [shuffledSoftwares, setShuffledSoftwares] = useState<Software[]>([]);
  const [libreSoftware, setLibreSoftware] = useState<Software[]>([]);
  const [propriétaireSoftware, setPropriétaireSoftware] = useState<Software[]>([]);
  const [draggedItem, setDraggedItem] = useState<Software | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffled = [...softwares].sort(() => Math.random() - 0.5);
    setShuffledSoftwares(shuffled);
    setLibreSoftware([]);
    setPropriétaireSoftware([]);
    setGameFinished(false);
    setScore(0);
    setMistakes(0);
    setStartTime(Date.now());
    setEndTime(0);
    setShowExplanations(false);
  };

  const handleDragStart = (software: Software, source: 'shuffled' | 'libre' | 'propriétaire') => {
    setDraggedItem({ ...software, source } as any);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetCategory: 'libre' | 'propriétaire') => {
    if (!draggedItem) return;

    const source = (draggedItem as any).source;

    // Remove from source
    if (source === 'shuffled') {
      setShuffledSoftwares(prev => prev.filter(s => s.id !== draggedItem.id));
    } else if (source === 'libre') {
      setLibreSoftware(prev => prev.filter(s => s.id !== draggedItem.id));
    } else if (source === 'propriétaire') {
      setPropriétaireSoftware(prev => prev.filter(s => s.id !== draggedItem.id));
    }

    // Add to target
    if (targetCategory === 'libre') {
      setLibreSoftware(prev => [...prev, draggedItem]);
    } else {
      setPropriétaireSoftware(prev => [...prev, draggedItem]);
    }

    setDraggedItem(null);

    // Check if game is finished
    setTimeout(() => {
      checkGameFinished();
    }, 100);
  };

  const checkGameFinished = () => {
    if (shuffledSoftwares.length === 1 || (libreSoftware.length + propriétaireSoftware.length === softwares.length - 1)) {
      finishGame();
    }
  };

  const finishGame = () => {
    const currentTime = Date.now();
    setEndTime(currentTime);

    let correctCount = 0;
    let wrongCount = 0;

    libreSoftware.forEach(s => {
      if (s.category === 'libre') correctCount++;
      else wrongCount++;
    });

    propriétaireSoftware.forEach(s => {
      if (s.category === 'propriétaire') correctCount++;
      else wrongCount++;
    });

    const timeTaken = (currentTime - startTime) / 1000; // en secondes
    const baseScore = correctCount * 100;
    const timeBonus = Math.max(0, 500 - Math.floor(timeTaken / 2));
    const penaltyMalus = wrongCount * 50;

    const finalScore = Math.max(0, baseScore + timeBonus - penaltyMalus);

    setScore(finalScore);
    setMistakes(wrongCount);
    setGameFinished(true);
    setShowExplanations(true);
  };

  const getTimeTaken = () => {
    if (endTime === 0) return 0;
    return Math.floor((endTime - startTime) / 1000);
  };

  if (gameFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
          {/* Score Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
            </motion.div>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Jeu terminé !
            </h2>
            <div className="text-6xl font-black text-blue-600 dark:text-blue-400 mb-2">
              {score} points
            </div>
            <div className="text-gray-600 dark:text-gray-300 space-y-1">
              <p>⏱️ Temps : {getTimeTaken()} secondes</p>
              <p>✅ Bonnes réponses : {15 - mistakes}</p>
              <p>❌ Erreurs : {mistakes}</p>
            </div>
          </div>

          {/* Explanations */}
          {showExplanations && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="w-6 h-6" />
                Explications
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Logiciels Libres */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                  <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">
                    🟢 Logiciels Libres
                  </h4>
                  <div className="space-y-3">
                    {softwares.filter(s => s.category === 'libre').map(software => (
                      <div key={software.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-700">
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <span>{software.icon}</span>
                          {software.name}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {software.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logiciels Propriétaires */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
                  <h4 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-4">
                    🟠 Logiciels Propriétaires
                  </h4>
                  <div className="space-y-3">
                    {softwares.filter(s => s.category === 'propriétaire').map(software => (
                      <div key={software.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <span>{software.icon}</span>
                          {software.name}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {software.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Retry Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="w-6 h-6" />
              Rejouer
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black mb-2 text-gray-900 dark:text-white">
          🎯 Trie les Logiciels
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Glisse-dépose les logiciels dans la bonne catégorie !
        </p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Logiciels restants : {shuffledSoftwares.length}/15
        </div>
      </div>

      {/* Game Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Source: Shuffled Softwares */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            📦 À trier
          </h3>
          <div className="space-y-3 min-h-[500px]">
            <AnimatePresence>
              {shuffledSoftwares.map(software => (
                <motion.div
                  key={software.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  draggable
                  onDragStart={() => handleDragStart(software, 'shuffled')}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 cursor-move hover:shadow-lg transition-all border-2 border-gray-300 dark:border-gray-500"
                >
                  <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-2xl">{software.icon}</span>
                    {software.name}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Target: Libre */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('libre')}
          className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-300 dark:border-green-700 border-dashed"
        >
          <h3 className="text-xl font-bold mb-4 text-center text-green-800 dark:text-green-300">
            🟢 Logiciels Libres
          </h3>
          <div className="space-y-3 min-h-[500px]">
            <AnimatePresence>
              {libreSoftware.map(software => (
                <motion.div
                  key={software.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  draggable
                  onDragStart={() => handleDragStart(software, 'libre')}
                  className={`rounded-lg p-4 cursor-move hover:shadow-lg transition-all border-2 ${
                    software.category === 'libre'
                      ? 'bg-green-100 dark:bg-green-800/30 border-green-400 dark:border-green-600'
                      : 'bg-red-100 dark:bg-red-800/30 border-red-400 dark:border-red-600'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-2xl">{software.icon}</span>
                    {software.name}
                    {software.category !== 'libre' && <span className="ml-auto">❌</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Target: Propriétaire */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('propriétaire')}
          className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-2 border-orange-300 dark:border-orange-700 border-dashed"
        >
          <h3 className="text-xl font-bold mb-4 text-center text-orange-800 dark:text-orange-300">
            🟠 Logiciels Propriétaires
          </h3>
          <div className="space-y-3 min-h-[500px]">
            <AnimatePresence>
              {propriétaireSoftware.map(software => (
                <motion.div
                  key={software.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  draggable
                  onDragStart={() => handleDragStart(software, 'propriétaire')}
                  className={`rounded-lg p-4 cursor-move hover:shadow-lg transition-all border-2 ${
                    software.category === 'propriétaire'
                      ? 'bg-orange-100 dark:bg-orange-800/30 border-orange-400 dark:border-orange-600'
                      : 'bg-red-100 dark:bg-red-800/30 border-red-400 dark:border-red-600'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-2xl">{software.icon}</span>
                    {software.name}
                    {software.category !== 'propriétaire' && <span className="ml-auto">❌</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      {shuffledSoftwares.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <button
            onClick={finishGame}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Terminer et voir les résultats
          </button>
        </motion.div>
      )}
    </div>
  );
}
