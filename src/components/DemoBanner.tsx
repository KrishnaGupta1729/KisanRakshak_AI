import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, PhoneCall } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { language, setLanguage, t } = useApp();

  if (dismissed) return null;

  return (
    <div className="bg-[#1e3a24] text-white px-3 py-2 sm:px-6 text-xs sm:text-sm border-b border-[#2d5234] shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded-md bg-white/15 text-white shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-bold text-amber-300 tracking-wide">
              Welcome Farmers!
            </span>
            <span className="text-white/95 font-medium">
              Upload or capture a leaf photo to get instant desi remedies and approved spray medicine.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded-xl transition-all shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Kisan Call Center: 1800-180-1551</span>
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 cursor-pointer transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
