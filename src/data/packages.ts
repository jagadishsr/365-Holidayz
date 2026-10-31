/**
 * 365Holidayz - Central Packages Master Dataset
 * Verified 33 Package Records across 4 Regions:
 * 1. Islands (Maldives, Sri Lanka, Mauritius, Seychelles)
 * 2. Far East Asian (Bali, Singapore, Malaysia, Thailand, Vietnam)
 * 3. Middle East & Mediterranean (Dubai, Istanbul/Turkey, Bahrain, Jordan, Oman)
 * 4. Other Countries (Georgia, Azerbaijan)
 *
 * Source Rules:
 * - All currencies preserved (INR, USD, SGD, EUR) without synthetic conversions.
 * - Minimum group sizes (Min 2, Min 4, Min 20, Min 30 Pax) strictly tagged.
 * - Booking validity "by 31 Oct 2026" marked urgent with expert revalidation flag.
 * - Price basis tagged with client review note: "Price shown in client sheet — confirm basis at enquiry".
 * - Jordan specified as "Twin sharing", others as "Double sharing".
 */

import { Package } from '../types';

export const ALL_PACKAGES: Package[] = [
  // ==========================================
  // REGION 1: ISLANDS (Packages 1 - 8)
  // ==========================================
  {
    id: 'pkg-01',
    slug: 'maldives-overwater-villa-luxury-escape',
    title: 'Maldives Overwater Haven & Lagoon Retreat',
    destination: 'Maldives',
    destinationSlug: 'maldives',
    region: 'Islands',
    holidayType: 'Honeymoon',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid for travel Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 1850,
    priceDisplay: 'USD 1,850',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Private overwater villa retreat with turquoise lagoon vistas, speedboat transfers, and daily curated breakfasts and dinners.',
    stayDetails: '5-Star Resort Overwater Villa (North Malé Atoll)',
    features: [
      'Overwater villa accommodation with sundeck lagoon access',
      'Daily half-board meals (Breakfast & Curated Dinner)',
      'Roundtrip speedboat airport transfers',
      'Complimentary non-motorized water sports',
      'Dedicated island host assistance'
    ],
    exclusions: ['International airfare', 'Personal watersports & spa treatments', 'Tourism Green Tax where applicable at checkout'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Booking validity expires 31 Oct 2026 — urgent expert confirmation required',
      'Price shown in client sheet — confirm basis at enquiry',
      'Seaplane surcharge may apply for South Atoll extensions'
    ],
    imageSubject: 'Maldives overwater lagoon bungalow with direct turquoise ocean access',
    gallerySubjects: [
      'Overwater villa wooden sundeck and steps into turquoise lagoon',
      'Sunset dhoni boat cruise across calm Maldivian waters',
      'Beachside candlelit dining table on powder white sand'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-02',
    slug: 'maldives-island-all-inclusive-family-resort',
    title: 'Maldives All-Inclusive Beach Villa & Coral Sanctuary',
    destination: 'Maldives',
    destinationSlug: 'maldives',
    region: 'Islands',
    holidayType: 'Family & Group',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Travel Nov 2026 – May 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 2420,
    priceDisplay: 'USD 2,420',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Beachfront villa sanctuary surrounded by lush tropical greenery with full-board premium dining and reef snorkeling.',
    stayDetails: 'Premium Beach Pool Villa at Curated Island Resort',
    features: [
      'Beachfront pool villa steps from white coral sand',
      'All-inclusive breakfast, lunch, and dinner with selected beverages',
      'Guided house reef snorkeling excursion',
      'Kids club access and family leisure amenities',
      'Roundtrip speedboat transfers'
    ],
    exclusions: ['Long-haul flights', 'Deep sea scuba diving excursions', 'Gratuities'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry',
      'Child occupancy policy subject to resort villa maximum capacity'
    ],
    imageSubject: 'Maldives beachfront family villa sheltered beneath palm trees',
    gallerySubjects: [
      'Lush tropical garden pathway leading to private beach pavilion',
      'Family snorkeling over vibrant coral reef in warm clear ocean',
      'Curated open-air pavilion breakfast with ocean views'
    ]
  },
  {
    id: 'pkg-03',
    slug: 'sri-lanka-scenic-tea-trails-cultural-triangle',
    title: 'Sri Lanka Cultural Triangle & Ceylon Tea Trails',
    destination: 'Sri Lanka',
    destinationSlug: 'sri-lanka',
    region: 'Islands',
    holidayType: 'Adventure',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'INR',
    priceValue: 68500,
    priceDisplay: 'INR 68,500',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Heritage voyage through ancient Sigiriya fortress, Kandy Temple of the Tooth, and misty tea plantations of Nuwara Eliya.',
    stayDetails: 'Curated 4-Star Heritage & Tea Bungalow properties',
    features: [
      '6 nights premium boutique hotel stays with daily breakfast',
      'Private air-conditioned chauffeur-driven transport throughout',
      'Sigiriya Rock Fortress & Dambulla Cave Temple entry facilitation',
      'Scenic Ceylon hill country train ticket arrangement',
      'Tea factory tour and tasting session'
    ],
    exclusions: ['Visa fees (ETA)', 'Airfare', 'Camera permits at historical sites'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: 31 Oct 2026 confirmation threshold',
      'Price shown in client sheet — confirm basis at enquiry',
      'Scenic train seats subject to Sri Lanka Railways reservation availability'
    ],
    imageSubject: 'Sri Lanka misty green rolling tea hills and colonial mountain train',
    gallerySubjects: [
      'Sigiriya Lion Rock fortress standing above lush forest canopy',
      'Historic blue train crossing the Nine Arch Demodara Bridge',
      'Misty high-elevation tea estate colonial veranda at dawn'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-04',
    slug: 'sri-lanka-coastal-wildlife-colombo-galle',
    title: 'Sri Lanka Coastal Splendour, Galle Fort & Yala Safari',
    destination: 'Sri Lanka',
    destinationSlug: 'sri-lanka',
    region: 'Islands',
    holidayType: 'Family & Group',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 10 Nov 2026',
    isUrgentValidity: false,
    currency: 'INR',
    priceValue: 54900,
    priceDisplay: 'INR 54,900',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Coastal circuit covering Colombo city heritage, Bentota beach relaxation, colonial Galle Fort, and leopard-spotting safari in Yala.',
    stayDetails: 'Beachfront Resorts & Safari Lodges',
    features: [
      '5 nights resort & lodge accommodations',
      'Daily breakfast & dinner (Modified American Plan)',
      'Private 4x4 Jeep Safari into Yala National Park',
      'Walking heritage exploration of 17th-century Galle Dutch Fort',
      'Dedicated English-speaking private chauffeur guide'
    ],
    exclusions: ['Park entrance camera charges', 'Travel insurance', 'International flights'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax requirement strictly applies for vehicle tariff tier',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Galle Fort lighthouse overlooking crashing Indian Ocean waves in Sri Lanka',
    gallerySubjects: [
      '4x4 safari vehicle traversing Yala national park scrubland',
      'Historic cobblestone streets of Galle Fort with boutique shops',
      'Golden sand beach of Bentota lined with tall coconut palms'
    ]
  },
  {
    id: 'pkg-05',
    slug: 'mauritius-tropical-lagoon-catamaran-escape',
    title: 'Mauritius Grand Baie & Coral Lagoon Retreat',
    destination: 'Mauritius',
    destinationSlug: 'mauritius',
    region: 'Islands',
    holidayType: 'Honeymoon',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'EUR',
    priceValue: 1290,
    priceDisplay: 'EUR 1,290',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'White sand beaches, Chamarel seven-coloured earth, Ile aux Cerfs catamaran sailing, and luxury beachfront tranquility.',
    stayDetails: 'Curated 4-Star Beachfront Resort (North / East Coast)',
    features: [
      '6 nights beachfront superior room with balcony',
      'Daily breakfast and 3-course dinner',
      'Full-day Ile aux Cerfs Catamaran Cruise with BBQ lunch',
      'South Island full-day tour: Chamarel, Grand Bassin & Trou aux Cerfs',
      'Airport roundtrip coach transfers'
    ],
    exclusions: ['Airfare', 'Optional underwater sea walk', 'Beverages during dinners unless specified'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026 deadline',
      'Price shown in client sheet — confirm basis at enquiry',
      'Currency Euro preserved from source sheet'
    ],
    imageSubject: 'Mauritius Le Morne Brabant mountain rising dramatically above turquoise lagoon',
    gallerySubjects: [
      'White catamaran yacht gliding across azure crystal waters in Mauritius',
      'Vibrant volcanic mineral sands of Chamarel Seven Coloured Earth',
      'Tropical resort pool facing the protected coral reef'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-06',
    slug: 'mauritius-all-ages-family-resort-oasis',
    title: 'Mauritius Family Beachfront & Marine Sanctuary',
    destination: 'Mauritius',
    destinationSlug: 'mauritius',
    region: 'Islands',
    holidayType: 'Family & Group',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Travel through 30 Apr 2027',
    bookingValidity: 'Book by 20 Nov 2026',
    isUrgentValidity: false,
    currency: 'EUR',
    priceValue: 1450,
    priceDisplay: 'EUR 1,450',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Family suites with interconnected layouts, water sports, Casela Nature Parks safari, and coastal leisure in Mauritius.',
    stayDetails: 'Family Friendly Luxury Resort with private beach cove',
    features: [
      '6 nights family interconnecting rooms',
      'Half-board dining with kid-friendly dining menus',
      'Entry tickets to Casela World of Adventures',
      'Glass-bottom boat marine park excursion',
      'Private vehicle airport transfers'
    ],
    exclusions: ['International flights', 'Quad biking fees at Casela', 'Tips and porterage'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax configuration',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Sunlit Mauritius resort palm garden with calm sheltered ocean bay',
    gallerySubjects: [
      'Glass bottom boat floating above coral formations in Blue Bay',
      'Casela nature park safari landscape with roaming wildlife',
      'Sunset beach terrace with evening Creole cultural music'
    ]
  },
  {
    id: 'pkg-07',
    slug: 'seychelles-granite-islands-praslin-mahe',
    title: 'Seychelles Mahe & Praslin Granite Paradise',
    destination: 'Seychelles',
    destinationSlug: 'seychelles',
    region: 'Islands',
    holidayType: 'Luxury Escapes',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – May 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'EUR',
    priceValue: 1780,
    priceDisplay: 'EUR 1,780',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Iconic granite boulders of Anse Source d’Argent, primordial Vallée de Mai palm forest, and secluded beach coves.',
    stayDetails: 'Boutique Eco-Luxury Resort in Mahé & Praslin',
    features: [
      '3 nights Mahé hillside ocean view suite + 2 nights Praslin boutique lodge',
      'Inter-island Cat Cocos ferry or domestic shuttle flight arrangement',
      'Vallée de Mai UNESCO prehistoric palm forest excursion',
      'Daily curated breakfasts',
      'Private vehicle transfers between ports and hotels'
    ],
    exclusions: ['Airfare to Seychelles (SEZ)', 'Lunches & dinners', 'Bicycle rental on La Digue'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Currency Euro preserved without conversion'
    ],
    imageSubject: 'Giant sculpted pink granite boulders resting on powder beach in Seychelles',
    gallerySubjects: [
      'Vallée de Mai lush endemic coco de mer prehistoric palm canopy',
      'Anse Lazio turquoise bay with gentle surf and lush forest',
      'Cliffside infinity pool looking out across the endless Indian Ocean'
    ]
  },
  {
    id: 'pkg-08',
    slug: 'seychelles-la-digue-nature-sanctuary',
    title: 'Seychelles Island-Hopping & Marine Haven',
    destination: 'Seychelles',
    destinationSlug: 'seychelles',
    region: 'Islands',
    holidayType: 'Adventure',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Dec 2026 – May 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 2190,
    priceDisplay: 'USD 2,190',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Authentic Creole island discovery covering Mahé, Praslin and the slow-paced bicycle trails of La Digue.',
    stayDetails: 'Handpicked Creole Villas & Boutique Lodges',
    features: [
      '6 nights island accommodations with daily breakfast',
      'All inter-island ferry passes included',
      'Guided bicycle tour arrangement on La Digue',
      'Saint Anne Marine National Park snorkeling day tour',
      'Private vehicle meet & greet on arrival'
    ],
    exclusions: ['International flights', 'Environmental sustainability levy', 'Personal expenses'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry',
      'USD currency preserved from client sheet row'
    ],
    imageSubject: 'Pristine turquoise lagoon in Seychelles framed by tropical palms and granite rocks',
    gallerySubjects: [
      'Traditional wooden bicycles parked beside sandy La Digue trail',
      'Snorkeling over sea turtles in Saint Anne Marine Park',
      'Sunset over Victoria clocktower and harbour in Mahé'
    ]
  },

  // ==========================================
  // REGION 2: FAR EAST ASIAN (Packages 9 - 18)
  // ==========================================
  {
    id: 'pkg-09',
    slug: 'bali-ubud-cultural-seminyak-luxury-retreat',
    title: 'Bali Ubud Cultural Heart & Seminyak Coastal Bliss',
    destination: 'Bali',
    destinationSlug: 'bali',
    region: 'Far East Asian',
    holidayType: 'Honeymoon',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'INR',
    priceValue: 46800,
    priceDisplay: 'INR 46,800',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Emerald Tegalalang rice terraces, Ubud art villages, Tanah Lot temple sunset, and stylish Seminyak beachfront living.',
    stayDetails: '2 Nights Ubud Private Pool Villa + 3 Nights Seminyak 5-Star Resort',
    features: [
      'Split stay: Ubud private jungle pool villa & Seminyak beach resort',
      'Daily gourmet breakfast & one romantic candlelit villa dinner',
      'Full-day Kintamani Volcano & Tegalalang Rice Terrace tour',
      'Tanah Lot sea temple sunset tour with private guide',
      'Private air-conditioned car & driver for all sightseeing & transfers'
    ],
    exclusions: ['International flight tickets', 'Indonesia Visa on Arrival (IDR 500,000)', 'Bali Tourism Tax levy'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Featured top destination in brief'
    ],
    imageSubject: 'Bali emerald green stepped rice terraces with morning mist in Ubud',
    gallerySubjects: [
      'Private infinity plunge pool looking out over Ubud jungle ravine',
      'Historic Ulun Danu Beratan water temple on mountain lake',
      'Tanah Lot ancient sea temple silhouetted against glowing sunset'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-10',
    slug: 'bali-nusa-penida-island-adventure-family',
    title: 'Bali & Nusa Penida Island Wonders & Cliff Vistas',
    destination: 'Bali',
    destinationSlug: 'bali',
    region: 'Far East Asian',
    holidayType: 'Adventure',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'INR',
    priceValue: 53200,
    priceDisplay: 'INR 53,200',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Thrill-seeking exploration from Kelingking T-Rex cliff on Nusa Penida to Ayung River white water rafting and Uluwatu Kecak fire dance.',
    stayDetails: 'Curated 4-Star Deluxe Resorts in Sanur & Ubud',
    features: [
      '6 nights deluxe accommodations with daily breakfast',
      'Speedboat day excursion to Nusa Penida West (Kelingking, Broken Beach, Angel’s Billabong)',
      'Ayung River white water rafting adventure with Indonesian buffet lunch',
      'Sunset Uluwatu cliff temple & Kecak fire dance performance tickets',
      'All private overland vehicle transfers'
    ],
    exclusions: ['Airfare', 'Personal watersports at Tanjung Benoa', 'Tipping for rafting guides'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax requirement',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Dramatic T-Rex shaped limestone cliff and turquoise sea at Kelingking Nusa Penida',
    gallerySubjects: [
      'Rafting crew navigating lush tropical rainforest canyon on Ayung River',
      'Kecak fire dancers chanting before open ocean sunset in Uluwatu',
      'Traditional Balinese carved stone temple gate opening to sky'
    ]
  },
  {
    id: 'pkg-11',
    slug: 'singapore-urban-splendour-sentosa-escapade',
    title: 'Singapore City Horizon & Sentosa Island Escapade',
    destination: 'Singapore',
    destinationSlug: 'singapore',
    region: 'Far East Asian',
    holidayType: 'Family & Group',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'SGD',
    priceValue: 980,
    priceDisplay: 'SGD 980',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Futuristic Gardens by the Bay, Marina Bay Sands observation deck, Universal Studios Singapore, and culinary hawker trails.',
    stayDetails: 'Centrally Located 4-Star Hotel (Orchard / Marina / Bugis)',
    features: [
      '4 nights central city hotel accommodation with daily buffet breakfast',
      'Gardens by the Bay: Flower Dome & Cloud Forest admission',
      'Sentosa Island 1-day pass including Universal Studios Singapore',
      'Singapore River Bumboat evening cruise',
      'Roundtrip airport transfers by private vehicle'
    ],
    exclusions: ['International airfare', 'Singapore SG Arrival Card assistance', 'Personal meals outside itinerary'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Currency SGD preserved from client sheet row'
    ],
    imageSubject: 'Singapore Gardens by the Bay supertrees glowing brightly against twilight skyline',
    gallerySubjects: [
      'Marina Bay Sands skyline with futuristic architecture mirrored on water',
      'Universal Studios globe entrance plaza on Sentosa Island',
      'Vibrant culinary street food stalls in historic Chinatown Singapore'
    ]
  },
  {
    id: 'pkg-12',
    slug: 'singapore-malaysia-twin-city-explorer',
    title: 'Singapore & Malaysia Twin Metropolis & Heritage Odyssey',
    destination: 'Singapore & Malaysia',
    destinationSlug: 'malaysia',
    region: 'Far East Asian',
    holidayType: 'Family & Group',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 1120,
    priceDisplay: 'USD 1,120',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Cross-border combination of Singapore’s futuristic architecture and Kuala Lumpur’s Petronas Towers, Batu Caves, and Genting Highlands.',
    stayDetails: '3 Nights Singapore 4-Star + 3 Nights Kuala Lumpur 4-Star',
    features: [
      'Combined 6 nights city hotels with daily breakfast',
      'Cross-border luxury express coach between Singapore and Kuala Lumpur',
      'Kuala Lumpur city tour including King’s Palace & Petronas Twin Towers photo stop',
      'Batu Caves limestone temple and Genting Skyway cable car ride',
      'Full meet & greet transfer logistics'
    ],
    exclusions: ['Flights', 'Tourism tax in Malaysia (MYR 10 per room per night)', 'Personal expenses'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax requirement applies',
      'Price shown in client sheet — confirm basis at enquiry',
      'Dual-country logistics require verified border clearance documentation'
    ],
    imageSubject: 'Kuala Lumpur Petronas Twin Towers illuminated against deep night sky',
    gallerySubjects: [
      'Colourful monumental staircase and golden Murugan statue at Batu Caves',
      'Genting Highlands cable car gliding over misty rainforest canopy',
      'Futuristic Singapore skyline overlooking Marina Bay waterfront'
    ]
  },
  {
    id: 'pkg-13',
    slug: 'malaysia-kuala-lumpur-langkawi-island-retreat',
    title: 'Malaysia City Sparkle & Langkawi Island Geopark',
    destination: 'Malaysia',
    destinationSlug: 'malaysia',
    region: 'Far East Asian',
    holidayType: 'Honeymoon',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Travel Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'INR',
    priceValue: 48900,
    priceDisplay: 'INR 48,900',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Kuala Lumpur skyline luxury paired with the duty-free tropical rainforests and white beaches of Langkawi.',
    stayDetails: '2 Nights KL Deluxe Hotel + 3 Nights Langkawi Beach Resort',
    features: [
      '5 nights luxury stays with daily breakfast',
      'Domestic flight assistance KL to Langkawi',
      'Langkawi SkyBridge and cable car experience ticket',
      'Kilim Geoforest mangrove boat safari with eagle feeding watch',
      'All airport transfers by private chauffeur'
    ],
    exclusions: ['International flight tickets', 'Domestic air tickets', 'Tourism tax at hotel reception'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Langkawi curved SkyBridge suspended above dramatic emerald mountain peaks',
    gallerySubjects: [
      'Quiet mangrove river canyon in Kilim Geoforest Langkawi',
      'Beach sunset bar overlooking the calm Andaman Sea',
      'Petronas Towers night view from rooftop infinity pool in KL'
    ]
  },
  {
    id: 'pkg-14',
    slug: 'thailand-bangkok-phuket-classic-duo',
    title: 'Thailand Bangkok Vibrant City & Phuket Island Sun',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    region: 'Far East Asian',
    holidayType: 'Family & Group',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'INR',
    priceValue: 42500,
    priceDisplay: 'INR 42,500',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'The definitive Thailand journey: Bangkok Grand Palace, Chao Phraya dinner cruise, and Phuket’s Andaman beaches and James Bond Island.',
    stayDetails: '2 Nights Bangkok 4-Star + 3 Nights Phuket Beachfront 4-Star',
    features: [
      '5 nights 4-star hotel stays with daily breakfast',
      'Bangkok City & Temple tour: Wat Traimit & Wat Pho',
      'Princess Chao Phraya evening buffet dinner cruise with live entertainment',
      'Full-day James Bond Island speedboat tour by sea canoe with lunch',
      'Private airport transfers in Bangkok and Phuket'
    ],
    exclusions: ['International & domestic airfare', 'National park fees on island excursions', 'Personal shopping'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: 31 Oct 2026 confirmation deadline',
      'Price shown in client sheet — confirm basis at enquiry',
      'National park conservation cash fee (approx THB 400) payable on island tours'
    ],
    imageSubject: 'Phuket longtail boat floating on emerald green water beside limestone karst cliffs',
    gallerySubjects: [
      'Wat Arun Temple of Dawn shining on the banks of Chao Phraya river',
      'Traditional longtail boat resting on white sand beach of Phi Phi islands',
      'Illuminated Bangkok street night market with aromatic culinary stalls'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-15',
    slug: 'thailand-krabi-island-sanctuary-limestone-haven',
    title: 'Thailand Krabi Rainforest Cliffs & 4-Island Sanctuary',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    region: 'Far East Asian',
    holidayType: 'Honeymoon',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'INR',
    priceValue: 39800,
    priceDisplay: 'INR 39,800',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Dramatic limestone karst formations, Railay Beach rock climbing, Phra Nang Cave beach, and tranquil 4-island speedboat cruise.',
    stayDetails: 'Luxury Boutique Resort in Ao Nang / Tubkaek Beach',
    features: [
      '4 nights resort stay with daily breakfast',
      'Krabi 4-Island Speedboat tour (Chicken Island, Tup Island, Poda Island, Phra Nang Cave)',
      'Snorkeling equipment and picnic island lunch',
      'Emerald Pool and hot springs rainforest excursion',
      'Private roundtrip Krabi airport transfers'
    ],
    exclusions: ['Airfare', 'National park fees', 'Personal water sports'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Towering limestone karst cliffs enclosing Railay Beach in Krabi Thailand',
    gallerySubjects: [
      'Emerald pool natural thermal mineral spring hidden in Krabi jungle',
      'Sandbar connecting Tup Island and Chicken Island at low tide',
      'Open-air sunset restaurant overlooking the Andaman Sea'
    ]
  },
  {
    id: 'pkg-16',
    slug: 'thailand-koh-samui-curated-luxury-haven',
    title: 'Thailand Koh Samui Luxury Private Pool Escape',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    region: 'Far East Asian',
    holidayType: 'Luxury Escapes',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Dec 2026 – May 2027',
    bookingValidity: 'Book by 25 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 1650,
    priceDisplay: 'USD 1,650',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Hillside oceanfront pool villa luxury overlooking the Gulf of Thailand, Ang Thong Marine Park charter, and wellness spa sessions.',
    stayDetails: '5-Star Hillside Ocean View Pool Villa Resort',
    features: [
      '5 nights luxury pool villa with panoramic sea views',
      'Daily curated champagne breakfast',
      'Ang Thong National Marine Park semi-private yacht cruise',
      'One 90-minute traditional Thai couples wellness massage',
      'Private luxury vehicle airport transfers'
    ],
    exclusions: ['International & domestic airfare', 'Premium alcoholic beverages outside package', 'Marine park entry fee'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry',
      'Currency USD preserved from client sheet row'
    ],
    imageSubject: 'Luxury infinity pool overlooking tropical bay and coconut groves in Koh Samui',
    gallerySubjects: [
      'Curated private sundeck with sunken lounge overlooking Gulf of Thailand',
      'Ang Thong Marine Park emerald lagoon surrounded by limestone islands',
      'Traditional outdoor open-air herbal wellness pavilion in Samui'
    ]
  },
  {
    id: 'pkg-17',
    slug: 'vietnam-hanoi-halong-bay-danang-highlights',
    title: 'Vietnam Heritage: Hanoi, Ha Long Bay Cruise & Da Nang',
    destination: 'Vietnam',
    destinationSlug: 'vietnam',
    region: 'Far East Asian',
    holidayType: 'Adventure',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 1240,
    priceDisplay: 'USD 1,240',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Hanoi colonial quarters, overnight 5-star cruise through Ha Long Bay’s thousands of limestone islets, and the Golden Hand Bridge of Ba Na Hills.',
    stayDetails: 'Hanoi 4-Star (2N) + 5-Star Ha Long Luxury Cruise (1N) + Da Nang 4-Star Beach Resort (3N)',
    features: [
      '6 nights mixed boutique hotel & overnight luxury junk cruise',
      'All meals aboard the Ha Long Bay cruise',
      'Daily breakfast at city hotels',
      'Ba Na Hills cable car & Golden Hand Bridge admission',
      'Hoi An Ancient Lantern Town walking tour with private guide'
    ],
    exclusions: ['International & domestic flights', 'Vietnam E-visa processing fees', 'Personal beverages'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Ha Long Bay cruise itinerary subject to port authority maritime clearance'
    ],
    imageSubject: 'Traditional wooden cruise junk sailing between dramatic misty karst pillars in Ha Long Bay Vietnam',
    gallerySubjects: [
      'Golden Bridge held aloft by massive stone hands in Ba Na Hills',
      'Hoi An ancient canal decorated with glowing silk lanterns at night',
      'Hanoi French colonial Old Quarter train street with cafes'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-18',
    slug: 'vietnam-saigon-mekong-delta-explorer',
    title: 'Vietnam South Explorer: Saigon & Floating Mekong Delta',
    destination: 'Vietnam',
    destinationSlug: 'vietnam',
    region: 'Far East Asian',
    holidayType: 'Family & Group',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 20 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 790,
    priceDisplay: 'USD 790',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Dynamic Ho Chi Minh City, historic Cu Chi tunnels, and sampan boat journey through the waterways and orchards of the Mekong Delta.',
    stayDetails: '4-Star Central Saigon Hotel',
    features: [
      '4 nights central city hotel accommodation with breakfast',
      'Cu Chi underground tunnels guided historical tour',
      'Full-day Mekong Delta sampan cruise with traditional fruit orchard tasting',
      'Saigon evening street food discovery walking trail',
      'Private air-conditioned vehicle throughout'
    ],
    exclusions: ['International airfare', 'E-visa fees', 'Tipping for local boat rowers'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax requirement applies',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Hand-rowed wooden sampan boat gliding through narrow palm-shaded Mekong Delta canal',
    gallerySubjects: [
      'Notre-Dame Cathedral Basilica of Saigon and post office colonial architecture',
      'Cu Chi historic jungle tunnel entrance demonstration site',
      'Bustling river market with boats loaded with exotic tropical fruits'
    ]
  },

  // ==========================================
  // REGION 3: MIDDLE EAST & MEDITERRANEAN (Packages 19 - 28)
  // ==========================================
  {
    id: 'pkg-19',
    slug: 'dubai-luxury-skyline-desert-dune-safari',
    title: 'Dubai Glamour: Skyline Splendour & Desert Dune Glamping',
    destination: 'Dubai',
    destinationSlug: 'dubai',
    region: 'Middle East & Mediterranean',
    holidayType: 'Luxury Escapes',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'INR',
    priceValue: 64900,
    priceDisplay: 'INR 64,900',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Burj Khalifa observation deck, Dubai Mall fountain show, Marina luxury yacht cruise, and premium Red Dune 4x4 safari with BBQ.',
    stayDetails: '5-Star Downtown Dubai Hotel / Dubai Marina',
    features: [
      '4 nights luxury 5-star hotel accommodation with daily buffet breakfast',
      'Burj Khalifa Level 124/125 At The Top entry ticket',
      'Desert Safari in 4x4 Land Cruiser with dune bashing, camel ride & BBQ banquet',
      'Dubai Marina private shared yacht cruise with refreshments',
      'Private airport transfers via luxury sedan'
    ],
    exclusions: ['International flight tickets', 'Tourism Dirham fee (payable directly at hotel checkout)', 'UAE Visa fees'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: 31 Oct 2026 booking cutoff',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Burj Khalifa soaring above shimmering Dubai skyline and dancing fountain lake',
    gallerySubjects: [
      'Golden red sand dunes with 4x4 expedition convoy at golden hour in Dubai',
      'Luxury yacht cruising through modern skyscrapers of Dubai Marina',
      'Traditional Arabic lantern-lit majlis seating in desert camp'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-20',
    slug: 'dubai-corporate-mice-expo-retreat',
    title: 'Dubai Corporate Delegation & Executive MICE Retreat',
    destination: 'Dubai',
    destinationSlug: 'dubai',
    region: 'Middle East & Mediterranean',
    holidayType: 'MICE & Corporate',
    duration: '3 Nights / 4 Days',
    durationNights: 3,
    durationDays: 4,
    persons: 'Min 30 Pax',
    minPax: 30,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 720,
    priceDisplay: 'USD 720',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'High-impact corporate group itinerary with conference meeting hall amenities, gala dinner venue, and team desert leadership challenge.',
    stayDetails: '5-Star Business & Conference Resort (Sheikh Zayed Road / Business Bay)',
    features: [
      '3 nights 5-star business accommodation',
      'Full-day meeting room hire with AV equipment, 2 coffee breaks & executive lunch',
      'Exclusive private charter desert gala dinner with live entertainment',
      'Dedicated group logistics manager on-ground',
      'Group coach transfers for all movements'
    ],
    exclusions: ['International airfare', 'Conference staging branding fabrications', 'UAE visas'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 30 Pax strictly required for corporate package tariff tier',
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Modern executive conference auditorium and evening gala reception terrace in Dubai',
    gallerySubjects: [
      'High-tech corporate event stage with digital backdrop and round banquet tables',
      'Exclusive desert camp privatized for executive corporate dinner',
      'Dubai Museum of the Future architectural marvel against blue sky'
    ]
  },
  {
    id: 'pkg-21',
    slug: 'istanbul-historic-bosphorus-elegance',
    title: 'Istanbul Old City Treasures & Private Bosphorus Cruise',
    destination: 'Istanbul & Turkey',
    destinationSlug: 'istanbul-turkey',
    region: 'Middle East & Mediterranean',
    holidayType: 'Luxury Escapes',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'EUR',
    priceValue: 980,
    priceDisplay: 'EUR 980',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Crossroads of continents: Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar spices, and a sunset cruise along the Bosphorus Strait.',
    stayDetails: 'Historic Boutique 5-Star Hotel in Sultanahmet / Taksim',
    features: [
      '4 nights boutique heritage accommodation with Turkish breakfast buffet',
      'Private Istanbul Old City walking tour: Hagia Sophia, Blue Mosque, Hippodrome & Grand Bazaar',
      'Topkapi Palace and Imperial Harem entrance ticket arrangement',
      'Private sunset cruise along the Bosphorus dividing Europe and Asia',
      'Private Mercedes Vito airport transfers'
    ],
    exclusions: ['International flights', 'Turkey E-visa', 'Museum pass fees not detailed'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Featured top destination in brief'
    ],
    imageSubject: 'Hagia Sophia domes and minarets illuminated at twilight across Sultanahmet square',
    gallerySubjects: [
      'Bosphorus strait ferry passing ornate Ortaköy mosque beside European bridge',
      'Intricate mosaic ceilings and ceramic tiles inside Topkapi Palace',
      'Grand Bazaar vibrant corridors adorned with brass Turkish lamps'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-22',
    slug: 'turkey-istanbul-cappadocia-fairy-chimneys',
    title: 'Turkey Grand Circuit: Istanbul & Cappadocia Balloon Vista',
    destination: 'Istanbul & Turkey',
    destinationSlug: 'istanbul-turkey',
    region: 'Middle East & Mediterranean',
    holidayType: 'Adventure',
    duration: '6 Nights / 7 Days',
    durationNights: 6,
    durationDays: 7,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – May 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'EUR',
    priceValue: 1540,
    priceDisplay: 'EUR 1,540',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Two worlds in one journey: the imperial grandeur of Istanbul followed by ancient cave suites and hot-air balloons over Cappadocia’s surreal valleys.',
    stayDetails: '3 Nights Istanbul 4-Star + 3 Nights Cappadocia Authentic Cave Hotel',
    features: [
      '6 nights premium stays including authentic cave suite in Göreme',
      'Daily Turkish breakfast & 2 traditional Anatolian dinners',
      'Cappadocia Red Tour: Göreme Open Air Museum, Devrent Valley & Pasabag Fairy Chimneys',
      'Derinkuyu underground city guided subterranean expedition',
      'Hot-air balloon flight reservation support (flight fee confirmed upon booking)'
    ],
    exclusions: ['Airfare (Istanbul to Kayseri/Nevsehir domestic flights)', 'Hot air balloon flight fee (weather dependent)', 'Personal gratuities'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry',
      'Hot air balloon flight is strictly subject to civil aviation daily weather clearance'
    ],
    imageSubject: 'Scores of vibrant hot air balloons floating over Cappadocia fairy chimney valleys at sunrise',
    gallerySubjects: [
      'Authentic carved stone cave hotel suite with panoramic valley terrace',
      'Göreme open-air rock-cut Byzantine monastery frescoes',
      'Historic Galata Tower overlooking Golden Horn waterway in Istanbul'
    ]
  },
  {
    id: 'pkg-23',
    slug: 'bahrain-pearl-coast-heritage-culture',
    title: 'Kingdom of Bahrain Heritage, Pearls & Modern Horizons',
    destination: 'Bahrain',
    destinationSlug: 'bahrain',
    region: 'Middle East & Mediterranean',
    holidayType: 'Luxury Escapes',
    duration: '3 Nights / 4 Days',
    durationNights: 3,
    durationDays: 4,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 860,
    priceDisplay: 'USD 860',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Qal’at al-Bahrain UNESCO fortress, traditional pearl diving heritage trail, Manama Souq spices, and contemporary Arabian luxury.',
    stayDetails: '5-Star Luxury Seaview Hotel in Manama',
    features: [
      '3 nights 5-star hotel accommodation with breakfast',
      'Qal’at al-Bahrain ancient Dilmun civilization fortress tour',
      'Bahrain Pearling Path UNESCO heritage trail walking tour in Muharraq',
      'Al Fateh Grand Mosque cultural visit',
      'Roundtrip airport transfers by private vehicle'
    ],
    exclusions: ['International airfare', 'Bahrain tourist visa fee', 'Personal meals outside package'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Qal’at al-Bahrain ancient stone fortress overlooking modern Manama coastal skyline',
    gallerySubjects: [
      'Intricate marble architecture of Al Fateh Grand Mosque Manama',
      'Restored wind tower courtyard houses along the Muharraq Pearling Path',
      'Traditional spice sacks and brassware in bustling Bab Al Bahrain souq'
    ]
  },
  {
    id: 'pkg-24',
    slug: 'bahrain-corporate-mice-incentive-delegation',
    title: 'Bahrain Executive MICE & Formula 1 Circuit Experience',
    destination: 'Bahrain',
    destinationSlug: 'bahrain',
    region: 'Middle East & Mediterranean',
    holidayType: 'MICE & Corporate',
    duration: '3 Nights / 4 Days',
    durationNights: 3,
    durationDays: 4,
    persons: 'Min 20 Pax',
    minPax: 20,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 780,
    priceDisplay: 'USD 780',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Corporate incentive travel including high-level conference facilities and Bahrain International Circuit motorsport experience.',
    stayDetails: 'Luxury Business Resort with Conference Centre',
    features: [
      '3 nights luxury twin/double accommodation for groups',
      'Dedicated conference facility with audio-visual equipment & business catering',
      'Bahrain International Circuit track tour and karting grand prix challenge',
      'Beachfront closing banquet dinner',
      'Coordinated luxury group coach logistics'
    ],
    exclusions: ['Airfare', 'Corporate staging production fees', 'Visas'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 20 Pax condition applies for group rate',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Bahrain International Circuit grandstand lit under floodlights at dusk',
    gallerySubjects: [
      'Executive conference plenary hall prepared for corporate presentation',
      'Go-kart fleet lined up on racing circuit for team building challenge',
      'Waterfront gala dinner table arrangement under Bahrain palms'
    ]
  },
  {
    id: 'pkg-25',
    slug: 'jordan-amman-petra-dead-sea-expedition',
    title: 'Jordan Kingdom: Petra Rose City, Wadi Rum & Dead Sea',
    destination: 'Jordan',
    destinationSlug: 'jordan',
    region: 'Middle East & Mediterranean',
    holidayType: 'Adventure',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Twin sharing', // Strictly preserved as Twin sharing per brief rules
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 1380,
    priceDisplay: 'USD 1,380',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'The ancient wonder of Petra carved into rose-red cliffs, overnight Bedouin camp beneath Wadi Rum stars, and floating in the buoyant Dead Sea.',
    stayDetails: 'Amman 4-Star (1N) + Petra 4-Star (2N) + Wadi Rum Martian Camp (1N) + Dead Sea Resort (1N)',
    features: [
      '5 nights quality accommodations with daily breakfast & dinner',
      'Full-day guided exploration through the Siq to Petra Treasury and Monastery',
      '2-hour 4x4 Bedouin jeep safari across Wadi Rum desert sands',
      'Mineral-rich Dead Sea mud bath and private beach float',
      'Private air-conditioned vehicle and licensed English-speaking guide'
    ],
    exclusions: ['International flights', 'Jordan entry visa (facilitated via Jordan Pass)', 'Horse carriage rides inside Petra'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Room basis strictly marked: Twin sharing in workbook',
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Petra Al-Khazneh Treasury carved into pink rose sandstone canyon through the Siq in Jordan',
    gallerySubjects: [
      'Bedouin tent camp nestled against red sandstone mountains of Wadi Rum',
      'Swimmer floating effortlessly on tranquil reflective waters of Dead Sea',
      'Roman amphitheatre and Temple of Hercules ruins on Citadel hill in Amman'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-26',
    slug: 'jordan-biblical-heritage-desert-odyssey',
    title: 'Jordan Ancient Wonders: Jerash, Mount Nebo & Petra',
    destination: 'Jordan',
    destinationSlug: 'jordan',
    region: 'Middle East & Mediterranean',
    holidayType: 'Family & Group',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Twin sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 1150,
    priceDisplay: 'USD 1,150',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Comprehensive historical trail covering the Roman ruins of Jerash, Madaba mosaic maps, Mount Nebo panoramic vistas, and Petra.',
    stayDetails: 'Handpicked 4-Star Accommodations',
    features: [
      '4 nights hotel accommodation on half-board basis (Breakfast & Dinner)',
      'Guided tour of Jerash Greco-Roman colonnaded streets and plaza',
      'Visit to Mount Nebo memorial church overlooking the Jordan Valley',
      'Comprehensive Petra archaeological park day entry pass',
      'Private microbus and dedicated tour guide'
    ],
    exclusions: ['International flights', 'Entry visa fees', 'Personal drinks during dinner'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Room basis strictly marked: Twin sharing in workbook',
      'Min 4 Pax requirement applies',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Colonnaded oval forum and soaring columns of ancient Roman Jerash in Jordan',
    gallerySubjects: [
      'Ancient Byzantine floor mosaic map of Holy Land in Madaba',
      'Panoramic view from Mount Nebo looking towards Dead Sea basin',
      'Rose-red carved facades lining the outer street of facades in Petra'
    ]
  },
  {
    id: 'pkg-27',
    slug: 'oman-muscat-wahiba-sands-desert-oasis',
    title: 'Sultanate of Oman: Muscat Grandeur & Wahiba Desert Sands',
    destination: 'Oman',
    destinationSlug: 'oman',
    region: 'Middle East & Mediterranean',
    holidayType: 'Luxury Escapes',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 1290,
    priceDisplay: 'USD 1,290',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Sultan Qaboos Grand Mosque, Mutrah Corniche, crystal turquoise pools of Wadi Bani Khalid, and luxury desert glamping in Wahiba.',
    stayDetails: 'Muscat 5-Star Hotel (3N) + Luxury Desert Tent Camp in Wahiba (1N)',
    features: [
      '4 nights luxury accommodation with daily breakfast & desert camp dinner',
      'Muscat city tour: Sultan Qaboos Grand Mosque & Royal Opera House photo stop',
      'Wadi Shab / Wadi Bani Khalid freshwater oasis swim and nature walk',
      'Wahiba Sands 4x4 dune drive and sunset camel trek',
      'Private 4WD Land Cruiser and certified Omani guide throughout'
    ],
    exclusions: ['International airfare', 'Oman visa costs', 'Personal expenditures'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry',
      'Dress code strictly enforced for Sultan Qaboos Grand Mosque visit'
    ],
    imageSubject: 'Dramatic white domes and minarets of Sultan Qaboos Grand Mosque in Muscat Oman',
    gallerySubjects: [
      'Emerald freshwater pools framed by towering canyon walls in Wadi Bani Khalid',
      'Rolling amber sand dunes stretching toward horizon in Wahiba Sands',
      'Mutrah Corniche seaside promenade with traditional dhow boats anchored in port'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-28',
    slug: 'oman-jebel-akhdar-green-mountain-safari',
    title: 'Oman Jebel Akhdar Green Mountain & Nizwa Fort Heritage',
    destination: 'Oman',
    destinationSlug: 'oman',
    region: 'Middle East & Mediterranean',
    holidayType: 'Adventure',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 20 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 1680,
    priceDisplay: 'USD 1,680',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Cool mountain air of Jebel Akhdar canyon plateau, ancient 17th-century Nizwa Fort, mud-brick villages, and traditional livestock market.',
    stayDetails: 'Luxury Mountain Resort at 2,000m Elevation & Muscat 5-Star',
    features: [
      '5 nights luxury hotel & canyon-edge resort stays',
      'Full-day Nizwa exploration: Fort circular tower & traditional silver souq',
      'Jebel Akhdar terrace village hike through pomegranate and damask rose orchards',
      'Daily breakfast and select dinners',
      'Dedicated 4WD mountain vehicle with mountain-licensed driver'
    ],
    exclusions: ['Airfare', 'Travel insurance', 'Lunches unless mentioned'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry',
      '4WD mandatory for mountain police checkpoint access'
    ],
    imageSubject: 'Spectacular limestone canyon gorges and stepped terrace orchards of Jebel Akhdar Oman',
    gallerySubjects: [
      'Massive circular defence tower and cannons of historic Nizwa Fort',
      'Cliffside luxury infinity pool suspended over deep mountain canyon',
      'Traditional Omani silver dagger handicraft display in Nizwa market'
    ]
  },

  // ==========================================
  // REGION 4: OTHER COUNTRIES (Packages 29 - 33)
  // ==========================================
  {
    id: 'pkg-29',
    slug: 'georgia-tbilisi-kazbegi-caucasus-peaks',
    title: 'Georgia: Tbilisi Old Town Charm & Kazbegi Caucasus Peaks',
    destination: 'Georgia',
    destinationSlug: 'georgia',
    region: 'Other Countries',
    holidayType: 'Adventure',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 840,
    priceDisplay: 'USD 840',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Charming Tbilisi sulfur bath quarters, scenic Georgian Military Highway, and 14th-century Gergeti Trinity Church below Mount Kazbek.',
    stayDetails: 'Tbilisi 4-Star Boutique Hotel (3N) + Kazbegi Mountain Lodge (2N)',
    features: [
      '5 nights boutique hotel stays with daily Georgian breakfast',
      'Tbilisi walking tour: Narikala Fortress, Bridge of Peace & Abanotubani sulfur baths',
      'Excursion along Georgian Military Highway: Ananuri Fortress & Jinvali Reservoir',
      '4x4 vehicle ascent to Gergeti Trinity Church at 2,170m elevation',
      'Private vehicle airport transfers'
    ],
    exclusions: ['International airfare', 'Personal beverages & wine tasting fees unless noted', 'Travel insurance'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Gergeti Trinity Church standing solitary against snowcapped Mount Kazbek in Georgia',
    gallerySubjects: [
      'Colourful carved wooden balconies along cobblestone alleys in Old Tbilisi',
      'Medieval stone towers of Ananuri Fortress reflecting in turquoise Jinvali lake',
      'Freshly baked Georgian khachapuri bread and traditional qvevri clay wine vessel'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-30',
    slug: 'georgia-kakheti-wine-cradle-heritage',
    title: 'Georgia: Kakheti Wine Country & Sighnaghi City of Love',
    destination: 'Georgia',
    destinationSlug: 'georgia',
    region: 'Other Countries',
    holidayType: 'Luxury Escapes',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – May 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 790,
    priceDisplay: 'USD 790',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Explore the 8,000-year UNESCO winemaking tradition in Kakheti valley, hilltop Sighnaghi fortified town, and private estate wine tastings.',
    stayDetails: 'Chateau & Vineyard Boutique Hotels in Kakheti & Tbilisi',
    features: [
      '4 nights boutique vineyard and city accommodation with breakfast',
      'Sighnaghi historic defensive wall walk with views over Alazani Valley',
      'Private estate visit with UNESCO Qvevri wine cellar degustation',
      'Traditional masterclass: baking Shoti bread & making Churchkhela',
      'Private vehicle with English-speaking guide-driver'
    ],
    exclusions: ['Airfare', 'Excess baggage', 'Gratuities for guide and driver'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Sighnaghi fortified hilltop town overlooking mist-covered Alazani valley in Georgia',
    gallerySubjects: [
      'Clay Qvevri vessels buried underground in historic Georgian wine cellar',
      'Pastoral vineyard rows stretching towards the Caucasus mountain range',
      'Narikala fortress cable car crossing above Mtkvari river in Tbilisi'
    ]
  },
  {
    id: 'pkg-31',
    slug: 'azerbaijan-baku-modern-horizons-old-city-heritage',
    title: 'Azerbaijan: Baku Land of Fire & UNESCO Old City',
    destination: 'Azerbaijan',
    destinationSlug: 'azerbaijan',
    region: 'Other Countries',
    holidayType: 'Family & Group',
    duration: '4 Nights / 5 Days',
    durationNights: 4,
    durationDays: 5,
    persons: 'Min 2 Pax',
    minPax: 2,
    roomBasis: 'Double sharing',
    stayPeriod: 'Valid Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 690,
    priceDisplay: 'USD 690',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Futuristic Flame Towers and Heydar Aliyev Centre juxtaposed with 12th-century Icherisheher Maiden Tower and Yanar Dag burning mountain.',
    stayDetails: 'Centrally Located 4-Star Hotel in Baku',
    features: [
      '4 nights central Baku hotel accommodation with breakfast',
      'Icherisheher UNESCO Old Town guided walking tour (Maiden Tower & Shirvanshahs Palace)',
      'Heydar Aliyev Cultural Centre architectural photo stop and admission',
      'Absheron Peninsula excursion: Ateshgah Fire Temple & Yanar Dag natural flame hill',
      'Roundtrip Baku Heydar Aliyev Airport transfers'
    ],
    exclusions: ['International flights', 'Azerbaijan ASAN Visa (USD 26 approx)', 'Personal expenses'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Urgent validity: Book by 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Baku Flame Towers illuminated with glowing light displays above Caspian Sea promenade',
    gallerySubjects: [
      'Curved futuristic white architecture of Heydar Aliyev Centre in Baku',
      'Maiden Tower stone fortress in ancient Icherisheher Old City',
      'Eternal natural gas flame burning continuously at Yanar Dag hillside'
    ],
    isFeatured: true
  },
  {
    id: 'pkg-32',
    slug: 'azerbaijan-gobustan-mud-volcanoes-gabala-mountains',
    title: 'Azerbaijan: Baku, Gobustan Rock Art & Gabala Alpine Retreat',
    destination: 'Azerbaijan',
    destinationSlug: 'azerbaijan',
    region: 'Other Countries',
    holidayType: 'Adventure',
    duration: '5 Nights / 6 Days',
    durationNights: 5,
    durationDays: 6,
    persons: 'Min 4 Pax',
    minPax: 4,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Apr 2027',
    bookingValidity: 'Book by 15 Nov 2026',
    isUrgentValidity: false,
    currency: 'USD',
    priceValue: 880,
    priceDisplay: 'USD 880',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Prehistoric petroglyphs at Gobustan, bubbling mud volcanoes, and alpine serenity with Tufandag cable car in Gabala.',
    stayDetails: 'Baku 4-Star (3N) + Gabala 5-Star Resort (2N)',
    features: [
      '5 nights accommodation with daily breakfast',
      'Gobustan National Park: 40,000-year-old rock engravings & bubbling mud volcano safari',
      'Gabala mountain day tour: Nohur Lake & Tufandag Mountain Resort cable car pass',
      'Shamakhi ancient Juma Mosque visit en route to Caucasus mountains',
      'Private coach and experienced English-speaking tour guide'
    ],
    exclusions: ['Airfare', 'ASAN Visa fees', 'Shooting club activities at Gabala'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 4 Pax configuration',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Prehistoric rock art petroglyphs and bubbling mud volcano landscape in Gobustan Azerbaijan',
    gallerySubjects: [
      'Quiet reflective waters of alpine Nohur Lake surrounded by Gabala forests',
      'Tufandag cable car gliding up green Caucasus mountain ridge',
      'Baku seaside boulevard promenade lined with palm trees along Caspian coast'
    ]
  },
  {
    id: 'pkg-33',
    slug: 'azerbaijan-baku-executive-corporate-summit',
    title: 'Azerbaijan Executive Corporate Summit & Caspian Gala',
    destination: 'Azerbaijan',
    destinationSlug: 'azerbaijan',
    region: 'Other Countries',
    holidayType: 'MICE & Corporate',
    duration: '3 Nights / 4 Days',
    durationNights: 3,
    durationDays: 4,
    persons: 'Min 20 Pax',
    minPax: 20,
    roomBasis: 'Double sharing',
    stayPeriod: 'Nov 2026 – Mar 2027',
    bookingValidity: 'Book by 31 Oct 2026',
    isUrgentValidity: true,
    currency: 'USD',
    priceValue: 620,
    priceDisplay: 'USD 620',
    priceBasisNote: 'Price shown in client sheet — confirm basis at enquiry',
    description: 'Corporate summit packages offering conference meeting rooms with Baku panoramic views, Caspian Sea yacht cocktail, and team gala evening.',
    stayDetails: '5-Star Seaside Conference Hotel in Baku',
    features: [
      '3 nights 5-star seaside hotel with breakfast',
      'Full-day meeting hall setup with digital projector, audio system and 2 tea/coffee breaks',
      'Private evening Caspian Sea chartered yacht cruise with appetizers',
      'Gala dinner with live traditional Mugam musical performance',
      'Comprehensive airport VIP meet & greet and group bus transfers'
    ],
    exclusions: ['Flights', 'Visas', 'Custom exhibition booth production'],
    itineraryStatus: 'Detailed day-wise itinerary available on request',
    dataReviewNotes: [
      'Min 20 Pax requirement applies',
      'Urgent booking validity: 31 Oct 2026',
      'Price shown in client sheet — confirm basis at enquiry'
    ],
    imageSubject: 'Baku Caspian seafront conference hotel with illuminated night fountains and glass facade',
    gallerySubjects: [
      'Executive conference ballroom set up for corporate delegation',
      'Sunset cocktail deck aboard private yacht sailing Caspian Sea',
      'Old Baku fortress walls lit up for private evening reception'
    ]
  }
];
