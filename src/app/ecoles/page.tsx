'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Users, Calendar } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

interface School {
  id: number;
  name: string;
  city: string;
  region: string;
  type: string;
  joinDate: string;
  students: number;
  testimony: string;
  position: { top: string; left: string };
}

const schools: School[] = [
  {
    id: 1,
    name: 'Lycée Carnot',
    city: 'Bruay-la-Buissière',
    region: 'Hauts-de-France',
    type: 'Lycée',
    joinDate: '2023',
    students: 1200,
    testimony: "La migration vers Linux nous a permis d'économiser 15 000€/an tout en prolongeant la vie de nos équipements de 3 ans. Nos élèves sont ravis !",
    position: { top: '15%', left: '50%' },
  },
  {
    id: 2,
    name: 'Collège Victor Hugo',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    type: 'Collège',
    joinDate: '2024',
    students: 800,
    testimony: "NIRD nous a accompagné dans cette transition en douceur. Les enseignants et les élèves se sont rapidement adaptés.",
    position: { top: '45%', left: '57%' },
  },
  {
    id: 3,
    name: 'École Primaire Les Tilleuls',
    city: 'Nantes',
    region: 'Pays de la Loire',
    type: 'École Primaire',
    joinDate: '2024',
    students: 350,
    testimony: "Nos vieux ordinateurs ont retrouvé une seconde vie avec Linux. C'est un exemple concret d'écologie pour nos élèves !",
    position: { top: '38%', left: '30%' },
  },
  {
    id: 4,
    name: 'Lycée Technique Diderot',
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    type: 'Lycée Professionnel',
    joinDate: '2023',
    students: 950,
    testimony: "Linux offre une excellente plateforme pour nos formations en informatique. Les étudiants apprécient la liberté et la transparence.",
    position: { top: '70%', left: '63%' },
  },
  {
    id: 5,
    name: 'Collège Jean Moulin',
    city: 'Toulouse',
    region: 'Occitanie',
    type: 'Collège',
    joinDate: '2024',
    students: 600,
    testimony: "La migration s'est faite progressivement. Aujourd'hui, 100% de nos postes sont sous Linux et tout fonctionne parfaitement !",
    position: { top: '60%', left: '43%' },
  },
];

export default function EcolesPage() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Écoles NIRD 🎓
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez les établissements qui ont rejoint la transition numérique responsable
            </p>
          </div>
        </FadeInSection>

        {/* Map Section */}
        <FadeInSection delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Carte des établissements
            </h2>

            {/* Simple SVG Map of France with markers */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl overflow-hidden">
              {/* France outline (simplified) */}
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M200 50 L280 100 L320 180 L310 280 L280 350 L220 420 L160 450 L100 420 L70 350 L60 280 L80 200 L120 120 L180 70 Z"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="rgba(59, 130, 246, 0.1)"
                />
              </svg>

              {/* School Markers */}
              {schools.map((school) => (
                <motion.button
                  key={school.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ delay: school.id * 0.1 }}
                  onClick={() => setSelectedSchool(school)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ top: school.position.top, left: school.position.left }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg group-hover:ring-4 group-hover:ring-blue-300 transition-all" />
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {school.name}
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Selected School Popup */}
              {selectedSchool && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-md"
                >
                  <button
                    onClick={() => setSelectedSchool(null)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {selectedSchool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {selectedSchool.city} • {selectedSchool.region}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    "{selectedSchool.testimony}"
                  </p>
                </motion.div>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              💡 Cliquez sur les points bleus pour voir les témoignages
            </p>
          </div>
        </FadeInSection>

        {/* Schools List */}
        <FadeInSection delay={0.3}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Liste des établissements
            </h2>

            {schools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {school.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {school.city}, {school.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {school.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {school.students} élèves
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Depuis {school.joinDate}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{school.testimony}"
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {school.id}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection delay={0.4}>
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Votre établissement souhaite rejoindre NIRD ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Calculez votre impact et découvrez les économies potentielles
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
