import React, { useState } from 'react';
import { ScanSubmission, TriageStatus, SeverityLevel } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  UserCheck,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface TriageDrawerProps {
  scan: ScanSubmission;
  onClose: () => void;
}

export const TriageDrawer: React.FC<TriageDrawerProps> = ({ scan, onClose }) => {
  const { updateSubmission, diseaseProfiles } = useApp();

  const [status, setStatus] = useState<TriageStatus>(scan.status);
  const [severity, setSeverity] = useState<SeverityLevel>(scan.diagnosis.severity);
  const [notes, setNotes] = useState(scan.agronomistNotes || '');
  const [reclassified, setReclassified] = useState(scan.reclassifiedDisease || '');
  const [agronomistName, setAgronomistName] = useState(
    scan.verifiedBy || 'Dr. Evelyn Vance, Sr. Agronomist'
  );

  const handleSave = () => {
    updateSubmission(scan.id, {
      status,
      agronomistNotes: notes,
      reclassifiedDisease: reclassified.trim() || undefined,
      verifiedBy: agronomistName
    });
    onClose();
  };

  const getSeverityBadgeClass = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'text-[#C62828] bg-[#FFEBEE] border-[#FFCDD2]';
      case 'Severe':
        return 'text-[#E65100] bg-[#FFF3E0] border-[#FFE0B2]';
      case 'Moderate':
        return 'text-[#E65100] bg-[#FFF3E0] border-[#FFE0B2]';
      case 'Low':
        return 'text-[#388E3C] bg-[#E8F5E9] border-[#C8E6C9]';
      default:
        return 'text-[#388E3C] bg-[#E8F5E9] border-[#C8E6C9]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-[#d2ddd0] overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#d2ddd0] flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#556953] font-mono">
              <span className="font-bold text-[#1c261b]">{scan.id}</span>
              <span aria-hidden="true">·</span>
              <span>{scan.timestamp}</span>
              <span aria-hidden="true">·</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getSeverityBadgeClass(severity)}`}>
                {severity}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#1c261b] mt-1">
              Agronomy Triage & Verification
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#556953] hover:text-[#1c261b] hover:bg-[#f7f9f6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Side by side image & farm context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-[#d2ddd0] aspect-4/3 bg-stone-900">
              <img
                src={scan.imageUrl}
                alt={`Scan ${scan.id}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-[#f7f9f6] rounded-2xl border border-[#d2ddd0] text-xs space-y-2.5">
              <h4 className="font-bold text-[#1c261b] text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Field Origin Details</span>
              </h4>
              <div>
                <span className="text-[#556953]">Producer / Farm: </span>
                <span className="font-semibold text-[#1c261b]">{scan.farmerName}</span>
              </div>
              <div>
                <span className="text-[#556953]">Location: </span>
                <span className="font-semibold text-[#1c261b]">{scan.farmLocation}</span>
              </div>
              <div>
                <span className="text-[#556953]">Crop / Acreage: </span>
                <span className="font-semibold text-[#1c261b]">
                  {scan.crop} ({scan.plantPart}) · {scan.farmSizeAcres} Acres
                </span>
              </div>
              <div className="pt-2 border-t border-[#d2ddd0]">
                <span className="text-[#556953]">Prototype Inference: </span>
                <div className="font-bold text-[#1c261b] mt-0.5">
                  {scan.diagnosis.commonName}
                </div>
                <div className="text-[11px] text-[#556953] italic">
                  {scan.diagnosis.scientificName}
                </div>
                <div className="text-[11px] text-[#1e3a24] font-mono font-bold mt-1">
                  Model Confidence: {scan.diagnosis.confidence.toFixed(1)}% Match
                </div>
              </div>
            </div>
          </div>

          {/* Key Detected Indicators */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1c261b] uppercase tracking-wider">
              Computer Vision & Rule Indicators
            </label>
            <div className="flex flex-wrap gap-2">
              {scan.diagnosis.keyIndicators.map((ind, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 bg-[#f7f9f6] text-[#1c261b] rounded-lg border border-[#d2ddd0] flex items-center gap-1.5 font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{ind}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Agronomist Review Form */}
          <div className="p-5 bg-[#edf5ec]/50 rounded-2xl border border-[#cfe0cb] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-[#1c261b]">Expert Agronomist Assessment</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1c261b] mb-1">
                  Triage Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TriageStatus)}
                  className="w-full text-xs bg-white border border-[#d2ddd0] rounded-xl px-3 py-2.5 text-[#1c261b] font-semibold focus:ring-2 focus:ring-[#1e3a24]"
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Verified">Verified by Agronomist</option>
                  <option value="Reclassified">Reclassified (Pathogen Override)</option>
                  <option value="Resolved">Resolved / Treatment Applied</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c261b] mb-1">
                  Assessed Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                  className="w-full text-xs bg-white border border-[#d2ddd0] rounded-xl px-3 py-2.5 text-[#1c261b] font-semibold focus:ring-2 focus:ring-[#1e3a24]"
                >
                  <option value="Healthy">Healthy / Non-Pathogenic</option>
                  <option value="Low">Low - Monitored Only</option>
                  <option value="Moderate">Moderate - Cultural Spray</option>
                  <option value="Severe">Severe - High Yield Risk</option>
                  <option value="Critical">Critical - Urgent Quarantine</option>
                </select>
              </div>
            </div>

            {/* Pathogen Reclassification Option */}
            <div>
              <label className="block text-xs font-bold text-[#1c261b] mb-1">
                Diagnostic Override / Reclassification (if prototype prediction was inaccurate)
              </label>
              <input
                type="text"
                value={reclassified}
                onChange={(e) => setReclassified(e.target.value)}
                placeholder="Leave blank if confirmed, or enter corrected pathogen (e.g. Septoria Leaf Spot)"
                className="w-full text-xs bg-white border border-[#d2ddd0] rounded-xl px-3 py-2.5 text-[#1c261b] focus:ring-2 focus:ring-[#1e3a24] font-medium"
              />
              <span className="text-[11px] text-[#556953] mt-1 block">
                Reclassifications feed into future training datasets to calibrate model accuracy.
              </span>
            </div>

            {/* Expert Prescriptions and Notes */}
            <div>
              <label className="block text-xs font-bold text-[#1c261b] mb-1">
                Agronomist Clinical Notes & Prescription Instructions
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter tank mix recommendations, irrigation adjustments, or follow-up scouting instructions..."
                className="w-full text-xs bg-white border border-[#d2ddd0] rounded-xl p-3 text-[#1c261b] focus:ring-2 focus:ring-[#1e3a24] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1c261b] mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#556953]" />
                <span>Reviewing Agronomist Credential</span>
              </label>
              <input
                type="text"
                value={agronomistName}
                onChange={(e) => setAgronomistName(e.target.value)}
                className="w-full text-xs bg-white border border-[#d2ddd0] rounded-xl px-3 py-2.5 text-[#1c261b] font-semibold focus:ring-2 focus:ring-[#1e3a24]"
              />
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#d2ddd0] bg-[#f7f9f6] flex items-center justify-between sticky bottom-0 z-10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 min-h-[44px] border border-[#d2ddd0] text-[#1c261b] bg-white rounded-xl text-xs font-bold hover:bg-[#edf5ec] cursor-pointer transition-colors shadow-xs"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 min-h-[44px] bg-[#1e3a24] hover:bg-[#24452b] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Save & Update Triage Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
