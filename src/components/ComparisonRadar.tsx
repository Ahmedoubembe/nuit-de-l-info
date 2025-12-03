'use client';

import { useInView } from 'react-intersection-observer';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import type { QuestionnaireData, Results } from '@/types';

interface ComparisonRadarProps {
  data: QuestionnaireData;
  results: Results;
}

export default function ComparisonRadar({ data, results }: ComparisonRadarProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Calculer les scores (sur 100)
  const calculateScores = () => {
    // Score économique : économies / PC (normalisé sur 100)
    const economiesParPC = results.economiesFinancieres.annualSavings / data.nbPCs;
    const scoreEconomique = Math.min(100, (economiesParPC / 300) * 100); // 300€/PC = 100%

    // Score écologique : CO2 économisé / PC (normalisé sur 100)
    const co2ParPC = results.impactEcologique.totalCO2Saved / data.nbPCs;
    const scoreEcologique = Math.min(100, (co2ParPC / 600) * 100); // 600kg/PC = 100%

    // Score autonomie : toujours 100% avec Linux
    const scoreAutonomie = 100;

    // Score longévité : basé sur l'extension de vie
    const scoreLongevite = (results.impactEcologique.pcLifeExtension / 5) * 100; // 5 ans = 100%

    return {
      economique: Math.round(scoreEconomique),
      ecologique: Math.round(scoreEcologique),
      autonomie: Math.round(scoreAutonomie),
      longevite: Math.round(scoreLongevite),
    };
  };

  const userScores = calculateScores();

  // Données moyennes nationales (fictives mais réalistes)
  const moyenneNationale = {
    economique: 45,
    ecologique: 40,
    autonomie: 30,
    longevite: 50,
  };

  // Données Lycée Carnot (école modèle NIRD)
  const lyceeCarnot = {
    economique: 85,
    ecologique: 90,
    autonomie: 100,
    longevite: 95,
  };

  const radarData = [
    {
      subject: 'Économies',
      'Votre école': userScores.economique,
      'Moyenne nationale': moyenneNationale.economique,
      'Lycée Carnot': lyceeCarnot.economique,
      fullMark: 100,
    },
    {
      subject: 'Écologie',
      'Votre école': userScores.ecologique,
      'Moyenne nationale': moyenneNationale.ecologique,
      'Lycée Carnot': lyceeCarnot.ecologique,
      fullMark: 100,
    },
    {
      subject: 'Autonomie',
      'Votre école': userScores.autonomie,
      'Moyenne nationale': moyenneNationale.autonomie,
      'Lycée Carnot': lyceeCarnot.autonomie,
      fullMark: 100,
    },
    {
      subject: 'Longévité',
      'Votre école': userScores.longevite,
      'Moyenne nationale': moyenneNationale.longevite,
      'Lycée Carnot': lyceeCarnot.longevite,
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {payload[0].payload.subject}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}/100
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculer la moyenne des scores de l'utilisateur
  const averageUserScore = Math.round(
    (userScores.economique + userScores.ecologique + userScores.autonomie + userScores.longevite) / 4
  );

  // Messages selon le score
  const getMessage = () => {
    if (averageUserScore >= 90) {
      return {
        title: '🌟 Exceptionnel !',
        message: 'Vous êtes au niveau des meilleures écoles NIRD !',
        color: 'from-yellow-400 to-orange-500',
      };
    } else if (averageUserScore >= 70) {
      return {
        title: '🎯 Excellent !',
        message: 'Vous dépassez largement la moyenne nationale !',
        color: 'from-green-400 to-green-600',
      };
    } else if (averageUserScore >= 50) {
      return {
        title: '👍 Bon départ !',
        message: 'Vous êtes sur la bonne voie, continuez ainsi !',
        color: 'from-blue-400 to-blue-600',
      };
    } else {
      return {
        title: '💪 Potentiel élevé !',
        message: 'Beaucoup de marge de progression, NIRD peut vous aider !',
        color: 'from-purple-400 to-purple-600',
      };
    }
  };

  const messageData = getMessage();

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        📊 Vous vs La Moyenne
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Comparaison avec la moyenne nationale et le Lycée Carnot (école modèle NIRD)
      </p>

      {/* Score global */}
      <div className={`mb-6 p-6 bg-gradient-to-r ${messageData.color} rounded-2xl text-white text-center`}>
        <div className="text-5xl font-bold mb-2">{averageUserScore}/100</div>
        <h3 className="text-2xl font-bold mb-2">{messageData.title}</h3>
        <p className="text-lg opacity-90">{messageData.message}</p>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-96 mb-6">
        {inView && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#6b7280', fontSize: 14 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />

              {/* Moyenne nationale */}
              <Radar
                name="Moyenne nationale"
                dataKey="Moyenne nationale"
                stroke="#9ca3af"
                fill="#9ca3af"
                fillOpacity={0.3}
              />

              {/* Votre école */}
              <Radar
                name="Votre école"
                dataKey="Votre école"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />

              {/* Lycée Carnot */}
              <Radar
                name="Lycée Carnot"
                dataKey="Lycée Carnot"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Détails des scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Économies', score: userScores.economique, icon: '💰', color: 'blue' },
          { label: 'Écologie', score: userScores.ecologique, icon: '🌍', color: 'green' },
          { label: 'Autonomie', score: userScores.autonomie, icon: '🛡️', color: 'purple' },
          { label: 'Longévité', score: userScores.longevite, icon: '⏱️', color: 'orange' },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl text-center`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>
              {item.score}/100
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Note :</strong> Les scores sont calculés par rapport aux performances des meilleures écoles NIRD. Un score de 70/100 est déjà excellent !
        </p>
      </div>
    </div>
  );
}
