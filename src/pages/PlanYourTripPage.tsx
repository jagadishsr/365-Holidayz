import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Compass, ShieldCheck, Heart, Sparkles, CheckCircle2, PhoneCall, Clock } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { ALL_PACKAGES } from '../data/packages';

export const PlanYourTripPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialDestination = searchParams.get('destination') || '';
  const initialHolidayType = searchParams.get('holidayType') || '';
  const packageId = searchParams.get('packageId');

  const selectedPackage = packageId ? ALL_PACKAGES.find((p) => p.id === packageId) : undefined;

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c8a97e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Plan Your Trip' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c8a97e] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Bespoke Itinerary Consultation</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Plan Your Trip
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Your world, expertly curated. Share your envisioned destination, travel companions, and preferred pace. Aameena and our senior travel specialists will shape a bespoke proposal around your life.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-8">
            <EnquiryForm
              initialDestination={initialDestination || (selectedPackage ? selectedPackage.destination : '')}
              initialHolidayType={initialHolidayType || (selectedPackage ? selectedPackage.holidayType : '')}
              packageContext={selectedPackage ? {
                id: selectedPackage.id,
                title: selectedPackage.title,
                price: selectedPackage.priceDisplay
              } : undefined}
            />
          </div>

          {/* Consultation Reassurance & Process Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#010048] border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c8a97e]" />
                <span>The 365Holidayz Process</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#010048] text-[#c8a97e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Share Your Vision</strong>
                    <span className="text-slate-600">Tell us about preferred dates, room sharing, family ages, or special milestone events.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#010048] text-[#c8a97e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Concierge Review</strong>
                    <span className="text-slate-600">Within 24 hours, our senior planners check live room inventory, vehicle tariffs, and flight connections.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#010048] text-[#c8a97e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Tailored Itinerary</strong>
                    <span className="text-slate-600">We refine every element — day-by-day pacing, dining reservations, and private guide match.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#010048] text-[#c8a97e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Gate-to-Gate Care</strong>
                    <span className="text-slate-600">Travel with effortless peace of mind supported by 30+ years of logistics mastery.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No obligation consultation</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent client sheet pricing</span>
                </div>
              </div>
            </div>

            {/* Talk to Expert card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c8a97e] block">
                Have Immediate Questions?
              </span>
              <h4 className="text-base font-bold text-[#010048]">Prefer to talk first?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn more about our heritage, founder Aameena, and our 365Eventz sister enterprise for corporate groups and weddings.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#010048] hover:text-[#c8a97e]"
              >
                <span>Read our founder story</span>
                <Compass className="w-3.5 h-3.5 text-[#c8a97e]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
