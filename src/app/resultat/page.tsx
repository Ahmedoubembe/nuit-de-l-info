'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Euro, Leaf, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { QuestionnaireData, Results } from '@/types';
import { calculateImpact } from '../../../lib/calculations';

export default function ResultatPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const answers: QuestionnaireData = JSON.parse(dataParam);
        const calculatedResults = calculateImpact(answers);
        setResults(calculatedResults);
      } catch (error) {
        console.error('Error parsing questionnaire data:', error);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Calcul en cours...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-2xl">Aucune donnée disponible</div>
        <Link href="/questionnaire" className="text-blue-600 hover:underline">
          Retour au questionnaire
        </Link>
      </div>
    );
  }

  const { economiesFinancieres, impactEcologique, autonomie, roadmap } = results;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vos Résultats 🎉
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Voici l'impact d'une migration vers Linux pour votre organisation
          </p>
        </motion.div>

        {/* Économies financières */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Euro className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Économies Financières
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Coûts actuels (Windows/Office)
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Licences Windows:</span>
                  <span className="font-semibold">
                    {economiesFinancieres.windowsCost.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Microsoft 365:</span>
                  <span className="font-semibold">
                    {economiesFinancieres.officeCost.toLocaleString('fr-FR')} €/an
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Support (10%):</span>
                  <span className="font-semibold">
                    {economiesFinancieres.supportCost.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-red-200 dark:border-red-800">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">
                    {economiesFinancieres.currentTotalCost.toLocaleString('fr-FR')} €/an
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Coûts Linux
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Formation (one-time):</span>
                  <span className="font-semibold">
                    {economiesFinancieres.linuxFormationCost.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance:</span>
                  <span className="font-semibold">
                    {economiesFinancieres.linuxMaintenanceCost.toLocaleString('fr-FR')} €/an
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-200 dark:border-green-800">
                  <span className="font-bold">Total année 1:</span>
                  <span className="font-bold text-lg">
                    {economiesFinancieres.linuxTotalCost.toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Économies annuelles</p>
                <p className="text-4xl font-bold">
                  {economiesFinancieres.annualSavings.toLocaleString('fr-FR')} €
                </p>
              </div>
              <TrendingUp className="w-16 h-16 opacity-80" />
            </div>
            <div className="mt-4 pt-4 border-t border-green-400">
              <p className="text-sm opacity-90">Économies sur 5 ans</p>
              <p className="text-3xl font-bold">
                {economiesFinancieres.fiveYearSavings.toLocaleString('fr-FR')} €
              </p>
            </div>
          </div>
        </motion.section>

        {/* Impact écologique */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Impact Écologique
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
              <div className="text-5xl mb-3">🌍</div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                {impactEcologique.totalCO2Saved.toLocaleString('fr-FR')} kg
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ économisé</p>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
              <div className="text-5xl mb-3">♻️</div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {impactEcologique.totalWasteSaved.toLocaleString('fr-FR')} kg
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Déchets électroniques évités
              </p>
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
              <div className="text-5xl mb-3">⏱️</div>
              <p className="text-3xl font-bold text-purple-600 mb-2">
                +{impactEcologique.pcLifeExtension} ans
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Durée de vie prolongée
              </p>
            </div>
          </div>
        </motion.section>

        {/* Autonomie */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Autonomie Numérique
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                label: 'Contrôle des données',
                value: autonomie.dataControl,
                icon: '🔒',
              },
              {
                label: 'Pas de verrouillage fournisseur',
                value: !autonomie.vendorLockIn,
                icon: '🔓',
              },
              {
                label: 'Personnalisation complète',
                value: autonomie.customization,
                icon: '🎨',
              },
              {
                label: 'Code source transparent',
                value: autonomie.transparency,
                icon: '👁️',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.label}
                </span>
                {item.value && <span className="ml-auto text-green-600 text-2xl">✓</span>}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🗺️ Roadmap de Migration
          </h2>

          <div className="space-y-6">
            {roadmap.map((step, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-600 pl-6 pb-6 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.phase}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {step.description}
                </p>
                <ul className="space-y-1">
                  {step.actions.map((action, actionIndex) => (
                    <li
                      key={actionIndex}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                    >
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Recommencer une évaluation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
