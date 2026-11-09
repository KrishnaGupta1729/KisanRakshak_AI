export type Language = 'en' | 'hi' | 'pa';

export interface TranslationStrings {
  // App branding
  appName: string;
  appTagline: string;
  farmerTitle: string;
  farmerSubtitle: string;
  badgeDemo: string;
  
  // Navigation & Modes
  farmerMode: string;
  recordsMode: string;
  languageSelect: string;
  
  // Steps
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Form Labels
  chooseCrop: string;
  affectedPart: string;
  leaves: string;
  stem: string;
  fruit: string;
  roots: string;
  farmerNameLabel: string;
  farmerNamePlaceholder: string;
  locationLabel: string;
  locationPlaceholder: string;
  landAreaLabel: string;
  acres: string;
  
  // Photo upload
  takePhoto: string;
  browsePhoto: string;
  cancelCamera: string;
  capturePhoto: string;
  alignLeafNotice: string;
  dragDropNotice: string;
  uploadDesc: string;
  changePhoto: string;
  readyToScan: string;
  checkDiseaseBtn: string;
  checkingDisease: string;
  quickSampleNotice: string;
  quickSampleDesc: string;
  
  // Diagnosis result
  diagnosisResult: string;
  confidenceMatch: string;
  severityLabel: string;
  severityHealthy: string;
  severityLow: string;
  severityModerate: string;
  severityHigh: string;
  severityCritical: string;
  symptomsTitle: string;
  audioGuide: string;
  stopAudio: string;
  
  // Treatment tabs
  tabDesiRemedy: string;
  tabSprayMedicine: string;
  tabPrevention: string;
  tabWeather: string;
  
  desiRemedyDesc: string;
  sprayMedicineDesc: string;
  preventionDesc: string;
  weatherAdvisoryTitle: string;
  weatherAdvisoryDesc: string;
  bestSprayTime: string;
  
  // Buttons & Actions
  saveSlipBtn: string;
  submitToDoctorBtn: string;
  submittedSuccess: string;
  shareWhatsApp: string;
  
  // Farmer Assistance & Helpline
  helplineTitle: string;
  helplineDesc: string;
  callFree: string;
  callKisanCallCenter: string;
  faqTitle: string;
  faqSubtitle: string;
  
  // Simple FAQs
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;

  // Location & Weather Upgrades
  useMyCurrentLocation: string;
  searchLocationPlaceholder: string;
  locationPermissionDenied: string;
  fetchingLocation: string;
  popularLocations: string;
  recentLocations: string;
  threeDayForecast: string;
  lastUpdated: string;
  showingCached: string;
  refreshWeather: string;
  localTime: string;
  forecastTomorrow: string;
  forecastDayAfter: string;
  spraySafe: string;
  sprayUnsafe: string;
  sprayCaution: string;

