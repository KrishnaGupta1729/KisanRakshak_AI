import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles, MessageSquare, AlertCircle, RefreshCw, PhoneCall } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  lines: string[];
  isError?: boolean;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, activeCrop, liveDiagnosis, localizedProfiles, currentWeather } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested voice questions in English
  const suggestedQuestions = [
    { label: '🌾 Wheat Yellow Rust Treatment', query: 'What is the best medicine for wheat stripe rust?' },
    { label: '🌦️ Is it safe to spray today?', query: 'Is today weather good for spraying fungicide?' },
    { label: '🌱 Top high yielding paddy seeds', query: 'Which are the best certified rice seeds?' },
    { label: '🥔 Potato Late Blight Remedy', query: 'What is the immediate remedy for potato late blight?' }
  ];

  // Active disease name from live diagnosis or crop matching
  const currentDiseaseName =
    liveDiagnosis?.diseaseName ||
    localizedProfiles.find((p) => p.crop === activeCrop)?.names.en ||
    'General Crop Health';

  // Initialize greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingText = 'Welcome! I am AgriScan Assistant, your farming helper. Tap the microphone to speak or type your question below.';

      const greetingLines = [
        'Welcome! I am AgriScan Assistant, your farming helper.',
        `Selected crop: ${activeCrop} (${currentDiseaseName}).`,
        'Ask any question about crop diseases, remedies, seed varieties, or weather.'
      ];

      setMessages([
        {
          id: 'greeting',
          sender: 'assistant',
          text: greetingText,
          lines: greetingLines
        }
      ]);
    }

    if (!isOpen) {
      stopListening();
      stopSpeaking();
    }
  }, [isOpen, activeCrop]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition Setup
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Speak aloud in English
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    stopSpeaking();

    const cleanText = text.replace(/[*_#•\d\.]/g, ' ').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Send message to assistant server API
  const handleSendMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    setApiError(null);
    setSpeechText('');
    stopSpeaking();

    // Append user message
    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      lines: [trimmed]
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const weatherSummary = `${currentWeather.district}: ${currentWeather.conditionText.en}, ${currentWeather.temperature}°C, Wind: ${currentWeather.windSpeed} km/h, Humidity: ${currentWeather.humidity}%`;
      const sprayCondition = currentWeather.spraySuitabilityText.en;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmed,
          history: newHistory.slice(-8).map((m) => ({
            sender: m.sender,
            text: m.text
          })),
          context: {
            crop: activeCrop,
            disease: currentDiseaseName,
            location: currentWeather.district,
            weather: weatherSummary,
            sprayCondition: sprayCondition,
            language: 'en'
          }
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || '';
      const lines = Array.isArray(data.lines) && data.lines.length > 0 ? data.lines : [reply];

      const assistantMsg: MessageItem = {
        id: `assist-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        lines: lines
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);

      // Speak answer automatically
      speakText(reply);
    } catch (err: any) {
      console.error('Voice Assistant Error:', err);
      setIsLoading(false);
      setApiError(err?.message || 'Failed to connect to assistant.');

      const fallbackMsg: MessageItem = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, connection to the assistant failed. Please try again or call the Kisan Call Center at 1800-180-1551.',
        lines: [
          'Connection error encountered.',
          'Please retry or call the toll-free Kisan Call Center at 1800-180-1551 for free advice.'
        ],
        isError: true
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (speechText.trim()) {
      handleSendMessage(speechText.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-[#d2ddd0] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1e3a24] via-[#24452b] to-[#1a3320] text-white flex items-center justify-between shadow-xs border-b border-[#1e3a24]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-xs">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                AgriScan Assistant
              </h3>
              <p className="text-[11px] text-emerald-200 font-medium">
                {activeCrop} · {currentDiseaseName.slice(0, 26)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="p-1.5 px-3 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors min-h-[36px]"
                title="Stop voice readout"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[11px]">Stop</span>
              </button>
            )}

            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="p-2 text-white/90 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat message history with line-by-line presentation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#f7f9f6]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#1e3a24] text-white rounded-br-xs shadow-xs font-medium'
                    : msg.isError
                    ? 'bg-red-50 text-red-900 border border-red-200 rounded-bl-xs shadow-xs space-y-2'
                    : 'bg-white text-[#1c261b] border border-[#d2ddd0] rounded-bl-xs shadow-xs space-y-2'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#d2ddd0] text-[11px] font-bold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-amber-500" />
                      <span>AgriScan Assistant</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(msg.text)}
                      className="p-1 px-2 text-[#1e3a24] hover:text-black hover:bg-[#edf5ec] rounded-lg cursor-pointer flex items-center gap-1 font-bold transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#1e3a24]" />
                      <span className="text-[10px]">Listen</span>
                    </button>
                  </div>
                )}

                {/* Line by line clear formatting */}
                <div className="space-y-1.5 leading-relaxed">
                  {msg.lines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        msg.sender === 'assistant' && lIdx > 0
                          ? 'p-2.5 rounded-xl bg-[#f7f9f6] border border-[#d2ddd0] font-medium text-[#1c261b]'
                          : ''
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Helpline shortcut if error */}
                {msg.isError && (
                  <div className="pt-2 border-t border-red-200 flex items-center justify-between">
                    <a
                      href="tel:18001801551"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>1800-180-1551 (Kisan Helpline)</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Real loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#d2ddd0] p-3.5 rounded-2xl shadow-xs flex items-center gap-2.5 text-xs text-[#1c261b]">
                <RefreshCw className="w-4 h-4 text-emerald-700 animate-spin" />
                <span className="font-semibold">
                  Getting personalized farming advice from AgriScan Assistant...
                </span>
              </div>
            </div>
          )}

          {/* Listening indicator */}
          {isListening && (
            <div className="flex justify-start">
              <div className="bg-[#fffcee] text-[#3a280c] p-3.5 rounded-2xl border border-[#f5e3ad] text-xs font-bold flex items-center gap-2 animate-pulse shadow-xs">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span>
                  Listening... Please speak your farming question
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#f7f9f6] border-t border-[#d2ddd0] overflow-x-auto">
          <div className="text-[11px] font-bold text-[#556953] mb-1.5 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              Suggested Questions:
            </span>
          </div>
          <div className="flex items-center gap-2 pb-1">
            {suggestedQuestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sug.query)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#edf5ec] text-[#1c261b] hover:text-[#1e3a24] border border-[#d2ddd0] text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all shadow-xs hover:border-[#1e3a24] disabled:opacity-50"
              >
                {sug.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice and Text Input Area */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#d2ddd0] space-y-2">
          {apiError && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="flex-1 truncate">{apiError}</span>
            </div>
          )}

          <form onSubmit={handleManualSubmit} className="flex items-center gap-2">
            {/* Big Mic Button - Accent amber-400 */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-12 h-12 min-h-[48px] rounded-xl flex items-center justify-center shrink-0 transition-transform cursor-pointer shadow-xs ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-bounce scale-105'
                  : 'bg-amber-400 hover:bg-amber-500 text-stone-950 hover:scale-105'
              }`}
              title={isListening ? 'Stop listening' : 'Start speaking'}
            >
              {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-stone-950" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
              placeholder="Or type your farming question here..."
              className="flex-1 min-h-[48px] bg-white border border-[#d2ddd0] rounded-xl px-4 py-2.5 text-[#1c261b] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e3a24] focus:border-[#1e3a24] font-medium placeholder:text-[#556953]/60 shadow-xs"
            />

            {/* Send button - Primary #1e3a24 */}
            <button
              type="submit"
              disabled={!speechText.trim() || isLoading}
              className="w-12 h-12 min-h-[48px] rounded-xl bg-[#1e3a24] hover:bg-[#24452b] disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

          <p className="text-[11px] text-[#556953] text-center font-medium">
            Tap microphone to speak or type your question. AgriScan Assistant provides instant farming advice.
          </p>
        </div>
      </div>
    </div>
  );
};
