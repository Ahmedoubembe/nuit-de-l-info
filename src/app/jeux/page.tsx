'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Zap, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SoftwareSortGame from '@/components/games/SoftwareSortGame';
import PCRepairGame from '@/components/games/PCRepairGame';
import ExpertQuizGame from '@/components/games/ExpertQuizGame';

type GameMode = 'menu' | 'sort' | 'repair' | 'quiz';

export default function GamesPage() {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState<GameMode>('menu');

  const games = [
    {
      id: 'sort' as const,
      title: 'Trie les Logiciels',
      description: 'Glisse-dépose les logiciels dans la bonne catégorie : Libre ou Propriétaire',
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500',
      emoji: '🎯',
    },
    {
      id: 'repair' as const,
      title: 'Répare le PC',
      description: 'Clique rapidement pour installer Linux et réparer les PC en panne !',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      emoji: '💻',
    },
    {
      id: 'quiz' as const,
      title: 'Quiz de l\'Expert',
      description: '20 questions pour devenir un expert du logiciel libre et de Linux',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      emoji: '🧠',
    },
  ];

  if (currentGame !== 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentGame('menu')}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour aux jeux</span>
          </motion.button>

          {currentGame === 'sort' && <SoftwareSortGame />}
          {currentGame === 'repair' && <PCRepairGame />}
          {currentGame === 'quiz' && <ExpertQuizGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎮 Mini-Jeux NIRD 🎮
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Apprends en t&apos;amusant ! Teste tes connaissances sur le logiciel libre et Linux
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentGame(game.id)}
                className="cursor-pointer"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-200 dark:border-gray-700 h-full">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${game.color} p-6 text-white`}>
                    <div className="text-5xl mb-3 text-center">{game.emoji}</div>
                    <Icon className="w-12 h-12 mx-auto opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Play Button */}
                  <div className="px-6 pb-6">
                    <div className={`w-full bg-gradient-to-r ${game.color} text-white py-3 rounded-xl font-bold text-center hover:shadow-lg transition-all`}>
                      Jouer maintenant !
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l&apos;accueil
          </button>
        </motion.div>
      </div>
    </div>
  );
}
