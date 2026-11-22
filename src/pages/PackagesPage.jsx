import React, { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import PackageCard from "../components/PackageCard";

export default function PackagesPage({
  brand,
  categories,
  packages,
  selectedCategory,
  onSelectCategory,
  onOpenInquiry,
}) {
  const [filterByNights, setFilterByNights] = useState(false);
  const [maxNights, setMaxNights] = useState(7);

  const whatsappNumber = (brand?.whatsapp || brand?.phone || "9118002023644").replace(
    /\D/g,
    ""
  );

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!filterByNights) return true;
    const pkgNights = Number(pkg.nights || 4);
    return pkgNights <= maxNights;
  });

  return (
    <section className="py-16 bg-slate-50 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            Curated Journeys
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#18125A]">
            Tour Packages
          </h1>
          <p className="mt-3 text-slate-600 text-sm">
            Filter by destination category or slide trip duration from 1 to 30 nights.
          </p>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition ${
                selectedCategory === cat
                  ? "bg-[#18125A] text-amber-300 shadow"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Duration Slider Bar (1 to 30 Nights) */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-[#18125A] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#18125A]">Trip Duration Filter</span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {filterByNights ? `Up to ${maxNights} ${maxNights === 1 ? "Night" : "Nights"}` : "All Durations (1–30 Nights)"}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Slide between 1 and 30 nights for instant matching itineraries
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:w-1/2 justify-end">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>1 Night</span>
                <span>15 Nights</span>
                <span>30 Nights</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={maxNights}
                onChange={(e) => {
                  setFilterByNights(true);
                  setMaxNights(Number(e.target.value));
                }}
                aria-label="Duration in nights from 1 to 30"
                className="w-full accent-[#18125A] cursor-pointer"
              />
            </div>

            {filterByNights && (
              <button
                type="button"
                onClick={() => setFilterByNights(false)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#18125A] px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Show All
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="mt-12 text-center bg-white rounded-3xl p-10 border border-slate-200">
            <p className="text-base font-bold text-[#18125A]">
              No packages found for up to {maxNights} nights in "{selectedCategory}".
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterByNights(false);
                onSelectCategory("All");
              }}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#18125A] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                whatsappNumber={whatsappNumber}
                onOpenInquiry={onOpenInquiry}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}