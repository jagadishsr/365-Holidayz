import React from 'react';
import { AlertCircle, Users } from 'lucide-react';

interface PriceDisplayProps {
  priceDisplay: string;
  roomBasis: string;
  persons: string;
  minPax?: number;
  priceBasisNote?: string;
  size?: 'sm' | 'md' | 'lg';
  showDisclaimer?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceDisplay,
  roomBasis,
  persons,
  minPax,
  priceBasisNote = 'Price shown in client sheet — confirm basis at enquiry',
  size = 'md',
  showDisclaimer = true,
  className = ''
}) => {
  const isLargeGroup = minPax && minPax >= 4;

  const sizeClasses = {
    sm: 'text-lg font-bold',
    md: 'text-2xl font-bold tracking-tight',
    lg: 'text-3xl sm:text-4xl font-extrabold tracking-tight'
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`text-[#010048] ${sizeClasses[size]}`}>
          {priceDisplay}
        </span>
        <span className="text-xs sm:text-sm text-slate-500 font-medium">
          / per person ({roomBasis})
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
          isLargeGroup 
            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
            : 'bg-slate-100 text-slate-700 border border-slate-200'
        }`}>
          <Users className="w-3 h-3" />
          <span>{persons}</span>
        </span>

        {roomBasis === 'Twin sharing' && (
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">
            Twin Sharing
          </span>
        )}
      </div>

      {showDisclaimer && (
        <div className="flex items-start gap-1 text-[11px] text-slate-500 leading-tight pt-0.5">
          <AlertCircle className="w-3 h-3 text-[#c8a97e] shrink-0 mt-0.5" />
          <span className="italic">{priceBasisNote}</span>
        </div>
      )}
    </div>
  );
};
