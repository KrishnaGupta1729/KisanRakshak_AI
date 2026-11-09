import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Support base64 image uploads up to 25MB
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Helper to initialize GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment. Please check the Secrets panel in AI Studio.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Helper to generate content with high availability: uses gemini-3.1-flash-lite for instant response, falls back to gemini-3.8-flash
async function generateWithModelFallback(ai: GoogleGenAI, request: any) {
  try {
    return await ai.models.generateContent({
      ...request,
      model: 'gemini-3.1-flash-lite'
    });
  } catch (err: any) {
    console.warn('gemini-3.1-flash-lite error, falling back to gemini-3.8-flash:', err?.message);
    return await ai.models.generateContent({
      ...request,
      model: 'gemini-3.8-flash'
    });
  }
}

// 1. VOICE ASSISTANT CHAT ENDPOINT
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const ai = getGenAI();

    const selectedCrop = context.crop || 'Crop';
    const detectedDisease = context.disease || 'General crop checkup';
    const location = context.location || 'Punjab / Regional India';
    const weather = context.weather || 'Normal seasonal weather';
    const sprayCondition = context.sprayCondition || 'Check local wind before spraying';
    const language = context.language || 'pa';

    const systemInstruction = `You are "AgriScan Assistant, your farming helper" — a practical, empathetic, and knowledgeable agricultural advisory assistant for Indian farmers.

CORE BEHAVIOR:
1. IDENTITY & PERSONA:
- Introduce yourself as "AgriScan Assistant, your farming helper".
- Never say you are Gemini, Google's model, Google AI, or a large language model unless the user directly asks what technology you use.

2. LANGUAGE:
- Always respond in plain, clear, friendly English only.
- Use simple, everyday farmer words that any grower can easily understand. Avoid heavy academic or corporate jargon.

3. LENGTH & FORMAT:
- Keep your entire response concise: exactly 3 to 4 short, clear sentences or bullet lines.
- Make it readable line by line so it sounds natural when spoken aloud or read on a mobile screen.

4. CONTEXT INTEGRATION:
- Selected Crop in App: "${selectedCrop}"
- Current Diagnosed Disease: "${detectedDisease}"
- Farmer Location / Region: "${location}"
- Current Local Weather: "${weather}"
- Current Spray Suitability: "${sprayCondition}"
If the question is about the current crop, weather, disease, or spray suitability, directly apply this context!

5. OFF-TOPIC GUARDRAIL:
- If the question is NOT related to agriculture, farming, crops, seeds, pests, diseases, fertilizers, spray timing, soil, irrigation, weather, or livestock, politely say you can only help with farming and crop care.

6. SAFETY & EMERGENCIES:
- For serious, fast-spreading crop damage, toxic pesticide doubts, or uncertain diagnoses, advise the farmer to contact the toll-free Kisan Call Center at 1800-180-1551 for free direct assistance from government agronomists.`;

    // Construct multi-turn contents from session history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'assistant' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    // Add current query
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await generateWithModelFallback(ai, {
      contents,
      config: {
        systemInstruction
      }
    });

    const replyText = response.text || '';

    // Split into 3-4 clean readable lines
    const lines = replyText
      .split(/\n+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return res.json({
      reply: replyText,
      lines: lines.length > 0 ? lines : [replyText]
    });
  } catch (err: any) {
    console.error('Chat API Error:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to get answer from assistant. Please try again or call 1800-180-1551.'
    });
  }
});

