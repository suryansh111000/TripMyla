import React from "react";

export default function GalleryPage({ gallery }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            Travel Moments
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#2B2464]">
            Trip Myla Gallery
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Snapshots from memorable journeys curated by TripMyla.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="text-white font-semibold text-sm">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}