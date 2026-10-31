import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Shield, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import { ALL_DESTINATIONS } from '../../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../../data/holidayTypes';
import { CLIENT_ASSETS } from '../../data/stockImages';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-[#010048] text-slate-300 border-t border-[#c59b27]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={CLIENT_ASSETS.logo}
                  alt="365Holidayz Premium Tours and Travel"
                  className="w-full h-full object-contain filter drop-shadow-md rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  365Holidayz
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#f3e098] font-bold">
                  PREMIUM TOURS AND TRAVEL
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Bespoke, curated travel specialist combining <strong className="text-white">30+ years of travel expertise</strong> with thoughtfully designed destinations, holiday experiences and personalised travel planning.
            </p>

            <div className="text-xs uppercase tracking-widest text-[#f3e098] font-bold">
              Your Travel, Our Passion. Your world, expertly curated.
            </div>

            {/* Direct Booking Desk Contacts from client posters */}
            <div className="p-4 rounded-xl bg-[#000032] border border-[#c59b27]/30 text-xs space-y-2 shadow-lg">
              <div className="font-bold text-[#f3e098] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Booking Desk India</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <a href="tel:+918939958899" className="hover:text-white font-semibold">+91-8939958899</a>
                  <span>/</span>
                  <a href="tel:+919444179215" className="hover:text-white font-semibold">9444179215</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <a href="mailto:24x7support@365holidayz.com" className="hover:text-white">
                    24x7support@365holidayz.com
                  </a>
                </div>
                <div className="pt-1">
                  <a
                    href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp (+91 89399 58899) →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Approved Nav & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f3e098]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/holiday-types" className="hover:text-white transition-colors">Holiday Types</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors">Packages Catalogue</Link>
              </li>
              <li>
                <Link to="/travel-guide" className="hover:text-white transition-colors">Travel Guide</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About & Founder Story</Link>
              </li>
              <li>
                <Link to="/plan-your-trip" className="text-[#f3e098] font-semibold hover:underline">Plan Your Trip</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f3e098]">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm">
              {ALL_DESTINATIONS.slice(0, 6).map((dest) => (
                <li key={dest.id}>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{dest.name}</span>
                    {dest.isInspirationOnly && (
                      <span className="text-[10px] text-amber-400">Inspiration</span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/destinations" className="text-xs text-[#f3e098] hover:underline pt-1 inline-block font-semibold">
                  View All 17 Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Signature Holiday Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f3e098]">
              Holiday Types
            </h4>
            <ul className="space-y-2 text-sm">
              {ALL_HOLIDAY_TYPES.map((ht) => (
                <li key={ht.id}>
                  <Link
                    to={`/holiday-types/${ht.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {ht.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-slate-400">
                <span className="text-slate-300 font-semibold block">MICE & Corporate:</span>
                Executive delegations & summits
              </li>
            </ul>
          </div>
        </div>

        {/* Client poster destinations coverage statement */}
        <div className="border-t border-white/10 pt-6 text-xs text-slate-400 text-center max-w-4xl mx-auto space-y-1">
          <p className="font-semibold text-slate-300">
            Travel Specialist for Singapore, Malaysia, Thailand, Indonesia, Vietnam, Maldives, Mauritius, Seychelles, Dubai, Turkey, Azerbaijan, Georgia, Jordan, Oman and European Countries.
          </p>
          <p className="text-[11px] text-slate-500">
            In association with <strong>365Eventz</strong> for milestone celebrations, destination weddings & executive corporate retreats.
          </p>
        </div>

        {/* Bottom copyright & legal */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} 365Holidayz. All rights reserved. Your world, expertly curated.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy & Terms</Link>
            <Link to="/about" className="hover:text-white transition-colors">Editorial Policy</Link>
            <Link to="/packages" className="hover:text-white transition-colors">Catalogue Index</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
