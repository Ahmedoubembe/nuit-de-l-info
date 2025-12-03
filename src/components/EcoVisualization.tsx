'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TreePine, Car } from 'lucide-react';

interface EcoVisualizationProps {
  co2Saved: number;
}

export default function EcoVisualization({ co2Saved }: EcoVisualizationProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Calculs
  const treesEquivalent = Math.floor(co2Saved / 20); // 1 arbre absorbe ~20kg CO2/an
  const carKmEquivalent = Math.floor(co2Saved / 0.2); // ~0.2kg CO2/km

  // Limiter le nombre d'arbres affichés visuellement
  const treesToDisplay = Math.min(treesEquivalent, 20);
  const remainingTrees = treesEquivalent - treesToDisplay;

  return (
    <div ref={ref} className="space-y-6">
      {/* Trees visualization */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TreePine className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Équivalent en arbres plantés
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: treesToDisplay }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: inView ? 1 : 0,
                rotate: inView ? 0 : -180,
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <TreePine className="w-8 h-8 text-green-600" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 20,
          }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-green-600"
        >
          C'est comme planter{' '}
          <span className="text-3xl">{treesEquivalent.toLocaleString('fr-FR')}</span>{' '}
          arbre{treesEquivalent > 1 ? 's' : ''} ! 🌳
        </motion.p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          (1 arbre absorbe environ 20 kg de CO₂ par an)
        </p>
      </div>

      {/* Car visualization */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Car className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Équivalent en km de voiture
          </h3>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: inView ? 0 : -100,
              opacity: inView ? 1 : 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Car className="w-16 h-16 text-blue-600" />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="flex-1 h-2 bg-blue-600 rounded-full origin-left"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 20,
          }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-2xl font-bold text-blue-600"
        >
          = <span className="text-3xl">{carKmEquivalent.toLocaleString('fr-FR')}</span> km en
          voiture économisés ! 🚗
        </motion.p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          (une voiture émet environ 0.2 kg de CO₂ par km)
        </p>

        {carKmEquivalent > 1000 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-lg text-gray-700 dark:text-gray-300 mt-3 font-semibold"
          >
            💡 C'est l'équivalent de{' '}
            {carKmEquivalent > 40000
              ? 'faire le tour du monde'
              : carKmEquivalent > 10000
              ? `Paris ↔ New York (${Math.floor(carKmEquivalent / 5800)} fois)`
              : `Paris ↔ Marseille (${Math.floor(carKmEquivalent / 775)} fois)`}
            !
          </motion.p>
        )}
      </div>
    </div>
  );
}
