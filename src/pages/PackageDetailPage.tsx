import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, XCircle, Phone, MessageCircle } from 'lucide-react';
import { PACKAGE_STOCK_IMAGES, CLIENT_ASSETS } from '../data/stockImages';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { PackageCard } from '../components/cards/PackageCard';
import { CTASection } from '../components/common/CTASection';
import { Package } from '../types';
import { filterActivePackages } from '../services/googleSheetsPackages';

interface PackageDetailPageProps {
  packages: Package[];
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ packages }) => {
  const { id } = useParams<{ id: string }>();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const activePackages = filterActivePackages(packages);
  const pkg = activePackages.find((p) => p.id === id || p.slug === id);

  if (!pkg) {
    return <Navigate to="/destinations" replace />;
  }

  const relatedPackages = activePackages
    .filter((p) => p.id !== pkg.id && (p.destination === pkg.destination || p.region === pkg.region))
    .slice(0, 3);

  const heroImage =
    PACKAGE_STOCK_IMAGES[pkg.id] ||
    PACKAGE_STOCK_IMAGES['pkg-01'];

  return (
    <div className="bg-[#FAF9F6] pt-24 sm:pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Heading Block */}
        <div className="space-y-5">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280] hover:text-[#111827]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Active Packages</span>
          </Link>

          <div className="space-y-3 max-w-4xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D94E28] block">
              {pkg.destination} &middot; {pkg.region} &middot; {pkg.holidayType}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.08]">
              {pkg.title}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] font-medium">
              {pkg.duration} &middot; {pkg.persons} &middot; {pkg.roomBasis} &middot; {pkg.stayPeriod}
            </p>
          </div>
        </div>

        {/* Large Clean Hero Image */}
        <div className="aspect-[16/9] max-h-[560px] w-full rounded-2xl overflow-hidden bg-[#E8E4DC]">
          <img
            src={heroImage}
            alt={pkg.imageSubject}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Details + Pricing Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-[#111827]">
                Package Overview
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E2DC] space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] block">
                Accommodation
              </span>
              <p className="text-base font-semibold text-[#111827]">
                {pkg.stayDetails}
              </p>
            </div>

            {/* Inclusions */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-[#111827]">
                Features &amp; Inclusions
              </h3>
              <ul className="space-y-3">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4B5563]">
                    <Check className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            {pkg.exclusions && pkg.exclusions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
                <h3 className="font-display text-xl font-bold text-[#111827]">
                  Exclusions
                </h3>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#6B7280]">
                      <XCircle className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking & Advance Conditions */}
            <div className="p-6 rounded-2xl bg-[#F3F1EC] border border-[#E5E2DC] space-y-2 text-sm text-[#4B5563]">
              <h4 className="font-display text-base font-bold text-[#111827]">
                Booking Validity &amp; Itinerary Notes
              </h4>
              <p>
                <strong>Validity:</strong> {pkg.bookingValidity} &middot; <strong>Stay Period:</strong> {pkg.stayPeriod}
              </p>
              {pkg.advanceBookingConditions && (
                <p>
                  <strong>Advance Booking Conditions:</strong> {pkg.advanceBookingConditions}
                </p>
              )}
              <p>{pkg.itineraryStatus}.</p>
              {pkg.dataReviewNotes && pkg.dataReviewNotes.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-xs text-[#6B7280] pt-1">
                  {pkg.dataReviewNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] block mb-2">
                  Starting Rate (INR)
                </span>
                <PriceDisplay
                  priceDisplay={pkg.inrPriceDisplay || pkg.priceDisplay}
                  roomBasis={pkg.roomBasis}
                  persons={pkg.persons}
                  originalCurrency={pkg.originalCurrency}
                  originalPrice={pkg.originalPrice}
                  priceBasisNote={pkg.priceBasisNote}
                  size="lg"
                />
              </div>

              <dl className="space-y-3 text-xs sm:text-sm border-y border-[#E5E2DC] py-5">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7280]">Duration</dt>
                  <dd className="font-semibold text-[#111827]">{pkg.duration}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7280]">Minimum Party</dt>
                  <dd className="font-semibold text-[#111827]">{pkg.persons}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7280]">Rooms Basis</dt>
                  <dd className="font-semibold text-[#111827]">{pkg.roomBasis}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7280]">Booking Validity</dt>
                  <dd className="font-semibold text-[#D94E28]">{pkg.bookingValidity}</dd>
                </div>
              </dl>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm((prev) => !prev)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                >
                  {showEnquiryForm ? 'Hide Enquiry Form' : 'Enquire About This Package'}
                </button>

                <a
                  href={`https://wa.me/918939958899?text=${encodeURIComponent(
                    `Hello 365Holidayz, I would like to enquire about the package: ${pkg.title} (${pkg.inrPriceDisplay || pkg.priceDisplay})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#E5E2DC] hover:bg-[#F3F1EC] text-[#111827] text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D94E28]" />
                  <span>WhatsApp Desk</span>
                </a>

                <a
                  href={`tel:${CLIENT_ASSETS.verifiedContacts.phone1.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-[#4B5563] hover:text-[#111827]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLIENT_ASSETS.verifiedContacts.phone1}</span>
                </a>
              </div>
            </div>

            {showEnquiryForm && (
              <EnquiryForm
                initialDestination={pkg.destination}
                initialHolidayType={pkg.holidayType}
                packageContext={{
                  id: pkg.id,
                  title: pkg.title,
                  price: pkg.inrPriceDisplay || pkg.priceDisplay
                }}
              />
            )}
          </aside>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="pt-12 border-t border-[#E5E2DC] space-y-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
                More Active Packages
              </h2>
              <Link
                to="/destinations"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[#010048] hover:text-[#D94E28]"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((relPkg) => (
                <PackageCard key={relPkg.id} pkg={relPkg} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-16">
        <CTASection destinationContext={pkg.destination} />
      </div>
    </div>
  );
};
