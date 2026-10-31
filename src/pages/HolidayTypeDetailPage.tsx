import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, MapPin, ArrowRight, Calendar, Users, Shield } from 'lucide-react';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { ALL_PACKAGES } from '../data/packages';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { PackageCard } from '../components/cards/PackageCard';
import { CTASection } from '../components/common/CTASection';

export const HolidayTypeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const holidayType = ALL_HOLIDAY_TYPES.find((ht) => ht.slug === slug);

  if (!holidayType) {
    return <Navigate to="/holiday-types" replace />;
  }

  // Find matching packages from verified master sheet
  const matchingPackages = ALL_PACKAGES.filter(
    (p) => p.holidayType.toLowerCase() === holidayType.title.toLowerCase() ||
      (holidayType.title === 'Honeymoon' && (p.holidayType === 'Honeymoon' || p.holidayType === 'Luxury Escapes')) ||
      (holidayType.title === 'Women Solo' && (p.holidayType === 'Adventure' || p.holidayType === 'Honeymoon' || p.holidayType === 'Luxury Escapes'))
  );

  return (
    <div className="pt-20 space-y-16 pb-16">
      {/* 1. Hero */}
      <div className="relative bg-[#010048] text-white overflow-hidden">
        <div className="relative min-h-[440px] lg:min-h-[500px] flex flex-col justify-end">
          <ImagePlaceholder
            subject={holidayType.imageSubject}
            category={holidayType.title}
            aspectRatio="hero"
            recommendedDimensions="1920 × 1000 px"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#010048] via-[#010048]/80 to-[#010048]/40 z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Holiday Types', href: '/holiday-types' },
                { label: holidayType.title }
              ]}
              className="text-slate-300"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a97e]/25 text-[#e2d4c0] text-xs font-bold uppercase tracking-wider border border-[#c8a97e]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{holidayType.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {holidayType.title} — <span className="text-[#c8a97e]">{holidayType.subtitle}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-normal max-w-3xl leading-relaxed">
              {holidayType.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Persona & Signature Experiences */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8a97e] block">
                The Suitable Traveller
              </span>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {holidayType.suitableTraveller}
              </p>
            </div>

            {/* Signature Experiences */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#010048]">
                Signature Curated Experiences
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {holidayType.signatureExperiences.map((exp, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Quote */}
            <blockquote className="p-6 border-l-4 border-[#c8a97e] bg-amber-50/40 rounded-r-lg italic text-slate-700 text-sm sm:text-base leading-relaxed">
              “{holidayType.accentQuote}”
            </blockquote>
          </div>

          {/* Recommended Destinations Sidebar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
            <h3 className="text-base font-bold text-[#010048] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c8a97e]" />
              <span>Recommended Destinations</span>
            </h3>

            <div className="space-y-2">
              {holidayType.recommendedDestinations.map((dest, i) => (
                <div
                  key={i}
                  className="p-3 rounded bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>{dest}</span>
                  <Link
                    to={`/packages?destination=${encodeURIComponent(dest.split('(')[0].trim())}`}
                    className="text-xs text-[#c8a97e] hover:underline"
                  >
                    View Packages →
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to={`/plan-your-trip?holidayType=${encodeURIComponent(holidayType.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-[#c8a97e] hover:bg-[#d8b98e] text-[#010048] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-[#010048]" />
                <span>Enquire For {holidayType.title}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Matching Packages */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8a97e]">
                Central Data Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#010048]">
                Curated Packages for {holidayType.title}
              </h2>
            </div>

            <Link
              to="/packages"
              className="text-xs font-semibold text-[#010048] hover:text-[#c8a97e]"
            >
              Browse all 33 packages →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingPackages.slice(0, 6).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </div>
  );
};
