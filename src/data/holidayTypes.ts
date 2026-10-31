/**
 * 365Holidayz - Signature Holiday Types Dataset
 * The 5 approved core categories with suitable traveller personas,
 * signature experiences, and verified destinations.
 */

import { HolidayType } from '../types';

export const ALL_HOLIDAY_TYPES: HolidayType[] = [
  {
    id: 'ht-honeymoon',
    slug: 'honeymoon',
    title: 'Honeymoon',
    subtitle: 'Infinite Horizons',
    badge: 'Romantic Sanctuaries',
    description: 'Intimate escapes designed for two: secluded overwater villas, private candlelight dinners on untouched sands, and quiet horizons crafted with unmatched attention to detail.',
    suitableTraveller: 'Couples, newlyweds, and anniversary celebrants seeking unhurried privacy, elevated luxury, and memorable romantic settings.',
    signatureExperiences: [
      'Private overwater villa sundecks with direct steps into turquoise atoll waters',
      'Candlelit multi-course dinners on secluded sandbanks with personal chef service',
      'Couples Ayurvedic and tropical herbal botanical spa treatments',
      'Sunset champagne cruises on traditional wooden yachts and catamarans'
    ],
    recommendedDestinations: ['Maldives', 'Bali', 'Mauritius', 'Thailand (Krabi)', 'Malaysia (Langkawi)'],
    imageSubject: 'Romantic private candlelit dinner set up on white sand beach at sunset beside calm waves',
    accentQuote: 'Where quiet moments and boundless horizons intertwine into memories of a lifetime.'
  },
  {
    id: 'ht-family-group',
    slug: 'family-group',
    title: 'Family & Group',
    subtitle: 'All-Ages Elegance',
    badge: 'Multi-Generational Harmony',
    description: 'Thoughtfully paced itineraries with spacious multi-bedroom suites, private chauffeur logistics, engaging wildlife encounters, and cultural discoveries for every generation.',
    suitableTraveller: 'Families with young children, teens, and grandparents, as well as milestone celebration groups seeking ease, comfort, and seamless coordination.',
    signatureExperiences: [
      'Spacious interconnected resort family suites and private villas with gardens',
      'Private air-conditioned chauffeur travel for effortless multi-generational movement',
      'Gentle wildlife encounters: sea turtles, elephant ethical sanctuaries, and marine parks',
      'Dedicated activities combining kid-friendly exploration with adult relaxation'
    ],
    recommendedDestinations: ['Singapore', 'Sri Lanka', 'Vietnam', 'Bali', 'Mauritius', 'Dubai'],
    imageSubject: 'Family walking together along a sunlit coastal palm garden overlooking turquoise sea',
    accentQuote: 'Journeys designed so parents unwind, grandparents relax, and children discover wonder.'
  },
  {
    id: 'ht-adventure',
    slug: 'adventure',
    title: 'Adventure',
    subtitle: 'Wild & Refined',
    badge: 'Expedition & Wonder',
    description: 'Expeditions that awaken the senses without compromising on comfort. Ascend ancient volcanic fortresses, navigate deep river canyons, traverse Mars-like deserts, and float over surreal fairy chimneys.',
    suitableTraveller: 'Curious explorers, active couples, and photography enthusiasts seeking authentic encounters, untamed landscapes, and refined basecamps.',
    signatureExperiences: [
      'Sunrise hot-air balloon flights above Cappadocia’s geological fairy chimneys',
      '4x4 Bedouin desert expeditions and starlit camps in Jordan’s Wadi Rum',
      'Climbing the sky citadel of Sigiriya and hiking through high Ceylon cloud forests',
      'Navigating karst limestone caves and jungle rapids in Bali and Vietnam'
    ],
    recommendedDestinations: ['Turkey (Cappadocia)', 'Jordan (Petra & Wadi Rum)', 'Sri Lanka', 'Georgia (Kazbegi)', 'Oman'],
    imageSubject: 'Hot air balloon floating at dawn above deep canyon valleys and stone spires in Cappadocia',
    accentQuote: 'The thrill of the untamed wilderness, paired with the quiet comfort of a curated return.'
  },
  {
    id: 'ht-luxury-escapes',
    slug: 'luxury-escapes',
    title: 'Luxury Escapes',
    subtitle: 'Curated Luxury',
    badge: 'Bespoke Splendour',
    description: 'The pinnacle of bespoke travel. Handpicked 5-star suites, private yacht charters, bespoke sommelier wine tastings, and behind-the-velvet-rope cultural access.',
    suitableTraveller: 'Discerning travellers who prioritize discreet excellence, personalized service, architectural distinction, and exclusive experiences.',
    signatureExperiences: [
      'Private charter cruises along the Bosphorus, Dubai Marina, and Persian Gulf',
      'Exclusive sommelier tastings in ancient underground Qvevri wine cellars',
      'Secluded cliffside infinity pools overlooking vast mountain canyons in Oman and Bali',
      'VIP airport meet-and-assist services with private luxury sedan transfers'
    ],
    recommendedDestinations: ['Dubai', 'Istanbul & Turkey', 'Seychelles', 'Oman (Jebel Akhdar)', 'Thailand (Koh Samui)'],
    imageSubject: 'Bespoke luxury clifftop lounge with panoramic ocean views and sleek architecture',
    accentQuote: 'Discreet luxury that whispers rather than shouts — curated specifically around your desires.'
  },
  {
    id: 'ht-women-solo',
    slug: 'women-solo',
    title: 'Women Solo',
    subtitle: 'The Luminous Solo',
    badge: 'Empowered Exploration',
    description: 'Empowering independent travel designed with vetted boutique properties, private verified drivers, mindful wellness retreats, and cultural immersion tailored for the solo woman explorer.',
    suitableTraveller: 'Independent female travellers seeking self-discovery, safe verified logistics, rejuvenating wellness, and freedom without isolation.',
    signatureExperiences: [
      'Vetted boutique properties chosen for warm hospitality, prime walkability, and discreet service',
      'Trusted private female or senior vetted drivers and licensed local guides',
      'Mindful wellness sessions, sound healing, and holistic traditional therapies in Ubud & Sri Lanka',
      'Artisanal craft workshops, textile discovery, and intimate small-group culinary trails'
    ],
    recommendedDestinations: ['Bali (Ubud)', 'Sri Lanka (Hill Country)', 'Georgia (Tbilisi & Sighnaghi)', 'Vietnam', 'Singapore'],
    imageSubject: 'Solo female traveller seated peacefully on a scenic mountain lookout with tea terrace view',
    accentQuote: 'The luxury of complete autonomy, supported every step of the way by 30+ years of travel care.'
  }
];
