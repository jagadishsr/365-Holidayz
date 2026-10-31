import React from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { Region, HolidayTypeCategory } from '../../types';

export interface FilterState {
  searchQuery: string;
  region: string;
  destination: string;
  holidayType: string;
  durationMaxDays: number | '';
  currency: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
  urgentOnly: boolean;
  minPaxGroup: string; // 'all' | 'solo-couple' | 'group-4plus' | 'mice-20plus'
}

interface PackageFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  destinationsList: string[];
  totalResultsCount: number;
}

export const PackageFilters: React.FC<PackageFiltersProps> = ({
  filters,
  onChange,
  onReset,
  destinationsList,
  totalResultsCount
}) => {
  const regions: Region[] = ['Islands', 'Far East Asian', 'Middle East & Mediterranean', 'Other Countries'];
  const holidayTypes: HolidayTypeCategory[] = [
    'Honeymoon',
    'Family & Group',
    'Adventure',
    'Luxury Escapes',
    'Women Solo',
    'MICE & Corporate'
  ];

  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.region) ||
    Boolean(filters.destination) ||
    Boolean(filters.holidayType) ||
    filters.durationMaxDays !== '' ||
    Boolean(filters.currency) ||
    filters.urgentOnly ||
    filters.minPaxGroup !== 'all';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      {/* Top Search & Active Summary Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by package name, destination, features, stay..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] bg-slate-50/50"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort & Counter */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
            <span>Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
              className="px-2.5 py-1.5 rounded border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:ring-1 focus:ring-[#c8a97e]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Shorter First</option>
              <option value="duration-desc">Duration: Longer First</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row 1: Dropdown Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
        {/* Region */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => onChange({ ...filters, region: e.target.value, destination: '' })}
            className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-800 bg-white focus:ring-1 focus:ring-[#c8a97e]"
          >
            <option value="">All Regions</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Destination
          </label>
          <select
            value={filters.destination}
            onChange={(e) => onChange({ ...filters, destination: e.target.value })}
            className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-800 bg-white focus:ring-1 focus:ring-[#c8a97e]"
          >
            <option value="">All Destinations</option>
            {destinationsList.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Holiday Type */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Holiday Type
          </label>
          <select
            value={filters.holidayType}
            onChange={(e) => onChange({ ...filters, holidayType: e.target.value })}
            className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-800 bg-white focus:ring-1 focus:ring-[#c8a97e]"
          >
            <option value="">All Holiday Types</option>
            {holidayTypes.map((ht) => (
              <option key={ht} value={ht}>{ht}</option>
            ))}
          </select>
        </div>

        {/* Group / Pax Tier */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Group Size / Minimum Pax
          </label>
          <select
            value={filters.minPaxGroup}
            onChange={(e) => onChange({ ...filters, minPaxGroup: e.target.value })}
            className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-800 bg-white focus:ring-1 focus:ring-[#c8a97e]"
          >
            <option value="all">Any Group Size</option>
            <option value="solo-couple">Couples / 2 Pax (Min 2)</option>
            <option value="group-4plus">Small Groups (Min 4 Pax+)</option>
            <option value="mice-20plus">MICE & Corporate (Min 20 / 30 Pax)</option>
          </select>
        </div>
      </div>

      {/* Filter Row 2: Secondary Quick Chips & Urgency Toggle */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Urgency checkbox */}
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-900 cursor-pointer font-medium hover:bg-amber-100 transition-colors">
            <input
              type="checkbox"
              checked={filters.urgentOnly}
              onChange={(e) => onChange({ ...filters, urgentOnly: e.target.checked })}
              className="rounded border-amber-400 text-amber-700 focus:ring-amber-400"
            />
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Urgent Booking (Ends 31 Oct 2026)</span>
          </label>

          {/* Pricing Currency Status: All in INR */}
          <div className="flex items-center gap-1.5 bg-[#010048]/5 px-3 py-1.5 rounded-full border border-[#c59b27]/30 text-xs text-[#010048] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Prices in INR (₹)</span>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-600 font-medium">
          Showing <strong className="text-[#010048]">{totalResultsCount}</strong> verified package{totalResultsCount === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
};
