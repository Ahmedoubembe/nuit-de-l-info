'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import type { QuestionnaireData, Results } from '@/types';

interface PDFExportProps {
  data: QuestionnaireData;
  results: Results;
}

export default function PDFExport({ data, results }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header avec logo placeholder
      doc.setFillColor(37, 99, 235); // Blue 600
      doc.rect(0, 0, pageWidth, 40, 'F');

      // Logo placeholder (N dans un carré)
      doc.setFillColor(255, 255, 255);
      doc.rect(15, 10, 20, 20, 'F');
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('N', 25, 25, { align: 'center' });

      // Titre
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('NIRD - Rapport d\'Impact', 45, 25);

      yPosition = 55;

      // Section: Résumé des réponses
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Résumé du questionnaire', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre de PC: ${data.nbPCs}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Windows: ${data.hasWindows ? 'Oui' : 'Non'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Microsoft Office: ${data.hasOffice ? 'Oui' : 'Non'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Âge moyen des PC: ${data.pcAge} ans`, 20, yPosition);
      yPosition += 7;
      doc.text(`Coût maintenance actuel: ${data.currentMaintenanceCost.toLocaleString('fr-FR')} €/an`, 20, yPosition);
      yPosition += 15;

      // Section: Économies financières
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129); // Green 600
      doc.text('💰 Économies Financières', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`Coûts Windows/Office: ${results.economiesFinancieres.currentTotalCost.toLocaleString('fr-FR')} €/an`, 20, yPosition);
      yPosition += 7;
      doc.text(`Coûts Linux: ${results.economiesFinancieres.linuxMaintenanceCost.toLocaleString('fr-FR')} €/an`, 20, yPosition);
      yPosition += 7;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text(`Économies annuelles: ${results.economiesFinancieres.annualSavings.toLocaleString('fr-FR')} €`, 20, yPosition);
      yPosition += 7;
      doc.text(`Économies sur 5 ans: ${results.economiesFinancieres.fiveYearSavings.toLocaleString('fr-FR')} €`, 20, yPosition);
      yPosition += 15;

      // Section: Impact écologique
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94); // Green 500
      doc.text('🌍 Impact Écologique', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`CO₂ économisé: ${results.impactEcologique.totalCO2Saved.toLocaleString('fr-FR')} kg`, 20, yPosition);
      yPosition += 7;
      doc.text(`Déchets électroniques évités: ${results.impactEcologique.totalWasteSaved.toLocaleString('fr-FR')} kg`, 20, yPosition);
      yPosition += 7;
      doc.text(`Durée de vie prolongée: +${results.impactEcologique.pcLifeExtension} ans`, 20, yPosition);
      yPosition += 15;

      // Section: Autonomie numérique
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(59, 130, 246); // Blue 500
      doc.text('🛡️ Autonomie Numérique', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text('✓ Contrôle total des données', 20, yPosition);
      yPosition += 7;
      doc.text('✓ Pas de verrouillage fournisseur', 20, yPosition);
      yPosition += 7;
      doc.text('✓ Personnalisation complète', 20, yPosition);
      yPosition += 7;
      doc.text('✓ Code source transparent', 20, yPosition);
      yPosition += 15;

      // Nouvelle page pour la roadmap
      doc.addPage();
      yPosition = 20;

      // Section: Roadmap de migration
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('🗺️ Roadmap de Migration', 20, yPosition);
      yPosition += 12;

      results.roadmap.forEach((step, index) => {
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text(`Phase ${step.phase}: ${step.title}`, 20, yPosition);
        yPosition += 7;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text(`Durée: ${step.duration}`, 20, yPosition);
        yPosition += 7;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const descLines = doc.splitTextToSize(step.description, pageWidth - 40);
        doc.text(descLines, 20, yPosition);
        yPosition += descLines.length * 5 + 3;

        step.actions.forEach((action) => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFontSize(9);
          doc.text(`• ${action}`, 25, yPosition);
          yPosition += 5;
        });

        yPosition += 8;
      });

      // Footer sur toutes les pages
      const totalPages = doc.internal.pages.length - 1; // -1 car la première page est vide
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(
          'NIRD - nird.forge.apps.education.fr',
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
        doc.text(
          `Page ${i} / ${totalPages}`,
          pageWidth - 20,
          pageHeight - 10,
          { align: 'right' }
        );
      }

      // Sauvegarder le PDF
      doc.save(`NIRD_Rapport_Impact_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={generatePDF}
      disabled={isGenerating}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
        isGenerating
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-xl'
      }`}
    >
      {isGenerating ? (
        <>
          <FileText className="w-5 h-5 animate-pulse" />
          Génération...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Télécharger le rapport PDF
        </>
      )}
    </motion.button>
  );
}
