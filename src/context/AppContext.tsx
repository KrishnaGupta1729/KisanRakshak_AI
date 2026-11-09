import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveView, ScanSubmission, TriageStatus, DiseaseProfile, CropType, LiveDiagnosisResult } from '../types';
import { INITIAL_FIELD_SUBMISSIONS, DISEASE_PROFILES } from '../data/mockData';
import { Language, TRANSLATIONS, TranslationStrings } from '../data/translations';
import { LOCALIZED_DISEASE_PROFILES, LocalizedDisease } from '../data/localizedDiseases';
import { ALL_SEEDS, SeedItem } from '../data/allSeedsData';
import { REGIONAL_WEATHER_PRESETS, WeatherReport } from '../data/weatherData';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
  submissions: ScanSubmission[];
  addSubmission: (newScan: Omit<ScanSubmission, 'id' | 'timestamp' | 'status'>) => ScanSubmission;
  updateSubmission: (
    id: string,
    updates: {
      status: TriageStatus;
      agronomistNotes?: string;
      reclassifiedDisease?: string;
      verifiedBy?: string;
    }
  ) => void;
  selectedScanId: string | null;
  setSelectedScanId: (id: string | null) => void;
  currentFarmerScan: ScanSubmission | null;
  setCurrentFarmerScan: (scan: ScanSubmission | null) => void;
  diseaseProfiles: DiseaseProfile[];
  localizedProfiles: LocalizedDisease[];
  allSeeds: SeedItem[];
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  exportSubmissionsJSON: () => void;
  exportSubmissionsCSV: () => void;

  // Voice Assistant Modal
  isVoiceAssistantOpen: boolean;
  setIsVoiceAssistantOpen: (open: boolean) => void;
  openVoiceAssistant: () => void;

  // Seeds Directory Modal
  isSeedsModalOpen: boolean;
  setIsSeedsModalOpen: (open: boolean) => void;
  openSeedsModal: () => void;

  // Active crop selection bridge
  activeCrop: CropType;
  setActiveCrop: (crop: CropType) => void;

  // Real weather report
  currentWeather: WeatherReport;
  setCurrentWeather: (w: WeatherReport) => void;

  // Selected location name for auto-fill & sharing
  currentLocationName: string;
  setCurrentLocationName: (name: string) => void;

  // Live diagnosis from Gemini vision
  liveDiagnosis: LiveDiagnosisResult | null;
  setLiveDiagnosis: (d: LiveDiagnosisResult | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'agriscan_submissions_v2';
const LANG_STORAGE_KEY = 'agriscan_user_lang';
const LAST_LOC_STORAGE_KEY = 'agriscan_last_location_name';
const LAST_WEATHER_STORAGE_KEY = 'agriscan_last_weather';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('farmer');
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isSeedsModalOpen, setIsSeedsModalOpen] = useState(false);
  const [activeCrop, setActiveCrop] = useState<CropType>('Wheat');

  const [currentLocationName, setCurrentLocationNameState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LAST_LOC_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return 'Ludhiana, Punjab';
  });

  const setCurrentLocationName = (name: string) => {
    setCurrentLocationNameState(name);
    try {
      localStorage.setItem(LAST_LOC_STORAGE_KEY, name);
    } catch {}
  };

  const [currentWeather, setCurrentWeatherState] = useState<WeatherReport>(() => {
    try {
      const saved = localStorage.getItem(LAST_WEATHER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.temperature !== undefined) {
          return { ...parsed, isCached: true };
        }
      }
    } catch {}
    return REGIONAL_WEATHER_PRESETS.ludhiana;
  });

  const setCurrentWeather = (w: WeatherReport) => {
    setCurrentWeatherState(w);
    try {
      localStorage.setItem(LAST_WEATHER_STORAGE_KEY, JSON.stringify(w));
    } catch {}
  };

  const [liveDiagnosis, setLiveDiagnosis] = useState<LiveDiagnosisResult | null>(null);

  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState('en');
  };

  const t = TRANSLATIONS['en'];

  const [submissions, setSubmissions] = useState<ScanSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_FIELD_SUBMISSIONS;
  });

  const [currentFarmerScan, setCurrentFarmerScan] = useState<ScanSubmission | null>(() => {
    return submissions[0] || null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // Storage error ignored
    }
  }, [submissions]);

  const addSubmission = (newScan: Omit<ScanSubmission, 'id' | 'timestamp' | 'status'>): ScanSubmission => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const scanId = `SCN-${Math.floor(1000 + Math.random() * 9000)}`;

    const submission: ScanSubmission = {
      ...newScan,
      id: scanId,
      timestamp: formattedDate,
      status: 'Pending Review'
    };

    setSubmissions((prev) => [submission, ...prev]);
    setCurrentFarmerScan(submission);

    const msg = `Scan ${scanId} recorded successfully.`;

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);

    return submission;
  };

  const updateSubmission = (
    id: string,
    updates: {
      status: TriageStatus;
      agronomistNotes?: string;
      reclassifiedDisease?: string;
      verifiedBy?: string;
    }
  ) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            ...updates,
            verifiedAt: formattedDate,
            verifiedBy: updates.verifiedBy || 'Dr. H.S. Brar (Sr. Agronomist / KVK Specialist)'
          };
        }
        return sub;
      })
    );

    const msg = `Triage status for ${id} updated.`;

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const exportSubmissionsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `agriscan-records-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportSubmissionsCSV = () => {
    const headers = ['Scan ID', 'Timestamp', 'Farmer Name', 'Location', 'Crop', 'Severity', 'Pathogen Name', 'Confidence %', 'Status', 'Agronomist Notes'];
    const rows = submissions.map((s) => [
      s.id,
      `"${s.timestamp}"`,
      `"${s.farmerName}"`,
      `"${s.farmLocation}"`,
      s.crop,
      s.diagnosis.severity,
      `"${s.diagnosis.commonName} (${s.diagnosis.scientificName})"`,
      s.diagnosis.confidence.toFixed(1),
      s.status,
      `"${(s.agronomistNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `agriscan-farmer-records-${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        language,
        setLanguage,
        t,
        submissions,
        addSubmission,
        updateSubmission,
        selectedScanId,
        setSelectedScanId,
        currentFarmerScan,
        setCurrentFarmerScan,
        diseaseProfiles: DISEASE_PROFILES,
        localizedProfiles: LOCALIZED_DISEASE_PROFILES,
        allSeeds: ALL_SEEDS,
        toastMessage,
        setToastMessage,
        exportSubmissionsJSON,
        exportSubmissionsCSV,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,
        openVoiceAssistant: () => setIsVoiceAssistantOpen(true),
        isSeedsModalOpen,
        setIsSeedsModalOpen,
        openSeedsModal: () => setIsSeedsModalOpen(true),
        activeCrop,
        setActiveCrop,
        currentWeather,
        setCurrentWeather,
        currentLocationName,
        setCurrentLocationName,
        liveDiagnosis,
        setLiveDiagnosis
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
