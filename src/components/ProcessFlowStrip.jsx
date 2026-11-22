import React, { useState } from "react";
import {
  Compass,
  SlidersHorizontal,
  FileText,
  Sparkles,
  CheckCircle2,
  PlaneTakeoff,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Choose",
    subtitle: "Destination & vibe",
    detail: "Browse curated domestic & international escapes or start from scratch.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Customise",
    subtitle: "Pace & stays",
    detail: "Tailor hotels, transfers, and trip intensity to match your travel style.",
    icon: SlidersHorizontal,
  },
  {
    num: "03",
    title: "Get Quote",
    subtitle: "Clear pricing",
    detail: "Receive an itemized quote with zero hidden charges within minutes.",
    icon: FileText,
  },
  {
    num: "04",
    title: "Refine",
    subtitle: "Expert tweaks",
    detail: "Fine-tune inclusions, flight timings, or special honeymoon perks.",
    icon: Sparkles,
  },
  {
    num: "05",
    title: "Book",
    subtitle: "Easy token lock",
    detail: "Lock your dates & visas smoothly with dedicated concierge support.",
    icon: CheckCircle2,
  },
  {
    num: "06",
    title: "Travel",
    subtitle: "24/7 trip support",
    detail: "Fly stress-free with live WhatsApp trip coordination throughout.",
    icon: PlaneTakeoff,
  },
];

export default function ProcessFlowStrip() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full py-16 bg-slate-50 border-y border-slate-200/80 overflow-x-clip">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-600">
            How TripMyla Works
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-[#18125A] leading-tight">
            From Dream to Boarding Pass in{" "}
            <span className="text-[#D4A017]">6 Simple Steps</span>
          </h2>
        </div>

        {/* Full-Width 6-Card Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`min-w-0 w-full h-full flex flex-col justify-between text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-[#18125A] text-white border-[#18125A] shadow-xl -translate-y-1"
                    : "bg-white text-slate-800 border-slate-200 hover:border-amber-300 shadow-2xs"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-mono font-extrabold ${
                        isActive ? "text-amber-400" : "text-slate-400"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-amber-400 text-slate-950"
                          : "bg-amber-500/15 text-[#18125A]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold tracking-tight break-words">
                    {step.title}
                  </h3>
                </div>

                <p
                  className={`mt-1.5 text-xs leading-snug break-words ${
                    isActive ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detail Bar */}
        <div className="mt-6 bg-white border border-amber-200/80 rounded-2xl px-6 py-3.5 text-center text-xs sm:text-sm text-slate-700 shadow-2xs">
          <span className="font-extrabold text-[#18125A]">
            Step {STEPS[activeIdx].num} ({STEPS[activeIdx].title}):
          </span>{" "}
          {STEPS[activeIdx].detail}
        </div>
      </div>
    </section>
  );
}