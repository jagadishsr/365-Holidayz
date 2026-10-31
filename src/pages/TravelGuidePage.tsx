import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Compass, 
  FileText, 
  Globe, 
  DollarSign, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  ArrowRight,
  Luggage,
  Calendar
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ALL_DESTINATIONS } from '../data/destinations';
import { CTASection } from '../components/common/CTASection';

export const TravelGuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'destinations' | 'tips' | 'itineraries' | 'visa' | 'costs' | 'things-to-do'
  >('destinations');

  const tabs = [
    { id: 'destinations', label: 'Destination Guides', icon: Globe },
    { id: 'tips', label: 'Travel Tips & Etiquette', icon: Compass },
    { id: 'itineraries', label: 'Crafting Your Itinerary', icon: Clock },
    { id: 'visa', label: 'Visa & Consular Essentials', icon: FileText },
    { id: 'costs', label: 'Travel Costs & Currency', icon: DollarSign },
    { id: 'things-to-do', label: 'Things to Do & Seasons', icon: Sparkles }
  ];

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Travel Guide' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Editorial Knowledge Base</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              The 365Holidayz Travel Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Thirty years of on-ground global navigation distilled into thoughtful guides, packing insights, and realistic planning advice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#010048] text-[#f3e098] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Destination Guides */}
        {activeTab === 'destinations' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl font-bold text-[#010048]">Curated Destination Overviews</h2>
              <p className="text-sm text-slate-600">
                Browse our comprehensive geographical guides detailing cultural nuances, optimal length of stay, and verified best seasons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_DESTINATIONS.map((dest) => (
                <div key={dest.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-[#c8a97e] uppercase tracking-wider">{dest.region}</span>
                      <span>{dest.practicalInfo.idealDuration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#010048]">{dest.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{dest.tagline}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Best: {dest.bestTimeToVisit.split('(')[0]}
                    </span>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#010048] hover:text-[#c8a97e]"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 text-[#c8a97e]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Travel Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-8 animate-in fade-in max-w-5xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] block">
                30+ Years of Ground Wisdom
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#010048]">
                Essential Travel Tips & On-Ground Etiquette
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Practical insights earned over three decades of moving travellers smoothly across international borders — curated to ensure your holiday is serene, seamless, and completely stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tip 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    01
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Arrival Rhythm
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  The "Slow First Morning" Principle
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  Never pack back-to-back excursions on Day 1. After international flights or late evening arrivals, we always curate an unhurried morning with breakfast by the pool or lagoon to let your body acclimate naturally before exploring.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    02
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Logistics & Ease
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  Private Chauffeur Seamlessness
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  Navigating unfamiliar mountain curves in Sri Lanka, Bali, or Jordan can cause fatigue. Having a verified private driver allows you to gaze out at tea trails or desert peaks without navigation stress or parking hassles.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    03
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Cultural Respect
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  Cultural Reverence & Dress Codes
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  From the marble courtyards of Muscat’s Grand Mosque to Bali’s sacred sea temples, modest attire (covering shoulders and knees) is essential and appreciated. Keep a lightweight cotton pashmina easily accessible in your day pack.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    04
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Smart Stays
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  Preserving Room Contingency & Split Stays
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  When booking split stays (such as 2N jungle + 3N beach in Bali or 3N Istanbul + 3N Cappadocia), coordinate transfers around standard hotel check-out (11 AM) and check-in (3 PM) with scenic lunch stops along the way.
                </p>
              </div>

              {/* Tip 5 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    05
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Dining Comfort
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  Indian Meals & Dietary Preferences
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  Travelling abroad doesn't mean compromising on food. In all our international circuits (Türkiye, Georgia, Far East, Dubai), we pre-arrange authentic Indian meals, vegetarian cuisine, and Jain options with verified partner restaurants.
                </p>
              </div>

              {/* Tip 6 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#010048] via-[#050454] to-[#010048] border-2 border-[#c59b27]/40 shadow-xl space-y-4 hover:border-[#c59b27] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] flex items-center justify-center font-black text-sm shadow-md">
                    06
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e098] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Connectivity & Forex
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-snug">
                  Forex Card & Dual SIM Security
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  Always carry a pre-loaded multi-currency Forex card along with a small amount of local currency cash for market bazaars and tipping. Install an international eSIM before departure for seamless WhatsApp connectivity.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Itineraries */}
        {activeTab === 'itineraries' && (
          <div className="space-y-6 animate-in fade-in max-w-4xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#010048]">Itinerary Curation Philosophy</h2>
              <p className="text-sm text-slate-600">
                Why bespoke itineraries differ from rigid off-the-shelf tourist schedules.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-[#010048]">Our Three Golden Rules of Route Design</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#c8a97e] shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-slate-900 block">Depth Over Checklists:</strong>
                    Spending 3 immersive nights in one evocative region (like Cappadocia or Ubud) is infinitely more restorative than switching hotels every 24 hours.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#c8a97e] shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-slate-900 block">Golden Hour Optimization:</strong>
                    We sequence iconic outdoor monuments (such as Petra’s Treasury or Sigiriya Lion Rock) at sunrise or late afternoon, avoiding peak heat and cruise day-trippers.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#c8a97e] shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-slate-900 block">Buffer Time For Spontaneity:</strong>
                    Unplanned moments — an unexpected tea stall conversation or lingering over a second cup of Turkish coffee — often become the journey’s most cherished memory.
                  </div>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#010048] hover:text-[#c8a97e]"
                >
                  <span>Explore verified itineraries across 33 packages</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c8a97e]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Visa & Essentials (strictly per brief: "Use 'Content coming soon' rather than inventing visa/current travel facts") */}
        {activeTab === 'visa' && (
          <div className="space-y-6 animate-in fade-in max-w-3xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#010048]">Visa & Consular Essentials</h2>
              <p className="text-sm text-slate-600">
                Official regulatory guidance and documentation requirements.
              </p>
            </div>

            {/* Prompt Constraint Adherence Notice */}
            <div className="p-8 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950 space-y-4">
              <div className="flex items-center gap-2 font-bold text-base text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <span>Live Consular Guidelines — Content Coming Soon</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
                Visa policies, electronic travel authorizations (ETA), and entry protocols vary significantly by citizenship, origin port, and dynamic consular bilateral treaties.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
                To protect our travellers against outdated embassy rules, 365Holidayz provides personalized, verified consular checklists directly upon itinerary planning rather than displaying static claims.
              </p>

              <div className="pt-3 border-t border-amber-200 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/plan-your-trip"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#010048] text-[#f3e098] text-xs font-bold uppercase tracking-wider"
                >
                  <span>Request Custom Visa Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-white text-slate-800 text-xs font-semibold border border-amber-300"
                >
                  <span>Speak with Senior Concierge</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Travel Costs */}
        {activeTab === 'costs' && (
          <div className="space-y-6 animate-in fade-in max-w-4xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#010048]">Travel Costs, Currencies & Commercial Transparency</h2>
              <p className="text-sm text-slate-600">
                Clear understanding of pricing bases, seasonal peaks, and local expenditure expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-[#010048]">Preserving Original Currencies</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In our catalogue, prices are displayed strictly in their contract currency (INR, USD, EUR, SGD) without synthetic conversion algorithms that misrepresent market exchange variations.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-[#010048]">Room Sharing Basis</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Unless explicitly noted as twin sharing (such as our Jordan circuit) or single supplement, package rates reflect double sharing occupancy.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-[#010048]">Group Minimum Thresholds</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Selected specialized packages require minimum delegate sizes (e.g., 4 Pax for safari vehicles, or 20/30 Pax for corporate summits in Dubai or Bahrain) to unlock published group rates.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-[#010048]">Local City & Tourism Levies</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Certain municipalities (e.g. Dubai Tourism Dirham, Malaysia Tourism Tax, Bali Provincial Tax) mandate direct guest payment in local currency upon hotel checkout. We disclose these transparently prior to departure.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Things to Do */}
        {activeTab === 'things-to-do' && (
          <div className="space-y-6 animate-in fade-in max-w-4xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#010048]">Curated Highlights & Seasonal Wonders</h2>
              <p className="text-sm text-slate-600">
                Memorable experiences from the desert to the ocean across our 17 destinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c8a97e] block">
                  Island Sanctuaries
                </span>
                <h4 className="text-base font-bold text-[#010048]">Lagoon Plunge & Reefs</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manta ray encounters in Maldives atolls, catamaran sailing in Mauritius, and granite boulder walks in Seychelles.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c8a97e] block">
                  Imperial & Desert
                </span>
                <h4 className="text-base font-bold text-[#010048]">Bosphorus & Rose Cliffs</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Private sunset cruises in Istanbul, ballooning over Cappadocia, and walking through the narrow Siq to Petra.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c8a97e] block">
                  Caucasus & Far East
                </span>
                <h4 className="text-base font-bold text-[#010048]">Qvevri Wine & Karsts</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  8,000-year winemaking heritage in Georgia, Ha Long Bay overnight junk cruises, and Ubud stepped terraces.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <CTASection />
    </div>
  );
};
