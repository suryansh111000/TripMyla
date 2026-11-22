import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  X,
  MapPin,
  Clock,
  MessageCircle,
  Film,
  Sparkles,
} from "lucide-react";

const CATEGORIES = ["All", "Domestic", "International", "Honeymoon"];

export default function VideosPage({ data, onOpenInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const videos = data?.videos || [];
  const whatsappNumber = data?.brand?.whatsappNumber || "9118002023644";

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter(
          (v) => v.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setActiveVideo(null);
    }, 220);
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    modalRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-lenis-prevent", "true");

    const handleKey = (e) => {
      if (e.key === "Escape") triggerClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.removeAttribute("data-lenis-prevent");
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeVideo, triggerClose]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-700 text-xs font-extrabold uppercase tracking-[0.2em]">
          <Film className="w-3.5 h-3.5" /> 30-Sec Travel Reels
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold text-[#18125A] tracking-tight">
          Experience Destinations <span className="text-[#D4A017]">Before You Fly</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
          Watch real 30-second glimpses of our curated stays, scenic drives, and
          unforgettable experiences. Click any reel to play in HD.
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? "bg-[#18125A] text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Video Cards Grid */}
      <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200/80 relative aspect-[9/14] flex flex-col justify-between"
            >
              {/* Poster Image (Lazy Loaded for Fast Page Speed) */}
              <img
                src={vid.poster}
                alt={vid.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

              {/* Top Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                  {vid.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> {vid.duration}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-amber-400 text-[#18125A] group-hover:text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Title & Location */}
              <div className="relative z-10 p-5 text-white">
                <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {vid.destination}
                </p>
                <h3 className="mt-1 text-base font-bold leading-snug">
                  {vid.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Lightbox Modal (Video loads ONLY when opened) */}
      {activeVideo && (
        <div
          onClick={triggerClose}
          data-lenis-prevent
          style={{
            animation: isClosing
              ? "tmVidFadeOut 0.22s ease-in forwards"
              : "tmVidFadeIn 0.22s ease-out forwards",
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <style>{`
            @keyframes tmVidFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes tmVidFadeOut { from { opacity: 1; } to { opacity: 0; } }
            @keyframes tmVidPopIn {
              from { opacity: 0; transform: scale(0.95) translateY(14px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes tmVidPopOut {
              from { opacity: 1; transform: scale(1) translateY(0); }
              to { opacity: 0; transform: scale(0.95) translateY(14px); }
            }
          `}</style>

          <div
            ref={modalRef}
            tabIndex={-1}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing
                ? "tmVidPopOut 0.22s ease-in forwards"
                : "tmVidPopIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
            className="max-w-3xl w-full bg-[#110E36] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white focus:outline-none"
          >
            {/* Modal Top Header */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {activeVideo.destination}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={triggerClose}
                aria-label="Close video"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* HTML5 Video Player */}
            <div className="bg-black flex items-center justify-center">
              <video
  key={activeVideo.id}
  src={activeVideo.videoUrl}
  poster={activeVideo.poster}
  controls
  autoPlay
  muted
  playsInline
  preload="auto"
  className="w-full max-h-[65vh] object-contain"
/>
            </div>

            {/* Modal Bottom Conversion Bar */}
            <div className="px-5 py-4 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-300">
                Loved this vibe? Customize this trip for your dates.
              </p>
              <div className="flex items-center gap-2.5">
                {onOpenInquiry && (
                  <button
                    type="button"
                    onClick={() => {
                      const pkgObj = { title: activeVideo.packageTitle || activeVideo.title };
                      triggerClose();
                      onOpenInquiry(pkgObj);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-white/25 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition"
                  >
                    Enquire Now
                  </button>
                )}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hi TripMyla! I watched the "${activeVideo.title}" video and want a custom quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition"
                >
                  <MessageCircle className="w-4 h-4" /> Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}