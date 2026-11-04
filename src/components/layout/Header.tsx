import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MessageCircle, Phone, Mail, Search, Sparkles } from 'lucide-react';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface HeaderProps {
  onOpenEnquiry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Holiday Types', href: '/holiday-types' },
    { label: 'Packages', href: '/packages' },
    { label: 'Travel Guide', href: '/travel-guide' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-slate-200/90 ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
        }`}
      >
        {/* Top Pastel Notification & Booking Desk Bar */}
        <div className="bg-[#f0fdf4] border-b border-[#bbf7d0] text-[12px] text-slate-700 py-1.5 px-4 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Booking Desk India:
              </span>
              <a
                href="tel:+918939958899"
                className="hover:text-emerald-900 transition-colors flex items-center gap-1 font-semibold text-slate-800"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91-8939958899</span>
              </a>
              <span className="text-slate-300">|</span>
              <a href="tel:+919444179215" className="hover:text-emerald-900 transition-colors font-semibold text-slate-800">
                <span>9444179215</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="mailto:24x7support@365holidayz.com"
                className="hover:text-emerald-900 transition-colors flex items-center gap-1 text-slate-600"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>24x7support@365holidayz.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600 font-medium hidden md:inline">
                30+ Years Tour Operating Heritage · 100% Customized Holidays
              </span>
              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-[#dcfce7] px-2.5 py-0.5 rounded-full border border-emerald-300 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo with Official Circular Emblem */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] rounded-lg p-1"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xs border border-slate-200">
                <img
                  src={CLIENT_ASSETS.logo}
                  alt="365Holidayz Premium Tours and Travel Logo"
                  className="w-full h-full object-contain filter drop-shadow-xs rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center leading-none">
                  365<span className="text-[#ff5a36]">Holidayz</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold mt-1">
                  PREMIUM TOURS AND TRAVEL
                </span>
              </div>
            </Link>

            {/* Approved Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-bold tracking-normal transition-colors ${
                      isActive
                        ? 'bg-[#fff1eb] text-[#c2410c] border border-[#fed7aa] shadow-2xs'
                        : 'text-slate-700 hover:text-[#ff5a36] hover:bg-[#fff7ed]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTAs: Search Trigger, WhatsApp & Plan Your Trip */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Quick Search Button -> Pops up Enquiry Form */}
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f0f7ff] hover:bg-[#e0f2fe] border border-[#bae6fd] text-xs font-bold text-[#0369a1] transition-all cursor-pointer shadow-2xs"
                title="Search destinations & packages"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>

              {/* Direct WhatsApp Chat with client's phone number */}
              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#ecfdf5] hover:bg-[#dcfce7] text-[#15803d] font-bold text-xs border border-[#bbf7d0] transition-colors shadow-2xs"
                title="Direct WhatsApp chat with 365Holidayz (+91 89399 58899)"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>

              {/* Persistent Primary CTA (GT Holidays Style Bold Coral Button) */}
              {onOpenEnquiry ? (
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Plan Your Trip</span>
                </button>
              ) : (
                <Link
                  to="/plan-your-trip"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Plan Your Trip</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger & Search Buttons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Search tours and open enquiry"
                title="Search tours"
              >
                <Search className="w-5 h-5 text-[#ff5a36]" />
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff5a36] text-white font-bold text-xs shadow-xs"
              >
                <span>Plan Trip</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            {/* Quick Mobile Contact Header */}
            <div className="p-3 bg-[#f0fdf4] rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-emerald-900 block">Booking Desk India:</span>
              <div className="flex items-center gap-3 text-slate-800 font-semibold">
                <a href="tel:+918939958899" className="hover:text-emerald-700">+91-8939958899</a>
                <span>/</span>
                <a href="tel:+919444179215" className="hover:text-emerald-700">9444179215</a>
              </div>
            </div>

            {/* Mobile Search Button -> Pops up Enquiry Form */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#f0f7ff] border border-sky-200 text-sm text-slate-800 hover:bg-sky-100 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-medium">
                <Search className="w-4 h-4 text-[#0369a1]" />
                <span>Search destinations & tours...</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-[#0369a1] bg-white px-2 py-0.5 rounded border border-sky-200">Enquire</span>
            </button>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2.5 rounded-lg text-base font-bold transition-colors ${
                      isActive
                        ? 'bg-[#fff1eb] text-[#c2410c] border border-orange-200'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#ff5a36] text-white font-black text-sm tracking-wide shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Trip</span>
              </button>

              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ecfdf5] text-emerald-800 font-bold text-sm border border-emerald-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp (+91 89399 58899)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
