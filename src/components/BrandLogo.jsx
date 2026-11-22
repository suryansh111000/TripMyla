import React from "react";
import { Compass } from "lucide-react";

export default function BrandLogo({ brand, variant = "light", className = "" }) {
  const isDarkBg = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp Vector Emblem */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 ${
          isDarkBg
            ? "bg-amber-400 text-slate-950"
            : "bg-[#18125A] text-amber-400"
        }`}
      >
        <Compass className="w-5 h-5 stroke-[2.25]" />
      </div>

      {/* Sharp Brand Wordmark */}
      <div className="leading-none">
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-baseline">
          <span className={isDarkBg ? "text-white" : "text-[#18125A]"}>Trip</span>
          <span className="text-[#D4A017]">Myla</span>
        </div>
        <p
          className={`mt-1 text-[10px] font-semibold tracking-[0.14em] uppercase ${
            isDarkBg ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {brand?.tagline || "make your life adventurous"}
        </p>
      </div>
    </div>
  );
}