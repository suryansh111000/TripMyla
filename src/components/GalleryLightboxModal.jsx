import React, { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function GalleryLightboxModal({
  images = [],
  initialIndex = null,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (initialIndex !== null && initialIndex !== undefined) {
      setCurrentIndex(initialIndex);
      setIsClosing(false);
    }
  }, [initialIndex]);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [onClose]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (initialIndex === null || initialIndex === undefined) return;
    const handleKey = (e) => {
      if (e.key === "Escape") triggerClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [initialIndex, triggerClose, goPrev, goNext]);

  if (initialIndex === null || initialIndex === undefined || !images.length) {
    return null;
  }

  const activeItem = images[currentIndex] || images[0];

  return (
    <div
      onClick={triggerClose}
      style={{
        animation: isClosing
          ? "tmGalFadeOut 0.22s ease-in forwards"
          : "tmGalFadeIn 0.22s ease-out forwards",
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <style>{`
        @keyframes tmGalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tmGalFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes tmGalZoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tmGalZoomOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(12px); }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "tmGalZoomOut 0.22s ease-in forwards"
            : "tmGalZoomIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
        className="max-w-4xl w-full bg-[#110E36] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white"
      >
        {/* Top Bar */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
            <MapPin className="w-4 h-4" />
            <span>{activeItem.caption || "TripMyla Travel Moments"}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={triggerClose}
              aria-label="Close gallery"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative bg-black flex items-center justify-center h-[52vh] sm:h-[60vh]">
          <img
            src={activeItem.image}
            alt={activeItem.caption}
            className="max-h-full max-w-full object-contain transition-all duration-300"
          />

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 sm:left-5 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/15 flex items-center justify-center transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 sm:right-5 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/15 flex items-center justify-center transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Thumbnails Strip */}
        <div className="p-3.5 bg-black/40 border-t border-white/10 flex items-center gap-2.5 overflow-x-auto">
          {images.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                idx === currentIndex
                  ? "border-amber-400 scale-105 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}