import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Sun,
  Compass,
  Zap,
} from "lucide-react";

const DESTINATIONS = [
  "Kerala & Munnar",
  "Singapore & Sentosa",
  "Vietnam (Hanoi & Da Nang)",
  "Maldives Luxury",
  "Himachal & Manali",
  "Kashmir Valley",
  "Bali & Nusa Penida",
  "Custom / Other",
];

const PACE_OPTIONS = [
  {
    id: "Laid Back",
    label: "Laid Back",
    desc: "Slow mornings, resort leisure & minimal transit",
    icon: Sun,
  },
  {
    id: "Moderate",
    label: "Moderate",
    desc: "Balanced sightseeing + free evening time",
    icon: Compass,
  },
  {
    id: "Packed",
    label: "Packed",
    desc: "Cover maximum landmarks & adventure activities",
    icon: Zap,
  },
];

const BUDGET_TIERS = [
  "Under ₹20,000 / person",
  "₹20,000 – ₹40,000 / person",
  "₹40,000 – ₹75,000 / person",
  "₹75,000+ Luxury",
];

export default function TripPlannerWizard({ whatsappNumber }) {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("Kerala & Munnar");
  const [travelMonth, setTravelMonth] = useState("December 2026");
  const [pace, setPace] = useState("Moderate");
  const [budget, setBudget] = useState("₹20,000 – ₹40,000 / person");
  const [pax, setPax] = useState("2 Adults");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const summaryText = `Hi TripMyla! I built a custom trip plan:
• Destination: ${destination}
• Month: ${travelMonth}
• Trip Pace: ${pace}
• Travellers: ${pax}
• Budget: ${budget}${userName ? `\n• Name: ${userName}` : ""}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summaryText)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="plan-trip-wizard" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#18125A] via-[#221A78] to-[#110D42] text-white p-6 sm:p-10 shadow-2xl border border-white/10">
          {/* Header & Step Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Trip Customiser
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold">
                Plan Your Custom Trip in 30 Seconds
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    step === s
                      ? "w-10 bg-amber-400"
                      : step > s
                      ? "w-6 bg-emerald-400"
                      : "w-6 bg-white/20"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs font-mono text-amber-300">Step {step}/3</span>
            </div>
          </div>

          {/* STEP 1: DESTINATION & MONTH */}
          {step === 1 && (
            <div className="mt-7 space-y-6">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  <MapPin className="w-4 h-4" /> 1. Where do you want to go?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {DESTINATIONS.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setDestination(dest)}
                      className={`px-3.5 py-3 rounded-xl text-xs font-bold text-left border transition ${
                        destination === dest
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg"
                          : "bg-white/10 text-white border-white/15 hover:bg-white/20"
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    <Calendar className="w-4 h-4" /> Preferred Month
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option className="text-slate-900">December 2026</option>
                    <option className="text-slate-900">January 2027</option>
                    <option className="text-slate-900">February 2027</option>
                    <option className="text-slate-900">March 2027</option>
                    <option className="text-slate-900">April – June 2027</option>
                    <option className="text-slate-900">Flexible Dates</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    <Users className="w-4 h-4" /> Travellers
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option className="text-slate-900">2 Adults (Couple)</option>
                    <option className="text-slate-900">Family (2 Adults + Kids)</option>
                    <option className="text-slate-900">4–6 Friends / Group</option>
                    <option className="text-slate-900">Solo Explorer</option>
                    <option className="text-slate-900">Corporate / Large Group (10+)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition"
                >
                  Next: Choose Trip Pace <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PACE SELECTOR & BUDGET */}
          {step === 2 && (
            <div className="mt-7 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  2. Select Your Preferred Trip Pace
                </label>
                <div className="grid sm:grid-cols-3 gap-3.5">
                  {PACE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = pace === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPace(opt.id)}
                        className={`p-4 rounded-2xl border text-left transition ${
                          active
                            ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg"
                            : "bg-white/10 text-white border-white/15 hover:bg-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm">{opt.label}</span>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p
                          className={`mt-1.5 text-xs leading-relaxed ${
                            active ? "text-slate-800" : "text-slate-300"
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BUDGET_TIERS.map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBudget(tier)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition ${
                        budget === tier
                          ? "bg-white text-[#18125A] border-white"
                          : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/20"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-4 py-3"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(3);
                  }}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition"
                >
                  Review & Get Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUMMARY + WHATSAPP / CALLBACK */}
          {step === 3 && (
            <div className="mt-7 space-y-6">
              <div className="rounded-2xl bg-black/30 border border-white/15 p-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Destination</span>
                  <strong className="text-amber-300 text-sm">{destination}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Month</span>
                  <strong className="text-white">{travelMonth}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Pace</span>
                  <strong className="text-white">{pace}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Travellers</span>
                  <strong className="text-white">{pax}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Budget</span>
                  <strong className="text-emerald-300">{budget}</strong>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-500/15 border border-emerald-400/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-white">
                        Custom Trip Request Received!
                      </p>
                      <p className="text-xs text-emerald-200">
                        Our destination specialist will send your tailored itinerary shortly.
                      </p>
                    </div>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" /> Also Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Full Name"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="WhatsApp / Mobile Number"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition"
                    >
                      Get Quote
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Send directly via WhatsApp"
                      className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold px-4 py-3 rounded-xl transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </form>
              )}

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Modify Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}