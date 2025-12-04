'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Users, Lightbulb, SkipForward, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Que signifie l'acronyme NIRD ?",
    answers: ["Nouveaux Internautes Résistants Digitaux", "Numérisation Informatique Radicalement Décentralisée", "Network Infrastructure for Remote Development", "Aucune réponse correcte"],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: "NIRD est un acronyme créé pour ce projet, inspiré du Village Numérique Irréductible résistant à Big Tech !",
  },
  {
    id: 2,
    question: "Quel est le créateur de Linux ?",
    answers: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Richard Stallman"],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "Linus Torvalds a créé le noyau Linux en 1991 alors qu'il était étudiant à l'université d'Helsinki.",
  },
  {
    id: 3,
    question: "Quelle est la mascotte officielle de Linux ?",
    answers: ["Un renard", "Un pingouin", "Un éléphant", "Un lion"],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Tux le pingouin est la mascotte officielle de Linux depuis 1996.",
  },
  {
    id: 4,
    question: "Qu'est-ce qu'un logiciel libre ?",
    answers: [
      "Un logiciel gratuit",
      "Un logiciel dont le code source est accessible et modifiable",
      "Un logiciel sans copyright",
      "Un logiciel qui ne bug jamais"
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Un logiciel libre garantit 4 libertés : utiliser, étudier, modifier et redistribuer le logiciel.",
  },
  {
    id: 5,
    question: "Quelle distribution Linux est connue pour être la plus populaire ?",
    answers: ["Arch Linux", "Ubuntu", "Gentoo", "Slackware"],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Ubuntu est l'une des distributions Linux les plus populaires, connue pour sa facilité d'utilisation.",
  },
  {
    id: 6,
    question: "Quel logiciel libre permet de retoucher des images ?",
    answers: ["GIMP", "Photoshop", "Paint", "Illustrator"],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: "GIMP (GNU Image Manipulation Program) est l'alternative libre à Photoshop.",
  },
  {
    id: 7,
    question: "Quelle licence est la plus utilisée pour les logiciels libres ?",
    answers: ["MIT", "Apache", "GPL", "BSD"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "La licence GPL (General Public License) est la plus utilisée, créée par Richard Stallman.",
  },
  {
    id: 8,
    question: "Qu'est-ce que LibreOffice ?",
    answers: [
      "Un système d'exploitation",
      "Une suite bureautique libre",
      "Un navigateur web",
      "Un logiciel de montage vidéo"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "LibreOffice est une suite bureautique libre, alternative à Microsoft Office.",
  },
  {
    id: 9,
    question: "Quel est le gestionnaire de paquets d'Ubuntu ?",
    answers: ["yum", "pacman", "apt", "dnf"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "APT (Advanced Package Tool) est le gestionnaire de paquets utilisé par Ubuntu et Debian.",
  },
  {
    id: 10,
    question: "Quelle entreprise développe Firefox ?",
    answers: ["Google", "Microsoft", "Mozilla", "Apple"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "Firefox est développé par Mozilla, une organisation à but non lucratif.",
  },
  {
    id: 11,
    question: "Qu'est-ce que le noyau Linux ?",
    answers: [
      "L'interface graphique",
      "Le cœur du système d'exploitation",
      "Un logiciel de navigation",
      "Un antivirus"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "Le noyau est le cœur du système d'exploitation, gérant les ressources matérielles.",
  },
  {
    id: 12,
    question: "Quel logiciel libre permet de créer des animations 3D ?",
    answers: ["Maya", "3ds Max", "Blender", "Cinema 4D"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "Blender est un logiciel libre de modélisation et d'animation 3D très puissant.",
  },
  {
    id: 13,
    question: "Que signifie GNU dans GNU/Linux ?",
    answers: [
      "Great New Unix",
      "GNU's Not Unix",
      "General Network Utility",
      "Global Network Union"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "GNU est un acronyme récursif qui signifie 'GNU's Not Unix', projet lancé par Richard Stallman.",
  },
  {
    id: 14,
    question: "Quelle année a été créé le projet GNU ?",
    answers: ["1969", "1983", "1991", "2000"],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Le projet GNU a été lancé en 1983 par Richard Stallman pour créer un système d'exploitation libre.",
  },
  {
    id: 15,
    question: "Quel est le serveur web open source le plus utilisé ?",
    answers: ["IIS", "Apache", "Tomcat", "nginx"],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Apache HTTP Server est historiquement le serveur web le plus utilisé (bien que nginx gagne du terrain).",
  },
  {
    id: 16,
    question: "Qu'est-ce que le copyleft ?",
    answers: [
      "Le contraire du copyright",
      "Une licence qui oblige à partager les modifications",
      "Un mouvement politique",
      "Une marque déposée"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Le copyleft est un principe qui oblige à partager les œuvres dérivées sous la même licence libre.",
  },
  {
    id: 17,
    question: "Quel environnement de bureau est utilisé par défaut sur Ubuntu ?",
    answers: ["KDE", "XFCE", "GNOME", "MATE"],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: "Ubuntu utilise GNOME comme environnement de bureau par défaut depuis la version 17.10.",
  },
  {
    id: 18,
    question: "Qu'est-ce que Git ?",
    answers: [
      "Un langage de programmation",
      "Un système de gestion de versions",
      "Un système d'exploitation",
      "Un éditeur de texte"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Git est un système de gestion de versions distribué, créé par Linus Torvalds.",
  },
  {
    id: 19,
    question: "Quelle commande Linux permet de lister les fichiers ?",
    answers: ["dir", "list", "ls", "show"],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "La commande 'ls' (list) permet de lister les fichiers et dossiers sous Linux.",
  },
  {
    id: 20,
    question: "Quel est le principe des 4 libertés du logiciel libre ?",
    answers: [
      "Utiliser, copier, vendre, modifier",
      "Utiliser, étudier, modifier, redistribuer",
      "Télécharger, installer, utiliser, désinstaller",
      "Acheter, utiliser, revendre, échanger"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Les 4 libertés : liberté d'utiliser, d'étudier, de modifier et de redistribuer le logiciel.",
  },
];

type Joker = 'fifty' | 'audience' | 'skip';

export default function ExpertQuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [usedJokers, setUsedJokers] = useState<Joker[]>([]);
  const [eliminatedAnswers, setEliminatedAnswers] = useState<number[]>([]);
  const [audienceVotes, setAudienceVotes] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameFinished(false);
    setUsedJokers([]);
    setEliminatedAnswers([]);
    setAudienceVotes([]);
    setWrongAnswers(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showExplanation) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setEliminatedAnswers([]);
      setAudienceVotes([]);
    } else {
      setGameFinished(true);
    }
  };

  const useFiftyFifty = () => {
    if (usedJokers.includes('fifty') || selectedAnswer !== null) return;

    const wrongAnswers = currentQuestion.answers
      .map((_, index) => index)
      .filter(index => index !== currentQuestion.correctAnswer);

    const toEliminate = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminatedAnswers(toEliminate);
    setUsedJokers(prev => [...prev, 'fifty']);
  };

  const useAudience = () => {
    if (usedJokers.includes('audience') || selectedAnswer !== null) return;

    // Simulate audience votes with a bias towards the correct answer
    const votes = currentQuestion.answers.map((_, index) => {
      if (index === currentQuestion.correctAnswer) {
        return Math.floor(Math.random() * 30) + 40; // 40-70%
      }
      return Math.floor(Math.random() * 20); // 0-20%
    });

    // Normalize to 100%
    const total = votes.reduce((a, b) => a + b, 0);
    const normalized = votes.map(v => Math.round((v / total) * 100));

    setAudienceVotes(normalized);
    setUsedJokers(prev => [...prev, 'audience']);
  };

  const useSkip = () => {
    if (usedJokers.includes('skip') || selectedAnswer !== null) return;

    setUsedJokers(prev => [...prev, 'skip']);
    nextQuestion();
  };

  const getScorePercentage = () => {
    return Math.round((score / totalQuestions) * 100);
  };

  const getCertificateLevel = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { title: 'Expert NIRD - Niveau Maître', emoji: '🏆', color: 'from-yellow-400 to-yellow-600' };
    if (percentage >= 75) return { title: 'Expert NIRD - Niveau Avancé', emoji: '🥇', color: 'from-blue-400 to-blue-600' };
    if (percentage >= 60) return { title: 'Expert NIRD - Niveau Confirmé', emoji: '🥈', color: 'from-gray-400 to-gray-600' };
    return { title: 'Expert NIRD - Niveau Débutant', emoji: '🥉', color: 'from-orange-400 to-orange-600' };
  };

  if (gameFinished) {
    const certificate = getCertificateLevel();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
          {/* Score Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <div className="text-8xl mb-4">{certificate.emoji}</div>
            </motion.div>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Quiz terminé !
            </h2>
            <div className="text-6xl font-black text-purple-600 dark:text-purple-400 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Score : {getScorePercentage()}%
            </div>

            {/* Certificate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`bg-gradient-to-r ${certificate.color} text-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto mb-8 border-4 border-white dark:border-gray-700`}
            >
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">Certificat d&apos;Excellence</h3>
              <div className="text-xl font-bold mb-4">{certificate.title}</div>
              <p className="text-sm opacity-90">
                Ce certificat atteste que vous avez démontré vos connaissances sur le logiciel libre, Linux et les technologies ouvertes.
              </p>
              <div className="mt-4 text-xs opacity-75">
                Délivré le {new Date().toLocaleDateString('fr-FR')}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-700">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {score}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Bonnes réponses
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-200 dark:border-red-700">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {wrongAnswers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Erreurs
                </div>
              </div>
            </div>

            {score >= 18 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8 border-2 border-yellow-300 dark:border-yellow-700"
              >
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
                  Score Parfait ! Vous êtes un véritable expert !
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Vous maîtrisez parfaitement le monde du logiciel libre et de Linux. Bravo !
                </p>
              </motion.div>
            )}
          </div>

          {/* Retry Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="w-6 h-6" />
              Recommencer le quiz
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Score : {score}/{totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700 mb-6"
        >
          {/* Difficulty Badge */}
          <div className="flex items-center justify-between mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                currentQuestion.difficulty === 'easy'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : currentQuestion.difficulty === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}
            >
              {currentQuestion.difficulty === 'easy' && '😊 Facile'}
              {currentQuestion.difficulty === 'medium' && '🤔 Moyen'}
              {currentQuestion.difficulty === 'hard' && '😰 Difficile'}
            </span>

            {/* Jokers */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: usedJokers.includes('fifty') ? 1 : 1.1 }}
                whileTap={{ scale: usedJokers.includes('fifty') ? 1 : 0.9 }}
                onClick={useFiftyFifty}
                disabled={usedJokers.includes('fifty') || selectedAnswer !== null}
                className={`p-2 rounded-lg transition-all ${
                  usedJokers.includes('fifty')
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                title="50/50"
              >
                <Lightbulb className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: usedJokers.includes('audience') ? 1 : 1.1 }}
                whileTap={{ scale: usedJokers.includes('audience') ? 1 : 0.9 }}
                onClick={useAudience}
                disabled={usedJokers.includes('audience') || selectedAnswer !== null}
                className={`p-2 rounded-lg transition-all ${
                  usedJokers.includes('audience')
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                title="Demander au public"
              >
                <Users className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: usedJokers.includes('skip') ? 1 : 1.1 }}
                whileTap={{ scale: usedJokers.includes('skip') ? 1 : 0.9 }}
                onClick={useSkip}
                disabled={usedJokers.includes('skip') || selectedAnswer !== null}
                className={`p-2 rounded-lg transition-all ${
                  usedJokers.includes('skip')
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                title="Passer"
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Question */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {currentQuestion.question}
          </h3>

          {/* Audience Votes */}
          {audienceVotes.length > 0 && !showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700"
            >
              <div className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">
                📊 Réponses du public :
              </div>
              <div className="grid grid-cols-4 gap-2">
                {audienceVotes.map((vote, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {vote}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Answers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer, index) => {
              const isEliminated = eliminatedAnswers.includes(index);
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              if (isEliminated) {
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gray-100 dark:bg-gray-700 opacity-30 border-2 border-gray-300 dark:border-gray-600"
                  >
                    <div className="font-semibold text-gray-400 line-through">
                      {String.fromCharCode(65 + index)}. {answer}
                    </div>
                  </div>
                );
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl text-left transition-all border-2 ${
                    showResult && isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600'
                      : showResult && isSelected && !isCorrect
                      ? 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600'
                      : isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-600'
                  } ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                    <span>
                      {String.fromCharCode(65 + index)}. {answer}
                    </span>
                    {showResult && isCorrect && <span className="text-2xl">✅</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-2xl">❌</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-6 p-4 rounded-xl border-2 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={nextQuestion}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'Question suivante →' : 'Voir les résultats 🏆'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
