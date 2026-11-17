import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { DestinationCard } from '../components/cards/DestinationCard';
import { PackageCard } from '../components/cards/PackageCard';
import { CTASection } from '../components/common/CTASection';
import { ALL_DESTINATIONS } from '../data/destinations';
import { CLIENT_ASSETS, GENERATED_ASSETS } from '../data/stockImages';
import { Package } from '../types';
import { filterActivePackages } from '../services/googleSheetsPackages';

interface HomePageProps {
  packages: Package[];
  packagesLoading: boolean;
  onOpenEnquiry: () => void;
}

const WHY_PILLARS = [
  {
    number: '01',
    title: '30+ Years Experience',
    detail: 'Three decades of firsthand routing across Asia, Indian Ocean islands, Central Asia, the Middle East, and Europe.'
  },
  {
    number: '02',
    title: 'Personalised Holiday Planning',
    detail: 'Every journey is shaped around your travel pace, room sharing needs, dining preferences, and occasion.'
  },
  {
    number: '03',
    title: 'International Destination Expertise',
    detail: 'Verified insights on transfer timings, flight connections, seasonality, and visa lead times before you commit.'
  },
  {
    number: '04',
    title: 'Trusted Global Partnerships',
    detail: 'Longstanding relationships with boutique hoteliers, local ground operators, and licensed private guides.'
  },
  {
    number: '05',
    title: 'Curated Stay Experiences',
    detail: 'Handpicked overwater villas, alpine lodges, and heritage properties vetted for location and service warmth.'
  },
  {
    number: '06',
    title: 'Seamless Trip Coordination',
    detail: 'Private airport pickups, inter-island boats, rail passes, and dietary arrangements timed to the minute.'
  },
  {
    number: '07',
    title: 'Dedicated End-to-End Support',
    detail: 'Direct India booking desk support from your first consultation call until your return home.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  packages,
  packagesLoading,
  onOpenEnquiry
}) => {
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const featuredDestinations = ALL_DESTINATIONS.filter((d) => d.isFeatured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 8);

  const additionalDestinations = ALL_DESTINATIONS.filter((d) => !d.isFeatured);

  const activePackages = filterActivePackages(packages);
  const featuredPackages = (activePackages.filter((p) => p.isFeatured).length > 0
    ? activePackages.filter((p) => p.isFeatured)
    : activePackages
  ).slice(0, 6);

  return (
    <div className="bg-[#FAF9F6]">
      {/* A. Hero Video Slider (88-94% viewport height) */}
      <HeroSlider />

      {/* B. Intro Section: YOUR WORLD, EXPERTLY CURATED. */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              365Holidayz
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.04] text-balance">
              YOUR WORLD, EXPERTLY CURATED.
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              For more than thirty years, we have crafted international holidays defined by unhurried pacing, handpicked properties, and direct personal care—so every mile feels effortless.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E4DC]">
              <img
                src={GENERATED_ASSETS.uzbekistanCulture}
                alt="Travellers exploring Silk Road architecture in Uzbekistan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* C. Why 365Holidayz? Editorial Showcase */}
      <section className="py-20 sm:py-24 bg-[#F3F1EC] border-y border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              Why 365Holidayz
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Three Decades of Travel Wisdom, Applied Personally.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {WHY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="pt-5 border-t border-[#D6D1C7] space-y-2"
              >
                <span className="font-mono-tabular text-xs font-semibold text-[#D94E28]">
                  {pillar.number}
                </span>
                <h3 className="font-display text-lg font-bold text-[#111827]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Featured Destinations (4x2 Grid of Vertical 3:4 Showcase Cards) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              Curated Geography
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
              FEATURED DESTINATIONS
            </h2>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#010048] hover:text-[#D94E28] transition-colors shrink-0"
          >
            <span>Explore All Regions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {/* Expandable More Destinations Grid */}
        {showAllDestinations && additionalDestinations.length > 0 && (
          <div className="pt-4 space-y-6">
            <div className="border-t border-[#E5E2DC] pt-8">
              <h3 className="font-display text-xl font-bold text-[#111827]">
                More Curated Destinations
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllDestinations((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
          >
            <span>{showAllDestinations ? 'SHOW FEWER DESTINATIONS' : 'MORE DESTINATIONS'}</span>
            {showAllDestinations ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </section>

      {/* E. Featured Packages (Active Packages Only) */}
      <section className="py-20 sm:py-28 bg-white border-t border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
                Signature Itineraries
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
                FEATURED PACKAGES
              </h2>
            </div>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#010048] hover:text-[#D94E28] transition-colors shrink-0"
            >
              <span>View All Packages ({activePackages.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[440px] rounded-2xl bg-[#FAF9F6] border border-[#E5E2DC] animate-pulse"
                />
              ))}
            </div>
          ) : featuredPackages.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[#FAF9F6] border border-[#E5E2DC] text-center space-y-3">
              <p className="text-sm font-medium text-[#111827]">
                No active packages are currently published.
              </p>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="text-xs font-semibold uppercase tracking-wider text-[#D94E28] underline cursor-pointer"
              >
                Request a Custom Itinerary
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* F. Client Experiences & Departures */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              Real Departures &amp; Travellers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              CLIENT EXPERIENCES
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              Highlights from our curated seasonal departures, small-group circuits, and signature campaigns.
            </p>
          </div>

          <Link
            to="/happy-clients"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0"
          >
            <span>Happy Clients</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden border border-[#E5E2DC] bg-white">
            <div className="aspect-[3/4] overflow-hidden bg-[#F3F1EC]">
              <img
                src={CLIENT_ASSETS.posterPhilippines}
                alt="365Holidayz Philippines 6 Nights / 7 Days Departure Showcase"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-5 flex items-center justify-between text-xs font-semibold text-[#111827]">
              <span>Philippines &middot; 6N / 7D</span>
              <span className="text-[#6B7280]">Manila · Cebu · Bohol</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E5E2DC] bg-white">
            <div className="aspect-[3/4] overflow-hidden bg-[#F3F1EC]">
              <img
                src={CLIENT_ASSETS.posterTurkiyeGeorgia}
                alt="365Holidayz Türkiye & Georgia Diwali Departures Showcase"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-5 flex items-center justify-between text-xs font-semibold text-[#111827]">
              <span>Türkiye &amp; Georgia</span>
              <span className="text-[#6B7280]">Festival Departures</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E5E2DC] bg-white">
            <div className="aspect-[3/4] overflow-hidden bg-[#F3F1EC]">
              <img
                src={CLIENT_ASSETS.posterSingaporeMalaysia}
                alt="365Holidayz Singapore & Malaysia 5 Days Departure Showcase"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-5 flex items-center justify-between text-xs font-semibold text-[#111827]">
              <span>Singapore &amp; Malaysia</span>
              <span className="text-[#6B7280]">5 Days Twin-City</span>
            </div>
          </div>
        </div>
      </section>

      {/* G. Final CTA Band */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
