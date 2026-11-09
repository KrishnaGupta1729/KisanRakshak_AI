import { Language } from './translations';

export interface DailyForecastItem {
  date: string;
  dayName: Record<Language, string>;
  tempMax: number;
  tempMin: number;
  rainChance: number;
  windSpeed: number;
  sprayCondition: 'optimal' | 'moderate' | 'unsafe';
  weatherCode?: number;
}

export interface WeatherReport {
  city: string;
  district: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  temperature: number; // in Celsius
  feelsLike: number;
  condition: 'clear' | 'cloudy' | 'rainy' | 'foggy' | 'windy';
  conditionText: Record<Language, string>;
  humidity: number; // percentage
  windSpeed: number; // km/h
  rainChance: number; // percentage
  spraySuitability: 'optimal' | 'moderate' | 'unsafe';
  spraySuitabilityText: Record<Language, string>;
  lastUpdated?: string;
  localTime?: string;
  isCached?: boolean;
  
  // Strict line-by-line warnings & recommendations
  warnings: Record<Language, string[]>;
  recommendedSprayWindow: Record<Language, string[]>;
  stepByStepPrecautions: Record<Language, string[]>;

  // 3-Day Forecast
  dailyForecast?: DailyForecastItem[];
}

export interface LocationItem {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lon: number;
  labels: Record<Language, string>;
}

