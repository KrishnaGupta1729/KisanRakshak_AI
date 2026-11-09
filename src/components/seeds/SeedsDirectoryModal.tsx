import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_SEEDS, SeedItem } from '../../data/allSeedsData';
import {
  Search,
  X,
  Layers,
  Calendar,
  Scale,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Tag,
  ArrowLeft,
  Check,
  Sprout,
  Info
} from 'lucide-react';
import { CropType } from '../../types';

interface SeedsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCropForScan?: (crop: CropType) => void;
}

// Curated crop image assets and high-res references
const CROP_IMAGES: Record<string, string> = {
  'seed-wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  'seed-rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
  'seed-basmati': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  'seed-cotton': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
  'seed-mustard': 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80',
  'seed-corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
  'seed-potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  'seed-chana': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
  'seed-tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  'seed-moong': 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
  'seed-sugarcane': 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
  'seed-barseem': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
};

const CROP_SHORT_DESCRIPTIONS: Record<string, string> = {
  'seed-wheat': 'High-yielding certified wheat varieties with strong yellow rust resistance and 22-28 quintals/acre yield potential.',
  'seed-rice': 'Short and medium duration certified paddy varieties for high grain recovery, bacterial blight tolerance, and maximum milling yield.',
  'seed-basmati': 'Premium aromatic long-grain certified basmati varieties with excellent cooking elongation and high export market value.',
  'seed-cotton': 'Bollworm-tolerant certified hybrid cotton varieties engineered for deep rooting, heat endurance, and heavy boll retention.',
  'seed-mustard': 'High-oil content (38-42%) certified raya and sarson varieties with white rust resistance and high cold tolerance.',
  'seed-corn': 'High-yielding hybrid maize varieties for food, feed, and silage with robust lodging resistance and big cob filling.',
  'seed-potato': 'Early and main-season certified seed tubers with uniform bulking, late blight resistance, and high processing quality.',
  'seed-chana': 'Drought-hardy certified desi and kabuli chickpea varieties with wilt resistance and high protein yield.',
  'seed-tomato': 'High-yielding hybrid tomato varieties with leaf curl virus tolerance, firm red fruits, and prolonged harvesting window.',
  'seed-moong': '60-day extra-early maturing certified summer and kharif moong varieties with yellow mosaic virus resistance.',
  'seed-sugarcane': 'High-sucrose certified cane varieties with early maturity, red rot resistance, and prolific ratooning capacity.',
  'seed-barseem': 'Multi-cut succulent green fodder clover providing high milk yield, rich protein (18-20%), and continuous winter cuts.'
};

const CATEGORY_LABELS: Record<string, string> = {
  cereals: 'Cereals',
  cash_crops: 'Cash Crops',
  oilseeds: 'Oilseeds',
  pulses: 'Pulses',
  vegetables: 'Vegetables',
  fodder: 'Fodder'
};

