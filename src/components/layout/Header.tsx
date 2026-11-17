import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface HeaderProps {
  onOpenEnquiry: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'DESTINATIONS', href: '/destinations' },
  { label: 'TRAVEL GUIDE', href: '/travel-guide' },
  { label: 'HAPPY CLIENTS', href: '/happy-clients' },
  { label: 'CONTACT', href: '/contact' }
];

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/' || location.pathname === '';
    if (href === '/destinations') {
      return (
        location.pathname.startsWith('/destinations') ||
        location.pathname.startsWith('/packages') ||
        location.pathname.startsWith('/holiday-types')
      );
    }
    return location.pathname.startsWith(href);
  };

  const transparentMode = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparentMode
          ? 'bg-gradient-to-b from-black/55 via-black/25 to-transparent text-white py-4'
          : 'bg-[#FAF9F6]/95 backdrop-blur-md text-[#111827] border-b border-[#E5E2DC] py-3 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Left Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-black/10 shadow-xs shrink-0">
            <img
              src={CLIENT_ASSETS.logo}
              alt="365Holidayz"
              className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-display text-lg sm:text-xl font-extrabold tracking-tight ${
                transparentMode ? 'text-white' : 'text-[#010048]'
              }`}
            >
              365Holidayz
            </span>
            <span
              className={`text-[9px] font-semibold uppercase tracking-[0.22em] mt-1 ${
                transparentMode ? 'text-white/80' : 'text-[#6B7280]'
              }`}
            >
              Premium Tours &amp; Travel
            </span>
          </div>
        </Link>

        {/* Zone 2: Centered 6 Approved Menu Items */}
        <nav className="hidden lg:flex items-center justify-center gap-7" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative py-2 text-[12px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                  transparentMode
                    ? active
                      ? 'text-white'
                      : 'text-white/85 hover:text-white'
                    : active
                      ? 'text-[#010048]'
                      : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[2px] ${
                      transparentMode ? 'bg-white' : 'bg-[#D94E28]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Right Single Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-all cursor-pointer ${
              transparentMode
                ? 'bg-white text-[#111827] hover:bg-[#FAF9F6]'
                : 'bg-[#010048] text-white hover:bg-[#D94E28]'
            }`}
          >
            Plan Your Trip
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden p-2.5 rounded-full transition-colors cursor-pointer ${
              transparentMode
                ? 'text-white hover:bg-white/15'
                : 'text-[#111827] hover:bg-[#F3F1EC]'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-t border-[#E5E2DC] text-[#111827] px-4 py-5 space-y-2 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? 'bg-[#010048] text-white'
                    : 'text-[#111827] hover:bg-[#F3F1EC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3.5 px-5 rounded-full bg-[#D94E28] text-white text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
