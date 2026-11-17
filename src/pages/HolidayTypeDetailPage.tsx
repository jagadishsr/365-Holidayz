import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { HOLIDAY_TYPE_STOCK_IMAGES } from '../data/stockImages';
import { PackageCard } from '../components/cards/PackageCard';
import { CTASection } from '../components/common/CTASection';
import { Package } from '../types';
import { filterActivePackages } from '../services/googleSheetsPackages';

interface HolidayTypeDetailPageProps {
  packages: Package[];
}

export const HolidayTypeDetailPage: React.FC<HolidayTypeDetailPageProps> = ({ packages }) => {
  const { slug } = useParams<{ slug: string }>();
  const holidayType = ALL_HOLIDAY_TYPES.find((ht) => ht.slug === slug);

  if (!holidayType) {
    return <Navigate to="/destinations" replace />;
  }

  const activePackages = filterActivePackages(packages);
  const matchingPackages = activePackages.filter(
    (p) =>
      p.holidayType.toLowerCase() === holidayType.title.toLowerCase() ||
      (holidayType.title === 'Honeymoon' &&
        (p.holidayType === 'Honeymoon' || p.holidayType === 'Luxury Escapes')) ||
      (holidayType.title === 'Women Solo' &&
        (p.holidayType === 'Adventure' || p.holidayType === 'Luxury Escapes'))
  );

  const heroImage =
    HOLIDAY_TYPE_STOCK_IMAGES[holidayType.id] || HOLIDAY_TYPE_STOCK_IMAGES['ht-luxury-escapes'];

  return (
    <div className="bg-[#FAF9F6]">
      {/* Wide Hero */}
      <section className="relative h-[60vh] min-h-[420px] bg-[#111827] text-white overflow-hidden">
        <img
          src={heroImage}
          alt={holidayType.imageSubject}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 space-y-4">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Destinations</span>
          </Link>

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 block">
            {holidayType.badge}
          </span>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            {holidayType.title}
          </h1>

          <p className="text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed">
            {holidayType.description}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
                Designed For
              </span>
              <p className="text-lg text-[#111827] leading-relaxed">
                {holidayType.suitableTraveller}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#E5E2DC]">
              <h2 className="font-display text-2xl font-bold text-[#111827]">
                Signature Experiences
              </h2>
              <ul className="space-y-3">
                {holidayType.signatureExperiences.map((exp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4B5563]">
                    <Check className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 bg-white border border-[#E5E2DC] rounded-2xl p-6 sm:p-8 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] block">
              Recommended Destinations
            </span>
            <ul className="space-y-2.5">
              {holidayType.recommendedDestinations.map((dest, i) => (
                <li
                  key={i}
                  className="py-2.5 border-b border-[#E5E2DC]/60 last:border-b-0 flex items-center justify-between text-sm font-medium text-[#111827]"
                >
                  <span>{dest}</span>
                  <Link
                    to={`/destinations?destination=${encodeURIComponent(dest.split('(')[0].split('–')[0].trim())}`}
                    className="text-xs font-semibold text-[#D94E28] hover:underline"
                  >
                    Explore →
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={`/contact?holidayType=${encodeURIComponent(holidayType.title)}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
            >
              <span>Enquire For {holidayType.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>

        {/* Active Matching Packages */}
        <div className="pt-12 border-t border-[#E5E2DC] space-y-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
              Curated Active Packages
            </h2>
            <Link
              to="/destinations"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[#010048] hover:text-[#D94E28]"
            >
              Browse All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchingPackages.slice(0, 6).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
