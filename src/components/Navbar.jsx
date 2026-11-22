import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar({ brand, categories, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-[#2B2464] underline underline-offset-8 decoration-amber-500 decoration-2" : "text-slate-700 hover:text-[#2B2464]"
    }`;

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/packages");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Actual TripMyla Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={brand.logo || "/images/tripmyla-logo.png"}
            alt={brand.name}
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider">
          <NavLink to="/" end className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT TRIP MYLA
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            TRIP MYLA GALLERY
          </NavLink>
          <NavLink to="/videos" className={navLinkClass}>
  TRAVEL VIDEOS
</NavLink>

          {/* Tour Packages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="/packages" className={`flex items-center gap-1 py-2 ${navLinkClass}`}>
              TOUR PACKAGES <ChevronDown className="w-4 h-4" />
            </NavLink>

            {dropdownOpen && (
              <div className="absolute left-0 top-full w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#2B2464]"
                  >
                    {cat} Packages
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/contact" className={navLinkClass}>
            CONTACT US
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 text-sm font-semibold">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            HOME
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            ABOUT TRIP MYLA
          </Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            TRIP MYLA GALLERY
          </Link>
          <Link to="/packages" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            TOUR PACKAGES
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">
            CONTACT US
          </Link>
        </div>
      )}
    </header>
  );
}