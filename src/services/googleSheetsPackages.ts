/**
 * 365Holidayz - Google Sheets Package Integration & Visibility Service
 *
 * Expects a published Google Sheets CSV endpoint via VITE_PACKAGES_SHEET_CSV_URL
 * (`File -> Share -> Publish to web -> Comma-separated values (.csv)`).
 *
 * Supported Spreadsheet Columns:
 * - Title
 * - Destination
 * - Region
 * - Holiday Category
 * - Duration
 * - Stay Period
 * - Persons
 * - Rooms
 * - Features
 * - Original Currency
 * - Original Price
 * - Price INR
 * - Booking Validity
 * - Advance Booking Conditions
 * - Display Status ("Active" | "Hidden")
 * - Flash Offer (optional: "Yes" | "No")
 */

import { useCallback, useEffect, useState } from 'react';
import { ALL_PACKAGES } from '../data/packages';
import { CurrencyCode, HolidayCategory, Package, PackageDisplayStatus, Region } from '../types';

export interface SheetSyncStatus {
  configured: boolean;
  mode: 'live-google-sheet' | 'verified-local-baseline' | 'sheet-error-fallback';
  sourceUrl: string;
  lastSyncedAt: string | null;
  errorMessage: string | null;
}

const CACHE_KEY = '365holidayz_sheets_packages_v2';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function filterActivePackages(packages: Package[]): Package[] {
  return packages.filter((pkg) => (pkg.displayStatus ?? 'Active') === 'Active');
}

export function getActiveFlashOffers(packages: Package[]): Package[] {
  const active = filterActivePackages(packages);
  const flagged = active.filter((p) => p.isFlashOffer || p.isUrgentValidity);
  return flagged.length > 0 ? flagged.slice(0, 6) : active.filter((p) => p.isFeatured).slice(0, 4);
}

/**
 * Minimal RFC-4180 compliant CSV parser handling quoted fields, escaped quotes, and CRLF/LF newlines.
 */
