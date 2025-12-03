'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import type { QuestionnaireData } from '@/types';

const TOTAL_QUESTIONS = 5;

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({
    nbPCs: 0,
    hasOffice: false,
    hasWindows: false,
    pcAge: 0,
    currentMaintenanceCost: 0,
  });

  const updateAnswer = (key: keyof QuestionnaireData, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results page with answers
      const queryParams = new URLSearchParams({
        data: JSON.stringify(answers),
      });
      router.push(`/resultat?${queryParams.toString()}`);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.push('/');
    }
  };

  const isQuestionAnswered = () => {
    switch (currentQuestion) {
      case 1:
        return answers.nbPCs && answers.nbPCs > 0;
      case 2:
        return answers.hasWindows !== undefined;
      case 3:
        return answers.hasOffice !== undefined;
      case 4:
        return answers.pcAge !== undefined && answers.pcAge >= 0;
      case 5:
        return answers.currentMaintenanceCost !== undefined && answers.currentMaintenanceCost >= 0;
      default:
        return false;
    }
  };

  return (
    <div>
      {/* Question 1: Nombre de PCs */}
      {currentQuestion === 1 && (
        <QuestionCard
          question="Combien de PC avez-vous dans votre organisation ?"
          description="Cela nous permettra d'estimer les économies potentielles."
          currentQuestion={currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
        >
          <input
            type="number"
            min="1"
            value={answers.nbPCs || ''}
            onChange={(e) => updateAnswer('nbPCs', parseInt(e.target.value) || 0)}
            placeholder="Ex: 50"
            className="w-full px-6 py-4 text-2xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            💡 Comptez tous les postes de travail, serveurs exclus
          </p>
        </QuestionCard>
      )}

      {/* Question 2: Licences Windows */}
      {currentQuestion === 2 && (
        <QuestionCard
          question="Utilisez-vous actuellement Windows ?"
          description="Pour calculer les économies sur les licences."
          currentQuestion={currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateAnswer('hasWindows', true)}
              className={`p-6 rounded-xl border-2 transition-all ${
                answers.hasWindows === true
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <div className="text-4xl mb-2">✅</div>
              <div className="font-semibold text-gray-900 dark:text-white">Oui</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateAnswer('hasWindows', false)}
              className={`p-6 rounded-xl border-2 transition-all ${
                answers.hasWindows === false
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <div className="text-4xl mb-2">❌</div>
              <div className="font-semibold text-gray-900 dark:text-white">Non</div>
            </motion.button>
          </div>
        </QuestionCard>
      )}

      {/* Question 3: Microsoft Office */}
      {currentQuestion === 3 && (
        <QuestionCard
          question="Utilisez-vous Microsoft Office / Microsoft 365 ?"
          description="Pour estimer les économies sur les abonnements."
          currentQuestion={currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateAnswer('hasOffice', true)}
              className={`p-6 rounded-xl border-2 transition-all ${
                answers.hasOffice === true
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <div className="text-4xl mb-2">✅</div>
              <div className="font-semibold text-gray-900 dark:text-white">Oui</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateAnswer('hasOffice', false)}
              className={`p-6 rounded-xl border-2 transition-all ${
                answers.hasOffice === false
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <div className="text-4xl mb-2">❌</div>
              <div className="font-semibold text-gray-900 dark:text-white">Non</div>
            </motion.button>
          </div>
        </QuestionCard>
      )}

      {/* Question 4: Âge des PCs */}
      {currentQuestion === 4 && (
        <QuestionCard
          question="Quel est l'âge moyen de vos PC ?"
          description="Pour évaluer le potentiel de prolongation de leur durée de vie."
          currentQuestion={currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 2, label: '< 2 ans', emoji: '🆕' },
              { value: 3, label: '2-4 ans', emoji: '📅' },
              { value: 5, label: '4-6 ans', emoji: '⏰' },
              { value: 7, label: '> 6 ans', emoji: '⚠️' },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateAnswer('pcAge', option.value)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  answers.pcAge === option.value
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {option.label}
                </div>
              </motion.button>
            ))}
          </div>
        </QuestionCard>
      )}

      {/* Question 5: Coût de maintenance actuel */}
      {currentQuestion === 5 && (
        <QuestionCard
          question="Quel est votre coût de maintenance IT annuel ?"
          description="Estimation pour comparer avec les coûts Linux."
          currentQuestion={currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
        >
          <input
            type="number"
            min="0"
            step="100"
            value={answers.currentMaintenanceCost || ''}
            onChange={(e) =>
              updateAnswer('currentMaintenanceCost', parseInt(e.target.value) || 0)
            }
            placeholder="Ex: 5000"
            className="w-full px-6 py-4 text-2xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            💡 Montant en euros par an (support, mises à jour, etc.)
          </p>
        </QuestionCard>
      )}

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-2xl mx-auto flex justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={previousQuestion}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </motion.button>

          <motion.button
            whileHover={{ scale: isQuestionAnswered() ? 1.02 : 1 }}
            whileTap={{ scale: isQuestionAnswered() ? 0.98 : 1 }}
            onClick={nextQuestion}
            disabled={!isQuestionAnswered()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              isQuestionAnswered()
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === TOTAL_QUESTIONS ? 'Voir les résultats' : 'Suivant'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
