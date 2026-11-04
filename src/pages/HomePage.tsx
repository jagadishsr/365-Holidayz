import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Heart,
  Shield,
  Users,
  Sparkles,
  Clock,
  Calendar,
  Phone,
  MessageCircle,
  Star,
  CheckCircle2,
  Search,
  Play,
  Flame,
  Award,
  UtensilsCrossed,
  Headphones,
  Check
} from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ALL_PACKAGES } from '../data/packages';
import { ALL_DESTINATIONS } from '../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { CLIENT_ASSETS } from '../data/stockImages';
import { DESTINATION_VIDEOS, DestinationVideo } from '../data/destinationVideos';
import { PackageCard } from '../components/cards/PackageCard';
import { HolidayTypeCard } from '../components/cards/HolidayTypeCard';
import { VideoModal } from '../components/common/VideoModal';

interface HomePageProps {
  onOpenEnquiry?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<DestinationVideo | null>(null);

  // Search Widget State
  const [searchDestination, setSearchDestination] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchHolidayType, setSearchHolidayType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  const featuredPackages = ALL_PACKAGES.filter((p) => p.isFeatured).slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else {
      navigate('/packages');
    }
  };

  // Quick category tiles in soft pastel colors
  const quickCategories = [
    {
      label: 'Island Holidays',
      sub: 'Maldives, Bali, Mauritius',
      icon: '🏝️',
      color: 'bg-[#f0f9ff] border-sky-200 text-[#0369a1] hover:bg-sky-100',
      link: '/packages?region=Islands'
    },
    {
      label: 'Diwali Departures',
      sub: 'Türkiye, Georgia, Far East',
      icon: '🪔',
      color: 'bg-[#fff1f2] border-rose-200 text-[#9f1239] hover:bg-rose-100',
      link: '/packages?urgent=true'
    },
    {
      label: 'Honeymoon Specials',
      sub: 'Overwater & Beach Villas',
      icon: '💑',
      color: 'bg-[#faf5ff] border-purple-200 text-[#6b21a8] hover:bg-purple-100',
      link: '/packages?holidayType=Honeymoon'
    },
    {
      label: 'Family & Group Tours',
      sub: 'Singapore, Malaysia, Sri Lanka',
      icon: '👨‍👩‍👧',
      color: 'bg-[#f0fdf4] border-emerald-200 text-[#15803d] hover:bg-emerald-100',
      link: '/packages?holidayType=Family+%26+Group'
    },
    {
      label: 'Adventure Circuits',
      sub: 'Cappadocia, Kazbegi, Sigiriya',
      icon: '🏔️',
      color: 'bg-[#fefce8] border-yellow-200 text-[#854d0e] hover:bg-yellow-100',
      link: '/packages?holidayType=Adventure'
    },
    {
      label: 'Twin City Escapes',
      sub: 'Singapore + Malaysia 5D',
      icon: '✈️',
      color: 'bg-[#fff7ed] border-orange-200 text-[#c2410c] hover:bg-orange-100',
      link: '/packages/pkg-12'
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-20 bg-[#f8fafc]">
      {/* 1. Full-Screen Bright Hero Slider */}
      <HeroSlider onOpenEnquiry={onOpenEnquiry} />

      {/* 2. GT Holidays Style Simple & Bold Holiday Search Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-12 sm:-mt-16">
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-slate-200/90">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a36] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Plan Your International Vacation
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Instant Pricing in INR (₹) · 100% Tailor-Made
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Field 1: Destination */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Destination
              </label>
              <select
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
              >
                <option value="">Where to? (All Destinations)</option>
                <option value="Maldives">Maldives</option>
                <option value="Bali">Bali (Indonesia)</option>
                <option value="Philippines">Philippines (Tropical Special)</option>
                <option value="Singapore & Malaysia">Singapore + Malaysia</option>
                <option value="Türkiye & Georgia">Türkiye & Georgia (Diwali)</option>
                <option value="Dubai">Dubai & UAE</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Europe">European Countries</option>
              </select>
            </div>

            {/* Field 2: Month / Departure */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Month of Travel
              </label>
              <select
                value={searchMonth}
                onChange={(e) => setSearchMonth(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
              >
                <option value="">Anytime</option>
                <option value="Nov 2026">November 2026 (Diwali)</option>
                <option value="Dec 2026">December 2026 (Winter)</option>
                <option value="Jan 2027">January 2027 (New Year)</option>
                <option value="Feb-Apr 2027">Spring / Summer 2027</option>
              </select>
            </div>

            {/* Field 3: Holiday Style */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Holiday Style
              </label>
              <select
                value={searchHolidayType}
                onChange={(e) => setSearchHolidayType(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
              >
                <option value="">All Styles</option>
                <option value="Honeymoon">Honeymoon & Romance</option>
                <option value="Family & Group">Family & Group</option>
                <option value="Adventure">Adventure & Explorer</option>
                <option value="Luxury Escapes">Curated Luxury</option>
                <option value="Women Solo">Women Solo Journeys</option>
              </select>
            </div>

            {/* Field 4: Budget Range */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Budget / Person
              </label>
              <select
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
              >
                <option value="">Any Budget</option>
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                <option value="₹2,00,000+">₹2,00,000+ (Ultra Luxury)</option>
              </select>
            </div>

            {/* Search Button (Bold GT Holidays Style) */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Holidays</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Quick Category Tiles in Soft Pastel Colors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 shadow-2xs flex flex-col justify-between space-y-2 group ${cat.color}`}
            >
              <div className="text-2xl">{cat.icon}</div>
              <div>
                <h4 className="text-xs sm:text-sm font-black leading-tight group-hover:underline">
                  {cat.label}
                </h4>
                <p className="text-[11px] opacity-80 line-clamp-1 mt-0.5 font-medium">
                  {cat.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Spotlight Special Client Departures (Philippines, Türkiye & Georgia, Singapore & Malaysia) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fff1f2] border border-rose-200 text-xs font-bold text-rose-800 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Spotlight Client Specials</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured International Departures
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
              Curated directly from 365Holidayz marketing editions with flights, verified Indian meals, 4-star stays, and guided local tours.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff5a36] hover:underline shrink-0"
          >
            <span>View All 33 Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Simple & Bold Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Philippines */}
          <div className="rounded-3xl bg-white border-2 border-sky-200/80 shadow-md overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterPhilippines}
                alt="Philippines 6N/7D Tropical Vibes Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/95 text-slate-900 px-3 py-1 rounded-full text-xs font-black uppercase shadow-md border border-slate-200">
                ₹59,999 PP · 6N / 7D
              </div>
              <div className="absolute top-3 right-3 bg-[#ff5a36] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                For 6 Pax
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#f0f9ff]/40">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0369a1]">
                  Manila • Cebu • Bohol
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Philippines: Tropical Vibes, Bigger Dreams
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                  Oslob whale sharks, Kawasan falls adventure, Bohol Chocolate Hills, and Tagaytay volcano views.
                </p>
              </div>

              <div className="pt-3 border-t border-sky-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Double Sharing</span>
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="px-4 py-2 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white text-xs font-extrabold uppercase tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Türkiye & Georgia */}
          <div className="rounded-3xl bg-white border-2 border-rose-200/80 shadow-md overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterTurkiyeGeorgia}
                alt="Türkiye and Georgia Special Departures Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#ff5a36] text-white px-3 py-1 rounded-full text-xs font-black uppercase shadow-md">
                Diwali Special Departures
              </div>
              <div className="absolute top-3 right-3 bg-white/95 text-slate-900 px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                Fixed Dates
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#fff1f2]/30">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                  Istanbul • Cappadocia • Tbilisi • Batumi
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Türkiye & Georgia Grand Circuit
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                  All-inclusive flights, visa, Indian meals, 4-star stays, Bosphorus cruise, and Kazbegi Caucasus mountain excursions.
                </p>
              </div>

              <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Departures Nov 2026</span>
                <Link
                  to="/packages?destination=Istanbul+%26+Turkey"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wide transition-all shadow-xs"
                >
                  View Circuit
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Singapore + Malaysia */}
          <div className="rounded-3xl bg-white border-2 border-orange-200/80 shadow-md overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
              <img
                src={CLIENT_ASSETS.posterSingaporeMalaysia}
                alt="Singapore and Malaysia 5 Days Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/95 text-slate-900 px-3 py-1 rounded-full text-xs font-black uppercase shadow-md border border-slate-200">
                ₹31,500/- PP · 5 Days
              </div>
              <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                Min 4 Pax
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#fff7ed]/40">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c2410c]">
                  Singapore • Genting • Kuala Lumpur
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Singapore + Malaysia In 5 Days
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                  Hotel Boss Singapore, Ramada Encore Chinatown KL, Night Safari with dinner, Sentosa Cable Car & Genting Cable Car.
                </p>
              </div>

              <div className="pt-3 border-t border-orange-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Best Value Tour</span>
                <Link
                  to="/packages/pkg-12"
                  className="px-4 py-2 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white text-xs font-extrabold uppercase tracking-wide transition-all shadow-xs"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending International Holiday Packages (GT Holidays Style Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5a36]">
              Handcrafted International Holidays
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trending Holiday Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              Transparent per-person pricing in INR (₹) with guaranteed 4-star stays, curated daily sightseeing, and verified chauffeur travel.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff5a36] hover:underline shrink-0"
          >
            <span>Explore All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onOpenEnquiry={onOpenEnquiry} />
          ))}
        </div>
      </section>

      {/* 6. Signature Holiday Types with 1-Min Video Reels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Travel Styles & Video Tours
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Signature Holiday Types
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              Click "1-Min Video" on any card below to experience a 60-second high-definition preview of our signature itineraries.
            </p>
          </div>

          <Link
            to="/holiday-types"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff5a36] hover:underline shrink-0"
          >
            <span>View All Themes</span>
            <ArrowRight className="w-4 h-4" />
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

      {/* 7. Why Discerning Travellers Choose 365Holidayz (GT Holidays Trust Elements) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#ff5a36]">
              Trusted By Thousands of Indian Travellers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Why Book Your Holiday With 365Holidayz?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              We eliminate the uncertainty from international vacations with verified logistics, dedicated on-ground concierge, and authentic culinary care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Trust 1 (Pastel Sky) */}
            <div className="p-6 rounded-2xl bg-[#f0f9ff] border border-sky-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                30+ Years Tour Heritage
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Pioneered by founder Aameena with three decades of direct destination relationships and international ground credibility.
              </p>
            </div>

            {/* Trust 2 (Pastel Mint) */}
            <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-emerald-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-sm">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Indian & Veg Meals Guaranteed
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Never worry about food abroad. We pre-coordinate authentic Indian, Jain, and vegetarian meals on every international circuit.
              </p>
            </div>

            {/* Trust 3 (Pastel Peach) */}
            <div className="p-6 rounded-2xl bg-[#fff7ed] border border-orange-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ff5a36] text-white flex items-center justify-center font-black shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                100% Customized Itineraries
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Modify room nights, add private chauffeur excursions, upgrade villas, and travel strictly at your preferred pace.
              </p>
            </div>

            {/* Trust 4 (Pastel Lavender) */}
            <div className="p-6 rounded-2xl bg-[#faf5ff] border border-purple-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                24x7 India Concierge Support
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Round-the-clock telephone and WhatsApp support before departure, at immigration, and throughout your overseas stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Direct Consultation Banner (Pastel Mint) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0fdf4] rounded-3xl p-8 sm:p-12 border-2 border-emerald-200 text-slate-900 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Need Instant Itinerary Advice?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Speak Directly With Our Senior Travel Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Call <strong>+91-8939958899 / 9444179215</strong> or message us on WhatsApp for fast customized quotes, seat availability, and visa guidance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <a
              href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Contact Desk</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 1-Minute Destination Video Player Modal */}
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
