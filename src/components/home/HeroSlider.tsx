import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SliderSlide } from '../../types';
import { GENERATED_ASSETS, HOLIDAY_TYPE_STOCK_IMAGES, DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

const HERO_SLIDES: SliderSlide[] = [
  {
    id: 'slide-honeymoon',
    holidayCategory: 'Honeymoon',
    heading: 'HONEYMOON',
    subtitle: 'Private alpine rail journeys and secluded island retreats crafted for two.',
    ctaLabel: 'Explore Honeymoon',
    ctaLink: '/destinations?category=Honeymoon',
    videoUrl: undefined,
    posterUrl: GENERATED_ASSETS.swissHoneymoon,
    mobileFallbackUrl: GENERATED_ASSETS.swissHoneymoon,
    visualStoryNote: 'Young travelling couple at a snow-covered Swiss train station with luggage.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-family',
    holidayCategory: 'Family & Group',
    heading: 'FAMILY & GROUP',
    subtitle: 'Effortless international journeys paced naturally for every generation.',
    ctaLabel: 'Explore Family Holidays',
    ctaLink: '/destinations?category=Family+%26+Group',
    videoUrl: undefined,
    posterUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'],
    mobileFallbackUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'],
    visualStoryNote: 'Family exploring an international waterfront boardwalk together.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-adventure',
    holidayCategory: 'Adventure',
    heading: 'ADVENTURE',
    subtitle: 'Wadi Rum desert canyons, alpine cable cars in Gabala, and island water sports.',
    ctaLabel: 'Explore Adventure',
    ctaLink: '/destinations?category=Adventure',
    videoUrl: undefined,
    posterUrl: DESTINATION_STOCK_IMAGES['georgia'] || GENERATED_ASSETS.kazakhstanAdventure,
    mobileFallbackUrl: DESTINATION_STOCK_IMAGES['georgia'] || GENERATED_ASSETS.kazakhstanAdventure,
    visualStoryNote: 'Mountain adventure scenery across Caucasus canyons.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-luxury',
    holidayCategory: 'Luxury Escapes',
    heading: 'LUXURY ESCAPES',
    subtitle: 'Private Maldives overwater infinity villas above undisturbed turquoise reefs.',
    ctaLabel: 'Explore Luxury Escapes',
    ctaLink: '/destinations?category=Luxury+Escapes',
    videoUrl: undefined,
    posterUrl: GENERATED_ASSETS.maldivesLuxury,
    mobileFallbackUrl: GENERATED_ASSETS.maldivesLuxury,
    visualStoryNote: 'Exclusive Maldives villa with turquoise ocean and infinity pool aerial view.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-women-solo',
    holidayCategory: 'Women Solo',
    heading: 'WOMEN SOLO',
    subtitle: 'Empowered, vetted small-group exploration from Malaysia to cosmopolitan capitals.',
    ctaLabel: 'Explore Women Solo',
    ctaLink: '/destinations?category=Women+Solo',
    videoUrl: undefined,
    posterUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'] || DESTINATION_STOCK_IMAGES['malaysia'],
    mobileFallbackUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'] || DESTINATION_STOCK_IMAGES['malaysia'],
    visualStoryNote: 'Independent solo traveller exploring cultural vistas safely.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-wellness',
    holidayCategory: 'Wellness & Retreats',
    heading: 'WELLNESS & RETREATS',
    subtitle: 'Serene open-air pavilions tucked inside Bali’s quiet emerald jungle valleys.',
    ctaLabel: 'Explore Wellness Retreats',
    ctaLink: '/destinations?category=Wellness+%26+Retreats',
    videoUrl: undefined,
    posterUrl: GENERATED_ASSETS.baliWellness,
    mobileFallbackUrl: GENERATED_ASSETS.baliWellness,
    visualStoryNote: 'Peaceful tropical wellness retreat pavilion surrounded by lush greenery in Bali.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-culture',
    holidayCategory: 'Culture & Heritage',
    heading: 'CULTURE & HERITAGE',
    subtitle: 'Walk sunlit Istanbul mosques, rose-red Petra canyons, and Ceylon tea trails.',
    ctaLabel: 'Explore Culture & Heritage',
    ctaLink: '/destinations?category=Culture+%26+Heritage',
    videoUrl: undefined,
    posterUrl: DESTINATION_STOCK_IMAGES['istanbul-turkey'] || GENERATED_ASSETS.uzbekistanCulture,
    mobileFallbackUrl: DESTINATION_STOCK_IMAGES['istanbul-turkey'] || GENERATED_ASSETS.uzbekistanCulture,
    visualStoryNote: 'Historic domes and coastal heritage streets.',
    isTemporaryMedia: true
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
      aria-label="Signature Holiday Experiences"
    >
      {HERO_SLIDES.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.videoUrl ? (
              <>
                <video
                  key={slide.id}
                  src={slide.videoUrl}
                  poster={slide.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hidden md:block w-full h-full object-cover"
                />
                <img
                  src={slide.mobileFallbackUrl}
                  alt={slide.visualStoryNote || slide.heading}
                  referrerPolicy="no-referrer"
                  className="md:hidden w-full h-full object-cover"
                />
              </>
            ) : (
              <img
                src={slide.posterUrl}
                alt={slide.visualStoryNote || slide.heading}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${isCurrent ? 'animate-ken-burns' : ''}`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
          </div>
        );
      })}

      {/* Clean Unobstructed Content: Title, Subtitle & CTA Button Only */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-3xl space-y-5">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98] text-balance">
            {activeSlide.heading}
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-normal leading-relaxed max-w-2xl">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2">
            <Link
              to={activeSlide.ctaLink || '/destinations'}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-[#D94E28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-lg"
            >
              <span>{activeSlide.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