  // Crops
  crops: {
    Wheat: string;
    Rice: string;
    Potato: string;
    Tomato: string;
    Corn: string;
    Cotton: string;
    Mustard: string;
    Soybean: string;
    Apple: string;
    Grape: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appName: 'AgriScan Farmer Doctor',
    appTagline: 'Simple Crop Disease Diagnosis & Remedy Guide',
    farmerTitle: 'Plant Disease Doctor for Farmers',
    farmerSubtitle: 'Take a leaf photo or pick a sample to find out disease, desi remedies, and correct spray dosage instantly.',
    badgeDemo: '100% Free for Farmers',

    farmerMode: 'Farmer Doctor',
    recordsMode: 'Saved Records',
    languageSelect: 'Language',

    step1Title: 'Select Your Crop',
    step1Desc: 'Choose which crop has problem',
    step2Title: 'Leaf Photo',
    step2Desc: 'Take clear photo of affected leaf',
    step3Title: 'Instant Solution',
    step3Desc: 'Remedy, spray dose & precautions',

    chooseCrop: 'Select Crop',
    affectedPart: 'Affected Plant Part',
    leaves: 'Leaves',
    stem: 'Stem / Branch',
    fruit: 'Fruit / Grain / Pod',
    roots: 'Roots / Ground level',
    farmerNameLabel: 'Farmer Name',
    farmerNamePlaceholder: 'e.g. Jaswinder Singh / Ramesh',
    locationLabel: 'Village / District',
    locationPlaceholder: 'e.g. Ludhiana, Punjab / Karnal, Haryana',
    landAreaLabel: 'Land Size (Acres)',
    acres: 'Acres',

    takePhoto: 'Take Photo',
    browsePhoto: 'Upload File',
    cancelCamera: 'Close Camera',
    capturePhoto: 'Click Photo',
    alignLeafNotice: 'Keep the affected leaf clearly in center',
    dragDropNotice: 'Tap here or drag leaf picture',
    uploadDesc: 'Supports camera photos from your mobile or phone gallery',
    changePhoto: 'Change Photo',
    readyToScan: 'Photo ready for checkup',
    checkDiseaseBtn: 'Check Disease Now',
    checkingDisease: 'Checking plant leaves and symptoms...',
    quickSampleNotice: 'Or Try With Example Leaf Photos',
    quickSampleDesc: 'Click on any crop photo below to test instantly:',

    diagnosisResult: 'Disease Diagnosis & Advisory',
    confidenceMatch: 'AI Accuracy Match',
    severityLabel: 'Disease Stage',
    severityHealthy: 'Crop is Healthy',
    severityLow: 'Mild / Initial Stage',
    severityModerate: 'Moderate Warning',
    severityHigh: 'Severe Danger',
    severityCritical: 'Urgent Action Required',
    symptomsTitle: 'Symptoms Visible on Plant',
    audioGuide: 'Listen in Audio',
    stopAudio: 'Stop Audio',

    tabDesiRemedy: 'Desi & Natural Remedy',
    tabSprayMedicine: 'Recommended Spray & Dose',
    tabPrevention: 'Future Prevention',
    tabWeather: 'Spray Weather Advice',

    desiRemedyDesc: 'Safe, low-cost home and bio remedies that you can prepare easily:',
    sprayMedicineDesc: 'Authorized agricultural medicine with exact dose per acre / pump:',
    preventionDesc: 'Important steps to keep the field healthy for the next harvest:',
    weatherAdvisoryTitle: 'Weather & Spray Conditions Today',
    weatherAdvisoryDesc: 'Ideal for spray: Spray during morning 7–10 AM or late afternoon 4–6 PM. Avoid spraying if high wind or rain is expected within 4 hours.',
    bestSprayTime: 'Spray Recommendation: Safe to spray in mild weather.',

    saveSlipBtn: 'Save / Print Doctor Slip',
    submitToDoctorBtn: 'Send to Krishi Expert',
    submittedSuccess: 'Saved to records for agronomist advice',
    shareWhatsApp: 'Share on WhatsApp',

    helplineTitle: 'Need Direct Help from Agriculture Officer?',
    helplineDesc: 'Toll-free Kisan Call Center service run by Government of India. Talk directly to crop scientists.',
    callFree: 'Toll Free Call',
    callKisanCallCenter: 'Call 1800-180-1551 (Kisan Call Center)',
    faqTitle: 'Frequently Asked Farmer Questions',
    faqSubtitle: 'Quick advice for common farming challenges',

    faq1Q: 'When is the best time to spray fungicide or insecticide?',
    faq1A: 'Always spray in calm weather either early morning after morning dew dries (8-10 AM) or late afternoon (4-6 PM). Never spray during intense afternoon sun or when rain is expected.',
    faq2Q: 'Can I mix sour lassi (buttermilk) or neem oil with chemical sprays?',
    faq2A: 'Do not mix bio-formulations like sour buttermilk directly with strong systemic fungicides. Keep a 3-4 day gap between organic sprays and chemical sprays for best results.',
    faq3Q: 'How much water should I use per acre for knapsack pump?',
    faq3A: 'For standard hand/battery knapsack sprayer, use 120 to 150 liters of clean water (approx. 8 to 10 pumps of 15 liters) per acre to ensure thorough coverage of both upper and lower leaf surfaces.',

    // Location & Weather Upgrades
    useMyCurrentLocation: 'Use My Current Location',
    searchLocationPlaceholder: 'Search village, town, or district in India...',
    locationPermissionDenied: 'Location permission denied. Please search your village or select from the list.',
    fetchingLocation: 'Detecting GPS location & live weather...',
    popularLocations: 'Popular Agricultural Areas',
    recentLocations: 'Recent Locations',
    threeDayForecast: '3-Day Spray Forecast',
    lastUpdated: 'Last updated',
    showingCached: 'Showing last saved data',
    refreshWeather: 'Refresh Weather',
    localTime: 'Local Time',
    forecastTomorrow: 'Tomorrow',
    forecastDayAfter: 'Day After',
    spraySafe: 'Safe for Spray',
    sprayUnsafe: 'Unsafe (Rain/Wind)',
    sprayCaution: 'Spray with Caution',

    crops: {
      Wheat: 'Wheat (ਕਣਕ / गेहूँ)',
      Rice: 'Rice / Paddy (ਝੋਨਾ / धान)',
      Potato: 'Potato (ਆਲੂ / आलू)',
      Tomato: 'Tomato (ਟਮਾਟਰ / टमाटर)',
      Corn: 'Corn / Maize (ਮੱਕੀ / मक्का)',
      Cotton: 'Cotton (ਕਪਾਹ / कपास)',
      Mustard: 'Mustard (ਸਰ੍ਹੋਂ / सरसों)',
      Soybean: 'Soybean (ਸੋਇਆਬੀਨ / सोयाबीन)',
      Apple: 'Apple (ਸੇਬ / सेब)',
      Grape: 'Grape (ਅੰਗੂਰ / अंगूर)'
    }
  },

