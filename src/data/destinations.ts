/**
 * 365Holidayz - Destinations Master Dataset
 * Features destinations from the client workbook across 4 regions,
 * plus Hong Kong & Macau explicitly designated as "Inspiration-Only".
 */

import { Destination } from '../types';

export const ALL_DESTINATIONS: Destination[] = [
  // --- FEATURED DESTINATIONS ---
  {
    id: 'dest-bali',
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Far East Asian',
    tagline: 'Isle of Gods, verdant rice terraces & coastal sanctuaries',
    heroImageSubject: 'Bali emerald green stepped rice terraces with morning mist in Ubud',
    description: 'A harmonious sanctuary where lush tropical valleys meet spiritual heritage, clifftop ocean temples, and world-renowned boutique hospitality.',
    whyVisit: [
      'Authentic cultural traditions, village gamelan rhythms, and living temple rituals',
      'Dramatic geographic diversity from Ubud river gorges to Uluwatu sea cliffs',
      'Exceptional private pool villas and wellness retreats tailored for discerning travellers',
      'Vibrant culinary scenes blending Balinese spice heritage with contemporary organic dining'
    ],
    keyExperiences: [
      'Sunrise walks through the stepped green amphitheatre of Tegalalang Rice Terraces',
      'Private blessing ceremony at a sacred Balinese water temple',
      'Kecak sunset fire dance atop the limestone cliffs of Uluwatu',
      'Day trip across crystalline waters to the dramatic sea cliffs of Nusa Penida'
    ],
    bestTimeToVisit: 'April to October',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Dry season brings pleasant breezes, lower humidity, and optimal conditions for island exploration.',
    practicalInfo: {
      currency: 'Indonesian Rupiah (IDR)',
      language: 'Indonesian & Balinese (English widely spoken in hotels)',
      idealDuration: '5 to 8 Days',
      timeZone: 'GMT+8 (WITA)',
      highlights: 'Ubud cultural sanctums, Seminyak dining, Uluwatu sunset cliffs'
    },
    travelStyles: ['Honeymoon & Romance', 'Wellness & Serenity', 'Adventure & Discovery', 'Family Luxury'],
    isFeatured: true,
    faqs: [
      {
        question: 'What is the visa policy for travelling to Bali?',
        answer: 'Most international visitors are eligible for a 30-day Visa on Arrival (e-VoA or at airport counters) and must pay the provincial Bali tourist levy. Always confirm current passport validity (minimum 6 months).'
      },
      {
        question: 'How do you recommend splitting a stay in Bali?',
        answer: 'We typically recommend a split stay: 2–3 nights in Ubud for rainforest tranquility and culture, followed by 3–4 nights on the south coast (Seminyak, Uluwatu, or Nusa Dua) for coastal leisure.'
      }
    ]
  },
  {
    id: 'dest-thailand',
    slug: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    region: 'Far East Asian',
    tagline: 'Golden royal temples, Andaman karst islands & culinary mastery',
    heroImageSubject: 'Phuket longtail boat floating on emerald green water beside limestone karst cliffs',
    description: 'From Bangkok’s sparkling royal spires and floating canals to the dramatic karst towers of Phuket, Krabi, and Koh Samui’s coconut shores.',
    whyVisit: [
      'Warm, world-famous Thai hospitality and refined service traditions',
      'Iconic limestone marine topography in Phang Nga Bay and Railay Beach',
      'Legendary culinary heritage from street-side pad thai to Michelin-starred royal gastronomy',
      'Seamless multi-destination journeys combining metropolis and island sanctuaries'
    ],
    keyExperiences: [
      'Private longtail boat navigation between the limestone monoliths of Krabi & Phuket',
      'Chao Phraya sunset private dinner cruise past illuminated Wat Arun',
      'Traditional Thai herbal wellness treatments and beachfront sound baths',
      'Exploring sacred stupas and gold-leaf Buddha sanctuaries in Bangkok'
    ],
    bestTimeToVisit: 'November to early April',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: The cool and dry winter season offers calm seas, sunny skies, and temperate temperatures.',
    practicalInfo: {
      currency: 'Thai Baht (THB)',
      language: 'Thai (English widely understood in hospitality)',
      idealDuration: '6 to 10 Days',
      timeZone: 'GMT+7 (ICT)',
      highlights: 'Bangkok Grand Palace, Phuket beaches, Krabi karst islands'
    },
    travelStyles: ['Family & Group', 'Island Luxury', 'Culinary & Heritage', 'Romance'],
    isFeatured: true,
    faqs: [
      {
        question: 'Can we combine Bangkok with island destinations?',
        answer: 'Yes, our packages are thoughtfully crafted to link Bangkok with Phuket, Krabi, or Koh Samui via short 1-hour domestic hops with private door-to-door transfers.'
      },
      {
        question: 'Are national park fees included in island boat trips?',
        answer: 'Marine park conservation fees (approx THB 300–400) are typically payable directly in local currency at park checkpoints. Our concierge notes these transparently before travel.'
      }
    ]
  },
  {
    id: 'dest-istanbul-turkey',
    slug: 'istanbul-turkey',
    name: 'Istanbul & Turkey',
    country: 'Turkey',
    region: 'Middle East & Mediterranean',
    tagline: 'Where continents converge: Imperial mosques, Bosphorus straits & Cappadocia valleys',
    heroImageSubject: 'Hagia Sophia domes and minarets illuminated at twilight across Sultanahmet square',
    description: 'An evocative crossroads of civilizations spanning Byzantine and Ottoman glory, complemented by the otherworldly fairy-chimney landscapes of Cappadocia.',
    whyVisit: [
      'Staggering historical depth spanning two millennia across Europe and Asia',
      'Atmospheric bazaars laden with silk, carpets, Turkish delight, and spices',
      'Surreal balloon-filled sunrises over Cappadocia’s subterranean troglodyte valleys',
      'Legendary Ottoman culinary richness and authentic Turkish hammam rituals'
    ],
    keyExperiences: [
      'Private sunset cruise along the Bosphorus dividing the European and Asian shores',
      'Early morning hot-air balloon ascent over Cappadocia’s fairy chimneys',
      'Private guided walkthrough of Hagia Sophia, Blue Mosque, and Topkapi Palace',
      'Authentic Anatolian dinner inside a centuries-old restored cave restaurant'
    ],
    bestTimeToVisit: 'April to May & September to November',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Spring and autumn offer ideal, pleasant weather for walking historic quarters and clear skies for ballooning.',
    practicalInfo: {
      currency: 'Turkish Lira (TRY) / EUR widely quoted for luxury travel',
      language: 'Turkish (English common in hotels & guided tours)',
      idealDuration: '5 to 9 Days',
      timeZone: 'GMT+3 (TRT)',
      highlights: 'Sultanahmet heritage, Bosphorus private cruises, Cappadocia cave dwellings'
    },
    travelStyles: ['Heritage & Architecture', 'Luxury Escapes', 'Adventure', 'Solo Journeys'],
    isFeatured: true,
    faqs: [
      {
        question: 'Is it easy to combine Istanbul with Cappadocia?',
        answer: 'Yes, frequent daily flights connect Istanbul airports to Kayseri or Nevsehir in just 80 minutes, followed by our private transfer to your cave hotel suite.'
      },
      {
        question: 'Are hot-air balloon flights guaranteed in Cappadocia?',
        answer: 'All balloon operations are governed strictly by Turkish Civil Aviation daily weather safety approvals. We always recommend at least 2–3 mornings in Cappadocia to ensure the best flying window.'
      }
    ]
  },
  {
    id: 'dest-hong-kong-macau',
    slug: 'hong-kong-macau',
    name: 'Hong Kong & Macau',
    country: 'Special Administrative Regions',
    region: 'Far East Asian',
    tagline: 'Inspiration Only: Neon skylines, Victoria Harbour & Portuguese-Cantonese heritage',
    heroImageSubject: 'Victoria Harbour skyline reflection with traditional junk boat sail in Hong Kong',
    description: 'A dazzling juxtaposition of sky-piercing towers, tranquil mountain tramways, Michelin dining, and Macau’s UNESCO cobblestone Portuguese heritage.',
    whyVisit: [
      'Iconic Victoria Peak panoramas and historic Star Ferry harbour crossings',
      'Macau’s UNESCO Historic Centre blending baroque Portuguese facades with Cantonese temples',
      'World-class shopping, modern art museums, and legendary dim sum dining',
      'Dynamic urban energy combined with lush green outlying hiking trails'
    ],
    keyExperiences: [
      'Victoria Peak tram journey at twilight to overlook the illuminated skyline',
      'Tasting Michelin-level dim sum and roast goose in central Hong Kong',
      'Walking through the Ruins of St. Paul’s and Senado Square in Macau',
      'High-speed TurboJet ferry crossing across the Pearl River Delta'
    ],
    bestTimeToVisit: 'October to December',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Autumn brings crisp, pleasant breezes, lower humidity, and sunny days.',
    practicalInfo: {
      currency: 'Hong Kong Dollar (HKD) & Macau Pataca (MOP)',
      language: 'Cantonese & English (Portuguese also official in Macau)',
      idealDuration: '4 to 6 Days',
      timeZone: 'GMT+8 (HKT)',
      highlights: 'Victoria Harbour, Peak Tram, Macau St. Paul’s ruins, Dim Sum culture'
    },
    travelStyles: ['Urban Luxury', 'Culinary Expeditions', 'Shopping & Glamour'],
    isFeatured: true,
    isInspirationOnly: true, // Strictly specified in brief: inspiration-only, no active package in current sheet
    faqs: [
      {
        question: 'Why does Hong Kong & Macau show as Inspiration-Only?',
        answer: 'Our current verified package catalogue does not contain a fixed group or fixed-departure package for Hong Kong & Macau. However, with our 30+ years of expertise, our travel planners curate bespoke private independent itineraries upon request.'
      },
      {
        question: 'Can I request a custom trip to Hong Kong & Macau?',
        answer: 'Absolutely. Click "Plan Your Trip" or "Enquire / Customise" and our specialist concierge will design a tailored route for your travel dates.'
      }
    ]
  },

  // --- OTHER DESTINATIONS FROM WORKBOOK ---
  {
    id: 'dest-maldives',
    slug: 'maldives',
    name: 'Maldives',
    country: 'Republic of Maldives',
    region: 'Islands',
    tagline: 'Pristine atolls, overwater bungalows & crystalline lagoons',
    heroImageSubject: 'Maldives overwater lagoon bungalow with direct turquoise ocean access',
    description: 'An idyllic Indian Ocean archipelago of 1,200 coral islands, where azure horizons meet private overwater suites and vibrant marine sanctuaries.',
    whyVisit: [
      'Unmatched privacy with one-island, one-resort concepts',
      'Direct lagoon access from private sundecks with manta ray encounters',
      'World-class spa sanctuaries suspended above living coral reefs',
      'Effortless barefoot luxury tailored for unforgettable honeymoons and family escapes'
    ],
    keyExperiences: [
      'Waking up to 360-degree turquoise ocean views from your overwater villa',
      'Snorkeling with resident sea turtles and harmless reef sharks in house reefs',
      'Private sunset dolphin dhoni cruise across North Malé Atoll',
      'Starlit sandbank dining surrounded only by the gentle sound of waves'
    ],
    bestTimeToVisit: 'November to April',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Northeast monsoon brings dry, sunny days, calm ocean lagoons, and pristine underwater visibility.',
    practicalInfo: {
      currency: 'Maldivian Rufiyaa (MVR) / USD standard in resorts',
      language: 'Dhivehi (English spoken universally in resorts)',
      idealDuration: '4 to 6 Nights',
      timeZone: 'GMT+5 (Resorts often maintain "Island Time" GMT+6)',
      highlights: 'Overwater villas, house reef snorkeling, sunset cruises'
    },
    travelStyles: ['Honeymoon & Romance', 'Luxury Escapes', 'Family Beachfront'],
    isFeatured: false,
    faqs: [
      {
        question: 'How do resort transfers work in the Maldives?',
        answer: 'Depending on your resort’s distance from Velana International Airport (Malé), transfers are arranged via speedboat (for nearby atolls) or scenic twin-otter seaplane.'
      }
    ]
  },
  {
    id: 'dest-sri-lanka',
    slug: 'sri-lanka',
    name: 'Sri Lanka',
    country: 'Democratic Socialist Republic of Sri Lanka',
    region: 'Islands',
    tagline: 'Ancient royal citadels, rolling Ceylon tea hills & wild coasts',
    heroImageSubject: 'Sri Lanka misty green rolling tea hills and colonial mountain train',
    description: 'The teardrop island of serendipity: ancient UNESCO rock citadels, misty mountain tea bungalows, wild leopard safaris, and Dutch colonial ramparts.',
    whyVisit: [
      'Incredible compactness: go from coastal surf to cloud-forest tea hills in hours',
      'Eight UNESCO World Heritage sites spanning Sigiriya, Dambulla, and Galle',
      'High leopard and Asian elephant density in Yala and Minneriya national parks',
      'Warm Ceylon hospitality and authentic Ayurvedic wellness traditions'
    ],
    keyExperiences: [
      'Climbing the 1,200 steps to the sky fortress of Sigiriya Lion Rock at sunrise',
      'Riding the blue colonial scenic train across the Demodara Nine Arch Bridge',
      'Walking along the 17th-century ramparts of Galle Fort at twilight',
      'Sipping hand-picked single-origin Pekoe tea in a cool colonial estate'
    ],
    bestTimeToVisit: 'December to April for West/South Coast & Hill Country',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Favourable dry conditions prevail along southern beaches and central tea highlands during winter.',
    practicalInfo: {
      currency: 'Sri Lankan Rupee (LKR)',
      language: 'Sinhala & Tamil (English widely understood)',
      idealDuration: '5 to 8 Days',
      timeZone: 'GMT+5:30',
      highlights: 'Sigiriya Rock, Kandy Temple, Nuwara Eliya, Galle Fort'
    },
    travelStyles: ['Heritage & Culture', 'Wildlife Safari', 'Scenic Rail Journeys'],
    isFeatured: false,
    faqs: [
      {
        question: 'Is a private driver recommended in Sri Lanka?',
        answer: 'Yes, all our Sri Lanka packages include an experienced private chauffeur-guide with an air-conditioned car, providing safe navigation and authentic local insights.'
      }
    ]
  },
  {
    id: 'dest-mauritius',
    slug: 'mauritius',
    name: 'Mauritius',
    country: 'Republic of Mauritius',
    region: 'Islands',
    tagline: 'Volcanic emerald peaks, sugar cane fields & sheltered coral lagoons',
    heroImageSubject: 'Mauritius Le Morne Brabant mountain rising dramatically above turquoise lagoon',
    description: 'A cosmopolitan tropical jewel in the Indian Ocean, revered for its dramatic basalt monoliths, Creole gastronomy, and tranquil catamaran sailing.',
    whyVisit: [
      'Sheltered shallow lagoons ideal for swimming and family water sports',
      'Fascinating cultural harmony blending Creole, French, Indian, and African roots',
      'Volcanic wonders such as Chamarel Seven Coloured Earth and Grand Bassin',
      'Renowned golf courses and luxury all-inclusive beachfront resorts'
    ],
    keyExperiences: [
      'Full-day private catamaran sailing to Ile aux Cerfs with on-board BBQ lunch',
      'Hiking the foothills beneath the UNESCO silhouette of Le Morne Brabant',
      'Exploring the vibrant mineral dunes of Chamarel and the roaring Chamarel waterfalls',
      'Creole culinary cooking class featuring fresh vanilla and sea salt'
    ],
    bestTimeToVisit: 'May to December',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Winter and early summer offer mild tropical temperatures and lower humidity.',
    practicalInfo: {
      currency: 'Mauritian Rupee (MUR) / EUR accepted in resorts',
      language: 'English & French, Mauritian Creole',
      idealDuration: '6 to 7 Nights',
      timeZone: 'GMT+4',
      highlights: 'Grand Baie, Ile aux Cerfs, Chamarel, Le Morne'
    },
    travelStyles: ['Honeymoon & Romance', 'All-Ages Family', 'Catamaran & Coast'],
    isFeatured: false,
    faqs: [
      {
        question: 'Is Mauritius suitable for family vacations with children?',
        answer: 'Mauritius is one of the world’s most family-friendly tropical destinations, featuring calm barrier-reef-protected waters and world-class resort kids clubs.'
      }
    ]
  },
  {
    id: 'dest-seychelles',
    slug: 'seychelles',
    name: 'Seychelles',
    country: 'Republic of Seychelles',
    region: 'Islands',
    tagline: 'Ancient sculpted granite boulders, prehistoric palms & giant tortoises',
    heroImageSubject: 'Giant sculpted pink granite boulders resting on powder beach in Seychelles',
    description: 'An untouched granitic sanctuary of Jurassic beauty: powdery secluded shores framed by smooth pink boulders, giant Aldabra tortoises, and rare coco de mer palms.',
    whyVisit: [
      'Unique geology: the only mid-ocean granitic island chain on earth',
      'Uncrowded, postcard-perfect beaches consistently rated among the world’s finest',
      'Pristine nature reserves preserving prehistoric flora and marine life',
      'Relaxed island-hopping lifestyle easily explored by ferry and bicycle'
    ],
    keyExperiences: [
      'Bicycling beneath swaying palms to Anse Source d’Argent on La Digue',
      'Guided walk through the prehistoric UNESCO palm forest of Vallée de Mai on Praslin',
      'Encountering free-roaming giant Aldabra tortoises in marine conservation reserves',
      'Sunset snorkeling along secluded granite coves in Mahé'
    ],
    bestTimeToVisit: 'April to May & October to November',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Transition months between trade winds provide the calmest seas and clearest underwater visibility.',
    practicalInfo: {
      currency: 'Seychellois Rupee (SCR) / EUR widely used',
      language: 'Seychellois Creole, English & French',
      idealDuration: '5 to 7 Nights',
      timeZone: 'GMT+4',
      highlights: 'Mahé heritage, Praslin Vallée de Mai, La Digue granite shores'
    },
    travelStyles: ['Ultra-Luxury', 'Eco-Romance', 'Island Hopping'],
    isFeatured: false,
    faqs: [
      {
        question: 'How do you travel between Mahé, Praslin, and La Digue?',
        answer: 'Inter-island travel is seamless using high-speed Cat Cocos ferries or short 15-minute twin-otter island flights between Mahé and Praslin.'
      }
    ]
  },
  {
    id: 'dest-singapore',
    slug: 'singapore',
    name: 'Singapore',
    country: 'Republic of Singapore',
    region: 'Far East Asian',
    tagline: 'The Garden City of tomorrow: Futuristic architecture & hawker gastronomy',
    heroImageSubject: 'Singapore Gardens by the Bay supertrees glowing brightly against twilight skyline',
    description: 'A masterclass in modern living: soaring supertrees, tropical cloud forests under glass domes, world-class theme parks, and Michelin-recognised street food.',
    whyVisit: [
      'Effortless urban safety, cleanliness, and state-of-the-art public infrastructure',
      'Iconic architectural wonders including Marina Bay Sands and Jewel Changi Airport',
      'UNESCO-inscribed hawker culture showcasing Chinese, Malay, Indian, and Peranakan flavors',
      'World-class family attractions on Sentosa Island and Mandai Wildlife Reserve'
    ],
    keyExperiences: [
      'Walking the suspended aerial walkway among the glowing Supertree Grove',
      'Sunset bumboat cruise along the historic Singapore River to Clarke Quay',
      'A thrilling day exploring Universal Studios Singapore on Sentosa Island',
      'Curated street-food tasting at Lau Pa Sat under Victorian cast-iron arches'
    ],
    bestTimeToVisit: 'Year-Round (Best: November to July)',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Tropical climate with warm temperatures year-round, ideal for urban leisure.',
    practicalInfo: {
      currency: 'Singapore Dollar (SGD)',
      language: 'English (Official), Mandarin, Malay, Tamil',
      idealDuration: '4 to 5 Days',
      timeZone: 'GMT+8 (SGT)',
      highlights: 'Gardens by the Bay, Marina Bay, Sentosa, Orchard Road'
    },
    travelStyles: ['Family & Group', 'Modern Luxury', 'City & Food'],
    isFeatured: false,
    faqs: [
      {
        question: 'Can Singapore be easily combined with Malaysia?',
        answer: 'Yes! We offer a popular twin-city itinerary combining Singapore with Kuala Lumpur and Genting via luxury overland coach or express flight.'
      }
    ]
  },
  {
    id: 'dest-malaysia',
    slug: 'malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    region: 'Far East Asian',
    tagline: 'Twin towers, UNESCO heritage towns & Langkawi rainforest canopies',
    heroImageSubject: 'Kuala Lumpur Petronas Twin Towers illuminated against deep night sky',
    description: 'A captivating fusion of sleek capital skylines, multi-coloured cave temples, colonial port history, and duty-free rainforest archipelagos.',
    whyVisit: [
      'Iconic skyline view of the Petronas Twin Towers from rooftop vantage points',
      'Batu Caves sacred Hindu shrine inside colossal limestone caverns',
      'Langkawi UNESCO Geopark featuring ancient rainforests and cliffside skybridges',
      'Rich multi-ethnic cultural tapestry and renowned street food diversity'
    ],
    keyExperiences: [
      'Riding the panoramic Langkawi cable car to the curved mountain SkyBridge',
      'Climbing the 272 rainbow steps at Batu Caves past the giant Murugan statue',
      'Boat safari through Kilim Karst Geoforest to observe sea eagles diving',
      'Browsing night markets along Jalan Alor in Kuala Lumpur'
    ],
    bestTimeToVisit: 'December to April for West Coast & Langkawi',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: West coast destinations enjoy drier, sunnier weather during this period.',
    practicalInfo: {
      currency: 'Malaysian Ringgit (MYR)',
      language: 'Bahasa Malaysia (English widely spoken)',
      idealDuration: '5 to 7 Days',
      timeZone: 'GMT+8 (MYT)',
      highlights: 'Kuala Lumpur, Batu Caves, Genting Highlands, Langkawi Island'
    },
    travelStyles: ['Family Leisure', 'Nature & Rainforest', 'City Exploration'],
    isFeatured: false,
    faqs: [
      {
        question: 'What is the Malaysian hotel tourism tax?',
        answer: 'A standard tourism tax of MYR 10 per room per night is levied on foreign guests, payable directly to the hotel upon check-in.'
      }
    ]
  },
  {
    id: 'dest-vietnam',
    slug: 'vietnam',
    name: 'Vietnam',
    country: 'Socialist Republic of Vietnam',
    region: 'Far East Asian',
    tagline: 'Ha Long emerald waters, lantern-lit ancient towns & French boulevards',
    heroImageSubject: 'Traditional wooden cruise junk sailing between dramatic misty karst pillars in Ha Long Bay Vietnam',
    description: 'A sensory journey through thousand-year-old Hanoi quarters, overnight cruises among limestone seascape monoliths, and the lantern-lit canals of Hoi An.',
    whyVisit: [
      'Cruising the ethereal UNESCO world wonder of Ha Long Bay',
      'Fascinating balance of ancient Vietnamese dynasties and French colonial charm',
      'World-famous fresh cuisine rich in herbs, broths, and artisanal coffee',
      'Welcoming people and remarkable value for curated bespoke travel'
    ],
    keyExperiences: [
      'Overnight luxury cruise through the quiet karst waters of Ha Long Bay',
      'Walking across the giant stone hands of the Golden Bridge in Ba Na Hills',
      'Wandering the atmospheric yellow shophouse alleys of Hoi An at night',
      'Exploring the historic waterways and fruit gardens of the Mekong Delta by sampan'
    ],
    bestTimeToVisit: 'October to April',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Moderate temperatures and lower rainfall across northern and central Vietnam.',
    practicalInfo: {
      currency: 'Vietnamese Dong (VND) / USD widely accepted',
      language: 'Vietnamese (English common in hotels & tour services)',
      idealDuration: '6 to 9 Days',
      timeZone: 'GMT+7 (ICT)',
      highlights: 'Hanoi Old Quarter, Ha Long Bay, Da Nang Golden Bridge, Mekong Delta'
    },
    travelStyles: ['Adventure & Cruise', 'Heritage & Culture', 'Gastronomy'],
    isFeatured: false,
    faqs: [
      {
        question: 'Do travellers need a visa for Vietnam?',
        answer: 'Most nationalities can easily obtain an official Vietnam E-Visa online prior to departure. Our team provides checklist guidelines for application.'
      }
    ]
  },
  {
    id: 'dest-dubai',
    slug: 'dubai',
    name: 'Dubai & UAE',
    country: 'United Arab Emirates',
    region: 'Middle East & Mediterranean',
    tagline: 'Record-shattering architecture, desert sands & Arabian glamour',
    heroImageSubject: 'Burj Khalifa soaring above shimmering Dubai skyline and dancing fountain lake',
    description: 'An architectural playground rising from the golden desert: the world’s tallest tower, private yacht marina cruises, luxury dune glamping, and corporate MICE hubs.',
    whyVisit: [
      'Unsurpassed luxury standards in hospitality, shopping, and dining',
      'Thrilling desert safari dune bashing, falconry, and Bedouin banquet dinners',
      'World-class family theme parks, water parks, and mega-malls',
      'Leading global corporate conference and executive incentive infrastructure'
    ],
    keyExperiences: [
      'Looking out from the 124th floor observation deck of Burj Khalifa',
      'Private 4x4 red dune desert safari with sunset dinner under the stars',
      'Afternoon private yacht charter cruising past Dubai Marina and Palm Jumeirah',
      'Browsing gold and frankincense souqs along the historic Dubai Creek'
    ],
    bestTimeToVisit: 'November to March',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Mild winter temperatures make outdoor dining, desert adventures, and beach walks ideal.',
    practicalInfo: {
      currency: 'UAE Dirham (AED)',
      language: 'Arabic (English is the universal lingua franca for business & leisure)',
      idealDuration: '4 to 6 Days',
      timeZone: 'GMT+4 (GST)',
      highlights: 'Burj Khalifa, Desert Safari, Dubai Marina, Museum of the Future'
    },
    travelStyles: ['Luxury Escapes', 'Corporate & MICE', 'Family Holiday'],
    isFeatured: false,
    faqs: [
      {
        question: 'What is the Tourism Dirham fee in Dubai?',
        answer: 'A small government tourism dirham fee (typically AED 15–20 per bedroom per night for 4/5-star hotels) is charged directly upon hotel checkout.'
      }
    ]
  },
  {
    id: 'dest-bahrain',
    slug: 'bahrain',
    name: 'Kingdom of Bahrain',
    country: 'Kingdom of Bahrain',
    region: 'Middle East & Mediterranean',
    tagline: 'Dilmun civilizations, pearl diving trails & Arabian coastal grace',
    heroImageSubject: 'Qal’at al-Bahrain ancient stone fortress overlooking modern Manama coastal skyline',
    description: 'An intimate island kingdom rich in 4,000-year-old Dilmun heritage, UNESCO pearling history, traditional dhow boat harbors, and motorsport prestige.',
    whyVisit: [
      'Historic Dilmun burial mounds and the seaside fortress of Qal’at al-Bahrain',
      'UNESCO Pearling Path walking trail through restored merchant wind-tower houses',
      'Home of the prestigious Bahrain International Circuit Formula 1 venue',
      'Warm Arabian hospitality with relaxed island character'
    ],
    keyExperiences: [
      'Exploring the ancient Portuguese & Dilmun layers of Qal’at al-Bahrain at dusk',
      'Walking through the narrow heritage lanes of Muharraq to visit pearl merchant houses',
      'Karting or taking an executive track tour at Bahrain International Circuit',
      'Sampling traditional halwa and spiced karak chai in Bab Al Bahrain souq'
    ],
    bestTimeToVisit: 'November to April',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Pleasant cool winter weather ideal for exploring outdoor historical sites and coastal walks.',
    practicalInfo: {
      currency: 'Bahraini Dinar (BHD)',
      language: 'Arabic (English widely spoken)',
      idealDuration: '3 to 5 Days',
      timeZone: 'GMT+3 (AST)',
      highlights: 'Bahrain Fort, Pearling Path, Manama Souq, Grand Mosque'
    },
    travelStyles: ['Heritage & Pearls', 'Corporate MICE & Motorsport', 'Relaxed Arabian Escape'],
    isFeatured: false,
    faqs: [
      {
        question: 'Is Bahrain suitable for corporate groups and MICE retreats?',
        answer: 'Yes! Bahrain offers excellent state-of-the-art conference resorts combined with unique team activities at the F1 International Circuit.'
      }
    ]
  },
  {
    id: 'dest-jordan',
    slug: 'jordan',
    name: 'Jordan',
    country: 'Hashemite Kingdom of Jordan',
    region: 'Middle East & Mediterranean',
    tagline: 'Rose-red rock citadel of Petra, Martian desert & Dead Sea float',
    heroImageSubject: 'Petra Al-Khazneh Treasury carved into pink rose sandstone canyon through the Siq in Jordan',
    description: 'An ancient kingdom steeped in biblical history, the rose-red stone marvels of Petra, Mars-like canyons of Wadi Rum, and the buoyant mineral waters of the Dead Sea.',
    whyVisit: [
      'Petra: one of the modern Seven Wonders of the World',
      'Sleeping beneath billions of desert stars in Bedouin luxury Martian domes',
      'Floating effortlessly in the lowest hypersaline point on earth at the Dead Sea',
      'Exceptionally preserved Greco-Roman city ruins at Jerash'
    ],
    keyExperiences: [
      'Walking through the narrow winding Siq canyon as the Petra Treasury reveals itself',
      '4x4 jeep expedition through the towering red granite monoliths of Wadi Rum',
      'Natural mineral mud therapy and tranquil float in the Dead Sea',
      'Walking along the colonnaded Roman cardo maximus of ancient Jerash'
    ],
    bestTimeToVisit: 'March to May & September to November',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Spring and autumn provide temperate daytime hiking conditions in Petra and comfortable desert nights.',
    practicalInfo: {
      currency: 'Jordanian Dinar (JOD) / USD widely accepted',
      language: 'Arabic (English common in tourism)',
      idealDuration: '5 to 7 Days',
      timeZone: 'GMT+3 (EEST)',
      highlights: 'Petra Treasury & Monastery, Wadi Rum desert, Dead Sea, Jerash'
    },
    travelStyles: ['Ancient Wonders', 'Desert Adventure', 'Cultural Pilgrimage'],
    isFeatured: false,
    faqs: [
      {
        question: 'What is the room sharing basis for Jordan packages?',
        answer: 'Jordan packages in our verified master sheet are strictly marked on a twin-sharing basis. Please confirm basis with our travel specialist upon enquiry.'
      }
    ]
  },
  {
    id: 'dest-oman',
    slug: 'oman',
    name: 'Sultanate of Oman',
    country: 'Sultanate of Oman',
    region: 'Middle East & Mediterranean',
    tagline: 'Canyon plateaus, desert dunes, frankincense ports & wadi pools',
    heroImageSubject: 'Dramatic white domes and minarets of Sultan Qaboos Grand Mosque in Muscat Oman',
    description: 'A land of quiet authentic majesty: white whitewashed coastal capitals, majestic canyon gorges in Jebel Akhdar, emerald wadi springs, and sweeping desert sands.',
    whyVisit: [
      'Authentic Arabian heritage without ostentatious high-rises',
      'Dramatic geological canyons rivaling the Grand Canyon at Jebel Shams & Jebel Akhdar',
      'Swimming in crystal clear natural freshwater pools inside deep wadi gorges',
      'Centuries of maritime history and fragrant UNESCO frankincense trading'
    ],
    keyExperiences: [
      'Visiting the marble courtyard and Persian hand-knotted carpet of Sultan Qaboos Grand Mosque',
      'Swimming through the turquoise freshwater caverns of Wadi Shab',
      'Camping atop 200-metre high dunes in the golden desert of Wahiba Sands',
      'Exploring the 17th-century circular battlements of historic Nizwa Fort'
    ],
    bestTimeToVisit: 'October to April',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Cool, sunny winter weather with crisp canyon mountain breezes.',
    practicalInfo: {
      currency: 'Omani Rial (OMR)',
      language: 'Arabic (English widely understood)',
      idealDuration: '4 to 6 Days',
      timeZone: 'GMT+4 (GST)',
      highlights: 'Muscat Grand Mosque, Wahiba Sands, Jebel Akhdar, Nizwa Fort'
    },
    travelStyles: ['Bespoke Luxury', 'Desert & Canyon Safari', 'Authentic Heritage'],
    isFeatured: false,
    faqs: [
      {
        question: 'Do we need a 4WD vehicle for Oman trips?',
        answer: 'Yes, visiting the desert dunes of Wahiba Sands or the high-altitude plateaus of Jebel Akhdar requires a 4WD vehicle and experienced licensed driver.'
      }
    ]
  },
  {
    id: 'dest-georgia',
    slug: 'georgia',
    name: 'Georgia',
    country: 'Georgia',
    region: 'Other Countries',
    tagline: 'Caucasus mountain towers, 8000-year wine cradle & Tbilisi charm',
    heroImageSubject: 'Gergeti Trinity Church standing solitary against snowcapped Mount Kazbek in Georgia',
    description: 'Where Europe meets Asia in the heart of the Caucasus: cobblestone old towns with carved balconies, snowcapped alpine peaks, and the ancient birthplace of wine.',
    whyVisit: [
      'Iconic alpine panoramas of Gergeti Trinity Church below Mount Kazbek',
      'UNESCO-inscribed ancient Qvevri subterranean clay-pot winemaking tradition',
      'Vibrant cafe culture, thermal sulfur bath houses, and art galleries in Old Tbilisi',
      'Hearty, legendary Georgian culinary feasts (Supra) and warm guest hospitality'
    ],
    keyExperiences: [
      'Ascending by 4WD to the 14th-century Gergeti church surrounded by snow-capped peaks',
      'Relaxing in the historic domed sulfur baths of Abanotubani in Tbilisi',
      'Tasting amber Qvevri wines and freshly baked shoti bread at a Kakheti family estate',
      'Photographing the turquoise waters of Jinvali lake and medieval Ananuri fortress'
    ],
    bestTimeToVisit: 'May to October',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Late spring to autumn brings pleasant mountain hiking weather and vibrant wine harvest festivities.',
    practicalInfo: {
      currency: 'Georgian Lari (GEL) / USD common in tourism',
      language: 'Georgian (English common in hotels & guide services)',
      idealDuration: '5 to 7 Days',
      timeZone: 'GMT+4 (GET)',
      highlights: 'Tbilisi Old Town, Kazbegi, Kakheti wine valley, Ananuri Fortress'
    },
    travelStyles: ['Mountain Adventure', 'Wine & Gastronomy', 'Historic Culture'],
    isFeatured: false,
    faqs: [
      {
        question: 'How do you get to Kazbegi from Tbilisi?',
        answer: 'Travel is along the breathtaking Georgian Military Highway via private 4WD, taking approximately 3 to 3.5 hours with scenic stops at Ananuri and Gudauri.'
      }
    ]
  },
  {
    id: 'dest-azerbaijan',
    slug: 'azerbaijan',
    name: 'Azerbaijan',
    country: 'Republic of Azerbaijan',
    region: 'Other Countries',
    tagline: 'The Land of Fire: Flame Towers, Caspian shores & Gobustan mud volcanoes',
    heroImageSubject: 'Baku Flame Towers illuminated with glowing light displays above Caspian Sea promenade',
    description: 'An intriguing juxtaposition of Zaha Hadid’s fluid modern architecture with the 12th-century Maiden Tower, bubbling mud volcanoes, and eternal flames.',
    whyVisit: [
      'Spectacular modern cityscape led by the iconic LED-lit Flame Towers',
      'UNESCO World Heritage Icherisheher (Old City) with ancient stonework and carpet shops',
      'Natural phenomena: bubbling mud volcanoes and eternal burning hillside at Yanar Dag',
      'Lush green alpine retreats and cable cars in Gabala'
    ],
    keyExperiences: [
      'Strolling along the palm-lined Baku Caspian Sea boulevard at sunset',
      'Exploring the fluid white curves of the Heydar Aliyev Centre',
      '4x4 expedition to the surreal bubbling mud volcanoes in Gobustan',
      'Riding the Tufandag Mountain Resort cable car across alpine valleys in Gabala'
    ],
    bestTimeToVisit: 'April to June & September to November',
    bestTimeEditorialLabel: 'Verified Editorial Guidance: Spring and autumn provide mild, comfortable temperatures without summer heat or winter winds.',
    practicalInfo: {
      currency: 'Azerbaijani Manat (AZN) / USD common in tourism',
      language: 'Azerbaijani (English & Russian spoken in hospitality)',
      idealDuration: '4 to 6 Days',
      timeZone: 'GMT+4 (AZT)',
      highlights: 'Baku Old City, Flame Towers, Gobustan, Heydar Aliyev Centre'
    },
    travelStyles: ['City Architecture', 'Family Leisure', 'Corporate MICE'],
    isFeatured: false,
    faqs: [
      {
        question: 'How can travellers obtain an Azerbaijan visa?',
        answer: 'Travellers can obtain an official ASAN E-Visa online in typically 3 business days for approximately USD 26. Our concierge provides full document assistance.'
      }
    ]
  }
];
