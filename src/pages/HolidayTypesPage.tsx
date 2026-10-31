import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { HolidayTypeCard } from '../components/cards/HolidayTypeCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';

export const HolidayTypesPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Holiday Types' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Curated Travel Philosophies</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Signature Holiday Types
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Travel designed not around rigid itineraries, but around how you wish to feel. From intimate romantic overwater horizons to multi-generational family comfort and empowered solo exploration.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 5 categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_HOLIDAY_TYPES.map((ht) => (
            <HolidayTypeCard key={ht.id} holidayType={ht} />
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
};
