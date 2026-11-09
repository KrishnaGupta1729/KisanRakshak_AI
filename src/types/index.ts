export type CropType =
  | 'Tomato'
  | 'Corn'
  | 'Potato'
  | 'Rice'
  | 'Soybean'
  | 'Wheat'
  | 'Apple'
  | 'Grape'
  | 'Cassava';

export type PlantPart = 'Leaves' | 'Stem' | 'Fruit / Grain' | 'Crown / Roots';

export type PathogenClass =
  | 'Fungal'
  | 'Bacterial'
  | 'Viral'
  | 'Oomycete'
  | 'Nutrient Deficiency'
  | 'Pest Damage'
  | 'Healthy';

export type SeverityLevel = 'Healthy' | 'Low' | 'Moderate' | 'Severe' | 'Critical';

export type TriageStatus = 'Pending Review' | 'Verified' | 'Reclassified' | 'Resolved';

export interface ChemicalTreatment {
  activeIngredient: string;
  fracCode: string;
  applicationRate: string;
  preHarvestInterval: string; // e.g. "3 days"
  notes: string;
}

export interface TreatmentProtocol {
  culturalControls: string[];
  organicControls: string[];
  chemicalControls: ChemicalTreatment[];
  environmentalRiskNotes: string;
  preventiveMeasures: string[];
}

export interface DiseaseProfile {
  id: string;
  commonName: string;
  scientificName: string;
  crop: CropType;
  pathogenClass: PathogenClass;
  typicalSeverity: SeverityLevel;
  primarySymptoms: string;
  sampleImageUrl: string;
  favorableWeather: string;
  treatment: TreatmentProtocol;
  defaultConfidence: number;
  estimatedYieldImpact: string;
}

export interface ScanSubmission {
  id: string;
  timestamp: string;
  farmerName: string;
  farmLocation: string;
  farmSizeAcres: number;
  crop: CropType;
  plantPart: PlantPart;
  imageUrl: string;
  diagnosis: {
    diseaseId: string;
    commonName: string;
    scientificName: string;
    pathogenClass: PathogenClass;
    confidence: number;
    severity: SeverityLevel;
    keyIndicators: string[];
    yieldRiskPercentage: number;
  };
  status: TriageStatus;
  agronomistNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  reclassifiedDisease?: string;
  isDemoRecord?: boolean;
}

export type ActiveView = 'farmer' | 'admin';

export interface LiveDiagnosisResult {
  id?: string;
  isUnclear?: boolean;
  isHealthy?: boolean;
  confidence: number;
  diseaseName: string;
  scientificName: string;
  pathogenClass?: PathogenClass | string;
  severity: SeverityLevel;
  symptoms: string[];
  desiRemedies: string[];
  chemicalSprays: Array<{
    medicineName: string;
    dose: string;
    safetyDays: string;
    advice: string;
  }>;
  prevention: string[];
  favorableWeather?: string;
  yieldRisk?: string;
  audioScript?: string;
  unclearNotice?: string;
  crop?: CropType;
}