  hi: {
    appName: 'एग्रीस्कैन किसान डॉक्टर',
    appTagline: 'किसानों के लिए सरल फसल रोग जांच और देसी व सही दवा गाइड',
    farmerTitle: 'फसल रोग जांच और समाधान डॉक्टर',
    farmerSubtitle: 'फसल के बीमार पत्ते की फोटो खींचें या चुनें और तुरंत बीमारी का नाम, देसी नुस्खे व सही स्प्रे की मात्रा जानें।',
    badgeDemo: 'किसानों के लिए 100% निशुल्क',

    farmerMode: 'किसान डॉक्टर',
    recordsMode: 'पुराने रिकॉर्ड',
    languageSelect: 'भाषा (Language)',

    step1Title: 'अपनी फसल चुनें',
    step1Desc: 'जिस फसल में खराबी दिख रही है',
    step2Title: 'पत्ते की फोटो लगाएं',
    step2Desc: 'खराब पत्ते की साफ तस्वीर लें',
    step3Title: 'तुरंत इलाज पाएं',
    step3Desc: 'देसी नुस्खा, स्प्रे की दवा व परहेज',

    chooseCrop: 'फसल का नाम',
    affectedPart: 'पौधे का खराब हिस्सा',
    leaves: 'पत्तियां (Leaves)',
    stem: 'तना / डाली (Stem)',
    fruit: 'फल / दाना / फली (Fruit/Grain)',
    roots: 'जड़ / जमीन के पास (Roots)',
    farmerNameLabel: 'किसान भाई का नाम',
    farmerNamePlaceholder: 'उदा. रामेश्वर शर्मा / हरप्रीत',
    locationLabel: 'गांव / जिला / राज्य',
    locationPlaceholder: 'उदा. करनाल, हरियाणा / मेरठ, उप्र',
    landAreaLabel: 'खेत का रकबा (एकड़)',
    acres: 'एकड़',

    takePhoto: 'कैमरे से फोटो लें',
    browsePhoto: 'गैलरी से चुनें',
    cancelCamera: 'कैमरा बंद करें',
    capturePhoto: 'फोटो खींचें',
    alignLeafNotice: 'बीमार पत्ते को घेरे के बीच में रखें',
    dragDropNotice: 'पत्ते की फोटो यहां लगाएं या क्लिक करें',
    uploadDesc: 'मोबाइल कैमरे या फोन गैलरी से पत्ते की फोटो अपलोड करें',
    changePhoto: 'दूसरी फोटो लगाएं',
    readyToScan: 'जांच के लिए फोटो तैयार है',
    checkDiseaseBtn: 'बीमारी की जांच करें',
    checkingDisease: 'पत्ते के धब्बों और लक्षणों की जांच हो रही है...',
    quickSampleNotice: 'या नमूना फोटो चुनकर देखें',
    quickSampleDesc: 'नीचे दी गई किसी भी फसल की फोटो पर क्लिक करके तुरंत जांचें:',

    diagnosisResult: 'जांच परिणाम और फसल सलाह',
    confidenceMatch: 'सटीक पहचान',
    severityLabel: 'बीमारी का असर',
    severityHealthy: 'फसल बिल्कुल स्वस्थ है',
    severityLow: 'हल्की शुरुआत (चिंता न करें)',
    severityModerate: 'मध्यम असर (इलाज जरूरी)',
    severityHigh: 'गंभीर खतरा (तुरंत स्प्रे करें)',
    severityCritical: 'अति गंभीर (फसल नुकसान का खतरा)',
    symptomsTitle: 'पौधे पर दिखने वाले मुख्य लक्षण',
    audioGuide: 'आवाज़ में सुनें',
    stopAudio: 'आवाज़ रोकें',

    tabDesiRemedy: 'देसी व प्राकृतिक नुस्खे',
    tabSprayMedicine: 'दवाई व स्प्रे की मात्रा',
    tabPrevention: 'आगे के लिए बचाव',
    tabWeather: 'मौसम व छिड़काव सलाह',

    desiRemedyDesc: 'कम खर्च में घर पर तैयार होने वाले जैविक व देसी उपचार:',
    sprayMedicineDesc: 'कृषि विभाग द्वारा प्रमाणित कीटनाशक/फफूंदनाशक दवा और प्रति एकड़ मात्रा:',
    preventionDesc: 'फसल को आगे नुकसान से बचाने के लिए जरूरी सावधानियां:',
    weatherAdvisoryTitle: 'आज के मौसम और छिड़काव की सलाह',
    weatherAdvisoryDesc: 'स्प्रे करने का सही समय: सुबह 8 से 10 बजे ओस सूखने के बाद या शाम 4 से 6 बजे के बीच। तेज धूप और तेज हवा में कभी स्प्रे न करें।',
    bestSprayTime: 'मौसम अनुकूल: हल्के मौसम में छिड़काव करना सुरक्षित रहेगा।',

    saveSlipBtn: 'डॉक्टर पर्ची सेव करें',
    submitToDoctorBtn: 'कृषि विशेषज्ञ को भेजें',
    submittedSuccess: 'जांच पर्ची सुरक्षित कर ली गई है',
    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',

    helplineTitle: 'कृषि अधिकारी से सीधे बात करनी है?',
    helplineDesc: 'भारत सरकार का टोल-फ्री किसान कॉल सेंटर। अपने नजदीकी कृषि वैज्ञानिक से मुफ्त सलाह पाएं।',
    callFree: 'टोल-फ्री फोन करें',
    callKisanCallCenter: '1800-180-1551 पर कॉल करें',
    faqTitle: 'किसान भाइयों के अक्सर पूछे जाने वाले सवाल',
    faqSubtitle: 'फसल देखभाल के जरूरी जवाब',

    faq1Q: 'फसल पर स्प्रे करने का सबसे सही समय कौन सा है?',
    faq1A: 'स्प्रे हमेशा सुबह ओस सूखने के बाद (सुबह 8-10 बजे) या शाम को (4-6 बजे) शांत मौसम में करें। दोपहर की तेज धूप में दवा उड़ जाती है और पौधों को नुकसान हो सकता है।',
    faq2Q: 'क्या खट्टी लस्सी या नीम तेल को अंग्रेजी दवा के साथ मिला सकते हैं?',
    faq2A: 'नहीं, खट्टी छाछ/लस्सी या तांबे वाले देसी घोल को रासायनिक फफूंदनाशक के साथ न मिलाएं। देसी नुस्खे और रासायनिक दवा में कम से कम 3 से 4 दिन का अंतर जरूर रखें।',
    faq3Q: 'एक एकड़ खेत में कितने पंप (टंकी) पानी छिड़कना चाहिए?',
    faq3A: 'हाथ या बैटरी वाले 15-16 लीटर के पंप से एक एकड़ में कम से कम 8 से 10 टंकी (लगभग 120-150 लीटर पानी) छिड़कें ताकि पत्तों के ऊपर और नीचे दोनों तरफ दवा अच्छी तरह पहुंचे।',

    // Location & Weather Upgrades
    useMyCurrentLocation: 'मेरी वर्तमान लोकेशन का उपयोग करें',
    searchLocationPlaceholder: 'भारत में गांव, कस्बा या जिला खोजें...',
    locationPermissionDenied: 'लोकेशन अनुमति अस्वीकार कर दी गई। कृपया अपने गांव को खोजें या सूची से चुनें।',
    fetchingLocation: 'GPS लोकेशन और लाइव मौसम जांच जारी है...',
    popularLocations: 'प्रमुख कृषि क्षेत्र',
    recentLocations: 'हालिया लोकेशन',
    threeDayForecast: '3 दिवसीय छिड़काव पूर्वानुमान',
    lastUpdated: 'अंतिम अपडेट',
    showingCached: 'पिछला सुरक्षित डेटा दिखाया जा रहा है',
    refreshWeather: 'मौसम रिफ्रेश करें',
    localTime: 'स्थानीय समय',
    forecastTomorrow: 'कल',
    forecastDayAfter: 'परसों',
    spraySafe: 'छिड़काव सुरक्षित',
    sprayUnsafe: 'असुरक्षित (बारिश/हवा)',
    sprayCaution: 'सावधानी से छिड़काव करें',

    crops: {
      Wheat: 'गेहूँ (Wheat)',
      Rice: 'धान / चावल (Rice)',
      Potato: 'आलू (Potato)',
      Tomato: 'टमाटर (Tomato)',
      Corn: 'मक्का (Corn)',
      Cotton: 'कपास (Cotton)',
      Mustard: 'सरसों (Mustard)',
      Soybean: 'सोयाबीन (Soybean)',
      Apple: 'सेब (Apple)',
      Grape: 'अंगूर (Grape)'
    }
  },

