/**
 * 365Holidayz - Curated Editorial Assets, Generated Imagery & Client Profile Asset
 */

import clientLogoImg from '../assets/aistudio/365-Logo-circle.png';

// Generated Editorial High-Resolution Assets (Local Vite Bundled)
import heroSwissHoneymoonImg from '../assets/images/hero_swiss_honeymoon_1794891874336.jpg';
import heroMaldivesLuxuryImg from '../assets/images/hero_maldives_luxury_1794891873657.jpg';
import heroKazakhstanAdventureImg from '../assets/images/hero_kazakhstan_adventure_1794891873897.jpg';
import heroBaliWellnessImg from '../assets/images/hero_bali_wellness_1794891874651.jpg';
import heroUzbekistanCultureImg from '../assets/images/hero_uzbekistan_culture_1794891875350.jpg';
import destGreeceVerticalImg from '../assets/images/dest_greece_vertical_1794891876009.jpg';
import introSeAsiaImg from '../assets/images/intro_seasia_landscape_1794893867284.jpg';
import happyClientFamilyImg from '../assets/images/happy_client_family_1794893866385.jpg';
import happyClientCoupleImg from '../assets/images/happy_client_couple_1794893867435.jpg';
import happyClientGroupImg from '../assets/images/happy_client_group_1794893867174.jpg';

export const GENERATED_ASSETS = {
  swissHoneymoon: heroSwissHoneymoonImg,
  maldivesLuxury: heroMaldivesLuxuryImg,
  kazakhstanAdventure: heroKazakhstanAdventureImg,
  baliWellness: heroBaliWellnessImg,
  uzbekistanCulture: heroUzbekistanCultureImg,
  greeceVertical: destGreeceVerticalImg,
  introSeAsia: introSeAsiaImg,
  happyClientFamily: happyClientFamilyImg,
  happyClientCouple: happyClientCoupleImg,
  happyClientGroup: happyClientGroupImg
};

