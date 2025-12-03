'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import IntroScene from '@/components/IntroScene';
import CharacterDialogue, { characters } from '@/components/CharacterDialogue';
import { ArrowRight, Sparkles } from 'lucide-react';
import Confetti from '@/components/Confetti';
import { useSound } from '@/hooks/useSound';

type QuestionnaireData = {
  nbPCs: number;
  windowsLicenses: number;
  officeLicenses: number;
  pcAge: number;
  maintenanceCost: number;
};

export default function StoryMode() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [showEpilogue, setShowEpilogue] = useState(false);

  const [data, setData] = useState<QuestionnaireData>({
    nbPCs: 0,
    windowsLicenses: 0,
    officeLicenses: 0,
    pcAge: 0,
    maintenanceCost: 0,
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleSceneComplete = (sceneData: Partial<QuestionnaireData>) => {
    setData({ ...data, ...sceneData });

    if (currentScene < 4) {
      setCurrentScene(currentScene + 1);
    } else {
      setShowEpilogue(true);
    }
  };

  const handleEpilogueComplete = () => {
    // Convertir les données au format attendu par la page résultat
    const questionnaireData = {
      nbPCs: data.nbPCs,
      hasWindows: data.windowsLicenses > 0,
      hasOffice: data.officeLicenses > 0,
      pcAge: data.pcAge,
      currentMaintenanceCost: data.maintenanceCost,
    };

    // Navigate to results with data in JSON format
    const params = new URLSearchParams({
      data: JSON.stringify(questionnaireData),
    });
    router.push(`/resultat?${params.toString()}`);
  };

  if (showIntro) {
    return <IntroScene onComplete={handleIntroComplete} />;
  }

  if (showEpilogue) {
    return <EpilogueScene onComplete={handleEpilogueComplete} data={data} />;
  }

  const scenes = [
    <Scene1 key="scene1" onComplete={handleSceneComplete} />,
    <Scene2 key="scene2" onComplete={handleSceneComplete} />,
    <Scene3 key="scene3" onComplete={handleSceneComplete} />,
    <Scene4 key="scene4" onComplete={handleSceneComplete} />,
    <Scene5 key="scene5" onComplete={handleSceneComplete} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Scène {currentScene + 1} / 5
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(((currentScene + 1) / 5) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentScene + 1) / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-600 to-green-600"
            />
          </div>
        </div>

        {/* Scene content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {scenes[currentScene]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Scene 1: La salle informatique (Nombre de PC)
function Scene1({ onComplete }: { onComplete: (data: Partial<QuestionnaireData>) => void }) {
  const [nbPCs, setNbPCs] = useState(50);
  const [showComputers, setShowComputers] = useState(false);

  const handleSubmit = () => {
    onComplete({ nbPCs });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Scene header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🏫</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SCÈNE 1 : La salle informatique
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          8h30 - Vous entrez dans la salle info avec le proviseur
        </p>
      </motion.div>

      {/* Dialogues */}
      <div className="space-y-6 mb-8">
        <CharacterDialogue
          character={characters.proviseur}
          dialogue="Voici notre salle informatique. Tous ces ordinateurs tournent sous Windows..."
          position="left"
        />

        <CharacterDialogue
          character={characters.proviseur}
          dialogue="Avec l'augmentation des prix de Microsoft, je ne sais plus comment on va payer tout ça !"
          position="left"
        />

        <CharacterDialogue
          character={characters.narrator}
          dialogue="💭 Le proviseur vous regarde avec un air inquiet..."
          position="center"
        />
      </div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎯 Combien d'ordinateurs voyez-vous dans la salle ?
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Nombre d'ordinateurs
            </span>
            <motion.span
              key={nbPCs}
              initial={{ scale: 1.5, color: '#3b82f6' }}
              animate={{ scale: 1, color: '#1f2937' }}
              className="text-4xl font-bold text-blue-600"
            >
              {nbPCs}
            </motion.span>
          </div>

          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={nbPCs}
            onChange={(e) => {
              setNbPCs(Number(e.target.value));
              setShowComputers(true);
            }}
            className="w-full h-3 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>10</span>
            <span>500</span>
          </div>
        </div>

        {/* Visual animation of computers */}
        {showComputers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-xl"
          >
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: Math.min(nbPCs, 100) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.01, duration: 0.3 }}
                  className="text-2xl"
                >
                  💻
                </motion.div>
              ))}
              {nbPCs > 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-10 text-center text-gray-600 dark:text-gray-400 mt-4"
                >
                  ... et {nbPCs - 100} ordinateurs de plus !
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Continuer l'histoire
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Scene 2: L'écran bleu (Licences Windows)
function Scene2({ onComplete }: { onComplete: (data: Partial<QuestionnaireData>) => void }) {
  const [windowsLicenses, setWindowsLicenses] = useState(50);

  const handleSubmit = () => {
    onComplete({ windowsLicenses });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">💻</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SCÈNE 2 : L'écran bleu de la mort
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          9h00 - La moitié des ordinateurs sont en panne
        </p>
      </motion.div>

      <div className="space-y-6 mb-8">
        <CharacterDialogue
          character={characters.eleveGeek}
          dialogue="Monsieur, encore un écran bleu ! Windows a planté sur 10 machines ce matin..."
          position="right"
        />

        <CharacterDialogue
          character={characters.proviseur}
          dialogue="Ces licences Windows nous coûtent une fortune ! Et elles plantent tout le temps..."
          position="left"
        />

        <CharacterDialogue
          character={characters.profTechno}
          dialogue="Vous savez, il existe des alternatives gratuites et plus stables..."
          position="right"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎯 Combien de licences Windows avez-vous ?
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Licences Windows
            </span>
            <motion.span
              key={windowsLicenses}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-blue-600"
            >
              {windowsLicenses}
            </motion.span>
          </div>

          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={windowsLicenses}
            onChange={(e) => setWindowsLicenses(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>0</span>
            <span>500</span>
          </div>
        </div>

        <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">💸</div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Coût annuel Windows</div>
              <div className="text-2xl font-bold text-red-600">
                {(windowsLicenses * 150).toLocaleString('fr-FR')} €
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            À 150€ par licence Windows... ça commence à chiffrer !
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Continuer l'histoire
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Scene 3: La facture Microsoft (Licences Office)
function Scene3({ onComplete }: { onComplete: (data: Partial<QuestionnaireData>) => void }) {
  const [officeLicenses, setOfficeLicenses] = useState(50);

  const handleSubmit = () => {
    onComplete({ officeLicenses });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SCÈNE 3 : La facture qui fait mal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          10h00 - Bureau du comptable
        </p>
      </motion.div>

      <div className="space-y-6 mb-8">
        <CharacterDialogue
          character={characters.comptable}
          dialogue="J'ai reçu la nouvelle facture Microsoft Office... Asseyez-vous avant de lire."
          position="left"
        />

        <CharacterDialogue
          character={characters.proviseur}
          dialogue="Quoi ?! Ils ont DOUBLÉ les prix ! C'est de la folie !"
          position="right"
        />

        <CharacterDialogue
          character={characters.comptable}
          dialogue="On ne peut plus continuer comme ça. Il faut trouver une solution rapidement."
          position="left"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎯 Combien de licences Office utilisez-vous ?
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Licences Office
            </span>
            <motion.span
              key={officeLicenses}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-orange-600"
            >
              {officeLicenses}
            </motion.span>
          </div>

          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={officeLicenses}
            onChange={(e) => setOfficeLicenses(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>0</span>
            <span>500</span>
          </div>
        </div>

        <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border-2 border-red-300 dark:border-red-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🔥</div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Coût annuel Office</div>
              <div className="text-3xl font-bold text-red-600">
                {(officeLicenses * 100).toLocaleString('fr-FR')} €/an
              </div>
            </div>
          </div>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            ⚠️ Et avec la hausse des prix, ça va encore augmenter !
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Continuer l'histoire
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Scene 4: Les vieux ordinateurs (Âge des PC)
function Scene4({ onComplete }: { onComplete: (data: Partial<QuestionnaireData>) => void }) {
  const [pcAge, setPcAge] = useState(3);

  const handleSubmit = () => {
    onComplete({ pcAge });
  };

  const getAgeMessage = () => {
    if (pcAge <= 2) return { icon: '✨', text: 'Tout neufs !', color: 'green' };
    if (pcAge <= 4) return { icon: '👍', text: 'Encore bons', color: 'blue' };
    if (pcAge <= 6) return { icon: '⚠️', text: 'Vieillissants', color: 'orange' };
    return { icon: '🦕', text: 'Dinosaures !', color: 'red' };
  };

  const ageMessage = getAgeMessage();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🖥️</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SCÈNE 4 : Les reliques du passé
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          11h00 - Sous les bureaux poussiéreux
        </p>
      </motion.div>

      <div className="space-y-6 mb-8">
        <CharacterDialogue
          character={characters.eleveGeek}
          dialogue="Regardez, j'ai trouvé l'étiquette ! Ces PC datent de..."
          position="right"
        />

        <CharacterDialogue
          character={characters.profTechno}
          dialogue="Windows les ralentit énormément. Avec Linux, on pourrait leur redonner une seconde vie !"
          position="left"
        />

        <CharacterDialogue
          character={characters.narrator}
          dialogue="💭 Une idée commence à germer dans votre esprit..."
          position="center"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎯 Quel est l'âge moyen de vos ordinateurs ?
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Âge moyen
            </span>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{ageMessage.icon}</span>
              <motion.span
                key={pcAge}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className={`text-4xl font-bold text-${ageMessage.color}-600`}
              >
                {pcAge} ans
              </motion.span>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={pcAge}
            onChange={(e) => setPcAge(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>1 an</span>
            <span>10 ans</span>
          </div>
        </div>

        <div className={`mb-6 p-6 bg-gradient-to-br from-${ageMessage.color}-50 to-${ageMessage.color}-100 dark:from-${ageMessage.color}-900/20 dark:to-${ageMessage.color}-800/20 rounded-xl`}>
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{ageMessage.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {ageMessage.text}
            </div>
          </div>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            {pcAge >= 5
              ? "🌱 Avec Linux, vous pourriez prolonger leur vie de plusieurs années !"
              : "🚀 Ces machines ont encore du potentiel avec un système optimisé !"}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Continuer l'histoire
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Scene 5: Le budget (Coût de maintenance)
function Scene5({ onComplete }: { onComplete: (data: Partial<QuestionnaireData>) => void }) {
  const [maintenanceCost, setMaintenanceCost] = useState(5000);

  const handleSubmit = () => {
    onComplete({ maintenanceCost });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">💼</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SCÈNE 5 : La réunion de crise
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          14h00 - Salle de réunion, toute l'équipe est là
        </p>
      </motion.div>

      <div className="space-y-6 mb-8">
        <CharacterDialogue
          character={characters.comptable}
          dialogue="Récapitulons : licences, maintenance, support technique... Le budget IT explose !"
          position="left"
        />

        <CharacterDialogue
          character={characters.proviseur}
          dialogue="On ne peut plus continuer comme ça. Il faut agir maintenant."
          position="right"
        />

        <CharacterDialogue
          character={characters.profTechno}
          dialogue="J'ai fait des calculs. Avec Linux, on pourrait économiser énormément d'argent !"
          position="left"
        />

        <CharacterDialogue
          character={characters.eleveGeek}
          dialogue="Et en plus, c'est écologique ! On ne jetterait plus les vieux PC !"
          position="right"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🎯 Quel est votre budget IT annuel ?
        </h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Budget annuel
            </span>
            <motion.span
              key={maintenanceCost}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-purple-600"
            >
              {maintenanceCost.toLocaleString('fr-FR')} €
            </motion.span>
          </div>

          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={maintenanceCost}
            onChange={(e) => setMaintenanceCost(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>1 000€</span>
            <span>50 000€</span>
          </div>
        </div>

        <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">📊</div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support & Maintenance</div>
              <div className="text-3xl font-bold text-purple-600">
                {maintenanceCost.toLocaleString('fr-FR')} €/an
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Par mois</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round(maintenanceCost / 12).toLocaleString('fr-FR')}€
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Par jour</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round(maintenanceCost / 365).toLocaleString('fr-FR')}€
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Sur 5 ans</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round(maintenanceCost * 5 / 1000).toLocaleString('fr-FR')}k€
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white text-center"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Moment de vérité !</h3>
          <p className="text-lg opacity-90">
            Découvrez combien vous pourriez économiser avec Linux...
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          🎬 Voir l'épilogue
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}

// Epilogue Scene
function EpilogueScene({
  onComplete,
  data
}: {
  onComplete: () => void;
  data: QuestionnaireData;
}) {
  const [currentEpScene, setCurrentEpScene] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled] = useState(true);
  const { playSuccessSound } = useSound();

  // Calculer les économies approximatives
  const approximateSavings = (data.windowsLicenses * 150) + (data.officeLicenses * 100) - 2000;

  // Easter eggs conditionnels
  const getEasterEgg = () => {
    if (data.nbPCs > 200) {
      return {
        message: "Wow, une TRÈS grande école ! Vous allez sauver une fortune ! 🏛️💰",
        show: true,
      };
    }
    if (approximateSavings > 20000) {
      return {
        message: `Incroyable ! Plus de ${Math.round(approximateSavings / 1000)}k€ d'économies ! 🎊`,
        show: true,
      };
    }
    if (data.pcAge > 6) {
      return {
        message: "Vos PC sont de vrais survivants ! Linux va les faire renaître ! 🦸‍♂️",
        show: true,
      };
    }
    return { message: "", show: false };
  };

  const easterEgg = getEasterEgg();

  const epilogueScenes = [
    {
      emoji: '🤝',
      title: 'Trois mois plus tard...',
      character: characters.proviseur,
      dialogue: "Nous avons pris notre décision : nous migrons vers Linux !",
    },
    {
      emoji: '🚀',
      title: 'La transformation commence',
      character: characters.profTechno,
      dialogue: "Les formations se passent à merveille ! Les enseignants adorent la simplicité de Linux.",
    },
    {
      emoji: '💰',
      title: 'Les économies arrivent',
      character: characters.comptable,
      dialogue: easterEgg.show && approximateSavings > 20000
        ? `On a économisé plus de ${Math.round(approximateSavings / 1000)}k€ dès le premier mois ! C'est fou !`
        : "Incroyable ! On a économisé des milliers d'euros dès le premier mois !",
    },
    {
      emoji: '🌍',
      title: 'Un impact écologique',
      character: characters.eleveGeek,
      dialogue: data.pcAge > 6
        ? `On a sauvé ${data.nbPCs} vieux ordinateurs ! Ces ancêtres technologiques revivent grâce à Linux !`
        : `On a sauvé ${Math.min(data.nbPCs, 30)} ordinateurs ! Plus besoin de les jeter, Linux les fait revivre !`,
    },
    {
      emoji: '🏆',
      title: 'Une école exemplaire',
      character: characters.narrator,
      dialogue: data.nbPCs > 200
        ? "Votre GRANDE école est devenue un modèle NIRD dans TOUTE la France ! 🇫🇷"
        : "Votre école est devenue un modèle NIRD dans toute la région !",
    },
  ];

  useEffect(() => {
    // Show confetti on economic scene or final scene
    if (currentEpScene === 2 && approximateSavings > 20000) {
      setShowConfetti(true);
      playSuccessSound(soundEnabled);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    if (currentEpScene === 4) {
      setShowConfetti(true);
      playSuccessSound(soundEnabled);
    }
  }, [currentEpScene, approximateSavings, soundEnabled, playSuccessSound]);

  const handleNext = () => {
    if (currentEpScene < epilogueScenes.length - 1) {
      setCurrentEpScene(currentEpScene + 1);
    } else {
      onComplete();
    }
  };

  const scene = epilogueScenes[currentEpScene];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-green-700 via-blue-700 to-purple-700 flex items-center justify-center overflow-hidden"
    >
      {/* Confetti */}
      {showConfetti && <Confetti count={60} duration={4} />}

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-3 md:top-4 right-3 md:right-4 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm transition-colors z-10"
      >
        Voir les résultats →
      </motion.button>

      {/* Epilogue content */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEpScene}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            {/* Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="text-6xl md:text-9xl mb-4 md:mb-6"
            >
              {scene.emoji}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 px-2"
            >
              {scene.title}
            </motion.h1>

            {/* Character dialogue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-4 md:p-8 shadow-2xl max-w-2xl mx-auto mb-6 md:mb-8"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${scene.character.color} rounded-full flex items-center justify-center text-3xl md:text-4xl flex-shrink-0`}
                >
                  {scene.character.emoji}
                </motion.div>
                <div className="text-left">
                  <div className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {scene.character.name}
                  </div>
                  <div className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
                    {scene.dialogue}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Easter egg message */}
            {easterEgg.show && currentEpScene === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="mb-6 md:mb-8 bg-yellow-400 text-yellow-900 px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-lg shadow-2xl"
              >
                ✨ {easterEgg.message} ✨
              </motion.div>
            )}

            {/* Action button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-bold rounded-full text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
            >
              {currentEpScene < epilogueScenes.length - 1 ? 'Continuer' : 'Découvrir vos économies'}
              {currentEpScene === epilogueScenes.length - 1 && <Sparkles className="w-5 h-5" />}
              {currentEpScene < epilogueScenes.length - 1 && <ArrowRight className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12"
        >
          {epilogueScenes.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentEpScene
                  ? 'bg-white w-6 md:w-8'
                  : index < currentEpScene
                  ? 'bg-white/60 w-1.5 md:w-2'
                  : 'bg-white/20 w-1.5 md:w-2'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-black" />

      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, x: Math.random() * 100 + '%', opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
