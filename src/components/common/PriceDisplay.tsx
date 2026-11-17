import React from 'react';
import { Users } from 'lucide-react';

interface PriceDisplayProps {
  priceDisplay: string;
  roomBasis: string;
  persons: string;
  minPax?: number;
  originalCurrency?: string;
  originalPrice?: number;
  priceBasisNote?: string;
  size?: 'sm' | 'md' | 'lg';
  showDisclaimer?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceDisplay,
  roomBasis,
  persons,
  originalCurrency,
  originalPrice,
  priceBasisNote = 'Confirm room availability & departure dates on enquiry.',
  size = 'md',
  showDisclaimer = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl sm:text-4xl font-extrabold'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`font-mono-tabular text-[#010048] ${sizeClasses[size]}`}>
          {priceDisplay}
        </span>
        <span className="text-xs sm:text-sm text-[#4B5563] font-medium">
          / person &middot; {roomBasis}
        </span>
      </div>

      {originalCurrency && originalCurrency !== 'INR' && originalPrice ? (
        <div className="text-xs font-mono-tabular text-[#6B7280]">
          Original contract quote: {originalCurrency} {originalPrice.toLocaleString()}
        </div>
      ) : null}

      <div className="flex items-center gap-2 text-xs text-[#4B5563]">
        <Users className="w-3.5 h-3.5 text-[#D94E28] shrink-0" />
        <span>{persons}</span>
      </div>

      {showDisclaimer && (
        <p className="text-[11px] text-[#6B7280] leading-snug pt-0.5">
          {priceBasisNote}
        </p>
      )}
    </div>
  );
};