export const SeedsDirectoryModal: React.FC<SeedsDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCropForScan
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeed, setSelectedSeed] = useState<SeedItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Crops' },
    { id: 'cereals', label: '🌾 Cereals' },
    { id: 'cash_crops', label: '🎋 Cash Crops' },
    { id: 'oilseeds', label: '🌼 Oilseeds' },
    { id: 'pulses', label: '🫘 Pulses' },
    { id: 'vegetables', label: '🥔 Vegetables' },
    { id: 'fodder', label: '☘️ Fodder' }
  ];

  const filteredSeeds = useMemo(() => {
    return ALL_SEEDS.filter((seed) => {
      const matchCat = activeCategory === 'all' || seed.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;

      const matchSearch =
        seed.names.en.toLowerCase().includes(q) ||
        seed.season.en.toLowerCase().includes(q) ||
        (CATEGORY_LABELS[seed.category] || '').toLowerCase().includes(q) ||
        seed.varieties.some((v) => v.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#f7f9f6] rounded-2xl shadow-2xl max-w-6xl w-full border border-[#d2ddd0] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#1e3a24] via-[#24452b] to-[#1a3320] text-white flex items-center justify-between border-b border-[#1e3a24]/20 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 rounded-md bg-amber-400 text-stone-950 font-bold text-xs shadow-xs">
                Certified Crop Catalog
              </span>
              <span className="text-xs text-emerald-200">·</span>
              <span className="text-xs text-emerald-200 font-semibold">
                12 Major Crops & Certified Varieties
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
              {selectedSeed ? selectedSeed.names.en : 'All Crops & Certified Seeds Directory'}
            </h3>
            <p className="text-xs text-emerald-100 max-w-2xl font-medium">
              {selectedSeed
                ? 'Complete agronomy guide: seed rate, sowing windows, seed treatment, and yields'
                : 'Browse agricultural crops by category, inspect certified varieties, and review recommended sowing guidelines'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedSeed && (
              <button
                type="button"
                onClick={() => setSelectedSeed(null)}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Crops</span>
              </button>
            )}

            <button
              onClick={() => {
                setSelectedSeed(null);
                onClose();
              }}
              className="p-2 text-white/90 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
              title="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search and Category Filter Bar (Only shown in grid list mode) */}
        {!selectedSeed && (
          <div className="p-3.5 sm:p-4 bg-white border-b border-[#d2ddd0] space-y-3 shrink-0 shadow-2xs">
            {/* Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#556953] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, varieties, or season (e.g. Wheat, Basmati, DBW 187, PR 126, Mustard)..."
                className="w-full pl-10 pr-4 py-2.5 min-h-[46px] bg-[#f7f9f6] border border-[#d2ddd0] rounded-xl text-xs sm:text-sm text-[#1c261b] focus:outline-hidden focus:ring-2 focus:ring-[#1e3a24] focus:border-[#1e3a24] focus:bg-white shadow-xs font-semibold placeholder:text-[#556953]/70 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#556953] hover:text-[#1c261b] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Chips with Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 active:scale-98 ${
                      isActive
                        ? 'bg-[#1e3a24] text-white shadow-xs'
                        : 'bg-[#f7f9f6] border border-[#d2ddd0] text-[#1c261b] hover:bg-[#edf5ec] hover:border-[#1e3a24]'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f7f9f6]">
          {selectedSeed ? (
            /* Detailed View for Single Selected Crop */
            <div className="max-w-4xl mx-auto space-y-6 bg-white p-5 sm:p-8 rounded-2xl border border-[#d2ddd0] shadow-sm">
              {/* Back navigation & Quick Action Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#d2ddd0]">
                <button
                  type="button"
                  onClick={() => setSelectedSeed(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1e3a24] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to All Crop Cards</span>
                </button>

                {onSelectCropForScan && (
                  <button
                    type="button"
                    onClick={() => {
                      let targetCrop: CropType = 'Wheat';
                      if (selectedSeed.id === 'seed-wheat') targetCrop = 'Wheat';
                      else if (selectedSeed.id === 'seed-rice' || selectedSeed.id === 'seed-basmati') targetCrop = 'Rice';
                      else if (selectedSeed.id === 'seed-potato') targetCrop = 'Potato';
                      else if (selectedSeed.id === 'seed-tomato') targetCrop = 'Tomato';
                      else if (selectedSeed.id === 'seed-corn') targetCrop = 'Corn';

                      onSelectCropForScan(targetCrop);
                      setSelectedSeed(null);
                      onClose();
                    }}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1e3a24] hover:bg-[#24452b] active:scale-98 text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sprout className="w-4 h-4 text-white" />
                    <span>Select for Disease Diagnosis</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Title & Image Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-4 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-[#edf5ec] border border-[#d2ddd0] relative shadow-xs">
                  <img
                    src={CROP_IMAGES[selectedSeed.id] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'}
                    alt={selectedSeed.names.en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-xs font-bold bg-stone-900/80 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <span>{selectedSeed.icon}</span>
                    <span>{CATEGORY_LABELS[selectedSeed.category] || selectedSeed.category}</span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#edf5ec] text-[#1e3a24] border border-[#cfe0cb]">
                        {selectedSeed.season.en}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-black text-[#1c261b]">
                      {selectedSeed.names.en}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#556953] font-medium leading-relaxed">
                      {CROP_SHORT_DESCRIPTIONS[selectedSeed.id]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Sowing Parameters - Line by line cards */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>Key Sowing Parameters</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Seed Rate */}
                  <div className="p-3.5 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] flex items-start gap-3 text-xs sm:text-sm">
                    <Scale className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c261b] block font-bold">
                        Seed Rate (Per Acre):
                      </strong>
                      <span className="text-[#556953] font-medium">{selectedSeed.seedRatePerAcre.en}</span>
                    </div>
                  </div>

                  {/* Sowing Time */}
                  <div className="p-3.5 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] flex items-start gap-3 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c261b] block font-bold">
                        Optimal Sowing Time:
                      </strong>
                      <span className="text-[#556953] font-medium">{selectedSeed.sowingTime.en}</span>
                    </div>
                  </div>

                  {/* Spacing & Depth */}
                  <div className="p-3.5 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] flex items-start gap-3 text-xs sm:text-sm">
                    <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c261b] block font-bold">
                        Depth & Row Spacing:
                      </strong>
                      <span className="text-[#556953] font-medium">{selectedSeed.spacingAndDepth.en}</span>
                    </div>
                  </div>

                  {/* Expected Yield */}
                  <div className="p-3.5 rounded-xl bg-[#edf5ec] border border-[#cfe0cb] flex items-start gap-3 text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c261b] block font-bold">
                        Expected Average Yield:
                      </strong>
                      <span className="text-[#1e3a24] font-black">{selectedSeed.expectedYield.en}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certified Varieties (Line by line) */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Top Certified Varieties (Line by Line):</span>
                </h4>
                <div className="space-y-2">
                  {selectedSeed.varieties.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] text-xs sm:text-sm text-[#1c261b] flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#edf5ec] border border-[#cfe0cb] text-[#1e3a24] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {vIdx + 1}
                      </span>
                      <span className="font-semibold leading-relaxed">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seed Treatment Procedure (Line by line) */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Seed Treatment Procedure:</span>
                </h4>
                <div className="space-y-2">
                  {selectedSeed.seedTreatment.en.map((step, stIdx) => (
                    <div
                      key={stIdx}
                      className="p-3.5 rounded-xl bg-[#fffcee] border border-[#f5e3ad] text-xs sm:text-sm text-[#3a280c] leading-relaxed font-medium"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Field Precautions (Line by line) */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Key Field Precautions:</span>
                </h4>
                <div className="space-y-2">
                  {selectedSeed.keyTips.en.map((tip, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] text-xs sm:text-sm text-[#1c261b] leading-relaxed font-medium"
                    >
                      • {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* RESPONSIVE COLUMN-BASED GRID LAYOUT OF CROP CARDS */
            <div className="space-y-4">
              {/* Category indicator / Results count */}
              <div className="flex items-center justify-between text-xs text-[#556953] px-1 font-medium">
                <span>
                  Showing <strong className="text-[#1c261b]">{filteredSeeds.length}</strong> certified crops
                </span>
                <span className="text-[11px] text-[#556953]">
                  Tap View Details on any crop for full sowing guide
                </span>
              </div>

              {filteredSeeds.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#d2ddd0] p-12 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#edf5ec] text-[#1e3a24] flex items-center justify-center text-xl">
                    🌾
                  </div>
                  <h4 className="font-bold text-base text-[#1c261b]">No matching crops found</h4>
                  <p className="text-xs text-[#556953] max-w-sm mx-auto">
                    Try searching for another seed name, check for typos, or reset the category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 min-h-[44px] rounded-xl bg-[#1e3a24] hover:bg-[#24452b] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                /*
                 * Responsive Grid Layout Breakpoints:
                 * - Desktop / Large Laptop: 4 columns (xl:grid-cols-4)
                 * - Small Laptop: 3 columns (lg:grid-cols-3)
                 * - Tablet: 2 or 3 columns (sm:grid-cols-2 md:grid-cols-3)
                 * - Mobile: 2 compact columns (min-[420px]:grid-cols-2)
                 * - Very Small Mobile: 1 column (grid-cols-1)
                 */
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
                  {filteredSeeds.map((seed) => {
                    const imageUrl =
                      CROP_IMAGES[seed.id] ||
                      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80';
                    const hasImgErr = imageErrors[seed.id];
                    const categoryLabel = CATEGORY_LABELS[seed.category] || seed.category;
                    const shortDesc = CROP_SHORT_DESCRIPTIONS[seed.id] || 'Certified seed varieties with tested germination and high yield potential.';

                    return (
                      <div
                        key={seed.id}
                        className="bg-white rounded-2xl border border-[#d2ddd0] hover:border-[#1e3a24] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group p-3.5 sm:p-4.5 h-full"
                      >
                        <div>
                          {/* Crop Image with consistent aspect ratio */}
                          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#edf6ec] to-[#d2ddd0] relative mb-3 shadow-2xs">
                            {!hasImgErr ? (
                              <img
                                src={imageUrl}
                                alt={seed.names.en}
                                loading="lazy"
                                onError={() => setImageErrors((prev) => ({ ...prev, [seed.id]: true }))}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                                <span className="text-3xl mb-1">{seed.icon}</span>
                                <span className="text-[11px] font-bold text-[#1c261b]">{seed.names.en}</span>
                              </div>
                            )}

                            {/* Crop Category Badge (Top Left) */}
                            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                              <span>{seed.icon}</span>
                              <span>{categoryLabel}</span>
                            </div>

                            {/* Growing Season Badge (Bottom Right) */}
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-[#1e3a24] border border-[#cfe0cb] backdrop-blur-xs shadow-xs">
                              {seed.season.en}
                            </div>
                          </div>

                          {/* Crop Name */}
                          <h4 className="font-extrabold text-sm sm:text-base text-[#1c261b] group-hover:text-[#1e3a24] transition-colors line-clamp-1 leading-snug">
                            {seed.names.en}
                          </h4>

                          {/* Growing Season indicator */}
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#1e3a24] mt-0.5">
                            <Calendar className="w-3 h-3 text-[#1e3a24] shrink-0" />
                            <span className="truncate">{seed.season.en}</span>
                          </div>

                          {/* Short Description */}
                          <p className="text-xs text-[#556953] leading-relaxed line-clamp-2 sm:line-clamp-3 mt-2 font-normal">
                            {shortDesc}
                          </p>

                          {/* Variety and Yield Metrics Strip */}
                          <div className="mt-3 pt-2.5 border-t border-[#d2ddd0] flex items-center justify-between text-[11px] text-[#556953]">
                            <span className="font-semibold text-[#1c261b] truncate">
                              {seed.varieties.length} Certified Types
                            </span>
                            <span className="font-bold text-[#1e3a24] shrink-0 ml-1">
                              {seed.expectedYield.en.split(' ')[0]} Q/Acre
                            </span>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedSeed(seed)}
                          className="mt-3.5 w-full min-h-[44px] sm:min-h-[48px] rounded-xl bg-[#1e3a24] hover:bg-[#24452b] active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

