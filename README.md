# 365Holidayz — Bespoke & Curated Travel Website (V1)

> **Brand Line:** *Your world, expertly curated.*  
> **Positioning:** Bespoke, curated travel specialist combining 30+ years of travel expertise with thoughtfully designed destinations, holiday experiences, and personalised travel planning.

---

## 1. Quick Start & Run Instructions

```bash
# Install dependencies
npm install

# Start Vite development server (Port 3000)
npm run dev

# Run TypeScript compilation check
npm run lint

# Build production bundle
npm run build
```

---

## 2. Project Architecture & Directory Structure

```
├── public/
│   └── assets/                     # Static assets and documentation
├── src/
│   ├── types/
│   │   └── index.ts                # Master TypeScript domain models (Package, Destination, HolidayType, Enquiry)
│   ├── data/
│   │   ├── packages.ts             # Central source of truth: 33 verified client workbook packages
│   │   ├── destinations.ts         # 17 destinations across 4 regions (+ Hong Kong & Macau inspiration)
│   │   ├── holidayTypes.ts         # 5 signature categories (Honeymoon, Family, Adventure, Luxury, Women Solo)
│   │   └── sliderSlides.ts         # Hero slider slides rotating through verified packages
│   ├── components/
│   │   ├── common/
│   │   │   ├── ImagePlaceholder.tsx # Reusable labeled placeholder with dimension/subject badges
│   │   │   ├── PriceDisplay.tsx    # Currency-preserving price display with client basis note
│   │   │   ├── Breadcrumbs.tsx     # Semantic accessible breadcrumbs
│   │   │   ├── FAQAccordion.tsx    # Accessible collapsible FAQ component
│   │   │   ├── CTASection.tsx      # "Plan My Trip" conversion band with supporting CTAs
│   │   │   └── EnquiryForm.tsx     # Full trip consultation form with validation & payload staging
│   │   ├── cards/
│   │   │   ├── PackageCard.tsx     # Card with validity urgency flags and group sizes
│   │   │   ├── DestinationCard.tsx # Card with region and inspiration-only tags
│   │   │   └── HolidayTypeCard.tsx # Signature holiday category card
│   │   ├── home/
│   │   │   └── HeroSlider.tsx      # Full-screen 85vh autoplay slider (keyboard, touch swipe, pause on hover)
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky navigation, transparent-to-solid transition, mobile drawer
│   │   │   └── Footer.tsx          # Factual brand footer with navigation & sister company connection
│   │   └── packages/
│   │       └── PackageFilters.tsx  # Dynamic multi-facet filters (destination, region, type, pax, currency, urgency)
│   ├── pages/
│   │   ├── HomePage.tsx            # Curated homepage
│   │   ├── DestinationsPage.tsx    # Filterable destination directory
│   │   ├── DestinationDetailPage.tsx # Reusable destination template with practical info & related packages
│   │   ├── HolidayTypesPage.tsx    # Signature holiday types index
│   │   ├── HolidayTypeDetailPage.tsx # Holiday type deep-dive with suitable travellers & matching packages
│   │   ├── PackagesPage.tsx        # Central 33-package catalogue with dynamic filters
│   │   ├── PackageDetailPage.tsx   # Detailed package view with gallery placeholders & day-wise itinerary notice
│   │   ├── TravelGuidePage.tsx     # Editorial knowledge base with verified consular notices
│   │   ├── AboutPage.tsx           # Founder Aameena story (30+ yrs), service philosophy & 365Eventz synergy
│   │   └── PlanYourTripPage.tsx    # Full bespoke consultation booking page
│   ├── App.tsx                     # React Router routes, global quick enquiry modal & scroll-to-top
│   ├── main.tsx                    # React DOM entry point
│   └── index.css                   # Tailwind v4 configuration, theme variables & sans-serif typography rules
├── metadata.json
└── vite.config.ts
```

---

## 3. Image Replacement Guide

Per client brief specifications, all images in V1 use the custom **`ImagePlaceholder`** component to clearly communicate the intended visual subject, recommended aspect ratio, and pixel dimensions.

### How to Replace a Placeholder with a Real Image:
1. Save your photograph into `public/assets/images/` (e.g. `public/assets/images/destinations/bali-hero.jpg`).
2. Pass the `src` prop to `ImagePlaceholder`:
   ```tsx
   <ImagePlaceholder
     src="/assets/images/destinations/bali-hero.jpg"
     subject="Bali emerald green stepped rice terraces with morning mist in Ubud"
     aspectRatio="hero"
     recommendedDimensions="1920 × 1000 px"
   />
   ```
3. Recommended Dimension Standards:
   - **Hero Slider:** `1920 × 1000 px` (Aspect 16:9 Landscape)
   - **Destination & Package Cards:** `1200 × 900 px` (Aspect 4:3 Landscape)
   - **Package Detail Gallery Slots:** `1200 × 800 px` (Aspect 3:2 Landscape)
   - **Holiday Type Cards:** `1200 × 900 px` (Aspect 4:3)
   - **About / Team Portraits:** `800 × 1000 px` (Aspect 4:5 Editorial Portrait)

---

## 4. Package Editing & Maintenance Guide

All **33 package records** reside in `src/data/packages.ts`. Each record strictly complies with the client workbook source of truth:

- **Original Currencies Preserved:** `INR`, `USD`, `EUR`, `SGD` (no synthetic currency conversion).
- **Minimum Group Sizes:** Prominently flagged when `minPax >= 4`, `minPax >= 20`, or `minPax >= 30` (e.g. corporate MICE retreats).
- **Booking Validity Urgency:** Packages with booking validity ending `31 Oct 2026` are automatically tagged with `isUrgentValidity: true` and display an urgent expert confirmation flag.
- **Price Basis Disclaimer:** Every package includes `priceBasisNote: "Price shown in client sheet — confirm basis at enquiry"`.
- **Jordan Room Basis:** Preserved as `Twin sharing` (other destinations default to `Double sharing`).
- **Review Notes:** Any ambiguous commercial facts are preserved inside the `dataReviewNotes` array on the package record.

---

## 5. Contact Data & Domain Configurations

Per the project instructions, no fabricated phone numbers, addresses, or awards were created. Official contact points are centralized in:
- `src/components/layout/Header.tsx` (WhatsApp trigger)
- `src/components/layout/Footer.tsx` (Official inquiry locations)
- `src/components/common/EnquiryForm.tsx` (Email mailto / WhatsApp draft triggers)

When deploying with corporate SIMs and emails, replace the placeholder links with your verified enterprise endpoints.

---

## 6. Enquiry Backend Integration Point

The consultation form in `src/components/common/EnquiryForm.tsx` validates:
- Full Name
- Valid Email Address
- Phone / WhatsApp Number (minimum 8 digits)
- Departure City
- Destination Choice
- Approximate Travel Period
- Adult & Child Traveller Counts
- Consent Confirmation

### Connecting to an Express / CRM Backend:
In `src/components/common/EnquiryForm.tsx`, replace the simulated client-side submission with your live endpoint:
```typescript
const response = await fetch('/api/enquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```
You can mount the corresponding API route in an Express `server.ts` or connect directly to a CRM webhook (e.g., HubSpot, Zoho, or Google Workspace Sheets API).
