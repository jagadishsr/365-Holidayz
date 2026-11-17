import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Destination } from '../../types';
import { DESTINATION_STOCK_IMAGES } from '../../data/stockImages';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, className = '' }) => {
  const titleText = destination.displayLabel || destination.name;

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-[#111827] ${className}`}
    >
      <ImagePlaceholder
        src={DESTINATION_STOCK_IMAGES[destination.slug]}
        subject={destination.heroImageSubject}
        aspectRatio="portrait"
        overlayGradient={true}
        className="rounded-2xl"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 flex items-end justify-between gap-3">
        <div className="space-y-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
            {destination.region}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-[#FAF9F6] transition-colors">
            {titleText}
          </h3>
          {destination.isInspirationOnly && (
            <span className="block text-[11px] font-medium text-white/75">
              Custom Bespoke Itineraries
            </span>
          )}
        </div>

        <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#111827] transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};
