import { DiseaseProfile, ScanSubmission } from '../types';

export const DISEASE_PROFILES: DiseaseProfile[] = [
  {
    id: 'tomato-early-blight',
    commonName: 'Early Blight (Target Spot)',
    scientificName: 'Alternaria solani',
    crop: 'Tomato',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Moderate',
    primarySymptoms: 'Concentric dark brown circular rings on older leaves forming characteristic "bullseye" target spots, surrounded by prominent yellow chlorotic margins.',
    sampleImageUrl: '/src/assets/images/crop_tomato_blight_1793802324166.jpg',
    favorableWeather: 'Warm temperatures (24°C–29°C) with persistent heavy dew or overhead irrigation.',
    defaultConfidence: 94.2,
    estimatedYieldImpact: '25% – 40% if defoliation reaches upper canopy prior to fruit set',
    treatment: {
      culturalControls: [
        'Stake and trellis vines to ensure canopy air circulation at least 45 cm above mulch',
        'Prune and destroy infected lower leaves using sterilized shears (70% ethanol)',
        'Rotate with non-solanaceous crops (avoid peppers, eggplants, potatoes) for 3 consecutive seasons',
        'Convert to bottom drip irrigation; avoid late-afternoon leaf wetting'
      ],
      organicControls: [
        'Copper octanoate (copper soap) liquid spray applied every 7–10 days before rain',
        'Bacillus amyloliquefaciens strain D747 bio-fungicide preventative drench',
        'Potassium bicarbonate foliar application at 3 g/L'
      ],
      chemicalControls: [
        {
          activeIngredient: 'Chlorothalonil',
          fracCode: 'M05',
          applicationRate: '2.1 L/ha in 400 L water',
          preHarvestInterval: '0 days',
          notes: 'Broad-spectrum multisite protectant. Apply prior to predicted infection events.'
        },
        {
          activeIngredient: 'Azoxystrobin + Difenoconazole',
          fracCode: 'FRAC 11 + 3',
          applicationRate: '0.6 L/ha',
          preHarvestInterval: '7 days',
          notes: 'Translaminar and systemic curative activity. Maximum 2 consecutive applications.'
        }
      ],
      environmentalRiskNotes: 'High relative humidity (>85%) and temperature spikes above 26°C trigger rapid conidial sporulation within 12 hours.',
      preventiveMeasures: [
        'Utilize certified disease-free seed stock',
        'Incorporate clean organic mulch to prevent rain-splash inoculum from soil',
        'Sterilize equipment between field blocks'
      ]
    }
  },
  {
    id: 'corn-northern-leaf-blight',
    commonName: 'Northern Corn Leaf Blight (NCLB)',
    scientificName: 'Exserohilum turcicum',
    crop: 'Corn',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    primarySymptoms: 'Long, cigar-shaped elliptical grayish-green or tan lesions measuring 3–15 cm, running parallel along the leaf veins without yellow borders.',
    sampleImageUrl: '/src/assets/images/crop_corn_leaf_blight_1793802326412.jpg',
    favorableWeather: 'Moderate temperatures (18°C–27°C) accompanied by extended periods of high leaf wetness (6+ hours).',
    defaultConfidence: 92.8,
    estimatedYieldImpact: '30% – 50% if ear leaf and upper canopy are infected prior to tassel/silking',
    treatment: {
      culturalControls: [
        'Perform conservation tillage or clean residue burial to accelerate stalk decomposition',
        'Select certified resistant hybrids with Ht1, Ht2, or HtN multi-gene resistance',
        'Maintain balanced nitrogen-potassium soil fertility to avoid canopy stress'
      ],
      organicControls: [
        'Bio-stimulant silica foliar sprays to reinforce leaf cuticle mechanical barriers',
        'Trichoderma harzianum soil inoculation at planting time'
      ],
      chemicalControls: [
        {
          activeIngredient: 'Pyraclostrobin + Fluxapyroxad',
          fracCode: 'FRAC 11 + 7',
          applicationRate: '350 mL/ha',
          preHarvestInterval: '21 days',
          notes: 'Optimal timing at VT-R1 (tassel emergence to silking) for maximum canopy protection.'
        },
        {
          activeIngredient: 'Propiconazole',
          fracCode: 'FRAC 3',
          applicationRate: '280 mL/ha',
          preHarvestInterval: '30 days',
          notes: 'Curative triazole; apply early when lesions appear on lower 3 leaves.'
        }
      ],
      environmentalRiskNotes: 'Extended cloudy periods with heavy morning dews greatly amplify sporulation from infested crop stubble.',
      preventiveMeasures: [
        'Rotate fields out of corn for minimum 1 year with soybean or alfalfa',
        'Scout weekly starting at V8 vegetative stage'
      ]
    }
  },
  {
    id: 'potato-late-blight',
    commonName: 'Late Blight (Irish Blight)',
    scientificName: 'Phytophthora infestans',
    crop: 'Potato',
    pathogenClass: 'Oomycete',
    typicalSeverity: 'Critical',
    primarySymptoms: 'Water-soaked irregular dark necrotic patches rapidly turning black, surrounded by delicate white downy mildew sporulation on the underside in humid conditions.',
    sampleImageUrl: '/src/assets/images/crop_potato_late_blight_1793802325779.jpg',
    favorableWeather: 'Cool, wet, humid weather (15°C–21°C) with persistent fog or rain.',
    defaultConfidence: 96.5,
    estimatedYieldImpact: 'Up to 100% total field destruction within 7–10 days if left unchecked',
    treatment: {
      culturalControls: [
        'Immediately destroy cull piles and volunteer potato sprouts which serve as overwintering reservoirs',
        'Hilling soil around potato rows to create a 10 cm barrier against zoospore tuber infection',
        'Top-kill vines (chemical or flaming) 2 weeks before harvesting to ensure spore death'
      ],
      organicControls: [
        'Fixed copper compounds (Bordeaux mixture) applied strictly preventative before rain events',
        'Hydrogen dioxide / peroxyacetic acid foliar sanitizing wash'
      ],
      chemicalControls: [
        {
          activeIngredient: 'Mandipropamid',
          fracCode: 'FRAC 40',
          applicationRate: '0.45 L/ha',
          preHarvestInterval: '14 days',
          notes: 'Potent oomycete specialist. Protects leaf surface and exhibits translaminar leaf uptake.'
        },
        {
          activeIngredient: 'Cymoxanil + Mancozeb',
          fracCode: 'FRAC 27 + M03',
          applicationRate: '2.5 kg/ha',
          preHarvestInterval: '7 days',
          notes: 'Provides 24–48 hour post-infection "kick-back" curative activity.'
        }
      ],
      environmentalRiskNotes: 'CRITICAL ALERT: Late blight is an explosive community contagion. Notify neighboring agricultural extension officers immediately.',
      preventiveMeasures: [
        'Use only certified blue-tag seed tubers with zero detectable rot',
        'Monitor local Late Blight Decision Support Systems (DSS) blight units'
      ]
    }
  },
  {
    id: 'rice-blast',
    commonName: 'Rice Blast (Magnaporthe)',
    scientificName: 'Magnaporthe oryzae',
    crop: 'Rice',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    primarySymptoms: 'Diamond-shaped, spindle lesions with gray or whitish centers and distinct dark reddish-brown borders; causes collar rot and neck panicle collapse.',
    sampleImageUrl: '/src/assets/images/crop_rice_blast_1793802325819.jpg',
    favorableWeather: 'Warm days (25°C–28°C) with cool nights and prolonged leaf dew (>10 hours) or excessive nitrogen.',
    defaultConfidence: 93.4,
    estimatedYieldImpact: '35% – 60% if neck blast infects developing panicles during grain fill',
    treatment: {
      culturalControls: [
        'Avoid excessive split applications of chemical nitrogen fertilizer (keep balanced with K and Si)',
        'Maintain continuous water depth (5–8 cm) in paddy; avoid drought stress drying',
        'Adjust transplanting spacing to 20 cm x 20 cm for ventilation'
      ],
      organicControls: [
        'Neem seed kernel extract (NSKE 5%) sprayed at early tillering',
        'Pseudomonas fluorescens seed treatment (10 g/kg seed) and foliar bio-protective spray'
      ],
      chemicalControls: [
        {
          activeIngredient: 'Tricyclazole',
          fracCode: 'FRAC 16.1',
          applicationRate: '0.6 kg/ha',
          preHarvestInterval: '30 days',
          notes: 'Systemic melanin biosynthesis inhibitor. Highly specific for blast disease control.'
        },
        {
          activeIngredient: 'Isoprothiolane',
          fracCode: 'FRAC 6',
          applicationRate: '1.2 L/ha',
          preHarvestInterval: '28 days',
          notes: 'Applied at boot stage to safeguard panicle neck before heading.'
        }
      ],
      environmentalRiskNotes: 'Drying paddy soil and excessive vegetative nitrogen create tender, thin-walled leaf tissue prone to appressorium penetration.',
      preventiveMeasures: [
        'Hot-water seed immersion treatment (53°C for 10 minutes) before germination',
        'Plant certified resistant cultivars adapted to local river basin'
      ]
    }
  },
  {
    id: 'wheat-stripe-rust',
    commonName: 'Stripe Rust (Yellow Rust)',
    scientificName: 'Puccinia striiformis',
    crop: 'Wheat',
    pathogenClass: 'Fungal',
    typicalSeverity: 'Severe',
    primarySymptoms: 'Narrow, linear stripes of vivid yellow-orange urediniospores along the leaf veins, producing powdery rust residue on touch.',
    sampleImageUrl: '/src/assets/images/crop_corn_leaf_blight_1793802326412.jpg', // fallback
    favorableWeather: 'Cool temperatures (10°C–15°C) with intermittent rain and damp morning mist.',
    defaultConfidence: 89.1,
    estimatedYieldImpact: '40% – 70% in susceptible cultivars during early flag leaf stages',
    treatment: {
      culturalControls: [
        'Eradicate "green bridge" volunteer grasses between harvest and autumn sowing',
        'Sow diverse wheat cultivars with differing Yr resistance genes across acreage'
      ],
      organicControls: [
        'Sulfur-based dusts applied in early vegetative stage before spore cloud formation'
      ],
      chemicalControls: [
        {
          activeIngredient: 'Tebuconazole',
          fracCode: 'FRAC 3',
          applicationRate: '250 mL/ha',
          preHarvestInterval: '35 days',
          notes: 'Fast curative and protectant action when flag leaf begins expanding.'
        }
      ],
      environmentalRiskNotes: 'Spores are windborne over hundreds of kilometers. Regional early warning monitoring is vital.',
      preventiveMeasures: ['Use seed pre-treated with systemic triazole fungicides']
    }
  },
  {
    id: 'healthy-control',
    commonName: 'Healthy Crop (No Active Pathogen)',
    scientificName: 'Vigorously growing foliage',
    crop: 'Soybean',
    pathogenClass: 'Healthy',
    typicalSeverity: 'Healthy',
    primarySymptoms: 'Uniform deep green pigmentation, intact epidermal cellular boundaries, clear turgid venation, and zero necrotic lesions or fungal sporulation.',
    sampleImageUrl: '/src/assets/images/crop_rice_blast_1793802325819.jpg',
    favorableWeather: 'Optimal growth conditions within standard seasonal thresholds.',
    defaultConfidence: 98.7,
    estimatedYieldImpact: '0% — Expected yield potential fully intact',
    treatment: {
      culturalControls: [
        'Maintain routine scouting schedule every 5–7 days',
        'Continue standard balanced micronutrient fertigation program'
      ],
      organicControls: [
        'Prophylactic seaweed extract foliar spray to bolster systemic acquired resistance'
      ],
      chemicalControls: [],
      environmentalRiskNotes: 'No pathogen pressure detected. Maintain standard preventative field hygiene.',
      preventiveMeasures: ['Continue routine farm border weeding and clean machinery protocols']
    }
  }
];

