import React, { useEffect, useState, useCallback } from "react";
import {
  X,
  Calendar,
  Gift,
  Star,
  MapPin,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function PackageDetailModal({
  pkg,
  whatsappNumber,
  onClose,
  onOpenInquiry,
}) {

    const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [onClose]);
    useEffect(() => {
  if (!pkg) return;
  const handleKeyDown = (e) => {
    if (e.key === "Escape") triggerClose();
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [pkg, triggerClose]);
  if (!pkg) return null;

  const isQuoteOnly =
    pkg.priceMode === "quote" || !pkg.price || String(pkg.price).trim() === "";

  const quoteHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi TripMyla! I checked the itinerary for "${pkg.title}" (${pkg.duration}) and want the best quote.`
  )}`;

  return (
<div
  onClick={triggerClose}
  style={{
    animation: isClosing
      ? "tmBackdropOut 0.22s ease-in forwards"
      : "tmBackdropIn 0.22s ease-out forwards",
  }}
  className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
>
      <div
  onClick={(e) => e.stopPropagation()}
  style={{
    animation: isClosing
      ? "tmModalOut 0.22s cubic-bezier(0.4, 0, 1, 1) forwards"
      : "tmModalPop 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards",
  }}
  className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative"
>
    <style>{`

    @keyframes tmBackdropOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes tmModalOut {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(16px) scale(0.96);
    }
  }

  @keyframes tmBackdropIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes tmModalPop {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`}</style>
        {/* Top Banner Image */}
        <div className="relative h-56 sm:h-64">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
  type="button"
  onClick={triggerClose}
  aria-label="Close details"
  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition"
>
  <X className="w-5 h-5" />
</button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {pkg.tourType && (
                <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {pkg.tourType}
                </span>
              )}
              {pkg.travelWindow && (
                <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {pkg.travelWindow}
                </span>
              )}
              <span className="bg-white/95 text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {Number(pkg.rating || 4.8).toFixed(1)} ({pkg.reviewCount ?? 120})
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{pkg.title}</h2>
            <p className="mt-1 text-xs text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> {pkg.location} • {pkg.duration}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Free Perk Ribbon */}
          {pkg.freePerk && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs font-bold">
              <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{pkg.freePerk}</span>
            </div>
          )}

          {/* Day-Code Route Chips */}
          {Array.isArray(pkg.routeChips) && pkg.routeChips.length > 0 && (
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Route Sequence
              </h4>
              <div className="flex flex-wrap gap-2">
                {pkg.routeChips.map((chip, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-[#18125A] text-xs font-bold border border-indigo-100"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Day-Wise Structured Breakdown */}
          {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && (
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                Day-Wise Itinerary Breakdown
              </h4>
              <div className="space-y-3 border-l-2 border-amber-400 pl-4 ml-1">
                {pkg.itinerary.map((step, i) => (
                  <div key={i} className="relative">
                    <span className="inline-block text-[11px] font-extrabold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {step.day}
                    </span>
                    <p className="mt-1 text-sm font-bold text-[#18125A]">{step.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              {pkg.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sticky Bottom Price & Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {isQuoteOnly ? (
                <div>
                  <span className="text-base font-extrabold text-[#18125A]">
                    Contact for best rates
                  </span>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Tailor-made pricing
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-2">
                    {pkg.originalPrice && (
                      <span className="text-xs line-through text-slate-400 font-semibold">
                        {pkg.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-[#18125A]">{pkg.price}</span>
                    <span className="text-xs font-semibold text-slate-500">/Adult</span>
                  </div>
                  <p className="text-[11px] font-semibold text-amber-700">
                    {pkg.occupancyBasis || "Per-Person (on 2 Pax Basis)"}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInquiry(pkg);
                }}
                className="px-4 py-3 rounded-xl border border-[#18125A] text-[#18125A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition"
              >
                Enquiry Form
              </button>
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#43B02A] hover:bg-[#389922] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow transition"
              >
                <MessageCircle className="w-4 h-4" /> Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}