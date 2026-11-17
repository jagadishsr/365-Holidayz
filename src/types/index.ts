export type Region =
  | 'Islands'
  | 'Far East Asian'
  | 'Middle East & Mediterranean'
  | 'Europe'
  | 'Other Countries'
  | (string & {});

export type HolidayCategory =
  | 'Honeymoon'
  | 'Family & Group'
  | 'Adventure'
  | 'Luxury Escapes'
  | 'Women Solo'
  | 'Wellness & Retreats'
  | 'Culture & Heritage'
  | 'MICE & Corporate';

export type HolidayTypeCategory = HolidayCategory;

export type CurrencyCode = 'INR' | 'USD' | 'SGD' | 'EUR';

export type PackageDisplayStatus = 'Active' | 'Hidden';

export interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  region: Region;
  holidayType: HolidayCategory;
  duration: string;
  durationNights: number;
  durationDays: number;
  persons: string;
  minPax: number;
  roomBasis: 'Double sharing' | 'Twin sharing' | 'Single / Triple' | string;
  stayPeriod: string;
  bookingValidity: string;
  isUrgentValidity?: boolean;
  currency: CurrencyCode;
  priceValue: number;
  priceDisplay: string;
  originalCurrency?: CurrencyCode;
  originalPrice?: number;
  inrPrice?: number;
  inrPriceDisplay?: string;
  priceBasisNote: string;
  advanceBookingConditions?: string;
  description: string;
  stayDetails: string;
  features: string[];
  exclusions?: string[];
  itineraryStatus: string;
  dataReviewNotes?: string[];
  imageUrl?: string;
  imageSubject: string;
  gallerySubjects?: string[];
  isFeatured?: boolean;
  displayStatus?: PackageDisplayStatus;
  isFlashOffer?: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  displayLabel?: string;
  country: string;
  region: Region;
  tagline: string;
  imageUrl?: string;
  heroImageSubject: string;
  description: string;
  whyVisit: string[];
  keyExperiences: string[];
  bestTimeToVisit: string;
  bestTimeEditorialLabel: string;
  practicalInfo: {
    currency: string;
    language: string;
    idealDuration: string;
    timeZone: string;
    highlights: string;
  };
  travelStyles: string[];
  isFeatured?: boolean;
  featuredOrder?: number;
  isInspirationOnly?: boolean;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface HolidayType {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  suitableTraveller: string;
  signatureExperiences: string[];
  recommendedDestinations: string[];
  imageSubject: string;
  accentQuote: string;
}

export interface SliderSlide {
  id: string;
  holidayCategory?: HolidayCategory;
  eyebrow?: string;
  title?: string;
  heading?: string;
  subtitle?: string;
  summary?: string;
  destination?: string;
  destinationSlug?: string;
  tag?: string;
  packageId?: string;
  ctaLabel?: string;
  ctaText?: string;
  ctaLink: string;
  videoUrl?: string;
  posterUrl?: string;
  mobileFallbackUrl?: string;
  visualStoryNote?: string;
  isTemporaryMedia?: boolean;
  categoryBadge?: string;
  locationLabel?: string;
  imageSubject?: string;
  durationNote?: string;
}

export interface EnquiryData {
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  destination: string;
  approxDate: string;
  durationDays: string;
  adultsCount: number;
  childrenCount: number;
  budgetPerPerson: string;
  holidayType: string;
  specialNotes: string;
  consentAgreed: boolean;
}
