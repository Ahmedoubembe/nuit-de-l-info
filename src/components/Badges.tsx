'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { QuestionnaireData, Results } from '@/types';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  tier: number;
}

interface BadgesProps {
  data: QuestionnaireData;
  results: Results;
}

export default function Badges({ data, results }: BadgesProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const economiesAnnuelles = results.economiesFinancieres.annualSavings;
  const pcSauves = Math.floor(results.impactEcologique.totalCO2Saved / 600);
  const autonomyScore = 100; // NIRD donne 100% d'autonomie

  // Définir les badges
  const badges: Badge[] = [
    // Badges économiques
    {
      id: 'eco-bronze',
      title: '💰 Économe',
      description: 'Plus de 5 000€ économisés par an',
      icon: '💰',
      color: 'from-yellow-400 to-yellow-600',
      unlocked: economiesAnnuelles > 5000,
      tier: 1,
    },
    {
      id: 'eco-silver',
      title: '💎 Trésorier d\'or',
      description: 'Plus de 15 000€ économisés par an',
      icon: '💎',
      color: 'from-blue-400 to-blue-600',
      unlocked: economiesAnnuelles > 15000,
      tier: 2,
    },
    {
      id: 'eco-gold',
      title: '👑 Roi des économies',
      description: 'Plus de 30 000€ économisés par an',
      icon: '👑',
      color: 'from-purple-400 to-purple-600',
      unlocked: economiesAnnuelles > 30000,
      tier: 3,
    },

    // Badges écologiques
    {
      id: 'green-bronze',
      title: '🌱 Éco-conscient',
      description: 'Plus de 10 PC sauvés',
      icon: '🌱',
      color: 'from-green-400 to-green-600',
      unlocked: pcSauves > 10,
      tier: 1,
    },
    {
      id: 'green-silver',
      title: '🌳 Gardien de la forêt',
      description: 'Plus de 30 PC sauvés',
      icon: '🌳',
      color: 'from-emerald-400 to-emerald-600',
      unlocked: pcSauves > 30,
      tier: 2,
    },
    {
      id: 'green-gold',
      title: '🌍 Héros climatique',
      description: 'Plus de 50 PC sauvés',
      icon: '🌍',
      color: 'from-teal-400 to-teal-600',
      unlocked: pcSauves > 50,
      tier: 3,
    },

    // Badges autonomie
    {
      id: 'autonomy-bronze',
      title: '🛡️ Résistant',
      description: '50% d\'autonomie atteinte',
      icon: '🛡️',
      color: 'from-gray-400 to-gray-600',
      unlocked: autonomyScore >= 50,
      tier: 1,
    },
    {
      id: 'autonomy-silver',
      title: '⚔️ Guerrier libre',
      description: '75% d\'autonomie atteinte',
      icon: '⚔️',
      color: 'from-orange-400 to-orange-600',
      unlocked: autonomyScore >= 75,
      tier: 2,
    },
    {
      id: 'autonomy-gold',
      title: '🏆 Village autonome',
      description: '90%+ d\'autonomie atteinte',
      icon: '🏆',
      color: 'from-amber-400 to-amber-600',
      unlocked: autonomyScore >= 90,
      tier: 3,
    },
  ];

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const totalBadges = badges.length;

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            🏆 Badges Débloqués
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unlockedBadges.length} / {totalBadges} badges obtenus
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-blue-600">
            {Math.round((unlockedBadges.length / totalBadges) * 100)}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Complétion</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-8">
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: inView ? `${(unlockedBadges.length / totalBadges) * 100}%` : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-600 to-green-600"
          />
        </div>
      </div>

      {/* Catégories de badges */}
      <div className="space-y-8">
        {/* Économiques */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            Badges Économiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.filter((b) => b.id.startsWith('eco')).map((badge, index) => (
              <BadgeCard key={badge.id} badge={badge} index={index} inView={inView} />
            ))}
          </div>
        </div>

        {/* Écologiques */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            Badges Écologiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.filter((b) => b.id.startsWith('green')).map((badge, index) => (
              <BadgeCard key={badge.id} badge={badge} index={index} inView={inView} />
            ))}
          </div>
        </div>

        {/* Autonomie */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            Badges Autonomie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.filter((b) => b.id.startsWith('autonomy')).map((badge, index) => (
              <BadgeCard key={badge.id} badge={badge} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>

      {/* Message de félicitations */}
      {unlockedBadges.length === totalBadges && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring' }}
          className="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-center text-white"
        >
          <div className="text-6xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Félicitations !</h3>
          <p className="text-lg">
            Vous avez débloqué tous les badges ! Vous êtes un champion de la transition numérique !
          </p>
        </motion.div>
      )}
    </div>
  );
}

function BadgeCard({ badge, index, inView }: { badge: Badge; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{
        opacity: inView ? 1 : 0,
        scale: inView ? 1 : 0.8,
        rotateY: inView ? 0 : -90,
      }}
      transition={{
        delay: 0.5 + index * 0.1,
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
      }}
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        badge.unlocked
          ? `bg-gradient-to-br ${badge.color} border-transparent shadow-lg hover:shadow-xl`
          : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 opacity-50'
      }`}
    >
      {/* Badge Icon */}
      <div className="text-center mb-3">
        <motion.div
          animate={badge.unlocked && inView ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
          className={`text-6xl ${badge.unlocked ? '' : 'grayscale'}`}
        >
          {badge.icon}
        </motion.div>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h4 className={`text-lg font-bold mb-1 ${badge.unlocked ? 'text-white' : 'text-gray-500 dark:text-gray-600'}`}>
          {badge.title}
        </h4>
        <p className={`text-sm ${badge.unlocked ? 'text-white/90' : 'text-gray-400 dark:text-gray-600'}`}>
          {badge.description}
        </p>
      </div>

      {/* Locked overlay */}
      {!badge.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-30">🔒</div>
        </div>
      )}

      {/* Unlocked checkmark */}
      {badge.unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 300 }}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-green-600 text-lg">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
}