export function parseCsvRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field.trim());
        field = '';
      } else if (ch === '\r' && next === '\n') {
        row.push(field.trim());
        rows.push(row);
        row = [];
        field = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        row.push(field.trim());
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.length > 0));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseNumber(raw?: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatInr(amount: number): string {
  if (!amount || amount <= 0) return 'On Request';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

function parseDurationParts(durationText: string): { nights: number; days: number } {
  const nightsMatch = durationText.match(/(\d+)\s*N/i);
  const daysMatch = durationText.match(/(\d+)\s*D/i);
  const nights = nightsMatch ? Number(nightsMatch[1]) : 4;
  const days = daysMatch ? Number(daysMatch[1]) : nights + 1;
  return { nights, days };
}

function normalizeDisplayStatus(raw?: string): PackageDisplayStatus {
  const val = (raw || '').trim().toLowerCase();
  if (val === 'hidden' || val === 'inactive' || val === 'no' || val === 'draft') {
    return 'Hidden';
  }
  return 'Active';
}

function mapCsvToPackages(csvText: string): Package[] {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const col = (nameAliases: string[]) =>
    headers.findIndex((h) => nameAliases.some((alias) => h === alias || h.includes(alias)));

  const idxTitle = col(['title', 'package name', 'package']);
  const idxDestination = col(['destination']);
  const idxRegion = col(['region']);
  const idxCategory = col(['holiday category', 'holiday type', 'category']);
  const idxDuration = col(['duration']);
  const idxStayPeriod = col(['stay period', 'travel period']);
  const idxPersons = col(['persons', 'pax', 'min pax']);
  const idxRooms = col(['rooms', 'room basis']);
  const idxFeatures = col(['features', 'inclusions']);
  const idxOrigCurrency = col(['original currency', 'currency']);
  const idxOrigPrice = col(['original price']);
  const idxPriceInr = col(['price inr', 'inr price', 'price']);
  const idxBookingValidity = col(['booking validity', 'validity']);
  const idxAdvanceCond = col(['advance booking conditions', 'advance booking', 'conditions']);
  const idxDisplayStatus = col(['display status', 'status', 'visibility']);
  const idxFlashOffer = col(['flash offer', 'flash']);
  const idxDescription = col(['description', 'summary']);
  const idxStayDetails = col(['stay details', 'hotel', 'resort']);

  return rows.slice(1).map((r, index) => {
    const get = (i: number) => (i >= 0 && i < r.length ? r[i] : '');
    const title = get(idxTitle) || `Curated Holiday ${index + 1}`;
    const destination = get(idxDestination) || 'International';
    const regionRaw = (get(idxRegion) || 'Other Countries') as Region;
    const categoryRaw = (get(idxCategory) || 'Luxury Escapes') as HolidayCategory;
    const duration = get(idxDuration) || '5 Nights / 6 Days';
    const { nights, days } = parseDurationParts(duration);
    const persons = get(idxPersons) || 'Min 2 Pax';
    const minPaxMatch = persons.match(/\d+/);
    const minPax = minPaxMatch ? Number(minPaxMatch[0]) : 2;
    const rooms = get(idxRooms) || 'Double sharing';
    const featuresRaw = get(idxFeatures);
    const features = featuresRaw
      ? featuresRaw
          .split(/\||;|\n/)
          .map((f) => f.trim())
          .filter(Boolean)
      : ['Accommodation & breakfast', 'Airport transfers', 'Curated sightseeing'];

    const inrPrice = parseNumber(get(idxPriceInr));
    const originalPrice = parseNumber(get(idxOrigPrice));
    const origCurrRaw = (get(idxOrigCurrency) || 'INR').toUpperCase() as CurrencyCode;
    const displayStatus = normalizeDisplayStatus(get(idxDisplayStatus));
    const bookingValidity = get(idxBookingValidity) || 'Confirm availability on enquiry';
    const advanceConditions = get(idxAdvanceCond);
    const flashRaw = get(idxFlashOffer).toLowerCase();

    return {
      id: `sheet-pkg-${index + 1}`,
      slug: slugify(`${destination}-${title}-${index + 1}`),
      title,
      destination,
      destinationSlug: slugify(destination),
      region: regionRaw,
      holidayType: categoryRaw,
      duration,
      durationNights: nights,
      durationDays: days,
      persons,
      minPax,
      roomBasis: rooms,
      stayPeriod: get(idxStayPeriod) || 'Seasonal validity — confirm dates',
      bookingValidity,
      isUrgentValidity: /31\s*oct|urgent|limited|flash/i.test(bookingValidity) || flashRaw === 'yes',
      currency: 'INR',
      priceValue: inrPrice || originalPrice,
      priceDisplay: formatInr(inrPrice || originalPrice),
      originalCurrency: origCurrRaw,
      originalPrice: originalPrice || undefined,
      inrPrice: inrPrice || undefined,
      inrPriceDisplay: inrPrice ? formatInr(inrPrice) : undefined,
      priceBasisNote: advanceConditions || 'Rates from Google Sheets master — confirm availability at enquiry',
      advanceBookingConditions: advanceConditions || undefined,
      description:
        get(idxDescription) ||
        `${duration} curated itinerary in ${destination} designed by 365Holidayz travel specialists.`,
      stayDetails: get(idxStayDetails) || `${rooms} in vetted boutique or luxury properties`,
      features,
      itineraryStatus: 'Detailed day-wise itinerary available on request',
      imageSubject: `${destination} ${title}`,
      isFeatured: index < 6,
      displayStatus,
      isFlashOffer: flashRaw === 'yes' || flashRaw === 'true' || flashRaw === '1'
    };
  });
}

function getConfiguredSheetUrl(): string {
  return (import.meta.env.VITE_PACKAGES_SHEET_CSV_URL || '').trim();
}

export async function fetchPackagesWithStatus(forceRefresh = false): Promise<{
  packages: Package[];
  status: SheetSyncStatus;
}> {
  const sheetUrl = getConfiguredSheetUrl();

  if (!sheetUrl) {
    const activeBaseline = filterActivePackages(ALL_PACKAGES);
    return {
      packages: activeBaseline,
      status: {
        configured: false,
        mode: 'verified-local-baseline',
        sourceUrl: '',
        lastSyncedAt: null,
        errorMessage: null
      }
    };
  }

  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as {
          timestamp: number;
          url: string;
          packages: Package[];
        };
        if (cached.url === sheetUrl && Date.now() - cached.timestamp < CACHE_TTL_MS) {
          return {
            packages: filterActivePackages(cached.packages),
            status: {
              configured: true,
              mode: 'live-google-sheet',
              sourceUrl: sheetUrl,
              lastSyncedAt: new Date(cached.timestamp).toISOString(),
              errorMessage: null
            }
          };
        }
      }
    } catch {
      // Ignore cache read issues cleanly
    }
  }

  try {
    const response = await fetch(sheetUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Google Sheets CSV endpoint returned HTTP ${response.status}`);
    }
    const csvText = await response.text();
    const parsed = mapCsvToPackages(csvText);
    const activeOnly = filterActivePackages(parsed);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), url: sheetUrl, packages: parsed })
        );
      } catch {
        // Ignore storage quota issues
      }
    }

    return {
      packages: activeOnly,
      status: {
        configured: true,
        mode: 'live-google-sheet',
        sourceUrl: sheetUrl,
        lastSyncedAt: new Date().toISOString(),
        errorMessage: null
      }
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to reach published Google Sheet CSV';
    return {
      packages: filterActivePackages(ALL_PACKAGES),
      status: {
        configured: true,
        mode: 'sheet-error-fallback',
        sourceUrl: sheetUrl,
        lastSyncedAt: null,
        errorMessage: message
      }
    };
  }
}

export function usePackagesData() {
  const [packages, setPackages] = useState<Package[]>(() => filterActivePackages(ALL_PACKAGES));
  const [loading, setLoading] = useState<boolean>(() => Boolean(getConfiguredSheetUrl()));
  const [status, setStatus] = useState<SheetSyncStatus>({
    configured: Boolean(getConfiguredSheetUrl()),
    mode: getConfiguredSheetUrl() ? 'live-google-sheet' : 'verified-local-baseline',
    sourceUrl: getConfiguredSheetUrl(),
    lastSyncedAt: null,
    errorMessage: null
  });

  const load = useCallback(async (force = false) => {
    if (getConfiguredSheetUrl()) setLoading(true);
    const result = await fetchPackagesWithStatus(force);
    setPackages(result.packages);
    setStatus(result.status);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(false);
    const intervalId = getConfiguredSheetUrl()
      ? window.setInterval(() => load(true), CACHE_TTL_MS)
      : undefined;
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [load]);

  return {
    packages,
    loading,
    status,
    refresh: () => load(true)
  };
}
