import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage({ about }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={about.image}
            alt="About TripMyla"
            className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
          />
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#2B2464] text-white px-6 py-4 rounded-xl shadow-lg">
            <p className="text-amber-400 font-bold text-xl">100% Tailored</p>
            <p className="text-xs text-slate-200">Hassle-Free Travel Planning</p>
          </div>
        </div>

        <div>
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            {about.heading}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#2B2464] leading-snug">
            {about.subheading}
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">{about.description}</p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
            {about.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2B2464]">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/packages"
              className="bg-[#2B2464] hover:bg-[#1e184b] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition"
            >
              Explore Packages
            </Link>
            <Link
              to="/contact"
              className="border border-slate-300 hover:border-[#2B2464] text-slate-700 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}