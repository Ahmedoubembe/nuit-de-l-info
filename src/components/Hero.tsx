'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { VillageIcon, PotionIcon, ShieldIcon, MenhirIcon } from './AsterixIcons';
import { AnimatedBackground } from './animations';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-parchment-50 via-parchment-100 to-forest-green/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 relative overflow-hidden">
      {/* Motifs décoratifs de fond */}
      <div className="absolute inset-0 opacity-5 celtic-pattern pointer-events-none" />

      {/* Background animé avec particules */}
      <AnimatedBackground variant="particles" particleCount={15} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Village Icon animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <VillageIcon className="w-32 h-32 md:w-40 md:h-40" />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-menhir-yellow/30 border-2 border-menhir-yellow rounded-full text-gray-800 dark:text-gray-200 font-body font-semibold mb-6 cursor-default shadow-lg"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              🌿
            </motion.span>
            <span>Par Toutatis ! Une révolution numérique !</span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-comic font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Rejoignez{' '}
            <motion.span
              className="bg-gradient-to-r from-gaulois-blue via-forest-green to-menhir-yellow text-transparent bg-clip-text inline-block"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Le Village
            </motion.span>
            <br />
            <span className="text-gaulois-blue">Irréductible !</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto font-body"
          >
            Résistez à l'empire des{' '}
            <span className="font-bold text-roman-red dark:text-red-400">
              Big Tech romains
            </span>{' '}
            et découvrez la{' '}
            <span className="font-bold text-forest-green dark:text-green-400">
              potion magique
            </span>{' '}
            qui rendra votre organisation{' '}
            <span className="font-bold text-gaulois-blue">
              libre et souveraine
            </span>
            {' '}!
          </motion.p>

          {/* Stats rapides - Style gaulois */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-16"
          >
            {[
              {
                icon: '💰',
                value: "Jusqu'à 70%",
                label: "d'économies de deniers",
                subtitle: "(sur les tributs romains)",
                bgColor: "from-forest-green to-emerald-500",
              },
              {
                icon: '🌿',
                value: "600 kg CO₂",
                label: "économisés par machine",
                subtitle: "(La forêt vous remercie !)",
                bgColor: "from-green-500 to-teal-500",
              },
              {
                icon: '🛡️',
                value: "100%",
                label: "Souveraineté gauloise",
                subtitle: "(Liberté totale !)",
                bgColor: "from-gaulois-blue to-blue-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-default border-4 border-menhir-yellow relative overflow-hidden`}
              >
                {/* Effet parchemin en arrière-plan */}
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl md:text-6xl mb-4"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-comic font-bold text-white mb-2 drop-shadow-lg">
                    {stat.value}
                  </h3>
                  <p className="text-base md:text-lg text-white font-body font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-white/80 font-body italic">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mode Selection - Style Astérix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-comic font-bold text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-3">
              <span>🗡️</span>
              Choisissez Votre Quête !
              <span>🗡️</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Story Mode - Thème Aventure */}
              <motion.div
                whileHover={{ y: -10, scale: 1.03, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Link href="/histoire" className="block">
                  <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white relative overflow-hidden border-4 border-menhir-yellow">
                    {/* Badge NEW avec animation */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 right-4 px-4 py-2 bg-menhir-yellow text-gray-900 text-sm font-comic font-bold rounded-full shadow-lg"
                    >
                      PAR TOUTATIS !
                    </motion.div>

                    {/* Icon avec animation */}
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      className="text-7xl mb-4"
                    >
                      🎭
                    </motion.div>

                    <h3 className="text-3xl font-comic font-bold mb-4 drop-shadow-lg">L'Aventure Épique</h3>
                    <p className="text-white/95 mb-6 font-body text-lg">
                      Rejoignez Astérix et Obélix dans leur lutte contre l'empire Big Tech ! Une histoire interactive pleine d'humour et de rebondissements.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">🎬 Cinématique</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">🗣️ Dialogues</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">⏱️ 10 min</span>
                    </div>

                    <motion.div
                      className="flex items-center justify-center gap-3 font-comic text-xl font-bold bg-white/20 backdrop-blur-sm py-4 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Débuter la Quête</span>
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>

              {/* Classic Mode - Thème Potion */}
              <motion.div
                whileHover={{ y: -10, scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/questionnaire" className="block">
                  <div className="bg-gradient-to-br from-gaulois-blue via-forest-green to-emerald-600 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white border-4 border-menhir-yellow relative overflow-hidden">
                    {/* Icône potion animée */}
                    <motion.div
                      className="absolute top-6 right-6"
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <PotionIcon className="w-16 h-16 drop-shadow-xl" />
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-7xl mb-4"
                    >
                      🧪
                    </motion.div>

                    <h3 className="text-3xl font-comic font-bold mb-4 drop-shadow-lg">La Potion Rapide</h3>
                    <p className="text-white/95 mb-6 font-body text-lg">
                      Comme un coup de potion magique ! Calculez rapidement vos économies avec notre questionnaire express.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">⚡ Ultra-rapide</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">📊 Précis</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">⏱️ 5 min</span>
                    </div>

                    <motion.div
                      className="flex items-center justify-center gap-3 font-comic text-xl font-bold bg-white/20 backdrop-blur-sm py-4 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Boire la Potion !</span>
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>

              {/* Games Mode - Thème Jeux */}
              <motion.div
                whileHover={{ y: -10, scale: 1.03, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Link href="/jeux" className="block">
                  <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white relative overflow-hidden border-4 border-menhir-yellow">
                    {/* Badge avec animation */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white text-sm font-comic font-bold rounded-full shadow-lg"
                    >
                      4 JEUX !
                    </motion.div>

                    {/* Icon avec animation */}
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                      className="text-7xl mb-4"
                    >
                      🎮
                    </motion.div>

                    <h3 className="text-3xl font-comic font-bold mb-4 drop-shadow-lg">Les Jeux du Village</h3>
                    <p className="text-white/95 mb-6 font-body text-lg">
                      Apprends en t&apos;amusant ! 4 mini-jeux + 1 RPG complet pour devenir un expert du logiciel libre.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">🎯 Mini-jeux</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">⚔️ RPG</span>
                      <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-body font-semibold">🏆 Succès</span>
                    </div>

                    <motion.div
                      className="flex items-center justify-center gap-3 font-comic text-xl font-bold bg-white/20 backdrop-blur-sm py-4 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Jouer Maintenant !</span>
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Informations supplémentaires - Style gaulois */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-4 px-6 py-3 bg-parchment-200/50 dark:bg-gray-800/50 rounded-full border-2 border-menhir-yellow/50 backdrop-blur-sm">
              <span className="text-lg">⏱️</span>
              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-body font-medium">
                Gratuit et sans inscription
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-lg">🔒</span>
              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-body font-medium">
                Aucune donnée collectée
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-body italic">
              "Ils sont fous ces Romains !" - Obélix
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
