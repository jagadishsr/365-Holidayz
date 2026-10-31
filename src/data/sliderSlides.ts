/**
 * 365Holidayz - Hero Slider Master Slides
 * Rotating through verified destinations and package journeys from the master sheet:
 * Maldives, Bali, Sri Lanka, Singapore, Malaysia, Thailand, Vietnam, Dubai,
 * Istanbul/Turkey, Bahrain, Jordan, Oman, Mauritius, Seychelles, Georgia, Azerbaijan.
 */

import { SliderSlide } from '../types';

export const HERO_SLIDES: SliderSlide[] = [
  {
    id: 'slide-philippines',
    eyebrow: 'Client Special Departure • Southeast Asia',
    title: 'Tropical Vibes & Bigger Dreams in the Philippines',
    summary: 'Manila, Cebu & Bohol in 7 Days: Oslob whale shark encounter, Moalboal sardine run, Kawasan Falls adventure, Bohol Chocolate Hills & Loboc river cruise.',
    destination: 'Philippines',
    destinationSlug: 'philippines',
    imageSubject: 'Chocolate Hills and tropical limestone coast in Bohol and Cebu Philippines',
    tag: '6 Nights / 7 Days • USD 715 PP • For 6 Pax',
    ctaText: 'View Philippines Itinerary',
    ctaLink: '/packages'
  },
  {
    id: 'slide-singapore-malaysia',
    eyebrow: 'Signature Twin Journey • Far East',
    title: 'Singapore & Malaysia: Unbeatable Twin Wonder',
    summary: 'Sentosa cable car, Wings of Time, Night Safari with dinner, Ramada Encore Chinatown KL, and scenic Genting Highlands cable car.',
    destination: 'Singapore & Malaysia',
    destinationSlug: 'singapore',
    imageSubject: 'Singapore Marina Bay Sands and Kuala Lumpur Petronas Twin Towers skyline',
    tag: '4 Nights / 5 Days • USD 375 PP • Min 4 Pax',
    ctaText: 'View Twin Country Tour',
    ctaLink: '/packages'
  },
  {
    id: 'slide-turkiye-georgia',
    eyebrow: 'Diwali Damakka Departures • Fixed Dates',
    title: 'Türkiye & Georgia: Imperial Bosphorus to Caucasus',
    summary: 'Special November group departures with return international & domestic flights, visa, Indian meals, stay, sightseeing & Hindi-speaking guide.',
    destination: 'Türkiye & Georgia',
    destinationSlug: 'istanbul-turkey',
    imageSubject: 'Istanbul Hagia Sophia blue mosque and Tbilisi Georgia peace bridge with Caucasus mountains',
    tag: 'Diwali Departures • All-Inclusive',
    ctaText: 'Diwali Departures Info',
    ctaLink: '/packages'
  },
  {
    id: 'slide-bali',
    eyebrow: 'Featured Destination • Indonesia',
    title: 'Emerald Terraces & Sacred Island Temples',
    summary: 'From tranquil private pool villas in Ubud’s misty rainforests to golden sunsets at Tanah Lot, experience Bali through 30+ years of tailored expertise.',
    destination: 'Bali',
    destinationSlug: 'bali',
    packageId: 'pkg-09',
    imageSubject: 'Bali emerald green stepped rice terraces with morning mist in Ubud',
    tag: '5 Nights / 6 Days • From INR 46,800',
    ctaText: 'Explore Bali Packages',
    ctaLink: '/packages?destination=Bali'
  },
  {
    id: 'slide-maldives',
    eyebrow: 'Islands Sanctuary • Indian Ocean',
    title: 'Overwater Haven & Crystalline Coral Reefs',
    summary: 'Uninterrupted turquoise horizons, secluded overwater villas with lagoon plunge steps, and starlit barefoot dining on pure coral sand.',
    destination: 'Maldives',
    destinationSlug: 'maldives',
    packageId: 'pkg-01',
    imageSubject: 'Maldives overwater lagoon bungalow with direct turquoise ocean access',
    tag: '4 Nights / 5 Days • From USD 1,850',
    ctaText: 'View Maldives Haven',
    ctaLink: '/packages?destination=Maldives'
  },
  {
    id: 'slide-thailand',
    eyebrow: 'Andaman Sanctuaries • Thailand',
    title: 'Karst Island Sanctuaries & Royal Splendour',
    summary: 'Emerald lagoons beneath soaring limestone towers in Phuket and Krabi, paired with Bangkok’s vibrant cultural heritage and riverside palaces.',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    packageId: 'pkg-14',
    imageSubject: 'Phuket longtail boat floating on emerald green water beside limestone karst cliffs',
    tag: '5 Nights / 6 Days • From INR 42,500',
    ctaText: 'Discover Thailand Escapes',
    ctaLink: '/packages?destination=Thailand'
  },
  {
    id: 'slide-jordan',
    eyebrow: 'Ancient Wonders • Middle East',
    title: 'Petra’s Rose-Red Canyon & Starlit Wadi Rum',
    summary: 'Walk the mystical Siq canyon to the iconic Treasury of Petra, float in the hypersaline Dead Sea, and sleep under desert constellations.',
    destination: 'Jordan',
    destinationSlug: 'jordan',
    packageId: 'pkg-25',
    imageSubject: 'Petra Al-Khazneh Treasury carved into pink rose sandstone canyon through the Siq in Jordan',
    tag: '5 Nights / 6 Days • Twin Sharing • USD 1,380',
    ctaText: 'Explore Jordan Circuit',
    ctaLink: '/packages?destination=Jordan'
  },
  {
    id: 'slide-sri-lanka',
    eyebrow: 'Island Serendipity • South Asia',
    title: 'Ceylon Tea Trails, Sigiriya Citadel & Wild Coasts',
    summary: 'Traverse colonial hill country trains, ancient UNESCO rock fortresses, and coastal wildlife reserves with private chauffeur guided comfort.',
    destination: 'Sri Lanka',
    destinationSlug: 'sri-lanka',
    packageId: 'pkg-03',
    imageSubject: 'Sri Lanka misty green rolling tea hills and colonial mountain train',
    tag: '6 Nights / 7 Days • From INR 68,500',
    ctaText: 'View Sri Lanka Odyssey',
    ctaLink: '/packages?destination=Sri+Lanka'
  },
  {
    id: 'slide-dubai',
    eyebrow: 'Modern Glamour • United Arab Emirates',
    title: 'Iconic Skylines & Red Sand Desert Glamping',
    summary: 'The pinnacle of architectural ambition meets private yacht marina cruises, luxury dune glamping, and corporate executive retreats.',
    destination: 'Dubai',
    destinationSlug: 'dubai',
    packageId: 'pkg-19',
    imageSubject: 'Burj Khalifa soaring above shimmering Dubai skyline and dancing fountain lake',
    tag: '4 Nights / 5 Days • From INR 64,900',
    ctaText: 'Discover Dubai Luxury',
    ctaLink: '/packages?destination=Dubai'
  },
  {
    id: 'slide-vietnam',
    eyebrow: 'Far East Heritage • Indochina',
    title: 'Ha Long Bay Karsts & Golden Bridge Wonders',
    summary: 'Overnight luxury cruise navigating thousands of limestone islands, French colonial Hanoi boulevards, and lantern-lit ancient Hoi An.',
    destination: 'Vietnam',
    destinationSlug: 'vietnam',
    packageId: 'pkg-17',
    imageSubject: 'Traditional wooden cruise junk sailing between dramatic misty karst pillars in Ha Long Bay Vietnam',
    tag: '6 Nights / 7 Days • From USD 1,240',
    ctaText: 'View Vietnam Heritage',
    ctaLink: '/packages?destination=Vietnam'
  },
  {
    id: 'slide-mauritius',
    eyebrow: 'Sugar Coast & Basalt Peaks • Indian Ocean',
    title: 'Le Morne Lagoon & Catamaran Sunsets',
    summary: 'Crystal clear lagoons at the foot of UNESCO Le Morne Brabant, seven-coloured earth of Chamarel, and sunset dolphin catamarans.',
    destination: 'Mauritius',
    destinationSlug: 'mauritius',
    packageId: 'pkg-05',
    imageSubject: 'Mauritius Le Morne Brabant mountain and turquoise ocean lagoon',
    tag: '6 Nights / 7 Days • From EUR 1,220',
    ctaText: 'View Mauritius Packages',
    ctaLink: '/packages?destination=Mauritius'
  },
  {
    id: 'slide-azerbaijan',
    eyebrow: 'Land of Fire & Caspian Shores • Caucasus',
    title: 'Baku Flame Towers & Silk Road Caravanserais',
    summary: 'Hypermodern architecture overlooking the Caspian Sea, mud volcanoes of Gobustan, and lush alpine scenery in Gabala.',
    destination: 'Azerbaijan',
    destinationSlug: 'azerbaijan',
    packageId: 'pkg-31',
    imageSubject: 'Baku modern illuminated Flame Towers and Caspian seaside boulevard',
    tag: '4 Nights / 5 Days • From USD 590',
    ctaText: 'View Baku Itinerary',
    ctaLink: '/packages?destination=Azerbaijan'
  }
];
