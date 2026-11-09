import { Language } from './translations';

export interface SeedItem {
  id: string;
  category: 'cereals' | 'cash_crops' | 'oilseeds' | 'pulses' | 'vegetables' | 'fodder';
  icon: string;
  names: Record<Language, string>;
  season: Record<Language, string>;
  varieties: string[];
  seedRatePerAcre: Record<Language, string>;
  sowingTime: Record<Language, string>;
  spacingAndDepth: Record<Language, string>;
  seedTreatment: Record<Language, string[]>;
  expectedYield: Record<Language, string>;
  keyTips: Record<Language, string[]>;
}

export const ALL_SEEDS: SeedItem[] = [
  // 1. Wheat
  {
    id: 'seed-wheat',
    category: 'cereals',
    icon: '🌾',
    names: {
      en: 'Wheat Seeds',
      hi: 'गेहूँ के बीज',
      pa: 'ਕਣਕ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Rabi (Winter)',
      hi: 'रबी (सर्दियों का मौसम)',
      pa: 'ਹਾੜ੍ਹੀ (ਸਰਦੀਆਂ ਦੀ ਰੁੱਤ)'
    },
    varieties: [
      'DBW 187 (Karan Vandana) - High heat tolerance & yellow rust resistant',
      'DBW 222 (Karan Narendra) - Strong stem, non-lodging',
      'PBW 824 - PAU Ludhiana recommended, rust free',
      'HD 3086 (Pusa Gautami) - High chapati quality & yield',
      'PBW 725 - Excellent tillering & grain weight',
      'DBW 303 (Karan Vaishnavi) - Ultra-high potential (28-30 qtl/acre)'
    ],
    seedRatePerAcre: {
      en: '40 to 45 kg per acre (increase to 50 kg for late sowing in December)',
      hi: '40 से 45 किलोग्राम प्रति एकड़ (दिसंबर की पछेती बुवाई में 50 किलो)',
      pa: '40 ਤੋਂ 45 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (ਦਸੰਬਰ ਦੀ ਪਛੇਤੀ ਬਿਜਾਈ ਵੇਲੇ 50 ਕਿੱਲੋ)'
    },
    sowingTime: {
      en: 'Optimal: 25 October to 15 November. Late limit: up to 10 December',
      hi: 'सही समय: 25 अक्टूबर से 15 नवंबर। पछेती: 10 दिसंबर तक',
      pa: 'ਸਭ ਤੋਂ ਸਹੀ ਸਮਾਂ: 25 ਅਕਤੂਬਰ ਤੋਂ 15 ਨਵੰਬਰ। ਪਛੇਤੀ: 10 ਦਸੰਬਰ ਤੱਕ'
    },
    spacingAndDepth: {
      en: 'Row to row: 20-22 cm | Depth: 4 to 5 cm (use Happy Seeder / Super Seeder)',
      hi: 'कतार से कतार: 20-22 सेमी | गहराई: 4 से 5 सेमी (सुपर सीडर या हैप्पी सीडर)',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 20-22 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 4 ਤੋਂ 5 ਸੈਂਟੀਮੀਟਰ (ਸੁਪਰ ਸੀਡਰ / ਹੈਪੀ ਸੀਡਰ)'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat 40 kg seed with 80 ml Raxil Easy (Tebuconazole) in 400 ml water against Loose Smut (Kangyari).',
        'Step 2: Dry seed in shade for 2 hours before drill sowing.',
        'Step 3: If termite (deemak) issue in soil, treat with Cruiser 70 WS (Thiamethoxam).'
      ],
      hi: [
        'पहला कदम: 40 किलो बीज को 80 मिली रैक्सिल ईजी (टेबुकोनाजोल) से उपचारित करें ताकि कंडुआ (कांगियारी) न लगे।',
        'दूसरा कदम: बीज को 2 घंटे छाया में सुखाएं, सीधी धूप में न रखें।',
        'तीसरा कदम: दीमक की समस्या वाले खेतों में क्रूज़र 70 WS (थियामेथोक्सम) से उपचार करें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: 40 ਕਿੱਲੋ ਬੀਜ ਨੂੰ 80 ਮਿਲੀਲੀਟਰ ਰੈਕਸਿਲ ਈਜ਼ੀ (ਟੈਬੂਕੋਨਾਜ਼ੋਲ) ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ ਕਾਂਗਿਆਰੀ ਰੋਗ ਨਾ ਲੱਗੇ।',
        'ਦੂਜਾ ਕਦਮ: ਬੀਜ ਨੂੰ 2 ਘੰਟੇ ਛਾਂ ਵਿੱਚ ਸੁਕਾਓ, ਕਦੇ ਵੀ ਸਿੱਧੀ ਧੁੱਪ ਵਿੱਚ ਨਾ ਰੱਖੋ।',
        'ਤੀਜਾ ਕਦਮ: ਸਿਉਂਕ ਵਾਲੇ ਖੇਤਾਂ ਲਈ ਬੀਜ ਨੂੰ ਕਰੂਜ਼ਰ 70 WS (ਥਾਇਆਮੈਥੋਕਸਮ) ਨਾਲ ਸੋਧੋ।'
      ]
    },
    expectedYield: {
      en: '22 to 28 Quintals per acre (55 to 70 maunds)',
      hi: '22 से 28 क्विंटल प्रति एकड़ (55 से 70 मन)',
      pa: '22 ਤੋਂ 28 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (55 ਤੋਂ 70 ਮਣ)'
    },
    keyTips: {
      en: [
        'Do not apply first irrigation before 21 days (Crown Root Initiation stage).',
        'Do not broadcast fertilizer in windy weather; split urea into 3 balanced doses.',
        'Inspect borders weekly in Jan-Feb for yellow rust powder spots.'
      ],
      hi: [
        'पहला पानी बुवाई के 21 दिन बाद (सीआरआई अवस्था) ही लगाएं, पहले न दें।',
        'यूरिया को एक साथ न डालें, 3 बराबर किस्तों में बांटकर पहली और दूसरी सिंचाई पर दें।',
        'जनवरी-फरवरी में बादलों वाले मौसम में पीला रतुआ की जांच करते रहें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਪਾਣੀ ਬਿਜਾਈ ਤੋਂ 21 ਦਿਨ ਬਾਅਦ (ਕੋਰ ਵੇਲੇ) ਹੀ ਲਾਓ, ਪਹਿਲਾਂ ਨਾ ਲਾਓ।',
        'ਯੂਰੀਆ ਇੱਕੋ ਵਾਰ ਨਾ ਸੁੱਟੋ, ਬਰਾਬਰ 3 ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਕੇ ਪਾਓ।',
        'ਜਨਵਰੀ-ਫਰਵਰੀ ਵਿੱਚ ਬੱਦਲਵਾਈ ਵੇਲੇ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਨਿਗਰਾਨੀ ਰੱਖੋ।'
      ]
    }
  },

  // 2. Paddy / Rice
  {
    id: 'seed-rice',
    category: 'cereals',
    icon: '🌱',
    names: {
      en: 'Paddy / Rice Seeds',
      hi: 'धान (चावल) के बीज',
      pa: 'ਝੋਨੇ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Kharif (Monsoon)',
      hi: 'खरीफ (मानसून का मौसम)',
      pa: 'ਸਾਉਣੀ (ਮਾਨਸੂਨ ਦੀ ਰੁੱਤ)'
    },
    varieties: [
      'PR 126 - Super fast 93 days, saves 20-25% water, high yield',
      'PR 131 - Bacterial blight resistant, bold heavy grains',
      'PR 128 - PAU Ludhiana certified, high milling recovery',
      'PR 121 - Popular medium duration variety',
      'Pusa 44 - Long duration (needs cautious water management)'
    ],
    seedRatePerAcre: {
      en: '4 to 5 kg per acre for nursery transplanting (8-10 kg for Direct Seeded Rice / DSR)',
      hi: '4 से 5 किलोग्राम प्रति एकड़ नर्सरी (पनीरी) के लिए (सीधी बिजाई में 8-10 किलो)',
      pa: '4 ਤੋਂ 5 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਪਨੀਰੀ ਲਈ (ਸਿੱਧੀ ਬਿਜਾਈ / ਡੀ.ਐੱਸ.ਆਰ. ਵਿੱਚ 8-10 ਕਿੱਲੋ)'
    },
    sowingTime: {
      en: 'Nursery sowing: 15 May to 5 June. Transplanting: 20 June to 10 July',
      hi: 'पनीरी बिजाई: 15 मई से 5 जून। रोपाई: 20 जून से 10 जुलाई',
      pa: 'ਪਨੀਰੀ ਬੀਜਣ ਦਾ ਸਮਾਂ: 15 ਮਈ ਤੋਂ 5 ਜੂਨ। ਲੁਆਈ: 20 ਜੂਨ ਤੋਂ 10 ਜੁਲਾਈ'
    },
    spacingAndDepth: {
      en: 'Spacing: 20 cm x 15 cm | Plant 2 seedlings per hill | Depth: 2 to 3 cm',
      hi: 'दूरी: 20 सेमी x 15 सेमी | एक जगह 2 पौधे लगाएं | गहराई: 2 से 3 सेमी',
      pa: 'ਵਿੱਥ: 20 ਸੈਂਟੀਮੀਟਰ x 15 ਸੈਂਟੀਮੀਟਰ | ਇੱਕ ਥਾਂ 2 ਬੂਟੇ ਲਾਓ | ਡੂੰਘਾਈ: 2 ਤੋਂ 3 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Dip seeds in 10% salt water. Discard floating hollow seeds.',
        'Step 2: Wash good heavy sunken seeds twice in fresh water.',
        'Step 3: Soak in water with 3g Sprint / Bavistin (Carbendazim) per kg seed for 12 hours before sprouting.'
      ],
      hi: [
        'पहला कदम: 10% नमक वाले पानी में बीज डालें, ऊपर तैरने वाले थोथे बीजों को फेंक दें।',
        'दूसरा कदम: नीचे बैठे भारी बीजों को दो बार साफ पानी से धोएं।',
        'तीसरा कदम: 3 ग्राम बाविस्टिन प्रति किलो बीज के हिसाब से 12 घंटे पानी में भिगोएं।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: 10% ਲੂਣ ਵਾਲੇ ਪਾਣੀ ਵਿੱਚ ਬੀਜ ਪਾਓ, ਉੱਪਰ ਤੈਰਨ ਵਾਲੇ ਖੋਖਲੇ ਬੀਜ ਕੱਢ ਕੇ ਸੁੱਟ ਦਿਓ।',
        'ਦੂਜਾ ਕਦਮ: ਹੇਠਾਂ ਬੈਠੇ ਭਾਰੀ ਬੀਜਾਂ ਨੂੰ ਸਾਫ਼ ਪਾਣੀ ਨਾਲ 2 ਵਾਰ ਧੋਵੋ।',
        'ਤੀਜਾ ਕਦਮ: 3 ਗ੍ਰਾਮ ਬਾਵਿਸਟਿਨ ਪ੍ਰਤੀ ਕਿੱਲੋ ਬੀਜ ਦੇ ਹਿਸਾਬ ਨਾਲ 12 ਘੰਟੇ ਪਾਣੀ ਵਿੱਚ ਭਿਓਂ ਕੇ ਰੱਖੋ।'
      ]
    },
    expectedYield: {
      en: '30 to 36 Quintals per acre (75 to 90 maunds)',
      hi: '30 से 36 क्विंटल प्रति एकड़ (75 से 90 मन)',
      pa: '30 ਤੋਂ 36 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (75 ਤੋਂ 90 ਮਣ)'
    },
    keyTips: {
      en: [
        'Transplant 25-30 day old seedlings only; avoid overgrown nursery.',
        'Keep 2 inches standing water for first 15 days, then irrigate intermittently to save ground water.',
        'Zinc sulphate (21% @ 25 kg/acre) must be applied to prevent Khaira disease.'
      ],
      hi: [
        '25 से 30 दिन की स्वस्थ पनीरी ही लगाएं, ज्यादा बड़ी पनीरी लगाने से कल्ले कम फूटते हैं।',
        'शुरुआती 15 दिन खेत में 2 इंच पानी रखें, फिर पानी सुखा-सुखा कर लगाएं।',
        'खैरा रोग से बचाव के लिए 25 किलो जिंक सल्फेट (21%) प्रति एकड़ जरूर डालें।'
      ],
      pa: [
        '25 ਤੋਂ 30 ਦਿਨਾਂ ਦੀ ਤੰਦਰੁਸਤ ਪਨੀਰੀ ਹੀ ਲਾਓ, ਵੱਡੀ ਪਨੀਰੀ ਨਾਲ ਫੁਟਾਰਾ ਘੱਟ ਹੁੰਦਾ ਹੈ।',
        'ਮੁੱਢਲੇ 15 ਦਿਨ ਖੇਤ ਵਿੱਚ 2 ਇੰਚ ਪਾਣੀ ਰੱਖੋ, ਮਗਰੋਂ ਪਾਣੀ ਸੁਕਾ-ਸੁਕਾ ਕੇ ਲਾਓ।',
        'ਖਹਿਰਾ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ 25 ਕਿੱਲੋ ਜ਼ਿੰਕ ਸਲਫੇਟ (21%) ਪ੍ਰਤੀ ਏਕੜ ਜ਼ਰੂਰ ਪਾਓ।'
      ]
    }
  },

  // 3. Basmati Rice
  {
    id: 'seed-basmati',
    category: 'cereals',
    icon: '🌾',
    names: {
      en: 'Basmati Rice Seeds',
      hi: 'बासमती धान के बीज',
      pa: 'ਬਾਸਮਤੀ ਚਾਵਲ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Kharif',
      hi: 'खरीफ',
      pa: 'ਸਾਉਣੀ'
    },
    varieties: [
      'Pusa Basmati 1121 - World famous extra long slender grain',
      'Pusa Basmati 1509 - Early maturing (120 days), low water needs',
      'Pusa Basmati 1718 - Bacterial leaf blight resistant version of 1121',
      'Punjab Basmati 7 - PAU certified, rich traditional aroma',
      'Pusa Basmati 1847 - Newest blight and blast resistant'
    ],
    seedRatePerAcre: {
      en: '4 to 5 kg per acre nursery seed',
      hi: '4 से 5 किलोग्राम प्रति एकड़ नर्सरी',
      pa: '4 ਤੋਂ 5 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਪਨੀਰੀ'
    },
    sowingTime: {
      en: 'Nursery sowing: 1 to 15 June. Transplanting: 1 to 15 July',
      hi: 'पनीरी बुवाई: 1 से 15 जून। रोपाई: 1 से 15 जुलाई',
      pa: 'ਪਨੀਰੀ ਬਿਜਾਈ: 1 ਤੋਂ 15 ਜੂਨ। ਲੁਆਈ: 1 ਤੋਂ 15 ਜੁਲਾਈ'
    },
    spacingAndDepth: {
      en: 'Spacing: 20 cm x 15 cm | 2 seedlings per hill | Depth: 2-3 cm',
      hi: 'दूरी: 20 सेमी x 15 सेमी | एक जगह 2 पौधे | गहराई: 2-3 सेमी',
      pa: 'ਵਿੱਥ: 20 ਸੈਂਟੀਮੀਟਰ x 15 ਸੈਂਟੀਮੀਟਰ | 2 ਬੂਟੇ ਪ੍ਰਤੀ ਥਾਂ | ਡੂੰਘਾਈ: 2-3 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Salt water separation (10%) to remove unviable light seeds.',
        'Step 2: Soak for 24 hours in water with Trichoderma harzianum (10g/kg) or Carbendazim (2g/kg).',
        'Step 3: Cover soaked seed with moist gunny bags for 24 hours to sprout.'
      ],
      hi: [
        'पहला कदम: 10% नमक के पानी में डुबोकर हल्के बीज अलग करें।',
        'दूसरा कदम: ट्राइकोडर्मा (10 ग्राम/किलो) या बाविस्टिन (2 ग्राम/किलो) में 24 घंटे भिगोएं।',
        'तीसरा कदम: गीली बोरी में लपेटकर 24 घंटे अंकुरित करें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: 10% ਲੂਣ ਦੇ ਪਾਣੀ ਵਿੱਚ ਡੁਬੋ ਕੇ ਹੌਲੇ ਬੀਜ ਵੱਖ ਕਰੋ।',
        'ਦੂਜਾ ਕਦਮ: ਟ੍ਰਾਈਕੋਡਰਮਾ (10 ਗ੍ਰਾਮ/ਕਿੱਲੋ) ਜਾਂ ਬਾਵਿਸਟਿਨ (2 ਗ੍ਰਾਮ/ਕਿੱਲੋ) ਵਿੱਚ 24 ਘੰਟੇ ਭਿਓਂਵੋ।',
        'ਤੀਜਾ ਕਦਮ: ਗਿੱਲੀ ਬੋਰੀ ਵਿੱਚ ਲਪੇਟ ਕੇ 24 ਘੰਟੇ ਪੁੰਗਰਨ ਦਿਓ।'
      ]
    },
    expectedYield: {
      en: '18 to 24 Quintals per acre (fetch premium market price)',
      hi: '18 से 24 क्विंटल प्रति एकड़ (मंडी में सबसे अधिक भाव)',
      pa: '18 ਤੋਂ 24 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (ਮੰਡੀ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਧ ਭਾਅ)'
    },
    keyTips: {
      en: [
        'Do not apply excessive urea; basmati plants will lodge (fall) and get blast.',
        'Never spray prohibited chemicals 40 days before harvest to pass export pesticide tests.',
        'Maintain light soil moisture during grain filling stage.'
      ],
      hi: [
        'यूरिया का बहुत कम इस्तेमाल करें, ज्यादा यूरिया से बासमती गिर जाती है और झुलसा लगता है।',
        'कटाई से 40 दिन पहले कोई भी प्रतिबंधित कीटनाशक न डालें ताकि एक्सपोर्ट में पास हो सके।',
        'दाना भरते समय खेत में हल्की नमी बनी रहनी चाहिए।'
      ],
      pa: [
        'ਯੂਰੀਆ ਬਹੁਤ ਘੱਟ ਵਰਤੋ, ਜ਼ਿਆਦਾ ਯੂਰੀਆ ਨਾਲ ਬਾਸਮਤੀ ਡਿੱਗ ਪੈਂਦੀ ਹੈ ਤੇ ਬਲਾਸਟ ਰੋਗ ਲੱਗਦਾ ਹੈ।',
        'ਵਾਢੀ ਤੋਂ 40 ਦਿਨ ਪਹਿਲਾਂ ਕੋਈ ਵੀ ਪਾਬੰਦੀਸ਼ੁਦਾ ਕੀਟਨਾਸ਼ਕ ਨਾ ਛਿੜਕੋ ਤਾਂ ਜੋ ਬਾਹਰਲੇ ਦੇਸ਼ਾਂ ਨੂੰ ਵਿਕ ਸਕੇ।',
        'ਦਾਣਾ ਭਰਨ ਵੇਲੇ ਖੇਤ ਵਿੱਚ ਹਲਕੀ ਸਿੱਲ੍ਹ ਜ਼ਰੂਰ ਰੱਖੋ।'
      ]
    }
  },

  // 4. Cotton / Narma
  {
    id: 'seed-cotton',
    category: 'cash_crops',
    icon: '☁️',
    names: {
      en: 'Cotton / Narma Seeds',
      hi: 'कपास / नरमा के बीज',
      pa: 'ਨਰਮਾ / ਕਪਾਹ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Kharif',
      hi: 'खरीफ',
      pa: 'ਸਾਉਣੀ'
    },
    varieties: [
      'RCH 773 BG II - High boll weight & bollworm tolerance',
      'RCH 659 BG II - Consistent high yielding hybrid',
      'US 51 - Drought and sucking pest tolerant',
      'Ankur 3028 - Large fluffy bolls, easy picking',
      'Bioseed 6588 - Good staple length and strength'
    ],
    seedRatePerAcre: {
      en: '1 to 1.5 packets (approx. 450 to 900 grams BT cotton seed)',
      hi: '1 से 1.5 पैकेट (लगभग 450 से 900 ग्राम बीटी कपास बीज)',
      pa: '1 ਤੋਂ 1.5 ਪੈਕਟ (ਲਗਭਗ 450 ਤੋਂ 900 ਗ੍ਰਾਮ ਬੀਟੀ ਨਰਮਾ ਬੀਜ)'
    },
    sowingTime: {
      en: '15 April to 15 May (early sowing protects against whitefly and pink bollworm)',
      hi: '15 अप्रैल से 15 मई (अगेती बुवाई सफेद मक्खी और गुलाबी सुंडी से बचाती है)',
      pa: '15 ਅਪ੍ਰੈਲ ਤੋਂ 15 ਮਈ (ਅਗੇਤੀ ਬਿਜਾਈ ਚਿੱਟੀ ਮੱਖੀ ਤੇ ਗੁਲਾਬੀ ਸੁੰਡੀ ਤੋਂ ਬਚਾਉਂਦੀ ਹੈ)'
    },
    spacingAndDepth: {
      en: 'Row to row: 67.5 to 90 cm | Plant to plant: 60 cm | Depth: 4 to 5 cm',
      hi: 'कतार से कतार: 67.5 से 90 सेमी | पौधे से पौधा: 60 सेमी | गहराई: 4 से 5 सेमी',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 67.5 ਤੋਂ 90 ਸੈਂਟੀਮੀਟਰ | ਬੂਟੇ ਤੋਂ ਬੂਟਾ: 60 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 4 ਤੋਂ 5 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Commercial certified BT packets are already pre-treated with Cruiser (Thiamethoxam).',
        'If using non-BT border refuge seed, treat with Imidacloprid (7g/kg) against early jassids.'
      ],
      hi: [
        'प्रमाणित बीटी पैकेट पहले से ही कीटनाशक व फफूंदनाशक से उपचारित होते हैं।',
        'यदि गैर-बीटी शरण बीज है तो इमिडाक्लोप्रिड (7 ग्राम/किलो) से उपचार करें।'
      ],
      pa: [
        'ਪ੍ਰਮਾਣਿਤ ਬੀਟੀ ਪੈਕਟ ਪਹਿਲਾਂ ਹੀ ਕੰਪਨੀ ਵੱਲੋਂ ਕੀਟਨਾਸ਼ਕ ਨਾਲ ਸੋਧੇ ਹੁੰਦੇ ਹਨ।',
        'ਜੇਕਰ ਆਮ ਬੀਜ ਹੈ ਤਾਂ ਇਮਿਡਾਕਲੋਪ੍ਰਿਡ (7 ਗ੍ਰਾਮ/ਕਿੱਲੋ) ਨਾਲ ਸੋਧੋ।'
      ]
    },
    expectedYield: {
      en: '10 to 14 Quintals per acre (raw kapas)',
      hi: '10 से 14 क्विंटल प्रति एकड़ (कच्चा कपास)',
      pa: '10 ਤੋਂ 14 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (ਫੁੱਟੀ / ਕਪਾਹ)'
    },
    keyTips: {
      en: [
        'Install yellow sticky traps (15 per acre) early to monitor whitefly population.',
        'Install 5 pheromone traps per acre from 45 days onwards to detect Pink Bollworm moths.',
        'Spray Potassium Nitrate (13-0-45 @ 2 kg/acre) 4 times during flowering to stop flower drop.'
      ],
      hi: [
        'सफेद मक्खी पर नजर रखने के लिए खेत में 15 पीले चिपचिपे कार्ड (येलो स्टिकी ट्रैप) लगाएं।',
        'गुलाबी सुंडी की निगरानी के लिए बुवाई के 45 दिन बाद फेरोमोन ट्रैप (5 प्रति एकड़) लगाएं।',
        'फूल व टिंडे बनते समय पोटैशियम नाइट्रेट (13-0-45 @ 2 किलो/एकड़) का 4 बार स्प्रे करें।'
      ],
      pa: [
        'ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਨਿਗਰਾਨੀ ਲਈ ਖੇਤ ਵਿੱਚ 15 ਪੀਲੇ ਕਾਰਡ (ਯੈਲੋ ਸਟਿੱਕੀ ਟਰੈਪ) ਜ਼ਰੂਰ ਲਾਓ।',
        'ਗੁਲਾਬੀ ਸੁੰਡੀ ਦੇ ਪਤੰਗਿਆਂ ਨੂੰ ਫੜਨ ਲਈ 45 ਦਿਨਾਂ ਬਾਅਦ ਫੇਰੋਮੋਨ ਟਰੈਪ (5 ਪ੍ਰਤੀ ਏਕੜ) ਲਾਓ।',
        'ਫੁੱਲ-ਗੁੱਡੀ ਡਿੱਗਣ ਤੋਂ ਰੋਕਣ ਲਈ ਪੋਟਾਸ਼ੀਅਮ ਨਾਈਟ੍ਰੇਟ (13-0-45 @ 2 ਕਿੱਲੋ/ਏਕੜ) ਦੀਆਂ 4 ਸਪਰੇਆਂ ਕਰੋ।'
      ]
    }
  },

  // 5. Mustard / Sarson
  {
    id: 'seed-mustard',
    category: 'oilseeds',
    icon: '🌼',
    names: {
      en: 'Mustard / Sarson Seeds',
      hi: 'सरसों / राया के बीज',
      pa: 'ਸਰ੍ਹੋਂ / ਰਾਯਾ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Rabi (Winter)',
      hi: 'रबी (सर्दियों का मौसम)',
      pa: 'ਹਾੜ੍ਹੀ (ਸਰਦੀਆਂ ਦੀ ਰੁੱਤ)'
    },
    varieties: [
      'Pioneer 45S46 - High oil percentage (41%), heavy branching',
      'Giriraj (DRMRIJ 31) - High yielding certified variety',
      'RH 725 - Robust stems, resistant to white rust',
      'PBR 357 - PAU Ludhiana recommended raya',
      'Laxmi - Popular drought hardy seed'
    ],
    seedRatePerAcre: {
      en: '1.5 kg per acre (do not sow thick)',
      hi: '1.5 किलोग्राम प्रति एकड़ (ज्यादा घना न बोएं)',
      pa: '1.5 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (ਜ਼ਿਆਦਾ ਸੰਘਣਾ ਨਾ ਬੀਜੋ)'
    },
    sowingTime: {
      en: '1 October to 25 October (ideal temperature 26°C to 28°C)',
      hi: '1 अक्टूबर से 25 अक्टूबर (तापमान 26°C से 28°C के बीच)',
      pa: '1 ਅਕਤੂਬਰ ਤੋਂ 25 ਅਕਤੂਬਰ (ਤਾਪਮਾਨ 26°C ਤੋਂ 28°C ਵਿਚਕਾਰ)'
    },
    spacingAndDepth: {
      en: 'Row to row: 30 to 45 cm | Plant to plant: 15 cm | Depth: 2.5 to 3 cm',
      hi: 'कतार से कतार: 30 से 45 सेमी | पौधे से पौधा: 15 सेमी | गहराई: 2.5 से 3 सेमी',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 30 ਤੋਂ 45 ਸੈਂਟੀਮੀਟਰ | ਬੂਟੇ ਤੋਂ ਬੂਟਾ: 15 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 2.5 ਤੋਂ 3 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat 1.5 kg seed with Apron 35 SD (Metalaxyl 6g/kg) to prevent White Rust.',
        'Step 2: Treat with Thiamethoxam (3g/kg) to protect early seedlings from Painted Bug.'
      ],
      hi: [
        'पहला कदम: 1.5 किलो बीज को 6 ग्राम एप्रन 35 SD से उपचारित करें ताकि सफेद रतुआ न लगे।',
        'दूसरा कदम: चितकबरा कीड़ा (पेंटेड बग) से बचाव के लिए 3 ग्राम थियामेथोक्सम प्रति किलो मिलाएं।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: 1.5 ਕਿੱਲੋ ਬੀਜ ਨੂੰ 6 ਗ੍ਰਾਮ ਐਪਰਨ 35 SD ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ ਚਿੱਟੀ ਕੁੰਗੀ ਨਾ ਲੱਗੇ।',
        'ਦੂਜਾ ਕਦਮ: ਚਿਤਕਬਰੇ ਕੀੜੇ ਤੋਂ ਬਚਾਅ ਲਈ 3 ਗ੍ਰਾਮ ਥਾਇਆਮੈਥੋਕਸਮ ਪ੍ਰਤੀ ਕਿੱਲੋ ਮਿਲਾਓ।'
      ]
    },
    expectedYield: {
      en: '8 to 12 Quintals per acre',
      hi: '8 से 12 क्विंटल प्रति एकड़',
      pa: '8 ਤੋਂ 12 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ'
    },
    keyTips: {
      en: [
        'Thinning is mandatory at 15-20 days; keep only 1 vigorous seedling every 15 cm.',
        'Apply Sulphur (Bentonite Sulphur 90% @ 10 kg/acre) to increase oil yield by 15-20%.',
        'Scout for mustard aphid (chepa/tela) in cloudy January weather; spray before pods fill.'
      ],
      hi: [
        '15 से 20 दिन बाद विरलीकरण (छंटाई) जरूर करें और 15 सेमी पर एक ही पौधा रखें।',
        'तेल की मात्रा बढ़ाने के लिए 10 किलो सल्फर प्रति एकड़ बुवाई के समय जरूर डालें।',
        'जनवरी में चेपा (माहू/तेला) की निगरानी करें और फलियां बनने से पहले दवा छिड़कें।'
      ],
      pa: [
        '15 ਤੋਂ 20 ਦਿਨਾਂ ਬਾਅਦ ਛਾਂਟੀ (ਵਿਰਲਾ) ਜ਼ਰੂਰ ਕਰੋ, 15 ਸੈਂਟੀਮੀਟਰ ਤੇ ਇੱਕੋ ਬੂਟਾ ਰੱਖੋ।',
        'ਤੇਲ ਦੀ ਮਾਤਰਾ ਵਧਾਉਣ ਲਈ 10 ਕਿੱਲੋ ਸਲਫਰ ਪ੍ਰਤੀ ਏਕੜ ਬਿਜਾਈ ਵੇਲੇ ਜ਼ਰੂਰ ਪਾਓ।',
        'ਜਨਵਰੀ ਵਿੱਚ ਤੇਲੇ (ਚੇਪੇ) ਦੀ ਜਾਂਚ ਰੱਖੋ ਅਤੇ ਫਲੀਆਂ ਬਣਨ ਤੋਂ ਪਹਿਲਾਂ ਸਪਰੇਅ ਕਰੋ।'
      ]
    }
  },

  // 6. Maize / Corn
  {
    id: 'seed-corn',
    category: 'cereals',
    icon: '🌽',
    names: {
      en: 'Maize / Corn Seeds',
      hi: 'मक्का के बीज',
      pa: 'ਮੱਕੀ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Kharif & Spring',
      hi: 'खरीफ और बसंत',
      pa: 'ਸਾਉਣੀ ਅਤੇ ਬਸੰਤ'
    },
    varieties: [
      'Pioneer P3396 - Heavy bold cob, high starch and grain yield',
      'DKC 9108 (Dekalb) - Excellent stay-green character and husk cover',
      'PMH 1 - PAU certified Kharif hybrid',
      'PMH 13 - Spring season high performance hybrid',
      'Bio 9681 - Heat resilient hybrid'
    ],
    seedRatePerAcre: {
      en: '7 to 8 kg per acre hybrid seed',
      hi: '7 से 8 किलोग्राम प्रति एकड़ संकर (हाइब्रिड) बीज',
      pa: '7 ਤੋਂ 8 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਹਾਈਬ੍ਰਿਡ ਬੀਜ'
    },
    sowingTime: {
      en: 'Kharif: 25 May to 25 June | Spring: 20 January to 20 February',
      hi: 'खरीफ: 25 मई से 25 जून | बसंत: 20 जनवरी से 20 फरवरी',
      pa: 'ਸਾਉਣੀ: 25 ਮਈ ਤੋਂ 25 ਜੂਨ | ਬਸੰਤ: 20 ਜਨਵਰੀ ਤੋਂ 20 ਫਰਵਰੀ'
    },
    spacingAndDepth: {
      en: 'Row to row: 60 cm | Plant to plant: 20 cm | Depth: 4 to 5 cm',
      hi: 'कतार से कतार: 60 सेमी | पौधे से पौधा: 20 सेमी | गहराई: 4 से 5 सेमी',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 60 ਸੈਂਟੀਮੀਟਰ | ਬੂਟੇ ਤੋਂ ਬੂਟਾ: 20 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 4 ਤੋਂ 5 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat with Cruiser 70 WS (4g/kg) to protect against shoot fly and fall armyworm.',
        'Step 2: Add Bavistin (Carbendazim 2g/kg) for seedling rot prevention.'
      ],
      hi: [
        'पहला कदम: 4 ग्राम क्रूज़र 70 WS प्रति किलो बीज से उपचारित करें ताकि तना मक्खी व सुंडी न लगे।',
        'दूसरा कदम: 2 ग्राम बाविस्टिन मिलाकर फफूंद से बीज को बचाएं।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: 4 ਗ੍ਰਾਮ ਕਰੂਜ਼ਰ 70 WS ਪ੍ਰਤੀ ਕਿੱਲੋ ਬੀਜ ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ ਸੁੰਡੀ ਤੇ ਮੱਖੀ ਨਾ ਪਵੇ।',
        'ਦੂਜਾ ਕਦਮ: 2 ਗ੍ਰਾਮ ਬਾਵਿਸਟਿਨ ਮਿਲਾ ਕੇ ਉੱਲੀ ਰੋਗ ਤੋਂ ਬਚਾਓ।'
      ]
    },
    expectedYield: {
      en: '25 to 32 Quintals per acre',
      hi: '25 से 32 क्विंटल प्रति एकड़',
      pa: '25 ਤੋਂ 32 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ'
    },
    keyTips: {
      en: [
        'Tasseling and silking (cob emergence) are critical moisture stages; never stress crop here.',
        'Inspect plant whorls (goph) early for Fall Armyworm (FAW) caterpillar feeding.',
        'Do not allow standing rainwater to stagnate for more than 6 hours.'
      ],
      hi: [
        'भुट्टा और बाल निकलने के समय खेत में नमी की कमी न होने दें।',
        'पौधों की गोभ में फॉल आर्मीवर्म कीड़े की जांच करते रहें।',
        'बारिश का पानी खेत में 6 घंटे से ज्यादा न ठहरने दें।'
      ],
      pa: [
        'ਛੱਲੀ ਅਤੇ ਬਾਲ ਨਿਕਲਣ ਵੇਲੇ ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਦੀ ਘਾਟ ਨਾ ਆਉਣ ਦਿਓ।',
        'ਬੂਟਿਆਂ ਦੀ ਗੋਭ ਵਿੱਚ ਫਾਲ ਆਰਮੀਵਰਮ ਸੁੰਡੀ ਦੀ ਨਿਗਰਾਨੀ ਰੱਖੋ।',
        'ਮੀਂਹ ਦਾ ਪਾਣੀ ਖੇਤ ਵਿੱਚ 6 ਘੰਟਿਆਂ ਤੋਂ ਵੱਧ ਖੜ੍ਹਾ ਨਾ ਹੋਣ ਦਿਓ।'
      ]
    }
  },

  // 7. Potato (Seed Tubers)
  {
    id: 'seed-potato',
    category: 'vegetables',
    icon: '🥔',
    names: {
      en: 'Potato Seed Tubers',
      hi: 'आलू के बीज (कंद)',
      pa: 'ਆਲੂ ਦੇ ਬੀਜ (ਗੰਢੀਆਂ)'
    },
    season: {
      en: 'Autumn & Winter',
      hi: 'शरद ऋतु (अक्टूबर)',
      pa: 'ਸਰਦੀਆਂ (ਅਕਤੂਬਰ)'
    },
    varieties: [
      'Kufri Pukhraj - Early 70-80 days, large yellow oval tubers',
      'Kufri Jyoti - Multi-purpose table potato, widely adapted',
      'Kufri Chipsona 1 & 3 - High dry matter, best for chips processing',
      'Kufri Mohan - High yield frost tolerant',
      'Kufri Frysona - French fry grade'
    ],
    seedRatePerAcre: {
      en: '12 to 16 Quintals per acre (seed tubers size 35-45 mm, 40-50 grams each)',
      hi: '12 से 16 क्विंटल प्रति एकड़ (बीज कंद का आकार 35-45 मिमी, वजन 40-50 ग्राम)',
      pa: '12 ਤੋਂ 16 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (ਬੀਜ ਗੰਢੀਆਂ ਦਾ ਸਾਈਜ਼ 35-45 ਮਿ.ਮੀ., ਵਜ਼ਨ 40-50 ਗ੍ਰਾਮ)'
    },
    sowingTime: {
      en: 'Early crop: 15 to 25 September | Main crop: 1 to 20 October',
      hi: 'अगेती फसल: 15 से 25 सितंबर | मुख्य फसल: 1 से 20 अक्टूबर',
      pa: 'ਅਗੇਤੀ ਫਸਲ: 15 ਤੋਂ 25 ਸਤੰਬਰ | ਮੁੱਖ ਫਸਲ: 1 ਤੋਂ 20 ਅਕਤੂਬਰ'
    },
    spacingAndDepth: {
      en: 'Ridge to ridge: 60 cm | Tuber to tuber: 20 cm | Depth: 5 to 7 cm',
      hi: 'मेड़ से मेड़: 60 सेमी | कंद से कंद: 20 सेमी | गहराई: 5 से 7 सेमी',
      pa: 'ਵੱਟ ਤੋਂ ਵੱਟ: 60 ਸੈਂਟੀਮੀਟਰ | ਆਲੂ ਤੋਂ ਆਲੂ: 20 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 5 ਤੋਂ 7 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Take cold store seed out 10-14 days prior to sowing for green sprouting (chit emergence).',
        'Step 2: Dip seed tubers in Emisan-6 (0.25%) or Monceren (Pencycuron @ 2.5 ml/10L water) for 10 minutes to prevent black scurf.',
        'Step 3: Dry in shade on clean tarpaulin before mechanical planting.'
      ],
      hi: [
        'पहला कदम: कोल्ड स्टोर से 10-14 दिन पहले बीज निकालें ताकि आंखें फूट जाएं।',
        'दूसरा कदम: काली पपड़ी (ब्लैक स्कर्फ) से बचाव के लिए एमीसन-6 या मॉन्सेरेन में 10 मिनट डुबोएं।',
        'तीसरा कदम: साफ तिरपाल पर छाया में सुखाकर ही बिजाई करें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਕੋਲਡ ਸਟੋਰ ਵਿੱਚੋਂ 10-14 ਦਿਨ ਪਹਿਲਾਂ ਬੀਜ ਕੱਢੋ ਤਾਂ ਜੋ ਅੱਖਾਂ ਫੁੱਟ ਪੈਣ।',
        'ਦੂਜਾ ਕਦਮ: ਕਾਲੀ ਪਪੜੀ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਐਮੀਸਨ-6 ਜਾਂ ਮੌਨਸਰੀਨ ਵਿੱਚ 10 ਮਿੰਟ ਡੁਬੋਵੋ।',
        'ਤੀਜਾ ਕਦਮ: ਸਾਫ਼ ਤਰਪਾਲ ਉੱਤੇ ਛਾਂ ਵਿੱਚ ਸੁਕਾ ਕੇ ਹੀ ਬਿਜਾਈ ਕਰੋ।'
      ]
    },
    expectedYield: {
      en: '100 to 140 Quintals per acre (250 to 350 bags of 50 kg)',
      hi: '100 से 140 क्विंटल प्रति एकड़ (250 से 350 बोरी 50 किलो की)',
      pa: '100 ਤੋਂ 140 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (250 ਤੋਂ 350 ਗੱਟੇ 50 ਕਿੱਲੋ ਵਾਲੇ)'
    },
    keyTips: {
      en: [
        'Earth up ridges properly at 25-30 days to prevent sunlight turning potatoes green.',
        'Watch for Late Blight warnings during foggy Dec-Jan weeks.',
        'Cut haulms (vines) 10-12 days before digging to harden potato skin.'
      ],
      hi: [
        'बुवाई के 25-30 दिन बाद अच्छी तरह मिट्टी चढ़ाएं ताकि आलू धूप से हरे न हों।',
        'दिसंबर-जनवरी में कोहरे व धुंध के दौरान पछेती झुलसा का ध्यान रखें।',
        'खुदाई से 10-12 दिन पहले बेल काट दें ताकि आलू का छिलका मजबूत हो जाए।'
      ],
      pa: [
        'ਬਿਜਾਈ ਤੋਂ 25-30 ਦਿਨ ਬਾਅਦ ਚੰਗੀ ਮਿੱਟੀ ਚੜ੍ਹਾਓ ਤਾਂ ਜੋ ਆਲੂ ਧੁੱਪ ਨਾਲ ਹਰੇ ਨਾ ਹੋਣ।',
        'ਦਸੰਬਰ-ਜਨਵਰੀ ਵਿੱਚ ਧੁੰਦ ਵੇਲੇ ਪਿਛੇਤੇ ਝੁਲਸ ਰੋਗ ਦੀ ਚੌਕਸੀ ਰੱਖੋ।',
        'ਪੁਟਾਈ ਤੋਂ 10-12 ਦਿਨ ਪਹਿਲਾਂ ਵੇਲਾਂ ਕੱਟ ਦਿਓ ਤਾਂ ਜੋ ਆਲੂਆਂ ਦਾ ਛਿਲਕਾ ਪੱਕਾ ਹੋ ਜਾਵੇ।'
      ]
    }
  },

  // 8. Chickpea / Chana
  {
    id: 'seed-chana',
    category: 'pulses',
    icon: '🫘',
    names: {
      en: 'Gram / Chickpea Seeds',
      hi: 'चना (छोले) के बीज',
      pa: 'ਛੋਲੇ / ਚਣਿਆਂ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Rabi (Winter)',
      hi: 'रबी',
      pa: 'ਹਾੜ੍ਹੀ'
    },
    varieties: [
      'PBG 8 - PAU recommended desi gram, wilt resistant',
      'JG 11 - Early maturing, high pod count',
      'JAKI 9218 - Bold seed size, high market value',
      'CSJK 6 - Kabuli chickpea with bold white grains',
      'GNG 1581 (Gangaur) - Rainfed and irrigated champion'
    ],
    seedRatePerAcre: {
      en: '18 to 20 kg per acre for Desi Gram (30 to 35 kg for Bold Kabuli Chana)',
      hi: '18 से 20 किलोग्राम प्रति एकड़ देशी चना (30 से 35 किलो काबुली चना)',
      pa: '18 ਤੋਂ 20 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਦੇਸੀ ਛੋਲੇ (30 ਤੋਂ 35 ਕਿੱਲੋ ਕਾਬੁਲੀ ਛੋਲੇ)'
    },
    sowingTime: {
      en: '15 October to 10 November',
      hi: '15 अक्टूबर से 10 नवंबर',
      pa: '15 ਅਕਤੂਬਰ ਤੋਂ 10 ਨਵੰਬਰ'
    },
    spacingAndDepth: {
      en: 'Row to row: 30 cm | Plant to plant: 10 cm | Depth: 6 to 8 cm (deep moist soil)',
      hi: 'कतार से कतार: 30 सेमी | पौधे से पौधा: 10 सेमी | गहराई: 6 से 8 सेमी (गहरी नमी में)',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 30 ਸੈਂਟੀਮੀਟਰ | ਬੂਟੇ ਤੋਂ ਬੂਟਾ: 10 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 6 ਤੋਂ 8 ਸੈਂਟੀਮੀਟਰ (ਡੂੰਘੀ ਸਿੱਲ੍ਹ ਵਿੱਚ)'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat seed with Trichoderma viride (10g/kg) or Bavistin (2g/kg) to prevent Fusarium Wilt (ukhta roog).',
        'Step 2: Inoculate with Rhizobium culture (250g per acre seed) to fix atmospheric nitrogen.'
      ],
      hi: [
        'पहला कदम: उकठा (विल्ट) रोग से बचाव के लिए 10 ग्राम ट्राइकोडर्मा या 2 ग्राम बाविस्टिन प्रति किलो मिलाएं।',
        'दूसरा कदम: राइजोबियम कल्चर (250 ग्राम प्रति एकड़ बीज) से उपचार करें ताकि जड़ें नाइट्रोजन बना सकें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਉਖੜਾ (ਉੱਲੀ) ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ 10 ਗ੍ਰਾਮ ਟ੍ਰਾਈਕੋਡਰਮਾ ਜਾਂ 2 ਗ੍ਰਾਮ ਬਾਵਿਸਟਿਨ ਪ੍ਰਤੀ ਕਿੱਲੋ ਮਿਲਾਓ।',
        'ਦੂਜਾ ਕਦਮ: ਰਾਈਜ਼ੋਬੀਅਮ ਟੀਕੇ (250 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਬੀਜ) ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ ਜੜ੍ਹਾਂ ਨਾਈਟ੍ਰੋਜਨ ਬਣਾ ਸਕਣ।'
      ]
    },
    expectedYield: {
      en: '8 to 12 Quintals per acre',
      hi: '8 से 12 क्विंटल प्रति एकड़',
      pa: '8 ਤੋਂ 12 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ'
    },
    keyTips: {
      en: [
        'Do not over-irrigate; chickpea needs only 1 or 2 light irrigations at pre-flowering and pod development.',
        'Never irrigate during peak flowering stage (causes flower drop).',
        'Nip (cut tops) at 30-35 days to promote heavy side branching.'
      ],
      hi: [
        'चने में ज्यादा पानी न दें, फूल आने से पहले और फलियां बनते समय केवल 2 हल्के पानी काफी हैं।',
        'जब पूरे फूल खिले हों उस समय पानी कभी न लगाएं (फूल झड़ जाते हैं)।',
        '30-35 दिन पर ऊपर से खोटाई (शीर्ष कटाई) करें ताकि ज्यादा शाखाएं फूटें।'
      ],
      pa: [
        'ਛੋਲਿਆਂ ਨੂੰ ਬਹੁਤਾ ਪਾਣੀ ਨਾ ਲਾਓ, ਫੁੱਲ ਪੈਣ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਡੋਡੇ ਬਣਨ ਵੇਲੇ 2 ਹਲਕੇ ਪਾਣੀ ਹੀ ਕਾਫ਼ੀ ਹਨ।',
        'ਜਦੋਂ ਫੁੱਲ ਪੂਰੇ ਖਿੜੇ ਹੋਣ ਉਸ ਵੇਲੇ ਪਾਣੀ ਕਦੇ ਨਾ ਲਾਓ (ਫੁੱਲ ਕਿਰ ਜਾਂਦੇ ਹਨ)।',
        '30-35 ਦਿਨਾਂ ਤੇ ਉੱਪਰੋਂ ਤੋੜਾਈ (ਖੋਟਾਈ) ਕਰੋ ਤਾਂ ਜੋ ਵੱਧ ਸ਼ਾਖਾਵਾਂ ਫੁੱਟਣ।'
      ]
    }
  },

  // 9. Tomato Seeds
  {
    id: 'seed-tomato',
    category: 'vegetables',
    icon: '🍅',
    names: {
      en: 'Tomato Seeds',
      hi: 'टमाटर के बीज',
      pa: 'ਟਮਾਟਰ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Autumn & Spring',
      hi: 'शरद व बसंत',
      pa: 'ਸਰਦੀਆਂ ਤੇ ਬਸੰਤ'
    },
    varieties: [
      'Abhinav (Syngenta) - Firm fruit, high transport durability, virus tolerant',
      'Saaho (Seminis) - Heavy yield, deep red uniform fruits',
      'US 440 - High market acceptance',
      'NS 501 (Namdhari) - Bacterial wilt tolerant hybrid',
      'Punjab Ratta - PAU processing variety'
    ],
    seedRatePerAcre: {
      en: '40 to 60 grams per acre (hybrid nursery)',
      hi: '40 से 60 ग्राम प्रति एकड़ (हाइब्रिड नर्सरी)',
      pa: '40 ਤੋਂ 60 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (ਹਾਈਬ੍ਰਿਡ ਪਨੀਰੀ)'
    },
    sowingTime: {
      en: 'Autumn crop: August-September | Spring crop: November-December',
      hi: 'शरद फसल: अगस्त-सितंबर | बसंत फसल: नवंबर-दिसंबर',
      pa: 'ਸਰਦੀਆਂ ਦੀ ਫਸਲ: ਅਗਸਤ-ਸਤੰਬਰ | ਬਸੰਤ ਫਸਲ: ਨਵੰਬਰ-ਦਸੰਬਰ'
    },
    spacingAndDepth: {
      en: 'Bed to bed: 90 cm to 120 cm | Plant to plant: 45 cm | Depth: 0.5 cm in nursery tray',
      hi: 'क्यारी से क्यारी: 90 से 120 सेमी | पौधे से पौधा: 45 सेमी | गहराई: 0.5 सेमी ट्रे में',
      pa: 'ਵੱਟ ਤੋਂ ਵੱਟ: 90 ਤੋਂ 120 ਸੈਂਟੀਮੀਟਰ | ਬੂਟੇ ਤੋਂ ਬੂਟਾ: 45 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 0.5 ਸੈਂਟੀਮੀਟਰ ਟ੍ਰੇਅ ਵਿੱਚ'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat seed with Trichoderma (5g/kg) or Thiram (2g/kg) to eliminate damping-off.',
        'Step 2: Raise seedlings in pro-trays with coco-peat & vermiculite for 25-30 days.'
      ],
      hi: [
        'पहला कदम: पौध गलन (डैम्पिंग ऑफ) से बचाव के लिए थीरम (2 ग्राम/किलो) से उपचार करें।',
        'दूसरा कदम: कोकोपीट भरी प्रो-ट्रे में 25-30 दिन की स्वस्थ पौध तैयार करें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਪਨੀਰੀ ਗਲਣ (ਡੈਂਪਿੰਗ ਆਫ) ਤੋਂ ਬਚਾਅ ਲਈ ਥੀਰਮ (2 ਗ੍ਰਾਮ/ਕਿੱਲੋ) ਨਾਲ ਸੋਧੋ।',
        'ਦੂਜਾ ਕਦਮ: ਕੋਕੋਪੀਟ ਵਾਲੀ ਪ੍ਰੋ-ਟ੍ਰੇਅ ਵਿੱਚ 25-30 ਦਿਨਾਂ ਦੀ ਤੰਦਰੁਸਤ ਪਨੀਰੀ ਤਿਆਰ ਕਰੋ।'
      ]
    },
    expectedYield: {
      en: '250 to 350 Quintals per acre (under staking / trellis)',
      hi: '250 से 350 क्विंटल प्रति एकड़ (सहारा देकर बांधने पर)',
      pa: '250 ਤੋਂ 350 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (ਬਾਂਸਾਂ ਦਾ ਸਹਾਰਾ ਦੇ ਕੇ)'
    },
    keyTips: {
      en: [
        'Always stake plants with bamboo and string to keep fruit clean from soil microbes.',
        'Use drip fertigation with Calcium Nitrate and Boron to prevent blossom end rot (black bottom).',
        'Spray neem oil every 10 days to repel leaf curl whiteflies.'
      ],
      hi: [
        'पौधों को बांस और धागे से सहारा जरूर दें ताकि फल मिट्टी के संपर्क में न आएं।',
        'फल को नीचे से काला होने (ब्लॉसम एंड रॉट) से बचाने के लिए कैल्शियम नाइट्रेट व बोरॉन दें।',
        'पत्ता मरोड़ वायरस फैलाने वाली सफेद मक्खी के लिए नियमित नीम तेल का छिड़काव करें।'
      ],
      pa: [
        'ਬੂਟਿਆਂ ਨੂੰ ਬਾਂਸਾਂ ਅਤੇ ਡੋਰੀ ਨਾਲ ਸਹਾਰਾ ਜ਼ਰੂਰ ਦਿਓ ਤਾਂ ਜੋ ਟਮਾਟਰ ਮਿੱਟੀ ਨਾਲ ਲੱਗ ਕੇ ਨਾ ਗਲਣ।',
        'ਟਮਾਟਰ ਦੇ ਹੇਠਾਂ ਕਾਲਾ ਦਾਗ਼ ਰੋਕਣ ਲਈ ਕੈਲਸ਼ੀਅਮ ਨਾਈਟ੍ਰੇਟ ਅਤੇ ਬੋਰੋਨ ਜ਼ਰੂਰ ਪਾਓ।',
        'ਪੱਤਾ ਮਰੋੜ ਰੋਗ ਦੀ ਚਿੱਟੀ ਮੱਖੀ ਰੋਕਣ ਲਈ ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।'
      ]
    }
  },

  // 10. Green Gram / Moong
  {
    id: 'seed-moong',
    category: 'pulses',
    icon: '🌱',
    names: {
      en: 'Green Gram (Moong) Seeds',
      hi: 'मूँग के बीज',
      pa: 'ਮੂੰਗੀ ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Summer (Zaid) & Kharif',
      hi: 'जायद (गर्मी) व खरीफ',
      pa: 'ਗਰਮ ਰੁੱਤ (ਸੱਠੀ ਮੂੰਗੀ) ਤੇ ਸਾਉਣੀ'
    },
    varieties: [
      'SML 668 - Short duration (60 days), bold shining seeds',
      'SML 1827 - Yellow mosaic virus resistant champion',
      'Virat (IPM 02-3) - Synchronized maturity, uniform harvest',
      'Shikha - High pod setting',
      'MH 421 - Early summer variety'
    ],
    seedRatePerAcre: {
      en: '12 to 15 kg per acre for summer crop (8 to 10 kg for Kharif)',
      hi: '12 से 15 किलोग्राम प्रति एकड़ गर्मी की सट्ठी मूँग के लिए (खरीफ में 8-10 किलो)',
      pa: '12 ਤੋਂ 15 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਗਰਮ ਰੁੱਤ ਦੀ ਸੱਠੀ ਮੂੰਗੀ ਲਈ (ਸਾਉਣੀ ਵਿੱਚ 8-10 ਕਿੱਲੋ)'
    },
    sowingTime: {
      en: 'Summer (after wheat harvest): 20 March to 15 April | Kharif: July',
      hi: 'गर्मी (गेहूँ कटाई बाद): 20 मार्च से 15 अप्रैल | खरीफ: जुलाई',
      pa: 'ਗਰਮ ਰੁੱਤ (ਕਣਕ ਦੀ ਵਾਢੀ ਮਗਰੋਂ): 20 ਮਾਰਚ ਤੋਂ 15 ਅਪ੍ਰੈਲ | ਸਾਉਣੀ: ਜੁਲਾਈ'
    },
    spacingAndDepth: {
      en: 'Row to row: 20-22 cm | Depth: 4 to 5 cm',
      hi: 'कतार से कतार: 20-22 सेमी | गहराई: 4 से 5 सेमी',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 20-22 ਸੈਂਟੀਮੀਟਰ | ਡੂੰਘਾਈ: 4 ਤੋਂ 5 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Treat with Captan or Thiram (3g/kg seed).',
        'Step 2: Inoculate with Rhizobium culture (250g per acre seed) to fix free nitrogen for next paddy crop.'
      ],
      hi: [
        'पहला कदम: थीरम या कैप्टन (3 ग्राम/किलो) से बीज उपचार करें।',
        'दूसरा कदम: राइजोबियम कल्चर (250 ग्राम प्रति एकड़) से उपचार करें ताकि अगली धान की फसल के लिए जमीन उपजाऊ बने।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਥੀਰਮ ਜਾਂ ਕੈਪਟਾਨ (3 ਗ੍ਰਾਮ/ਕਿੱਲੋ) ਨਾਲ ਬੀਜ ਸੋਧੋ।',
        'ਦੂਜਾ ਕਦਮ: ਰਾਈਜ਼ੋਬੀਅਮ ਟੀਕੇ (250 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ) ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ ਅਗਲੇ ਝੋਨੇ ਲਈ ਜ਼ਮੀਨ ਉਪਜਾਊ ਬਣੇ।'
      ]
    },
    expectedYield: {
      en: '5 to 7 Quintals per acre',
      hi: '5 से 7 क्विंटल प्रति एकड़',
      pa: '5 ਤੋਂ 7 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ'
    },
    keyTips: {
      en: [
        'Moong enriches your soil with 35-40 kg free nitrogen per acre.',
        'Stop irrigation 15 days before harvest to allow uniform pod drying.',
        'Harvest when 80-85% pods turn blackish brown.'
      ],
      hi: [
        'मूँग की फसल अगली फसल के लिए खेत में 35-40 किलो मुफ्त नाइट्रोजन जोड़ती है।',
        'कटाई से 15 दिन पहले पानी बंद कर दें ताकि फलियां एक साथ सूखें।',
        'जब 80-85% फलियां काली-भूरी हो जाएं तब कटाई कर लें।'
      ],
      pa: [
        'ਮੂੰਗੀ ਦੀ ਫਸਲ ਅਗਲੀ ਫਸਲ ਲਈ ਖੇਤ ਵਿੱਚ 35-40 ਕਿੱਲੋ ਮੁਫ਼ਤ ਨਾਈਟ੍ਰੋਜਨ ਜੋੜਦੀ ਹੈ।',
        'ਵਾਢੀ ਤੋਂ 15 ਦਿਨ ਪਹਿਲਾਂ ਪਾਣੀ ਬੰਦ ਕਰ ਦਿਓ ਤਾਂ ਜੋ ਫਲੀਆਂ ਇੱਕਸਾਰ ਸੁੱਕ ਜਾਣ।',
        'ਜਦੋਂ 80-85% ਫਲੀਆਂ ਕਾਲੀਆਂ-ਭੂਰੀਆਂ ਹੋ ਜਾਣ ਤਾਂ ਕਟਾਈ ਕਰੋ।'
      ]
    }
  },

  // 11. Sugarcane
  {
    id: 'seed-sugarcane',
    category: 'cash_crops',
    icon: '🎋',
    names: {
      en: 'Sugarcane Seed Sets',
      hi: 'गन्ना के बीज (पोरियां)',
      pa: 'ਗੰਨੇ ਦੇ ਬੀਜ (ਪੋਰੀਆਂ)'
    },
    season: {
      en: 'Spring & Autumn',
      hi: 'बसंत व शरद',
      pa: 'ਬਸੰਤ ਤੇ ਸਰਦੀਆਂ'
    },
    varieties: [
      'Co 0238 - Famous high sugar & high cane yield (maintain red rot vigilance)',
      'CoPb 95 - PAU certified early high sugar variety',
      'CoJ 85 - Early maturing sweet cane',
      'Co 15023 - Early high sucrose wonder cane',
      'Co 0118 - High recovery, red rot resistant'
    ],
    seedRatePerAcre: {
      en: '30 to 35 Quintals per acre (approx. 20,000 two-budded setts)',
      hi: '30 से 35 क्विंटल प्रति एकड़ (लगभग 20,000 दो आंखों वाली पोरियां)',
      pa: '30 ਤੋਂ 35 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (ਲਗਭਗ 20,000 ਦੋ ਅੱਖਾਂ ਵਾਲੀਆਂ ਪੋਰੀਆਂ)'
    },
    sowingTime: {
      en: 'Spring: 15 February to 15 March | Autumn: October',
      hi: 'बसंत: 15 फरवरी से 15 मार्च | शरद: अक्टूबर',
      pa: 'ਬਸੰਤ: 15 ਫਰਵਰੀ ਤੋਂ 15 ਮਾਰਚ | ਸਰਦੀਆਂ: ਅਕਤੂਬਰ'
    },
    spacingAndDepth: {
      en: 'Row to row: 90 cm to 120 cm (trench method) | Depth: 7.5 to 10 cm',
      hi: 'कतार से कतार: 90 से 120 सेमी (ट्रेंच विधि) | गहराई: 7.5 से 10 सेमी',
      pa: 'ਕਤਾਰ ਤੋਂ ਕਤਾਰ: 90 ਤੋਂ 120 ਸੈਂਟੀਮੀਟਰ (ਟਰੈਂਚ ਵਿਧੀ) | ਡੂੰਘਾਈ: 7.5 ਤੋਂ 10 ਸੈਂਟੀਮੀਟਰ'
    },
    seedTreatment: {
      en: [
        'Step 1: Select only top two-thirds of healthy cane with plump swollen buds.',
        'Step 2: Dip two-bud setts in Carbendazim 50% WP (1g per liter water) for 5 minutes against Red Rot (Ratta Rog).',
        'Step 3: Lay setts end-to-end in furrows and cover with 2 inches fine soil.'
      ],
      hi: [
        'पहला कदम: गन्ने के ऊपर के दो-तिहाई हिस्से की स्वस्थ पोरियां ही चुनें।',
        'दूसरा कदम: लाल सड़न (रत्ता रोग) से बचाव के लिए बाविस्टिन (1 ग्राम प्रति लीटर पानी) के घोल में 5 मिनट डुबोएं।',
        'तीसरा कदम: ट्रेंच में पोरियों को सटाकर बिछाएं और 2 इंच मिट्टी से ढकें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਗੰਨੇ ਦੇ ਉੱਪਰਲੇ ਦੋ-ਤਿਹਾਈ ਹਿੱਸੇ ਦੀਆਂ ਮੋਟੀਆਂ ਅੱਖਾਂ ਵਾਲੀਆਂ ਪੋਰੀਆਂ ਹੀ ਚੁਣੋ।',
        'ਦੂਜਾ ਕਦਮ: ਰੱਤਾ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਬਾਵਿਸਟਿਨ (1 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ) ਵਿੱਚ 5 ਮਿੰਟ ਡੁਬੋਵੋ।',
        'ਤੀਜਾ ਕਦਮ: ਵੱਟਾਂ ਦੀਆਂ ਨਾਲੀਆਂ ਵਿੱਚ ਪੋਰੀਆਂ ਵਿਛਾ ਕੇ 2 ਇੰਚ ਮਿੱਟੀ ਨਾਲ ਢੱਕੋ।'
      ]
    },
    expectedYield: {
      en: '350 to 450 Quintals per acre (850 to 1100 maunds)',
      hi: '350 से 450 क्विंटल प्रति एकड़ (850 से 1100 मन)',
      pa: '350 ਤੋਂ 450 ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ (850 ਤੋਂ 1100 ਮਣ)'
    },
    keyTips: {
      en: [
        'Trench method saves 30% water and supports heavy cane without lodging in monsoon.',
        'Earthing up (mitti chadhana) must be completed in June before monsoon rains start.',
        'Discard any seed cane showing red discoloration when cut.'
      ],
      hi: [
        'ट्रेंच विधि से 30% पानी की बचत होती है और बरसात में गन्ना नहीं गिरता।',
        'जून में मानसून की बारिश से पहले गन्ने पर मिट्टी चढ़ाने का काम पूरा कर लें।',
        'काटने पर अंदर से लाल दिखने वाले किसी भी गन्ने को बीज में न डालें।'
      ],
      pa: [
        'ਟਰੈਂਚ ਵਿਧੀ ਨਾਲ 30% ਪਾਣੀ ਬਚਦਾ ਹੈ ਅਤੇ ਬਰਸਾਤਾਂ ਵਿੱਚ ਗੰਨਾ ਨਹੀਂ ਡਿੱਗਦਾ।',
        'ਜੂਨ ਮਹੀਨੇ ਬਰਸਾਤ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਗੰਨੇ ਉੱਤੇ ਮਿੱਟੀ ਚੜ੍ਹਾਉਣ ਦਾ ਕੰਮ ਪੂਰਾ ਕਰੋ।',
        'ਕੱਟਣ ਵੇਲੇ ਜੇਕਰ ਗੰਨਾ ਅੰਦਰੋਂ ਲਾਲ ਹੋਵੇ ਤਾਂ ਉਸ ਨੂੰ ਕਦੇ ਵੀ ਬੀਜ ਵਿੱਚ ਨਾ ਵਰਤੋ।'
      ]
    }
  },

  // 12. Berseem Fodder
  {
    id: 'seed-berseem',
    category: 'fodder',
    icon: '☘️',
    names: {
      en: 'Berseem (Green Fodder) Seeds',
      hi: 'बरसीम (हरा चारा) के बीज',
      pa: 'ਬਰਸੀਮ (ਹਰਾ ਚਾਰਾ) ਦੇ ਬੀਜ'
    },
    season: {
      en: 'Rabi (Winter)',
      hi: 'रबी',
      pa: 'ਹਾੜ੍ਹੀ'
    },
    varieties: [
      'BL 42 - PAU certified, fast regrowth, 5 to 6 cuttings',
      'BL 10 - Frost tolerant, highly palatable dairy fodder',
      'Mescawi - Traditional juicy green variety',
      'Wardan - High nutritional value'
    ],
    seedRatePerAcre: {
      en: '8 to 10 kg per acre (mix with 1 kg Mustard and 2 kg Oats for dense first cut)',
      hi: '8 से 10 किलोग्राम प्रति एकड़ (पहली कटाई में ज्यादा चारे के लिए 1 किलो सरसों व 2 किलो जई मिलाएं)',
      pa: '8 ਤੋਂ 10 ਕਿੱਲੋਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ (ਪਹਿਲੇ ਲੌਅ ਲਈ 1 ਕਿੱਲੋ ਸਰ੍ਹੋਂ ਅਤੇ 2 ਕਿੱਲੋ ਜਵੀਂ ਰਲਾਓ)'
    },
    sowingTime: {
      en: '25 September to 20 October (when mild winter begins)',
      hi: '25 सितंबर से 20 अक्टूबर (जब हल्की ठंड शुरू हो)',
      pa: '25 ਸਤੰਬਰ ਤੋਂ 20 ਅਕਤੂਬਰ (ਜਦੋਂ ਹਲਕੀ ਠੰਢ ਸ਼ੁਰੂ ਹੋਵੇ)'
    },
    spacingAndDepth: {
      en: 'Broadcast into standing water (chippa method) in prepared flat beds',
      hi: 'खेत में पानी भरकर छिट्टा विधि से बीज बिखेरें',
      pa: 'ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਭਰ ਕੇ ਛਿੱਟਾ ਵਿਧੀ (ਚਿੱਪਾ) ਨਾਲ ਬੀਜੋ'
    },
    seedTreatment: {
      en: [
        'Step 1: Dip seed in 5% salt water to float away Kasni (chicory) weed seeds.',
        'Step 2: Wash with fresh water and inoculate with Berseem Rhizobium culture for lush tillering.'
      ],
      hi: [
        'पहला कदम: कासनी खरपतवार के बीज अलग करने के लिए 5% नमक के पानी में डुबोएं।',
        'दूसरा कदम: साफ पानी से धोकर बरसीम राइजोबियम कल्चर से उपचारित करें ताकि कई कटाइयां मिलें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਕਦਮ: ਕਾਸਨੀ ਦੇ ਨਦੀਨ ਬੀਜ ਕੱਢਣ ਲਈ 5% ਲੂਣ ਵਾਲੇ ਪਾਣੀ ਵਿੱਚ ਪਾ ਕੇ ਤਰਾਵੋ।',
        'ਦੂਜਾ ਕਦਮ: ਸਾਫ਼ ਪਾਣੀ ਨਾਲ ਧੋ ਕੇ ਬਰਸੀਮ ਰਾਈਜ਼ੋਬੀਅਮ ਟੀਕੇ ਨਾਲ ਸੋਧੋ ਤਾਂ ਜੋ 5-6 ਲੌਅ ਮਿਲਣ।'
      ]
    },
    expectedYield: {
      en: '350 to 450 Quintals per acre of green milk-boosting fodder over 5 cuttings',
      hi: '350 से 450 क्विंटल हरा चारा (5 से 6 कटाइयों में, दुधारू पशुओं के लिए उत्तम)',
      pa: '350 ਤੋਂ 450 ਕੁਇੰਟਲ ਹਰਾ ਚਾਰਾ (5 ਤੋਂ 6 ਲੌਆਂ ਵਿੱਚ, ਦੁਧਾਰੂ ਪਸ਼ੂਆਂ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ)'
    },
    keyTips: {
      en: [
        'First cutting is ready within 50-55 days after sowing.',
        'Subsequent cuttings every 30-35 days throughout winter until May.',
        'Irrigate immediately after each cutting to trigger immediate fresh sprouts.'
      ],
      hi: [
        'पहली कटाई बिजाई के 50-55 दिन में तैयार हो जाती है।',
        'इसके बाद हर 30-35 दिन में मई तक लगातार कटाई मिलती रहती है।',
        'हर कटाई के तुरंत बाद पानी जरूर लगाएं ताकि नए कल्ले तेजी से फूटें।'
      ],
      pa: [
        'ਪਹਿਲਾ ਲੌਅ ਬਿਜਾਈ ਤੋਂ 50-55 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ ਹੋ ਜਾਂਦਾ ਹੈ।',
        'ਮਗਰੋਂ ਹਰ 30-35 ਦਿਨਾਂ ਬਾਅਦ ਮਈ ਤੱਕ ਲਗਾਤਾਰ ਹਰਾ ਚਾਰਾ ਮਿਲਦਾ ਹੈ।',
        'ਹਰ ਲੌਅ ਵੱਢਣ ਮਗਰੋਂ ਤੁਰੰਤ ਪਾਣੀ ਲਾਓ ਤਾਂ ਜੋ ਨਵਾਂ ਫੁਟਾਰਾ ਤੇਜ਼ ਹੋਵੇ।'
      ]
    }
  }
];
