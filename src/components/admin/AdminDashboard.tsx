import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ScanSubmission, TriageStatus, SeverityLevel } from '../../types';
import { TriageDrawer } from './TriageDrawer';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Plus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    submissions,
    selectedScanId,
    setSelectedScanId,
    exportSubmissionsCSV,
    exportSubmissionsJSON,
    setActiveView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [cropFilter, setCropFilter] = useState<string>('All');

  // KPI Calculations
  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter((s) => s.status === 'Pending Review').length;
    const verified = submissions.filter((s) => s.status === 'Verified' || s.status === 'Resolved').length;
    const critical = submissions.filter((s) => s.diagnosis.severity === 'Critical' || s.diagnosis.severity === 'Severe').length;

    // Top crop calculation
    const cropCounts: Record<string, number> = {};
    submissions.forEach((s) => {
      cropCounts[s.crop] = (cropCounts[s.crop] || 0) + 1;
    });
    const topCrop = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Tomato';

    return { total, pending, verified, critical, topCrop };
  }, [submissions]);

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.farmLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.diagnosis.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.diagnosis.scientificName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
      const matchesSeverity = severityFilter === 'All' || sub.diagnosis.severity === severityFilter;
      const matchesCrop = cropFilter === 'All' || sub.crop === cropFilter;

      return matchesSearch && matchesStatus && matchesSeverity && matchesCrop;
    });
  }, [submissions, searchQuery, statusFilter, severityFilter, cropFilter]);

  const activeScan = useMemo(() => {
    return submissions.find((s) => s.id === selectedScanId) || null;
  }, [submissions, selectedScanId]);

  const getStatusBadge = (status: TriageStatus) => {
    switch (status) {
      case 'Pending Review':
        return (
          <span className="text-amber-800 bg-[#fffcee] border border-[#f5e3ad] px-2.5 py-1 rounded-md text-xs font-bold">
            Pending Review
          </span>
        );
      case 'Verified':
        return (
          <span className="text-emerald-800 bg-[#edf5ec] border border-[#cfe0cb] px-2.5 py-1 rounded-md text-xs font-bold">
            Verified
          </span>
        );
      case 'Reclassified':
        return (
          <span className="text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-md text-xs font-bold">
            Reclassified
          </span>
        );
      case 'Resolved':
        return (
          <span className="text-emerald-900 bg-[#edf5ec] border border-[#cfe0cb] px-2.5 py-1 rounded-md text-xs font-bold">
            Resolved
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'Critical':
        return (
          <span className="text-red-800 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md text-xs font-bold">
            Critical
          </span>
        );
      case 'Severe':
        return (
          <span className="text-amber-800 bg-[#fffcee] border border-[#f5e3ad] px-2.5 py-1 rounded-md text-xs font-bold">
            Severe
          </span>
        );
      case 'Moderate':
        return (
          <span className="text-amber-800 bg-[#fffcee] border border-[#f5e3ad] px-2.5 py-1 rounded-md text-xs font-bold">
            Moderate
          </span>
        );
      default:
        return (
          <span className="text-emerald-800 bg-[#edf5ec] border border-[#cfe0cb] px-2.5 py-1 rounded-md text-xs font-bold">
            {sev}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#d2ddd0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <span>Operations Console</span>
            <span aria-hidden="true">·</span>
            <span>Pathology Triage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c261b]">
            Internal Agronomy Triage & Verification
          </h1>
          <p className="mt-1 text-sm text-[#556953] max-w-2xl">
            Review incoming field scans, validate machine diagnostic outputs, calibrate computer-vision predictions, and issue verified treatment prescriptions to growers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('farmer')}
            className="px-4 py-2.5 min-h-[48px] text-xs font-bold rounded-xl border border-[#d2ddd0] text-[#1c261b] bg-white hover:bg-[#edf5ec] hover:border-[#1e3a24] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#1e3a24]" />
            <span>Simulate Farmer Scan</span>
          </button>

          <button
            onClick={exportSubmissionsCSV}
            className="px-4 py-2.5 min-h-[48px] text-xs font-bold rounded-xl bg-[#1e3a24] hover:bg-[#24452b] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-1">
          <div className="text-xs font-bold text-[#556953] uppercase tracking-wider">Total Scans</div>
          <div className="text-2xl font-black text-[#1c261b] font-mono tabular-nums">
            {stats.total}
          </div>
          <div className="text-[11px] text-[#556953]">Live submissions logged</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-1">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending Review</span>
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono tabular-nums">
            {stats.pending}
          </div>
          <div className="text-[11px] text-[#556953]">Awaiting agronomist sign-off</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified / Cleared</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
            {stats.verified}
          </div>
          <div className="text-[11px] text-[#556953]">Expert treatment verified</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-1">
          <div className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
            <span>High Severity</span>
          </div>
          <div className="text-2xl font-black text-red-700 font-mono tabular-nums">
            {stats.critical}
          </div>
          <div className="text-[11px] text-[#556953]">Critical & severe pressure</div>
        </div>

        <div className="col-span-2 md:col-span-1 p-4 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-1">
          <div className="text-xs font-bold text-[#556953] uppercase tracking-wider">Top Incident Crop</div>
          <div className="text-2xl font-black text-[#1c261b] truncate">
            {stats.topCrop}
          </div>
          <div className="text-[11px] text-[#556953]">Highest active caseload</div>
        </div>
      </div>

      {/* Regional Outbreak Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-white rounded-2xl border border-[#d2ddd0] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1c261b]">Regional Disease Hotspots</h3>
            <span className="text-xs text-[#556953]">Aggregated from active field telemetry</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { region: 'Salinas Valley, California', crop: 'Tomato & Leafy Greens', pathogen: 'Alternaria solani', rate: 78, level: 'High Risk' },
              { region: 'Ludhiana Basin, Punjab', crop: 'Rice (Paddy)', pathogen: 'Magnaporthe oryzae', rate: 64, level: 'Elevated' },
              { region: 'Lower Saxony, Germany', crop: 'Potato', pathogen: 'Phytophthora infestans', rate: 92, level: 'Critical' },
              { region: 'Champaign County, Illinois', crop: 'Corn (Maize)', pathogen: 'Exserohilum turcicum', rate: 45, level: 'Moderate' }
            ].map((hotspot, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1c261b]">{hotspot.region}</span>
                  <span className="text-[#556953]">
                    {hotspot.crop} · <span className="italic">{hotspot.pathogen}</span>
                  </span>
                </div>
                <div className="w-full bg-[#f7f9f6] h-2 rounded-full overflow-hidden border border-[#d2ddd0]">
                  <div
                    className={`h-full rounded-full ${
                      hotspot.rate > 80 ? 'bg-red-600' : hotspot.rate > 60 ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${hotspot.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Calibration Box */}
        <div className="p-5 bg-[#1e3a24] text-stone-100 rounded-2xl shadow-xs space-y-3 border border-emerald-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Model Calibration Hub</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-300">Offline Rules</span>
          </div>

          <p className="text-xs text-stone-200 leading-relaxed">
            In this prototype, expert validations directly record ground-truth overrides. When the production computer-vision pipeline is integrated, these curated instances train transfer-learning checkpoints.
          </p>

          <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-stone-200">
              <span>Ground-Truth Verification Rate:</span>
              <span className="font-mono text-white font-semibold">91.4%</span>
            </div>
            <div className="flex justify-between text-stone-200">
              <span>Pending Human-in-the-Loop Triage:</span>
              <span className="font-mono text-amber-300 font-semibold">{stats.pending} samples</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={exportSubmissionsJSON}
              className="w-full py-2.5 min-h-[44px] bg-amber-400 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-stone-950" />
              <span>Export Labeled JSON Dataset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Triage Queue Table */}
      <div className="bg-white rounded-2xl border border-[#d2ddd0] shadow-xs overflow-hidden space-y-4">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#d2ddd0] space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#556953] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scan ID, farmer, location, crop, or pathogen..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7f9f6] border border-[#d2ddd0] rounded-xl text-[#1c261b] focus:outline-hidden focus:ring-2 focus:ring-[#1e3a24] focus:bg-white transition-all min-h-[40px] font-medium"
              />
            </div>

            {/* Quick Segmented Status Tabs */}
            <div className="flex items-center gap-1 bg-[#f7f9f6] p-1 rounded-xl text-xs font-bold overflow-x-auto border border-[#d2ddd0]">
              {['All', 'Pending Review', 'Verified', 'Reclassified', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-[#1e3a24] text-white shadow-xs'
                      : 'text-[#556953] hover:text-[#1c261b]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Crop & Severity Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#556953] font-bold">Filter Crop:</span>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="bg-white border border-[#d2ddd0] rounded-lg px-2.5 py-1 text-[#1c261b] text-xs focus:ring-1 focus:ring-[#1e3a24] font-medium"
              >
                <option value="All">All Crops</option>
                <option value="Tomato">Tomato</option>
                <option value="Rice">Rice</option>
                <option value="Potato">Potato</option>
                <option value="Corn">Corn</option>
                <option value="Wheat">Wheat</option>
                <option value="Soybean">Soybean</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#556953] font-bold">Severity:</span>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-white border border-[#d2ddd0] rounded-lg px-2.5 py-1 text-[#1c261b] text-xs focus:ring-1 focus:ring-[#1e3a24] font-medium"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="Severe">Severe</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
                <option value="Healthy">Healthy</option>
              </select>
            </div>

            {(searchQuery || statusFilter !== 'All' || severityFilter !== 'All' || cropFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  setSeverityFilter('All');
                  setCropFilter('All');
                }}
                className="text-[#1e3a24] hover:underline font-bold text-xs cursor-pointer ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Scan / Image</th>
                <th className="py-3 px-4">Logged</th>
                <th className="py-3 px-4">Producer & Basin</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Pathogen Diagnosis</th>
                <th className="py-3 px-4 text-right">Confidence</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Triage Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    onClick={() => setSelectedScanId(sub.id)}
                    className="hover:bg-stone-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                          <img
                            src={sub.imageUrl}
                            alt={sub.id}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-mono font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                            {sub.id}
                          </div>
                          {sub.isDemoRecord && (
                            <span className="text-[10px] text-stone-400">Demo preset</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-stone-500 font-mono tabular-nums whitespace-nowrap">
                      {sub.timestamp}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">{sub.farmerName}</div>
                      <div className="text-stone-500 text-[11px] truncate max-w-[160px]">
                        {sub.farmLocation}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-stone-900">{sub.crop}</span>
                      <span className="text-stone-400 text-[11px] block">{sub.plantPart}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">
                        {sub.reclassifiedDisease || sub.diagnosis.commonName}
                      </div>
                      <div className="text-[11px] text-stone-500 italic">
                        {sub.diagnosis.scientificName}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-stone-800">
                      {sub.diagnosis.confidence.toFixed(1)}%
                    </td>

                    <td className="py-3 px-4">
                      {getSeverityBadge(sub.diagnosis.severity)}
                    </td>

                    <td className="py-3 px-4">
                      {getStatusBadge(sub.status)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedScanId(sub.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#f7f9f6] hover:bg-[#edf5ec] hover:border-[#1e3a24] border border-[#d2ddd0] text-[#1c261b] hover:text-[#1e3a24] font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-xs"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#556953]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-stone-500 space-y-2">
                    <p className="text-sm font-semibold text-stone-700">No field scans match current filters</p>
                    <p className="text-xs">Adjust query parameters or simulate a new scan in the Farmer Field app.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Triage Detail Drawer */}
      {activeScan && (
        <TriageDrawer scan={activeScan} onClose={() => setSelectedScanId(null)} />
      )}
    </div>
  );
};
