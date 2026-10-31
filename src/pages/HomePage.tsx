import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Heart, Shield, Users, Sparkles, Clock, Calendar, Phone, MessageCircle, Star, CheckCircle2, Search, Play } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ALL_PACKAGES } from '../data/packages';
import { ALL_DESTINATIONS } from '../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { CLIENT_ASSETS } from '../data/stockImages';
import { DESTINATION_VIDEOS, DestinationVideo } from '../data/destinationVideos';
import { PackageCard } from '../components/cards/PackageCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { HolidayTypeCard } from '../components/cards/HolidayTypeCard';
import { CTASection } from '../components/common/CTASection';
import { VideoModal } from '../components/common/VideoModal';

interface HomePageProps {
  onOpenEnquiry?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const [activeVideo, setActiveVideo] = useState<DestinationVideo | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const featuredPackages = ALL_PACKAGES.filter((p) => p.isFeatured).slice(0, 6);
  const featuredDestinations = ALL_DESTINATIONS.filter((d) => d.isFeatured);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenEnquiry) onOpenEnquiry();
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Full-Screen Hero Slider with Curated Stock Photography */}
      <HeroSlider onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Customer Search Bar -> Pops up Enquiry Form on Click or Enter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-[#c59b27]/40">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-11 h-11 rounded-xl bg-[#010048] text-[#f3e098] flex items-center justify-center shrink-0 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c59b27] block">
                  Find Your Dream Holiday
                </span>
                <span className="text-sm font-black text-[#010048]">
                  Search International Destinations & Packages
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  placeholder="Where do you want to travel? (e.g. Maldives, Bali, Türkiye...)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c59b27] bg-slate-50/70 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer shrink-0"
              >
                Search & Enquire
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Special Festive / Client Departures Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-gradient-to-r from-[#010048] via-[#080562] to-[#010048] rounded-2xl p-6 sm:p-8 border-2 border-[#c59b27]/40 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#c9182b] text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
                  Special Departures
                </span>
                <span className="text-xs text-[#f3e098] font-bold">
                  Your Trusted Partner in Travel
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Best All-Inclusive International Packages
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Return Flights • Visa Facilitation • Indian Meals • Handpicked Stays • Sightseeing with Local Transport • Hindi Speaking Tour Guides
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              <a
                href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                title="Direct WhatsApp chat with 365Holidayz (+91 89399 58899)"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+918939958899"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 text-[#010048]" />
                <span>Call +91-8939958899</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client Poster Specials Showcase (Philippines, Türkiye & Georgia, Singapore & Malaysia) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#c59b27] text-[#c59b27]" />
              <span>Official 365Holidayz Editions</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#010048] tracking-tight">
              Spotlight Client Departures & Offers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Curated directly from our latest official marketing editions with all prices displayed in INR (₹): Philippines island retreats, Diwali departures for Türkiye & Georgia, and Singapore-Malaysia twin city specials.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#010048] hover:text-[#c59b27] transition-colors shrink-0"
          >
            <span>Explore All 33 Packages</span>
            <ArrowRight className="w-4 h-4 text-[#c59b27]" />
          </Link>
        </div>

        {/* 3 Interactive Poster Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster 1: Philippines */}
          <div className="rounded-2xl bg-white border border-[#c59b27]/30 shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterPhilippines}
                alt="Philippines 6N/7D Tropical Vibes Bigger Dreams Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#010048]/90 border border-[#c59b27]/50 text-[#f3e098] px-2.5 py-1 rounded text-xs font-black uppercase shadow-md">
                ₹59,999 PP • 6N / 7D
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27]">
                  Manila • Cebu • Bohol
                </span>
                <h3 className="text-lg font-black text-[#010048]">
                  Philippines: Tropical Vibes, Bigger Dreams
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Oslob whale shark encounter, Moalboal sardine run, Kawasan falls adventure, Bohol Chocolate Hills, and Tagaytay volcano view.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">For 6 Pax • Double Sharing</span>
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="px-3.5 py-1.5 rounded bg-[#010048] hover:bg-[#080562] text-[#f3e098] text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>

          {/* Poster 2: Türkiye & Georgia */}
          <div className="rounded-2xl bg-white border border-[#c59b27]/30 shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterTurkiyeGeorgia}
                alt="Türkiye and Georgia Special Departures Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#c9182b] text-white px-2.5 py-1 rounded text-xs font-black uppercase shadow-md">
                Diwali Special Departures
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27]">
                  Istanbul • Cappadocia • Tbilisi • Batumi
                </span>
                <h3 className="text-lg font-black text-[#010048]">
                  Türkiye & Georgia Grand Circuit
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  All-inclusive flights, visa, Indian meals, 4-star stays, Bosphorus cruise, and Kazbegi Caucasus mountain excursions.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Departures Nov 2026</span>
                <Link
                  to="/packages?destination=Istanbul+%26+Turkey"
                  className="px-3.5 py-1.5 rounded bg-[#010048] hover:bg-[#080562] text-[#f3e098] text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>

          {/* Poster 3: Singapore + Malaysia */}
          <div className="rounded-2xl bg-white border border-[#c59b27]/30 shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterSingaporeMalaysia}
                alt="Singapore and Malaysia 5 Days Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#c59b27] text-[#010048] px-2.5 py-1 rounded text-xs font-black uppercase shadow-md">
                ₹31,500/- PP • 5 Days
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27]">
                  Singapore • Genting • Kuala Lumpur
                </span>
                <h3 className="text-lg font-black text-[#010048]">
                  Singapore + Malaysia In 5 Days
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Hotel Boss Singapore, Ramada Encore Chinatown KL, Night Safari with dinner, Sentosa Cable Car & Wings of Time, Genting Cable Car.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Unbeatable Package Rate</span>
                <Link
                  to="/packages/pkg-12"
                  className="px-3.5 py-1.5 rounded bg-[#010048] hover:bg-[#080562] text-[#f3e098] text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  View Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Holiday Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Curated Travel Rhythms</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#010048] tracking-tight">
              Signature Holiday Types
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every traveller journeys with a distinct pulse. Explore our five signature categories, sculpted around your aspirations and pace.
            </p>
          </div>

          <Link
            to="/holiday-types"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#010048] hover:text-[#c59b27] transition-colors shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-[#c59b27]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ALL_HOLIDAY_TYPES.slice(0, 3).map((ht) => (
            <HolidayTypeCard
              key={ht.id}
              holidayType={ht}
              onWatchVideo={(vid) => setActiveVideo(vid)}
            />
          ))}
          {ALL_HOLIDAY_TYPES.slice(3, 5).map((ht) => (
            <HolidayTypeCard
              key={ht.id}
              holidayType={ht}
              className="md:col-span-1 lg:col-span-1.5"
              onWatchVideo={(vid) => setActiveVideo(vid)}
            />
          ))}
        </div>
      </section>

      {/* 4. Featured Destinations */}
      <section className="bg-[#f4f1ea]/70 py-16 sm:py-20 border-y border-[#c59b27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-300 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Handpicked Geographical Sanctuaries</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#010048] tracking-tight">
                Featured Destinations
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Prioritised for their evocative storytelling, architectural splendour, and bespoke luxury hospitality.
              </p>
            </div>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#010048] hover:text-[#c59b27] transition-colors shrink-0"
            >
              <span>Explore All 17 Destinations</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Verified Client Catalogue</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#010048] tracking-tight">
              Featured Travel Packages
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Curated journeys with transparent inclusions, verified stay details, and authentic regional pricing from our client master sheet.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#010048] hover:text-[#c59b27] transition-colors shrink-0"
          >
            <span>View All 33 Packages</span>
            <ArrowRight className="w-4 h-4 text-[#c59b27]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 6. Why 365Holidayz (30+ Years Expertise) */}
      <section className="bg-gradient-to-br from-[#010048] via-[#080562] to-[#000032] text-white py-16 sm:py-20 border-y border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098]">
              Legacy of Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Why Discerning Travellers Choose 365Holidayz
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We do not mass-produce generic itineraries. We combine thirty years of hands-on global expertise with meticulous, personalised curation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 hover:border-[#c59b27]/60 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 flex items-center justify-center text-[#f3e098]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">30+ Years Travel Expertise</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded on three decades of seasoned international navigation, trusted destination partnerships, and deep logistical acumen.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 hover:border-[#c59b27]/60 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 flex items-center justify-center text-[#f3e098]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Personalised Planning</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every journey is shaped by a human senior travel specialist who listens to your travel rhythm, family ages, and bespoke desires.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 hover:border-[#c59b27]/60 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 flex items-center justify-center text-[#f3e098]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Curated Experiences</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                From private Bosphorus yachts to Bedouin starlit camps, we prioritize immersive moments that transcend cookie-cutter tour buses.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 hover:border-[#c59b27]/60 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 flex items-center justify-center text-[#f3e098]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Dedicated Expert Support</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Continuous reassurance from departure to return. Our concierge desk ensures smooth handoffs, private chauffeurs, and verified hotel reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Traveller Stories (Strictly marked pending verified client testimonials per brief) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
            Traveller Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#010048] tracking-tight">
            Traveller Stories & Reflections
          </h2>
        </div>

        <div className="p-8 sm:p-10 rounded-xl bg-[#f4f1ea] border border-dashed border-[#c59b27]/40 text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-[#c59b27] shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">
              Verified Client Testimonials Currently Pending Onboarding
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              In accordance with our editorial integrity standard, 365Holidayz does not publish fabricated or AI-generated testimonials. Real client stories and verified post-journey photographs will be published upon guest privacy authorization.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/about"
              className="text-xs font-bold text-[#010048] hover:text-[#c59b27] underline underline-offset-4"
            >
              Learn about our 30+ year founder journey →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Plan My Trip CTA Band */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />

      {/* Video Preview Modal */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onOpenEnquiry={onOpenEnquiry}
        />
      )}
    </div>
  );
};
