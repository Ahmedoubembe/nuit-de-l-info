'use client';

import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Heart, Award, TrendingUp } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

export default function AProposPage() {
  const stats = [
    { value: '20+', label: 'Établissements', icon: Users },
    { value: '15K+', label: 'Élèves', icon: TrendingUp },
    { value: '300K€', label: 'Économisés', icon: Award },
    { value: '50T', label: 'CO₂ évité', icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: 'Souveraineté Numérique',
      description: 'Reprendre le contrôle de nos données et de nos infrastructures informatiques.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Heart,
      title: 'Écologie',
      description: 'Prolonger la vie des équipements et réduire l\'empreinte carbone du numérique.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Garantir l\'accès au numérique pour tous avec des solutions libres et gratuites.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Encourager la créativité et l\'apprentissage avec des outils open-source.',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl mx-auto shadow-xl">
                N
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              À propos de NIRD
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Numérique Inclusif, Responsable et Durable
            </p>
          </div>
        </FadeInSection>

        {/* Mission Statement */}
        <FadeInSection delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Notre Mission 🎯
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              NIRD accompagne les établissements scolaires dans leur transition vers des solutions
              numériques libres, souveraines et écologiques. Nous croyons fermement que l'éducation
              doit s'appuyer sur des outils transparents, accessibles et respectueux de
              l'environnement.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              En migrant vers Linux et les logiciels libres, les écoles peuvent économiser des
              milliers d'euros, réduire leur empreinte carbone, et offrir à leurs élèves une
              véritable souveraineté numérique.
            </p>
          </div>
        </FadeInSection>

        {/* Stats */}
        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-6 text-white text-center shadow-xl"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </FadeInSection>

        {/* Values */}
        <FadeInSection delay={0.3}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Nos Valeurs 💎
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeInSection>

        {/* History */}
        <FadeInSection delay={0.4}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Notre Histoire 📖
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  2022
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Création du projet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    NIRD naît au Lycée Carnot à Bruay-la-Buissière avec une première migration
                    réussie de 50 postes vers Linux.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                  2023
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Expansion régionale
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    10 établissements rejoignent NIRD dans les Hauts-de-France, économisant plus de
                    100 000€ au total.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  2024
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Reconnaissance nationale
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    NIRD devient un modèle pour la transition numérique dans l'éducation, avec des
                    établissements dans toute la France.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                  2025
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Nuit de l'Info
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Participation à la Nuit de l'Info avec ce calculateur d'impact pour aider
                    encore plus d'établissements à franchir le pas !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Team */}
        <FadeInSection delay={0.5}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              L'Équipe 👥
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
              NIRD est porté par une communauté passionnée d'enseignants, d'administrateurs
              systèmes, de développeurs et d'élèves engagés pour un numérique plus responsable.
            </p>
            <div className="text-center">
              <a
                href="mailto:contact@nird.fr"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full hover:shadow-xl transition-all"
              >
                Rejoindre la communauté
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection delay={0.6}>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à calculer votre impact ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Découvrez combien votre établissement peut économiser en migrant vers Linux
            </p>
            <motion.a
              href="/questionnaire"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Démarrer le calculateur
            </motion.a>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
