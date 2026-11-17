/**
 * 365Holidayz - Curated Editorial Assets, Generated Imagery & Client Poster Assets
 */

import clientLogoImg from '../assets/aistudio/365-Logo-circle.png';
import posterPhilippinesImg from '../assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.04_4bf6a70f.jpeg';
import posterTurkiyeGeorgiaImg from '../assets/aistudio/WhatsApp_Image_2026-09-22_at_16.38.41_e96733ea.jpeg';
import posterSingaporeMalaysiaImg from '../assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.03_99832391.jpeg';

// Generated Editorial High-Resolution Assets (Local Vite Bundled)
import heroSwissHoneymoonImg from '../assets/images/hero_swiss_honeymoon_1794891874336.jpg';
import heroMaldivesLuxuryImg from '../assets/images/hero_maldives_luxury_1794891873657.jpg';
import heroKazakhstanAdventureImg from '../assets/images/hero_kazakhstan_adventure_1794891873897.jpg';
import heroBaliWellnessImg from '../assets/images/hero_bali_wellness_1794891874651.jpg';
import heroUzbekistanCultureImg from '../assets/images/hero_uzbekistan_culture_1794891875350.jpg';
import destGreeceVerticalImg from '../assets/images/dest_greece_vertical_1794891876009.jpg';

export const GENERATED_ASSETS = {
  swissHoneymoon: heroSwissHoneymoonImg,
  maldivesLuxury: heroMaldivesLuxuryImg,
  kazakhstanAdventure: heroKazakhstanAdventureImg,
  baliWellness: heroBaliWellnessImg,
  uzbekistanCulture: heroUzbekistanCultureImg,
  greeceVertical: destGreeceVerticalImg
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
  posterPhilippines: posterPhilippinesImg || './assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.04_4bf6a70f.jpeg',
  posterTurkiyeGeorgia: posterTurkiyeGeorgiaImg || './assets/aistudio/WhatsApp_Image_2026-09-22_at_16.38.41_e96733ea.jpeg',
  posterSingaporeMalaysia: posterSingaporeMalaysiaImg || './assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.03_99832391.jpeg',
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

// Destination imagery mapped by slug
export const DESTINATION_STOCK_IMAGES: Record<string, string> = {
  'bali': heroBaliWellnessImg,
  'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80',
  'istanbul-turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
  'hong-kong-macau': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
  'maldives': heroMaldivesLuxuryImg,
  'sri-lanka': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=80',
  'mauritius': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
  'seychelles': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
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
  'greece': destGreeceVerticalImg
};

// Holiday Types photography
export const HOLIDAY_TYPE_STOCK_IMAGES: Record<string, string> = {
  'ht-honeymoon': heroSwissHoneymoonImg,
  'ht-family-group': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80',
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
  'pkg-11': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  'pkg-12': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
  'pkg-13': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  'pkg-14': 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
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
  founder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  editorialSpread: heroUzbekistanCultureImg
};
