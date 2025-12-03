'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  description?: string;
  children: ReactNode;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  description,
  children,
  currentQuestion,
  totalQuestions,
}: QuestionCardProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion} sur {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-600 to-green-600"
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {question}
          </h2>

          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {description}
            </p>
          )}

          <div className="space-y-4">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
