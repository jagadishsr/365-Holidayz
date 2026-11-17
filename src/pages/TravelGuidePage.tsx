import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { DESTINATION_STOCK_IMAGES } from '../data/stockImages';
import { resolveStockImage } from '../components/common/ImagePlaceholder';
import { CTASection } from '../components/common/CTASection';
import { Package } from '../types';
import {
  filterActivePackages,
  getPublishedDestinations
} from '../services/googleSheetsPackages';

interface TravelGuidePageProps {
  packages: Package[];
}

export const TravelGuidePage: React.FC<TravelGuidePageProps> = ({ packages }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const activePackages = filterActivePackages(packages);
  const publishedDestinations = getPublishedDestinations(activePackages);

  const regions = ['All', ...Array.from(new Set(publishedDestinations.map((d) => d.region)))];

  const visibleDestinations =
    selectedRegion === 'All'
      ? publishedDestinations
      : publishedDestinations.filter((d) => d.region === selectedRegion);

  return (
    <div className="bg-[#FAF9F6] pt-28 sm:pt-36">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 space-y-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D94E28] block">
          Editorial Compendium
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827]">
          TRAVEL GUIDE
        </h1>
        <p className="text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
          Thirty years of destination knowledge distilled into clear seasonal guidance, cultural notes, and curated itineraries.
        </p>

        {/* Clean Region Tabs */}
        <div className="pt-6 flex items-center gap-3 overflow-x-auto scrollbar-none border-b border-[#E5E2DC] pb-4">
          {regions.map((region) => {
            const active = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#010048] text-white'
                    : 'bg-white border border-[#E5E2DC] text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </section>

      {/* Bold Image-Led Destination Guide Spreads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {visibleDestinations.map((dest, idx) => {
          const matchingPackages = activePackages.filter(
            (p) =>
              p.destinationSlug === dest.slug ||
              p.destination.toLowerCase().includes(dest.name.toLowerCase())
          );

          const lowestInr =
            matchingPackages.length > 0
              ? matchingPackages.reduce(
                  (min, p) => (p.priceValue > 0 && p.priceValue < min ? p.priceValue : min),
                  matchingPackages[0].priceValue
                )
              : null;

          const lowestFormatted =
            lowestInr && lowestInr > 0 ? `₹${Math.round(lowestInr).toLocaleString('en-IN')}` : null;

          const photoUrl = resolveStockImage(
            dest.heroImageSubject,
            undefined,
            undefined,
            dest.slug,
            dest.imageUrl || DESTINATION_STOCK_IMAGES[dest.slug]
          );
          const reverseLayout = idx % 2 === 1;

          return (
            <article
              key={dest.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 border-b border-[#E5E2DC] last:border-b-0 last:pb-0"
            >
              {/* Striking Photo */}
              <div className={`lg:col-span-6 ${reverseLayout ? 'lg:order-2' : ''}`}>
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="block aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E4DC] group"
                >
                  <img
                    src={photoUrl}
                    alt={dest.heroImageSubject}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
              </div>

              {/* Editorial Guide Text */}
              <div className={`lg:col-span-6 space-y-5 ${reverseLayout ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
                    {dest.region} &middot; Best: {dest.bestTimeToVisit}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                    {dest.displayLabel || dest.name}
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-[#4B5563]">
                    {dest.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {dest.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {dest.keyExperiences.slice(0, 3).map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-sm text-[#111827]">
                      <Check className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {lowestFormatted ? (
                      <>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                          Active Packages From
                        </span>
                        <span className="font-mono-tabular text-xl font-bold text-[#010048]">
                          {lowestFormatted}
                        </span>
                        <span className="text-xs text-[#6B7280] ml-1">/ person</span>
                      </>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                        Bespoke Private Itineraries
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="px-5 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] transition-colors"
                    >
                      Read Full Guide
                    </Link>
                    <Link
                      to={`/contact?destination=${encodeURIComponent(dest.displayLabel || dest.name)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <CTASection />
    </div>
  );
};
