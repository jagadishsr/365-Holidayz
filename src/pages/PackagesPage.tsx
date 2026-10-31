import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageFilters, FilterState } from '../components/packages/PackageFilters';
import { ALL_PACKAGES } from '../data/packages';
import { PackageCard } from '../components/cards/PackageCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { Sparkles, Layers, RotateCcw } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial filter state from URL parameters
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get('q') || '',
    region: searchParams.get('region') || '',
    destination: searchParams.get('destination') || '',
    holidayType: searchParams.get('holidayType') || '',
    durationMaxDays: searchParams.get('maxDays') ? Number(searchParams.get('maxDays')) : '',
    currency: searchParams.get('currency') || '',
    sortBy: (searchParams.get('sort') as FilterState['sortBy']) || 'featured',
    urgentOnly: searchParams.get('urgent') === 'true',
    minPaxGroup: searchParams.get('pax') || 'all'
  });

  // Sync state if URL search params change
  useEffect(() => {
    const dest = searchParams.get('destination');
    const ht = searchParams.get('holidayType');
    const reg = searchParams.get('region');
    if (dest !== null) setFilters((prev) => ({ ...prev, destination: dest }));
    if (ht !== null) setFilters((prev) => ({ ...prev, holidayType: ht }));
    if (reg !== null) setFilters((prev) => ({ ...prev, region: reg }));
  }, [searchParams]);

  // Unique destinations list for the filter dropdown
  const destinationsList = useMemo(() => {
    const set = new Set(ALL_PACKAGES.map((p) => p.destination));
    return Array.from(set).sort();
  }, []);

  // Filtered & Sorted Packages
  const filteredPackages = useMemo(() => {
    return ALL_PACKAGES.filter((pkg) => {
      // 1. Text search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesText =
          pkg.title.toLowerCase().includes(q) ||
          pkg.destination.toLowerCase().includes(q) ||
          pkg.description.toLowerCase().includes(q) ||
          pkg.stayDetails.toLowerCase().includes(q) ||
          pkg.features.some((f) => f.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      // 2. Region
      if (filters.region && pkg.region !== filters.region) {
        return false;
      }

      // 3. Destination
      if (filters.destination && pkg.destination.toLowerCase() !== filters.destination.toLowerCase()) {
        return false;
      }

      // 4. Holiday type
      if (filters.holidayType && pkg.holidayType.toLowerCase() !== filters.holidayType.toLowerCase()) {
        return false;
      }

      // 5. Currency
      if (filters.currency && pkg.currency !== filters.currency) {
        return false;
      }

      // 6. Urgent validity
      if (filters.urgentOnly && !pkg.isUrgentValidity) {
        return false;
      }

      // 7. Group size tier
      if (filters.minPaxGroup === 'solo-couple' && pkg.minPax > 2) {
        return false;
      }
      if (filters.minPaxGroup === 'group-4plus' && pkg.minPax < 4) {
        return false;
      }
      if (filters.minPaxGroup === 'mice-20plus' && pkg.minPax < 20) {
        return false;
      }

      // 8. Max Duration
      if (filters.durationMaxDays !== '' && pkg.durationDays > Number(filters.durationMaxDays)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'price-asc') {
        return a.priceValue - b.priceValue;
      }
      if (filters.sortBy === 'price-desc') {
        return b.priceValue - a.priceValue;
      }
      if (filters.sortBy === 'duration-asc') {
        return a.durationDays - b.durationDays;
      }
      if (filters.sortBy === 'duration-desc') {
        return b.durationDays - a.durationDays;
      }
      return 0;
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      region: '',
      destination: '',
      holidayType: '',
      durationMaxDays: '',
      currency: '',
      sortBy: 'featured',
      urgentOnly: false,
      minPaxGroup: 'all'
    });
    setSearchParams({});
  };

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Packages Catalogue' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>33 Verified Master Packages</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Curated Travel Packages
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Every package is grounded in our verified client master spreadsheet across four global regions. Filter by destination, holiday rhythm, duration, or group size.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filters Bar */}
        <PackageFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          destinationsList={destinationsList}
          totalResultsCount={filteredPackages.length}
        />

        {/* Packages Grid or Empty State */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-xl bg-white border border-slate-200 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No Packages Match Your Active Filters</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Try loosening your filters or resetting to see all 33 curated packages across our four global regions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#010048] text-[#f3e098] text-xs font-semibold hover:bg-[#080562] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      <CTASection />
    </div>
  );
};
