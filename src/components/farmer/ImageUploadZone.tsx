import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, Camera, RefreshCw, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ImageUploadZoneProps {
  imagePreview: string | null;
  onImageSelected: (dataUrl: string, fileInfo?: { name: string; size: string }) => void;
  isAnalyzing: boolean;
  onRunDiagnosis: () => void;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  imagePreview,
  onImageSelected,
  isAnalyzing,
  onRunDiagnosis
}) => {
  const { t, language } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onImageSelected(result, {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera device API is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
        setIsCameraActive(true);
      }
    } catch {
      setCameraError('Allow camera access or use Upload File instead');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onImageSelected(dataUrl, { name: 'field_camera_capture.jpg', size: '280 KB' });
    }
    stopCamera();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#d2ddd0] p-5 shadow-sm space-y-4">
      {/* Header with Camera and Upload buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#edf6ec] border border-[#cfe0cb] text-[#1e3a24] text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <h3 className="text-base font-bold text-[#1c261b]">{t.step2Title}</h3>
          </div>
          <p className="text-xs text-[#556953] font-medium mt-0.5">{t.step2Desc}</p>
        </div>

        <div className="flex items-center gap-2">
          {!isCameraActive ? (
            <button
              type="button"
              onClick={startCamera}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#edf6ec] hover:bg-[#dbebd9] border border-[#cfe0cb] text-[#1e3a24] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <Camera className="w-4 h-4 text-[#1e3a24]" />
              <span>{t.takePhoto}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopCamera}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-98"
            >
              {t.cancelCamera}
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white hover:bg-[#f7f9f6] border border-[#d2ddd0] hover:border-[#1e3a24] text-[#1c261b] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Upload className="w-4 h-4 text-[#556953]" />
            <span>{t.browsePhoto}</span>
          </button>

          <input
            id="plant-image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {cameraError && (
        <div className="p-3.5 text-xs bg-[#fffcee] border border-[#f5e3ad] text-[#3a280c] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">!</span>
            <span>
              <strong>Allow camera access or use Upload File instead</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCameraError(null);
              fileInputRef.current?.click();
            }}
            className="px-4 py-2 bg-[#1e3a24] hover:bg-[#24452b] text-white rounded-xl font-bold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            {t.browsePhoto}
          </button>
        </div>
      )}

      {/* Camera Live Stream View */}
      {isCameraActive && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 max-h-[380px] flex items-center justify-center border-2 border-[#1e3a24] shadow-inner">
          <video ref={videoRef} playsInline autoPlay muted className="w-full h-full object-cover" />
          <div className="absolute inset-0 border-2 border-dashed border-emerald-400 m-8 rounded-xl pointer-events-none flex items-center justify-center">
            <span className="text-xs font-medium text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
              {t.alignLeafNotice}
            </span>
          </div>
          <div className="absolute bottom-5 left-0 right-0 flex justify-center">
            <button
              onClick={capturePhoto}
              className="min-h-[48px] px-7 py-3 bg-[#1e3a24] hover:bg-[#24452b] text-white font-bold rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <Camera className="w-5 h-5 text-white" />
              <span>{t.capturePhoto}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Upload / Preview Area */}
      {!isCameraActive && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[280px] ${
            isDragOver
              ? 'border-emerald-600 bg-[#edf6ec]'
              : imagePreview
              ? 'border-[#cfe0cb] bg-[#142014] shadow-inner'
              : 'border-[#d2ddd0] hover:border-[#1e3a24] bg-[#f7f9f6]'
          }`}
        >
          {imagePreview ? (
            <div className="relative w-full h-[260px] sm:h-[320px] flex items-center justify-center bg-stone-900 group">
              <img
                src={imagePreview}
                alt="Selected crop sample"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              {/* Top change photo button */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-black/70 hover:bg-black text-white text-xs font-bold rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-md border border-white/20 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.changePhoto}</span>
                </button>
              </div>

              {/* Bottom ready indicator */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-2 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.readyToScan}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="py-12 px-6 text-center cursor-pointer space-y-3 w-full"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#edf6ec] border border-[#cfe0cb] text-[#1e3a24] flex items-center justify-center shadow-xs">
                <ImageIcon className="w-8 h-8 text-[#1e3a24]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-[#1c261b]">
                  {t.dragDropNotice}
                </p>
                <p className="text-xs text-[#556953] font-medium max-w-sm mx-auto">
                  {t.uploadDesc}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Big Action Check Button */}
      {imagePreview && !isCameraActive && (
        <div className="pt-1">
          <button
            onClick={onRunDiagnosis}
            disabled={isAnalyzing}
            className="w-full min-h-[50px] py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-stone-950" />
                <span>{t.checkingDisease}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-stone-950" />
                <span>{t.checkDiseaseBtn}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
