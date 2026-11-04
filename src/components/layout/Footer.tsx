import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Shield, MessageCircle, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { ALL_DESTINATIONS } from '../../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../../data/holidayTypes';
import { CLIENT_ASSETS } from '../../data/stockImages';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  const sitePages = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Holiday Types', href: '/holiday-types' },
    { label: 'Packages', href: '/packages' },
    { label: 'Travel Guide', href: '/travel-guide' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-[#f8fafc] text-slate-700 border-t border-slate-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xs border border-slate-200">
                <img
                  src={CLIENT_ASSETS.logo}
                  alt="365Holidayz Premium Tours and Travel"
                  className="w-full h-full object-contain filter drop-shadow-xs rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  365<span className="text-[#ff5a36]">Holidayz</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold">
                  PREMIUM TOURS AND TRAVEL
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-medium">
              Bespoke international travel specialist combining <strong className="text-slate-900">30+ years of travel expertise</strong> with thoughtfully designed destinations, holiday experiences and personalized travel planning.
            </p>

            <div className="text-xs uppercase tracking-wider text-[#ff5a36] font-bold">
              Your Travel, Our Passion. Your world, expertly curated.
            </div>

            {/* Direct Booking Desk Contacts from client posters (Soft Pastel Mint) */}
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs space-y-2 shadow-2xs">
              <div className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Booking Desk India</span>
              </div>
              <div className="space-y-1 text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href="tel:+918939958899" className="hover:text-emerald-950 font-bold text-slate-900">+91-8939958899</a>
                  <span>/</span>
                  <a href="tel:+919444179215" className="hover:text-emerald-950 font-bold text-slate-900">9444179215</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href="mailto:24x7support@365holidayz.com" className="hover:text-emerald-950 font-medium text-slate-800">
                    24x7support@365holidayz.com
                  </a>
                </div>
                <div className="pt-1">
                  <a
                    href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp (+91 89399 58899) →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Approved 7 Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Quick Pages
            </h4>
            <ul className="space-y-2 text-sm">
              {sitePages.map((page) => (
                <li key={page.href}>
                  <Link
                    to={page.href}
                    className="hover:text-[#ff5a36] text-slate-700 transition-colors font-semibold flex items-center gap-1.5"
                  >
                    <span>{page.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-sm">
              {ALL_DESTINATIONS.slice(0, 6).map((dest) => (
                <li key={dest.id}>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="hover:text-[#ff5a36] text-slate-700 transition-colors flex items-center justify-between font-medium"
                  >
                    <span>{dest.name}</span>
                    <span className="text-[10px] text-slate-400">{dest.region}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/destinations" className="text-xs text-[#ff5a36] hover:underline pt-1 inline-block font-bold">
                  View All Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Signature Holiday Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Holiday Styles
            </h4>
            <ul className="space-y-2 text-sm">
              {ALL_HOLIDAY_TYPES.map((ht) => (
                <li key={ht.id}>
                  <Link
                    to={`/holiday-types/${ht.slug}`}
                    className="hover:text-[#ff5a36] text-slate-700 transition-colors font-medium"
                  >
                    {ht.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-slate-500 font-medium">
                <span className="text-slate-800 font-bold block">MICE & Corporate:</span>
                Custom delegation summits & family celebrations
              </li>
            </ul>
          </div>
        </div>

        {/* Client poster destinations coverage statement */}
        <div className="border-t border-slate-200 pt-6 text-xs text-slate-600 text-center max-w-4xl mx-auto space-y-1 font-medium">
          <p className="font-bold text-slate-800">
            Travel Specialist for Singapore, Malaysia, Thailand, Indonesia, Vietnam, Maldives, Mauritius, Seychelles, Dubai, Turkey, Azerbaijan, Georgia, Jordan, Oman and European Countries.
          </p>
          <p className="text-[11px] text-slate-500">
            In association with <strong>365Eventz</strong> for milestone celebrations, destination weddings & executive corporate retreats.
          </p>
        </div>

        {/* Bottom copyright & legal */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} 365Holidayz. All rights reserved. Your world, expertly curated.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-900 transition-colors">Privacy & Terms</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">Editorial Policy</Link>
            <Link to="/packages" className="hover:text-slate-900 transition-colors">Catalogue Index</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
