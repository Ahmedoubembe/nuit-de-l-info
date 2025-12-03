'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import type { Results, QuestionnaireData } from '@/types';

interface SocialShareProps {
  data: QuestionnaireData;
  results: Results;
}

export default function SocialShare({ data, results }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  // Générer l'URL avec les résultats
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/resultat?data=${encodeURIComponent(JSON.stringify(data))}`
    : 'https://nird.forge.apps.education.fr';

  const economiesAnnuelles = results.economiesFinancieres.annualSavings;
  const co2Saved = results.impactEcologique.totalCO2Saved;

  // Messages de partage
  const twitterMessage = `Notre école va économiser ${economiesAnnuelles.toLocaleString('fr-FR')}€/an et ${co2Saved.toLocaleString('fr-FR')}kg de CO₂ en rejoignant #NIRD ! 🌍💚 Calculez vos économies :`;

  const linkedinMessage = `🎓 Migration vers Linux avec NIRD\n\n✅ Économies : ${economiesAnnuelles.toLocaleString('fr-FR')}€/an\n✅ Impact écologique : ${co2Saved.toLocaleString('fr-FR')}kg CO₂ économisés\n✅ Autonomie numérique : 100%\n\nCalculez l'impact pour votre établissement :`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📢 Partagez vos résultats
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Inspirez d'autres établissements à rejoindre la transition numérique responsable !
      </p>

      <div className="flex flex-wrap gap-4">
        {/* Twitter/X Share */}
        <TwitterShareButton url={shareUrl} title={twitterMessage}>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Twitter className="w-5 h-5" />
            Partager sur X
          </motion.button>
        </TwitterShareButton>

        {/* LinkedIn Share */}
        <LinkedinShareButton url={shareUrl} title="Migration Linux avec NIRD" summary={linkedinMessage}>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] hover:bg-[#006399] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Linkedin className="w-5 h-5" />
            Partager sur LinkedIn
          </motion.button>
        </LinkedinShareButton>

        {/* Copy Link */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copié !
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              Copier le lien
            </>
          )}
        </motion.button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Astuce :</strong> Le lien partagé contient vos résultats et permet à d'autres de voir votre impact !
        </p>
      </div>
    </div>
  );
}
