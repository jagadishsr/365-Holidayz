# 365Holidayz — Google AI Studio React Website Build Brief

## Master instruction
You are a senior product designer and React/TypeScript frontend engineer. Build the complete 365Holidayz V1 website described below. Do not return only a plan, wireframe, screenshot or isolated component. Implement the working multi-page website.

## Brand and positioning
- Brand: 365Holidayz
- Positioning: bespoke, curated travel specialist combining 30+ years of travel expertise with thoughtfully designed destinations, holiday experiences and personalised travel planning.
- Brand line: **Your world, expertly curated.**
- Website philosophy: Fewer pages. Clearer navigation. Stronger storytelling.
- User journey: Inspire → Choose Holiday Type → Explore Destination → View Package / Experiences → Enquire / Customise.
- Primary conversion: **Plan Your Trip**. Keep Talk to an Expert and WhatsApp as supporting CTAs.

## Approved navigation
Home | Destinations | Holiday Types | Packages | Travel Guide | About
“Plan Your Trip” is a persistent primary CTA, not a top-level page.

## Design direction
Premium, spacious, visual, clear and human. Modern editorial travel design, clean and confident, not cluttered.
- Typography: Inter / Arial / system sans-serif only. **Absolutely no serif fonts.**
- Strong bold headings, generous whitespace, clean grids, restrained shadows and subtle borders.
- Palette: deep navy, warm white/off-white, restrained sand/champagne accent and one clear CTA accent.
- Responsive desktop/tablet/mobile.
- Do not fetch, generate, embed or hotlink images. Use labelled `ImagePlaceholder` components everywhere. Each placeholder should identify intended subject and recommended dimensions, and be easy to replace with a local image.

## Homepage structure
1. Header: logo placeholder, approved nav, Plan Your Trip CTA, WhatsApp placeholder. Transparent over hero; solid on scroll; sticky; accessible mobile menu.
2. Full-screen hero slider: full width, approximately 82–90vh desktop (min 620px), 5–7 sec autoplay, pause on hover/focus, arrows, dots/progress, swipe and keyboard support, smooth transitions. Each slide has a destination/package image placeholder, readability overlay, eyebrow, large bold sans-serif title, concise factual text and CTA. Rotate through destinations/packages from the supplied spreadsheet (Maldives, Bali, Sri Lanka, Singapore, Malaysia, Thailand, Vietnam, Dubai, Istanbul/Turkey, Bahrain, Jordan, Oman, Mauritius, Seychelles, Georgia, Azerbaijan). No invented prices or availability.
3. Signature Holiday Types: Honeymoon — Infinite Horizons; Family & Group — All-Ages Elegance; Adventure — Wild & Refined; Luxury Escapes — Curated Luxury; Women Solo — The Luminous Solo.
4. Featured Destinations: prioritise Bali, Thailand, Istanbul/Turkey and Hong Kong & Macau. Hong Kong & Macau has no package in the current spreadsheet; treat as inspiration-only, not an active package destination.
5. Featured Packages: use verified package records. Show title, destination, duration, factual summary, price/currency, booking validity and View Package. Do not represent expired offers as currently bookable.
6. Why 365Holidayz: 30+ years expertise, personal planning, curated experiences, expert support. No fabricated awards/claims.
7. Traveller stories: component may exist but testimonials must be clearly marked pending; do not invent names, quotes, ratings or photos.
8. Plan My Trip CTA band.
9. Footer: brand, nav, destinations, holiday types, contact/social placeholders, privacy/terms links. Never invent contact details.