  pa: {
    appName: 'ਐਗਰੀਸਕੈਨ ਕਿਸਾਨ ਡਾਕਟਰ',
    appTagline: 'ਕਿਸਾਨ ਵੀਰਾਂ ਲਈ ਸੌਖਾ ਫਸਲ ਰੋਗ ਜਾਂਚ ਅਤੇ ਦੇਸੀ ਤੇ ਪੱਕਾ ਇਲਾਜ',
    farmerTitle: 'ਕਿਸਾਨ ਫਸਲ ਡਾਕਟਰ — ਬਿਮਾਰੀ ਜਾਂਚ ਤੇ ਇਲਾਜ',
    farmerSubtitle: 'ਬਿਮਾਰ ਪੱਤੇ ਦੀ ਫੋਟੋ ਲਗਾਓ ਜਾਂ ਚੁਣੋ ਅਤੇ ਤੁਰੰਤ ਬਿਮਾਰੀ ਦਾ ਨਾਂ, ਦੇਸੀ ਨੁਸਖ਼ੇ ਅਤੇ ਸਹੀ ਸਪਰੇਅ ਦੀ ਮਾਤਰਾ ਜਾਣੋ।',
    badgeDemo: 'ਕਿਸਾਨਾਂ ਲਈ 100% ਮੁਫ਼ਤ ਸੇਵਾ',

    farmerMode: 'ਕਿਸਾਨ ਡਾਕਟਰ',
    recordsMode: 'ਪੁਰਾਣੇ ਰਿਕਾਰਡ',
    languageSelect: 'ਭਾਸ਼ਾ (Language)',

    step1Title: 'ਆਪਣੀ ਫਸਲ ਚੁਣੋ',
    step1Desc: 'ਜਿਸ ਫਸਲ ਵਿੱਚ ਰੋਗ ਜਾਂ ਨੁਕਸਾਨ ਦਿਸ ਰਿਹਾ ਹੈ',
    step2Title: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਲਗਾਓ',
    step2Desc: 'ਮੋਬਾਈਲ ਤੋਂ ਖ਼ਰਾਬ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਫੋਟੋ ਲਵੋ',
    step3Title: 'ਤੁਰੰਤ ਪੱਕਾ ਇਲਾਜ',
    step3Desc: 'ਦੇਸੀ ਇਲਾਜ, ਸਪਰੇਅ ਦੀ ਦਵਾਈ ਤੇ ਪਰਹੇਜ਼',

    chooseCrop: 'ਫਸਲ ਚੁਣੋ',
    affectedPart: 'ਬੂਟੇ ਦਾ ਖ਼ਰਾਬ ਹਿੱਸਾ',
    leaves: 'ਪੱਤੇ (Leaves)',
    stem: 'ਤਣਾ / ਸ਼ਾਖਾ (Stem)',
    fruit: 'ਫਲ / ਦਾਣਾ / ਸਿੱਟਾ (Grain/Fruit)',
    roots: 'ਜੜ੍ਹਾਂ / ਮੁੱਢ (Roots)',
    farmerNameLabel: 'ਕਿਸਾਨ ਵੀਰ ਦਾ ਨਾਂ',
    farmerNamePlaceholder: 'ਜਿਵੇਂ: ਜਸਵਿੰਦਰ ਸਿੰਘ / ਗੁਰਪ੍ਰੀਤ',
    locationLabel: 'ਪਿੰਡ / ਜ਼ਿਲ੍ਹਾ',
    locationPlaceholder: 'ਜਿਵੇਂ: ਲੁਧਿਆਣਾ, ਪੰਜਾਬ / ਬਠਿੰਡਾ',
    landAreaLabel: 'ਰਕਬਾ (ਏਕੜ)',
    acres: 'ਏਕੜ',

    takePhoto: 'ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਲਵੋ',
    browsePhoto: 'ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ',
    cancelCamera: 'ਕੈਮਰਾ ਬੰਦ ਕਰੋ',
    capturePhoto: 'ਫੋਟੋ ਖਿੱਚੋ',
    alignLeafNotice: 'ਖ਼ਰਾਬ ਪੱਤੇ ਨੂੰ ਚੌਖਟੇ ਦੇ ਵਿਚਕਾਰ ਰੱਖੋ',
    dragDropNotice: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਇੱਥੇ ਲਗਾਓ ਜਾਂ ਕਲਿੱਕ ਕਰੋ',
    uploadDesc: 'ਮੋਬਾਈਲ ਕੈਮਰਾ ਜਾਂ ਗੈਲਰੀ ਵਿੱਚੋਂ ਪੱਤੇ ਦੀ ਫੋਟੋ ਚੁਣੋ',
    changePhoto: 'ਦੂਜੀ ਫੋਟੋ ਲਗਾਓ',
    readyToScan: 'ਜਾਂਚ ਲਈ ਫੋਟੋ ਤਿਆਰ ਹੈ',
    checkDiseaseBtn: 'ਬਿਮਾਰੀ ਦੀ ਜਾਂਚ ਕਰੋ',
    checkingDisease: 'ਪੱਤੇ ਦੇ ਦਾਗ਼ਾਂ ਅਤੇ ਲੱਛਣਾਂ ਦੀ ਪੜਤਾਲ ਹੋ ਰਹੀ ਹੈ...',
    quickSampleNotice: 'ਜਾਂ ਨਮੂਨਾ ਫੋਟੋ ਵੇਖ ਕੇ ਜਾਂਚੋ',
    quickSampleDesc: 'ਹੇਠਾਂ ਕਿਸੇ ਵੀ ਫਸਲ ਦੀ ਫੋਟੋ ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਤੁਰੰਤ ਪਰਖੋ:',

    diagnosisResult: 'ਜਾਂਚ ਰਿਪੋਰਟ ਤੇ ਖੇਤੀ ਸਲਾਹ',
    confidenceMatch: 'ਪੱਕੀ ਪਛਾਣ',
    severityLabel: 'ਬਿਮਾਰੀ ਦਾ ਅਸਰ',
    severityHealthy: 'ਫਸਲ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਹੈ',
    severityLow: 'ਹਲਕੀ ਸ਼ੁਰੂਆਤ (ਡਰਨ ਦੀ ਲੋੜ ਨਹੀਂ)',
    severityModerate: 'ਦਰਮਿਆਨਾ ਅਸਰ (ਸੰਭਾਲ ਜ਼ਰੂਰੀ)',
    severityHigh: 'ਗੰਭੀਰ ਖ਼ਤਰਾ (ਤੁਰੰਤ ਸਪਰੇਅ ਕਰੋ)',
    severityCritical: 'ਬਹੁਤ ਨਾਜ਼ੁਕ (ਫਸਲ ਦੇ ਨੁਕਸਾਨ ਦਾ ਡਰ)',
    symptomsTitle: 'ਬੂਟੇ ਉੱਤੇ ਦਿਸਣ ਵਾਲੇ ਮੁੱਖ ਲੱਛਣ',
    audioGuide: 'ਆਵਾਜ਼ ਸੁਣੋ',
    stopAudio: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',

    tabDesiRemedy: 'ਦੇਸੀ ਤੇ ਘਰੇਲੂ ਨੁਸਖ਼ੇ',
    tabSprayMedicine: 'ਸਿਫ਼ਾਰਿਸ਼ ਕੀਤੀ ਦਵਾਈ ਤੇ ਸਪਰੇਅ',
    tabPrevention: 'ਅੱਗੇ ਲਈ ਸਾਵਧਾਨੀ',
    tabWeather: 'ਮੌਸਮ ਤੇ ਸਪਰੇਅ ਸਲਾਹ',

    desiRemedyDesc: 'ਘੱਟ ਖ਼ਰਚੇ ਵਿੱਚ ਘਰ ਤਿਆਰ ਹੋਣ ਵਾਲੇ ਦੇਸੀ ਤੇ ਜੈਵਿਕ ਉਪਾਅ:',
    sprayMedicineDesc: 'ਪੀ.ਏ.ਯੂ./ਸਰਕਾਰੀ ਖੇਤੀ ਮਾਹਿਰਾਂ ਦੁਆਰਾ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਦਵਾਈ ਤੇ ਪ੍ਰਤੀ ਏਕੜ ਮਾਤਰਾ:',
    preventionDesc: 'ਅੱਗੇ ਤੋਂ ਫਸਲ ਨੂੰ ਬਿਮਾਰੀ ਤੋਂ ਬਚਾਉਣ ਲਈ ਜ਼ਰੂਰੀ ਨੁਕਤੇ:',
    weatherAdvisoryTitle: 'ਅੱਜ ਦੇ ਮੌਸਮ ਅਤੇ ਸਪਰੇਅ ਕਰਨ ਬਾਰੇ ਸਲਾਹ',
    weatherAdvisoryDesc: 'ਸਪਰੇਅ ਕਰਨ ਦਾ ਸਹੀ ਵੇਲਾ: ਸਵੇਰੇ 8 ਤੋਂ 10 ਵਜੇ ਤਰੇਲ ਸੁੱਕਣ ਮਗਰੋਂ ਜਾਂ ਸ਼ਾਮੀਂ 4 ਤੋਂ 6 ਵਜੇ ਠੰਢੇ ਵੇਲੇ। ਤੇਜ਼ ਧੁੱਪ ਜਾਂ ਤੇਜ਼ ਹਵਾ ਵੇਲੇ ਕਦੇ ਸਪਰੇਅ ਨਾ ਕਰੋ।',
    bestSprayTime: 'ਮੌਸਮ ਅਨੁਕੂਲ: ਸ਼ਾਂਤ ਮੌਸਮ ਵਿੱਚ ਸਪਰੇਅ ਕਰਨ ਨਾਲ ਦਵਾਈ ਪੂਰਾ ਅਸਰ ਕਰਦੀ ਹੈ।',

    saveSlipBtn: 'ਡਾਕਟਰੀ ਪਰਚੀ ਸਾਂਭੋ',
    submitToDoctorBtn: 'ਖੇਤੀ ਮਾਹਿਰ ਨੂੰ ਭੇਜੋ',
    submittedSuccess: 'ਪਰਚੀ ਰਿਕਾਰਡ ਵਿੱਚ ਦਰਜ ਹੋ ਗਈ ਹੈ',
    shareWhatsApp: 'ਵਟਸਐਪ (WhatsApp) ਤੇ ਭੇਜੋ',

    helplineTitle: 'ਖੇਤੀਬਾੜੀ ਅਫ਼ਸਰ ਨਾਲ ਸਿੱਧੀ ਗੱਲਬਾਤ ਕਰਨੀ ਹੈ?',
    helplineDesc: 'ਭਾਰਤ ਸਰਕਾਰ ਦਾ ਮੁਫ਼ਤ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ। ਆਪਣੇ ਇਲਾਕੇ ਦੇ ਖੇਤੀ ਵਿਗਿਆਨੀ ਨਾਲ ਫ਼ੋਨ ਤੇ ਮੁਫ਼ਤ ਸਲਾਹ ਲਵੋ।',
    callFree: 'ਮੁਫ਼ਤ ਫ਼ੋਨ ਮਿਲਾਓ',
    callKisanCallCenter: '1800-180-1551 ਤੇ ਕਾਲ ਕਰੋ',
    faqTitle: 'ਕਿਸਾਨ ਵੀਰਾਂ ਦੇ ਆਮ ਸਵਾਲ ਤੇ ਜਵਾਬ',
    faqSubtitle: 'ਫਸਲ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਲਈ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ',

    faq1Q: 'ਫਸਲ ਉੱਤੇ ਸਪਰੇਅ ਕਰਨ ਦਾ ਸਭ ਤੋਂ ਸਹੀ ਸਮਾਂ ਕਿਹੜਾ ਹੈ?',
    faq1A: 'ਸਪਰੇਅ ਹਮੇਸ਼ਾ ਸਵੇਰੇ ਤਰੇਲ ਸੁੱਕਣ ਤੋਂ ਬਾਅਦ (8-10 ਵਜੇ) ਜਾਂ ਦੁਪਹਿਰ ਢਲਣ ਮਗਰੋਂ (ਸ਼ਾਮ 4-6 ਵਜੇ) ਸ਼ਾਂਤ ਹਵਾ ਵਿੱਚ ਕਰੋ। ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਦਵਾਈ ਉੱਡ ਜਾਂਦੀ ਹੈ ਅਤੇ ਪੱਤੇ ਸੜਨ ਦਾ ਡਰ ਰਹਿੰਦਾ ਹੈ।',
    faq2Q: 'ਕੀ ਖੱਟੀ ਲੱਸੀ ਜਾਂ ਨਿੰਮ ਦੇ ਘੋਲ ਨੂੰ ਅੰਗਰੇਜ਼ੀ ਦਵਾਈ ਨਾਲ ਰਲਾ ਸਕਦੇ ਹਾਂ?',
    faq2A: 'ਨਹੀਂ, ਖੱਟੀ ਲੱਸੀ ਜਾਂ ਦੇਸੀ ਕਾੜ੍ਹਿਆਂ ਨੂੰ ਤੇਜ਼ ਰਸਾਇਣਕ ਉੱਲੀਨਾਸ਼ਕ ਦਵਾਈਆਂ ਨਾਲ ਕਦੇ ਨਾ ਮਿਲਾਓ। ਦੇਸੀ ਘੋਲ ਅਤੇ ਰਸਾਇਣਕ ਦਵਾਈ ਵਿਚਕਾਰ ਘੱਟੋ-ਘੱਟ 3 ਤੋਂ 4 ਦਿਨਾਂ ਦਾ ਫ਼ਰਕ ਜ਼ਰੂਰ ਰੱਖੋ।',
    faq3Q: 'ਇੱਕ ਏਕੜ ਵਿੱਚ ਕਿੰਨੀਆਂ ਢੋਲੀਆਂ (ਪੰਪ) ਪਾਣੀ ਛਿੜਕਣਾ ਚਾਹੀਦਾ ਹੈ?',
    faq3A: 'ਹੱਥ ਜਾਂ ਬੈਟਰੀ ਵਾਲੇ 16 ਲੀਟਰ ਦੇ ਪੰਪ ਨਾਲ ਇੱਕ ਏਕੜ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 8 ਤੋਂ 10 ਢੋਲੀਆਂ (ਲਗਭਗ 120-150 ਲੀਟਰ ਪਾਣੀ) ਛਿੜਕੋ ਤਾਂ ਜੋ ਪੱਤਿਆਂ ਦੇ ਉੱਪਰ ਅਤੇ ਹੇਠਾਂ ਦੋਵੇਂ ਪਾਸੇ ਦਵਾਈ ਚੰਗੀ ਤਰ੍ਹਾਂ ਲੱਗ ਸਕੇ।',

    // Location & Weather Upgrades
    useMyCurrentLocation: 'ਮੇਰੀ ਮੌਜੂਦਾ ਲੋਕੇਸ਼ਨ ਵਰਤੋ',
    searchLocationPlaceholder: 'ਭਾਰਤ ਵਿੱਚ ਪਿੰਡ, ਕਸਬਾ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਖੋਜੋ...',
    locationPermissionDenied: 'ਲੋਕੇਸ਼ਨ ਆਗਿਆ ਰੱਦ ਕੀਤੀ ਗਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪਿੰਡ ਖੋਜੋ ਜਾਂ ਸੂਚੀ ਵਿੱਚੋਂ ਚੁਣੋ।',
    fetchingLocation: 'GPS ਲੋਕੇਸ਼ਨ ਅਤੇ ਲਾਈਵ ਮੌਸਮ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...',
    popularLocations: 'ਮੁੱਖ ਖੇਤੀਬਾੜੀ ਇਲਾਕੇ',
    recentLocations: 'ਹਾਲੀਆ ਲੋਕੇਸ਼ਨਾਂ',
    threeDayForecast: '3 ਦਿਨਾਂ ਦਾ ਸਪਰੇਅ ਪੂਰਵ-ਅਨੁਮਾਨ',
    lastUpdated: 'ਆਖ਼ਰੀ ਅੱਪਡੇਟ',
    showingCached: 'ਆਖ਼ਰੀ ਸਾਂਭਿਆ ਡੇਟਾ ਦਿਖਾਇਆ ਜਾ ਰਿਹਾ ਹੈ',
    refreshWeather: 'ਮੌਸਮ ਤਾਜ਼ਾ ਕਰੋ',
    localTime: 'ਸਥਾਨਕ ਸਮਾਂ',
    forecastTomorrow: 'ਭਲਕੇ (ਕੱਲ੍ਹ)',
    forecastDayAfter: 'ਪਰਸੋਂ',
    spraySafe: 'ਸਪਰੇਅ ਸੁਰੱਖਿਅਤ',
    sprayUnsafe: 'ਅਸੁਰੱਖਿਅਤ (ਮੀਂਹ/ਹਵਾ)',
    sprayCaution: 'ਸਾਵਧਾਨੀ ਨਾਲ ਸਪਰੇਅ',

    crops: {
      Wheat: 'ਕਣਕ (Wheat)',
      Rice: 'ਝੋਨਾ / ਚਾਵਲ (Rice)',
      Potato: 'ਆਲੂ (Potato)',
      Tomato: 'ਟਮਾਟਰ (Tomato)',
      Corn: 'ਮੱਕੀ (Corn)',
      Cotton: 'ਨਰਮਾ / ਕਪਾਹ (Cotton)',
      Mustard: 'ਸਰ੍ਹੋਂ (Mustard)',
      Soybean: 'ਸੋਇਆਬੀਨ (Soybean)',
      Apple: 'ਸੇਬ (Apple)',
      Grape: 'ਅੰਗੂਰ (Grape)'
    }
  }
};
