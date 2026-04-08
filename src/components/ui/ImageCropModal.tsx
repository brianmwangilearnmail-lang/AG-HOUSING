import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, Sun, Contrast, ZoomIn, RotateCcw } from 'lucide-react';

interface ImageCropModalProps {
  src: string;
  onComplete: (croppedBase64: string) => void;
  onCancel: () => void;
}

const ASPECT_OPTIONS = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:4', value: 3 / 4 },
];

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropModal({ src, onComplete, onCancel }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [scale, setScale] = useState(1);
  const [applying, setApplying] = useState(false);

  // Set initial crop on image load
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const initialCrop = aspect
      ? centerAspectCrop(naturalWidth, naturalHeight, aspect)
      : centerCrop({ unit: '%', width: 90, height: 90 }, naturalWidth, naturalHeight);
    setCrop(initialCrop);
  }, [aspect]);

  // Re-center crop when aspect changes
  useEffect(() => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    if (aspect) {
      setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspect));
    } else {
      setCrop(centerCrop({ unit: '%', width: 90, height: 90 }, naturalWidth, naturalHeight));
    }
  }, [aspect]);

  const handleApply = useCallback(async () => {
    const image = imgRef.current;
    if (!image || !completedCrop) return;
    setApplying(true);

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.round(completedCrop.width * scaleX);
    canvas.height = Math.round(completedCrop.height * scaleY);

    const ctx = canvas.getContext('2d')!;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Compress output
    const base64 = canvas.toDataURL('image/jpeg', 0.82);
    onComplete(base64);
    setApplying(false);
  }, [completedCrop, brightness, contrast, onComplete]);

  // Apply without crop (just adjustments)
  const handleApplyFull = useCallback(async () => {
    const image = imgRef.current;
    if (!image) return;
    setApplying(true);

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.drawImage(image, 0, 0);

    const base64 = canvas.toDataURL('image/jpeg', 0.82);
    onComplete(base64);
    setApplying(false);
  }, [brightness, contrast, onComplete]);

  const resetAdjustments = () => {
    setBrightness(100);
    setContrast(100);
    setScale(1);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Crop & Adjust Image</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 overflow-auto bg-gray-950 flex items-center justify-center p-4 min-h-0">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            keepSelection
          >
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              onLoad={onImageLoad}
              style={{
                transform: `scale(${scale})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                maxHeight: '50vh',
                maxWidth: '100%',
                display: 'block',
                transformOrigin: 'center',
              }}
            />
          </ReactCrop>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 space-y-4 border-t border-gray-100">

          {/* Aspect Ratio */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-16 shrink-0">Ratio</span>
            <div className="flex gap-2 flex-wrap">
              {ASPECT_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setAspect(opt.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors border ${
                    aspect === opt.value
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Brightness */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <Sun size={13} /> Brightness
                </label>
                <span className="text-xs text-gray-400">{brightness}%</span>
              </div>
              <input
                type="range" min={50} max={150} value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-gray-900 cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <Contrast size={13} /> Contrast
                </label>
                <span className="text-xs text-gray-400">{contrast}%</span>
              </div>
              <input
                type="range" min={50} max={150} value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-1.5 rounded-full accent-gray-900 cursor-pointer"
              />
            </div>

            {/* Zoom */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <ZoomIn size={13} /> Zoom
                </label>
                <span className="text-xs text-gray-400">{scale.toFixed(1)}×</span>
              </div>
              <input
                type="range" min={10} max={30} value={Math.round(scale * 10)}
                onChange={(e) => setScale(Number(e.target.value) / 10)}
                className="w-full h-1.5 rounded-full accent-gray-900 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 gap-3">
          <button
            onClick={resetAdjustments}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw size={14} /> Reset adjustments
          </button>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={completedCrop?.width && completedCrop?.height ? handleApply : handleApplyFull}
              disabled={applying}
              className="px-6 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              <Check size={16} />
              {applying ? 'Applying…' : 'Apply'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
