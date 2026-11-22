import React from "react";
import {
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Gift,
  Calendar,
  Eye,
} from "lucide-react";

export default function PackageCard({
  pkg,
  whatsappNumber,
  onOpenInquiry,
  onViewDetails,
}) {
  const isQuoteOnly =
    pkg.priceMode === "quote" || !pkg.price || String(pkg.price).trim() === "";

  const quoteHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi TripMyla! Please share best rates & quote for "${pkg.title}".`
  )}`;

  const ratingDisplay = Number(pkg.rating || 4.8).toFixed(1);
  const reviewsDisplay = pkg.reviewCount ?? 120;

  return (
    <div className="group bg-[#F8FAFC] hover:bg-white rounded-3xl overflow-hidden border border-slate-200/70 hover:border-amber-200 shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Header */}
      <div className="p-3 pb-0">
        <div
          onClick={() => onViewDetails && onViewDetails(pkg)}
          className="relative h-60 rounded-2xl overflow-hidden cursor-pointer"
        >
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Top-Left: Duration + Peak Season Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 bg-[#18125A]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
              <Clock className="w-3 h-3 text-amber-400" />
              {pkg.nights ? `${pkg.nights} Nights` : pkg.duration}
            </span>
            {pkg.statusBadge && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-xs">
                {pkg.statusBadge}
              </span>
            )}
          </div>

          {/* Top-Right: Rating + Review Count Pill */}
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{ratingDisplay}</span>
            <span className="text-slate-500 font-medium">({reviewsDisplay})</span>
          </span>

          {/* Bottom-Left: Travel Month Window + Tour Type */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            {pkg.travelWindow && (
              <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-xs text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                <Calendar className="w-3 h-3" /> {pkg.travelWindow}
              </span>
            )}
            {pkg.tourType && (
              <span className="bg-white/90 text-[#18125A] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                {pkg.tourType}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* FREE Bonus Inclusion Highlight */}
          {pkg.freePerk && (
            <div className="mb-2.5 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg">
              <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="line-clamp-1">{pkg.freePerk}</span>
            </div>
          )}

          <h3
            onClick={() => onViewDetails && onViewDetails(pkg)}
            className="text-xl font-bold text-[#18125A] hover:text-amber-600 transition cursor-pointer"
          >
            {pkg.title}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{pkg.location}</span>
          </p>

          {/* Day-Code Route Chips (2D Munnar • 1D Alleppey...) */}
          {Array.isArray(pkg.routeChips) && pkg.routeChips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pkg.routeChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#18125A] border border-indigo-100"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Pricing Block: Strikethrough + Discounted /Adult OR "Contact for Best Rates" */}
          <div className="mt-4 pt-3 border-t border-slate-200/70">
            {isQuoteOnly ? (
              <div className="flex items-center justify-between gap-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2.5">
                <span className="text-xs font-extrabold text-[#18125A]">
                  Contact for best rates
                </span>
                <a
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-[#18125A] hover:bg-amber-400 hover:text-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition shrink-0"
                >
                  Get Quote
                </a>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    {pkg.originalPrice && (
                      <span className="text-xs line-through text-slate-400 font-semibold">
                        {pkg.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-[#18125A]">{pkg.price}</span>
                    <span className="text-[11px] font-semibold text-slate-500">/Adult</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {pkg.duration}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold text-amber-700">
                  {pkg.occupancyBasis || "Per-Person (on 2 Pax Basis)"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Clean 2-Button Action Row: View Details + Get Quote */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails && onViewDetails(pkg)}
            className="inline-flex items-center justify-center gap-1.5 border border-[#18125A] text-[#18125A] hover:bg-[#18125A] hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </button>

          <a
            href={quoteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#43B02A] hover:bg-[#389922] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}