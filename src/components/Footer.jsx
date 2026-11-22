import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Plane,
  MessageCircle,
  Share2,
  Camera,
  Check,
  Sparkles,
} from "lucide-react";

const BOARDING_ROUTES = [
  { code: "DEL → COK", label: "Kerala Backwaters", tag: "Houseboats & Tea Hills" },
  { code: "DEL → SIN", label: "Singapore Skyline", tag: "Sentosa & Marina Bay" },
  { code: "DEL → HAN", label: "Vietnam Wonders", tag: "Halong & Golden Bridge" },
  { code: "DEL → MLE", label: "Maldives Escape", tag: "Lagoons & Sunset Villas" },
];

export default function Footer({ brand, onSelectCategory }) {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(BOARDING_ROUTES[0]);
  const [quickPhone, setQuickPhone] = useState("");
  const [requested, setRequested] = useState(false);

  const packageLinks = [
    "Honeymoon Tour Packages",
    "Kerala Tour Packages",
    "Vietnam Tour Packages",
    "Family Tour Packages",
    "Singapore Tour Packages",
  ];

  const handlePackageNav = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
    navigate("/packages");
  };

  const whatsappNumber = (brand.whatsapp || brand.phone || "9118002023644").replace(/\D/g, "");
  const routeWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi TripMyla! Boarding inquiry for ${selectedRoute.label} (${selectedRoute.code}).`
  )}`;

  const handleQuickCallback = (e) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    setRequested(true);
    setQuickPhone("");
    setTimeout(() => setRequested(false), 4000);
  };

  return (
    <footer className="mt-auto bg-[#0B091D] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Ambient Radial Aura */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-r from-amber-500/15 via-indigo-500/20 to-emerald-400/15 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP INTERACTIVE ROUTE-STAMP BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Boarding Pass Footer
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl font-bold tracking-tight">
              Pick your next departure stamp
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {BOARDING_ROUTES.map((route) => {
              const active = selectedRoute.code === route.code;
              return (
                <button
                  key={route.code}
                  type="button"
                  onClick={() => setSelectedRoute(route)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                    active
                      ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-[1.03]"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {route.code} • {route.label.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN BOARDING PASS CARD WITH PERFORATED DIVIDER */}
        <div className="rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* LEFT BOARDING STUB (4 cols) */}
            <div className="lg:col-span-4 p-7 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-amber-400/15 to-transparent">
              <div>
                <div className="flex items-center justify-between">
                  <img
                    src={brand.logo || "/images/tripmyla-logo.png"}
                    alt={brand.name}
                    className="h-11 w-auto object-contain brightness-0 invert"
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-amber-300 border border-white/10">
                    PASS #{selectedRoute.code.replace(/[^A-Z]/g, "")}26
                  </span>
                </div>

                {/* Dynamic Route Display */}
                <div className="mt-7 p-4 rounded-2xl bg-black/35 border border-white/10">
                  <div className="flex items-center justify-between text-amber-400 font-mono text-lg font-extrabold tracking-wider">
                    <span>{selectedRoute.code.split(" → ")[0]}</span>
                    <Plane className="w-4 h-4 rotate-45 text-amber-300" />
                    <span>{selectedRoute.code.split(" → ")[1]}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-white">{selectedRoute.label}</p>
                  <p className="text-xs text-slate-400">{selectedRoute.tag}</p>
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={routeWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition"
                >
                  <MessageCircle className="w-4 h-4" /> Book {selectedRoute.label.split(" ")[0]}
                </a>
                <a
                  href={brand.instagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <Camera className="w-4 h-4" />
                </a>
                <a
                  href={brand.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* PERFORATED TEAR-LINE + MAIN CABIN CONTENT (8 cols) */}
            <div className="lg:col-span-8 p-7 sm:p-8 lg:border-l-2 lg:border-dashed lg:border-white/20 flex flex-col justify-between gap-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {/* Curated Trips */}
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    Curated Trips
                  </h3>
                  <ul className="mt-3.5 space-y-2 text-xs text-slate-300">
                    {packageLinks.map((pkgName) => (
                      <li key={pkgName}>
                        <button
                          type="button"
                          onClick={() => handlePackageNav(pkgName)}
                          className="group inline-flex items-center gap-1 hover:text-amber-300 transition text-left"
                        >
                          <span>{pkgName}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-amber-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concierge Desk */}
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    Concierge Desk
                  </h3>
                  <div className="mt-3.5 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{brand.address}</span>
                    </p>
                    <a
                      href={`tel:${brand.phone}`} className="flex items-center gap-2 font-semibold text-white hover:text-amber-300 transition" > <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <span>{brand.phone}</span> </a> <a href={`mailto:${brand.email}`}
                      className="flex items-center gap-2 hover:text-amber-300 transition break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{brand.email}</span>
                    </a>
                  </div>
                </div>

                {/* Mini Map Preview */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">
                    HQ Pin
                  </h3>
                  <div className="w-full h-36 rounded-2xl overflow-hidden border border-white/15 bg-slate-900">
                    <iframe
                      title="TripMyla Office Location"
                      src={brand.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Instant Callback Strip */}
              <div className="pt-5 border-t border-white/10">
                {requested ? (
                  <div className="flex items-center gap-2.5 text-emerald-300 text-xs font-semibold bg-emerald-500/10 border border-emerald-400/25 px-4 py-3 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>
                      Callback queued for <strong>{selectedRoute.label}</strong>! Our team will reach
                      out shortly.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickCallback} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="tel"
                      required
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder={`Get callback for ${selectedRoute.label} (Enter phone)...`}
                      className="flex-1 bg-white/5 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shrink-0"
                    >
                      Request Callback <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & ROUTE STRIP */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-200 font-semibold">
              {brand.legalName || brand.name}
            </span>
            . Crafted for modern explorers.
          </p>
          <div className="flex flex-wrap items-center gap-5 font-medium">
            <Link to="/" className="hover:text-amber-300 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-300 transition">
              About
            </Link>
            <Link to="/gallery" className="hover:text-amber-300 transition">
              Gallery
            </Link>
            <Link to="/packages" className="hover:text-amber-300 transition">
              Packages
            </Link>
            <Link to="/contact" className="hover:text-amber-300 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}