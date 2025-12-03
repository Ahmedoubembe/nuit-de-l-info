'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Euro, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-medium mb-6 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Leaf className="w-4 h-4" />
            </motion.div>
            <span>Migration écologique et économique</span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Passez à{' '}
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Linux
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Découvrez combien votre organisation peut{' '}
            <span className="font-semibold text-green-600 dark:text-green-400">
              économiser
            </span>{' '}
            et quel{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              impact écologique
            </span>{' '}
            vous pouvez avoir en migrant vers Linux.
          </motion.p>

          {/* Stats rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              {
                icon: Euro,
                value: "Jusqu'à 70%",
                label: "d'économies sur les licences",
                color: "text-green-600",
                bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
              },
              {
                icon: Leaf,
                value: "600 kg CO₂",
                label: "économisés par PC conservé",
                color: "text-green-600",
                bgColor: "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
              },
              {
                icon: Shield,
                value: "100%",
                label: "Autonomie numérique",
                color: "text-blue-600",
                bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-default`}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full md:w-auto justify-center"
              >
                Démarrer l'évaluation
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Informations supplémentaires */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-xs md:text-sm text-gray-500 dark:text-gray-400"
          >
            ⏱️ 5 minutes • 📊 Résultats instantanés • 🔒 Aucune donnée collectée
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
