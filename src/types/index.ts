export interface QuestionnaireData {
  nbPCs: number;
  hasOffice: boolean;
  hasWindows: boolean;
  pcAge: number;
  currentMaintenanceCost: number;
}

export interface EconomicImpact {
  windowsCost: number;
  officeCost: number;
  supportCost: number;
  currentTotalCost: number;
  linuxFormationCost: number;
  linuxMaintenanceCost: number;
  linuxTotalCost: number;
  annualSavings: number;
  fiveYearSavings: number;
}

export interface EcologicalImpact {
  co2PerPC: number;
  totalCO2Saved: number;
  electronicWastePerPC: number;
  totalWasteSaved: number;
  pcLifeExtension: number;
}

export interface Autonomy {
  dataControl: boolean;
  vendorLockIn: boolean;
  customization: boolean;
  transparency: boolean;
  communitySupport: boolean;
}

export interface RoadmapStep {
  phase: number;
  title: string;
  description: string;
  duration: string;
  actions: string[];
}

export interface Results {
  economiesFinancieres: EconomicImpact;
  impactEcologique: EcologicalImpact;
  autonomie: Autonomy;
  roadmap: RoadmapStep[];
}
