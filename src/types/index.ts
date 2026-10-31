/**
 * 365Holidayz - Domain Type Definitions
 * Source of truth for packages, destinations, holiday types, enquiries and slider slides.
 */

export type Region = 
  | 'Islands' 
  | 'Far East Asian' 
  | 'Middle East & Mediterranean' 
  | 'Other Countries';

export type HolidayTypeCategory = 
  | 'Honeymoon' 
  | 'Family & Group' 
  | 'Adventure' 
  | 'Luxury Escapes' 
  | 'Women Solo' 
  | 'MICE & Corporate';

export interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  region: Region;
  holidayType: HolidayTypeCategory;
  duration: string;
  durationNights: number;
  durationDays: number;
  persons: string; // e.g. "Min 2 Pax", "Min 4 Pax", "Min 20 Pax", "Min 30 Pax"
  minPax: number;
  roomBasis: string; // e.g. "Double sharing", "Twin sharing"
  stayPeriod: string;
  bookingValidity: string;
  isUrgentValidity: boolean; // Flagged for "by 31 Oct 2026"
  currency: 'INR' | 'USD' | 'SGD' | 'EUR';
  priceValue: number;
  priceDisplay: string;
  priceBasisNote: string; // "Price shown in client sheet — confirm basis at enquiry"
  description: string;
  stayDetails: string;
  features: string[];
  exclusions: string[] | null;
  itineraryStatus: string; // "Detailed day-wise itinerary available on request"
  dataReviewNotes: string[];
  imageSubject: string;
  gallerySubjects?: string[];
  isFeatured?: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: Region;
  country: string;
  tagline: string;
  heroImageSubject: string;
  description: string;
  whyVisit: string[];
  keyExperiences: string[];
  bestTimeToVisit: string;
  bestTimeEditorialLabel: string; // Explicitly marked verified editorial guidance
  practicalInfo: {
    currency: string;
    language: string;
    idealDuration: string;
    timeZone: string;
    highlights: string;
  };
  travelStyles: string[];
  isFeatured: boolean;
  isInspirationOnly?: boolean; // E.g., Hong Kong & Macau
  faqs: { question: string; answer: string }[];
}

export interface HolidayType {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  suitableTraveller: string;
  signatureExperiences: string[];
  recommendedDestinations: string[];
  badge: string;
  imageSubject: string;
  accentQuote: string;
}

export interface SliderSlide {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  destination: string;
  destinationSlug: string;
  packageId?: string;
  imageSubject: string;
  tag: string;
  ctaText: string;
  ctaLink: string;
}

export interface EnquiryData {
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  destination: string;
  approxDate: string;
  durationDays?: string;
  adultsCount: number;
  childrenCount: number;
  budgetPerPerson: string;
  holidayType: string;
  specialNotes: string;
  consentAgreed: boolean;
}
