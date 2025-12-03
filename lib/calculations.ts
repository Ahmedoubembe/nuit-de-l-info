import type {
  QuestionnaireData,
  Results,
  EconomicImpact,
  EcologicalImpact,
  Autonomy,
  RoadmapStep
} from '@/types';

// Constantes de calcul
const WINDOWS_COST_PER_PC = 150; // €/PC (licence OEM moyenne)
const OFFICE_COST_PER_PC_ANNUAL = 100; // €/PC/an (Microsoft 365)
const SUPPORT_PERCENTAGE = 0.10; // 10% du coût total
const LINUX_FORMATION_COST = 500; // € one-time
const LINUX_MAINTENANCE_COST_ANNUAL = 2000; // €/an fixe
const CO2_PER_PC_THROWN = 600; // kg (cycle de vie complet)
const ELECTRONIC_WASTE_PER_PC = 60; // kg

/**
 * Calcule le coût Windows total
 * @param nbPCs - Nombre de PCs
 * @returns Coût Windows en euros
 */
function calculateWindowsCost(nbPCs: number): number {
  return nbPCs * WINDOWS_COST_PER_PC;
}

/**
 * Calcule le coût Office annuel
 * @param nbPCs - Nombre de PCs
 * @returns Coût Office annuel en euros
 */
function calculateOfficeCost(nbPCs: number): number {
  return nbPCs * OFFICE_COST_PER_PC_ANNUAL;
}

/**
 * Calcule le coût de support
 * @param totalCost - Coût total avant support
 * @returns Coût de support en euros
 */
function calculateSupportCost(totalCost: number): number {
  return totalCost * SUPPORT_PERCENTAGE;
}

/**
 * Calcule l'impact économique de la migration vers Linux
 * @param responses - Données du questionnaire
 * @returns Impact économique détaillé
 */
function calculateEconomicImpact(responses: QuestionnaireData): EconomicImpact {
  const { nbPCs, hasOffice, hasWindows } = responses;

  // Coûts actuels (Windows/Office)
  const windowsCost = hasWindows ? calculateWindowsCost(nbPCs) : 0;
  const officeCost = hasOffice ? calculateOfficeCost(nbPCs) : 0;
  const subtotalCurrent = windowsCost + officeCost;
  const supportCost = calculateSupportCost(subtotalCurrent);
  const currentTotalCost = subtotalCurrent + supportCost;

  // Coûts Linux
  const linuxFormationCost = LINUX_FORMATION_COST;
  const linuxMaintenanceCost = LINUX_MAINTENANCE_COST_ANNUAL;
  const linuxTotalCost = linuxFormationCost + linuxMaintenanceCost;

  // Économies
  const annualSavings = currentTotalCost - linuxMaintenanceCost;
  const fiveYearSavings = (annualSavings * 5) - linuxFormationCost;

  return {
    windowsCost,
    officeCost,
    supportCost,
    currentTotalCost,
    linuxFormationCost,
    linuxMaintenanceCost,
    linuxTotalCost,
    annualSavings,
    fiveYearSavings,
  };
}

/**
 * Calcule l'impact écologique de la migration vers Linux
 * @param responses - Données du questionnaire
 * @returns Impact écologique détaillé
 */
function calculateEcologicalImpact(responses: QuestionnaireData): EcologicalImpact {
  const { nbPCs, pcAge } = responses;

  // PCs qui pourraient être prolongés au lieu d'être jetés
  // On estime que Linux peut prolonger la vie des PCs de 3-5 ans
  const pcLifeExtension = 4; // années

  // Si les PCs ont plus de 5 ans, ils seraient normalement remplacés
  // Linux permet de les conserver
  const pcsToReplace = pcAge >= 5 ? nbPCs : Math.floor(nbPCs * 0.3);

  const co2PerPC = CO2_PER_PC_THROWN;
  const totalCO2Saved = pcsToReplace * co2PerPC;

  const electronicWastePerPC = ELECTRONIC_WASTE_PER_PC;
  const totalWasteSaved = pcsToReplace * electronicWastePerPC;

  return {
    co2PerPC,
    totalCO2Saved,
    electronicWastePerPC,
    totalWasteSaved,
    pcLifeExtension,
  };
}

/**
 * Évalue l'autonomie numérique gagnée avec Linux
 * @returns Évaluation de l'autonomie
 */
function calculateAutonomy(): Autonomy {
  return {
    dataControl: true, // Contrôle total des données
    vendorLockIn: false, // Pas de verrouillage fournisseur
    customization: true, // Personnalisation complète
    transparency: true, // Code source ouvert
    communitySupport: true, // Support communautaire actif
  };
}

/**
 * Génère une roadmap de migration vers Linux
 * @param responses - Données du questionnaire
 * @returns Roadmap par phases
 */
function generateRoadmap(responses: QuestionnaireData): RoadmapStep[] {
  const { nbPCs } = responses;

  const roadmap: RoadmapStep[] = [
    {
      phase: 1,
      title: "Audit et préparation",
      description: "Évaluation de l'infrastructure et choix de la distribution Linux",
      duration: "2-4 semaines",
      actions: [
        "Inventaire complet du matériel et logiciels",
        "Identification des applications critiques",
        "Sélection de la distribution Linux (Ubuntu, Debian, Fedora...)",
        "Test de compatibilité matérielle",
      ],
    },
    {
      phase: 2,
      title: "Projet pilote",
      description: "Déploiement test sur un groupe restreint",
      duration: "4-6 semaines",
      actions: [
        `Migration de ${Math.min(5, Math.ceil(nbPCs * 0.1))} postes test`,
        "Formation des utilisateurs pilotes",
        "Identification et résolution des problèmes",
        "Documentation des procédures",
      ],
    },
    {
      phase: 3,
      title: "Déploiement progressif",
      description: "Migration par vagues de l'ensemble du parc",
      duration: "3-6 mois",
      actions: [
        "Migration par services/départements",
        "Formation continue des utilisateurs",
        "Support technique renforcé",
        "Migration des données et configurations",
      ],
    },
    {
      phase: 4,
      title: "Optimisation et support",
      description: "Stabilisation et amélioration continue",
      duration: "Continu",
      actions: [
        "Monitoring des performances",
        "Optimisation des configurations",
        "Mise à jour de la documentation",
        "Formation avancée des équipes IT",
      ],
    },
  ];

  return roadmap;
}

/**
 * Fonction principale de calcul d'impact
 * @param responses - Données du questionnaire
 * @returns Résultats complets de l'analyse
 */
export function calculateImpact(responses: QuestionnaireData): Results {
  const economiesFinancieres = calculateEconomicImpact(responses);
  const impactEcologique = calculateEcologicalImpact(responses);
  const autonomie = calculateAutonomy();
  const roadmap = generateRoadmap(responses);

  return {
    economiesFinancieres,
    impactEcologique,
    autonomie,
    roadmap,
  };
}

// Export des constantes pour utilisation dans l'UI
export const CALCULATION_CONSTANTS = {
  WINDOWS_COST_PER_PC,
  OFFICE_COST_PER_PC_ANNUAL,
  SUPPORT_PERCENTAGE,
  LINUX_FORMATION_COST,
  LINUX_MAINTENANCE_COST_ANNUAL,
  CO2_PER_PC_THROWN,
  ELECTRONIC_WASTE_PER_PC,
};
