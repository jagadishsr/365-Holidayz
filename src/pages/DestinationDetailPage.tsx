import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Compass, Calendar, Clock, Globe, Shield, CheckCircle2, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { ALL_DESTINATIONS } from '../data/destinations';
import { ALL_PACKAGES } from '../data/packages';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PackageCard } from '../components/cards/PackageCard';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { DESTINATION_STOCK_IMAGES } from '../data/stockImages';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const destination = ALL_DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  // Find matching packages from the master catalogue
  const relatedPackages = ALL_PACKAGES.filter(
    (p) => p.destinationSlug === destination.slug || p.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <div className="pt-20 space-y-16 pb-16">
      {/* 1. Destination Hero Banner */}
      <div className="relative bg-[#010048] text-white overflow-hidden">
        <div className="relative min-h-[480px] lg:min-h-[540px] flex flex-col justify-end">
          <ImagePlaceholder
            src={DESTINATION_STOCK_IMAGES[destination.slug]}
            subject={destination.heroImageSubject}
            category={destination.region}
            aspectRatio="hero"
            recommendedDimensions="1920 × 1000 px"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Soft vignette gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#010048] via-[#010048]/50 to-transparent z-10" />

          {/* Hero text */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Destinations', href: '/destinations' },
                { label: destination.name }
              ]}
              className="text-slate-300"
            />

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-[#c59b27]/30 text-[#f3e098] text-xs font-bold uppercase tracking-wider border border-[#c59b27]/50 shadow-sm">
                {destination.region}
              </span>
              <span className="text-xs text-slate-300 font-medium px-2.5 py-1 rounded bg-black/40 border border-white/10">
                {destination.country}
              </span>
              {destination.isInspirationOnly && (
                <span className="px-3 py-1 rounded bg-amber-500/90 text-white text-xs font-bold">
                  Inspiration Only — Bespoke Inquiries
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal max-w-3xl leading-relaxed">
              {destination.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Overview & Why Visit */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8a97e]">
                About The Destination
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#010048]">
                The Essence of {destination.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Why Visit */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#010048]">
                Why Visit with 365Holidayz
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.whyVisit.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Experiences */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#010048]">
                Key Signature Experiences
              </h3>
              <ul className="space-y-2.5">
                {destination.keyExperiences.map((exp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27] shrink-0 mt-2" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Info Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              <h3 className="text-base font-bold text-[#010048] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#c59b27]" />
                <span>Practical Travel Information</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">Currency</span>
                  <span className="font-semibold text-slate-900">{destination.practicalInfo.currency}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">Languages</span>
                  <span className="font-semibold text-slate-900">{destination.practicalInfo.language}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">Ideal Duration</span>
                  <span className="font-semibold text-slate-900">{destination.practicalInfo.idealDuration}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">Time Zone</span>
                  <span className="font-semibold text-slate-900">{destination.practicalInfo.timeZone}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">Key Highlights</span>
                  <span className="text-slate-700 text-xs">{destination.practicalInfo.highlights}</span>
                </div>
              </div>

              {/* Best Time To Visit per brief constraint */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#010048] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Best Time to Visit</span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {destination.bestTimeToVisit}
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-snug">
                  {destination.bestTimeEditorialLabel}
                </div>
              </div>

              {/* Travel styles */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Matching Travel Styles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {destination.travelStyles.map((style, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/plan-your-trip?destination=${encodeURIComponent(destination.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#010048]" />
                  <span>Plan Trip to {destination.name}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Related Packages or Inspiration Notice */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
                Verified Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#010048]">
                Available Packages in {destination.name}
              </h2>
            </div>

            {relatedPackages.length > 0 && (
              <span className="text-xs font-semibold text-slate-500">
                {relatedPackages.length} package{relatedPackages.length === 1 ? '' : 's'} available
              </span>
            )}
          </div>

          {destination.isInspirationOnly ? (
            <div className="p-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Inspiration-Only Destination</span>
              </div>
              <p className="text-sm leading-relaxed max-w-3xl text-amber-900/90">
                In our current verified spreadsheet, {destination.name} does not have a fixed-departure pre-packaged itinerary. However, drawing upon our 30+ years of bespoke travel advisory, our senior concierge desk crafts custom tailor-made journeys for independent travellers, couples, and private groups.
              </p>
              <div className="pt-2">
                <Link
                  to={`/plan-your-trip?destination=${encodeURIComponent(destination.name)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#010048] text-[#f3e098] text-xs font-bold uppercase tracking-wider"
                >
                  <span>Request Custom {destination.name} Itinerary</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27]" />
                </Link>
              </div>
            </div>
          ) : relatedPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-center space-y-2">
              <p className="text-sm">Additional verified packages for {destination.name} are currently being curated for the upcoming season.</p>
              <Link to="/packages" className="text-xs font-bold text-[#010048] underline">
                Browse full catalogue of 33 packages →
              </Link>
            </div>
          )}
        </section>

        {/* 4. FAQs Accordion */}
        <section className="pt-6 border-t border-slate-200 max-w-3xl">
          <FAQAccordion items={destination.faqs} title={`${destination.name} Travel FAQs`} />
        </section>
      </div>

      {/* 5. Bottom CTA */}
      <CTASection destinationContext={destination.name} />
    </div>
  );
};
