import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  WeatherReport,
  POPULAR_LOCATIONS,
  LocationItem,
  REGIONAL_WEATHER_PRESETS
} from '../../data/weatherData';
import {
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  RefreshCw,
  Sun,
  LocateFixed,
  Search,
  History,
  Calendar,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';

const RECENT_STORAGE_KEY = 'agriscan_recent_locations_v2';

// Indic transliteration dictionary for Gurmukhi & Devanagari to Latin phonetic search
function transliterateIndicToLatin(input: string): string {
  const charMap: Record<string, string> = {
    // Gurmukhi vowels & consonants
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh',
    'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n',
    'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh',
    'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh',
    'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au',
    'ੰ': 'n', 'ੱ': '',

    // Devanagari vowels & consonants
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh',
    'न': 'n', 'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
    'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n'
  };

  let result = '';
  for (const ch of input) {
    result += charMap[ch] !== undefined ? charMap[ch] : ch;
  }
  return result;
}

export const WeatherWarningSection: React.FC = () => {
  const { language, t, currentWeather, setCurrentWeather, currentLocationName, setCurrentLocationName } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [recentLocations, setRecentLocations] = useState<LocationItem[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [POPULAR_LOCATIONS[0], POPULAR_LOCATIONS[1], POPULAR_LOCATIONS[4]];
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save recent locations to localStorage
  const saveRecentLocation = (loc: LocationItem) => {
    setRecentLocations((prev) => {
      const filtered = prev.filter((item) => item.id !== loc.id && item.name.toLowerCase() !== loc.name.toLowerCase());
      const updated = [loc, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Helper to build weather report object from Open-Meteo response
  const parseOpenMeteoResponse = (data: any, locName: string, stateName: string, lat: number, lon: number): WeatherReport => {
    const current = data.current || {};
    const daily = data.daily || {};

    const temp = Math.round(current.temperature_2m ?? 26);
    const humidity = Math.round(current.relative_humidity_2m ?? 60);
    const windSpeed = Math.round(current.wind_speed_10m ?? 9);
    const rainChance = Math.round(current.precipitation_probability ?? 5);

    let spraySuitability: 'optimal' | 'moderate' | 'unsafe' = 'optimal';
    if (rainChance > 40 || windSpeed > 15) {
      spraySuitability = 'unsafe';
    } else if (rainChance > 20 || windSpeed > 11 || humidity > 80) {
      spraySuitability = 'moderate';
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Build 3-day forecast items from daily arrays
    const dailyForecast = [];
    if (Array.isArray(daily.time) && daily.time.length >= 4) {
      const dayNames = [
        { en: 'Tomorrow', hi: 'कल', pa: 'ਕੱਲ੍ਹ' },
        { en: 'Day After', hi: 'परसों', pa: 'ਪਰਸੋਂ' },
        { en: 'In 3 Days', hi: '3 दिन बाद', pa: '3 ਦਿਨ ਬਾਅਦ' }
      ];

      for (let i = 1; i <= 3; i++) {
        const dRain = Math.round(daily.precipitation_probability_max?.[i] ?? 0);
        const dWind = Math.round(daily.wind_speed_10m_max?.[i] ?? 8);
        const dTempMax = Math.round(daily.temperature_2m_max?.[i] ?? temp);
        const dTempMin = Math.round(daily.temperature_2m_min?.[i] ?? temp - 8);

        let dCondition: 'optimal' | 'moderate' | 'unsafe' = 'optimal';
        if (dRain > 40 || dWind > 15) dCondition = 'unsafe';
        else if (dRain > 20 || dWind > 11) dCondition = 'moderate';

        dailyForecast.push({
          date: daily.time[i],
          dayName: dayNames[i - 1],
          tempMax: dTempMax,
          tempMin: dTempMin,
          rainChance: dRain,
          windSpeed: dWind,
          sprayCondition: dCondition,
          weatherCode: daily.weather_code?.[i]
        });
      }
    }

    const displayDistrict = stateName ? `${locName}, ${stateName}` : locName;

    return {
      city: locName,
      district: displayDistrict,
      state: stateName,
      latitude: lat,
      longitude: lon,
      temperature: temp,
      feelsLike: temp,
      condition: rainChance > 40 ? 'rainy' : windSpeed > 15 ? 'windy' : 'clear',
      humidity,
      windSpeed,
      rainChance,
      spraySuitability,
      localTime: timeStr,
      lastUpdated: timeStr,
      isCached: false,
      conditionText: {
        pa: rainChance > 40 ? 'ਮੀਂਹ ਦਾ ਖ਼ਦਸ਼ਾ' : windSpeed > 15 ? 'ਤੇਜ਼ ਹਵਾ' : 'ਸਾਫ਼ ਖੇਤੀ ਮੌਸਮ',
        hi: rainChance > 40 ? 'बारिश की आशंका' : windSpeed > 15 ? 'तेज हवा' : 'साफ व अनुकूल मौसम',
        en: rainChance > 40 ? 'Rain Likely' : windSpeed > 15 ? 'Breezy' : 'Clear & Favorable'
      },
      spraySuitabilityText: {
        pa:
          spraySuitability === 'optimal'
            ? 'ਸਪਰੇਅ ਲਈ ਮੌਸਮ ਬਿਲਕੁਲ ਸਹੀ ਹੈ (ਅਨੁਕੂਲ)'
            : spraySuitability === 'moderate'
            ? 'ਸਾਵਧਾਨੀ ਨਾਲ ਸਪਰੇਅ ਕਰੋ (ਸਿਰਫ਼ ਸ਼ਾਂਤ ਵੇਲੇ)'
            : 'ਅੱਜ ਸਪਰੇਅ ਨਾ ਕਰੋ (ਮੀਂਹ ਜਾਂ ਤੇਜ਼ ਹਵਾ ਦਾ ਖ਼ਤਰਾ)',
        hi:
          spraySuitability === 'optimal'
            ? 'छिड़काव के लिए मौसम उत्तम है'
            : spraySuitability === 'moderate'
            ? 'सावधानी से छिड़काव करें (शांत समय में)'
            : 'आज छिड़काव न करें (बारिश या तेज हवा)',
        en:
          spraySuitability === 'optimal'
            ? 'Optimal Weather for Spray'
            : spraySuitability === 'moderate'
            ? 'Moderate Condition (Spray with caution)'
            : 'Unsuitable for Spray (Rain or high wind risk)'
      },
      warnings: {
        pa: [
          rainChance > 30
            ? `ਮੀਂਹ ਦਾ ਖ਼ਦਸ਼ਾ ${rainChance}% ਹੈ — ਸਪਰੇਅ ਧੁਲਣ ਦਾ ਡਰ ਹੈ।`
            : 'ਅਗਲੇ ਕੁਝ ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਦਾ ਕੋਈ ਖ਼ਤਰਾ ਨਹੀਂ ਹੈ।',
          windSpeed > 15
            ? `ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ ${windSpeed} km/h ਤੇਜ਼ ਹੈ — ਦਵਾਈ ਉੱਡਣ ਦਾ ਖ਼ਤਰਾ ਹੈ।`
            : 'ਹਵਾ ਸ਼ਾਂਤ ਹੈ, ਦਵਾਈ ਸਿੱਧੀ ਪੱਤਿਆਂ ਉੱਤੇ ਟਿਕੇਗੀ।',
          humidity > 80
            ? `ਹਵਾ ਵਿੱਚ ਨਮੀ ${humidity}% ਹੈ — ਪੱਤਿਆਂ ਤੋਂ ਤਰੇਲ ਸੁੱਕਣ ਉਪਰੰਤ ਹੀ ਸਪਰੇਅ ਕਰੋ।`
            : 'ਨਮੀ ਸੰਤੁਲਿਤ ਹੈ, ਪੌਦੇ ਦਵਾਈ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੋਖਣਗੇ।'
        ],
        hi: [
          rainChance > 30
            ? `बारिश की संभावना ${rainChance}% है — दवा धुलने का खतरा है।`
            : 'अगले कुछ घंटों में बारिश का कोई खतरा नहीं है।',
          windSpeed > 15
            ? `हवा की गति ${windSpeed} km/h तेज है — दवा उड़ सकती है।`
            : 'हवा शांत है, दवा सीधे पत्तों पर टिकेगी।',
          humidity > 80
            ? `हवा में नमी ${humidity}% है — ओस सूखने के बाद ही छिड़काव करें।`
            : 'नमी सामान्य है, पौधा दवा को अच्छी तरह सोखेगा।'
        ],
        en: [
          rainChance > 30
            ? `Rain probability is ${rainChance}% — chemical wash-off risk.`
            : 'No significant rainfall expected in the coming hours.',
          windSpeed > 15
            ? `Wind speed is ${windSpeed} km/h — spray drift warning.`
            : 'Wind is calm and ideal for targeted application.',
          humidity > 80
            ? `Relative humidity is ${humidity}% — spray only after morning dew dries.`
            : 'Optimal humidity level for systemic crop absorption.'
        ]
      },
      recommendedSprayWindow: {
        pa: [
          'ਸਵੇਰੇ 8:00 ਤੋਂ 10:30 ਵਜੇ (ਤਰੇਲ ਸੁੱਕਣ ਤੋਂ ਬਾਅਦ)',
          'ਸ਼ਾਮ 4:00 ਤੋਂ 6:30 ਵਜੇ (ਠੰਢੇ ਤੇ ਸ਼ਾਂਤ ਵੇਲੇ)',
          'ਦੁਪਹਿਰ 12 ਤੋਂ 3 ਵਜੇ ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਸਪਰੇਅ ਕਦੇ ਨਾ ਕਰੋ'
        ],
        hi: [
          'सुबह 8:00 से 10:30 बजे (ओस सूखने के बाद)',
          'शाम 4:00 से 6:30 बजे (ठंडे और शांत समय)',
          'दोपहर 12 से 3 बजे तेज धूप में छिड़काव कभी न करें'
        ],
        en: [
          'Morning slot: 8:00 AM – 10:30 AM (after dew evaporates)',
          'Evening slot: 4:00 PM – 6:30 PM (cooler, calm wind)',
          'Avoid midday 12:00 PM – 3:00 PM under strong sunlight'
        ]
      },
      stepByStepPrecautions: {
        pa: [
          '1. ਨੋਜ਼ਲ ਨੂੰ ਪੱਤਿਆਂ ਤੋਂ 1.5 ਫੁੱਟ ਉੱਤੇ ਰੱਖ ਕੇ ਇਕਸਾਰ ਸਪਰੇਅ ਕਰੋ।',
          '2. ਪੱਤਿਆਂ ਦੇ ਹੇਠਲੇ ਪਾਸੇ ਵੀ ਸਪਰੇਅ ਲੱਗਣ ਦਿਓ ਜਿੱਥੇ ਕੀੜੇ ਲੁਕਦੇ ਹਨ।',
          '3. ਸਪਰੇਅ ਮਗਰੋਂ ਹੱਥ ਸਾਬਣ ਨਾਲ ਧੋਵੋ ਅਤੇ ਮੂੰਹ ਤੇ ਮਾਸਕ ਜ਼ਰੂਰ ਰੱਖੋ।'
        ],
        hi: [
          '1. नोजल को पत्तों से 1.5 फीट ऊपर रखकर एक समान छिड़काव करें।',
          '2. पत्तों के निचले हिस्से पर भी दवा पहुंचाएं जहां कीट छिपते हैं।',
          '3. छिड़काव के बाद हाथ साबुन से धोएं और मुंह पर कपड़ा जरूर रखें।'
        ],
        en: [
          '1. Maintain nozzle at 1.5 feet distance above the crop canopy.',
          '2. Ensure thorough coverage under the leaves where pests shelter.',
          '3. Wear a face mask and thoroughly wash hands after spraying.'
        ]
      },
      dailyForecast
    };
  };

  // Fetch live weather from Open-Meteo for given coordinates
  const fetchWeatherForCoords = async (lat: number, lon: number, locName: string, stateName: string) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=4`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');

      const data = await res.json();
      const report = parseOpenMeteoResponse(data, locName, stateName, lat, lon);

      setCurrentWeather(report);
      setCurrentLocationName(report.district);

      saveRecentLocation({
        id: `${lat.toFixed(2)}_${lon.toFixed(2)}`,
        name: locName,
        district: locName,
        state: stateName,
        lat,
        lon,
        labels: {
          en: `${locName}, ${stateName}`,
          hi: `${locName} (${stateName})`,
          pa: `${locName} (${stateName})`
        }
      });
    } catch (err) {
      console.warn('Weather fetch failed, falling back to cached weather', err);
      // Fallback to existing cached weather
      setCurrentWeather({
        ...currentWeather,
        isCached: true
      });
    }
  };

  // 1. GPS Location Detection
  const handleUseMyCurrentLocation = () => {
    setGpsError(null);
    setIsDetectingGps(true);

    if (!navigator.geolocation) {
      setIsDetectingGps(false);
      setGpsError(t.locationPermissionDenied);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let detectedName = 'My Village';
        let detectedState = 'India';

        try {
          // Reverse geocoding via Nominatim OpenStreetMap (free, high precision)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const addr = geoData.address || {};
            detectedName = addr.village || addr.town || addr.suburb || addr.city || addr.hamlet || 'Farm Location';
            detectedState = addr.state || addr.state_district || 'Punjab';
          }
        } catch {
          detectedName = `GPS Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`;
        }

        await fetchWeatherForCoords(latitude, longitude, detectedName, detectedState);
        setIsDetectingGps(false);
      },
      () => {
        setIsDetectingGps(false);
        setGpsError(t.locationPermissionDenied);
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // 2. Search Autocomplete: As farmer types, fetch suggestions from Open-Meteo Geocoding
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 3) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Transliterate if Hindi or Punjabi script
        const latinQuery = transliterateIndicToLatin(trimmed);

        // 1. Check local popular locations matching
        const localMatches = POPULAR_LOCATIONS.filter((item) => {
          const q = trimmed.toLowerCase();
          const lq = latinQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(lq) ||
            item.state.toLowerCase().includes(lq) ||
            item.labels.hi.toLowerCase().includes(q) ||
            item.labels.pa.toLowerCase().includes(q)
          );
        });

        // 2. Fetch from Open-Meteo Geocoding API restricted to India
        const queryToFetch = encodeURIComponent(latinQuery || trimmed);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${queryToFetch}&count=8&language=en&country_code=IN`
        );

        let remoteItems: LocationItem[] = [];
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            remoteItems = data.results.map((r: any) => ({
              id: String(r.id),
              name: r.name,
              district: r.admin2 ? r.admin2.replace(' district', '') : r.name,
              state: r.admin1 || 'India',
              lat: r.latitude,
              lon: r.longitude,
              labels: {
                en: `${r.name}, ${r.admin2 || ''} ${r.admin1 || 'India'}`.replace(/\s+/g, ' ').trim(),
                hi: `${r.name} (${r.admin1 || 'भारत'})`,
                pa: `${r.name} (${r.admin1 || 'ਭਾਰਤ'})`
              }
            }));
          }
        }

        // Combine unique results
        const combined = [...localMatches];
        for (const r of remoteItems) {
          if (!combined.some((c) => c.name.toLowerCase() === r.name.toLowerCase())) {
            combined.push(r);
          }
        }

        setSearchResults(combined.slice(0, 8));
        setIsDropdownOpen(true);
      } catch (e) {
        console.warn('Geocoding search error:', e);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle selecting a suggested location
  const handleSelectLocation = async (loc: LocationItem) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    setGpsError(null);
    await fetchWeatherForCoords(loc.lat, loc.lon, loc.name, loc.state);
  };

  // Refresh current location weather
  const handleRefresh = async () => {
    setIsRefreshing(true);
    const lat = currentWeather.latitude || 30.9010;
    const lon = currentWeather.longitude || 75.8573;
    const locName = currentWeather.city || 'Ludhiana';
    const stateName = currentWeather.state || 'Punjab';
    await fetchWeatherForCoords(lat, lon, locName, stateName);
    setIsRefreshing(false);
  };

  const getSuitabilityHeader = () => {
    if (weather.spraySuitability === 'optimal') {
      return {
        bg: 'bg-[#edf5ec] border-[#cfe0cb] text-[#1c261b]',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />,
        badge: 'bg-[#1e3a24] text-white',
        statusText: 'Safe to Spray'
      };
    } else if (weather.spraySuitability === 'moderate') {
      return {
        bg: 'bg-[#fffcee] border-[#f5e3ad] text-[#1c261b]',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        badge: 'bg-amber-600 text-white',
        statusText: 'Spray with Caution'
      };
    } else {
      return {
        bg: 'bg-red-50 border-red-200 text-[#1c261b]',
        icon: <XCircle className="w-5 h-5 text-red-700 shrink-0" />,
        badge: 'bg-red-700 text-white',
        statusText: 'Unsafe / High Risk'
      };
    }
  };

  const weather = currentWeather;
  const suitabilityHeader = getSuitabilityHeader();

  return (
    <div className="bg-white rounded-2xl border border-[#d2ddd0] p-5 sm:p-6 shadow-sm space-y-5">
      {/* 1. Header with GPS Location & Search Any Village / Town */}
      <div className="space-y-3 pb-4 border-b border-[#d2ddd0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-[#edf6ec] text-[#1e3a24] border border-[#cfe0cb]">
              <Sun className="w-5 h-5 text-[#1e3a24]" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1c261b] leading-tight">
                Live Field Weather & Spray Warnings
              </h3>
              <p className="text-xs text-[#556953] font-medium">
                Accurate wind, rain & dew inspection — Actionable line-by-line guide
              </p>
            </div>
          </div>

          {/* Time & Refresh Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#556953] font-medium">
            <span className="flex items-center gap-1.5 bg-[#f7f9f6] border border-[#d2ddd0] px-3 py-2 rounded-xl font-mono text-[#1c261b]">
              <Clock className="w-3.5 h-3.5 text-[#1e3a24]" />
              <span>{weather.localTime || '11:00 AM'}</span>
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="min-h-[40px] px-3.5 rounded-xl bg-white hover:bg-[#f7f9f6] border border-[#d2ddd0] hover:border-[#1e3a24] text-[#1c261b] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-98"
              title={t.refreshWeather}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#1e3a24] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline font-bold">Refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar + Use My Current Location Button */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-1">
          {/* Use My Current Location GPS Button */}
          <button
            type="button"
            onClick={handleUseMyCurrentLocation}
            disabled={isDetectingGps}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#1e3a24] hover:bg-[#24452b] active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <LocateFixed className={`w-4 h-4 text-white ${isDetectingGps ? 'animate-spin' : ''}`} />
            <span>{isDetectingGps ? t.fetchingLocation : t.useMyCurrentLocation}</span>
          </button>

          {/* Search Any Village or Town Box */}
          <div ref={searchContainerRef} className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#556953] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsDropdownOpen(true);
                }}
                placeholder={t.searchLocationPlaceholder}
                className="w-full bg-[#f7f9f6] hover:bg-white focus:bg-white border border-[#d2ddd0] focus:border-[#1e3a24] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#1c261b] placeholder:text-[#556953]/70 focus:outline-hidden focus:ring-2 focus:ring-[#1e3a24]/20 shadow-2xs transition-all min-h-[48px]"
              />
              {isSearching && (
                <RefreshCw className="w-4 h-4 text-[#1e3a24] animate-spin absolute right-3" />
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isDropdownOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#d2ddd0] shadow-xl z-30 max-h-64 overflow-y-auto overflow-x-hidden divide-y divide-[#d2ddd0]">
                {searchResults.map((item) => (
                  <button
                    key={`${item.id}-${item.name}`}
                    type="button"
                    onClick={() => handleSelectLocation(item)}
                    className="w-full p-3.5 text-left hover:bg-[#edf5ec] transition-colors flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="w-4 h-4 text-[#1e3a24] shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#1c261b] truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#556953] truncate">
                          {item.district}, {item.state}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#556953] shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* GPS Permission Denied / Error Friendly Message */}
        {gpsError && (
          <div className="p-3 text-xs bg-[#fffcee] border border-[#f5e3ad] text-[#3a280c] rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-bold">{gpsError}</span>
            </div>
            <button
              type="button"
              onClick={() => setGpsError(null)}
              className="text-[#3a280c] hover:text-black font-bold px-2 py-0.5 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Showing Cached Data Notice */}
        {weather.isCached && (
          <div className="p-2.5 px-3.5 bg-[#f7f9f6] border border-[#d2ddd0] text-[#556953] text-xs rounded-xl flex items-center justify-between gap-2">
            <span className="font-semibold">⚠️ {t.showingCached} ({weather.lastUpdated})</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-[#1e3a24] font-bold hover:underline cursor-pointer"
            >
              {t.refreshWeather}
            </button>
          </div>
        )}

        {/* 2. Recent Locations Chips */}
        {recentLocations.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold text-[#556953] flex items-center gap-1">
              <History className="w-3.5 h-3.5 text-[#1e3a24]" />
              <span>{t.recentLocations}:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {recentLocations.map((loc) => {
                const isActive = weather.district.toLowerCase().includes(loc.name.toLowerCase());
                return (
                  <button
                    key={`recent-${loc.id}-${loc.name}`}
                    type="button"
                    onClick={() => handleSelectLocation(loc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                      isActive
                        ? 'bg-[#1e3a24] text-white shadow-xs'
                        : 'bg-[#f7f9f6] hover:bg-[#edf5ec] text-[#1c261b] border border-[#d2ddd0]'
                    }`}
                  >
                    <span>{loc.name}</span>
                    {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Popular Locations Chips */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-[#556953] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.popularLocations} (20):</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto p-1.5 bg-[#f7f9f6] rounded-2xl border border-[#d2ddd0]">
            {POPULAR_LOCATIONS.map((loc) => {
              const isActive = weather.district.toLowerCase().includes(loc.name.toLowerCase());
              const label = loc.labels.en;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                    isActive
                      ? 'bg-[#1e3a24] text-white shadow-xs ring-1 ring-[#1e3a24]'
                      : 'bg-white hover:bg-[#edf5ec] text-[#1c261b] border border-[#d2ddd0] hover:border-[#1e3a24]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Temperature */}
        <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2ddd0] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#556953]">
            <span>Temperature</span>
            <Thermometer className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-[#1c261b] font-mono">
            {weather.temperature}°C
          </div>
          <div className="text-[11px] text-[#556953] font-medium">
            {weather.conditionText.en}
          </div>
        </div>

        {/* Rain Probability */}
        <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2ddd0] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#556953]">
            <span>Rain Chance</span>
            <CloudRain className="w-4 h-4 text-blue-600" />
          </div>
          <div className={`text-2xl font-black font-mono ${weather.rainChance > 40 ? 'text-red-700' : 'text-[#1c261b]'}`}>
            {weather.rainChance}%
          </div>
          <div className="text-[11px] font-medium text-[#556953]">
            {weather.rainChance > 40
              ? 'High Risk'
              : 'Dry Weather'}
          </div>
        </div>

        {/* Wind Speed */}
        <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2ddd0] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#556953]">
            <span>Wind Speed</span>
            <Wind className="w-4 h-4 text-teal-700" />
          </div>
          <div className={`text-2xl font-black font-mono ${weather.windSpeed > 15 ? 'text-red-700' : 'text-[#1c261b]'}`}>
            {weather.windSpeed} <span className="text-xs font-sans text-[#556953]">km/h</span>
          </div>
          <div className="text-[11px] font-medium text-[#556953]">
            {weather.windSpeed > 15
              ? 'Windy'
              : 'Calm Wind'}
          </div>
        </div>

        {/* Humidity */}
        <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2ddd0] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#556953]">
            <span>Humidity</span>
            <Droplets className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-[#1c261b] font-mono">
            {weather.humidity}%
          </div>
          <div className="text-[11px] font-medium text-[#556953]">
            {weather.humidity > 80
              ? 'High Dew'
              : 'Normal'}
          </div>
        </div>
      </div>

      {/* Spray Suitability Status Banner */}
      <div className={`p-4 rounded-2xl border ${suitabilityHeader.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs`}>
        <div className="flex items-center gap-3">
          {suitabilityHeader.icon}
          <div>
            <div className="text-xs font-bold text-[#556953]">
              Today Spray Condition:
            </div>
            <div className="text-base sm:text-lg font-extrabold text-[#1c261b] flex items-center gap-2">
              <span>{weather.spraySuitabilityText.en}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${suitabilityHeader.badge} font-bold`}>
                {suitabilityHeader.statusText}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs font-extrabold text-[#556953] px-3 py-1 bg-white rounded-xl border border-[#d2ddd0] self-start sm:self-auto">
          📍 {weather.district}
        </span>
      </div>

      {/* 4. 3-DAY SPRAY FORECAST ROW */}
      {weather.dailyForecast && weather.dailyForecast.length > 0 && (
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{t.threeDayForecast}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {weather.dailyForecast.map((day, dIdx) => {
              const isSafe = day.sprayCondition === 'optimal';
              const isCaution = day.sprayCondition === 'moderate';

              return (
                <div
                  key={dIdx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSafe
                      ? 'bg-[#edf5ec] border-[#cfe0cb]'
                      : isCaution
                      ? 'bg-[#fffcee] border-[#f5e3ad]'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-black/10">
                    <span className="font-bold text-xs sm:text-sm text-[#1c261b]">
                      {day.dayName[language] || day.dayName.en}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1 ${
                        isSafe
                          ? 'bg-emerald-700 text-white'
                          : isCaution
                          ? 'bg-amber-600 text-white'
                          : 'bg-red-700 text-white'
                      }`}
                    >
                      {isSafe ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                          <span>{t.spraySafe}</span>
                        </>
                      ) : isCaution ? (
                        <>
                          <AlertTriangle className="w-3 h-3 stroke-[3]" />
                          <span>{t.sprayCaution}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 stroke-[3]" />
                          <span>{t.sprayUnsafe}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c261b]">
                      <CloudRain className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-mono font-bold">{day.rainChance}%</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#1c261b]">
                      <Wind className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="font-mono font-bold">{day.windSpeed} km/h</span>
                    </div>

                    <div className="col-span-2 text-[11px] text-[#556953] font-semibold">
                      {day.tempMin}°C – {day.tempMax}°C
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weather Warnings */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Active Weather Warnings (Line by Line)</span>
        </h4>

        <div className="space-y-2">
          {weather.warnings.en.map((warn, wIdx) => (
            <div
              key={wIdx}
              className="p-3.5 rounded-xl bg-[#fffcee] border border-[#f5e3ad] flex items-start gap-2.5 text-xs sm:text-sm text-[#3a280c]"
            >
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                !
              </span>
              <span className="font-semibold leading-relaxed text-[#1c261b]">{warn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Spray Time Slots */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c261b] flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>Best Spraying Time Slots</span>
        </h4>

        <div className="space-y-2">
          {weather.recommendedSprayWindow.en.map((slot, sIdx) => (
            <div
              key={sIdx}
              className="p-3.5 rounded-xl bg-[#edf5ec] border border-[#cfe0cb] flex items-start gap-2.5 text-xs sm:text-sm text-[#1c261b]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{slot}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Precise Precautions */}
      <div className="space-y-2 pt-3 border-t border-[#d2ddd0]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c261b]">
          Key Spraying Rules in Field
        </h4>

        <div className="space-y-2">
          {weather.stepByStepPrecautions.en.map((prec, pIdx) => (
            <div
              key={pIdx}
              className="p-3.5 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] flex items-start gap-3 text-xs sm:text-sm text-[#1c261b]"
            >
              <span className="w-6 h-6 rounded-full bg-[#1e3a24] text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                {pIdx + 1}
              </span>
              <span className="leading-relaxed font-medium">{prec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
