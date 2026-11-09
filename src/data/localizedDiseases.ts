import { CropType, PathogenClass, SeverityLevel } from '../types';
import { Language } from './translations';
import tomatoImg from '../assets/images/crop_tomato_blight_1793802324166.jpg';
import potatoImg from '../assets/images/crop_potato_late_blight_1793802325779.jpg';
import riceImg from '../assets/images/crop_rice_blast_1793802325819.jpg';
import cornImg from '../assets/images/crop_corn_leaf_blight_1793802326412.jpg';

export interface LocalizedDisease {
  id: string;
  crop: CropType;
  pathogenClass: PathogenClass;
  typicalSeverity: SeverityLevel;
  defaultConfidence: number;
  sampleImageUrl: string;
  names: Record<Language, string>;
  scientificName: string;
  symptoms: Record<Language, string>;
  desiRemedy: Record<Language, string[]>;
  chemicalSprays: Record<
    Language,
    Array<{
      medicineName: string;
      dose: string;
      safetyDays: string;
      advice: string;
    }>
  >;
  prevention: Record<Language, string[]>;
  favorableWeather: Record<Language, string>;
  yieldRisk: Record<Language, string>;
  audioScript: Record<Language, string>;
}

export const LOCALIZED_DISEASE_PROFILES: LocalizedDisease[] = [
  {
    id: 'wheat-stripe-rust',
    crop: 'Wheat',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    defaultConfidence: 95.4,
    sampleImageUrl: cornImg,
    names: {
      en: 'Wheat Stripe Rust (Yellow Rust)',
      hi: 'गेहूँ की पीली रोली (पीला रतुआ / स्ट्राइप रस्ट)',
      pa: 'ਕਣਕ ਦੀ ਪੀਲੀ ਕੁੰਗੀ (ਯੈਲੋ ਰਸਟ)'
    },
    scientificName: 'Puccinia striiformis',
    symptoms: {
      en: 'Long yellow stripes appear on leaves like yellow powder. When touched with fingers, yellow dust sticks to your hand.',
      hi: 'पत्तों पर पीली धारियां बनती हैं जो हल्दी जैसे पाउडर की तरह दिखती हैं। उंगली से छूने पर हाथ पर पीला रंग लग जाता है।',
      pa: 'ਪੱਤਿਆਂ ਉੱਤੇ ਹਲਦੀ ਰੰਗੀਆਂ ਲੰਮੀਆਂ ਪੀਲੀਆਂ ਧਾਰੀਆਂ ਬਣ ਜਾਂਦੀਆਂ ਹਨ। ਜੇਕਰ ਪੱਤੇ ਨੂੰ ਉਂਗਲ ਨਾਲ ਛੂਹੋ ਤਾਂ ਉਂਗਲ ਤੇ ਪੀਲਾ ਪਾਊਡਰ ਲੱਗ ਜਾਂਦਾ ਹੈ।'
    },
    desiRemedy: {
      en: [
        'Isolate infected border rows immediately to prevent wind transmission',
        'Spray sour buttermilk / lassi (2 liters fermented in copper vessel for 4 days, diluted in 15L water)',
        'Ensure balanced irrigation; avoid letting water stagnate in cold morning mist'
      ],
      hi: [
        'तांबे के बर्तन में 4 दिन रखी खट्टी छाछ (2 लीटर) को 15 लीटर पानी में घोलकर तुरंत छिड़कें',
        'खेत में नाइट्रोजन (यूरिया) का अत्यधिक उपयोग तुरंत बंद कर दें',
        'खेत की मेड़ों से खरपतवार हटाएं ताकि हवा का बहाव ठीक रहे'
      ],
      pa: [
        'ਤਾਂਬੇ ਦੇ ਭਾਂਡੇ ਵਿੱਚ 4 ਦਿਨ ਰੱਖੀ ਖੱਟੀ ਲੱਸੀ (2 ਲੀਟਰ) 15 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਛਿੜਕੋ',
        'ਖੇਤ ਵਿੱਚ ਵਾਧੂ ਯੂਰੀਆ ਖਾਦ ਪਾਉਣੀ ਤੁਰੰਤ ਬੰਦ ਕਰੋ',
        'ਖੇਤ ਦੀਆਂ ਵੱਟਾਂ ਤੋਂ ਨਦੀਨ ਸਾਫ਼ ਕਰੋ ਤਾਂ ਜੋ ਹਵਾ ਖੁੱਲ੍ਹੀ ਲੱਗ ਸਕੇ'
      ]
    },
    chemicalSprays: {
      en: [
        {
          medicineName: 'Tilt 25% EC (Propiconazole)',
          dose: '200 ml per acre in 200 liters of water',
          safetyDays: '25-30 days before harvest',
          advice: 'Spray as soon as first yellow stripes appear on leaves. Use cone nozzle for full spray.'
        },
        {
          medicineName: 'Tebuconazole 25.9% EC (Folicur)',
          dose: '200 ml per acre in 200 liters water',
          safetyDays: '21 days',
          advice: 'Stops fungus from spreading to the wheat earhead (bali).'
        }
      ],
      hi: [
        {
          medicineName: 'टिल्ट 25% ई.सी. (प्रोपिकोनाजोल / Tilt)',
          dose: '200 मिली प्रति एकड़ (200 लीटर पानी में घोलें)',
          safetyDays: 'कटाई से 25 दिन पहले',
          advice: 'जैसे ही पत्तों पर पहली पीली धारी दिखे तुरंत स्प्रे करें। कट नोज़ल की बजाय गोल नोज़ल लगाएं।'
        },
        {
          medicineName: 'टेबुकोनाजोल 25.9% ई.सी. (Folicur / फोलिकुर)',
          dose: '200 मिली प्रति एकड़ 200 लीटर पानी में',
          safetyDays: '21 दिन',
          advice: 'यह फफूंद को बाली तक पहुंचने से रोकता है।'
        }
      ],
      pa: [
        {
          medicineName: 'ਟਿਲਟ 25% ਈ.ਸੀ. (ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ / Tilt 25 EC)',
          dose: '200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ (200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ)',
          safetyDays: 'ਵਾਢੀ ਤੋਂ 25 ਦਿਨ ਪਹਿਲਾਂ',
          advice: 'ਜਿਉਂ ਹੀ ਪੱਤਿਆਂ ਉੱਤੇ ਪੀਲੀਆਂ ਧਾਰੀਆਂ ਦਿਸਣ, ਤੁਰੰਤ ਸਪਰੇਅ ਕਰੋ। ਕੱਟ ਵਾਲੀ ਨੋਜ਼ਲ ਦੀ ਥਾਂ ਗੋਲ ਨੋਜ਼ਲ ਵਰਤੋ।'
        },
        {
          medicineName: 'ਟੈਬੂਕੋਨਾਜ਼ੋਲ 25.9% ਈ.ਸੀ. (ਫੋਲੀਕਰ / Folicur)',
          dose: '200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: '21 ਦਿਨ',
          advice: 'ਬਿਮਾਰੀ ਨੂੰ ਸਿੱਟੇ (ਬਾਲੀ) ਤੱਕ ਫੈਲਣ ਤੋਂ ਰੋਕਦਾ ਹੈ।'
        }
      ]
    },
    prevention: {
      en: [
        'Always sow certified rust-resistant wheat varieties (e.g. PBW 725, HD 3086, DBW 187, DBW 222)',
        'Treat seed with Vitavax or Trichoderma before sowing',
        'Scout northern field corners weekly during cloudy or cool December-February weather'
      ],
      hi: [
        'हमेशा पीला रतुआ प्रतिरोधी किस्में (जैसे HD 3086, PBW 725, DBW 187, DBW 222) ही बोएं',
        'बुवाई से पहले बीज को वीटावैक्स या ट्राइकोडर्मा से उपचारित करें',
        'दिसंबर-फरवरी में बादलों वाले मौसम में खेत के कोनों का हर हफ्ते मुआयना करें'
      ],
      pa: [
        'ਹਮੇਸ਼ਾ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਟਾਕਰਾ ਕਰਨ ਵਾਲੀਆਂ ਕਿਸਮਾਂ (ਜਿਵੇਂ PBW 725, HD 3086, DBW 187, DBW 222) ਹੀ ਬੀਜੋ',
        'ਬੀਜਣ ਤੋਂ ਪਹਿਲਾਂ ਬੀਜ ਨੂੰ ਵੀਟਾਵੈਕਸ ਜਾਂ ਟ੍ਰਾਈਕੋਡਰਮਾ ਨਾਲ ਸੋਧੋ',
        'ਦਸੰਬਰ ਤੋਂ ਫਰਵਰੀ ਦੌਰਾਨ ਬੱਦਲਵਾਈ ਵਾਲੇ ਦਿਨਾਂ ਵਿੱਚ ਖੇਤ ਦੇ ਖੂੰਜਿਆਂ ਦਾ ਗੇੜਾ ਮਾਰੋ'
      ]
    },
    favorableWeather: {
      en: 'Cool moist weather (10°C to 18°C) with morning dew and cloudy skies.',
      hi: 'ठंडा व नम मौसम (10°C से 18°C), सुबह की ओस और बादलों वाला आसमान।',
      pa: 'ਠੰਢਾ ਤੇ ਸਿੱਲ੍ਹਾ ਮੌਸਮ (10°C ਤੋਂ 18°C), ਸਵੇਰ ਦੀ ਤਰੇਲ ਅਤੇ ਬੱਦਲਵਾਈ।'
    },
    yieldRisk: {
      en: '30% – 60% loss if yellow rust reaches flag leaf during grain filling.',
      hi: '30% से 60% तक पैदावार कम हो सकती है यदि झंडा पत्ता खराब हो गया।',
      pa: '30% ਤੋਂ 60% ਤੱਕ ਝਾੜ ਘਟ ਸਕਦਾ ਹੈ ਜੇਕਰ ਬਿਮਾਰੀ ਝੰਡਾ ਪੱਤੇ ਤੱਕ ਪਹੁੰਚ ਗਈ।'
    },
    audioScript: {
      en: 'Wheat Yellow Stripe Rust detected. Please spray Tilt Propiconazole 200ml per acre in 200 liters of clean water. Avoid excess urea.',
      hi: 'गेहूँ में पीला रतुआ रोग पाया गया है। कृपया टिल्ट प्रोपिकोनाजोल 200 मिली प्रति एकड़ 200 लीटर पानी में छिड़कें। यूरिया का अधिक उपयोग न करें।',
      pa: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦਾ ਹਮਲਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਟਿਲਟ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਸਪਰੇਅ ਕਰੋ।'
    }
  },

  {
    id: 'rice-blast',
    crop: 'Rice',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    defaultConfidence: 94.2,
    sampleImageUrl: riceImg,
    names: {
      en: 'Rice Blast (Neck & Leaf Blast)',
      hi: 'धान का झुलसा रोग (राइस ब्लास्ट / गर्दन तोड़)',
      pa: 'ਝੋਨੇ ਦਾ ਝੁਲਸ ਰੋਗ (ਰਾਈਸ ਬਲਾਸਟ / ਗਰਦਨ ਮਰੋੜ)'
    },
    scientificName: 'Magnaporthe oryzae',
    symptoms: {
      en: 'Spindle or eye-shaped spots on leaves with gray centers and reddish-brown borders. Can cause panicle neck to turn black and break.',
      hi: 'पत्तों पर आंख या नाव के आकार के धब्बे जिनके बीच का हिस्सा राख जैसा भूरा और किनारे लाल-भूरे होते हैं। बाली की गर्दन काली पड़कर टूट जाती है।',
      pa: 'ਪੱਤਿਆਂ ਉੱਤੇ ਕਿਸ਼ਤੀ ਜਾਂ ਅੱਖ ਵਰਗੇ ਦਾਗ਼ ਜਿਨ੍ਹਾਂ ਦਾ ਵਿਚਕਾਰਲਾ ਹਿੱਸਾ ਸੁਆਹ ਰੰਗਾ ਤੇ ਕੰਢੇ ਲਾਲ-ਭੂਰੇ ਹੁੰਦੇ ਹਨ। ਮੁੰਜਰਾਂ ਦੀ ਗਰਦਨ ਕਾਲੀ ਪੈ ਕੇ ਟੁੱਟ ਜਾਂਦੀ ਹੈ।'
    },
    desiRemedy: {
      en: [
        'Stop applying top-dress urea fertilizer immediately to prevent lush leaf softness',
        'Spray 5% Neem Seed Kernel Extract (NSKE) at first appearance of spots',
        'Maintain 2 to 3 inches of standing water in paddy; do not let soil crack'
      ],
      hi: [
        'यूरिया का छिड़काव तुरंत बंद करें। खेत में नमी कम न होने दें',
        'नीम की खली या निंबोली का 5% काढ़ा बनाकर सुबह-सुबह छिड़कें',
        'खेत में 2-3 इंच पानी भरकर रखें ताकि पौधे सूखे के तनाव में न आएं'
      ],
      pa: [
        'ਯੂਰੀਆ ਖਾਦ ਪਾਉਣੀ ਤੁਰੰਤ ਬੰਦ ਕਰੋ। ਖੇਤ ਵਿੱਚ ਸਿੱਲ੍ਹ ਬਣਾਈ ਰੱਖੋ',
        'ਨਿੰਮ ਦੀ ਨਿਮੋਲੀ ਦਾ 5% ਅਰਕ ਬਣਾ ਕੇ ਸਵੇਰੇ-ਸਵੇਰੇ ਛਿੜਕੋ',
        'ਖੇਤ ਵਿੱਚ 2-3 ਇੰਚ ਪਾਣੀ ਖੜ੍ਹਾ ਰੱਖੋ, ਜ਼ਮੀਨ ਨੂੰ ਤਰੇੜਾਂ ਨਾ ਪੈਣ ਦਿਓ'
      ]
    },
    chemicalSprays: {
      en: [
        {
          medicineName: 'Baan / Tricyclazole 75% WP',
          dose: '120 grams per acre in 200 liters water',
          safetyDays: '30 days before harvest',
          advice: 'Most effective medicine for rice blast. Spray at early tillering and panicle emergence.'
        },
        {
          medicineName: 'Amistar Top (Azoxystrobin + Difenoconazole)',
          dose: '200 ml per acre in 200 liters water',
          safetyDays: '21 days',
          advice: 'Gives dual systemic protection against leaf blast and sheath blight.'
        }
      ],
      hi: [
        {
          medicineName: 'बान / ट्राईसाइक्लाजोल 75% WP (Tricyclazole)',
          dose: '120 ग्राम प्रति एकड़ (200 लीटर पानी में)',
          safetyDays: 'कटाई से 30 दिन पहले',
          advice: 'धान के ब्लास्ट के लिए सबसे असरदार दवा। पहली गांठ और निसरने के समय जरूर छिड़कें।'
        },
        {
          medicineName: 'एमीस्टार टॉप (Amistar Top)',
          dose: '200 मिली प्रति एकड़ 200 लीटर पानी में',
          safetyDays: '21 दिन',
          advice: 'ब्लास्ट और शीथ ब्लाइट दोनों से फसल को बचाता है।'
        }
      ],
      pa: [
        {
          medicineName: 'ਬਾਣ / ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP (Baan / Tricyclazole)',
          dose: '120 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ)',
          safetyDays: 'ਵਾਢੀ ਤੋਂ 30 ਦਿਨ ਪਹਿਲਾਂ',
          advice: 'ਝੋਨੇ ਦੇ ਝੁਲਸ ਰੋਗ ਲਈ ਸਭ ਤੋਂ ਅਸਰਦਾਰ ਦਵਾਈ। ਗੋਭ ਭਰਨ ਵੇਲੇ ਸਪਰੇਅ ਜ਼ਰੂਰ ਕਰੋ।'
        },
        {
          medicineName: 'ਐਮੀਸਟਾਰ ਟਾਪ (Amistar Top)',
          dose: '200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: '21 ਦਿਨ',
          advice: 'ਬਲਾਸਟ ਅਤੇ ਝੁਲਸ ਰੋਗ ਦੋਵਾਂ ਤੋਂ ਝੋਨੇ ਨੂੰ ਬਚਾਉਂਦਾ ਹੈ।'
        }
      ]
    },
    prevention: {
      en: [
        'Treat paddy seeds with Carbendazim (2g per kg seed) before soaking',
        'Avoid excessive plant density; keep 20 cm row-to-row spacing for sunlight',
        'Burn or compost stubble of infected fields thoroughly'
      ],
      hi: [
        'बीज को भिगोने से पहले बाविस्टिन (कार्बेंडाजिम 2 ग्राम प्रति किलो) से उपचारित करें',
        'पौधों को बहुत घना न लगाएं, कतार से कतार की दूरी 20 सेमी रखें',
        'रोगग्रस्त खेत के अवशेषों को अच्छी तरह गलाएं'
      ],
      pa: [
        'ਬੀਜ ਭਿਓਂਣ ਤੋਂ ਪਹਿਲਾਂ ਬਾਵਿਸਟਿਨ (2 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਕਿੱਲੋ ਬੀਜ) ਨਾਲ ਸੋਧੋ',
        'ਪਨੀਰੀ ਬਹੁਤੀ ਸੰਘਣੀ ਨਾ ਲਾਓ, ਬੂਟੇ ਤੋਂ ਬੂਟੇ ਦੀ ਵਿੱਥ 20 ਸੈਂਟੀਮੀਟਰ ਰੱਖੋ',
        'ਪਿਛਲੀ ਫਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਪਟਾਓ'
      ]
    },
    favorableWeather: {
      en: 'Warm days (25°C to 28°C) with cool nights and prolonged leaf wetness.',
      hi: 'गर्म दिन (25°C से 28°C) और ठंडी रातें, पत्तों पर 10 घंटे से अधिक ओस।',
      pa: 'ਨਿੱਘੇ ਦਿਨ (25°C ਤੋਂ 28°C) ਅਤੇ ਠੰਢੀਆਂ ਰਾਤਾਂ, ਪੱਤਿਆਂ ਉੱਤੇ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਤਰੇਲ।'
    },
    yieldRisk: {
      en: '35% – 50% yield reduction if neck blast causes empty grains (phok).',
      hi: '35% से 50% तक धान में थोक (खाली दाने) बन सकते हैं।',
      pa: '35% ਤੋਂ 50% ਤੱਕ ਝੋਨੇ ਵਿੱਚ ਫੋਕ ਪੈਣ ਕਾਰਨ ਝਾੜ ਮਰ ਸਕਦਾ ਹੈ।'
    },
    audioScript: {
      en: 'Rice blast detected. Spray Tricyclazole 120 grams per acre in 200 liters of water. Stop applying excess urea.',
      hi: 'धान में झुलसा रोग यानी ब्लास्ट पाया गया है। ट्राईसाइक्लाजोल 120 ग्राम प्रति एकड़ 200 लीटर पानी में छिड़कें। यूरिया बंद करें।',
      pa: 'ਝੋਨੇ ਵਿੱਚ ਝੁਲਸ ਰੋਗ ਦਾ ਹਮਲਾ ਹੈ। ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 120 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਸਪਰੇਅ ਕਰੋ ਅਤੇ ਵਾਧੂ ਯੂਰੀਆ ਬੰਦ ਕਰੋ।'
    }
  },

  {
    id: 'potato-late-blight',
    crop: 'Potato',
    pathogenClass: 'Oomycete',
    typicalSeverity: 'Critical',
    defaultConfidence: 96.8,
    sampleImageUrl: potatoImg,
    names: {
      en: 'Potato Late Blight',
      hi: 'आलू का पछेती झुलसा रोग (लेट ब्लाइट)',
      pa: 'ਆਲੂਆਂ ਦਾ ਪਿਛੇਤਾ ਝੁਲਸ ਰੋਗ (ਪਛੇਤੀ ਬਿਮਾਰੀ)'
    },
    scientificName: 'Phytophthora infestans',
    symptoms: {
      en: 'Water-soaked dark brown or black lesions starting at leaf tips and edges. In humid weather, white cottony mold appears on leaf undersides.',
      hi: 'पत्तों के किनारों पर पानी से भीगे जैसे काले-भूरे धब्बे जो तेजी से फैलते हैं। सुबह के समय पत्तों के नीचे सफेद रूई जैसी फफूंद दिखाई देती है।',
      pa: 'ਪੱਤਿਆਂ ਦੇ ਕੰਢਿਆਂ ਉੱਤੇ ਕਾਲੇ-ਭੂਰੇ ਸੜੇ ਹੋਏ ਦਾਗ਼ ਜੋ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਦੇ ਹਨ। ਸਵੇਰੇ ਪੱਤਿਆਂ ਦੇ ਹੇਠਲੇ ਪਾਸੇ ਚਿੱਟੀ ਉੱਲੀ ਦਿਸਦੀ ਹੈ।'
    },
    desiRemedy: {
      en: [
        'Rogue out and bury severely infected plants immediately',
        'Spray Bordeaux mixture (copper sulfate + lime) on surrounding healthy rows',
        'Hill up soil around rows to cover tubers with at least 4 inches of earth'
      ],
      hi: [
        'बीमार पौधों को उखाड़कर गहरे गड्ढे में दबाएं ताकि पड़ोस के पौधों में न फैले',
        'बोर्डो मिश्रण या नीला थोथा व चूने का घोल बनाकर स्वस्थ पौधों पर छिड़कें',
        'आलू की जड़ों पर मिट्टी चढ़ाएं (कम से कम 4 इंच) ताकि कंद सुरक्षित रहें'
      ],
      pa: [
        'ਬਿਮਾਰ ਬੂਟਿਆਂ ਨੂੰ ਪੁੱਟ ਕੇ ਖੇਤ ਤੋਂ ਦੂਰ ਟੋਏ ਵਿੱਚ ਦੱਬ ਦਿਓ',
        'ਨੀਲਾ ਥੋਥਾ ਅਤੇ ਚੂਨੇ ਦਾ ਬੋਰਡੋ ਮਿਸ਼ਰਣ ਬਣਾ ਕੇ ਬਾਕੀ ਫਸਲ ਉੱਤੇ ਛਿੜਕੋ',
        'ਬੂਟਿਆਂ ਦੇ ਮੁੱਢਾਂ ਤੇ ਚੰਗੀ ਮਿੱਟੀ ਚੜ੍ਹਾਓ (ਘੱਟੋ-ਘੱਟ 4 ਇੰਚ) ਤਾਂ ਜੋ ਆਲੂ ਬਚੇ ਰਹਿਣ'
      ]
    },
    chemicalSprays: {
      en: [
        {
          medicineName: 'Curzate M-8 (Cymoxanil 8% + Mancozeb 64% WP)',
          dose: '600 grams per acre in 200 liters water',
          safetyDays: '10 days before harvest',
          advice: 'Urgent action medicine. Provides kick-back control within 48 hours of infection.'
        },
        {
          medicineName: 'Ridomil Gold (Metalaxyl-M + Mancozeb)',
          dose: '500 grams per acre in 200 liters water',
          safetyDays: '14 days',
          advice: 'Systemic fungicide that protects newly emerging leaves and stems.'
        }
      ],
      hi: [
        {
          medicineName: 'कर्ज़ेट एम-8 (Cymoxanil + Mancozeb / Curzate)',
          dose: '600 ग्राम प्रति एकड़ (200 लीटर पानी में)',
          safetyDays: 'खुदाई से 10 दिन पहले',
          advice: 'आपातकालीन दवा। बीमारी लगते ही 48 घंटे के भीतर फफूंद को खत्म करती है।'
        },
        {
          medicineName: 'रिडोमिल गोल्ड (Ridomil Gold)',
          dose: '500 ग्राम प्रति एकड़ 200 लीटर पानी में',
          safetyDays: '14 दिन',
          advice: 'पौधे की नई पत्तियों और तने को अंदर से सुरक्षित रखती है।'
        }
      ],
      pa: [
        {
          medicineName: 'ਕਰਜ਼ੇਟ ਐੱਮ-8 (Curzate M-8 / ਸਾਈਮੋਕਸਾਨਿਲ + ਮੈਨਕੋਜ਼ੇਬ)',
          dose: '600 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ)',
          safetyDays: 'ਪੁਟਾਈ ਤੋਂ 10 ਦਿਨ ਪਹਿਲਾਂ',
          advice: 'ਐਮਰਜੈਂਸੀ ਦਵਾਈ। ਬਿਮਾਰੀ ਦੇ ਹਮਲੇ ਤੋਂ 48 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਉੱਲੀ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਂਦੀ ਹੈ।'
        },
        {
          medicineName: 'ਰਿਡੋਮਿਲ ਗੋਲਡ (Ridomil Gold)',
          dose: '500 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: '14 ਦਿਨ',
          advice: 'ਬੂਟੇ ਦੇ ਅੰਦਰ ਜਾ ਕੇ ਨਵੇਂ ਪੱਤਿਆਂ ਅਤੇ ਤਣਿਆਂ ਨੂੰ ਬਿਮਾਰੀ ਤੋਂ ਬਚਾਉਂਦੀ ਹੈ।'
        }
      ]
    },
    prevention: {
      en: [
        'Plant only certified, cold-store tested disease-free seed tubers',
        'Cut vine tops (haulm cutting) 12 days before harvest to prevent tuber rot',
        'Avoid furrow flooding that leaves stagnant water around ridges'
      ],
      hi: [
        'हमेशा प्रमाणित और स्वस्थ बीज कंद ही लगाएं',
        'खुदाई से 10-12 दिन पहले बेल काट दें (बेल कटाई) ताकि आलू में सड़न न लगे',
        'खेत में पानी भरने से बचें'
      ],
      pa: [
        'ਹਮੇਸ਼ਾ ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਰੋਗ-ਮੁਕਤ ਬੀਜ ਹੀ ਵਰਤੋ',
        'ਪੁਟਾਈ ਤੋਂ 10-12 ਦਿਨ ਪਹਿਲਾਂ ਆਲੂਆਂ ਦੀਆਂ ਵੇਲਾਂ ਕੱਟ ਦਿਓ ਤਾਂ ਜੋ ਆਲੂ ਨਾ ਸੜਨ',
        'ਖੇਤ ਦੀਆਂ ਵੱਟਾਂ ਵਿੱਚ ਬਹੁਤਾ ਪਾਣੀ ਖੜ੍ਹਾ ਨਾ ਹੋਣ ਦਿਓ'
      ]
    },
    favorableWeather: {
      en: 'Cool cloudy fog (12°C to 20°C) with drizzle and high humidity (>90%).',
      hi: 'ठंडी धुंध (12°C से 20°C), हल्की बूंदाबांदी और अत्यधिक नमी।',
      pa: 'ਠੰਢੀ ਧੁੰਦ (12°C ਤੋਂ 20°C), ਕਿਣਮਿਣ ਅਤੇ ਭਾਰੀ ਨਮੀ।'
    },
    yieldRisk: {
      en: 'Critical! Can destroy entire potato field within 7 to 10 days if unsprayed.',
      hi: 'अति गंभीर! यदि तुरंत स्प्रे न किया तो 7 से 10 दिन में पूरी फसल बर्बाद हो सकती है।',
      pa: 'ਬਹੁਤ ਗੰਭੀਰ! ਜੇਕਰ ਤੁਰੰਤ ਸਪਰੇਅ ਨਾ ਕੀਤੀ ਤਾਂ 7 ਤੋਂ 10 ਦਿਨਾਂ ਵਿੱਚ ਸਾਰੀ ਫਸਲ ਤਬਾਹ ਹੋ ਸਕਦੀ ਹੈ।'
    },
    audioScript: {
      en: 'Potato Late Blight alert! Extremely dangerous disease. Spray Curzate Cymoxanil 600 grams per acre immediately. Do not delay.',
      hi: 'आलू में पछेती झुलसा का गंभीर प्रकोप है। तुरंत कर्ज़ेट 600 ग्राम प्रति एकड़ 200 लीटर पानी में छिड़कें। देरी न करें।',
      pa: 'ਆਲੂਆਂ ਵਿੱਚ ਪਿਛੇਤੇ ਝੁਲਸ ਰੋਗ ਦਾ ਵੱਡਾ ਖ਼ਤਰਾ ਹੈ। ਤੁਰੰਤ ਕਰਜ਼ੇਟ 600 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਸਪਰੇਅ ਕਰੋ।'
    }
  },

  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Moderate',
    defaultConfidence: 93.8,
    sampleImageUrl: tomatoImg,
    names: {
      en: 'Tomato Early Blight (Target Spot)',
      hi: 'टमाटर का अगेती झुलसा व पत्ती धब्बा रोग',
      pa: 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ (ਪੱਤਿਆਂ ਤੇ ਗੋਲ ਦਾਗ਼)'
    },
    scientificName: 'Alternaria solani',
    symptoms: {
      en: 'Dark brown concentric target rings on lower leaves surrounded by yellow border. Lower leaves dry up and drop off.',
      hi: 'निचले पत्तों पर गोल छल्लेदार गहरे भूरे धब्बे बनते हैं जिनके चारों तरफ पीला घेरा होता है। पत्ते सूखकर झड़ने लगते हैं।',
      pa: 'ਹੇਠਲੇ ਪੱਤਿਆਂ ਉੱਤੇ ਚੱਕਰਦਾਰ ਗੋਲ ਭੂਰੇ ਦਾਗ਼ ਬਣਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਦੁਆਲੇ ਪੀਲਾ ਘੇਰਾ ਹੁੰਦਾ ਹੈ। ਪੱਤੇ ਸੁੱਕ ਕੇ ਝੜਨ ਲੱਗਦੇ ਹਨ।'
    },
    desiRemedy: {
      en: [
        'Prune lower 10 inches of infected leaves and destroy them away from farm',
        'Spray fresh neem oil solution (5 ml/L with 1 ml liquid soap) every 7 days',
        'Apply straw or plastic mulch to prevent soil rain-splash onto leaves'
      ],
      hi: [
        'नीचे की 8-10 इंच की बीमार पत्तियों को तोड़कर खेत से दूर नष्ट करें',
        'नीम तेल (5 मिली प्रति लीटर पानी + थोड़ा साबुन का घोल) हर हफ्ते छिड़कें',
        'पौधों के नीचे पुआल या प्लास्टिक मल्च बिछाएं ताकि मिट्टी के छींटे पत्तों पर न पड़ें'
      ],
      pa: [
        'ਹੇਠਲੇ 8-10 ਇੰਚ ਦੇ ਖ਼ਰਾਬ ਪੱਤੇ ਤੋੜ ਕੇ ਖੇਤ ਤੋਂ ਬਾਹਰ ਨਸ਼ਟ ਕਰੋ',
        'ਨਿੰਮ ਦਾ ਤੇਲ (5 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਹਰ ਹਫ਼ਤੇ ਸਪਰੇਅ ਕਰੋ',
        'ਬੂਟਿਆਂ ਦੇ ਹੇਠਾਂ ਪਰਾਲੀ ਜਾਂ ਮਲਚ ਵਿਛਾਓ ਤਾਂ ਜੋ ਮਿੱਟੀ ਦੇ ਛਿੱਟੇ ਪੱਤਿਆਂ ਤੇ ਨਾ ਪੈਣ'
      ]
    },
    chemicalSprays: {
      en: [
        {
          medicineName: 'Indofil M-45 (Mancozeb 75% WP)',
          dose: '500-600 grams per acre in 200 liters water (2.5g/L)',
          safetyDays: '5 days before picking',
          advice: 'Protective broad-spectrum fungicide. Spray on both upper and lower leaf surfaces.'
        },
        {
          medicineName: 'Score / Difenoconazole 25% EC',
          dose: '100 ml per acre in 200 liters water (0.5 ml/L)',
          safetyDays: '3 days',
          advice: 'Rapid curative action if spots have already multiplied on fruit cluster stems.'
        }
      ],
      hi: [
        {
          medicineName: 'इंडोफिल एम-45 (Mancozeb 75% WP)',
          dose: '500-600 ग्राम प्रति एकड़ (200 लीटर पानी में)',
          safetyDays: 'टमाटर तोड़ने से 5 दिन पहले',
          advice: 'पत्तियों के ऊपर और नीचे दोनों तरफ अच्छी तरह छिड़काव करें।'
        },
        {
          medicineName: 'स्कोर / डाइफेनोकोनाजोल (Score 25% EC)',
          dose: '100 मिली प्रति एकड़ 200 लीटर पानी में (0.5 मिली/लीटर)',
          safetyDays: '3 दिन',
          advice: 'यदि धब्बे ज्यादा बढ़ गए हों तो यह तुरंत बीमारी को रोकती है।'
        }
      ],
      pa: [
        {
          medicineName: 'ਇੰਡੋਫਿਲ ਐੱਮ-45 (Mancozeb 75% WP)',
          dose: '500-600 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ)',
          safetyDays: 'ਟਮਾਟਰ ਤੋੜਨ ਤੋਂ 5 ਦਿਨ ਪਹਿਲਾਂ',
          advice: 'ਪੱਤਿਆਂ ਦੇ ਉੱਪਰ ਅਤੇ ਹੇਠਾਂ ਦੋਵੇਂ ਪਾਸੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਪਰੇਅ ਕਰੋ।'
        },
        {
          medicineName: 'ਸਕੋਰ / ਡਾਈਫੈਨੋਕੋਨਾਜ਼ੋਲ (Score 25% EC)',
          dose: '100 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: '3 ਦਿਨ',
          advice: 'ਜੇਕਰ ਦਾਗ਼ ਜ਼ਿਆਦਾ ਵਧ ਗਏ ਹੋਣ ਤਾਂ ਇਹ ਤੁਰੰਤ ਬਿਮਾਰੀ ਰੋਕਦੀ ਹੈ।'
        }
      ]
    },
    prevention: {
      en: [
        'Stake and tie tomato plants with bamboo poles to keep branches off the soil',
        'Use drip irrigation; never spray overhead water onto foliage in evening',
        'Rotate with non-solanaceous crops (maize, pulses, mustard) for 2 years'
      ],
      hi: [
        'टमाटर के पौधों को बांस व धागे से बांधकर सहारा दें ताकि फल मिट्टी से दूर रहें',
        'ड्रिप या नाली से सिंचाई करें, शाम को पत्तों पर फव्वारे से पानी न डालें',
        'खेत में 2 साल तक आलू, बैंगन और मिर्च न बोएं (फसल चक्र अपनाएं)'
      ],
      pa: [
        'ਟਮਾਟਰ ਦੇ ਬੂਟਿਆਂ ਨੂੰ ਬਾਂਸ ਜਾਂ ਡੰਡਿਆਂ ਨਾਲ ਬੰਨ੍ਹ ਕੇ ਸਹਾਰਾ ਦਿਓ',
        'ਤਿੱਪ-ਤਿੱਪ (ਡਰਿੱਪ) ਸਿੰਚਾਈ ਕਰੋ, ਸ਼ਾਮ ਵੇਲੇ ਪੱਤਿਆਂ ਉੱਤੇ ਫੁਹਾਰੇ ਨਾਲ ਪਾਣੀ ਨਾ ਛਿੜਕੋ',
        'ਖੇਤ ਵਿੱਚ ਲਗਾਤਾਰ ਟਮਾਟਰ, ਆਲੂ ਜਾਂ ਬੈਂਗਣ ਨਾ ਬੀਜੋ (ਫਸਲ ਬਦਲੋ)'
      ]
    },
    favorableWeather: {
      en: 'Warm humid weather (24°C to 30°C) with intermittent rain and evening dew.',
      hi: 'गर्म और नम मौसम (24°C से 30°C) और रुक-रुक कर बारिश।',
      pa: 'ਨਿੱਘਾ ਤੇ ਸਿੱਲ੍ਹਾ ਮੌਸਮ (24°C ਤੋਂ 30°C) ਅਤੇ ਰੁਕ-ਰੁਕ ਕੇ ਮੀਂਹ।'
    },
    yieldRisk: {
      en: '20% – 40% loss due to defoliation and sun-scald on exposed green fruit.',
      hi: '20% से 40% तक नुकसान (पत्ते गिरने से फल धूप में झुलस जाते हैं)।',
      pa: '20% ਤੋਂ 40% ਤੱਕ ਨੁਕਸਾਨ (ਪੱਤੇ ਝੜਨ ਕਾਰਨ ਫਲ ਧੁੱਪ ਨਾਲ ਸੜ ਜਾਂਦੇ ਹਨ)।'
    },
    audioScript: {
      en: 'Tomato Early Blight detected. Spray Mancozeb 2.5 grams per liter water or Score 0.5ml per liter. Prune lower diseased leaves.',
      hi: 'टमाटर में अगेती झुलसा रोग है। मैंकोजेब 2.5 ग्राम प्रति लीटर या स्कोर 0.5 मिली प्रति लीटर छिड़कें। नीचे की खराब पत्तियां तोड़ दें।',
      pa: 'ਟਮਾਟਰ ਵਿੱਚ ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ ਹੈ। ਮੈਨਕੋਜ਼ੇਬ 2.5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਸਪਰੇਅ ਕਰੋ ਅਤੇ ਹੇਠਲੇ ਖ਼ਰਾਬ ਪੱਤੇ ਤੋੜ ਦਿਓ।'
    }
  },

  {
    id: 'corn-northern-leaf-blight',
    crop: 'Corn',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    defaultConfidence: 92.5,
    sampleImageUrl: cornImg,
    names: {
      en: 'Northern Corn Leaf Blight (NCLB)',
      hi: 'मक्का का पत्ता झुलसा रोग (एन.सी.एल.बी.)',
      pa: 'ਮੱਕੀ ਦਾ ਪੱਤਾ ਝੁਲਸ ਰੋਗ (ਸਿਗਾਰ ਵਰਗੇ ਲੰਮੇ ਦਾਗ਼)'
    },
    scientificName: 'Exserohilum turcicum',
    symptoms: {
      en: 'Long cigar-shaped tan lesions (3 to 15 cm) stretching lengthwise along leaf veins without yellow halos.',
      hi: 'पत्तों पर सिगार के आकार के लंबे (3 से 15 सेमी) भूरे-सलेटी धब्बे जो पत्तों की नसों के समानांतर फैलते हैं।',
      pa: 'ਪੱਤਿਆਂ ਉੱਤੇ ਸਿਗਾਰ ਦੇ ਆਕਾਰ ਦੇ ਲੰਮੇ (3 ਤੋਂ 15 ਸੈਂਟੀਮੀਟਰ) ਭੂਰੇ ਦਾਗ਼ ਜੋ ਪੱਤੇ ਦੀਆਂ ਨਾੜਾਂ ਦੇ ਨਾਲ-ਨਾਲ ਫੈਲਦੇ ਹਨ।'
    },
    desiRemedy: {
      en: [
        'Deep plow crop residue after harvest to bury fungal spores in soil',
        'Apply biological Trichoderma harzianum formulation (5g/L water) to foliage',
        'Avoid high plant population in humid monsoons'
      ],
      hi: [
        'कटाई के बाद खेत की गहरी जुताई करें ताकि फफूंद के जीवाणु मिट्टी में दब जाएं',
        'ट्राइकोडर्मा जैविक पाउडर (5 ग्राम प्रति लीटर पानी) का पत्तियों पर छिड़काव करें',
        'बरसात के दिनों में पौधों को बहुत घना न लगाएं'
      ],
      pa: [
        'ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਖੇਤ ਦਾ ਡੂੰਘਾ ਹਲ ਚਲਾਓ ਤਾਂ ਜੋ ਰਹਿੰਦ-ਖੂੰਹਦ ਮਿੱਟੀ ਹੇਠਾਂ ਦੱਬ ਜਾਵੇ',
        'ਟ੍ਰਾਈਕੋਡਰਮਾ ਜੈਵਿਕ ਪਾਊਡਰ (5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ',
        'ਬਰਸਾਤ ਦੇ ਮੌਸਮ ਵਿੱਚ ਮੱਕੀ ਬਹੁਤੀ ਸੰਘਣੀ ਨਾ ਬੀਜੋ'
      ]
    },
    chemicalSprays: {
      en: [
        {
          medicineName: 'Amistar Top / Azoxystrobin + Difenoconazole',
          dose: '200 ml per acre in 200 liters water',
          safetyDays: '21 days before corn harvest',
          advice: 'Spray at silking/tasseling stage to safeguard ear leaves.'
        },
        {
          medicineName: 'Mancozeb 75% WP (Dithane M-45)',
          dose: '600-800 grams per acre in 200 liters water',
          safetyDays: '15 days',
          advice: 'Cost-effective contact spray on lower canopy leaves.'
        }
      ],
      hi: [
        {
          medicineName: 'एमीस्टार टॉप (Azoxystrobin + Difenoconazole)',
          dose: '200 मिली प्रति एकड़ 200 लीटर पानी में',
          safetyDays: 'कटाई से 21 दिन पहले',
          advice: 'मक्का में भुट्टा और बाल निकलने के समय स्प्रे करने से पूरा लाभ मिलता है।'
        },
        {
          medicineName: 'डाइथेन एम-45 / मैंकोजेब (Mancozeb 75% WP)',
          dose: '600 से 800 ग्राम प्रति एकड़ 200 लीटर पानी में',
          safetyDays: '15 दिन',
          advice: 'सस्ता और असरदार फफूंदनाशक। शुरुआती धब्बों पर तुरंत छिड़कें।'
        }
      ],
      pa: [
        {
          medicineName: 'ਐਮੀਸਟਾਰ ਟਾਪ (Amistar Top / ਅਜ਼ੌਕਸੀਸਟ੍ਰੋਬਿਨ + ਡਾਈਫੈਨੋਕੋਨਾਜ਼ੋਲ)',
          dose: '200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: 'ਵਾਢੀ ਤੋਂ 21 ਦਿਨ ਪਹਿਲਾਂ',
          advice: 'ਮੱਕੀ ਦੇ ਛੱਲੀ ਨਿਸਰਨ ਵੇਲੇ ਸਪਰੇਅ ਕਰੋ ਤਾਂ ਜੋ ਛੱਲੀ ਦੇ ਨਾਲ ਦੇ ਪੱਤੇ ਬਚੇ ਰਹਿਣ।'
        },
        {
          medicineName: 'ਡਾਈਥੇਨ ਐੱਮ-45 (Dithane M-45 / ਮੈਨਕੋਜ਼ੇਬ)',
          dose: '600 ਤੋਂ 800 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ',
          safetyDays: '15 ਦਿਨ',
          advice: 'ਕਿਫ਼ਾਇਤੀ ਤੇ ਅਸਰਦਾਰ ਦਵਾਈ। ਸ਼ੁਰੂਆਤੀ ਦਾਗ਼ਾਂ ਵੇਲੇ ਹੀ ਛਿੜਕ ਦਿਓ।'
        }
      ]
    },
    prevention: {
      en: [
        'Sow blight-tolerant hybrid maize seeds',
        'Maintain balanced potash and zinc nutrition to strengthen leaf walls',
        'Rotate field with soybean, cotton, or pulses'
      ],
      hi: [
        'बीमारी रोधी संकर (हाइब्रिड) मक्का बीज ही बोएं',
        'खेत में पोटाश और जिंक की कमी न होने दें ताकि पौधे मजबूत रहें',
        'फसल चक्र में दलहन या सोयाबीन लगाएं'
      ],
      pa: [
        'ਬਿਮਾਰੀ ਸਹਿਣ ਵਾਲੇ ਹਾਈਬ੍ਰਿਡ ਮੱਕੀ ਦੇ ਬੀਜ ਹੀ ਬੀਜੋ',
        'ਪੋਟਾਸ਼ ਅਤੇ ਜਿੰਕ ਦੀ ਪੂਰੀ ਖ਼ੁਰਾਕ ਪਾਓ ਤਾਂ ਜੋ ਬੂਟੇ ਮਜ਼ਬੂਤ ਹੋਣ',
        'ਖੇਤ ਵਿੱਚ ਫਸਲ ਬਦਲੀ ਵਜੋਂ ਦਾਲਾਂ ਜਾਂ ਸੋਇਆਬੀਨ ਲਾਓ'
      ]
    },
    favorableWeather: {
      en: 'Moderate temperatures (18°C to 27°C) with persistent moisture and dew.',
      hi: 'मध्यम तापमान (18°C से 27°C) और लगातार नमी व धुंध।',
      pa: 'ਦਰਮਿਆਨਾ ਤਾਪਮਾਨ (18°C ਤੋਂ 27°C) ਅਤੇ ਲਗਾਤਾਰ ਸਿੱਲ੍ਹ ਤੇ ਤਰੇਲ।'
    },
    yieldRisk: {
      en: '25% – 45% yield drop if infection hits ear leaves prior to silking.',
      hi: '25% से 45% तक भुट्टे में दानों का वजन घट सकता है।',
      pa: '25% ਤੋਂ 45% ਤੱਕ ਛੱਲੀ ਦੇ ਦਾਣਿਆਂ ਦਾ ਵਜ਼ਨ ਘਟ ਸਕਦਾ ਹੈ।'
    },
    audioScript: {
      en: 'Corn leaf blight detected. Spray Amistar Top 200ml per acre in 200 liters water or Mancozeb 700 grams.',
      hi: 'मक्का में पत्ता झुलसा रोग है। एमीस्टार टॉप 200 मिली प्रति एकड़ 200 लीटर पानी में छिड़कें।',
      pa: 'ਮੱਕੀ ਵਿੱਚ ਪੱਤਾ ਝੁਲਸ ਰੋਗ ਹੈ। ਐਮੀਸਟਾਰ ਟਾਪ 200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਸਪਰੇਅ ਕਰੋ।'
    }
  },

  {
    id: 'healthy-crop',
    crop: 'Wheat',
    pathogenClass: 'Healthy',
    typicalSeverity: 'Healthy',
    defaultConfidence: 99.1,
    sampleImageUrl: riceImg,
    names: {
      en: 'Healthy Crop (No Active Disease)',
      hi: 'बिल्कुल स्वस्थ फसल (कोई बीमारी नहीं)',
      pa: 'ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਫਸਲ (ਕੋਈ ਰੋਗ ਨਹੀਂ)'
    },
    scientificName: 'Vigorous crop growth',
    symptoms: {
      en: 'Vibrant green leaves, clear clean veins, firm stems, and zero disease spots or fungal infection.',
      hi: 'चमकदार हरे पत्ते, साफ नसें, मजबूत तना और किसी भी फफूंद या कीड़े के निशान नहीं हैं।',
      pa: 'ਚਮਕਦਾਰ ਹਰੇ ਪੱਤੇ, ਸਾਫ਼ ਨਾੜਾਂ, ਮਜ਼ਬੂਤ ਤਣਾ ਅਤੇ ਕੋਈ ਵੀ ਦਾਗ਼ ਜਾਂ ਉੱਲੀ ਦਾ ਅਸਰ ਨਹੀਂ ਹੈ।'
    },
    desiRemedy: {
      en: [
        'No chemical spray needed! Save your money.',
        'Apply seaweed extract or bio-stimulant foliar spray to boost plant immunity',
        'Maintain balanced irrigation schedule'
      ],
      hi: [
        'किसी भी रासायनिक स्प्रे की आवश्यकता नहीं है! अपने पैसे बचाएं।',
        'पौधों की ताकत बढ़ाने के लिए सीवीड या जैविक अर्क का हल्का छिड़काव कर सकते हैं',
        'संतुलित सिंचाई और खाद बनाए रखें'
      ],
      pa: [
        'ਕਿਸੇ ਵੀ ਜ਼ਹਿਰੀਲੀ ਸਪਰੇਅ ਦੀ ਕੋਈ ਲੋੜ ਨਹੀਂ ਹੈ! ਆਪਣੇ ਪੈਸੇ ਬਚਾਓ।',
        'ਫਸਲ ਦੀ ਤਾਕਤ ਲਈ ਜੈਵਿਕ ਅਰਕ ਦਾ ਹਲਕਾ ਛਿੜਕਾਅ ਕਰ ਸਕਦੇ ਹੋ',
        'ਸੰਤੁਲਿਤ ਪਾਣੀ ਅਤੇ ਖਾਦ ਜਾਰੀ ਰੱਖੋ'
      ]
    },
    chemicalSprays: {
      en: [],
      hi: [],
      pa: []
    },
    prevention: {
      en: [
        'Keep scouting your fields every 5 to 7 days',
        'Keep field borders weed-free to prevent pest migration'
      ],
      hi: [
        'हर 5 से 7 दिन में खेत का नियमित चक्कर लगाते रहें',
        'मेड़ों पर घास-फूस न उगने दें ताकि कीड़े खेत में न आएं'
      ],
      pa: [
        'ਹਰ 5 ਤੋਂ 7 ਦਿਨਾਂ ਬਾਅਦ ਖੇਤ ਦਾ ਗੇੜਾ ਮਾਰਦੇ ਰਹੋ',
        'ਵੱਟਾਂ ਉੱਤੇ ਘਾਹ-ਫੂਸ ਨਾ ਉੱਗਣ ਦਿਓ ਤਾਂ ਜੋ ਕੀੜੇ ਖੇਤ ਵਿੱਚ ਨਾ ਆਉਣ'
      ]
    },
    favorableWeather: {
      en: 'Favorable seasonal weather for steady crop progress.',
      hi: 'फसल की बढ़वार के लिए मौसम बिल्कुल अनुकूल है।',
      pa: 'ਫਸਲ ਦੇ ਵਾਧੇ ਲਈ ਮੌਸਮ ਬਿਲਕੁਲ ਢੁਕਵਾਂ ਹੈ।'
    },
    yieldRisk: {
      en: '0% — Expected harvest is healthy and protected.',
      hi: '0% — फसल पूरी तरह सुरक्षित है और भरपूर पैदावार की उम्मीद है।',
      pa: '0% — ਫਸਲ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਹੈ ਅਤੇ ਚੰਗੇ ਝਾੜ ਦੀ ਉਮੀਦ ਹੈ।'
    },
    audioScript: {
      en: 'Congratulations! Your crop is healthy with no disease symptoms. No chemical sprays are needed.',
      hi: 'बधाई हो! आपकी फसल बिल्कुल स्वस्थ है और कोई रोग नहीं है। किसी रासायनिक दवा की जरूरत नहीं है।',
      pa: 'ਵਧਾਈਆਂ! ਤੁਹਾਡੀ ਫਸਲ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਹੈ ਅਤੇ ਕੋਈ ਰੋਗ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਦਵਾਈ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ।'
    }
  }
];
