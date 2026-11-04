import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Calendar, ArrowRight, AlertTriangle, ShieldCheck, Check, Star } from 'lucide-react';
import { Package } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface PackageCardProps {
  pkg: Package;
  className?: string;
  onOpenEnquiry?: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, className = '', onOpenEnquiry }) => {
  return (
    <article
      className={`flex flex-col rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden group hover:-translate-y-1 ${className}`}
    >
      {/* Top Visual Image with Clean Pastel Badges */}
      <div className="relative overflow-hidden bg-slate-100 aspect-[16/10]">
        <ImagePlaceholder
          packageId={pkg.id}
          subject={pkg.imageSubject}
          category={pkg.destination}
          aspectRatio="card"
          recommendedDimensions="1200 × 900 px"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Floating Destination Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full bg-[#f0f9ff]/95 text-[#0369a1] text-xs font-black uppercase tracking-wider border border-sky-200 shadow-sm backdrop-blur-xs">
            {pkg.destination}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-extrabold border border-slate-200 shadow-sm flex items-center gap-1 backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-[#ff5a36]" />
            <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
          </span>
        </div>

        {/* Star Rating & Theme Pill at bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-[#fefce8]/95 text-[#854d0e] text-[11px] font-black border border-yellow-300 shadow-xs flex items-center gap-1 backdrop-blur-xs">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span>4.8 Rating</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-slate-700 text-[11px] font-bold border border-slate-200 shadow-xs backdrop-blur-xs">
            {pkg.holidayType}
          </span>
        </div>
      </div>

      {/* Content Body (Simple & Bold) */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-[#ff5a36] transition-colors line-clamp-2">
            <Link to={`/packages/${pkg.id}`}>
              {pkg.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
            {pkg.description}
          </p>

          {/* GT Holidays Style Key Inclusions Icons Row */}
          <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <span className="px-2 py-0.5 rounded-md bg-[#f0fdf4] text-emerald-800 border border-emerald-200">
              ✈️ Return Flight
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#fff7ed] text-orange-800 border border-orange-200">
              🏨 4★ Stay
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#faf5ff] text-purple-800 border border-purple-200">
              🍛 Indian Meals
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#f0f9ff] text-sky-800 border border-sky-200">
              🚐 Transfers
            </span>
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wide">
              Starting From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#ff5a36] tracking-tight">
                {pkg.priceDisplay}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                / Person
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              {pkg.roomBasis} • {pkg.persons}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              to={`/packages/${pkg.id}`}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Details
            </Link>
            <Link
              to={`/contact?destination=${encodeURIComponent(pkg.destination)}&packageId=${pkg.id}`}
              className="px-4 py-2.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
