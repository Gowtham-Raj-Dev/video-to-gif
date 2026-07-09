"use client";

import { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { CloseIcon, CheckIcon, MaximizeIcon, MinimizeIcon } from "@/components/Icons";

interface CropPopupProps {
  file: File;
  defaultRatio: string;
  onSave: (crop: { x: number; y: number; w: number; h: number }, ratio: string) => void;
  onClose: () => void;
}

export function CropPopup({ file, defaultRatio, onSave, onClose }: CropPopupProps) {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [ratioStr, setRatioStr] = useState(defaultRatio);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);

  const isVideo = file.type.startsWith("video/");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (ratioStr === "0:0") {
      if (naturalSize) {
        setAspect(naturalSize.w / naturalSize.h);
      }
    } else {
      const [w, h] = ratioStr.split(":").map(Number);
      if (w && h) {
        setAspect(w / h);
      }
    }
  }, [ratioStr, naturalSize]);

  const onCropComplete = useCallback((_area: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const onMediaLoaded = useCallback((mediaSize: any) => {
    setNaturalSize({ w: mediaSize.naturalWidth, h: mediaSize.naturalHeight });
  }, []);

  const handleSave = () => {
    if (croppedAreaPixels) {
      onSave(
        {
          x: Math.round(croppedAreaPixels.x),
          y: Math.round(croppedAreaPixels.y),
          w: Math.round(croppedAreaPixels.width),
          h: Math.round(croppedAreaPixels.height),
        },
        ratioStr
      );
    } else {
      onSave({ x: 0, y: 0, w: 0, h: 0 }, ratioStr);
    }
    onClose();
  };

  const ratios = [
    { label: "1:1", value: "1:1" },
    { label: "9:16", value: "9:16" },
    { label: "4:5", value: "4:5" },
    { label: "16:9", value: "16:9" },
    { label: "Free", value: "0:0" }
  ];

  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md transition-all ${isExpanded ? "p-0" : "p-4"}`}
      style={{ backgroundColor: "rgb(var(--accent) / 0.1)" }}
    >
      <div className={`flex flex-col overflow-hidden bg-[color:var(--card)] transition-all ${isExpanded ? "h-full w-full rounded-none border-0" : "h-full max-h-[90%] w-full max-w-4xl rounded-xl border border-[color:var(--border)] shadow-card"}`}>
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
          <h3 className="text-sm font-semibold">Interactive Crop</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black p-4 overflow-hidden">
          {mediaUrl && (
            isVideo ? (
              <Cropper
                video={mediaUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onMediaLoaded={onMediaLoaded}
              />
            ) : (
              <Cropper
                image={mediaUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onMediaLoaded={onMediaLoaded}
              />
            )
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-[color:var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {ratios.map((r) => (
              <button
                key={r.value}
                onClick={() => setRatioStr(r.value)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  ratioStr === r.value
                    ? "border-accent bg-accent text-[color:var(--accent-fg)]"
                    : "border-[color:var(--border)] bg-[color:var(--bg-alt)] text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-label="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-24 accent-[color:var(--accent)]"
            />
            <button onClick={handleSave} className="btn-primary shrink-0">
              <CheckIcon className="mr-1.5 h-4 w-4" /> Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
