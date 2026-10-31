import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { Destination } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, className = '' }) => {
  return (
    <article className={`flex flex-col rounded-lg bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:-translate-y-1 ${className}`}>
      {/* Visual Image Slot */}
      <div className="relative">
        <ImagePlaceholder
          src={DESTINATION_STOCK_IMAGES[destination.slug]}
          subject={destination.heroImageSubject}
          category={destination.region}
          aspectRatio="card"
          recommendedDimensions="1200 × 900 px"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          {destination.isInspirationOnly ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#c9182b] text-white text-[11px] font-black shadow-md">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Inspiration Only</span>
            </div>
          ) : destination.isFeatured ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#010048]/95 text-[#f3e098] text-[11px] font-bold border border-[#c59b27]/50 shadow-md backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#f3e098]" />
              <span>Featured Destination</span>
            </div>
          ) : null}
        </div>

        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-[#010048]/90 text-slate-100 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10 shadow-xs">
            {destination.country}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#010048] group-hover:text-[#c59b27] transition-colors">
            <Link to={`/destinations/${destination.slug}`}>
              {destination.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>

          {/* Inspiration notice if applicable */}
          {destination.isInspirationOnly && (
            <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 leading-snug">
              No active package in current catalogue. Custom bespoke itinerary available on request.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500 font-medium">
            Best time: {destination.bestTimeToVisit.split('(')[0]}
          </span>

          <Link
            to={`/destinations/${destination.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#010048] hover:text-[#c59b27] transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
