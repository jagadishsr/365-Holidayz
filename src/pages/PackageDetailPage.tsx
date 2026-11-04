import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { ALL_PACKAGES } from '../data/packages';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTASection } from '../components/common/CTASection';
import { PackageCard } from '../components/cards/PackageCard';
import { PACKAGE_STOCK_IMAGES, CLIENT_ASSETS } from '../data/stockImages';

export const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showEnquiryDrawer, setShowEnquiryDrawer] = useState(false);

  const pkg = ALL_PACKAGES.find((p) => p.id === id || p.slug === id);

  if (!pkg) {
    return <Navigate to="/packages" replace />;
  }

  // Related packages from same destination or region
  const relatedPackages = ALL_PACKAGES
    .filter((p) => p.id !== pkg.id && (p.destination === pkg.destination || p.region === pkg.region))
    .slice(0, 3);

  const packageFaqs = [
    {
      question: 'How do I secure this package and verify current room availability?',
      answer: 'Due to dynamic airline and boutique hotel inventory, all packages require real-time validation by our senior concierge. Submit your travel dates using the "Plan Your Trip / Customise Itinerary" button to receive confirmed availability and final quotes.'
    },
    {
      question: 'What is the price basis for this package?',
      answer: `${pkg.priceBasisNote}. Standard hotel pricing is calculated on a ${pkg.roomBasis.toLowerCase()} per person basis, unless otherwise specified for single occupancy or family interconnecting suites.`
    },
    {
      question: 'Can this package itinerary be customised?',
      answer: 'Yes! Every 365Holidayz package can be customized: extend room nights, upgrade to overwater villas or suites, add private chauffeur excursions, or adjust meal plans.'
    }
  ];

  return (
    <div className="pt-20 space-y-12 pb-16">
      {/* 1. Header Banner & Identity */}
      <div className="bg-gradient-to-r from-[#eff6ff] via-[#f0fdf4] to-[#f8fafc] text-slate-900 pt-8 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Packages', href: '/packages' },
              { label: pkg.destination, href: `/packages?destination=${encodeURIComponent(pkg.destination)}` },
              { label: pkg.title }
            ]}
            className="text-slate-500"
          />

          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#fef3c7] text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
                {pkg.region}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-xs">
                {pkg.holidayType}
              </span>
              {pkg.isUrgentValidity && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-black shadow-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Urgent: Validity Ends 31 Oct 2026</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {pkg.title}
            </h1>

            {/* Quick stats strip */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm text-slate-600 font-semibold pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#ff5a36]" />
                <span className="text-slate-900">{pkg.destination}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ff5a36]" />
                <span className="text-slate-900">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#ff5a36]" />
                <span className={pkg.minPax >= 4 ? 'font-black text-amber-700' : 'text-slate-900'}>
                  {pkg.persons} ({pkg.roomBasis})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#ff5a36]" />
                <span className="text-slate-900">{pkg.stayPeriod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Gallery Placeholders (3 to 5 placeholders per package requirement) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c8a97e]">
              Visual Showcase & Gallery Slots
            </span>
            <span className="text-xs text-slate-500 font-mono">
              3 Labelled Visual Placeholders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ImagePlaceholder
              src={PACKAGE_STOCK_IMAGES[pkg.id]}
              packageId={pkg.id}
              subject={pkg.imageSubject}
              category="Main Feature"
              aspectRatio="gallery"
              recommendedDimensions="1200 × 800 px"
              className="md:col-span-2 rounded-xl shadow-lg border border-[#c59b27]/30"
            />

            <div className="grid grid-cols-1 gap-4">
              {pkg.gallerySubjects && pkg.gallerySubjects.length > 0 ? (
                pkg.gallerySubjects.slice(0, 2).map((subj, i) => (
                  <ImagePlaceholder
                    key={i}
                    subject={subj}
                    category={`Perspective ${i + 1}`}
                    aspectRatio="card"
                    recommendedDimensions="1200 × 900 px"
                    className="rounded-lg"
                  />
                ))
              ) : (
                <ImagePlaceholder
                  subject={`${pkg.destination} Scenic Landscape View`}
                  category="Landscape"
                  aspectRatio="card"
                  recommendedDimensions="1200 × 900 px"
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </section>

        {/* 3. Main Details & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Urgent Validity Alert Banner */}
            {pkg.isUrgentValidity && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <h4 className="font-bold text-amber-900">
                    Urgent Booking Validity: By 31 Oct 2026
                  </h4>
                  <p className="leading-relaxed">
                    This special offer from the client master sheet has a booking deadline of 31 October 2026. Given the current date, inventory and room tariff must be re-confirmed immediately with our senior travel specialists.
                  </p>
                </div>
              </div>
            )}

            {/* Overview & Stay Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#010048]">
                Curated Journey Summary
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {pkg.description}
              </p>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Accommodation & Resort Tier
                </span>
                <p className="text-sm font-semibold text-[#010048]">
                  {pkg.stayDetails || 'Details to be confirmed upon reservation'}
                </p>
              </div>
            </div>

            {/* Inclusions & Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#010048]">
                Package Inclusions & Curated Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#010048]">
                Standard Package Exclusions
              </h3>
              {pkg.exclusions && pkg.exclusions.length > 0 ? (
                <ul className="space-y-2">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Detailed exclusions list available on request.
                </p>
              )}
            </div>

            {/* Itinerary Status per brief rule:
                "itinerary only if supplied (otherwise “Detailed day-wise itinerary available on request”)" */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <FileText className="w-4 h-4 text-[#c8a97e]" />
                <span>Day-by-Day Itinerary Schedule</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pkg.itineraryStatus}. Our bespoke travel planners shape the day-by-day sequence to your preferred wake-up times, dining styles, and flight arrival schedules.
              </p>
            </div>

            {/* Data Review Notes (Audit transparency from workbook) */}
            {pkg.dataReviewNotes && pkg.dataReviewNotes.length > 0 && (
              <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200 text-indigo-950 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-900">
                  <Info className="w-3.5 h-3.5" />
                  <span>Workbook Integrity & Review Notes</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-indigo-900/80">
                  {pkg.dataReviewNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Package FAQs */}
            <div className="pt-4 border-t border-slate-200">
              <FAQAccordion items={packageFaqs} title="Package & Booking Conditions" />
            </div>
          </div>

          {/* Sticky Pricing & Enquiry Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Verified Catalogue Price
                </span>
                <PriceDisplay
                  priceDisplay={pkg.priceDisplay}
                  roomBasis={pkg.roomBasis}
                  persons={pkg.persons}
                  minPax={pkg.minPax}
                  priceBasisNote={pkg.priceBasisNote}
                  size="lg"
                  showDisclaimer={true}
                />
              </div>

              {/* Group Condition Callout if Min Pax >= 4 */}
              {pkg.minPax >= 4 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-snug">
                  <strong>Group Rate Condition:</strong> This pricing tier requires a minimum booking group size of <strong>{pkg.persons}</strong>. Single or smaller party adjustments quoted on request.
                </div>
              )}

              {/* Key Specs Table */}
              <div className="space-y-2.5 text-xs border-y border-slate-100 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800">{pkg.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Region:</span>
                  <span className="font-semibold text-slate-800">{pkg.region}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Room Basis:</span>
                  <span className="font-semibold text-slate-800">{pkg.roomBasis}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Booking Validity:</span>
                  <span className={`font-semibold ${pkg.isUrgentValidity ? 'text-amber-700 font-bold' : 'text-slate-800'}`}>
                    {pkg.bookingValidity}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setShowEnquiryDrawer(!showEnquiryDrawer)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04825] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Enquire / Customise Itinerary</span>
                </button>

                <a
                  href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs shadow-md transition-colors"
                >
                  <span>Chat on WhatsApp Group</span>
                </a>

                <a
                  href="tel:+918939958899"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <span>Call India Desk: +91-8939958899</span>
                </a>
              </div>

              <div className="text-[11px] text-center text-slate-500">
                Guaranteed response within 24 business hours by our senior travel planners.
              </div>
            </div>

            {/* Slide-out or in-page Consultation Form */}
            {showEnquiryDrawer && (
              <div className="animate-in fade-in">
                <EnquiryForm
                  initialDestination={pkg.destination}
                  initialHolidayType={pkg.holidayType}
                  packageContext={{
                    id: pkg.id,
                    title: pkg.title,
                    price: pkg.priceDisplay
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 4. Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c8a97e]">
                  More In {pkg.region}
                </span>
                <h3 className="text-xl font-bold text-[#010048]">
                  You May Also Appreciate
                </h3>
              </div>
              <Link to="/packages" className="text-xs font-bold text-[#010048] hover:text-[#c8a97e]">
                View all packages →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((relPkg) => (
                <PackageCard key={relPkg.id} pkg={relPkg} />
              ))}
            </div>
          </section>
        )}
      </div>

      <CTASection destinationContext={pkg.destination} />
    </div>
  );
};
