'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, Users, FileText, ExternalLink, PlayCircle, MessageCircle } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

interface Resource {
  title: string;
  description: string;
  icon: any;
  link: string;
  type: 'formation' | 'documentation' | 'communaute' | 'media';
}

const resources: Resource[] = [
  // Formations
  {
    title: 'Guide de démarrage Linux',
    description: 'Tutoriel complet pour débuter avec Linux en milieu scolaire',
    icon: BookOpen,
    link: 'https://doc.ubuntu-fr.org/debutant',
    type: 'formation',
  },
  {
    title: 'Formation LibreOffice',
    description: 'Maîtrisez la suite bureautique libre et gratuite',
    icon: FileText,
    link: 'https://fr.libreoffice.org/get-help/documentation/',
    type: 'formation',
  },
  {
    title: 'Linux pour l\'éducation',
    description: 'Ressources pédagogiques pour enseigner avec Linux',
    icon: BookOpen,
    link: 'https://www.education.gouv.fr/',
    type: 'formation',
  },

  // Documentation
  {
    title: 'Documentation NIRD',
    description: 'Guide complet de migration et d\'administration',
    icon: FileText,
    link: 'https://nird.forge.apps.education.fr/docs',
    type: 'documentation',
  },
  {
    title: 'FAQ Migration Linux',
    description: 'Réponses aux questions les plus fréquentes',
    icon: FileText,
    link: 'https://nird.forge.apps.education.fr/faq',
    type: 'documentation',
  },
  {
    title: 'Bonnes pratiques',
    description: 'Recommandations pour une migration réussie',
    icon: FileText,
    link: 'https://nird.forge.apps.education.fr/best-practices',
    type: 'documentation',
  },

  // Communauté
  {
    title: 'Discord NIRD',
    description: 'Rejoignez notre communauté d\'entraide',
    icon: MessageCircle,
    link: 'https://discord.gg/nird',
    type: 'communaute',
  },
  {
    title: 'Forum NIRD',
    description: 'Posez vos questions et partagez vos expériences',
    icon: Users,
    link: 'https://forum.nird.fr',
    type: 'communaute',
  },
  {
    title: 'Groupes régionaux',
    description: 'Rencontrez des établissements près de chez vous',
    icon: Users,
    link: 'https://nird.forge.apps.education.fr/groupes',
    type: 'communaute',
  },

  // Médias
  {
    title: 'Reportage France 3',
    description: 'Le lycée Carnot, pionnier de la migration Linux',
    icon: Video,
    link: 'https://www.youtube.com/watch?v=example1',
    type: 'media',
  },
  {
    title: 'Interview France Inter',
    description: 'NIRD : vers une école numérique souveraine',
    icon: PlayCircle,
    link: 'https://www.franceinter.fr/example',
    type: 'media',
  },
  {
    title: 'Webinaire : Retour d\'expérience',
    description: 'Témoignages d\'établissements ayant migré',
    icon: Video,
    link: 'https://www.youtube.com/watch?v=example2',
    type: 'media',
  },
];

const categories = [
  {
    id: 'formation',
    title: '📚 Formations',
    description: 'Tutoriels et guides pour apprendre Linux',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'documentation',
    title: '📖 Documentation',
    description: 'Guides techniques et méthodologiques',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'communaute',
    title: '👥 Communauté',
    description: 'Forums et groupes d\'entraide',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'media',
    title: '🎥 Médias',
    description: 'Vidéos, reportages et interviews',
    color: 'from-red-500 to-red-600',
  },
];

export default function RessourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Ressources NIRD 📚
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour réussir votre transition vers Linux
            </p>
          </div>
        </FadeInSection>

        {/* Categories */}
        {categories.map((category, catIndex) => {
          const categoryResources = resources.filter((r) => r.type === category.id);

          return (
            <FadeInSection key={category.id} delay={catIndex * 0.1} className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryResources.map((resource, index) => {
                  const Icon = resource.icon;

                  return (
                    <motion.a
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            {resource.title}
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </FadeInSection>
          );
        })}

        {/* CTA Section */}
        <FadeInSection delay={0.5}>
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Besoin d'accompagnement ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Notre équipe est là pour vous aider dans votre transition
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:contact@nird.fr"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Nous contacter
              </motion.a>
              <motion.a
                href="/questionnaire"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all"
              >
                Calculer votre impact
              </motion.a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
