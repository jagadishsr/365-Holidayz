import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Globe } from 'lucide-react';
import { DESTINATION_STOCK_IMAGES, getDefaultGalleryImages } from '../data/stockImages';
import { PackageCard } from '../components/cards/PackageCard';
import { DestinationGallery } from '../components/common/DestinationGallery';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { resolveStockImage } from '../components/common/ImagePlaceholder';
import { Package } from '../types';
import {
  filterActivePackages,
  getPublishedDestinations
} from '../services/googleSheetsPackages';

interface DestinationDetailPageProps {
  packages: Package[];
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ packages }) => {
  const { slug } = useParams<{ slug: string }>();
  const activePackages = filterActivePackages(packages);
  const destination = getPublishedDestinations(activePackages).find((d) => d.slug === slug);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  const relatedPackages = activePackages.filter(
    (p) =>
      p.destinationSlug === destination.slug ||
      p.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  const heroImage = resolveStockImage(
    destination.heroImageSubject,
    undefined,
    undefined,
    destination.slug,
    destination.imageUrl || DESTINATION_STOCK_IMAGES[destination.slug]
  );

  const albumImages =
    destination.galleryImages && destination.galleryImages.length > 0
      ? destination.galleryImages
      : getDefaultGalleryImages(destination.slug, heroImage);

  return (
    <div className="bg-[#FAF9F6]">
      {/* Wide Editorial Hero */}
      <section className="relative h-[62vh] min-h-[440px] bg-[#111827] text-white overflow-hidden">
        <img
          src={heroImage}
          alt={destination.heroImageSubject}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 space-y-4">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Destinations</span>
          </Link>

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 block">
            {destination.region} &middot; {destination.country}
          </span>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            {destination.displayLabel || destination.name}
          </h1>

          <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed">
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
                Overview
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
                The Essence of {destination.name}
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {destination.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#E5E2DC]">
              <h3 className="font-display text-xl font-bold text-[#111827]">
                Signature Experiences
              </h3>
              <ul className="space-y-3">
                {destination.keyExperiences.map((exp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4B5563]">
                    <Check className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 bg-white border border-[#E5E2DC] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111827] border-b border-[#E5E2DC] pb-4">
              <Globe className="w-4 h-4 text-[#D94E28]" />
              <span>Practical Travel Notes</span>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-[#E5E2DC]/60 pb-3">
                <dt className="text-[#6B7280]">Ideal Duration</dt>
                <dd className="font-semibold text-[#111827] text-right">
                  {destination.practicalInfo.idealDuration}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#E5E2DC]/60 pb-3">
                <dt className="text-[#6B7280]">Best Season</dt>
                <dd className="font-semibold text-[#111827] text-right">
                  {destination.bestTimeToVisit}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#E5E2DC]/60 pb-3">
                <dt className="text-[#6B7280]">Currency</dt>
                <dd className="font-semibold text-[#111827] text-right">
                  {destination.practicalInfo.currency}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#6B7280]">Time Zone</dt>
                <dd className="font-semibold text-[#111827] text-right">
                  {destination.practicalInfo.timeZone}
                </dd>
              </div>
            </dl>

            <Link
              to={`/contact?destination=${encodeURIComponent(destination.displayLabel || destination.name)}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
            >
              <span>Plan Custom Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>

        {/* Scrollable Destination Photo Album (Up to 8 images, driven by img1-img8 or 3 curated defaults) */}
        <div className="pt-12 border-t border-[#E5E2DC]">
          <DestinationGallery
            images={albumImages}
            title={`${destination.displayLabel || destination.name} in Frames`}
            eyebrow="Destination Gallery"
          />
        </div>

        {/* Active Packages for Destination */}
        <div className="pt-12 border-t border-[#E5E2DC] space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
                Active Packages
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827]">
                Available Journeys in {destination.name}
              </h2>
            </div>
          </div>

          {relatedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E5E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="font-display text-xl font-bold text-[#111827]">
                  Tailor-Made Private Itineraries
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Fixed-departure rates for {destination.displayLabel || destination.name} are quoted privately based on your travel dates, preferred stays, and party size.
                </p>
              </div>
              <Link
                to={`/contact?destination=${encodeURIComponent(destination.displayLabel || destination.name)}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {destination.faqs.length > 0 && (
          <div className="pt-12 border-t border-[#E5E2DC] max-w-3xl">
            <FAQAccordion items={destination.faqs} title={`${destination.name} Travel Notes & FAQs`} />
          </div>
        )}
      </section>

      <CTASection destinationContext={destination.displayLabel || destination.name} />
    </div>
  );
};
