'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Zap } from 'lucide-react';

interface PC {
  id: number;
  position: number;
  isBroken: boolean;
}

const GRID_SIZE = 9;
const GAME_DURATION = 60; // secondes

export default function PCRepairGame() {
  const [pcs, setPcs] = useState<PC[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const resetGame = useCallback(() => {
    setPcs([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameFinished(false);
    setCombo(0);
    setMaxCombo(0);
    setClickCount(0);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
  };

  // Spawn broken PCs
  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const interval = setInterval(() => {
      // Spawn 1-3 broken PCs
      const spawnCount = Math.floor(Math.random() * 3) + 1;
      const newPcs: PC[] = [];

      for (let i = 0; i < spawnCount; i++) {
        const position = Math.floor(Math.random() * GRID_SIZE);
        // Check if position is already occupied
        const exists = pcs.some(pc => pc.position === position);
        if (!exists) {
          newPcs.push({
            id: Date.now() + i,
            position,
            isBroken: true,
          });
        }
      }

      setPcs(prev => [...prev, ...newPcs]);

      // Remove PCs after 2 seconds if not clicked
      setTimeout(() => {
        setPcs(prev => prev.filter(pc => !newPcs.some(newPc => newPc.id === pc.id)));
        // Reset combo if PC disappears without being clicked
        setCombo(0);
      }, 2000);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameFinished, pcs]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameFinished(true);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameFinished]);

  const repairPC = (pcId: number) => {
    const pc = pcs.find(p => p.id === pcId);
    if (!pc || !pc.isBroken) return;

    // Remove the PC
    setPcs(prev => prev.filter(p => p.id !== pcId));

    // Update score with combo multiplier
    const newCombo = combo + 1;
    setCombo(newCombo);
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }

    const points = 10 + (newCombo * 2);
    setScore(prev => prev + points);
    setClickCount(prev => prev + 1);
  };

  const missedClick = () => {
    // Reset combo on missed click
    setCombo(0);
  };

  if (gameFinished) {
    const accuracy = clickCount > 0 ? Math.round((clickCount / (clickCount + 1)) * 100) : 0;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
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
              Temps écoulé !
            </h2>
            <div className="text-6xl font-black text-orange-600 dark:text-orange-400 mb-6">
              {score} points
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {clickCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  PC réparés
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {maxCombo}x
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Combo max
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700"
            >
              <div className="text-lg font-semibold text-green-800 dark:text-green-300">
                🐧 Bravo ! Tu as installé Linux sur {clickCount} PC !
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Grâce à toi, ces ordinateurs vont pouvoir vivre plus longtemps et tourner plus rapidement !
              </p>
            </motion.div>
          </div>

          {/* Retry Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="w-6 h-6" />
              Rejouer
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!gameStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700 text-center">
          <div className="text-6xl mb-6">💻⚡</div>
          <h2 className="text-4xl font-black mb-4 text-gray-900 dark:text-white">
            Répare le PC
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Des PC tombent en panne avec l&apos;écran bleu de la mort ! Clique rapidement pour installer Linux et les réparer.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 border-2 border-blue-200 dark:border-blue-700">
            <h3 className="font-bold text-lg text-blue-900 dark:text-blue-300 mb-4">
              📖 Comment jouer ?
            </h3>
            <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Des PC en panne apparaissent avec un écran bleu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Clique dessus pour installer Linux et les réparer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Enchaîne les réparations pour faire un combo et gagner plus de points !</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Tu as 60 secondes pour réparer un maximum de PC</span>
              </li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-12 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Commencer !
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-3xl font-black text-orange-600 dark:text-orange-400">
              {score}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
          </div>

          {combo > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Combo {combo}x
            </motion.div>
          )}
        </div>

        <div className="text-right">
          <div className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-blue-600 dark:text-blue-400'}`}>
            {timeLeft}s
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Temps restant</div>
        </div>
      </div>

      {/* Game Grid */}
      <div
        onClick={missedClick}
        className="grid grid-cols-3 gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border-2 border-gray-200 dark:border-gray-700"
      >
        {Array.from({ length: GRID_SIZE }).map((_, index) => {
          const pc = pcs.find(p => p.position === index);

          return (
            <div
              key={index}
              className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden"
            >
              <AnimatePresence>
                {pc && pc.isBroken && (
                  <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      repairPC(pc.id);
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all"
                  >
                    <div className="text-4xl md:text-5xl mb-2">💻</div>
                    <div className="text-xs md:text-sm font-bold text-white bg-red-600 px-2 py-1 rounded">
                      BSOD
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        💡 Clique sur les PC en panne pour installer Linux et les réparer !
      </div>
    </div>
  );
}