// 20 Popular Agricultural Areas across India
export const POPULAR_LOCATIONS: LocationItem[] = [
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    district: 'Ludhiana',
    state: 'Punjab',
    lat: 30.9010,
    lon: 75.8573,
    labels: {
      en: 'Ludhiana, Punjab',
      hi: 'लुधियाना (पंजाब)',
      pa: 'ਲੁਧਿਆਣਾ (ਪੰਜਾਬ)'
    }
  },
  {
    id: 'bathinda',
    name: 'Bathinda',
    district: 'Bathinda',
    state: 'Punjab',
    lat: 30.2110,
    lon: 74.9455,
    labels: {
      en: 'Bathinda, Punjab',
      hi: 'बठिंडा (पंजाब)',
      pa: 'ਬਠਿੰਡਾ (ਪੰਜਾਬ)'
    }
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    district: 'Amritsar',
    state: 'Punjab',
    lat: 31.6340,
    lon: 74.8723,
    labels: {
      en: 'Amritsar, Punjab',
      hi: 'अमृतसर (पंजाब)',
      pa: 'ਅੰਮ੍ਰਿਤਸਰ (ਪੰਜਾਬ)'
    }
  },
  {
    id: 'moga',
    name: 'Moga',
    district: 'Moga',
    state: 'Punjab',
    lat: 30.8165,
    lon: 75.1715,
    labels: {
      en: 'Moga, Punjab',
      hi: 'मोगा (पंजाब)',
      pa: 'ਮੋਗਾ (ਪੰਜਾਬ)'
    }
  },
  {
    id: 'karnal',
    name: 'Karnal',
    district: 'Karnal',
    state: 'Haryana',
    lat: 29.6857,
    lon: 76.9905,
    labels: {
      en: 'Karnal, Haryana',
      hi: 'करनाल (हरियाणा)',
      pa: 'ਕਰਨਾਲ (ਹਰਿਆਣਾ)'
    }
  },
  {
    id: 'hisar',
    name: 'Hisar',
    district: 'Hisar',
    state: 'Haryana',
    lat: 29.1492,
    lon: 75.7217,
    labels: {
      en: 'Hisar, Haryana',
      hi: 'हिसार (हरियाणा)',
      pa: 'ਹਿਸਾਰ (ਹਰਿਆਣਾ)'
    }
  },
  {
    id: 'ambala',
    name: 'Ambala',
    district: 'Ambala',
    state: 'Haryana',
    lat: 30.3782,
    lon: 76.7767,
    labels: {
      en: 'Ambala, Haryana',
      hi: 'अम्बाला (हरियाणा)',
      pa: 'ਅੰਬਾਲਾ (ਹਰਿਆਣਾ)'
    }
  },
  {
    id: 'nashik',
    name: 'Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 19.9975,
    lon: 73.7898,
    labels: {
      en: 'Nashik, Maharashtra',
      hi: 'नासिक (महाराष्ट्र)',
      pa: 'ਨਾਸਿਕ (ਮਹਾਰਾਸ਼ਟਰ)'
    }
  },
  {
    id: 'pune',
    name: 'Pune',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lon: 73.8567,
    labels: {
      en: 'Pune, Maharashtra',
      hi: 'पुणे (महाराष्ट्र)',
      pa: 'ਪੁਣੇ (ਮਹਾਰਾਸ਼ਟਰ)'
    }
  },
  {
    id: 'guntur',
    name: 'Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lon: 80.4365,
    labels: {
      en: 'Guntur, Andhra Pradesh',
      hi: 'गुंटूर (आंध्र प्रदेश)',
      pa: 'ਗੁੰਟੂਰ (ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼)'
    }
  },
  {
    id: 'warangal',
    name: 'Warangal',
    district: 'Warangal',
    state: 'Telangana',
    lat: 17.9689,
    lon: 79.5941,
    labels: {
      en: 'Warangal, Telangana',
      hi: 'वारंगल (तेलंगाना)',
      pa: 'ਵਰੰਗਲ (ਤੇਲੰਗਾਨਾ)'
    }
  },
  {
    id: 'indore',
    name: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    lat: 22.7196,
    lon: 75.8577,
    labels: {
      en: 'Indore, Madhya Pradesh',
      hi: 'इंदौर (मध्य प्रदेश)',
      pa: 'ਇੰਦੌਰ (ਮੱਧ ਪ੍ਰਦੇਸ਼)'
    }
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    lat: 23.2599,
    lon: 77.4126,
    labels: {
      en: 'Bhopal, Madhya Pradesh',
      hi: 'भोपाल (मध्य प्रदेश)',
      pa: 'ਭੋਪਾਲ (ਮੱਧ ਪ੍ਰਦੇਸ਼)'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    district: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.9124,
    lon: 75.7873,
    labels: {
      en: 'Jaipur, Rajasthan',
      hi: 'जयपुर (राजस्थान)',
      pa: 'ਜੈਪੁਰ (ਰਾਜਸਥਾਨ)'
    }
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    lat: 26.8467,
    lon: 80.9462,
    labels: {
      en: 'Lucknow, Uttar Pradesh',
      hi: 'लखनऊ (उत्तर प्रदेश)',
      pa: 'ਲਖਨਊ (ਉੱਤਰ ਪ੍ਰਦੇਸ਼)'
    }
  },
  {
    id: 'patna',
    name: 'Patna',
    district: 'Patna',
    state: 'Bihar',
    lat: 25.5941,
    lon: 85.1376,
    labels: {
      en: 'Patna, Bihar',
      hi: 'पटना (बिहार)',
      pa: 'ਪਟਨਾ (ਬਿਹਾਰ)'
    }
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    lat: 22.5726,
    lon: 88.3639,
    labels: {
      en: 'Kolkata, West Bengal',
      hi: 'कोलकाता (पश्चिम बंगाल)',
      pa: 'ਕੋਲਕਾਤਾ (ਪੱਛਮੀ ਬੰਗਾਲ)'
    }
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    lat: 11.0168,
    lon: 76.9558,
    labels: {
      en: 'Coimbatore, Tamil Nadu',
      hi: 'कोयंबटूर (तमिलनाडु)',
      pa: 'ਕੋਇੰਬਟੂਰ (ਤਾਮਿਲਨਾਡੂ)'
    }
  },
  {
    id: 'raipur',
    name: 'Raipur',
    district: 'Raipur',
    state: 'Chhattisgarh',
    lat: 21.2514,
    lon: 81.6296,
    labels: {
      en: 'Raipur, Chhattisgarh',
      hi: 'रायपुर (छत्तीसगढ़)',
      pa: 'ਰਾਏਪੁਰ (ਛੱਤੀਸਗੜ੍ਹ)'
    }
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    district: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0225,
    lon: 72.5714,
    labels: {
      en: 'Ahmedabad, Gujarat',
      hi: 'अहमदाबाद (गुजरात)',
      pa: 'ਅਹਿਮਦਾਬਾਦ (ਗੁਜਰਾਤ)'
    }
  }
];

