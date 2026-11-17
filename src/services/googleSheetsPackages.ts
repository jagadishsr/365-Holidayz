/**
 * 365Holidayz - Google Sheets Package Integration & Visibility Service
 *
 * Connects to a published Google Sheets CSV endpoint via VITE_PACKAGES_SHEET_CSV_URL
 * (`File -> Share -> Publish to web -> Comma-separated values (.csv)`).
 *
 * Supports BOTH:
 * 1) The master grouped Google Sheet layout:
 *    - Title row ("Packages Detail")
 *    - Column header row:
 *      S.No | Package Name | Package Title | Package Description | Features |
 *      Stay Period | Booking Validity | Persons | Rooms | Price (USD) | Price (INR)
 *      (+ optional Display Status / Flash Offer columns)
 *    - Region section rows ("I. ISLANDS", "II. FAR EAST ASIAN", etc.)
 *    - Destination section rows ("MALDIVES", "SRILANKA", "BALI , INDONESIA", etc.)
 * 2) Standard flat-table CSV sheets with explicit Destination / Region / Holiday Category columns.
 */

import { useCallback, useEffect, useState } from 'react';
import { ALL_PACKAGES } from '../data/packages';
import { ALL_DESTINATIONS } from '../data/destinations';
import {
  CurrencyCode,
  Destination,
  HolidayCategory,
  Package,
  PackageDisplayStatus,
  Region
} from '../types';

export interface SheetSyncStatus {
  configured: boolean;
  mode: 'live-google-sheet' | 'verified-local-baseline' | 'sheet-error-fallback';
  sourceUrl: string;
  lastSyncedAt: string | null;
  errorMessage: string | null;
}

const CACHE_KEY = '365holidayz_sheets_packages_v3';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function filterActivePackages(packages: Package[]): Package[] {
  return packages.filter((pkg) => (pkg.displayStatus ?? 'Active') === 'Active');
}

