import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Compass, Sparkles, ShieldCheck, Headphones } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { DestinationCard } from '../components/cards/DestinationCard';
import { CTASection } from '../components/common/CTASection';
import { GENERATED_ASSETS, HAPPY_CLIENT_STORIES } from '../data/stockImages';
import { Destination, Package } from '../types';
import {
  filterActivePackages,
  getPublishedDestinations
} from '../services/googleSheetsPackages';

interface HomePageProps {
  packages: Package[];
  onOpenEnquiry: () => void;
}

const WHY_365_PILLARS = [
  {
    icon: Compass,
    accent: true,
    title: '30+ Years On-Ground Expertise',
    blurb:
      'Decades of firsthand international routing across Asia, Indian Ocean islands, the Middle East, and emerging destinations.'
  },
  {
    icon: Sparkles,
    accent: false,
    title: 'Handpicked Stays & Personal Pacing',
    blurb:
      'Every overwater villa, mountain lodge, and city stay is tailored around your party size, dining needs, and rhythm.'
  },
  {
    icon: ShieldCheck,
    accent: false,
    title: 'Transparent INR Pricing & Vetted Partners',
    blurb:
      'Direct partnerships with trusted local chauffeurs and guides with clear pricing free from hidden surprise surcharges.'
  },
  {
    icon: Headphones,
    accent: true,
    title: 'Dedicated Gate-to-Gate India Desk',
    blurb:
      'Seamless end-to-end trip coordination with responsive real-human concierge support from planning until return home.'
  }
];

function getLowestInrLabel(dest: Destination, activePackages: Package[]): string | undefined {
  const matches = activePackages.filter(
    (p) =>
      p.destinationSlug === dest.slug ||
      p.destination.toLowerCase().includes(dest.name.toLowerCase())
  );
  if (matches.length === 0) return undefined;

  const lowest = matches.reduce((min, pkg) => {
    const val = pkg.inrPrice || pkg.priceValue;
    return val > 0 && val < min ? val : min;
  }, Number.POSITIVE_INFINITY);

  if (!Number.isFinite(lowest) || lowest <= 0) return undefined;
  return `₹${Math.round(lowest).toLocaleString('en-IN')}`;
}

export const HomePage: React.FC<HomePageProps> = ({ packages, onOpenEnquiry }) => {
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const activePackages = useMemo(() => filterActivePackages(packages), [packages]);
  const publishedDestinations = useMemo(
    () => getPublishedDestinations(activePackages),
    [activePackages]
  );

  const featuredDestinations = useMemo(() => {
    const preferredFeatured = publishedDestinations
      .filter((d) => d.isFeatured)
      .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
    if (preferredFeatured.length >= 8) return preferredFeatured.slice(0, 8);
    const remaining = publishedDestinations.filter(
      (d) => !preferredFeatured.some((f) => f.slug === d.slug)
    );
    return [...preferredFeatured, ...remaining].slice(0, 8);
  }, [publishedDestinations]);

  const additionalDestinations = useMemo(
    () =>
      publishedDestinations.filter(
        (d) => !featuredDestinations.some((f) => f.slug === d.slug)
      ),
    [publishedDestinations, featuredDestinations]
  );

  return (
    <div className="bg-[#FAF9F6]">
      {/* A. Cinematic Hero Video Slider (Title, Subtitle & CTA Button Only) */}
      <HeroSlider />

      {/* B. Intro Section with Southeast Asia Visual */}
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
              For over three decades, we have designed international holidays defined by unhurried pacing, handpicked properties, and direct personal care across Southeast Asia, Indian Ocean sanctuaries, and beyond.
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E4DC] shadow-sm">
              <img
                src={GENERATED_ASSETS.introSeAsia}
                alt="Limestone karst cliffs and longtail boat in Southeast Asia at sunset"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* C. Why 365Holidayz? — 4 Bold Pillars in 2x2 Grid with 3D Icons */}
      <section className="py-20 sm:py-28 bg-[#F3F1EC] border-y border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              Why 365Holidayz
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
              Bigger Care. Simpler Planning.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {WHY_365_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E2DC] flex items-start gap-6 sm:gap-7 shadow-xs hover:border-[#010048]/30 transition-colors"
                >
                  {/* Sculpted 3D Icon Container */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 flex items-center justify-center ${
                      pillar.accent
                        ? 'icon-3d-badge-accent text-white'
                        : 'icon-3d-badge text-[#010048]'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.9]" />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {pillar.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* D. Featured Destinations (4x2 Grid with Condensed Bottom-Right Starting Price) */}
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
            <DestinationCard
              key={dest.id}
              destination={dest}
              startingPrice={getLowestInrLabel(dest, activePackages)}
            />
          ))}
        </div>

        {showAllDestinations && additionalDestinations.length > 0 && (
          <div className="pt-4 space-y-6">
            <div className="border-t border-[#E5E2DC] pt-8">
              <h3 className="font-display text-xl font-bold text-[#111827]">
                More Curated Destinations
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  startingPrice={getLowestInrLabel(dest, activePackages)}
                />
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

      {/* E. Happy Clients Experiences (Generic Tour Photography & Guest Shares) */}
      <section className="py-20 sm:py-28 bg-white border-t border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
                Traveller Stories
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
                HAPPY CLIENTS
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563]">
                Real moments and experiences shared by families, couples, and groups travelling across our international circuits.
              </p>
            </div>

            <Link
              to="/happy-clients"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0"
            >
              <span>Explore Client Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HAPPY_CLIENT_STORIES.map((story) => (
              <article
                key={story.id}
                className="rounded-2xl overflow-hidden border border-[#E5E2DC] bg-[#FAF9F6] flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                  <img
                    src={story.image}
                    alt={`${story.traveller} in ${story.destination}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm sm:text-base text-[#111827] leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-[#E5E2DC] space-y-0.5">
                    <p className="font-display text-sm font-bold text-[#010048]">
                      {story.traveller}
                    </p>
                    <p className="text-xs font-medium text-[#6B7280]">
                      {story.destination} &middot; {story.duration}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* F. Final CTA Band */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
