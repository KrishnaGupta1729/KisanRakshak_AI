import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocalizedDisease } from '../../data/localizedDiseases';
import { Sparkles, Check, Sprout } from 'lucide-react';

interface SamplePresetsProps {
  onSelectSample: (profile: LocalizedDisease) => void;
  selectedId?: string;
}

const PresetCard: React.FC<{
  profile: LocalizedDisease;
  isSelected: boolean;
  onSelect: () => void;
  language: 'pa' | 'hi' | 'en';
  cropName: string;
}> = ({ profile, isSelected, onSelect, language, cropName }) => {
  const [imgError, setImgError] = useState(false);
  const diseaseName = profile.names[language] || profile.names.en;

  const cropIcons: Record<string, string> = {
    Wheat: '🌾',
    Rice: '🌱',
    Potato: '🥔',
    Tomato: '🍅',
    Corn: '🌽'
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left p-3 rounded-xl border transition-all cursor-pointer bg-white hover:bg-[#f7f9f6] overflow-hidden relative flex flex-col justify-between min-h-[160px] active:scale-98 ${
        isSelected
          ? 'border-emerald-700 ring-2 ring-emerald-700/25 bg-[#edf6ec] shadow-xs'
          : 'border-[#d2ddd0] hover:border-emerald-600'
      }`}
    >
      <div>
        <div className="aspect-4/3 w-full rounded-lg overflow-hidden bg-gradient-to-br from-[#edf6ec] to-[#d2ddd0] mb-2 relative shadow-2xs flex items-center justify-center">
          {!imgError ? (
            <img
              src={profile.sampleImageUrl}
              alt={diseaseName}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-[#edf6ec] flex flex-col items-center justify-center p-2 text-center">
              <span className="text-3xl mb-1">{cropIcons[profile.crop] || '🌿'}</span>
              <span className="text-[10px] font-bold text-[#1c261b]">{profile.crop}</span>
            </div>
          )}

          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-white backdrop-blur-xs">
            {cropName.split(' ')[0]}
          </div>

          {isSelected && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1e3a24] text-white flex items-center justify-center shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#1c261b] line-clamp-1 group-hover:text-[#1e3a24] transition-colors">
            {diseaseName}
          </h4>
          <div className="text-[10px] text-[#556953] font-mono italic line-clamp-1">
            {profile.scientificName}
          </div>
        </div>
      </div>

      <div className="mt-2 pt-1.5 border-t border-[#d2ddd0] flex items-center justify-between text-[10px] text-[#556953] font-medium">
        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
          <Sprout className="w-3 h-3" />
          <span>Sample Leaf</span>
        </span>
        <span className="text-[#556953] font-bold group-hover:text-[#1e3a24]">
          Select &rarr;
        </span>
      </div>
    </button>
  );
};

export const SamplePresets: React.FC<SamplePresetsProps> = ({ onSelectSample, selectedId }) => {
  const { language, t, localizedProfiles } = useApp();

  return (
    <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#d2ddd0] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <label className="text-xs sm:text-sm font-bold text-[#1c261b] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>{t.quickSampleNotice}</span>
        </label>
        <span className="text-xs text-[#556953] font-medium">{t.quickSampleDesc}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {localizedProfiles.slice(0, 4).map((profile) => {
          const isSelected = selectedId === profile.id;
          const cropName = t.crops[profile.crop as keyof typeof t.crops] || profile.crop;

          return (
            <PresetCard
              key={profile.id}
              profile={profile}
              isSelected={isSelected}
              onSelect={() => onSelectSample(profile)}
              language={language}
              cropName={cropName}
            />
          );
        })}
      </div>
    </div>
  );
};