## Required pages and templates
- **Destinations:** visual listing and reusable detail template: hero, why visit, experiences, best time (only verified or labelled editorial guidance), practical info, travel styles, related packages, FAQs, CTA.
- **Holiday Types:** five categories above; suitable traveller, experiences, relevant destinations, matching packages and CTA. No unsupported safety guarantees.
- **Packages:** central-data-driven catalogue; combined filters for destination, region, holiday type (only when mapped), duration, INR budget, travel period/booking validity; search; sorting featured/price/duration; clear filters and empty state.
- **Package detail:** package identity, destination, duration, source description, stay/hotel details, itinerary only if supplied (otherwise “Detailed day-wise itinerary available on request”), features/inclusions, exclusions only if supplied, dates/booking validity, price and basis, conditions/FAQs, gallery placeholders, enquiry CTA.
- **Travel Guide:** Destination Guides, Travel Tips, Itineraries, Visa & Essentials, Travel Costs, Things to Do, inspiration/comparisons. Use “Content coming soon” rather than inventing visa/current travel facts.
- **About:** founder Aameena story and 30+ years experience; team, service philosophy, 365Eventz connection, contact/enquiry. Use photo placeholders. Only use verified bios.
- **Plan Your Trip:** form fields: name, email, phone/WhatsApp, departure city, destination, approximate dates, travellers/adults/children, budget, holiday type, notes, consent. Validate fields. No backend supplied: show an integration placeholder and do not pretend submission succeeds. Add WhatsApp/mailto only after real contact details are entered.

## Package data rules
Use the attached client workbook as the source of truth. It contains **33 package records** across Islands, Far East Asian, Middle East & Mediterranean, and Other Countries. Store all records in one typed central data file; all cards, filters, details and slider metadata must use it. Preserve package name/title, destination, region, description, features, stay period, booking validity, persons, room basis, USD price and INR price. Preserve SGD and Euro labels; do not convert currencies.
- Do not invent prices, discounts, live availability, hotel ratings, flight schedules, visa rules, itineraries, testimonials, contacts or guarantees.
- Preserve ambiguous source facts and add `dataReviewNotes`; do not silently “correct” commercial meaning.
- Show missing info as “Please enquire” / “Details to be confirmed”.
- Minimum group sizes (4 pax, 20 pax, 30 pax) must be prominent.
- Booking validity “by 31 Oct 2026” is urgent as the current date is 30 Oct 2026. Flag it and require expert confirmation; do not imply inventory is guaranteed.
- Price basis is not explicitly confirmed. Until client confirms, label “Price shown in client sheet — confirm basis at enquiry”.
- Jordan is marked twin sharing; other room basis is generally double sharing. Preserve each row exactly.
- MICE/corporate packages are included within broader services/content, not a new top-level navigation item.

## Technical requirements
React + TypeScript; React Router or equivalent; Tailwind or consistent CSS modules. Reusable components: Header, MobileNav, HeroSlider, ImagePlaceholder, DestinationCard, HolidayTypeCard, PackageCard, PackageFilters, PriceDisplay, EnquiryForm, CTASection, Footer, FAQAccordion, Breadcrumbs. Central data modules for packages, destinations, holidayTypes, navigation and sliderSlides with stable IDs/slugs.
Filters must combine correctly; detail routes must work. Semantic HTML, accessibility, keyboard focus, reduced-motion support, good contrast, form validation, lazy loading, no layout shifts, SEO metadata, clean URLs. Add README with run instructions, project structure, image replacement guide, package editing guide, contact data locations and enquiry backend integration point.

## Image placeholder guidance
- Hero: 6–8 wide slots, 1920×1000 recommended. Subjects: Maldives villa/beach, Bali temple/terraces, Sri Lanka coast/tea hills, Singapore skyline, Thailand island, Istanbul/Bosphorus, Dubai skyline/desert, Vietnam Ha Long Bay.
- Destination/package cards: 1200×900 landscape.
- Holiday-type cards: landscape 4:3 or portrait 3:4 as layout needs.
- Package detail gallery: 3–5 placeholders per package.
- About/team: 4:5 portrait placeholders.
Make every placeholder visibly labelled and straightforward to replace with local image files.

## Final quality check
Ensure all 33 packages are present; prices/currencies/dates/group sizes/room basis match the workbook; all routes and links work; slider and filters work; mobile menu works; form validates; no invented claims; no serif fonts; every image slot is a labelled placeholder. The result must look like a complete client-presentable V1, not a wireframe.
