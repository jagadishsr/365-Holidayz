/**
 * 365Holidayz - Curated 1-Minute Destination Preview Videos
 * Relevant 1-minute high-definition cinematic previews for every key destination and signature holiday type.
 */

export interface DestinationVideo {
  id: string;
  destination: string;
  destinationSlug: string;
  holidayTypeId: string;
  holidayTypeTitle: string;
  title: string;
  duration: string;
  embedUrl: string;
  thumbnail: string;
  highlights: string[];
  description: string;
}

export const DESTINATION_VIDEOS: DestinationVideo[] = [
  {
    id: 'vid-maldives',
    destination: 'Maldives',
    destinationSlug: 'maldives',
    holidayTypeId: 'ht-honeymoon',
    holidayTypeTitle: 'Honeymoon',
    title: 'Maldives: Overwater Sanctuaries & Azure Lagoons',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/jG7oXj0w_fA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Private overwater villa sundecks', 'Snorkeling over virgin coral reefs', 'Sunset catamaran cruises', 'Candlelit sandbank dinners'],
    description: 'Immerse in 60 seconds of uninterrupted turquoise horizons, luxury water villas, and serene Maldivian peace.'
  },
  {
    id: 'vid-bali',
    destination: 'Bali',
    destinationSlug: 'bali',
    holidayTypeId: 'ht-women-solo',
    holidayTypeTitle: 'Women Solo & Honeymoon',
    title: 'Bali: Emerald Terraces, Waterfalls & Sacred Temples',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/BFS9n4B_2xA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ubud misty rice terraces', 'Tibumana hidden waterfalls', 'Tanah Lot coastal sunsets', 'Traditional Balinese wellness spas'],
    description: 'A 1-minute journey across Ubud’s peaceful jungle valleys, cliffside temples, and golden beach horizons.'
  },
  {
    id: 'vid-philippines',
    destination: 'Philippines',
    destinationSlug: 'philippines',
    holidayTypeId: 'ht-adventure',
    holidayTypeTitle: 'Adventure & Island Wonders',
    title: 'Philippines: Oslob Whale Sharks, Kawasan & Bohol Hills',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/6_Hl8X9lS00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Swimming with Oslob whale sharks', 'Turquoise plunge pools of Kawasan Falls', 'Bohol Chocolate Hills', 'Manila historic walled city'],
    description: 'Featured in official 365Holidayz client poster: 7 days of tropical island wonders across Cebu, Bohol and Manila.'
  },
  {
    id: 'vid-cappadocia-turkey',
    destination: 'Türkiye (Cappadocia & Istanbul)',
    destinationSlug: 'istanbul-turkey',
    holidayTypeId: 'ht-adventure',
    holidayTypeTitle: 'Adventure & Luxury',
    title: 'Türkiye: Sunrise Balloons over Fairy Chimneys & Bosphorus',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/F4s9a33u7iY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Sunrise hot air balloon flight in Cappadocia', 'Hagia Sophia & Blue Mosque', 'Sunset Bosphorus private yacht', 'Underground Derinkuyu cities'],
    description: 'Featured in official Diwali Damakka client poster: iconic Ottoman architecture and surreal geological spires.'
  },
  {
    id: 'vid-singapore-malaysia',
    destination: 'Singapore & Malaysia',
    destinationSlug: 'singapore',
    holidayTypeId: 'ht-family-group',
    holidayTypeTitle: 'Family & Group',
    title: 'Singapore & Malaysia: Twin City Icons & Rainforests',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/P_q3BdrFsLI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Sentosa Cable Car & Wings of Time', 'Petronas Twin Towers & Chinatown', 'Genting Highlands cable car', 'World-famous Night Safari'],
    description: 'Direct from our official 5-day client poster: modern metropolis luxury paired with mountain cable cars and night safari.'
  },
  {
    id: 'vid-georgia',
    destination: 'Georgia',
    destinationSlug: 'georgia',
    holidayTypeId: 'ht-adventure',
    holidayTypeTitle: 'Adventure & Nature',
    title: 'Georgia: High Caucasus Peaks & Historic Old Tbilisi',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/sL6h6K2v-dM?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Gergeti Trinity Church beneath Mount Kazbegi', 'Old Tbilisi sulfur bath domes & Peace Bridge', 'Kakheti ancient Qvevri wine cellars', 'Batumi Black Sea boulevard'],
    description: 'Witness snow-dusted Caucasus mountain peaks, ancient stone watchtowers, and warm Georgian hospitality.'
  },
  {
    id: 'vid-dubai',
    destination: 'Dubai',
    destinationSlug: 'dubai',
    holidayTypeId: 'ht-luxury-escapes',
    holidayTypeTitle: 'Luxury Escapes',
    title: 'Dubai: High-Octane Skyline & Golden Desert Dunes',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/IdpePXN4vjI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Burj Khalifa panoramic observation deck', 'Sunset 4x4 desert dune safari', 'Dubai Marina luxury yacht cruise', 'The Palm Jumeirah luxury beach resorts'],
    description: 'Experience 60 seconds of world-class architectural marvels, Michelin dining, and golden desert sunsets.'
  },
  {
    id: 'vid-sri-lanka',
    destination: 'Sri Lanka',
    destinationSlug: 'sri-lanka',
    holidayTypeId: 'ht-family-group',
    holidayTypeTitle: 'Family & Culture',
    title: 'Sri Lanka: Sigiriya Citadel, Blue Train & Wildlife Safaris',
    duration: '1:00 min',
    embedUrl: 'https://www.youtube-nocookie.com/embed/e2K1g2Qy1sA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1',
    thumbnail: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Climbing ancient Sigiriya Rock Citadel', 'Kandy to Ella scenic blue hill train', 'Yala National Park leopard & elephant safari', 'Southern golden coast turtle sanctuaries'],
    description: 'A 1-minute journey across verdant Ceylon tea hills, historic Buddhist monuments, and wild ocean coastlines.'
  }
];
