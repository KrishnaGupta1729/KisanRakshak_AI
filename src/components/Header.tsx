import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, PhoneCall, Mic } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    setActiveView,
    t,
    openVoiceAssistant,
    openSeedsModal
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#d2ddd0] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 sm:py-0 sm:h-20">
          {/* Logo & Farmer Brand */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveView('farmer')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1e3a24] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/20 group-hover:bg-[#24452b] transition-colors">
                <Sprout className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1c261b] group-hover:text-emerald-800 transition-colors block leading-tight">
                  {t.appName}
                </span>
                <span className="text-xs sm:text-sm text-[#556953] font-medium block">
                  {t.appTagline}
                </span>
              </div>
            </button>

            {/* Mobile quick actions */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={openVoiceAssistant}
                className="h-11 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-bold flex items-center gap-1.5 text-xs shadow-xs transition-all cursor-pointer"
                title="AgriScan Assistant"
              >
                <Mic className="w-4 h-4 animate-pulse" />
                <span>Assistant</span>
              </button>

              <button
                type="button"
                onClick={openSeedsModal}
                className="h-11 px-3.5 rounded-xl bg-white text-[#1e3a24] font-bold text-xs border border-[#cfe0cb] active:scale-98 cursor-pointer"
              >
                🌾 Crops
              </button>
            </div>
          </div>

          {/* Controls: AgriScan Assistant + Seeds Guide */}
          <div className="hidden sm:flex items-center justify-end gap-3 flex-wrap">
            {/* AgriScan Voice Assistant Button */}
            <button
              type="button"
              onClick={openVoiceAssistant}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-amber-500/30"
            >
              <Mic className="w-4 h-4 text-stone-950 animate-pulse" />
              <span>AgriScan Assistant</span>
            </button>

            {/* All Seeds Guide Button */}
            <button
              type="button"
              onClick={openSeedsModal}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-[#edf5ec] text-[#1c261b] hover:text-emerald-950 border border-[#d2ddd0] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
            >
              <Sprout className="w-4 h-4 text-emerald-800" />
              <span>All Crops & Seeds Guide</span>
            </button>

            {/* Helpline quick button on desktop */}
            <a
              href="tel:18001801551"
              className="hidden lg:flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#edf5ec] hover:bg-[#cfe0cb] border border-[#cfe0cb] text-[#1e3a24] text-sm font-bold transition-all active:scale-98"
              title="Kisan Call Center 1800-180-1551"
            >
              <PhoneCall className="w-4 h-4 text-emerald-800" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
