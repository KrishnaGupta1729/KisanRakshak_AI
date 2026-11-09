/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DemoBanner } from './components/DemoBanner';
import { FarmerView } from './components/farmer/FarmerView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './components/voice/VoiceAssistantModal';
import { SeedsDirectoryModal } from './components/seeds/SeedsDirectoryModal';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    toastMessage,
    isVoiceAssistantOpen,
    setIsVoiceAssistantOpen,
    isSeedsModalOpen,
    setIsSeedsModalOpen,
    setActiveCrop
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Banner and Navigation */}
      <DemoBanner />
      <Header />

      {/* Main Connected View Container */}
      <main className="flex-1">
        {activeView === 'farmer' ? <FarmerView /> : <AdminDashboard />}
      </main>

      {/* Interactive Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
      />

      {/* Comprehensive Certified Seeds Directory Modal */}
      <SeedsDirectoryModal
        isOpen={isSeedsModalOpen}
        onClose={() => setIsSeedsModalOpen(false)}
        onSelectCropForScan={(crop) => setActiveCrop(crop)}
      />

      {/* Persistent Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="bg-stone-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
