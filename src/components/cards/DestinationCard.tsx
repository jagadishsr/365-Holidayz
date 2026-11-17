import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../../types';
import { DESTINATION_STOCK_IMAGES } from '../../data/stockImages';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface DestinationCardProps {
  destination: Destination;
  startingPrice?: string;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  startingPrice,
  className = ''
}) => {
  const titleText = destination.displayLabel || destination.name;

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-[#111827] ${className}`}
    >
      <ImagePlaceholder
        src={destination.imageUrl || DESTINATION_STOCK_IMAGES[destination.slug]}
        destinationSlug={destination.slug}
        subject={destination.heroImageSubject}
        aspectRatio="portrait"
        overlayGradient={true}
        className="rounded-2xl"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex items-end justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 truncate">
            {destination.region}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-[#FAF9F6] transition-colors">
            {titleText}
          </h3>
        </div>

        {/* Bold Condensed Price Anchor in Bottom-Right Corner */}
        <div className="shrink-0 text-right">
          {startingPrice ? (
            <div className="px-2.5 py-1 rounded-lg bg-[#D94E28] group-hover:bg-white text-white group-hover:text-[#111827] transition-colors shadow-lg">
              <span className="block text-[9px] font-bold uppercase tracking-[0.14em] leading-none opacity-90">
                From
              </span>
              <span className="font-condensed text-xl sm:text-2xl font-extrabold tracking-tight leading-tight block">
                {startingPrice}
              </span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-xs border border-white/25 text-white group-hover:bg-white group-hover:text-[#111827] transition-colors">
              <span className="font-condensed text-sm sm:text-base font-extrabold uppercase tracking-wide leading-tight block">
                Custom Quote
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
