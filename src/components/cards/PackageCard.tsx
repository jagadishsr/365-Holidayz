import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Calendar, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Package } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { PriceDisplay } from '../common/PriceDisplay';

interface PackageCardProps {
  pkg: Package;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, className = '' }) => {
  return (
    <article className={`flex flex-col rounded-lg bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:-translate-y-1 ${className}`}>
      {/* Top Image Placeholder */}
      <div className="relative">
        <ImagePlaceholder
          packageId={pkg.id}
          subject={pkg.imageSubject}
          category={pkg.destination}
          aspectRatio="card"
          recommendedDimensions="1200 × 900 px"
          className="group-hover:opacity-95 transition-opacity"
        />

        {/* Floating Urgency Flag if Booking Validity Ends 31 Oct 2026 */}
        {pkg.isUrgentValidity && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#c9182b] text-white text-[11px] font-black tracking-wide shadow-md">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Valid by 31 Oct 2026</span>
          </div>
        )}

        {/* Region & Holiday Type Badges */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-[#010048]/95 text-[#f3e098] text-[10px] font-bold uppercase tracking-wider border border-[#c59b27]/40 backdrop-blur-sm shadow-xs">
            {pkg.destination}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#010048] text-[10px] font-bold border border-slate-200 shadow-xs backdrop-blur-sm">
            {pkg.holidayType}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Duration & Group Size Badges */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{pkg.duration}</span>
            </span>

            <span className={`inline-flex items-center gap-1 ${pkg.minPax >= 4 ? 'font-semibold text-amber-700' : ''}`}>
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{pkg.persons}</span>
            </span>

            {pkg.roomBasis === 'Twin sharing' && (
              <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                Twin Sharing
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#010048] leading-snug group-hover:text-[#c59b27] transition-colors line-clamp-2">
            <Link to={`/packages/${pkg.id}`}>
              {pkg.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <PriceDisplay
            priceDisplay={pkg.priceDisplay}
            roomBasis={pkg.roomBasis}
            persons={pkg.persons}
            minPax={pkg.minPax}
            priceBasisNote={pkg.priceBasisNote}
            size="sm"
            showDisclaimer={true}
          />

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
              <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{pkg.bookingValidity}</span>
            </div>

            <Link
              to={`/packages/${pkg.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#010048] hover:bg-[#080562] text-[#f3e098] text-xs font-semibold tracking-wide transition-colors shrink-0"
            >
              <span>View Package</span>
              <ArrowRight className="w-3 h-3 text-[#c59b27]" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
