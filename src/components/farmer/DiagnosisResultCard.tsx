import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocalizedDisease } from '../../data/localizedDiseases';
import { LiveDiagnosisResult } from '../../types';
import {
  Volume2,
  VolumeX,
  Share2,
  Download,
  AlertTriangle,
  Leaf,
  Sprout,
  ShieldCheck,
  Droplets,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  Check,
  PhoneCall,
  Camera,
  HelpCircle
} from 'lucide-react';

interface DiagnosisResultCardProps {
  profile: LocalizedDisease;
  liveDiagnosis?: LiveDiagnosisResult | null;
  farmerName: string;
  farmLocation: string;
  onSendToTriage: () => void;
  isLogged: boolean;
  onRetakePhoto?: () => void;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  profile,
  liveDiagnosis,
  farmerName,
  farmLocation,
  onSendToTriage,
  isLogged,
  onRetakePhoto
}) => {
  const { language, t, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'desi' | 'spray' | 'prevention' | 'weather'>('desi');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fallback farmer name if empty
  const displayName = farmerName.trim() || 'Respected Farmer';
  const displayLocation = farmLocation.trim() || 'Field';

  // Case 1: Unclear photo or Confidence < 60% -> Do not force disease!
  const isUnclear = liveDiagnosis?.isUnclear || (liveDiagnosis && liveDiagnosis.confidence < 60);

  if (isUnclear) {
    return (
      <div className="bg-white rounded-2xl border border-[#f5e3ad] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#fffcee] border border-[#f5e3ad] flex items-center justify-center shrink-0 text-[#3a280c]">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#fffcee] text-[#3a280c] border border-[#f5e3ad] inline-block mb-1">
              Unclear Image
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1c261b] leading-snug">
              Not sure, please retake the photo or contact an expert
            </h2>
            <p className="text-xs sm:text-sm text-[#556953] font-medium">
              The photo is blurry, too dark, or symptoms are unclear. To prevent crop damage, we do not guess chemical treatments.
            </p>
          </div>
        </div>

        {/* Action recommendations line-by-line */}
        <div className="space-y-2.5 p-4 bg-[#fffcee]/70 rounded-xl border border-[#f5e3ad] text-xs sm:text-sm text-[#1c261b]">
          <h4 className="font-bold text-[#1c261b] mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Next Steps:</span>
          </h4>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1e3a24] text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">1</span>
            <span>Take a sharp close-up photo of the affected leaf in good daylight.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1e3a24] text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">2</span>
            <span>Hold camera steady to keep leaf veins and spots in focus.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1e3a24] text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">3</span>
            <span>Or call the toll-free Kisan Call Center (1800-180-1551) for direct expert advice.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {onRetakePhoto && (
            <button
              type="button"
              onClick={onRetakePhoto}
              className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-[#1e3a24] hover:bg-[#24452b] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
            >
              <Camera className="w-4 h-4" />
              <span>Retake Clear Photo</span>
            </button>
          )}

          <a
            href="tel:18001801551"
            className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.callKisanCallCenter}</span>
          </a>
        </div>
      </div>
    );
  }

  // Case 2: Healthy Leaf Detected
  const isHealthy = liveDiagnosis?.isHealthy;

  // Normalized Fields for Diagnosis View
  const diseaseName = isHealthy
    ? 'Healthy Leaf'
    : liveDiagnosis?.diseaseName || profile.names.en;

  const scientificName = isHealthy
    ? 'No Pathogen Detected'
    : liveDiagnosis?.scientificName || profile.scientificName;

  const confidenceScore = liveDiagnosis ? liveDiagnosis.confidence : profile.defaultConfidence;

  const symptomLines = isHealthy
    ? [
        'Leaf foliage is vigorous and green.',
        'No fungal lesions, spots, or pest damage observed.',
        'Nutrient supply and hydration appear normal.'
      ]
    : liveDiagnosis?.symptoms && liveDiagnosis.symptoms.length > 0
    ? liveDiagnosis.symptoms
    : profile.symptoms.en
        .split(/।|\./)
        .map((s) => s.trim())
        .filter((s) => s.length > 2);

  const desiList = isHealthy
    ? [
        'Maintain regular balanced irrigation schedule.',
        'Apply well-rotted farmyard manure or vermicompost.',
        'No bio or chemical spray needed at this stage.'
      ]
    : liveDiagnosis?.desiRemedies && liveDiagnosis.desiRemedies.length > 0
    ? liveDiagnosis.desiRemedies
    : profile.desiRemedy.en;

  const sprayList = isHealthy
    ? []
    : liveDiagnosis?.chemicalSprays && liveDiagnosis.chemicalSprays.length > 0
    ? liveDiagnosis.chemicalSprays
    : profile.chemicalSprays.en;

  const preventionList = isHealthy
    ? [
        'Keep field weed-free to ensure good aeration.',
        'Inspect crop weekly to catch any early symptoms.',
        'Avoid excess nitrogen/urea application.'
      ]
    : liveDiagnosis?.prevention && liveDiagnosis.prevention.length > 0
    ? liveDiagnosis.prevention
    : profile.prevention.en;

  const cropDisplayName = t.crops[profile.crop as keyof typeof t.crops] || profile.crop;

  // Audio Guide Script
  const getAudioScript = () => {
    if (isHealthy) {
      return 'Great news! Your crop leaf is healthy. No chemical spray is required.';
    }
    if (liveDiagnosis?.audioScript) {
      return liveDiagnosis.audioScript;
    }
    return profile.audioScript.en;
  };

  // Speech synthesis in English
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const script = getAudioScript();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // WhatsApp share
  const shareToWhatsApp = () => {
    let text = `🌾 *${t.appName}*\n`;
    text += `👤 *${t.farmerNameLabel}:* ${displayName}\n`;
    text += `📍 *${t.locationLabel}:* ${displayLocation}\n`;
    text += `🌱 *${t.chooseCrop}:* ${cropDisplayName}\n`;
    text += `🩺 *${t.diagnosisResult}:* ${diseaseName}\n`;
    text += `📊 *Accuracy:* ${confidenceScore.toFixed(1)}%\n\n`;

    text += `🔍 *${t.symptomsTitle}:*\n`;
    symptomLines.forEach((s, i) => {
      text += `${i + 1}. ${s}\n`;
    });
    text += `\n`;

    if (desiList.length > 0) {
      text += `🌿 *${t.tabDesiRemedy}:*\n`;
      desiList.forEach((d, i) => {
        text += `${i + 1}. ${d}\n`;
      });
      text += `\n`;
    }

    if (sprayList.length > 0) {
      text += `🧪 *${t.tabSprayMedicine}:*\n`;
      sprayList.forEach((s) => {
        text += `• ${s.medicineName} -> ${s.dose}\n`;
      });
    }

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Download printable slip
  const downloadReport = () => {
    const reportText = `=====================================================
${t.appName.toUpperCase()} - ${t.farmerTitle.toUpperCase()}
=====================================================
${t.farmerNameLabel}: ${displayName}
${t.locationLabel}: ${displayLocation}
${t.chooseCrop}: ${cropDisplayName}
Date: ${new Date().toLocaleDateString()}

=====================================================
1. ${t.diagnosisResult.toUpperCase()}:
${diseaseName} (${scientificName})
${t.confidenceMatch}: ${confidenceScore.toFixed(1)}%

2. ${t.symptomsTitle.toUpperCase()} (LINE BY LINE):
${symptomLines.map((c, i) => `[${i + 1}] ${c}`).join('\n')}

3. ${t.tabDesiRemedy.toUpperCase()} (LINE BY LINE):
${desiList.map((c, i) => `[${i + 1}] ${c}`).join('\n')}

4. ${t.tabSprayMedicine.toUpperCase()} (LINE BY LINE):
${
  sprayList.length > 0
    ? sprayList
        .map(
          (c, i) =>
            `[${i + 1}] ${c.medicineName}\n    Dose: ${c.dose}\n    Safety Gap: ${c.safetyDays}\n    Advice: ${c.advice}`
        )
        .join('\n\n')
    : 'No chemical spray required for healthy crops.'
}

5. ${t.tabPrevention.toUpperCase()} (LINE BY LINE):
${preventionList.map((c, i) => `* ${c}`).join('\n')}

Helpline: Kisan Call Center 1800-180-1551 (Toll Free)
=====================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KisanSlip-${profile.crop}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#d2ddd0] overflow-hidden shadow-sm">
      {/* Top Banner with Disease Name & Real Confidence */}
      <div className={`p-5 sm:p-6 border-b border-[#d2ddd0] ${isHealthy ? 'bg-[#edf5ec]/60' : 'bg-[#f7f9f6]'}`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#1e3a24] bg-[#edf5ec] border border-[#cfe0cb] px-3 py-1 rounded-lg">
                {cropDisplayName}
              </span>
              <span className="text-[#556953]">·</span>
              <span className="text-[#556953] font-semibold">{isHealthy ? 'Healthy' : profile.pathogenClass}</span>
              <span className="text-[#556953]">·</span>
              {/* REAL CONFIDENCE SCORE RETURNED BY MODEL */}
              <span className="font-bold text-[#1e3a24] bg-white px-2.5 py-0.5 rounded-lg border border-[#cfe0cb] shadow-2xs font-mono">
                {confidenceScore.toFixed(1)}% {t.confidenceMatch}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c261b]">
              {diseaseName}
            </h2>

            <div className="text-xs text-[#556953] font-mono italic">
              {scientificName}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 shadow-2xs ${
                isHealthy
                  ? 'bg-[#edf5ec] text-[#1e3a24] border-[#cfe0cb]'
                  : 'bg-[#fffcee] text-[#3a280c] border-[#f5e3ad]'
              }`}
            >
              {isHealthy ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.severityHealthy}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Identified</span>
                </>
              )}
            </span>

            {'speechSynthesis' in window && (
              <button
                type="button"
                onClick={toggleSpeech}
                title={isSpeaking ? t.stopAudio : t.audioGuide}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98 ${
                  isSpeaking
                    ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                    : 'bg-[#1e3a24] hover:bg-[#24452b] text-white border-[#1e3a24]'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? t.stopAudio : t.audioGuide}</span>
              </button>
            )}
          </div>
        </div>

        {/* Symptoms Description - STRICT LINE BY LINE FORMAT */}
        <div className="mt-4 p-4 rounded-xl bg-white border border-[#d2ddd0] shadow-2xs space-y-2">
          <div className="text-xs font-bold text-[#1c261b] flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>
              Visible Symptoms (Line by Line):
            </span>
          </div>

          <div className="space-y-1.5">
            {symptomLines.map((symptom, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1c261b] bg-[#f7f9f6] p-2.5 rounded-xl border border-[#d2ddd0] leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-[#edf5ec] border border-[#cfe0cb] text-[#1e3a24] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Navigation Tabs */}
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#f7f9f6] p-1.5 rounded-xl border border-[#d2ddd0]">
          <button
            type="button"
            onClick={() => setActiveTab('desi')}
            className={`flex-1 min-w-[120px] min-h-[44px] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'desi'
                ? 'bg-[#1e3a24] text-white shadow-xs'
                : 'text-[#556953] hover:text-[#1c261b] hover:bg-white'
            }`}
          >
            <Leaf className="w-4 h-4 shrink-0" />
            <span>{t.tabDesiRemedy}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spray')}
            className={`flex-1 min-w-[120px] min-h-[44px] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'spray'
                ? 'bg-[#1e3a24] text-white shadow-xs'
                : 'text-[#556953] hover:text-[#1c261b] hover:bg-white'
            }`}
          >
            <Droplets className="w-4 h-4 shrink-0" />
            <span>{t.tabSprayMedicine}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prevention')}
            className={`flex-1 min-w-[120px] min-h-[44px] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'prevention'
                ? 'bg-[#1e3a24] text-white shadow-xs'
                : 'text-[#556953] hover:text-[#1c261b] hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.tabPrevention}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('weather')}
            className={`flex-1 min-w-[120px] min-h-[44px] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'weather'
                ? 'bg-[#1e3a24] text-white shadow-xs'
                : 'text-[#556953] hover:text-[#1c261b] hover:bg-white'
            }`}
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>{t.tabWeather}</span>
          </button>
        </div>

        {/* Tab 1: Desi & Natural Remedies */}
        {activeTab === 'desi' && (
          <div className="space-y-3">
            <p className="text-xs text-[#556953] font-bold">
              {t.desiRemedyDesc}
            </p>
            <div className="space-y-2.5">
              {desiList.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#edf5ec] border border-[#cfe0cb] text-[#1c261b] text-xs sm:text-sm leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-full bg-[#1e3a24] text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Spray Medicine & Exact Dose */}
        {activeTab === 'spray' && (
          <div className="space-y-3">
            <p className="text-xs text-[#556953] font-bold">
              {t.sprayMedicineDesc}
            </p>
            {sprayList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {sprayList.map((spray, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#d2ddd0] space-y-3 text-xs shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#d2ddd0]">
                      <div>
                        <div className="text-[10px] text-[#556953] font-bold uppercase">
                          Medicine
                        </div>
                        <span className="font-bold text-[#1c261b] text-sm sm:text-base block">
                          {spray.medicineName}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#edf5ec] border border-[#cfe0cb] text-[#1e3a24] rounded-md shrink-0">
                        Approved
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-lg bg-[#f7f9f6] border border-[#d2ddd0] flex items-center justify-between">
                        <span className="text-[#556953] font-bold">
                          Dose:
                        </span>
                        <span className="font-bold text-[#1e3a24] font-mono text-xs sm:text-sm">
                          {spray.dose}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#f7f9f6] border border-[#d2ddd0] flex items-center justify-between text-[11px]">
                        <span className="text-[#556953] font-bold">
                          Safety Gap:
                        </span>
                        <span className="font-semibold text-[#1c261b]">{spray.safetyDays}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#fffcee] border border-[#f5e3ad] text-[#3a280c] text-xs leading-relaxed font-semibold">
                      💡 {spray.advice}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#edf5ec] text-[#1e3a24] rounded-xl text-center border border-[#cfe0cb] font-bold text-sm">
                🎉 {t.severityHealthy}! No chemical sprays required.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Prevention - STRICT LINE BY LINE */}
        {activeTab === 'prevention' && (
          <div className="space-y-3">
            <p className="text-xs text-[#556953] font-bold">
              {t.preventionDesc}
            </p>
            <div className="space-y-2">
              {preventionList.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] text-[#1c261b] text-xs sm:text-sm font-semibold"
                >
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 stroke-[3]" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Weather & Spray Advisory */}
        {activeTab === 'weather' && (
          <div className="p-4 sm:p-5 bg-[#fffcee] rounded-xl border border-[#f5e3ad] space-y-3 text-xs sm:text-sm text-[#3a280c]">
            <div className="flex items-center gap-2 font-bold text-[#3a280c] text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t.weatherAdvisoryTitle}</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-[#f5e3ad] text-[#1c261b] font-medium">
                <strong>Spray Window: </strong>
                {t.weatherAdvisoryDesc}
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#f5e3ad] text-[#1c261b] font-medium">
                <strong>Weather Trigger: </strong>
                {profile.favorableWeather.en}
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#d2ddd0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#556953] flex items-center gap-1.5 self-start sm:self-auto font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#556953]" />
            <span>
              Prepared for: <strong className="text-[#1c261b]">{displayName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
            {/* WhatsApp Share Button */}
            <button
              type="button"
              onClick={shareToWhatsApp}
              className="flex-1 sm:flex-initial min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1e3a24] hover:bg-[#24452b] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.shareWhatsApp}</span>
            </button>

            {/* Save Field Slip */}
            <button
              type="button"
              onClick={downloadReport}
              className="flex-1 sm:flex-initial min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#1c261b] bg-white hover:bg-[#f7f9f6] border border-[#d2ddd0] hover:border-[#1e3a24] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Download className="w-4 h-4 text-[#556953]" />
              <span>{t.saveSlipBtn}</span>
            </button>

            {/* Submit to Doctor */}
            {!isLogged ? (
              <button
                type="button"
                onClick={onSendToTriage}
                className="flex-1 sm:flex-initial min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#1c261b] bg-[#f7f9f6] hover:bg-[#edf5ec] border border-[#d2ddd0] hover:border-[#1e3a24] rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
              >
                <span>{t.submitToDoctorBtn}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 min-h-[48px]">
                <span className="text-xs font-bold text-[#1e3a24] flex items-center gap-1.5 bg-[#edf5ec] px-3.5 py-2.5 rounded-xl border border-[#cfe0cb]">
                  <CheckCircle2 className="w-4 h-4 text-[#1e3a24]" />
                  <span>{t.submittedSuccess}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveView('admin')}
                  className="text-xs font-bold text-[#1e3a24] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{t.recordsMode}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
