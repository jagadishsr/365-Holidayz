import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MessageCircle, Phone, Mail, Sparkles, Users, Search } from 'lucide-react';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface HeaderProps {
  onOpenEnquiry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
    { label: 'About', href: '/about' }
  ];

  const headerBg = isHome && !isScrolled
    ? 'bg-gradient-to-b from-[#010048]/95 via-[#010048]/80 to-transparent text-white'
    : 'bg-[#010048] text-white shadow-xl border-b border-[#c59b27]/30';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        {/* Top Mini Bar with Verified Booking Desk Contacts */}
        <div className="bg-[#000032]/95 border-b border-[#c59b27]/25 text-[11px] text-slate-300 py-1.5 px-4 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#f3e098] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Booking Desk India:
              </span>
              <a href="tel:+918939958899" className="hover:text-white transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#c59b27]" />
                <span>+91-8939958899</span>
              </a>
              <span className="text-slate-600">|</span>
              <a href="tel:+919444179215" className="hover:text-white transition-colors">
                <span>9444179215</span>
              </a>
              <span className="text-slate-600">|</span>
              <a href="mailto:24x7support@365holidayz.com" className="hover:text-white transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#c59b27]" />
                <span>24x7support@365holidayz.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#f3e098] font-medium tracking-wide">
                Your Travel, Our Passion. 30+ Yrs Travel Expertise
              </span>
              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp Desk (+91 89399 58899)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Brand Logo with Official Circular Emblem */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#c59b27] rounded-md p-1"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={CLIENT_ASSETS.logo}
                  alt="365Holidayz Premium Tours and Travel Logo"
                  className="w-full h-full object-contain filter drop-shadow-md rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center leading-none">
                  365Holidayz
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#f3e098] font-bold mt-1">
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
                    className={`px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-[#f3e098] bg-[#080562] shadow-xs border-b-2 border-[#c59b27]'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTAs: Search Trigger, WhatsApp & Plan Your Trip */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Quick Search Trigger Button -> Pops up Enquiry Form */}
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-[#c59b27]/40 text-xs text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Search tours & open enquiry form"
              >
                <Search className="w-3.5 h-3.5 text-[#f3e098]" />
                <span className="text-slate-300">Search Tours...</span>
              </button>

              {/* Direct WhatsApp Chat with client's phone number */}
              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/25 hover:bg-emerald-600/40 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-colors shadow-sm"
                title="Direct WhatsApp chat with 365Holidayz (+91 89399 58899)"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>

              {/* Persistent Primary CTA */}
              {onOpenEnquiry ? (
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#010048]" />
                  <span>Plan Your Trip</span>
                </button>
              ) : (
                <Link
                  to="/plan-your-trip"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#010048]" />
                  <span>Plan Your Trip</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger & Search Buttons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="p-2 rounded text-slate-200 hover:text-white hover:bg-white/10"
                aria-label="Search tours and open enquiry"
                title="Search tours"
              >
                <Search className="w-5 h-5 text-[#f3e098]" />
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 rounded bg-[#c59b27] text-[#010048] font-bold text-xs"
              >
                <span>Plan Trip</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-slate-200 hover:text-white hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#c59b27]"
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
          <div className="lg:hidden bg-[#010048] border-b border-[#c59b27]/30 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            {/* Quick Mobile Contact Header */}
            <div className="p-3 bg-[#000032] rounded-lg border border-[#c59b27]/30 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-[#f3e098] block">Booking Desk India:</span>
              <div className="flex items-center gap-3 text-slate-200">
                <a href="tel:+918939958899" className="hover:text-white">+91-8939958899</a>
                <span>/</span>
                <a href="tel:+919444179215" className="hover:text-white">9444179215</a>
              </div>
            </div>

            {/* Mobile Search Button -> Pops up Enquiry Form */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 border border-[#c59b27]/40 text-sm text-slate-200 hover:bg-white/15"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#f3e098]" />
                <span>Search destinations & tours...</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-[#f3e098] bg-[#000032] px-2 py-0.5 rounded">Enquire</span>
            </button>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2.5 rounded text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#080562] text-[#f3e098]'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-[#010048] font-black text-sm tracking-wide shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Trip</span>
              </button>

              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-emerald-600/30 text-emerald-300 font-bold text-sm border border-emerald-500/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 89399 58899)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
