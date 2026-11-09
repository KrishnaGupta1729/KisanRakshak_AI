import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, t } = useApp();

  return (
    <footer className="mt-16 border-t border-[#d2ddd0] bg-white py-8 text-xs text-[#556953]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#556953] font-medium">
            <Sprout className="w-5 h-5 text-[#1e3a24]" />
            <span className="font-bold text-[#1c261b]">{t.appName}</span>
            <span aria-hidden="true">·</span>
            <span>{t.appTagline}</span>
          </div>

          <div className="flex items-center gap-2 text-[#1c261b] text-xs">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">Kisan Helpline: 1800-180-1551 (Toll Free)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#d2ddd0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#556953] text-[11px]">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              Kisan Call Center Toll Free: 1800-180-1551 (Daily 6:00 AM - 10:00 PM)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveView('farmer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1e3a24] transition-colors cursor-pointer font-bold"
            >
              {t.farmerMode}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1e3a24] transition-colors cursor-pointer font-bold"
            >
              {t.recordsMode}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
