/**
 * 365Holidayz - 7 Approved Holiday Categories Dataset
 */

import { HolidayType } from '../types';

export const ALL_HOLIDAY_TYPES: HolidayType[] = [
  {
    id: 'ht-honeymoon',
    slug: 'honeymoon',
    title: 'Honeymoon',
    subtitle: 'Quiet Horizons for Two',
    badge: 'Romantic Journeys',
    description:
      'Scenic alpine railways, private overwater suites, and unhurried sunsets crafted for newlyweds and couples seeking lasting memories.',
    suitableTraveller:
      'Couples, newlyweds, and anniversary celebrants seeking unhurried privacy and refined comfort.',
    signatureExperiences: [
      'Scenic train departures across snow-covered Swiss valleys',
      'Private overwater villa decks opening into turquoise Maldives lagoons',
      'Candlelit coastal dinners and private sunset boat charters',
      'Unrushed itineraries with seamless private transfers'
    ],
    recommendedDestinations: ['Maldives', 'Indonesia – Bali', 'Seychelles', 'Mauritius', 'Thailand – Krabi & Phuket'],
    imageSubject: 'Couple waiting for scenic mountain train at snow-covered Swiss train station',
    accentQuote: 'Where quiet moments and boundless horizons intertwine into memories of a lifetime.'
  },
  {
    id: 'ht-family-group',
    slug: 'family-group',
    title: 'Family & Group',
    subtitle: 'Effortless Togetherness',
    badge: 'Multi-Generational Travel',
    description:
      'Naturally paced journeys across international cities and island coastlines with spacious suites, private coaches, and effortless coordination for every age.',
    suitableTraveller:
      'Families across generations and private friend groups looking for seamless comfort.',
    signatureExperiences: [
      'Spacious multi-bedroom coastal suites and private resort stays',
      'Dedicated private air-conditioned vehicles and vetted local guides',
      'Balanced itineraries with engaging cultural discovery and leisure',
      'Indian & vegetarian dining arrangements tailored on request'
    ],
    recommendedDestinations: ['Singapore', 'Malaysia – Langkawi', 'Vietnam – Phu Quoc', 'Thailand – Krabi & Phuket', 'Dubai'],
    imageSubject: 'Family exploring international coastline naturally at sunlit leisure',
    accentQuote: 'Journeys designed so parents unwind, grandparents relax, and children discover wonder.'
  },
  {
    id: 'ht-adventure',
    slug: 'adventure',
    title: 'Adventure',
    subtitle: 'Highlands, Trails & Horizons',
    badge: 'Active Exploration',
    description:
      'Trekking spectacular Central Asian mountain ridges, traversing desert canyons, and flying over Cappadocia at sunrise without sacrificing rest.',
    suitableTraveller:
      'Active explorers and nature lovers drawn to dramatic alpine trails and raw landscapes.',
    signatureExperiences: [
      'Guided mountain cable car ascents in Gabala and Caucasus canyons in Georgia',
      'Sunrise Bosphorus and coastal journeys across Turkey',
      '4x4 desert expeditions in Wadi Rum and Jebel Akhdar',
      'Island cliff hikes and marine canyon explorations'
    ],
    recommendedDestinations: ['Georgia', 'Azerbaijan', 'Jordan', 'Istanbul & Turkey', 'Sultanate of Oman'],
    imageSubject: 'Travellers exploring dramatic alpine mountain valleys and trails',
    accentQuote: 'The thrill of untamed wilderness, paired with the comfort of a thoughtful return.'
  },
  {
    id: 'ht-luxury-escapes',
    slug: 'luxury-escapes',
    title: 'Luxury Escapes',
    subtitle: 'Discreet Splendour',
    badge: 'Handpicked Sanctuaries',
    description:
      'Exclusive Maldives infinity pool villas, private yacht charters, iconic Mediterranean clifftop suites, and quiet concierge care from gate to gate.',
    suitableTraveller:
      'Discerning travellers who prioritize architecture, calm privacy, and elevated personal attention.',
    signatureExperiences: [
      'Overwater infinity villas framed by coral reefs in the Maldives',
      'Private granite beach sanctuaries and lagoon cruises in Seychelles & Mauritius',
      'Private VIP airport meet-and-assist and luxury sedan transfers',
      'Curated stays handpicked across 30+ years of industry relationships'
    ],
    recommendedDestinations: ['Maldives', 'Seychelles', 'Mauritius', 'Dubai & UAE', 'Istanbul & Turkey'],
    imageSubject: 'Exclusive Maldives villa infinity pool and turquoise Indian Ocean lagoon',
    accentQuote: 'Discreet luxury that whispers rather than shouts.'
  },
  {
    id: 'ht-women-solo',
    slug: 'women-solo',
    title: 'Women Solo',
    subtitle: 'Empowered Independent Journeys',
    badge: 'Guided & Safe',
    description:
      'Confident solo exploration across vibrant Malaysian streets, serene Balinese sanctuaries, and trusted small-group departures with vetted local guides.',
    suitableTraveller:
      'Independent women seeking authentic exploration supported by trusted local partners and warm hospitality.',
    signatureExperiences: [
      'Curated boutique stays in walkable, safe international quarters',
      'Guided street, market, and cultural walks in Malaysia and Singapore',
      'Small international travel groups balancing freedom with camaraderie',
      '24x7 India-desk support and verified private transfers'
    ],
    recommendedDestinations: ['Malaysia – Langkawi', 'Indonesia – Bali', 'Vietnam – Phu Quoc', 'Singapore', 'Georgia'],
    imageSubject: 'Young South Indian woman exploring vibrant Malaysian streets with local guide and small travel group',
    accentQuote: 'Complete autonomy supported every step of the way by three decades of care.'
  },
  {
    id: 'ht-wellness-retreats',
    slug: 'wellness-retreats',
    title: 'Wellness & Retreats',
    subtitle: 'Restorative Sanctuary Living',
    badge: 'Mindful Restoration',
    description:
      'Unhurried tropical retreats nestled in Balinese jungle valleys, Sri Lankan Ayurvedic estates, and tranquil coastal sanctuaries built for genuine renewal.',
    suitableTraveller:
      'Travellers seeking deep rest, holistic movement, nature immersion, and digital quiet.',
    signatureExperiences: [
      'Morning yoga and breathwork pavilions overlooking Ubud lotus ponds',
      'Traditional Balinese botanical therapies and Ayurvedic consultations',
      'Farm-to-table tropical dining in peaceful botanical estates',
      'Gentle sound-bath evenings away from busy tourist crowds'
    ],
    recommendedDestinations: ['Indonesia – Bali', 'Sri Lanka', 'Thailand – Krabi & Phuket', 'Maldives'],
    imageSubject: 'Peaceful tropical wellness pavilion surrounded by lush Balinese jungle foliage and lotus pond',
    accentQuote: 'Return home not exhausted from sightseeing, but deeply restored.'
  },
  {
    id: 'ht-culture-heritage',
    slug: 'culture-heritage',
    title: 'Culture & Heritage',
    subtitle: 'Living History & Architecture',
    badge: 'Silk Road & Ancient Worlds',
    description:
      'Walk sunlit historic squares in Old Baku and Tbilisi, trace Petra’s carved sandstone canyons, and explore Istanbul’s timeless domes.',
    suitableTraveller:
      'History enthusiasts, architects, and cultural travellers moved by craftsmanship and ancient routes.',
    signatureExperiences: [
      'Guided architectural walks through Old Baku and Tbilisi historic quarters',
      'Private visits across Istanbul’s Sultanahmet domes and Princes’ Islands',
      'Daybreak entry through the Siq canyon into Jordan’s Petra Treasury',
      'Ancient fortresses, royal trails, and Ceylon heritage in Sri Lanka'
    ],
    recommendedDestinations: ['Istanbul & Turkey', 'Jordan', 'Georgia', 'Azerbaijan', 'Sri Lanka'],
    imageSubject: 'Travellers exploring historic stone courtyards and domes across Istanbul and Petra',
    accentQuote: 'Stories written in sandstone, mosaic tile, and living local tradition.'
  }
];
