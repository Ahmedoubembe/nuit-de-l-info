'use client';

import { motion } from 'framer-motion';
import type { QuestionnaireData } from '@/types';

interface EasterEggProps {
  data: QuestionnaireData;
  savings: number;
  co2Saved: number;
}

export default function EasterEgg({ data, savings, co2Saved }: EasterEggProps) {
  const messages: { condition: boolean; message: string; emoji: string; color: string }[] = [
    {
      condition: data.nbPCs < 10,
      message: "Petit village gaulois mais grande résistance !",
      emoji: "💪",
      color: "from-purple-500 to-pink-500",
    },
    {
      condition: savings > 20000,
      message: "WOW ! Avec ces économies, vous pourriez embaucher un prof de plus !",
      emoji: "🎓",
      color: "from-yellow-500 to-orange-500",
    },
    {
      condition: co2Saved > 5000,
      message: "Vous êtes des héros écologiques !",
      emoji: "🦸‍♂️",
      color: "from-green-500 to-emerald-500",
    },
    {
      condition: data.pcAge >= 7 && data.hasWindows,
      message: "Vos PC sont des guerriers ! Donnez-leur une seconde vie avec Linux",
      emoji: "🛡️",
      color: "from-blue-500 to-indigo-500",
    },
    {
      condition: data.nbPCs > 100,
      message: "Grosse infrastructure = grosses économies ! Vous avez tout à gagner !",
      emoji: "🏢",
      color: "from-cyan-500 to-blue-500",
    },
    {
      condition: data.hasOffice && data.hasWindows,
      message: "Double verrouillage Microsoft détecté ! Il est temps de vous libérer !",
      emoji: "🔓",
      color: "from-red-500 to-pink-500",
    },
  ];

  const activeMessages = messages.filter((m) => m.condition);

  if (activeMessages.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeMessages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 1 + index * 0.3,
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
          }}
          className={`bg-gradient-to-r ${msg.color} text-white rounded-2xl p-6 shadow-xl`}
        >
          <div className="flex items-center gap-4">
            <span className="text-5xl">{msg.emoji}</span>
            <p className="text-xl md:text-2xl font-bold flex-1">{msg.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