/**
 * Resolves static asset paths safely whether hosted at root domain or any subdirectory (e.g. /365/).
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(?:https?:|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }
  const clean = path.replace(/^(\.\/|\/)+/, '');

  if (typeof window !== 'undefined') {
    const knownRoutes = [
      'destinations',
      'holiday-types',
      'packages',
      'travel-guide',
      'happy-clients',
      'about',
      'contact',
      'plan-your-trip'
    ];
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && !knownRoutes.includes(segments[0])) {
      return `/${segments[0]}/${clean}`;
    }
  }

  return `./${clean}`;
}

export const CLIENT_ASSETS = {
  logo: clientLogoImg || './assets/aistudio/365-Logo-circle.png',
  founderPhoto: './assets/aistudio/aameenataj_46a39b42.jpg',
  verifiedContacts: {
    phone1: '+91 8939958899',
    phone2: '+91 9444179215',
    email: '24x7support@365holidayz.com',
    whatsappCommunity:
      'https://wa.me/918939958899?text=Hi%20365Holidayz,%20I%20would%20like%20to%20plan%20a%20bespoke%20holiday.',
    instagram: 'https://www.instagram.com/365_holidayz?igsh=MXU3dXhlbnd5MWttdw==',
    facebook: 'https://www.facebook.com/share/1D3DPmZ6h3/',
    website: 'www.365holidayz.com',
    deskLabel: 'Booking Desk India'
  }
};

export interface ClientExperienceStory {
  id: string;
  traveller: string;
  destination: string;
  tripType: string;
  duration: string;
  image: string;
  quote: string;
}

export const HAPPY_CLIENT_STORIES: ClientExperienceStory[] = [
  {
    id: 'story-singapore-family',
    traveller: 'Raghavan & Family · Chennai',
    destination: 'Singapore & Malaysia',
    tripType: 'Family & Group',
    duration: '6 Days',
    image: happyClientFamilyImg,
    quote:
      'Every airport transfer, Sentosa pass, and vegetarian dinner was timed smoothly without rushing the kids. We returned relaxed rather than exhausted.'
  },
  {
    id: 'story-bali-honeymoon',
    traveller: 'Siddharth & Ananya · Bengaluru',
    destination: 'Ubud & Seminyak, Bali',
    tripType: 'Honeymoon',
    duration: '6 Nights / 7 Days',
    image: happyClientCoupleImg,
    quote:
      'Waking up above quiet Ubud rice terraces with private chauffeurs waiting downstairs made our honeymoon feel completely unscripted and personal.'
  },
  {
    id: 'story-coast-group',
    traveller: 'Meera & Travel Companions · Mumbai',
    destination: 'Phuket & Krabi Coast, Thailand',
    tripType: 'Small Group Tour',
    duration: '5 Days',
    image: happyClientGroupImg,
    quote:
      'From Phi Phi speedboat charters to seamless Phuket-to-Krabi hotel transfers, 365Holidayz handled every detail quietly behind the scenes.'
  }
];

// Destination imagery mapped by slug
export const DESTINATION_STOCK_IMAGES: Record<string, string> = {
  'bali': heroBaliWellnessImg,
  'thailand': introSeAsiaImg,
  'istanbul-turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
  'hong-kong-macau': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
  'maldives': heroMaldivesLuxuryImg,
  'sri-lanka': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=80',
  'mauritius': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
  'seychelles': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'singapore': happyClientFamilyImg,
  'malaysia': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
  'vietnam': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80',
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
  'bahrain': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
  'jordan': 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1600&q=80',
  'oman': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80',
  'georgia': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80',
  'azerbaijan': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80',
  'kazakhstan': heroKazakhstanAdventureImg,
  'uzbekistan': heroUzbekistanCultureImg,
  'greece': destGreeceVerticalImg,
  'switzerland': 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=80',
  'europe': heroSwissHoneymoonImg,
  'france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
  'italy': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=80',
  'austria': heroSwissHoneymoonImg,
  'germany': 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=80',
  'united-kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
  'uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
  'japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
  'australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80'
};

// Holiday Types photography
export const HOLIDAY_TYPE_STOCK_IMAGES: Record<string, string> = {
  'ht-honeymoon': heroSwissHoneymoonImg,
  'ht-family-group': happyClientFamilyImg,
  'ht-adventure': heroKazakhstanAdventureImg,
  'ht-luxury-escapes': heroMaldivesLuxuryImg,
  'ht-women-solo': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80',
  'ht-wellness-retreats': heroBaliWellnessImg,
  'ht-culture-heritage': heroUzbekistanCultureImg
};

// Package hero imagery mapped by package ID
export const PACKAGE_STOCK_IMAGES: Record<string, string> = {
  'pkg-01': heroMaldivesLuxuryImg,
  'pkg-02': 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
  'pkg-03': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
  'pkg-04': 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
  'pkg-05': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  'pkg-06': 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
  'pkg-07': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'pkg-08': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  'pkg-09': heroBaliWellnessImg,
  'pkg-10': 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
  'pkg-11': happyClientFamilyImg,
  'pkg-12': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
  'pkg-13': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  'pkg-14': introSeAsiaImg,
  'pkg-15': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  'pkg-16': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'pkg-17': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  'pkg-18': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
  'pkg-19': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'pkg-20': 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
  'pkg-21': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
  'pkg-22': 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
  'pkg-23': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
  'pkg-24': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  'pkg-25': 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=80',
  'pkg-26': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  'pkg-27': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  'pkg-28': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  'pkg-29': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
  'pkg-30': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
  'pkg-31': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
  'pkg-32': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  'pkg-33': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
};

export const ABOUT_TEAM_IMAGES = {
  founder: './assets/aistudio/aameenataj_46a39b42.jpg',
  editorialSpread: introSeAsiaImg
};

// Verified default gallery albums per destination (3+ distinct travel photographs when sheet img1..img8 are empty)
export const DESTINATION_GALLERY_FALLBACKS: Record<string, string[]> = {
  maldives: [
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1400&q=80',
    heroMaldivesLuxuryImg
  ],
  'sri-lanka': [
    'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80'
  ],
  bali: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=80',
    heroBaliWellnessImg
  ],
  mauritius: [
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80'
  ],
  seychelles: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80'
  ],
  singapore: [
    happyClientFamilyImg,
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80'
  ],
  malaysia: [
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=80',
    introSeAsiaImg
  ],
  thailand: [
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1400&q=80',
    introSeAsiaImg
  ],
  vietnam: [
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80'
  ],
  dubai: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80'
  ],
  'istanbul-turkey': [
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1400&q=80',
    heroUzbekistanCultureImg
  ],
  bahrain: [
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1400&q=80'
  ],
  jordan: [
    'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80'
  ],
  oman: [
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80'
  ],
  georgia: [
    'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=80',
    heroKazakhstanAdventureImg
  ],
  azerbaijan: [
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80'
  ],
  switzerland: [
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80'
  ]
};

export function getDefaultGalleryImages(slug: string, excludeCover?: string): string[] {
  const genericPool = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
    introSeAsiaImg,
    happyClientCoupleImg,
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80'
  ];

  const base = DESTINATION_GALLERY_FALLBACKS[slug] || genericPool;
  const normalizedExclude = excludeCover?.split('?')[0];
  const filtered = base.filter((img) => img.split('?')[0] !== normalizedExclude);
  if (filtered.length >= 3) return filtered.slice(0, 3);

  const combined = [...filtered];
  for (const candidate of genericPool) {
    if (combined.length >= 3) break;
    if (!combined.some((x) => x.split('?')[0] === candidate.split('?')[0])) {
      combined.push(candidate);
    }
  }
  return combined.slice(0, 3);
}

