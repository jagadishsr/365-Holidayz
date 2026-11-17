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

const CACHE_KEY = '365holidayz_sheets_packages_v4';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function filterActivePackages(packages: Package[]): Package[] {
  return packages.filter((pkg) => (pkg.displayStatus ?? 'Active') === 'Active');
}

function collectDestinationGallery(matchingPkgs: Package[]): string[] | undefined {
  const seen = new Set<string>();
  const collected: string[] = [];

  for (const p of matchingPkgs) {
    if (p.galleryImages && p.galleryImages.length > 0) {
      for (const url of p.galleryImages) {
        if (url && !seen.has(url)) {
          seen.add(url);
          collected.push(url);
          if (collected.length >= 8) return collected;
        }
      }
    }
  }

  return collected.length > 0 ? collected : undefined;
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
  }).map((dest) => {
    const matchingPkgs = active.filter(
      (pkg) =>
        pkg.destinationSlug === dest.slug ||
        pkg.destination.toLowerCase().includes(dest.name.toLowerCase())
    );
    const pkgWithImage = matchingPkgs.find((pkg) => pkg.imageUrl);
    const galleryImages = collectDestinationGallery(matchingPkgs);
    return {
      ...dest,
      ...(pkgWithImage?.imageUrl ? { imageUrl: pkgWithImage.imageUrl } : {}),
      ...(galleryImages ? { galleryImages } : {})
    };
  });

  active.forEach((pkg) => {
    if (
      matchedSlugs.has(pkg.destinationSlug) ||
      ALL_DESTINATIONS.some((d) => pkg.destination.toLowerCase().includes(d.name.toLowerCase()))
    ) {
      return;
    }
    matchedSlugs.add(pkg.destinationSlug);
    const matchingPkgs = active.filter((p) => p.destinationSlug === pkg.destinationSlug);
    const explicitImageUrl = matchingPkgs.find((p) => p.imageUrl)?.imageUrl;
    const galleryImages = collectDestinationGallery(matchingPkgs);
    synthesized.push({
      id: `dest-${pkg.destinationSlug}`,
      slug: pkg.destinationSlug,
      name: pkg.destination,
      country: pkg.destination,
      region: pkg.region,
      tagline: `Curated international holidays across ${pkg.destination}`,
      imageUrl: explicitImageUrl,
      galleryImages,
      heroImageSubject: `${pkg.destination} ${pkg.title} scenic travel landscape`,
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
  if (upper.includes('SWITZERLAND') || upper.includes('SWISS')) {
    return { name: 'Switzerland', slug: 'switzerland' };
  }
  if (upper.includes('FRANCE') || upper.includes('PARIS')) return { name: 'France', slug: 'france' };
  if (upper.includes('ITALY')) return { name: 'Italy', slug: 'italy' };
  if (upper.includes('AUSTRIA')) return { name: 'Austria', slug: 'austria' };
  if (upper.includes('GERMANY')) return { name: 'Germany', slug: 'germany' };
  if (upper.includes('UNITED KINGDOM') || upper === 'UK' || upper.includes('LONDON')) {
    return { name: 'United Kingdom', slug: 'united-kingdom' };
  }
  if (upper.includes('JAPAN')) return { name: 'Japan', slug: 'japan' };
  if (upper.includes('AUSTRALIA')) return { name: 'Australia', slug: 'australia' };

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
  if (/^(V\.|VI\.|REGION\s*5)/.test(upper) || upper === 'EUROPE' || upper.includes('EUROPE')) {
    return 'Europe';
  }
  if (upper === 'AFRICA' || upper === 'AMERICAS' || upper === 'AUSTRALIA & OCEANIA') {
    return cleanText(raw)
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return null;
}

function normalizeImageUrl(raw?: string): string | undefined {
  const val = cleanText(raw);
  if (!val || !/^https?:\/\//i.test(val)) return undefined;

  // Auto-convert Google Drive file share URLs into directly embeddable image URLs
  const driveFileMatch = val.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w1600`;
  }
  const driveOpenMatch = val.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch && driveOpenMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveOpenMatch[1]}&sz=w1600`;
  }

  // Auto-convert Pexels photo page URLs (e.g. https://www.pexels.com/photo/slug-32514343/) into direct CDN image
  const pexelsPhotoMatch = val.match(/pexels\.com\/photo\/(?:[^/]*-)?(\d+)\/?/i);
  if (pexelsPhotoMatch && pexelsPhotoMatch[1]) {
    const id = pexelsPhotoMatch[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
  }

  return val;
}

function normalizeVideoUrl(raw?: string): string | undefined {
  const val = cleanText(raw);
  if (!val || !/^https?:\/\//i.test(val)) return undefined;

  // Auto-convert Google Drive file share URLs into direct streamable download URLs
  const driveFileMatch = val.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveFileMatch[1]}`;
  }
  const driveOpenMatch = val.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch && driveOpenMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveOpenMatch[1]}`;
  }

  // Auto-convert Pexels video page URLs (e.g. https://www.pexels.com/video/slug-33293374/) into direct 720p MP4 stream
  const pexelsVideoMatch = val.match(/pexels\.com\/video\/(?:[^/]*-)?(\d+)\/?/i);
  if (pexelsVideoMatch && pexelsVideoMatch[1]) {
    return `https://www.pexels.com/download/video/${pexelsVideoMatch[1]}/?h=720&w=1280`;
  }

  // Auto-convert Mixkit video page URLs (e.g. https://mixkit.co/free-stock-video/slug-4664/) into direct 720p MP4 stream
  const mixkitVideoMatch = val.match(/mixkit\.co\/free-stock-video\/(?:[^/]*-)?(\d+)\/?/i);
  if (mixkitVideoMatch && mixkitVideoMatch[1]) {
    const id = mixkitVideoMatch[1];
    return `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;
  }

  return val;
}

function locateHeaderRowIndex(rows: string[][]): number {
  const idx = rows.findIndex((r) => {
    const joined = r.map((c) => cleanText(c).toLowerCase()).join('|');
    return (
      (joined.includes('package name') || joined.includes('package title') || joined.includes('title')) &&
      (joined.includes('price') || joined.includes('destination') || joined.includes('features'))
    );
  });
  return idx === -1 ? 0 : idx;
}

function resolveNumberedColumnIndices(
  headers: string[],
  prefixes: string[],
  maxSlots: number
): number[] {
  const slots = new Array<number>(maxSlots).fill(-1);

  // Match explicit numbered headers like img1..img8 or vid1..vid7
  for (let n = 1; n <= maxSlots; n++) {
    const patterns = prefixes.flatMap((p) => [`${p}${n}`, `${p} ${n}`, `${p}_${n}`, `${p}-${n}`]);
    const found = headers.findIndex((h) => patterns.includes(h));
    if (found !== -1) slots[n - 1] = found;
  }

  // Also support shorthand consecutive columns right after slot 1: e.g. vid1, 2, 3, 4, 5, 6
  const firstIdx = slots[0];
  if (firstIdx !== -1) {
    for (let n = 2; n <= maxSlots; n++) {
      if (slots[n - 1] !== -1) continue;
      const expectedCol = firstIdx + (n - 1);
      if (expectedCol < headers.length) {
        const hdr = headers[expectedCol];
        if (hdr === String(n) || hdr === `#${n}` || hdr === `v${n}`) {
          slots[n - 1] = expectedCol;
        }
      }
    }
  }

  return slots;
}

export function extractHeroVideosFromCsv(csvText: string): string[] {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) return [];

  const headerRowIdx = locateHeaderRowIndex(rows);
  const headers = rows[headerRowIdx].map((h) => cleanText(h).toLowerCase());
  const vidSlots = resolveNumberedColumnIndices(headers, ['vid', 'video', 'intro', 'hero vid', 'hero video'], 7);

  if (vidSlots.every((idx) => idx === -1)) return [];

  const result = new Array<string>(7).fill('');
  for (let slotIdx = 0; slotIdx < vidSlots.length; slotIdx++) {
    const colIdx = vidSlots[slotIdx];
    if (colIdx === -1) continue;

    for (let rowIndex = headerRowIdx + 1; rowIndex < rows.length; rowIndex++) {
      const candidate = normalizeVideoUrl(rows[rowIndex]?.[colIdx]);
      if (candidate) {
        result[slotIdx] = candidate;
        break;
      }
    }
  }

  return result;
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
  const headerRowIdx = locateHeaderRowIndex(rows);

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

  const imgGallerySlots = resolveNumberedColumnIndices(headers, ['img', 'image', 'photo', 'gallery'], 8);
  const vidSlotIndices = resolveNumberedColumnIndices(headers, ['vid', 'video', 'intro', 'hero vid', 'hero video'], 7);
  const idxGalleryList = colExactOrIncludes(['gallery', 'album', 'gallery images']);

  const reservedMediaIndices = new Set(
    [...imgGallerySlots, ...vidSlotIndices, idxGalleryList].filter((i) => i !== -1)
  );

  const colExcluding = (aliases: string[], excludeTerms: string[] = []) => {
    const valid = (h: string, idx: number) =>
      !reservedMediaIndices.has(idx) &&
      !excludeTerms.some((ex) => h.includes(ex)) &&
      !/^(?:img|image|photo|gallery|vid|video)[\s_-]*\d+$/.test(h);
    const exact = headers.findIndex((h, idx) => valid(h, idx) && aliases.some((a) => h === a));
    if (exact !== -1) return exact;
    return headers.findIndex((h, idx) => valid(h, idx) && aliases.some((a) => h.includes(a)));
  };

  const idxImageUrl = colExcluding(
    ['coverimg', 'cover img', 'cover image', 'cover', 'image url', 'photo url', 'picture url', 'img url', 'url', 'thumbnail', 'image', 'photo', 'picture'],
    ['video', 'vid']
  );

  let currentRegion: Region = 'Islands';
  let currentDestination = { name: 'Maldives', slug: 'maldives' };
  let awaitingDestinationAfterRegion = false;
  let currentDestinationImageUrl: string | undefined = undefined;
  let currentDestinationGalleryImages: string[] = [];
  const parsedPackages: Package[] = [];

  for (let rowIndex = headerRowIdx + 1; rowIndex < rows.length; rowIndex++) {
    const r = rows[rowIndex];
    const get = (i: number) => (i >= 0 && i < r.length ? cleanText(r[i]) : '');

    const firstCell = get(idxSNo !== -1 ? idxSNo : 0);
    const nonEmptyCells = r.map((c) => cleanText(c)).filter(Boolean);
    if (nonEmptyCells.length === 0) continue;

    // Check if this is a Region section row ("I. ISLANDS", "EUROPE") or Destination header row ("MALDIVES")
    const hasTitleOrPrice =
      Boolean(get(idxPkgTitle)) ||
      Boolean(get(idxPriceInr)) ||
      Boolean(get(idxOrigPrice)) ||
      Boolean(get(idxDescription));

    const fallbackUrlCell = r.find((cell, cellIdx) => {
      if (reservedMediaIndices.has(cellIdx)) return false;
      const val = cleanText(cell);
      return /^https?:\/\/\S+$/i.test(val) && !/\.(mp4|webm|mov)(\?|$)/i.test(val);
    });
    const rowImageUrl = normalizeImageUrl(get(idxImageUrl) || fallbackUrlCell);

    const rowGallerySet = new Set<string>();
    for (const slotCol of imgGallerySlots) {
      if (slotCol === -1) continue;
      const normalized = normalizeImageUrl(get(slotCol));
      if (normalized && !rowGallerySet.has(normalized)) {
        rowGallerySet.add(normalized);
      }
    }
    const rawGalleryCell = get(idxGalleryList);
    if (rawGalleryCell) {
      rawGalleryCell
        .split(/[\s,|;\n]+/)
        .map((token) => normalizeImageUrl(token))
        .filter((u): u is string => Boolean(u))
        .forEach((u) => rowGallerySet.add(u));
    }
    const rowGalleryImages = Array.from(rowGallerySet).slice(0, 8);

    if (!hasTitleOrPrice && nonEmptyCells.length <= 2) {
      const sectionLabel = nonEmptyCells[0];
      const detectedRegion = parseRegionFromSection(sectionLabel);
      if (detectedRegion) {
        currentRegion = detectedRegion;
        awaitingDestinationAfterRegion = true;
        currentDestinationImageUrl = undefined;
        currentDestinationGalleryImages = [];
      } else {
        currentDestination = normalizeDestination(sectionLabel);
        awaitingDestinationAfterRegion = false;
        currentDestinationImageUrl = rowImageUrl;
        currentDestinationGalleryImages = rowGalleryImages;
      }
      continue;
    }

    const rawPkgName = get(idxPkgName);
    const rawPkgTitle = get(idxPkgTitle);
    if (!rawPkgName && !rawPkgTitle) continue;

    const destColVal = get(idxDestination);
    let destInfo = destColVal ? normalizeDestination(destColVal) : currentDestination;
    if (!destColVal && awaitingDestinationAfterRegion && rawPkgName) {
      destInfo = normalizeDestination(rawPkgName);
      currentDestination = destInfo;
      awaitingDestinationAfterRegion = false;
    }

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
      imageUrl: rowImageUrl || currentDestinationImageUrl,
      galleryImages:
        rowGalleryImages.length > 0
          ? rowGalleryImages
          : currentDestinationGalleryImages.length > 0
            ? currentDestinationGalleryImages
            : undefined,
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
  const envUrl = (import.meta.env?.VITE_PACKAGES_SHEET_CSV_URL || '').trim();
  return envUrl || DEFAULT_PACKAGES_SHEET_URL;
}

export async function fetchPackagesWithStatus(_forceRefresh = false): Promise<{
  packages: Package[];
  heroVideos: string[];
  status: SheetSyncStatus;
}> {
  const configuredUrl = getConfiguredSheetUrl();
  const candidates = buildCandidateCsvUrls(configuredUrl);

  if (candidates.length === 0) {
    const activeBaseline = filterActivePackages(ALL_PACKAGES);
    return {
      packages: activeBaseline,
      heroVideos: [],
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
      const heroVideos = extractHeroVideosFromCsv(csvText);
      const activeOnly = filterActivePackages(parsed);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), url: endpoint, packages: parsed, heroVideos })
          );
        } catch {
          // Ignore storage quota issues
        }
      }

      return {
        packages: activeOnly,
        heroVideos,
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
          heroVideos?: string[];
        };
        if (candidates.includes(cached.url) && cached.packages.length > 0) {
          return {
            packages: filterActivePackages(cached.packages),
            heroVideos: cached.heroVideos || [],
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
    heroVideos: [],
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
  const [heroVideos, setHeroVideos] = useState<string[]>([]);
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
    setHeroVideos(result.heroVideos);
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
    heroVideos,
    loading,
    status,
    refresh: () => load(true)
  };
}
