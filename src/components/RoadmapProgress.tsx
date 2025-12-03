'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lock, Unlock, CheckCircle } from 'lucide-react';
import type { RoadmapStep } from '@/types';

interface RoadmapProgressProps {
  roadmap: RoadmapStep[];
}

export default function RoadmapProgress({ roadmap }: RoadmapProgressProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Calculer le niveau NIRD pour chaque phase
  const getNirdLevel = (phase: number) => {
    const levels = [
      { phase: 1, name: 'Découverte', level: 25, color: 'from-gray-400 to-gray-500' },
      { phase: 2, name: 'Initiation', level: 50, color: 'from-blue-400 to-blue-500' },
      { phase: 3, name: 'Avancé', level: 75, color: 'from-green-400 to-green-500' },
      { phase: 4, name: 'Expert', level: 100, color: 'from-yellow-400 to-orange-500' },
    ];
    return levels.find((l) => l.phase === phase) || levels[0];
  };

  // État des phases (toutes débloquées pour la démo, mais on pourrait les verrouiller)
  const getPhaseStatus = (phase: number) => {
    // Pour l'instant, toutes les phases sont débloquées
    // On pourrait les verrouiller en fonction de conditions réelles
    return 'unlocked'; // 'locked' | 'unlocked' | 'completed'
  };

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🗺️ Roadmap de Migration
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Votre parcours vers la souveraineté numérique
      </p>

      {/* Barre de progression globale */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Progression globale
          </span>
          <span className="text-sm font-bold text-blue-600">0%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: inView ? '0%' : 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          💡 La progression augmentera au fur et à mesure de votre migration
        </p>
      </div>

      {/* Timeline des phases */}
      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-green-500 to-yellow-500" />

        <div className="space-y-8">
          {roadmap.map((step, index) => {
            const status = getPhaseStatus(step.phase);
            const nirdLevel = getNirdLevel(step.phase);
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: inView ? 1 : 0,
                  x: inView ? 0 : -50,
                }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative pl-20"
              >
                {/* Icône de phase avec verrou/déverrou */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: inView ? 1 : 0 }}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                  className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    isLocked
                      ? 'bg-gray-300 dark:bg-gray-700'
                      : isCompleted
                      ? 'bg-green-500'
                      : `bg-gradient-to-br ${nirdLevel.color}`
                  }`}
                >
                  {isLocked ? (
                    <Lock className="w-8 h-8 text-white" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    >
                      <Unlock className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Contenu de la phase */}
                <div
                  className={`bg-gradient-to-br ${
                    isLocked
                      ? 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
                      : 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
                  } rounded-2xl p-6 shadow-lg border-2 ${
                    isLocked
                      ? 'border-gray-300 dark:border-gray-700 opacity-60'
                      : isCompleted
                      ? 'border-green-500'
                      : 'border-blue-500'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${nirdLevel.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {step.phase}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phase {step.phase} • {step.duration}
                        </p>
                      </div>
                    </div>

                    {/* Niveau NIRD */}
                    <div className={`mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${nirdLevel.color} rounded-full text-white font-semibold shadow-lg`}>
                      <span className="text-sm">Niveau {nirdLevel.name}</span>
                      <span className="text-lg">{nirdLevel.level}%</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>

                  {/* Actions */}
                  <div className="space-y-2">
                    {step.actions.map((action, actionIndex) => (
                      <motion.div
                        key={actionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: inView && !isLocked ? 1 : 0.3,
                          x: inView ? 0 : -20,
                        }}
                        transition={{ delay: index * 0.2 + 0.1 * actionIndex }}
                        className="flex items-start gap-2"
                      >
                        <div
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500'
                              : isLocked
                              ? 'bg-gray-400'
                              : 'bg-blue-500'
                          }`}
                        >
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {action}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message de verrou */}
                  {isLocked && (
                    <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Cette phase sera débloquée après la phase {step.phase - 1}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Message de motivation final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 20,
        }}
        transition={{ delay: roadmap.length * 0.2 + 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white text-center"
      >
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-2xl font-bold mb-2">Prêt à commencer ?</h3>
        <p className="text-lg opacity-90 mb-4">
          Suivez cette roadmap étape par étape pour une migration réussie vers Linux !
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="px-3 py-1 bg-white/20 rounded-full">4 phases</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">
            {roadmap.reduce((acc, step) => acc + step.actions.length, 0)} actions
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full">100% personnalisable</span>
        </div>
      </motion.div>
    </div>
  );
}
