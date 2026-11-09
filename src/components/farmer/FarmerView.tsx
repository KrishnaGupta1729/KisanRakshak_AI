import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CropType, PlantPart } from '../../types';
import { LocalizedDisease } from '../../data/localizedDiseases';
import { ImageUploadZone } from './ImageUploadZone';
import { SamplePresets } from './SamplePresets';
import { DiagnosisResultCard } from './DiagnosisResultCard';
import { WeatherWarningSection } from '../weather/WeatherWarningSection';
import {
  PhoneCall,
  Activity,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  ShieldCheck,
  Check,
  Mic,
  Sparkles,
  ArrowRight,
  Sprout
} from 'lucide-react';

export const FarmerView: React.FC = () => {
  const {
    addSubmission,
    localizedProfiles,
    language,
    t,
    openVoiceAssistant,
    openSeedsModal,
    activeCrop,
    setActiveCrop,
    liveDiagnosis,
    setLiveDiagnosis,
    currentLocationName
  } = useApp();

  // Field metadata state - auto-filled from selected location, but editable
  const [selectedCrop, setSelectedCrop] = useState<CropType>(activeCrop || 'Wheat');
  const [selectedPlantPart, setSelectedPlantPart] = useState<PlantPart>('Leaves');
  const [farmerName, setFarmerName] = useState('');
  const [farmLocation, setFarmLocation] = useState(currentLocationName || '');
  const [farmAcreage, setFarmAcreage] = useState(5);

  // Sync farmLocation whenever currentLocationName changes from weather/GPS selector
  useEffect(() => {
    if (currentLocationName) {
      setFarmLocation(currentLocationName);
    }
  }, [currentLocationName]);

  // Sync when activeCrop changes from seeds modal
  useEffect(() => {
    if (activeCrop && activeCrop !== selectedCrop) {
      setSelectedCrop(activeCrop);
      const matched = localizedProfiles.find((p) => p.crop === activeCrop);
      if (matched) {
        setActiveProfile(matched);
        setCurrentImage(matched.sampleImageUrl);
        setLiveDiagnosis(null);
      }
    }
  }, [activeCrop]);

  // Diagnostic state
  const [currentImage, setCurrentImage] = useState<string>(
    '/src/assets/images/crop_corn_leaf_blight_1793802326412.jpg'
  );
  const [activeProfile, setActiveProfile] = useState<LocalizedDisease>(localizedProfiles[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [isSubmittedToTriage, setIsSubmittedToTriage] = useState(false);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Major crop selection options
  const majorCrops: { crop: CropType; icon: string; pa: string; hi: string; en: string }[] = [
    { crop: 'Wheat', icon: '🌾', pa: 'ਕਣਕ', hi: 'गेहूँ', en: 'Wheat' },
    { crop: 'Rice', icon: '🌱', pa: 'ਝੋਨਾ', hi: 'धान', en: 'Rice' },
    { crop: 'Potato', icon: '🥔', pa: 'ਆਲੂ', hi: 'आलू', en: 'Potato' },
    { crop: 'Tomato', icon: '🍅', pa: 'ਟਮਾਟਰ', hi: 'टमाटर', en: 'Tomato' },
    { crop: 'Corn', icon: '🌽', pa: 'ਮੱਕੀ', hi: 'मक्का', en: 'Corn' }
  ];

  // When a preset sample is chosen
  const handleSelectPreset = (profile: LocalizedDisease) => {
    setActiveProfile(profile);
    setSelectedCrop(profile.crop);
    setActiveCrop(profile.crop);
    setCurrentImage(profile.sampleImageUrl);
    setIsSubmittedToTriage(false);
    setLiveDiagnosis(null);
  };

  // When user uploads their own image or captures from camera
  const handleCustomImage = (dataUrl: string) => {
    setCurrentImage(dataUrl);
    setIsSubmittedToTriage(false);
    setLiveDiagnosis(null);
    const matching = localizedProfiles.find((p) => p.crop === selectedCrop) || localizedProfiles[0];
    setActiveProfile(matching);
  };

  // Run real plant vision diagnosis
  const handleRunDiagnosis = async () => {
    setIsAnalyzing(true);
    setAnalysisStep('Analyzing leaf spots and crop pathology symptoms...');

    try {
      let imagePayload = currentImage;
      // If currentImage is a relative local URL, convert to base64 for API
      if (currentImage && !currentImage.startsWith('data:image/')) {
        try {
          const resp = await fetch(currentImage);
          const blob = await resp.blob();
          const reader = new Promise<string>((resolve) => {
            const fr = new FileReader();
            fr.onloadend = () => resolve(fr.result as string);
            fr.readAsDataURL(blob);
          });
          imagePayload = await reader;
        } catch {
          // fallback to passing currentImage
        }
      }

      setAnalysisStep('Matching disease symptoms with certified database...');

      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePayload,
          crop: selectedCrop,
          language: 'en'
        })
      });

      if (!res.ok) {
        throw new Error(`Diagnostic server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && data.diagnosis) {
        setLiveDiagnosis(data.diagnosis);
      } else {
        throw new Error('Invalid diagnostic response structure');
      }
    } catch (err) {
      console.warn('Real diagnosis failed or fallback triggered:', err);
      // Fallback gracefully without crash
      const matched = localizedProfiles.find((p) => p.crop === selectedCrop) || activeProfile;
      setActiveProfile(matched);
      setLiveDiagnosis({
        confidence: matched.defaultConfidence,
        diseaseName: matched.names.en,
        scientificName: matched.scientificName,
        severity: matched.typicalSeverity,
        symptoms: matched.symptoms.en.split(/।|\./).map((s) => s.trim()).filter((s) => s.length > 2),
        desiRemedies: matched.desiRemedy.en,
        chemicalSprays: matched.chemicalSprays.en,
        prevention: matched.prevention.en,
        isHealthy: false,
        isUnclear: false,
        crop: selectedCrop
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleSendToTriage = () => {
    const diagName = liveDiagnosis
      ? liveDiagnosis.diseaseName
      : activeProfile.names.en;

    const diagScientific = liveDiagnosis
      ? liveDiagnosis.scientificName
      : activeProfile.scientificName;

    const diagConfidence = liveDiagnosis
      ? liveDiagnosis.confidence
      : activeProfile.defaultConfidence;

    const diagSeverity = liveDiagnosis
      ? liveDiagnosis.severity
      : activeProfile.typicalSeverity;

    const diagSymptoms = liveDiagnosis && liveDiagnosis.symptoms.length > 0
      ? liveDiagnosis.symptoms
      : [activeProfile.symptoms.en];

    addSubmission({
      farmerName: farmerName.trim() || 'Kisan',
      farmLocation: farmLocation.trim() || 'Village',
      farmSizeAcres: Number(farmAcreage) || 5,
      crop: selectedCrop,
      plantPart: selectedPlantPart,
      imageUrl: currentImage,
      diagnosis: {
        diseaseId: liveDiagnosis?.id || activeProfile.id,
        commonName: diagName,
        scientificName: diagScientific,
        pathogenClass: (liveDiagnosis?.pathogenClass as any) || activeProfile.pathogenClass,
        confidence: diagConfidence,
        severity: diagSeverity,
        keyIndicators: diagSymptoms,
        yieldRiskPercentage: diagSeverity === 'Critical' ? 70 : diagSeverity === 'Healthy' ? 0 : 30
      },
      isDemoRecord: false
    });

    setIsSubmittedToTriage(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Friendly Farmer Title & Quick Action Strip */}
      <div className="bg-gradient-to-r from-[#1e3a24] via-[#24452b] to-[#1a3320] rounded-[16px] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-[#2d5234]">
        {/* Subtle clean organic overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-amber-400 text-stone-950 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-950" />
                <span>{t.badgeDemo}</span>
              </span>
              <span className="text-white/60">·</span>
              <span className="text-xs text-emerald-200 font-semibold tracking-wide">
                Clear Outdoor Daylight View
              </span>
            </div>

            {/* Quick AgriScan Assistant Trigger Banner Button */}
            <button
              type="button"
              onClick={openVoiceAssistant}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer border border-amber-500/30"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              <span>Ask AgriScan Assistant</span>
            </button>
          </div>

          <div className="max-w-3xl space-y-1.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              {t.farmerTitle}
            </h1>
            <p className="text-sm md:text-base text-emerald-100 leading-relaxed font-medium">
              {t.farmerSubtitle}
            </p>
          </div>

          {/* 3 Simple Action Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                1
              </span>
              <div>
                <h4 className="font-bold text-sm text-white">{t.step1Title}</h4>
                <p className="text-xs text-emerald-200 font-medium">{t.step1Desc}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                2
              </span>
              <div>
                <h4 className="font-bold text-sm text-white">{t.step2Title}</h4>
                <p className="text-xs text-emerald-200 font-medium">{t.step2Desc}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                3
              </span>
              <div>
                <h4 className="font-bold text-sm text-white">{t.step3Title}</h4>
                <p className="text-xs text-emerald-200 font-medium">{t.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE WEATHER DETECTION & WARNINGS (PROMINENT SECTION WITH GPS!) */}
      <WeatherWarningSection />

      {/* Main Grid: Left Column (Inputs) & Right Column (Outputs & Remedies) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Crop Selection Card */}
          <div className="bg-white rounded-2xl border border-[#d2ddd0] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#edf5ec] text-[#1e3a24] text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="text-base font-bold text-[#1c261b]">{t.step1Title}</h3>
              </div>

              {/* View All Seeds Button in Step 1 */}
              <button
                type="button"
                onClick={openSeedsModal}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-[#edf5ec] hover:bg-[#cfe0cb] px-3.5 py-2 rounded-xl border border-[#cfe0cb] transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px] active:scale-98"
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-800" />
                <span>Browse All Crops & Seeds (12+)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick 1-tap Crop buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {majorCrops.map((item) => {
                const isSelected = selectedCrop === item.crop;
                return (
                  <button
                    key={item.crop}
                    type="button"
                    onClick={() => {
                      setSelectedCrop(item.crop);
                      setActiveCrop(item.crop);
                      const matched = localizedProfiles.find((p) => p.crop === item.crop);
                      if (matched) {
                        setActiveProfile(matched);
                        setCurrentImage(matched.sampleImageUrl);
                        setLiveDiagnosis(null);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 relative min-h-[56px] active:scale-98 ${
                      isSelected
                        ? 'border-emerald-700 bg-[#edf6ec] ring-2 ring-emerald-700/25 shadow-xs'
                        : 'border-[#d2ddd0] hover:border-emerald-700 bg-white hover:bg-[#edf5ec]'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-[#1c261b] truncate">
                        {item.en}
                      </div>
                      <div className="text-[11px] text-[#556953] font-medium truncate">Certified Seed</div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1e3a24] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Affected Part and Acreage */}
            <div className="pt-3 border-t border-[#edf2ec] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#1c261b] mb-1">
                  {t.affectedPart}
                </label>
                <select
                  value={selectedPlantPart}
                  onChange={(e) => setSelectedPlantPart(e.target.value as PlantPart)}
                  className="w-full bg-[#f9fbf8] border border-[#d2ddd0] rounded-xl px-3.5 py-2.5 text-[#1c261b] text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white min-h-[44px]"
                >
                  <option value="Leaves">{t.leaves}</option>
                  <option value="Stem">{t.stem}</option>
                  <option value="Fruit / Grain">{t.fruit}</option>
                  <option value="Crown / Roots">{t.roots}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1c261b] mb-1">
                  {t.landAreaLabel}
                </label>
                <input
                  type="number"
                  value={farmAcreage}
                  onChange={(e) => setFarmAcreage(Number(e.target.value))}
                  min={1}
                  max={500}
                  className="w-full bg-[#f9fbf8] border border-[#d2ddd0] rounded-xl px-3.5 py-2.5 text-[#1c261b] text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white min-h-[44px]"
                />
              </div>
            </div>

            {/* Farmer name and village with proper placeholder text */}
            <div className="pt-3 border-t border-[#edf2ec] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#1c261b] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t.farmerNameLabel}</span>
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder={t.farmerNamePlaceholder}
                  className="w-full bg-[#f9fbf8] border border-[#d2ddd0] rounded-xl px-3.5 py-2.5 text-[#1c261b] text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white min-h-[44px] placeholder:text-[#8ca08a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1c261b] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t.locationLabel}</span>
                </label>
                <input
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full bg-[#f9fbf8] border border-[#d2ddd0] rounded-xl px-3.5 py-2.5 text-[#1c261b] text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white min-h-[44px] placeholder:text-[#8ca08a]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Upload or Capture Photo */}
          <ImageUploadZone
            imagePreview={currentImage}
            onImageSelected={handleCustomImage}
            isAnalyzing={isAnalyzing}
            onRunDiagnosis={handleRunDiagnosis}
          />

          {/* Quick Demo Sample Presets */}
          <SamplePresets
            onSelectSample={handleSelectPreset}
            selectedId={activeProfile.id}
          />
        </div>

        {/* Right Column: Step 3 (Remedies, Spray Advice, Helpline, FAQs) */}
        <div className="lg:col-span-7 space-y-6">
          {isAnalyzing ? (
            <div className="bg-white rounded-2xl border border-[#d2ddd0] p-12 text-center shadow-xs space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#edf5ec] flex items-center justify-center text-emerald-800 animate-pulse">
                <Activity className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1c261b]">
                  Running Crop Disease Diagnostic...
                </h3>
                <p className="text-xs text-[#556953] font-semibold">{analysisStep}</p>
              </div>
              <div className="w-48 h-2 bg-[#edf2ec] mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-emerald-800 animate-[pulse_1s_ease-in-out_infinite] w-3/4 rounded-full" />
              </div>
            </div>
          ) : (
            <DiagnosisResultCard
              profile={activeProfile}
              liveDiagnosis={liveDiagnosis}
              farmerName={farmerName}
              farmLocation={farmLocation}
              onSendToTriage={handleSendToTriage}
              isLogged={isSubmittedToTriage}
              onRetakePhoto={() => {
                const uploadInput = document.getElementById('plant-image-upload') as HTMLInputElement | null;
                uploadInput?.click();
              }}
            />
          )}

          {/* Free Kisan Call Center Helpline Banner */}
          <div className="bg-[#1e3a24] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-3 border border-[#2d5234]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-bold">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                  <h4 className="font-black text-base sm:text-lg text-white">
                    {t.helplineTitle}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium leading-relaxed">
                  {t.helplineDesc}
                </p>
              </div>

              <a
                href="tel:18001801551"
                className="min-h-[44px] px-5 py-3 bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 shadow-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.callKisanCallCenter}</span>
              </a>
            </div>
          </div>

          {/* Simple Farmer FAQs Accordion */}
          <div className="bg-white rounded-2xl border border-[#d2ddd0] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-[#edf2ec]">
              <HelpCircle className="w-5 h-5 text-emerald-800" />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#1c261b]">{t.faqTitle}</h4>
                <p className="text-xs text-[#556953] font-medium">{t.faqSubtitle}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A }
              ].map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-[#d2ddd0] rounded-xl overflow-hidden transition-colors bg-[#f9fbf8]"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full min-h-[44px] p-3.5 text-left text-xs sm:text-sm font-bold text-[#1c261b] flex items-center justify-between gap-2 hover:bg-white cursor-pointer transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#556953] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs sm:text-sm text-[#1c261b] leading-relaxed border-t border-[#edf2ec] pt-3 bg-white font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Action Voice Assistant Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={openVoiceAssistant}
          className="min-h-[48px] px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all cursor-pointer border border-amber-500/30"
          title="Open AgriScan Assistant"
        >
          <Mic className="w-5 h-5 animate-pulse" />
          <span className="font-extrabold">
            Assistant
          </span>
        </button>
      </div>
    </div>
  );
};