export const INITIAL_FIELD_SUBMISSIONS: ScanSubmission[] = [
  {
    id: 'SCN-8491',
    timestamp: '2026-11-04 05:42',
    farmerName: 'Mateo Morales',
    farmLocation: 'Salinas Valley, California',
    farmSizeAcres: 85,
    crop: 'Tomato',
    plantPart: 'Leaves',
    imageUrl: '/src/assets/images/crop_tomato_blight_1793802324166.jpg',
    diagnosis: {
      diseaseId: 'tomato-early-blight',
      commonName: 'Early Blight (Target Spot)',
      scientificName: 'Alternaria solani',
      pathogenClass: 'Fungal',
      confidence: 94.2,
      severity: 'Moderate',
      keyIndicators: [
        'Concentric ring target lesions',
        'Yellow chlorotic halos',
        'Lower canopy defoliation'
      ],
      yieldRiskPercentage: 35
    },
    status: 'Pending Review',
    isDemoRecord: true
  },
  {
    id: 'SCN-8488',
    timestamp: '2026-11-04 04:15',
    farmerName: 'Gurpreet Sandhu',
    farmLocation: 'Ludhiana Basin, Punjab',
    farmSizeAcres: 120,
    crop: 'Rice',
    plantPart: 'Leaves',
    imageUrl: '/src/assets/images/crop_rice_blast_1793802325819.jpg',
    diagnosis: {
      diseaseId: 'rice-blast',
      commonName: 'Rice Blast (Magnaporthe)',
      scientificName: 'Magnaporthe oryzae',
      pathogenClass: 'Fungal',
      confidence: 93.4,
      severity: 'Severe',
      keyIndicators: [
        'Spindle-shaped lesions',
        'Ash-gray necrotic centers',
        'Collar rot tendencies'
      ],
      yieldRiskPercentage: 45
    },
    status: 'Verified',
    verifiedBy: 'Dr. Evelyn Vance, Sr. Agronomist',
    verifiedAt: '2026-11-04 05:10',
    agronomistNotes: 'Confirmed blast infection on vegetative leaves. Advised immediate Tricyclazole foliar treatment and reduction of high urea inputs before boot stage.',
    isDemoRecord: true
  },
  {
    id: 'SCN-8482',
    timestamp: '2026-11-03 16:30',
    farmerName: 'Heinrich Becker',
    farmLocation: 'Lower Saxony, Germany',
    farmSizeAcres: 64,
    crop: 'Potato',
    plantPart: 'Leaves',
    imageUrl: '/src/assets/images/crop_potato_late_blight_1793802325779.jpg',
    diagnosis: {
      diseaseId: 'potato-late-blight',
      commonName: 'Late Blight (Irish Blight)',
      scientificName: 'Phytophthora infestans',
      pathogenClass: 'Oomycete',
      confidence: 96.5,
      severity: 'Critical',
      keyIndicators: [
        'Water-soaked necrotic lesions',
        'Underside white sporulation fuzz',
        'Rapid stem lesion spread'
      ],
      yieldRiskPercentage: 80
    },
    status: 'Verified',
    verifiedBy: 'Dr. Evelyn Vance, Sr. Agronomist',
    verifiedAt: '2026-11-03 17:05',
    agronomistNotes: 'CRITICAL OOMYCETE PRESSURE. Mandipropamid + Cymoxanil emergency tank-mix prescribed. Neighboring cooperatives alerted.',
    isDemoRecord: true
  },
  {
    id: 'SCN-8475',
    timestamp: '2026-11-03 11:20',
    farmerName: 'Caleb Miller',
    farmLocation: 'Champaign County, Illinois',
    farmSizeAcres: 340,
    crop: 'Corn',
    plantPart: 'Leaves',
    imageUrl: '/src/assets/images/crop_corn_leaf_blight_1793802326412.jpg',
    diagnosis: {
      diseaseId: 'corn-northern-leaf-blight',
      commonName: 'Northern Corn Leaf Blight (NCLB)',
      scientificName: 'Exserohilum turcicum',
      pathogenClass: 'Fungal',
      confidence: 92.8,
      severity: 'Severe',
      keyIndicators: [
        'Cigar-shaped elliptical lesions',
        'Parallel to veins',
        'Lesions extending over 8 cm'
      ],
      yieldRiskPercentage: 30
    },
    status: 'Reclassified',
    verifiedBy: 'Marcus Brody, CCA Agronomist',
    verifiedAt: '2026-11-03 13:45',
    reclassifiedDisease: 'Northern Corn Leaf Blight (Severe Strain)',
    agronomistNotes: 'Prototype model labeled as moderate; escalated to Severe due to lesions reaching within 1 leaf of the primary ear node during R1 silk stage. Fungicide aircraft scheduled.',
    isDemoRecord: true
  },
  {
    id: 'SCN-8469',
    timestamp: '2026-11-02 18:50',
    farmerName: 'Amina Kiprop',
    farmLocation: 'Eldoret, Rift Valley, Kenya',
    farmSizeAcres: 14,
    crop: 'Tomato',
    plantPart: 'Leaves',
    imageUrl: '/src/assets/images/crop_tomato_blight_1793802324166.jpg',
    diagnosis: {
      diseaseId: 'tomato-early-blight',
      commonName: 'Early Blight (Target Spot)',
      scientificName: 'Alternaria solani',
      pathogenClass: 'Fungal',
      confidence: 91.5,
      severity: 'Moderate',
      keyIndicators: [
        'Target spot bullseye lesions',
        'Leaf tip chlorosis'
      ],
      yieldRiskPercentage: 28
    },
    status: 'Resolved',
    verifiedBy: 'Dr. Evelyn Vance, Sr. Agronomist',
    verifiedAt: '2026-11-02 19:30',
    agronomistNotes: 'Farmer applied organic copper hydroxide spray and pruned lower canopy branches. Follow-up confirms vegetative regrowth.',
    isDemoRecord: true
  }
];
