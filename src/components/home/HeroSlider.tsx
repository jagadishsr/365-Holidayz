import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderSlide } from '../../types';
import { GENERATED_ASSETS, HOLIDAY_TYPE_STOCK_IMAGES, DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

/**
 * 7 Approved Hero Categories with Video-Ready Architecture
 * When short looping 4-6s MP4 clips (no watermarks, web-optimized) are hosted,
 * populate `videoUrl` on each slide; desktop browsers play muted autoPlay loops
 * while mobile / missing-video environments display the high-res Ken Burns still.
 */
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
    visualStoryNote: 'Family exploring an international coastline naturally at leisure.',
    isTemporaryMedia: true
  },
  {
    id: 'slide-adventure',
    holidayCategory: 'Adventure',
    heading: 'ADVENTURE',
    subtitle: 'Cross-border mountain treks through Kazakhstan’s dramatic glacier valleys.',
    ctaLabel: 'Explore Adventure',
    ctaLink: '/destinations?category=Adventure',
    videoUrl: undefined,
    posterUrl: GENERATED_ASSETS.kazakhstanAdventure,
    mobileFallbackUrl: GENERATED_ASSETS.kazakhstanAdventure,
    visualStoryNote: 'Travellers trekking through mountain landscapes in Kazakhstan.',
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
    visualStoryNote: 'Independent solo traveller exploring vibrant cultural streets with a trusted local guide.',
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
    subtitle: 'Walk sunlit turquoise mosaic courtyards along Uzbekistan’s storied Silk Road.',
    ctaLabel: 'Explore Culture & Heritage',
    ctaLink: '/destinations?category=Culture+%26+Heritage',
    videoUrl: undefined,
    posterUrl: GENERATED_ASSETS.uzbekistanCulture,
    mobileFallbackUrl: GENERATED_ASSETS.uzbekistanCulture,
    visualStoryNote: 'Travellers exploring the Registan turquoise architecture of Samarkand in Uzbekistan.',
    isTemporaryMedia: true
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Signature Holiday Experiences"
    >
      {/* Background Video / High-Res Motion Layers */}
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
                  alt={slide.visualStoryNote}
                  referrerPolicy="no-referrer"
                  className="md:hidden w-full h-full object-cover"
                />
              </>
            ) : (
              <img
                src={slide.posterUrl}
                alt={slide.visualStoryNote}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${isCurrent ? 'animate-ken-burns' : ''}`}
              />
            )}

            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45" />
          </div>
        );
      })}

      {/* Main Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="max-w-3xl space-y-5">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-white/85">
            {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')} &nbsp;—&nbsp; Signature Experiences
          </p>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98] text-balance">
            {activeSlide.heading}
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-normal leading-relaxed max-w-2xl">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2">
            <Link
              to={activeSlide.ctaLink}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-[#D94E28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-lg"
            >
              <span>{activeSlide.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Category Strip & Navigation Controls */}
        <div className="mt-10 pt-5 border-t border-white/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap pb-1 border-b-2 transition-all cursor-pointer ${
                    isCurrent
                      ? 'text-white border-[#D94E28]'
                      : 'text-white/60 border-transparent hover:text-white/90'
                  }`}
                >
                  {slide.holidayCategory}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous experience slide"
              className="p-2.5 rounded-full border border-white/25 text-white hover:bg-white hover:text-[#111827] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next experience slide"
              className="p-2.5 rounded-full border border-white/25 text-white hover:bg-white hover:text-[#111827] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
