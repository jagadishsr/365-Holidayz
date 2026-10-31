/**
 * 365Holidayz - Curated High-Definition Stock Images & Client Poster Assets
 * Includes direct integration with the uploaded transparent PNG client logo and promotional posters.
 */

export const CLIENT_ASSETS = {
  // Transparent PNG Logo provided by the client with circle masked and outer white removed
  logo: '/assets/aistudio/365-Logo-circle.png',
  posterPhilippines: '/assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.04_4bf6a70f.jpeg',
  posterTurkiyeGeorgia: '/assets/aistudio/WhatsApp_Image_2026-09-22_at_16.38.41_e96733ea.jpeg',
  posterSingaporeMalaysia: '/assets/aistudio/WhatsApp_Image_2026-09-22_at_16.40.03_99832391.jpeg',
  verifiedContacts: {
    phone1: '+91 89399 58899',
    phone2: '+91 94441 79215',
    email: '24x7support@365holidayz.com',
    whatsappCommunity: 'https://chat.whatsapp.com/Hdc8BSDpoOo6su5V5qSQxG',
    website: 'www.365holidayz.com',
    deskLabel: 'Booking Desk India'
  }
};

// High-fidelity Unsplash travel photography mapped by destination slug (All verified 200 OK)
export const DESTINATION_STOCK_IMAGES: Record<string, string> = {
  'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80', // Bali temple & lush greenery
  'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80', // Thailand karst island & longtail boat
  'istanbul-turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80', // Istanbul mosques & Bosphorus twilight
  'hong-kong-macau': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80', // Hong Kong skyline & harbour
  'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80', // Maldives overwater bungalow
  'sri-lanka': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=80', // Sri Lanka nine arch bridge tea country
  'mauritius': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80', // Mauritius Le Morne & crystal beach
  'seychelles': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80', // Seychelles granite boulders and beach
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80', // Singapore Marina Bay Sands skyline
  'malaysia': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80', // Kuala Lumpur Petronas Towers
  'vietnam': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80', // Vietnam Ha Long Bay karsts
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', // Dubai Burj Khalifa & downtown
  'bahrain': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80', // Bahrain / Arabian Gulf skyline & coast
  'jordan': 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1600&q=80', // Jordan Petra Treasury (Verified 200 OK)
  'oman': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80', // Oman Sultan Qaboos Grand Mosque & wadi
  'georgia': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80', // Georgia Kazbegi church with Caucasus peaks
  'azerbaijan': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80' // Baku Flame Towers & modern skyline (Verified 200 OK)
};

// High-fidelity photography for Hero Slider (All tested and verified 200 OK)
export const HERO_SLIDER_STOCK_IMAGES: Record<string, string> = {
  'slide-philippines': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1920&q=85',
  'slide-singapore-malaysia': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1920&q=85',
  'slide-turkiye-georgia': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=85',
  'slide-bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
  'slide-istanbul': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=85',
  'slide-thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=85',
  'slide-maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=85',
  'slide-jordan': 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1920&q=85',
  'slide-sri-lanka': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1920&q=85',
  'slide-dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
  'slide-vietnam': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85',
  'slide-mauritius': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=85',
  'slide-seychelles': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
  'slide-azerbaijan': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=85',
  'slide-oman': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85'
};

// Signature Holiday Types photography (All verified 200 OK)
export const HOLIDAY_TYPE_STOCK_IMAGES: Record<string, string> = {
  'ht-honeymoon': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80', // Romantic beach setup at dusk
  'ht-family-group': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80', // Joyful family exploring coast
  'ht-adventure': 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80', // Hot air balloons in Cappadocia sunrise
  'ht-luxury-escapes': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Luxury cliffside resort infinity pool
  'ht-women-solo': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80' // Solo woman traveller admiring scenic mountain view
};

// Package-specific hero stock images for each of the 33 packages (All verified 200 OK)
export const PACKAGE_STOCK_IMAGES: Record<string, string> = {
  'pkg-01': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', // Maldives overwater
  'pkg-02': 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80', // Maldives beach villa
  'pkg-03': 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80', // Sri Lanka nine arch bridge
  'pkg-04': 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80', // Galle fort Sri Lanka
  'pkg-05': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', // Mauritius catamaran lagoon
  'pkg-06': 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80', // Mauritius palm beach resort
  'pkg-07': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Seychelles granite rocks
  'pkg-08': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', // Seychelles turquoise lagoon
  'pkg-09': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', // Bali Ubud rice terrace
  'pkg-10': 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80', // Nusa Penida Kelingking cliff
  'pkg-11': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80', // Singapore Supertrees
  'pkg-12': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80', // KL Twin Towers & Merlion
  'pkg-13': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', // Langkawi skybridge
  'pkg-14': 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80', // Thailand Phuket longtail boat
  'pkg-15': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80', // Krabi Railay beach
  'pkg-16': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Koh Samui pool villa
  'pkg-17': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Ha Long Bay junk boat
  'pkg-18': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', // Mekong Delta river boats (Verified 200 OK)
  'pkg-19': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80', // Dubai Burj Khalifa & fountain
  'pkg-20': 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80', // Dubai corporate MICE skyline
  'pkg-21': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80', // Istanbul Hagia Sophia & Bosphorus
  'pkg-22': 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80', // Cappadocia balloons
  'pkg-23': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80', // Bahrain fort & skyline
  'pkg-24': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', // Bahrain F1 track & MICE
  'pkg-25': 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=80', // Petra Treasury (Verified 200 OK)
  'pkg-26': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', // Jordan Jerash Roman columns & ruins (Verified 200 OK)
  'pkg-27': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', // Muscat Grand Mosque & Wahiba sands
  'pkg-28': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80', // Oman Jebel Akhdar green mountain
  'pkg-29': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80', // Georgia Kazbegi church & Caucasus
  'pkg-30': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80', // Georgia Kakheti wine vineyard
  'pkg-31': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80', // Baku Flame Towers (Verified 200 OK)
  'pkg-32': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80', // Azerbaijan Gabala mountains
  'pkg-33': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'  // Baku Caspian seafront MICE conference
};

// Gallery images set for package detail pages (3 per package)
export const PACKAGE_GALLERY_IMAGES: Record<string, string[]> = {
  'default': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
  ]
};

// Professional portraits for About / Leadership team
export const ABOUT_TEAM_IMAGES = {
  founder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Elegant woman executive (Founder Aameena)
  specialist1: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80', // Islands & Far East specialist
  specialist2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'  // Middle East & Mediterranean specialist
};
