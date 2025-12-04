'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Euro, Leaf, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { QuestionnaireData, Results } from '@/types';
import { calculateImpact } from '../../../lib/calculations';
import AnimatedCounter from '@/components/AnimatedCounter';
import CircularProgress from '@/components/CircularProgress';
import FadeInSection from '@/components/FadeInSection';
import ComparisonChart from '@/components/ComparisonChart';
import EcoVisualization from '@/components/EcoVisualization';
import EasterEgg from '@/components/EasterEgg';
import Tooltip from '@/components/Tooltip';
import PDFExport from '@/components/PDFExport';
import SocialShare from '@/components/SocialShare';
import Badges from '@/components/Badges';
import ComparisonRadar from '@/components/ComparisonRadar';
import RoadmapProgress from '@/components/RoadmapProgress';

export default function ResultatContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Results | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const answers: QuestionnaireData = JSON.parse(dataParam);
        setQuestionnaireData(answers);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
          className="text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Calcul en cours... 🧮
        </motion.div>
      </div>
    );
  }

  if (!results || !questionnaireData) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-2xl">Aucune donnée disponible</div>
        <Link
          href="/questionnaire"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all transform hover:scale-105"
        >
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Vos Résultats 🎉
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Voici l'impact d'une migration vers Linux pour votre organisation
          </p>
        </motion.div>

        {/* Easter Eggs */}
        {questionnaireData && (
          <FadeInSection delay={0.2} className="mb-8">
            <EasterEgg
              data={questionnaireData}
              savings={economiesFinancieres.annualSavings}
              co2Saved={impactEcologique.totalCO2Saved}
            />
          </FadeInSection>
        )}

        {/* Économies financières */}
        <FadeInSection delay={0.3} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Euro className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Économies Financières
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl hover:transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Coûts actuels (Windows/Office)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <Tooltip content="Licence OEM moyenne par PC">
                      <span>Licences Windows:</span>
                    </Tooltip>
                    <span className="font-semibold">
                      {economiesFinancieres.windowsCost.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <Tooltip content="Abonnement Microsoft 365 par utilisateur">
                      <span>Microsoft 365:</span>
                    </Tooltip>
                    <span className="font-semibold">
                      {economiesFinancieres.officeCost.toLocaleString('fr-FR')} €/an
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <Tooltip content="10% du coût total pour le support technique">
                      <span>Support (10%):</span>
                    </Tooltip>
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

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Coûts Linux
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <Tooltip content="Formation initiale des équipes (coût unique)">
                      <span>Formation (one-time):</span>
                    </Tooltip>
                    <span className="font-semibold">
                      {economiesFinancieres.linuxFormationCost.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <Tooltip content="Maintenance et support annuel">
                      <span>Maintenance:</span>
                    </Tooltip>
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

            {/* Comparison Chart */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Comparaison des coûts annuels
              </h3>
              <ComparisonChart
                windowsOfficeCost={economiesFinancieres.currentTotalCost}
                linuxCost={economiesFinancieres.linuxMaintenanceCost}
              />
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm opacity-90 mb-1">Économies annuelles</p>
                  <p className="text-4xl md:text-5xl font-bold">
                    <AnimatedCounter
                      end={economiesFinancieres.annualSavings}
                      suffix=" €"
                      duration={2.5}
                    />
                  </p>
                </div>
                <TrendingUp className="w-16 h-16 opacity-80" />
              </div>
              <div className="mt-4 pt-4 border-t border-green-400">
                <p className="text-sm opacity-90 mb-1">Économies sur 5 ans</p>
                <p className="text-3xl font-bold">
                  <AnimatedCounter
                    end={economiesFinancieres.fiveYearSavings}
                    suffix=" €"
                    duration={3}
                  />
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Impact écologique */}
        <FadeInSection delay={0.4} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Impact Écologique
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl mb-3">🌍</div>
                <Tooltip content="CO₂ économisé en prolongeant la vie des PC">
                  <p className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    <AnimatedCounter
                      end={impactEcologique.totalCO2Saved}
                      suffix=" kg"
                      duration={2}
                    />
                  </p>
                </Tooltip>
                <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ économisé</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl mb-3">♻️</div>
                <Tooltip content="Déchets électroniques évités grâce à Linux">
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter
                      end={impactEcologique.totalWasteSaved}
                      suffix=" kg"
                      duration={2}
                    />
                  </p>
                </Tooltip>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Déchets électroniques évités
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl mb-3">⏱️</div>
                <Tooltip content="Années supplémentaires d'utilisation avec Linux">
                  <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    +<AnimatedCounter end={impactEcologique.pcLifeExtension} duration={1.5} />{' '}
                    ans
                  </p>
                </Tooltip>
                <p className="text-sm text-gray-600 dark:text-gray-400">Durée de vie prolongée</p>
              </div>
            </div>

            {/* Eco Visualizations */}
            <EcoVisualization co2Saved={impactEcologique.totalCO2Saved} />
          </div>
        </FadeInSection>

        {/* Autonomie */}
        <FadeInSection delay={0.5} className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Autonomie Numérique
                </h2>
              </div>
              <div className="ml-auto">
                <CircularProgress percentage={100} size={150} color="#3b82f6" label="Autonomie" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: 'Contrôle des données',
                  value: autonomie.dataControl,
                  icon: '🔒',
                  tooltip: 'Vos données restent sur vos serveurs',
                },
                {
                  label: 'Pas de verrouillage fournisseur',
                  value: !autonomie.vendorLockIn,
                  icon: '🔓',
                  tooltip: 'Liberté de changer de solution à tout moment',
                },
                {
                  label: 'Personnalisation complète',
                  value: autonomie.customization,
                  icon: '🎨',
                  tooltip: 'Adaptez le système à vos besoins spécifiques',
                },
                {
                  label: 'Code source transparent',
                  value: autonomie.transparency,
                  icon: '👁️',
                  tooltip: 'Code open-source auditable par tous',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl cursor-default"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <Tooltip content={item.tooltip}>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                  </Tooltip>
                  {item.value && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                      className="ml-auto text-green-600 text-2xl"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Badges Gamification */}
        {questionnaireData && results && (
          <FadeInSection delay={0.6} className="mb-8">
            <Badges data={questionnaireData} results={results} />
          </FadeInSection>
        )}

        {/* Comparison Radar */}
        {questionnaireData && results && (
          <FadeInSection delay={0.65} className="mb-8">
            <ComparisonRadar data={questionnaireData} results={results} />
          </FadeInSection>
        )}

        {/* Roadmap with Progress */}
        <FadeInSection delay={0.7} className="mb-8">
          <RoadmapProgress roadmap={roadmap} />
        </FadeInSection>

        {/* PDF Export & Social Share */}
        {questionnaireData && results && (
          <>
            <FadeInSection delay={0.75} className="mb-8">
              <SocialShare data={questionnaireData} results={results} />
            </FadeInSection>

            <FadeInSection delay={0.8} className="text-center mb-8">
              <PDFExport data={questionnaireData} results={results} />
            </FadeInSection>
          </>
        )}

        {/* CTA */}
        <FadeInSection delay={0.85} className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Recommencer une évaluation
            </Link>
          </motion.div>
        </FadeInSection>
      </div>
    </div>
  );
}
