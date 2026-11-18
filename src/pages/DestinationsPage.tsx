import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { PackageCard } from '../components/cards/PackageCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { CTASection } from '../components/common/CTASection';
import { DESTINATION_STOCK_IMAGES, GENERATED_ASSETS } from '../data/stockImages';
import { Package } from '../types';
import {
  filterActivePackages,
  getPublishedDestinations,
  SheetSyncStatus
} from '../services/googleSheetsPackages';

interface DestinationsPageProps {
  packages: Package[];
  packagesLoading: boolean;
  sheetStatus: SheetSyncStatus;
  onRefreshPackages: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  packages,
  packagesLoading,
  sheetStatus,
  onRefreshPackages
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDestination, setSelectedDestination] = useState<string>(
    searchParams.get('destination') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || searchParams.get('holidayType') || ''
  );

  useEffect(() => {
    const dest = searchParams.get('destination') || '';
    const cat = searchParams.get('category') || searchParams.get('holidayType') || '';
    setSelectedDestination(dest);
    setSelectedCategory(cat);
  }, [searchParams]);

  const activePackages = useMemo(() => filterActivePackages(packages), [packages]);

  const destinationOptions = useMemo(() => {
    const names = new Set(activePackages.map((p) => p.destination));
    return Array.from(names).sort();
  }, [activePackages]);

  const filteredPackages = useMemo(() => {
    return activePackages.filter((pkg) => {
      if (
        selectedDestination &&
        pkg.destination.toLowerCase() !== selectedDestination.toLowerCase()
      ) {
        return false;
      }
      if (
        selectedCategory &&
        pkg.holidayType.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [activePackages, selectedDestination, selectedCategory]);

  const handleUpdateFilter = (dest: string, cat: string) => {
    setSelectedDestination(dest);
    setSelectedCategory(cat);
    const next = new URLSearchParams();
    if (dest) next.set('destination', dest);
    if (cat) next.set('category', cat);
    setSearchParams(next);
  };

  const resetFilters = () => {
    handleUpdateFilter('', '');
  };

  const publishedDestinations = useMemo(
    () => getPublishedDestinations(activePackages),
    [activePackages]
  );

  const activeFilterDestination = useMemo(() => {
    if (!selectedDestination) return undefined;
    return publishedDestinations.find(
      (d) =>
        d.name.toLowerCase() === selectedDestination.toLowerCase() ||
        d.slug === selectedDestination.toLowerCase()
    );
  }, [publishedDestinations, selectedDestination]);

  const bannerImage =
    activeFilterDestination?.imageUrl ||
    activeFilterDestination?.galleryImages?.[0] ||
    (activeFilterDestination ? DESTINATION_STOCK_IMAGES[activeFilterDestination.slug] : undefined) ||
    GENERATED_ASSETS.introSeAsia;

  return (
    <div className="bg-[#FAF9F6]">
      {/* Expansive Destination Hero Banner */}
      <section className="relative h-[52vh] min-h-[380px] bg-[#111827] text-white overflow-hidden">
        <img
          src={bannerImage}
          alt={activeFilterDestination?.name || '365Holidayz International Destinations'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 mb-3 block">
            Destinations &amp; Curated Packages
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            DESTINATIONS
          </h1>
          <p className="text-sm sm:text-lg text-white/90 max-w-2xl mt-3">
            Browse curated international destinations and live active travel packages priced transparently in INR.
          </p>
        </div>
      </section>

      {/* Main Content: Simple 2-Control Filter + Active Packages */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Clean Filter Strip: Only Destination & Holiday Category */}
        <div className="bg-white border border-[#E5E2DC] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div>
              <label
                htmlFor="filter-destination"
                className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] mb-1.5"
              >
                Destination
              </label>
              <select
                id="filter-destination"
                value={selectedDestination}
                onChange={(e) => handleUpdateFilter(e.target.value, selectedCategory)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm font-medium text-[#111827] focus:outline-hidden focus:border-[#010048]"
              >
                <option value="">All Destinations</option>
                {destinationOptions.map((destName) => (
                  <option key={destName} value={destName}>
                    {destName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-category"
                className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] mb-1.5"
              >
                Holiday Category
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => handleUpdateFilter(selectedDestination, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm font-medium text-[#111827] focus:outline-hidden focus:border-[#010048]"
              >
                <option value="">All Holiday Categories</option>
                {ALL_HOLIDAY_TYPES.map((ht) => (
                  <option key={ht.id} value={ht.title}>
                    {ht.title}
                  </option>
                ))}
                <option value="MICE & Corporate">MICE &amp; Corporate</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {(selectedDestination || selectedCategory) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}

            {sheetStatus.configured && (
              <button
                type="button"
                onClick={onRefreshPackages}
                title="Refresh packages from Google Sheets"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${packagesLoading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Packages Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
              Available Packages
            </h2>
            <span className="font-mono-tabular text-xs font-semibold text-[#6B7280]">
              {filteredPackages.length} Active {filteredPackages.length === 1 ? 'Package' : 'Packages'}
            </span>
          </div>

          {packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-[440px] rounded-2xl bg-white border border-[#E5E2DC] animate-pulse"
                />
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-[#E5E2DC] text-center space-y-4">
              <p className="font-display text-lg font-bold text-[#111827]">
                No Active Packages Match This Selection
              </p>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                We tailor bespoke holidays across all global destinations even when fixed packages are not currently listed.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] cursor-pointer"
                >
                  Show All Packages
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-full bg-[#010048] text-white text-xs font-semibold hover:bg-[#D94E28]"
                >
                  Request Custom Trip
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>

        {/* Explore Destination Guides Directory */}
        <div className="pt-12 border-t border-[#E5E2DC] space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
              Destination Dossiers
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827]">
              Explore By Destination
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPublishedDestinations(activePackages).map((dest) => {
              const matching = activePackages.filter(
                (p) =>
                  p.destinationSlug === dest.slug ||
                  p.destination.toLowerCase().includes(dest.name.toLowerCase())
              );
              const lowest = matching.reduce((min, pkg) => {
                const v = pkg.inrPrice || pkg.priceValue;
                return v > 0 && v < min ? v : min;
              }, Number.POSITIVE_INFINITY);
              const priceLabel =
                Number.isFinite(lowest) && lowest > 0
                  ? `₹${Math.round(lowest).toLocaleString('en-IN')}`
                  : undefined;

              return (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  startingPrice={priceLabel}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
