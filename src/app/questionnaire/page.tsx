'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import type { QuestionnaireData } from '@/types';

const TOTAL_QUESTIONS = 5;

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [direction, setDirection] = useState(0);
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
      setDirection(1);
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
      setDirection(-1);
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="pb-24">
      <AnimatePresence mode="wait" custom={direction}>
        {/* Question 1: Nombre de PCs */}
        {currentQuestion === 1 && (
          <motion.div
            key="question-1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question="Combien de PC avez-vous dans votre organisation ?"
              description="Cela nous permettra d'estimer les économies potentielles."
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
            >
              <input
                type="number"
                min="1"
                autoFocus
                value={answers.nbPCs || ''}
                onChange={(e) => updateAnswer('nbPCs', parseInt(e.target.value) || 0)}
                placeholder="Ex: 50"
                className="w-full px-4 md:px-6 py-3 md:py-4 text-xl md:text-2xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                💡 Comptez tous les postes de travail, serveurs exclus
              </p>
            </QuestionCard>
          </motion.div>
        )}

        {/* Question 2: Licences Windows */}
        {currentQuestion === 2 && (
          <motion.div
            key="question-2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question="Utilisez-vous actuellement Windows ?"
              description="Pour calculer les économies sur les licences."
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateAnswer('hasWindows', true)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                    answers.hasWindows === true
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-3xl md:text-4xl mb-2">✅</div>
                  <div className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                    Oui
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateAnswer('hasWindows', false)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                    answers.hasWindows === false
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-3xl md:text-4xl mb-2">❌</div>
                  <div className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                    Non
                  </div>
                </motion.button>
              </div>
            </QuestionCard>
          </motion.div>
        )}

        {/* Question 3: Microsoft Office */}
        {currentQuestion === 3 && (
          <motion.div
            key="question-3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question="Utilisez-vous Microsoft Office / Microsoft 365 ?"
              description="Pour estimer les économies sur les abonnements."
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateAnswer('hasOffice', true)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                    answers.hasOffice === true
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-3xl md:text-4xl mb-2">✅</div>
                  <div className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                    Oui
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateAnswer('hasOffice', false)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                    answers.hasOffice === false
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-3xl md:text-4xl mb-2">❌</div>
                  <div className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                    Non
                  </div>
                </motion.button>
              </div>
            </QuestionCard>
          </motion.div>
        )}

        {/* Question 4: Âge des PCs */}
        {currentQuestion === 4 && (
          <motion.div
            key="question-4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question="Quel est l'âge moyen de vos PC ?"
              description="Pour évaluer le potentiel de prolongation de leur durée de vie."
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { value: 2, label: '< 2 ans', emoji: '🆕' },
                  { value: 3, label: '2-4 ans', emoji: '📅' },
                  { value: 5, label: '4-6 ans', emoji: '⏰' },
                  { value: 7, label: '> 6 ans', emoji: '⚠️' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateAnswer('pcAge', option.value)}
                    className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                      answers.pcAge === option.value
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="text-2xl md:text-3xl mb-2">{option.emoji}</div>
                    <div className="font-semibold text-xs md:text-sm text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </QuestionCard>
          </motion.div>
        )}

        {/* Question 5: Coût de maintenance actuel */}
        {currentQuestion === 5 && (
          <motion.div
            key="question-5"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
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
                className="w-full px-4 md:px-6 py-3 md:py-4 text-xl md:text-2xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                💡 Montant en euros par an (support, mises à jour, etc.)
              </p>
            </QuestionCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-3 md:p-4 shadow-lg"
      >
        <div className="max-w-2xl mx-auto flex justify-between gap-3 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={previousQuestion}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full font-semibold text-sm md:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Retour</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: isQuestionAnswered() ? 1.05 : 1, x: isQuestionAnswered() ? 4 : 0 }}
            whileTap={{ scale: isQuestionAnswered() ? 0.95 : 1 }}
            onClick={nextQuestion}
            disabled={!isQuestionAnswered()}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all ${
              isQuestionAnswered()
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestion === TOTAL_QUESTIONS ? 'Voir les résultats' : 'Suivant'}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
