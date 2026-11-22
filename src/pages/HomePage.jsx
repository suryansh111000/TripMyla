import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProcessFlowStrip from "../components/ProcessFlowStrip";
import TripPlannerWizard from "../components/TripPlannerWizard";
import FaqAccordion from "../components/FaqAccordion";
import GalleryLightboxModal from "../components/GalleryLightboxModal";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Compass,
  ShieldCheck,
  Globe2,
  Wallet,
  ArrowUpRight,
  MessageCircle,
  Star,
  Flame,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import PackageCard from "../components/PackageCard";
import TrustMetricsStrip from "../components/TrustMetricsStrip";


const PILLAR_ICONS = [Compass, ShieldCheck, Globe2, Wallet];

const VIBE_FILTERS = [
  { id: "all", label: "All Curated Trips" },
  { id: "budget", label: "Budget Friendly (Under ₹25k)" },
  { id: "international", label: "International Escapes" },
  { id: "honeymoon", label: "Romantic & Honeymoon" },
];

function parseNumericPrice(priceStr = "") {
  const num = parseInt(String(priceStr).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(num) ? 0 : num;
}

export default function HomePage({ data, onOpenInquiry, onViewDetails }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVibe, setSelectedVibe] = useState("all");
  const [activeReviewId, setActiveReviewId] = useState(data?.reviews?.[0]?.id || 1);
  const [cardSpotlight, setCardSpotlight] = useState({ id: null, x: 50, y: 50 });
  const [galleryModalIdx, setGalleryModalIdx] = useState(null);

  const [pillarsRef, pillarsVisible] = useScrollReveal();
  const [discoverRef, discoverVisible] = useScrollReveal();
  const [offersRef, offersVisible] = useScrollReveal();
  const [pkgRef, pkgVisible] = useScrollReveal();
  const [galRef, galVisible] = useScrollReveal();
  const [revRef, revVisible] = useScrollReveal();

  useEffect(() => {
    if (!data?.heroSlides?.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data]);

  const whatsappNumber = (data.brand.whatsapp || data.brand.phone || "9118002023644").replace(
    /\D/g,
    ""
  );
  const getWhatsappQuoteLink = (topic) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hi TripMyla! I want an instant quote for: ${topic}`
    )}`;

  const dynamicPackages = data.packages.filter((pkg) => {
    const priceVal = parseNumericPrice(pkg.price);
    const catLower = (pkg.category || "").toLowerCase();
    const titleLower = (pkg.title || "").toLowerCase();

    if (selectedVibe === "budget") return priceVal > 0 && priceVal <= 25000;
    if (selectedVibe === "international")
      return (
        catLower.includes("singapore") ||
        catLower.includes("vietnam") ||
        catLower.includes("honeymoon") ||
        titleLower.includes("maldives")
      );
    if (selectedVibe === "honeymoon")
      return catLower.includes("honeymoon") || titleLower.includes("maldives");
    return true;
  });

  const handleCardMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCardSpotlight({ id, x, y });
  };

  return (
    <div>
      {/* 1. KINETIC HERO SLIDER */}
      <section className="relative h-[86vh] min-h-[550px] w-full overflow-hidden bg-slate-950">
        <style>{`
          @keyframes tmFadeUp {
            0% { opacity: 0; transform: translateY(26px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes tmSlowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); }
          }
        `}</style>

        {data.heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
              className="absolute inset-0 w-full h-full transition-opacity duration-700"
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{ animation: isActive ? "tmSlowZoom 7.5s ease-out forwards" : "none" }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-[#0B091D]/90 z-10" />

              {isActive && (
                <div
                  key={`slide-overlay-${currentSlide}`}
                  className="absolute inset-0 z-20 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center text-white"
                >
                  <span
                    style={{ animation: "tmFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
                    className="mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 text-xs font-semibold tracking-wider uppercase"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> {data.brand.name} • Next-Gen Travel Studio
                  </span>

                  <h1
                    style={{
                      animation: "tmFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards",
                      opacity: 0,
                    }}
                    className="whitespace-pre-line text-3xl sm:text-5xl md:text-[56px] font-bold leading-[1.14] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]"
                  >
                    {slide.title}
                  </h1>

                  <p
                    style={{
                      opacity: 0,
                      animation: "tmFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.28s forwards",
                    }}
                    className="mt-5 text-sm sm:text-lg md:text-[20px] text-white/95 max-w-4xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  >
                    “{slide.subtitle}”
                  </p>

                  <Link
                    to={slide.ctaLink || "/packages"}
                    style={{
                      opacity: 0,
                      animation: "tmFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards",
                    }}
                    className="mt-8 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-[0.16em] uppercase px-8 py-4 rounded-full shadow-xl transition hover:-translate-y-0.5"
                  >
                    {slide.ctaText || "EXPLORE NOW"} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + data.heroSlides.length) % data.heroSlides.length)
          }
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length)}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {data.heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-9 bg-amber-400" : "w-2.5 bg-white/45 hover:bg-white"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ANIMATED TRUST METRICS STRIP */}
      <TrustMetricsStrip metrics={data.trustMetrics} />

      {/* 2. DYNAMIC VIBE & PILLARS */}
      <section
        ref={pillarsRef}
        className={`py-20 bg-white reveal-hidden ${pillarsVisible ? "reveal-visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-[#18125A] max-w-3xl mx-auto leading-snug font-sans">
            We believe that travel is more than just visiting new places{" "}
            <span className="text-[#D4A017]">
              it’s about creating unforgettable experiences.
            </span>
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data.valuePillars || []).map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              const isHovered = cardSpotlight.id === `pillar-${idx}`;
              return (
                <div
                  key={idx}
                  onMouseMove={(e) => handleCardMouseMove(e, `pillar-${idx}`)}
                  onMouseLeave={() => setCardSpotlight({ id: null, x: 50, y: 50 })}
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle at ${cardSpotlight.x}% ${cardSpotlight.y}%, rgba(212,160,23,0.14), #ffffff 65%)`
                      : undefined,
                  }}
                  className="group relative bg-[#F8FAFC] hover:bg-white rounded-3xl p-8 text-center border border-slate-200/70 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 text-[#D4A017] group-hover:bg-[#18125A] group-hover:text-amber-400 flex items-center justify-center transition-colors">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#18125A]">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 & 4. EDITORIAL DISCOVER + OFFERS BAND */}
      <section className="py-20 bg-[#FEF6C9]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div
            ref={discoverRef}
            className={`grid lg:grid-cols-12 gap-10 items-center reveal-hidden ${
              discoverVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-5xl font-bold text-[#18125A] leading-tight font-sans">
                Discover the Amazing Places Around World.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                We believe that travel is more than just visiting new places—it’s about creating
                experiences.
              </p>
              <a
                href={getWhatsappQuoteLink("Exploring Domestic & International Packages")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 bg-[#43B02A] hover:bg-[#389922] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" /> Explore More
              </a>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
                alt="Group Travelers"
                className="w-full h-72 sm:h-96 object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80"
                alt="Golden Bridge Vietnam"
                className="w-full h-72 sm:h-96 object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition duration-500"
              />
            </div>
          </div>

          <div
            ref={offersRef}
            className={`grid lg:grid-cols-12 gap-10 items-center reveal-hidden ${
              offersVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80"
                alt="Airport Departure TripMyla"
                className="w-full h-80 sm:h-[430px] object-cover rounded-3xl shadow-xl"
              />
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#18125A] leading-tight font-sans">
                Unmissable Offers on{" "}
                <span className="block text-[#D4A017]">Your Next Adventure</span>
              </h2>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                We believe that unforgettable adventures shouldn’t have to break the bank—enjoy
                exclusive discounts on our popular tours.
              </p>

              <ul className="mt-6 space-y-2.5">
                {(data.offersHighlights || []).map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#18125A]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsappQuoteLink("Instant Travel Quote & Offers")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 bg-[#43B02A] hover:bg-[#389922] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" /> Get Instant Travel Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC TOP SELLING PACKAGES WITH LIVE VIBE SWITCHER */}
      <section
        ref={pkgRef}
        className={`py-20 bg-white reveal-hidden ${pkgVisible ? "reveal-visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-600">
              <Flame className="w-3.5 h-3.5" /> Interactive Discovery
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-[#18125A] font-sans">
              Our Top Selling <span className="text-[#D4A017]">Travel Packages</span>
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {VIBE_FILTERS.map((vibe) => (
              <button
                key={vibe.id}
                type="button"
                onClick={() => setSelectedVibe(vibe.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedVibe === vibe.id
                    ? "bg-[#18125A] text-amber-300 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-amber-100"
                }`}
              >
                {vibe.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {(dynamicPackages.length ? dynamicPackages : data.packages.slice(0, 3)).map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                whatsappNumber={whatsappNumber}
                onOpenInquiry={onOpenInquiry}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#18125A] hover:text-amber-600 underline underline-offset-4"
            >
              Explore All Tour Packages <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <ProcessFlowStrip />
      <TripPlannerWizard whatsappNumber={whatsappNumber} />

      {/* 6. TRIPMYLA TRAVEL GALLERY */}
      <section
        ref={galRef}
        className={`py-16 bg-slate-50 reveal-hidden ${galVisible ? "reveal-visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#18125A] font-sans">
            TripMyla <span className="text-[#D4A017]">Travel Gallery</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
  {data.gallery.slice(0, 3).map((item, idx) => (
    <div
      key={item.id}
      onClick={() => setGalleryModalIdx(idx)}
      className="group relative h-64 rounded-3xl overflow-hidden shadow-md cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.caption}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-5">
        <p className="text-white font-semibold text-sm">{item.caption}</p>
      </div>
    </div>
  ))}
</div>

<GalleryLightboxModal
  images={data.gallery}
  initialIndex={galleryModalIdx}
  onClose={() => setGalleryModalIdx(null)}
/>

          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#18125A] hover:text-amber-600"
            >
              View Full Gallery <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. REAL CUSTOMERS REAL REVIEWS */}
      <section
        ref={revRef}
        className={`py-20 bg-white reveal-hidden ${revVisible ? "reveal-visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18125A] leading-tight font-sans">
              Real Customers Real Reviews
            </h2>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              At TripMyla, we believe in crafting personalized journeys that leave lasting memories.
              Click any review card to spotlight traveler feedback.
            </p>
            <a
              href={getWhatsappQuoteLink("Reviews & Trip Consultation")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#43B02A] hover:bg-[#389922] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow transition"
            >
              <MessageCircle className="w-4 h-4" /> Read More Reviews
            </a>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {(data.reviews || []).map((rev) => {
              const isSelected = activeReviewId === rev.id;
              return (
                <div
                  key={rev.id}
                  onClick={() => setActiveReviewId(rev.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-amber-400 bg-amber-50/40 shadow-lg -translate-y-0.5"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#18125A] text-amber-300 font-bold text-sm flex items-center justify-center">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{rev.name}</p>
                        <p className="text-[11px] text-slate-400">{rev.time}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">{rev.text}</p>

                  {rev.reply && (
                    <div className="mt-3 pl-3 border-l-2 border-amber-400 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">
                        {data.brand.legalName || "TripMyla"} (Owner):
                      </span>{" "}
                      {rev.reply}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <FaqAccordion faqs={data.faqs} />
    </div>
  );
}