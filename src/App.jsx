import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { CheckCircle2, Sliders, X } from "lucide-react";
import { fetchSiteData, saveSiteData, resetDemoData } from "./services/siteService";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OwnerEditDrawer from "./components/OwnerEditDrawer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import PackagesPage from "./pages/PackagesPage";
import ContactPage from "./pages/ContactPage";
import FloatingContactButtons from "./components/FloatingContactButtons";
import PackageDetailModal from "./components/PackageDetailModal";
import VideosPage from "./pages/VideosPage";

function SmoothRouterShell({
  data,
  selectedCategory,
  setSelectedCategory,
  openInquiry,
  onViewDetails,
}) {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        lenis.scrollTo(target, { offset: -84 });
        return;
      }
    }
    lenis.scrollTo(0, { immediate: false });
  }, [pathname, hash]);

  return (
    <main className="flex-1">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              data={data}
              onOpenInquiry={openInquiry}
              onViewDetails={onViewDetails}
            />
          }
        />
        <Route path="/about" element={<AboutPage about={data.about} />} />
        <Route path="/gallery" element={<GalleryPage gallery={data.gallery} />} />
        <Route
  path="/videos"
  element={<VideosPage data={data} onOpenInquiry={openInquiry} />}
/>
        <Route
          path="/packages"
          element={
            <PackagesPage
              brand={data.brand}
              categories={data.packageCategories}
              packages={data.packages}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenInquiry={openInquiry}
              onViewDetails={onViewDetails}
            />
          }
        />
        <Route path="/contact" element={<ContactPage brand={data.brand} />} />
      </Routes>
    </main>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inquiryModal, setInquiryModal] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [detailModalPkg, setDetailModalPkg] = useState(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [draftData, setDraftData] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    fetchSiteData().then((res) => {
      setData(res);
      setDraftData(res);
    });
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin h-10 w-10 border-4 border-[#2B2464] border-t-amber-500 rounded-full" />
      </div>
    );
  }

  const handleSaveDemoEdits = async (e) => {
    e.preventDefault();
    await saveSiteData(draftData);
    setData(draftData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleResetDemo = () => {
    const fresh = resetDemoData();
    setData(fresh);
    setDraftData(fresh);
  };

  const openInquiry = (pkg) => {
    setInquiryModal(pkg);
    setFormSubmitted(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <Navbar
          brand={data.brand}
          categories={data.packageCategories}
          onSelectCategory={setSelectedCategory}
        />

        <SmoothRouterShell
          data={data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          openInquiry={openInquiry}
          onViewDetails={setDetailModalPkg}
        />

        <Footer brand={data.brand} onSelectCategory={setSelectedCategory} />

        <PackageDetailModal
          pkg={detailModalPkg}
          whatsappNumber={(data.brand.whatsapp || data.brand.phone || "9118002023644").replace(
            /\D/g,
            ""
          )}
          onClose={() => setDetailModalPkg(null)}
          onOpenInquiry={openInquiry}
        />

        <FloatingContactButtons brand={data.brand} />

        {/* PACKAGE INQUIRY MODAL */}
        {inquiryModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-slate-100">
              <button
                type="button"
                onClick={() => setInquiryModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="mt-3 text-xl font-bold text-[#2B2464]">Inquiry Sent!</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    We will contact you shortly regarding <strong>{inquiryModal.title}</strong>.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <span className="text-xs font-bold uppercase text-amber-600">
                    Package Enquiry
                  </span>
                  <h3 className="text-xl font-bold text-[#2B2464]">{inquiryModal.title}</h3>
                  <p className="text-xs text-slate-500">
                    {inquiryModal.duration} • Starting at {inquiryModal.price}
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2B2464] hover:bg-[#1e184b] text-white font-semibold py-3 rounded-xl text-sm transition"
                  >
                    Confirm Callback Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* FLOATING OWNER EDIT PREVIEW BUTTON */}
        <button
          type="button"
          onClick={() => {
            setDraftData(JSON.parse(JSON.stringify(data)));
            setAdminOpen(true);
          }}
          className="fixed bottom-5 right-5 z-40 bg-slate-900 hover:bg-[#2B2464] text-white text-xs font-semibold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/15 transition"
        >
          <Sliders className="w-4 h-4 text-amber-400" /> Owner Edit Preview
        </button>

        <OwnerEditDrawer
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          draftData={draftData}
          setDraftData={setDraftData}
          onSave={handleSaveDemoEdits}
          onReset={handleResetDemo}
          saveToast={saveToast}
        />
      </div>
    </BrowserRouter>
  );
}