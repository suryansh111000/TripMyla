import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContactButtons({ brand }) {
  const whatsappNumber = (brand.whatsapp || brand.phone || "9118002023644").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi TripMyla! I would like to plan a trip and get a travel quote."
  )}`;
  const telUrl = `tel:${brand.phone || "18002023644"}`;

  return (
    <div className="fixed bottom-20 right-5 z-40 flex flex-col gap-3">
      {/* Working WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="group relative w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="pointer-events-none absolute right-14 bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
          WhatsApp Us
        </span>
      </a>

      {/* Working Direct Call Button */}
      <a
        href={telUrl}
        aria-label="Call TripMyla"
        title={`Call ${brand.phone}`}
        className="group relative w-12 h-12 rounded-full bg-slate-950 hover:bg-[#2B2464] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border border-white/15"
      >
        <Phone className="w-5 h-5 text-amber-400" />
        <span className="pointer-events-none absolute right-14 bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
          Call {brand.phone}
        </span>
      </a>
    </div>
  );
}