import React from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage({ brand }) {
  return (
    <section className="py-20 bg-[#2B2464] text-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
            Plan Your Next Adventure With Us
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Share your travel dates, destination ideas, or group size—our travel experts will craft a
            customized itinerary for you.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400" /> {brand.phone}
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400" /> {brand.email}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400" /> {brand.address}
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your inquiry has been recorded.");
            e.target.reset();
          }}
          className="bg-white text-slate-800 p-8 rounded-2xl shadow-xl space-y-4"
        >
          <h2 className="text-xl font-bold text-[#2B2464]">Request a Free Quote</h2>
          <input
            type="text"
            required
            placeholder="Your Full Name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2B2464]"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="tel"
              required
              placeholder="Phone / WhatsApp"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2B2464]"
            />
            <input
              type="text"
              placeholder="Preferred Destination"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2B2464]"
            />
          </div>
          <textarea
            rows="3"
            placeholder="Tell us about your travel dates & number of travelers..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2B2464]"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Send className="w-4 h-4" /> Send Travel Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}