export const REGIONAL_WEATHER_PRESETS: Record<string, WeatherReport> = {
  ludhiana: {
    city: 'Ludhiana',
    district: 'Ludhiana, Punjab',
    state: 'Punjab',
    latitude: 30.9010,
    longitude: 75.8573,
    temperature: 24,
    feelsLike: 23,
    condition: 'clear',
    conditionText: {
      en: 'Sunny & Clear Skies',
      hi: 'साफ व खिली धूप',
      pa: 'ਸਾਫ਼ ਤੇ ਖਿੜੀ ਧੁੱਪ'
    },
    humidity: 58,
    windSpeed: 8,
    rainChance: 5,
    spraySuitability: 'optimal',
    spraySuitabilityText: {
      en: 'Safe for Spray Today (Good Weather)',
      hi: 'आज छिड़काव के लिए मौसम बिल्कुल अनुकूल है',
      pa: 'ਅੱਜ ਸਪਰੇਅ ਕਰਨ ਲਈ ਮੌਸਮ ਬਿਲਕੁਲ ਸਹੀ ਹੈ'
    },
    lastUpdated: '10:30 AM',
    localTime: '11:00 AM',
    warnings: {
      en: [
        'Notice: Low rain probability (<5%) over next 24 hours.',
        'Calm wind speeds under 10 km/h: spray drift risk is minimal.'
      ],
      hi: [
        'चेतावनी: अगले 24 घंटों में बारिश की कोई संभावना नहीं है।',
        'हवा की गति 8 किमी/घंटा शांत है: दवा उड़ने का खतरा नहीं है।'
      ],
      pa: [
        'ਚੇਤਾਵਨੀ: ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਕੋਈ ਸੰਭਾਵਨਾ ਨਹੀਂ ਹੈ।',
        'ਹਵਾ ਦੀ ਗਤੀ 8 ਕਿਲੋਮੀਟਰ ਪ੍ਰਤੀ ਘੰਟਾ ਸ਼ਾਂਤ ਹੈ: ਦਵਾਈ ਉੱਡਣ ਦਾ ਕੋਈ ਖ਼ਤਰਾ ਨਹੀਂ।'
      ]
    },
    recommendedSprayWindow: {
      en: [
        'Morning Slot: 8:30 AM to 10:30 AM (after morning dew evaporates)',
        'Evening Slot: 4:00 PM to 6:30 PM (calm and cool weather)'
      ],
      hi: [
        'सुबह का समय: 8:30 बजे से 10:30 बजे तक (ओस सूखने के बाद)',
        'शाम का समय: 4:00 बजे से 6:30 बजे तक (ठंडे शांत वातावरण में)'
      ],
      pa: [
        'ਸਵੇਰ ਦਾ ਸਮਾਂ: 8:30 ਵਜੇ ਤੋਂ 10:30 ਵਜੇ ਤੱਕ (ਤਰੇਲ ਸੁੱਕਣ ਮਗਰੋਂ)',
        'ਸ਼ਾਮ ਦਾ ਸਮਾਂ: 4:00 ਵਜੇ ਤੋਂ 6:30 ਵਜੇ ਤੱਕ (ਸ਼ਾਂਤ ਤੇ ਠੰਢੇ ਵੇਲੇ)'
      ]
    },
    stepByStepPrecautions: {
      en: [
        '1. Ensure morning dew has dried before spraying fungicide.',
        '2. Use flat-fan nozzle for uniform droplet distribution.',
        '3. Wear gloves and mask; do not smoke or eat while spraying.'
      ],
      hi: [
        '1. पत्तों से सुबह की ओस सूखने के बाद ही छिड़काव शुरू करें।',
        '2. दवा के बराबर छिड़काव के लिए कट या फ्लड जेट नोजल का प्रयोग करें।',
        '3. मुंह पर मास्क और हाथों में दस्ताने जरूर पहनें।'
      ],
      pa: [
        '1. ਸਵੇਰੇ ਪੱਤਿਆਂ ਤੋਂ ਤਰੇਲ ਸੁੱਕਣ ਮਗਰੋਂ ਹੀ ਉੱਲੀਨਾਸ਼ਕ ਸਪਰੇਅ ਸ਼ੁਰੂ ਕਰੋ।',
        '2. ਇਕਸਾਰ ਛਿੜਕਾਅ ਲਈ ਫਲੈਟ ਫੈਨ ਨੋਜ਼ਲ ਦੀ ਵਰਤੋਂ ਕਰੋ।',
        '3. ਮੂੰਹ ਤੇ ਮਾਸਕ ਤੇ ਹੱਥਾਂ ਤੇ ਦਸਤਾਨੇ ਜ਼ਰੂਰ ਪਹਿਨੋ।'
      ]
    },
    dailyForecast: [
      {
        date: 'Day 1',
        dayName: { en: 'Tomorrow', hi: 'कल', pa: 'ਕੱਲ੍ਹ' },
        tempMax: 26,
        tempMin: 14,
        rainChance: 5,
        windSpeed: 9,
        sprayCondition: 'optimal'
      },
      {
        date: 'Day 2',
        dayName: { en: 'Day After', hi: 'परसों', pa: 'ਪਰਸੋਂ' },
        tempMax: 27,
        tempMin: 15,
        rainChance: 10,
        windSpeed: 11,
        sprayCondition: 'optimal'
      },
      {
        date: 'Day 3',
        dayName: { en: 'In 3 Days', hi: '3 दिन बाद', pa: '3 ਦਿਨ ਬਾਅਦ' },
        tempMax: 25,
        tempMin: 14,
        rainChance: 25,
        windSpeed: 14,
        sprayCondition: 'moderate'
      }
    ]
  }
};