// 2. REAL PLANT PATHOLOGY DIAGNOSIS FROM PHOTO
app.post('/api/diagnose', async (req, res) => {
  try {
    const rawImage = req.body.image || req.body.imageBase64;
    const { crop = 'Crop', plantPart = 'Leaves', language = 'pa' } = req.body;

    if (!rawImage) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const ai = getGenAI();

    // Extract mime type and base64 payload
    let mimeType = 'image/jpeg';
    let base64Data = rawImage;

    if (rawImage.startsWith('data:')) {
      const matches = rawImage.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    const promptText = `You are a certified senior plant pathologist and agronomist examining a farmer's crop photo in India.
Context from farmer:
- Crop specified: ${crop}
- Affected plant organ: ${plantPart}
- Target language: English only

ANALYZE THIS LEAF / PLANT PHOTO CAREFULLY:
1. Is this photo clearly a plant, leaf, crop, or fruit?
   - If it is NOT a plant (e.g. human face, room, animal, black screen, completely blurry, illegible):
     Set isUnclear: true, isHealthy: false, confidence: 30, diseaseName: "Not sure / Unclear Photo", scientificName: "Unidentifiable", severity: "Low", unclearNotice: "Not sure, please retake a clear close-up photo of the leaf or contact an expert."
2. Is the plant / leaf healthy?
   - If there are no noticeable pathogenic lesions, mold, blights, or severe insect damage:
     Set isHealthy: true, isUnclear: false, confidence: 92, diseaseName: "Healthy Leaf / Crop", scientificName: "Healthy tissue", severity: "Healthy", symptoms: ["No disease spots or yellowing found", "Vigorous green leaf tissue"], desiRemedies: ["No chemical spray needed! Save your money.", "Maintain balanced irrigation."], chemicalSprays: [], prevention: ["Regular scouting every 5-7 days."].
3. If diseased, deficient, or attacked by pests:
   - Identify the exact disease in English (e.g. Yellow Rust, Late Blight, Early Blight, Blast, Leaf Curl, Bacterial Leaf Blight, Whitefly/Bollworm).
   - Provide a realistic model confidence percentage (between 50 and 98 based on visual certainty). If below 60, set isUnclear to true with unclearNotice asking to retake photo or verify with KVK.
   - Severity: "Low" | "Moderate" | "Severe" | "Critical".
   - Primary visible symptoms (2 to 4 bullet items in plain English).
   - Desi / Natural home remedies suited for Indian farmers (2 to 3 practical low-cost remedies like sour buttermilk/lassi spray, neem seed oil, wood ash, proper soil aeration).
   - Approved chemical sprays in India with exact application rate per acre in 150-200L water and safety days gap before harvest (1 to 2 options).
   - Prevention tips for next sowing.
   - Audio script: 2-3 friendly sentences in plain English summarizing the diagnosis and immediate action.`;

    const response = await generateWithModelFallback(ai, {
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Data
          }
        },
        {
          text: promptText
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isUnclear: { type: Type.BOOLEAN, description: 'True if image is blurry, not a plant, or confidence < 60%' },
            isHealthy: { type: Type.BOOLEAN, description: 'True if the crop leaf is healthy' },
            confidence: { type: Type.NUMBER, description: 'Real estimated certainty percentage between 10 and 99' },
            diseaseName: { type: Type.STRING, description: 'Common disease name in target language' },
            scientificName: { type: Type.STRING, description: 'Latin or biological causal agent' },
            pathogenClass: { type: Type.STRING, description: 'Fungal | Bacterial | Viral | Oomycete | Pest Damage | Nutrient Deficiency | Healthy' },
            severity: { type: Type.STRING, description: 'Healthy | Low | Moderate | Severe | Critical' },
            symptoms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-4 symptoms formatted as separate items'
            },
            desiRemedies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-3 organic / home remedies'
            },
            chemicalSprays: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  medicineName: { type: Type.STRING },
                  dose: { type: Type.STRING },
                  safetyDays: { type: Type.STRING },
                  advice: { type: Type.STRING }
                },
                required: ['medicineName', 'dose', 'safetyDays', 'advice']
              }
            },
            prevention: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            favorableWeather: { type: Type.STRING },
            yieldRisk: { type: Type.STRING },
            audioScript: { type: Type.STRING },
            unclearNotice: { type: Type.STRING }
          },
          required: [
            'isUnclear',
            'isHealthy',
            'confidence',
            'diseaseName',
            'scientificName',
            'pathogenClass',
            'severity',
            'symptoms',
            'desiRemedies',
            'chemicalSprays',
            'prevention',
            'audioScript'
          ]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    return res.json({ diagnosis: parsedJson });
  } catch (err: any) {
    console.error('Diagnosis API Error:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to analyze crop photo. Please try again or consult the Kisan Call Center.'
    });
  }
});

// Production or Vite Dev server setup
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgriScan server running on http://0.0.0.0:${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
