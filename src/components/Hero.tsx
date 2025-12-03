'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Euro, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-medium mb-6"
          >
            <Leaf className="w-4 h-4" />
            <span>Migration écologique et économique</span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Passez à{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
              Linux
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <Euro className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Jusqu'à 70%
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                d'économies sur les licences
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                600 kg CO₂
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                économisés par PC conservé
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                100%
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Autonomie numérique
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Démarrer l'évaluation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Informations supplémentaires */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            ⏱️ 5 minutes • 📊 Résultats instantanés • 🔒 Aucune donnée collectée
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