export function getPublishedDestinations(packages: Package[]): Destination[] {
  const active = filterActivePackages(packages);
  const matchedSlugs = new Set<string>();
  const synthesized: Destination[] = [];

  const matchedKnown = ALL_DESTINATIONS.filter((dest) => {
    const hasMatch = active.some(
      (pkg) =>
        pkg.destinationSlug === dest.slug ||
        pkg.destination.toLowerCase().includes(dest.name.toLowerCase())
    );
    if (hasMatch) matchedSlugs.add(dest.slug);
    return hasMatch;
  });

  active.forEach((pkg) => {
    if (
      matchedSlugs.has(pkg.destinationSlug) ||
      ALL_DESTINATIONS.some((d) => pkg.destination.toLowerCase().includes(d.name.toLowerCase()))
    ) {
      return;
    }
    matchedSlugs.add(pkg.destinationSlug);
    synthesized.push({
      id: `dest-${pkg.destinationSlug}`,
      slug: pkg.destinationSlug,
      name: pkg.destination,
      country: pkg.destination,
      region: pkg.region,
      tagline: `Curated international holidays across ${pkg.destination}`,
      heroImageSubject: `${pkg.destination} iconic skyline and coastal landscape`,
      description: pkg.description,
      whyVisit: pkg.features.slice(0, 4),
      keyExperiences: pkg.features.slice(0, 4),
      bestTimeToVisit: pkg.stayPeriod || 'Seasonal departures available',
      bestTimeEditorialLabel: pkg.bookingValidity,
      practicalInfo: {
        currency: pkg.originalCurrency || 'INR',
        language: 'English widely spoken in hospitality',
        idealDuration: pkg.duration,
        timeZone: 'Confirm local timings at enquiry',
        highlights: pkg.destination
      },
      travelStyles: [pkg.holidayType],
      isFeatured: false,
      faqs: []
    });
  });

  return [...matchedKnown, ...synthesized];
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

function cleanText(value?: string): string {
  return (value || '').replace(/\s+/g, ' ').trim();
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

function normalizeDestination(raw: string): { name: string; slug: string } {
  const upper = cleanText(raw).toUpperCase();
  if (upper.includes('MALDIVES')) return { name: 'Maldives', slug: 'maldives' };
  if (upper.includes('SRILANKA') || upper.includes('SRI LANKA')) {
    return { name: 'Sri Lanka', slug: 'sri-lanka' };
  }
  if (upper.includes('BALI')) return { name: 'Bali', slug: 'bali' };
  if (upper.includes('MAURITIUS') || upper.includes('MAURIITIUS')) {
    return { name: 'Mauritius', slug: 'mauritius' };
  }
  if (upper.includes('SEYCHELLES')) return { name: 'Seychelles', slug: 'seychelles' };
  if (upper.includes('SINGAPORE')) return { name: 'Singapore', slug: 'singapore' };
  if (upper.includes('MALAYSIA')) return { name: 'Malaysia', slug: 'malaysia' };
  if (upper.includes('THAILAND')) return { name: 'Thailand', slug: 'thailand' };
  if (upper.includes('VIETNAM')) return { name: 'Vietnam', slug: 'vietnam' };
  if (upper.includes('DUBAI') || upper.includes('UAE')) {
    return { name: 'Dubai & UAE', slug: 'dubai' };
  }
  if (upper.includes('TURKEY') || upper.includes('TURKIYE') || upper.includes('ISTANBUL')) {
    return { name: 'Istanbul & Turkey', slug: 'istanbul-turkey' };
  }
  if (upper.includes('BAHRAIN')) return { name: 'Kingdom of Bahrain', slug: 'bahrain' };
  if (upper.includes('JORDAN')) return { name: 'Jordan', slug: 'jordan' };
  if (upper.includes('OMAN')) return { name: 'Sultanate of Oman', slug: 'oman' };
  if (upper.includes('GEORGIA')) return { name: 'Georgia', slug: 'georgia' };
  if (upper.includes('AZERBAIJAN')) return { name: 'Azerbaijan', slug: 'azerbaijan' };
  if (upper.includes('KAZAKHSTAN')) return { name: 'Kazakhstan', slug: 'kazakhstan' };
  if (upper.includes('UZBEKISTAN')) return { name: 'Uzbekistan', slug: 'uzbekistan' };
  if (upper.includes('GREECE')) return { name: 'Greece', slug: 'greece' };

  const titleCased = cleanText(raw)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { name: titleCased || 'International', slug: slugify(titleCased || 'international') };
}

function parseRegionFromSection(raw: string): Region | null {
  const upper = cleanText(raw).toUpperCase();
  if (/^(I\.|REGION\s*1)/.test(upper) || upper === 'ISLANDS') return 'Islands';
  if (/^(II\.|REGION\s*2)/.test(upper) || upper.includes('FAR EAST')) return 'Far East Asian';
  if (/^(III\.|REGION\s*3)/.test(upper) || upper.includes('MIDDLE EAST') || upper.includes('MEDIT')) {
    return 'Middle East & Mediterranean';
  }
  if (/^(IV\.|REGION\s*4)/.test(upper) || upper.includes('OTHER COUNTRIES')) {
    return 'Other Countries';
  }
  return null;
}

function inferDuration(text: string): { duration: string; nights: number; days: number } {
  const ndMatch = text.match(/(\d+)\s*n(?:ights?|ihgts?)?\s*\/\s*(\d+)\s*d(?:ays?)?/i);
  if (ndMatch) {
    const nights = Number(ndMatch[1]);
    const days = Number(ndMatch[2]);
    return {
      duration: `${nights} Nights / ${days} Days`,
      nights,
      days
    };
  }

  const nOnlyMatch = text.match(/(\d+)\s*n(?:ights?|ihgts?)?\b/i);
  if (nOnlyMatch) {
    const nights = Number(nOnlyMatch[1]);
    const days = nights + 1;
    return {
      duration: `${nights} Nights / ${days} Days`,
      nights,
      days
    };
  }

  return { duration: '4 Nights / 5 Days', nights: 4, days: 5 };
}

function inferHolidayCategory(rawCategory: string, combinedText: string): HolidayCategory {
  if (rawCategory) return rawCategory as HolidayCategory;
  const t = combinedText.toLowerCase();
  if (t.includes('mice') || t.includes('corporate')) return 'MICE & Corporate';
  if (t.includes('honeymoon')) return 'Honeymoon';
  if (t.includes('family') || t.includes('fiesta') || t.includes('diwali') || t.includes('summer')) {
    return 'Family & Group';
  }
  if (t.includes('off beat') || t.includes('thrill') || t.includes('wilds') || t.includes('adventure')) {
    return 'Adventure';
  }
  if (t.includes('heritage') || t.includes('wonders') || t.includes('glimpse') || t.includes('discover')) {
    return 'Culture & Heritage';
  }
  return 'Luxury Escapes';
}

function parseForeignCurrencyAndPrice(raw: string): { currency: CurrencyCode; amount?: number } {
  const cleaned = cleanText(raw);
  if (!cleaned) return { currency: 'USD', amount: undefined };

  let currency: CurrencyCode = 'USD';
  if (/sgd/i.test(cleaned)) currency = 'SGD';
  else if (/eur/i.test(cleaned)) currency = 'EUR';
  else if (/inr|₹/i.test(cleaned)) currency = 'INR';

  const amount = parseNumber(cleaned);
  return { currency, amount: amount > 0 ? amount : undefined };
}

function normalizeDisplayStatus(raw?: string): PackageDisplayStatus {
  const val = cleanText(raw).toLowerCase();
  if (val === 'hidden' || val === 'inactive' || val === 'no' || val === 'draft') {
    return 'Hidden';
  }
  return 'Active';
}

export function mapCsvToPackages(csvText: string): Package[] {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) return [];

  // Locate the real column header row (row 0 may be "Packages Detail")
  let headerRowIdx = rows.findIndex((r) => {
    const joined = r.map((c) => cleanText(c).toLowerCase()).join('|');
    return (
      (joined.includes('package name') || joined.includes('package title') || joined.includes('title')) &&
      (joined.includes('price') || joined.includes('destination') || joined.includes('features'))
    );
  });
  if (headerRowIdx === -1) headerRowIdx = 0;

  const headers = rows[headerRowIdx].map((h) => cleanText(h).toLowerCase());
  const colExactOrIncludes = (aliases: string[]) => {
    const exact = headers.findIndex((h) => aliases.some((a) => h === a));
    if (exact !== -1) return exact;
    return headers.findIndex((h) => aliases.some((a) => h.includes(a)));
  };

  const idxSNo = colExactOrIncludes(['s.no', 'sno', 'sl no', '#']);
  const idxPkgName = colExactOrIncludes(['package name']);
  const idxPkgTitle = colExactOrIncludes(['package title', 'title', 'package']);
  const idxDestination = colExactOrIncludes(['destination']);
  const idxRegion = colExactOrIncludes(['region']);
  const idxCategory = colExactOrIncludes(['holiday category', 'holiday type', 'category']);
  const idxDuration = colExactOrIncludes(['duration']);
  const idxStayPeriod = colExactOrIncludes(['stay period', 'travel period']);
  const idxPersons = colExactOrIncludes(['persons', 'pax', 'min pax']);
  const idxRooms = colExactOrIncludes(['rooms', 'room basis']);
  const idxFeatures = colExactOrIncludes(['features', 'inclusions']);
  const idxOrigCurrency = colExactOrIncludes(['original currency', 'currency']);
  const idxOrigPrice = colExactOrIncludes(['price (usd)', 'original price']);
  const idxPriceInr = colExactOrIncludes(['price (inr)', 'price inr', 'inr price']);
  const idxGenericPrice = colExactOrIncludes(['price']);
  const idxBookingValidity = colExactOrIncludes(['booking validity', 'validity']);
  const idxAdvanceCond = colExactOrIncludes(['advance booking conditions', 'advance booking', 'conditions']);
  const idxDisplayStatus = colExactOrIncludes(['display status', 'status', 'visibility']);
  const idxFlashOffer = colExactOrIncludes(['flash offer', 'flash']);
  const idxDescription = colExactOrIncludes(['package description', 'description', 'summary']);
  const idxStayDetails = colExactOrIncludes(['stay details', 'hotel', 'resort']);

  let currentRegion: Region = 'Islands';
  let currentDestination = { name: 'Maldives', slug: 'maldives' };
  const parsedPackages: Package[] = [];

  for (let rowIndex = headerRowIdx + 1; rowIndex < rows.length; rowIndex++) {
    const r = rows[rowIndex];
    const get = (i: number) => (i >= 0 && i < r.length ? cleanText(r[i]) : '');

    const firstCell = get(idxSNo !== -1 ? idxSNo : 0);
    const nonEmptyCells = r.map((c) => cleanText(c)).filter(Boolean);
    if (nonEmptyCells.length === 0) continue;

    // Check if this is a Region section row ("I. ISLANDS") or Destination header row ("MALDIVES")
    const hasTitleOrPrice =
      Boolean(get(idxPkgTitle)) ||
      Boolean(get(idxPriceInr)) ||
      Boolean(get(idxOrigPrice)) ||
      Boolean(get(idxDescription));

    if (!hasTitleOrPrice && nonEmptyCells.length <= 2) {
      const sectionLabel = nonEmptyCells[0];
      const detectedRegion = parseRegionFromSection(sectionLabel);
      if (detectedRegion) {
        currentRegion = detectedRegion;
      } else {
        currentDestination = normalizeDestination(sectionLabel);
      }
      continue;
    }

    const rawPkgName = get(idxPkgName);
    const rawPkgTitle = get(idxPkgTitle);
    if (!rawPkgName && !rawPkgTitle) continue;

    const destColVal = get(idxDestination);
    const destInfo = destColVal
      ? normalizeDestination(destColVal)
      : currentDestination;

    const regionColVal = get(idxRegion);
    const regionValue = (regionColVal || currentRegion) as Region;

    // Combine Package Name + Package Title without repeating country-only labels
    let displayTitle = rawPkgTitle || rawPkgName;
    if (rawPkgName && rawPkgTitle) {
      const normName = slugify(rawPkgName);
      const normDest = slugify(destInfo.name);
      const nameIsJustCountry =
        normName === normDest ||
        rawPkgName.toUpperCase() === 'SRILANKA' ||
        rawPkgName.toUpperCase() === 'TURKEY';

      if (!nameIsJustCountry && !slugify(rawPkgTitle).includes(normName)) {
        displayTitle = `${rawPkgName} — ${rawPkgTitle}`;
      }
    }

    const description = get(idxDescription);
    const featuresRaw = get(idxFeatures);
    const features = featuresRaw
      ? featuresRaw
          .split(/\||;|\n|,(?=\s*[A-Za-z0-9])/)
          .map((f) => cleanText(f))
          .filter(Boolean)
      : ['Accommodation & breakfast', 'Airport transfers', 'Curated sightseeing'];

    const durationSource = `${get(idxDuration)} ${rawPkgTitle} ${description} ${featuresRaw}`;
    const { duration, nights, days } = inferDuration(durationSource);

    const minPaxMatch = `${rawPkgName} ${rawPkgTitle}`.match(/min\s*(\d+)/i);
    const rawPersonsCell = get(idxPersons);
    let personsDisplay = 'Per Person (Double Sharing)';
    let minPax = 2;
    if (minPaxMatch) {
      minPax = Number(minPaxMatch[1]);
      personsDisplay = `Min ${minPax} Pax`;
    } else if (rawPersonsCell && rawPersonsCell !== '1') {
      personsDisplay = rawPersonsCell;
      const cellMatch = rawPersonsCell.match(/\d+/);
      if (cellMatch) minPax = Number(cellMatch[0]);
    }

    const roomsRaw = get(idxRooms);
    const rooms =
      roomsRaw.toLowerCase().includes('twin')
        ? 'Twin sharing'
        : roomsRaw || 'Double sharing';

    const inrVal = parseNumber(get(idxPriceInr) || get(idxGenericPrice));
    const foreignParsed = parseForeignCurrencyAndPrice(get(idxOrigPrice));
    const origCurr: CurrencyCode = get(idxOrigCurrency)
      ? (get(idxOrigCurrency).toUpperCase() as CurrencyCode)
      : foreignParsed.currency;
    const origPrice = foreignParsed.amount;

    const bookingValidity = get(idxBookingValidity) || 'Confirm availability on enquiry';
    const advanceConditions = get(idxAdvanceCond);
    const displayStatus = normalizeDisplayStatus(get(idxDisplayStatus));
    const flashRaw = get(idxFlashOffer).toLowerCase();
    const isFlash =
      flashRaw === 'yes' ||
      flashRaw === 'true' ||
      flashRaw === '1' ||
      /flash\s*offer/i.test(`${rawPkgName} ${rawPkgTitle}`);

    const numericSno = Number(firstCell);
    const stableId =
      Number.isInteger(numericSno) && numericSno > 0
        ? `pkg-${String(numericSno).padStart(2, '0')}`
        : `sheet-pkg-${parsedPackages.length + 1}`;

    const holidayType = inferHolidayCategory(
      get(idxCategory),
      `${rawPkgName} ${rawPkgTitle} ${description}`
    );

    const effectiveInr = inrVal || origPrice || 0;

    parsedPackages.push({
      id: stableId,
      slug: slugify(`${destInfo.slug}-${displayTitle}-${parsedPackages.length + 1}`),
      title: displayTitle,
      destination: destInfo.name,
      destinationSlug: destInfo.slug,
      region: regionValue,
      holidayType,
      duration,
      durationNights: nights,
      durationDays: days,
      persons: personsDisplay,
      minPax,
      roomBasis: rooms,
      stayPeriod: get(idxStayPeriod) || 'Seasonal validity — confirm dates',
      bookingValidity,
      isUrgentValidity: /31\s*oct|urgent|limited|flash/i.test(`${bookingValidity} ${rawPkgName}`) || isFlash,
      currency: 'INR',
      priceValue: effectiveInr,
      priceDisplay: formatInr(effectiveInr),
      originalCurrency: origCurr,
      originalPrice: origPrice,
      inrPrice: inrVal || undefined,
      inrPriceDisplay: inrVal ? formatInr(inrVal) : undefined,
      priceBasisNote:
        advanceConditions ||
        (origPrice ? `Sheet ref: ${origCurr} ${origPrice.toLocaleString('en-IN')} · Per person on ${rooms}` : `Per person on ${rooms}`),
      advanceBookingConditions: advanceConditions || undefined,
      description:
        description ||
        `${duration} curated itinerary in ${destInfo.name} designed by 365Holidayz travel specialists.`,
      stayDetails: get(idxStayDetails) || features[0] || `${rooms} in vetted hotel or resort`,
      features,
      itineraryStatus: 'Detailed day-wise itinerary available on request',
      imageSubject: `${destInfo.name} ${displayTitle}`,
      isFeatured: parsedPackages.length < 6,
      displayStatus,
      isFlashOffer: isFlash
    });
  }

  return parsedPackages;
}

const DEFAULT_PACKAGES_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/14M2X50ABnzcOduPfWiNxBqGq7m7FCmy7C2lMTHwy3RY/edit?gid=517827184#gid=517827184';

function buildCandidateCsvUrls(raw: string): string[] {
  const url = raw.trim();
  if (!url) return [];

  if (url.includes('output=csv') || url.includes('format=csv') || url.includes('tqx=out:csv')) {
    return [url];
  }

  const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    const gidMatch = url.match(/[?&#]gid=(\d+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return [
      `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv${gidParam}`,
      `https://docs.google.com/spreadsheets/d/${idMatch[1]}/gviz/tq?tqx=out:csv${gidParam}`
    ];
  }

  return [url];
}

function getConfiguredSheetUrl(): string {
  const envUrl = (import.meta.env.VITE_PACKAGES_SHEET_CSV_URL || '').trim();
  return envUrl || DEFAULT_PACKAGES_SHEET_URL;
}

export async function fetchPackagesWithStatus(_forceRefresh = false): Promise<{
  packages: Package[];
  status: SheetSyncStatus;
}> {
  const configuredUrl = getConfiguredSheetUrl();
  const candidates = buildCandidateCsvUrls(configuredUrl);

  if (candidates.length === 0) {
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

  let lastError: unknown = null;

  for (const endpoint of candidates) {
    const cacheBustUrl = `${endpoint}${endpoint.includes('?') ? '&' : '?'}_cb=${Date.now()}`;
    try {
      const response = await fetch(cacheBustUrl, { cache: 'no-store' });
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
            JSON.stringify({ timestamp: Date.now(), url: endpoint, packages: parsed })
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
          sourceUrl: endpoint,
          lastSyncedAt: new Date().toISOString(),
          errorMessage: null
        }
      };
    } catch (err) {
      lastError = err;
    }
  }

  // Fallback to cached copy if offline/unreachable
  if (typeof window !== 'undefined') {
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as {
          timestamp: number;
          url: string;
          packages: Package[];
        };
        if (candidates.includes(cached.url) && cached.packages.length > 0) {
          return {
            packages: filterActivePackages(cached.packages),
            status: {
              configured: true,
              mode: 'sheet-error-fallback',
              sourceUrl: candidates[0],
              lastSyncedAt: new Date(cached.timestamp).toISOString(),
              errorMessage: lastError instanceof Error ? lastError.message : 'Network fallback'
            }
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  const message = lastError instanceof Error ? lastError.message : 'Unable to reach Google Sheet CSV';
  return {
    packages: filterActivePackages(ALL_PACKAGES),
    status: {
      configured: true,
      mode: 'sheet-error-fallback',
      sourceUrl: candidates[0],
      lastSyncedAt: null,
      errorMessage: message
    }
  };
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

  const load = useCallback(async (force = true) => {
    if (getConfiguredSheetUrl()) setLoading(true);
    const result = await fetchPackagesWithStatus(force);
    setPackages(result.packages);
    setStatus(result.status);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(true);
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
