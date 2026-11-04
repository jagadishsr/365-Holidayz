import React, { useState } from 'react';
import { Compass, Sparkles, Filter } from 'lucide-react';
import { ALL_DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/cards/DestinationCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { Region } from '../types';

export const DestinationsPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions: (string | Region)[] = [
    'All',
    'Islands',
    'Far East Asian',
    'Middle East & Mediterranean',
    'Other Countries'
  ];

  const filteredDestinations = selectedRegion === 'All'
    ? ALL_DESTINATIONS
    : ALL_DESTINATIONS.filter((d) => d.region === selectedRegion);

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#eff6ff] via-[#f0fdf4] to-[#f8fafc] text-slate-900 py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Destinations' }]} className="text-slate-500" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a36] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#ff5a36]" />
              <span>Worldwide Curations</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Destinations
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Explore 17 handpicked geographical sanctuaries across four distinct global regions. Each destination is chosen for its cultural soul, natural drama, and bespoke travel possibilities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Listing Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Region Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
            Filter Region:
          </span>
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#ff5a36] text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {reg === 'All' ? 'All 17 Destinations' : reg}
            </button>
          ))}
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
};
