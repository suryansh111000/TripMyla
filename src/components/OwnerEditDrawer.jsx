import React, { useState } from "react";
import { X, RotateCcw, Plus, Trash2, Upload } from "lucide-react";

export default function OwnerEditDrawer({
  isOpen,
  onClose,
  draftData,
  setDraftData,
  onSave,
  onReset,
  saveToast,
}) {
  const [activeTab, setActiveTab] = useState("carousel");

  if (!isOpen || !draftData) return null;

  // Helper to convert selected local image file into previewable URL (for demo)
  const handleLocalImagePick = (file, onResult) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onResult(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-lg text-[#2B2464]">TripMyla Owner CMS Panel</h3>
            <p className="text-xs text-slate-500">
              Edit every page, carousel, package & image without coding
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="grid grid-cols-4 border-b text-xs font-bold bg-white">
          {[
            { id: "carousel", label: "Carousel" },
            { id: "packages", label: "Packages" },
            { id: "gallery", label: "Gallery" },
            { id: "brand", label: "Brand & About" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 border-b-2 transition ${
                activeTab === tab.id
                  ? "border-amber-500 text-[#2B2464] bg-amber-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={onSave} className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {/* TAB 1: HERO CAROUSEL */}
          {activeTab === "carousel" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Hero Slides ({draftData.heroSlides.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newSlide = {
                      id: Date.now(),
                      image:
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
                      title: "New Adventure Awaits You",
                      subtitle: "Explore handpicked destinations with TripMyla.",
                      ctaText: "EXPLORE NOW",
                      ctaLink: "/packages",
                    };
                    setDraftData({
                      ...draftData,
                      heroSlides: [...draftData.heroSlides, newSlide],
                    });
                  }}
                  className="flex items-center gap-1 text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Slide
                </button>
              </div>

              {draftData.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="p-4 border rounded-xl bg-slate-50/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2B2464]">Slide #{idx + 1}</span>
                    {draftData.heroSlides.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setDraftData({
                            ...draftData,
                            heroSlides: draftData.heroSlides.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Slide Heading"
                    value={slide.title}
                    onChange={(e) => {
                      const slides = [...draftData.heroSlides];
                      slides[idx] = { ...slides[idx], title: e.target.value };
                      setDraftData({ ...draftData, heroSlides: slides });
                    }}
                    className="w-full px-3 py-2 border bg-white rounded-lg text-xs"
                  />

                  <textarea
                    rows="2"
                    placeholder="Slide Subtitle / Description"
                    value={slide.subtitle}
                    onChange={(e) => {
                      const slides = [...draftData.heroSlides];
                      slides[idx] = { ...slides[idx], subtitle: e.target.value };
                      setDraftData({ ...draftData, heroSlides: slides });
                    }}
                    className="w-full px-3 py-2 border bg-white rounded-lg text-xs"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={slide.ctaText}
                      onChange={(e) => {
                        const slides = [...draftData.heroSlides];
                        slides[idx] = { ...slides[idx], ctaText: e.target.value };
                        setDraftData({ ...draftData, heroSlides: slides });
                      }}
                      className="px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 border bg-white rounded-lg text-xs font-semibold text-[#2B2464] cursor-pointer hover:bg-amber-50">
                      <Upload className="w-3.5 h-3.5" /> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleLocalImagePick(e.target.files?.[0], (imgUrl) => {
                            const slides = [...draftData.heroSlides];
                            slides[idx] = { ...slides[idx], image: imgUrl };
                            setDraftData({ ...draftData, heroSlides: slides });
                          })
                        }
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste Image URL"
                    value={slide.image}
                    onChange={(e) => {
                      const slides = [...draftData.heroSlides];
                      slides[idx] = { ...slides[idx], image: e.target.value };
                      setDraftData({ ...draftData, heroSlides: slides });
                    }}
                    className="w-full px-3 py-1.5 border bg-white rounded-lg text-[11px] text-slate-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TOUR PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Tour Packages ({draftData.packages.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newPkg = {
                      id: Date.now(),
                      title: "New Custom Package",
                      category: "Domestic",
                      duration: "3 Nights / 4 Days",
                      location: "Destination Name",
                      price: "₹14,999",
                      image:
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
                      highlights: ["Hotel Stay", "Sightseeing", "Breakfast Included"],
                    };
                    setDraftData({
                      ...draftData,
                      packages: [newPkg, ...draftData.packages],
                    });
                  }}
                  className="flex items-center gap-1 text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Package
                </button>
              </div>

              {draftData.packages.map((pkg, idx) => (
                <div key={pkg.id} className="p-4 border rounded-xl bg-slate-50/70 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2B2464]">{pkg.title}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftData({
                          ...draftData,
                          packages: draftData.packages.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Package Title"
                      value={pkg.title}
                      onChange={(e) => {
                        const list = [...draftData.packages];
                        list[idx] = { ...list[idx], title: e.target.value };
                        setDraftData({ ...draftData, packages: list });
                      }}
                      className="col-span-2 px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={pkg.price}
                      onChange={(e) => {
                        const list = [...draftData.packages];
                        list[idx] = { ...list[idx], price: e.target.value };
                        setDraftData({ ...draftData, packages: list });
                      }}
                      className="px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Location"
                      value={pkg.location}
                      onChange={(e) => {
                        const list = [...draftData.packages];
                        list[idx] = { ...list[idx], location: e.target.value };
                        setDraftData({ ...draftData, packages: list });
                      }}
                      className="px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={pkg.duration}
                      onChange={(e) => {
                        const list = [...draftData.packages];
                        list[idx] = { ...list[idx], duration: e.target.value };
                        setDraftData({ ...draftData, packages: list });
                      }}
                      className="px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={pkg.category}
                      onChange={(e) => {
                        const list = [...draftData.packages];
                        list[idx] = { ...list[idx], category: e.target.value };
                        setDraftData({ ...draftData, packages: list });
                      }}
                      className="px-3 py-2 border bg-white rounded-lg text-xs"
                    >
                      {draftData.packageCategories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>

                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 border bg-white rounded-lg text-xs font-semibold text-[#2B2464] cursor-pointer hover:bg-amber-50">
                      <Upload className="w-3.5 h-3.5" /> Change Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleLocalImagePick(e.target.files?.[0], (imgUrl) => {
                            const list = [...draftData.packages];
                            list[idx] = { ...list[idx], image: imgUrl };
                            setDraftData({ ...draftData, packages: list });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Gallery Photos ({draftData.gallery.length})
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setDraftData({
                      ...draftData,
                      gallery: [
                        {
                          id: Date.now(),
                          caption: "New Destination Memory",
                          image:
                            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
                        },
                        ...draftData.gallery,
                      ],
                    })
                  }
                  className="flex items-center gap-1 text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo
                </button>
              </div>

              {draftData.gallery.map((item, idx) => (
                <div key={item.id} className="p-3 border rounded-xl bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => {
                        const gal = [...draftData.gallery];
                        gal[idx] = { ...gal[idx], caption: e.target.value };
                        setDraftData({ ...draftData, gallery: gal });
                      }}
                      className="flex-1 px-3 py-2 border bg-white rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDraftData({
                          ...draftData,
                          gallery: draftData.gallery.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 border bg-white rounded-lg text-xs font-semibold text-[#2B2464] cursor-pointer hover:bg-amber-50">
                    <Upload className="w-3.5 h-3.5" /> Upload New Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleLocalImagePick(e.target.files?.[0], (imgUrl) => {
                          const gal = [...draftData.gallery];
                          gal[idx] = { ...gal[idx], image: imgUrl };
                          setDraftData({ ...draftData, gallery: gal });
                        })
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: BRAND & ABOUT */}
          {activeTab === "brand" && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-xs uppercase text-slate-500 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={draftData.brand.phone}
                  onChange={(e) =>
                    setDraftData({
                      ...draftData,
                      brand: { ...draftData.brand, phone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-xs uppercase text-slate-500 mb-1">
                  Contact Email
                </label>
                <input
                  type="text"
                  value={draftData.brand.email}
                  onChange={(e) =>
                    setDraftData({
                      ...draftData,
                      brand: { ...draftData.brand, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-xs uppercase text-slate-500 mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={draftData.brand.address}
                  onChange={(e) =>
                    setDraftData({
                      ...draftData,
                      brand: { ...draftData.brand, address: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <hr />

              <div>
                <label className="block font-semibold text-xs uppercase text-slate-500 mb-1">
                  About Page Subheading
                </label>
                <input
                  type="text"
                  value={draftData.about.subheading}
                  onChange={(e) =>
                    setDraftData({
                      ...draftData,
                      about: { ...draftData.about, subheading: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-xs uppercase text-slate-500 mb-1">
                  About Page Description
                </label>
                <textarea
                  rows="4"
                  value={draftData.about.description}
                  onChange={(e) =>
                    setDraftData({
                      ...draftData,
                      about: { ...draftData.about, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <label className="flex items-center justify-center gap-1.5 px-3 py-2 border bg-slate-50 rounded-lg text-xs font-semibold text-[#2B2464] cursor-pointer hover:bg-amber-50">
                <Upload className="w-3.5 h-3.5" /> Change About Page Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleLocalImagePick(e.target.files?.[0], (imgUrl) =>
                      setDraftData({
                        ...draftData,
                        about: { ...draftData.about, image: imgUrl },
                      })
                    )
                  }
                />
              </label>
            </div>
          )}

          {saveToast && (
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
              Changes saved! Live website updated immediately.
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex gap-2 pt-3 border-t sticky bottom-0 bg-white">
            <button
              type="submit"
              className="flex-1 bg-[#2B2464] hover:bg-[#1f194b] text-white font-semibold py-2.5 rounded-xl"
            >
              Save & Update Site
            </button>
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2.5 border rounded-xl text-slate-600 hover:bg-slate-50"
              title="Reset to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}