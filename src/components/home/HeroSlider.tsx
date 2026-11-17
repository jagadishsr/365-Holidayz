import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderSlide } from '../../types';
import { GENERATED_ASSETS, HOLIDAY_TYPE_STOCK_IMAGES, DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

const SLIDE_DURATION_MS = 6000;

const HERO_SLIDES: SliderSlide[] = [
  {
    id: 'slide-honeymoon',
    holidayCategory: 'Honeymoon',
    heading: 'HONEYMOON',
    subtitle: 'Private alpine rail journeys and secluded island retreats crafted for two.',
    ctaLabel: 'Explore Honeymoon',
    ctaLink: '/destinations?category=Honeymoon',
    videoUrl: 'https://assets.mixkit.co/videos/4664/4664-720.mp4',
    posterUrl: GENERATED_ASSETS.swissHoneymoon,
    mobileFallbackUrl: GENERATED_ASSETS.swissHoneymoon,
    visualStoryNote: 'Romantic couple at sunset and alpine journeys crafted for two.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-family',
    holidayCategory: 'Family & Group',
    heading: 'FAMILY & GROUP',
    subtitle: 'Effortless international journeys paced naturally for every generation.',
    ctaLabel: 'Explore Family Holidays',
    ctaLink: '/destinations?category=Family+%26+Group',
    videoUrl: 'https://assets.mixkit.co/videos/33729/33729-720.mp4',
    posterUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'],
    mobileFallbackUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'],
    visualStoryNote: 'Family walking together exploring international destinations.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-adventure',
    holidayCategory: 'Adventure',
    heading: 'ADVENTURE',
    subtitle: 'Wadi Rum desert canyons, alpine cable cars in Gabala, and island water sports.',
    ctaLabel: 'Explore Adventure',
    ctaLink: '/destinations?category=Adventure',
    videoUrl: 'https://assets.mixkit.co/videos/51791/51791-720.mp4',
    posterUrl: DESTINATION_STOCK_IMAGES['georgia'] || GENERATED_ASSETS.kazakhstanAdventure,
    mobileFallbackUrl: DESTINATION_STOCK_IMAGES['georgia'] || GENERATED_ASSETS.kazakhstanAdventure,
    visualStoryNote: 'Aerial flight across towering alpine forests and mountain peaks.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-luxury',
    holidayCategory: 'Luxury Escapes',
    heading: 'LUXURY ESCAPES',
    subtitle: 'Private Maldives overwater infinity villas above undisturbed turquoise reefs.',
    ctaLabel: 'Explore Luxury Escapes',
    ctaLink: '/destinations?category=Luxury+Escapes',
    videoUrl: 'https://assets.mixkit.co/videos/2888/2888-720.mp4',
    posterUrl: GENERATED_ASSETS.maldivesLuxury,
    mobileFallbackUrl: GENERATED_ASSETS.maldivesLuxury,
    visualStoryNote: 'Aerial turquoise waters surrounding a tropical paradise island resort.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-women-solo',
    holidayCategory: 'Women Solo',
    heading: 'WOMEN SOLO',
    subtitle: 'Empowered, vetted small-group exploration from Malaysia to cosmopolitan capitals.',
    ctaLabel: 'Explore Women Solo',
    ctaLink: '/destinations?category=Women+Solo',
    videoUrl: 'https://assets.mixkit.co/videos/3428/3428-720.mp4',
    posterUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'] || DESTINATION_STOCK_IMAGES['malaysia'],
    mobileFallbackUrl: HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'] || DESTINATION_STOCK_IMAGES['malaysia'],
    visualStoryNote: 'Vibrant twilight avenues and cultural city walks.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-wellness',
    holidayCategory: 'Wellness & Retreats',
    heading: 'WELLNESS & RETREATS',
    subtitle: 'Serene open-air pavilions tucked inside Bali’s quiet emerald jungle valleys.',
    ctaLabel: 'Explore Wellness Retreats',
    ctaLink: '/destinations?category=Wellness+%26+Retreats',
    videoUrl: 'https://assets.mixkit.co/videos/49334/49334-720.mp4',
    posterUrl: GENERATED_ASSETS.baliWellness,
    mobileFallbackUrl: GENERATED_ASSETS.baliWellness,
    visualStoryNote: 'Emerald jungle river flowing peacefully beneath tropical canopies.',
    isTemporaryMedia: false
  },
  {
    id: 'slide-culture',
    holidayCategory: 'Culture & Heritage',
    heading: 'CULTURE & HERITAGE',
    subtitle: 'Walk sunlit Istanbul mosques, rose-red Petra canyons, and Ceylon tea trails.',
    ctaLabel: 'Explore Culture & Heritage',
    ctaLink: '/destinations?category=Culture+%26+Heritage',
    videoUrl: 'https://assets.mixkit.co/videos/11129/11129-720.mp4',
    posterUrl: DESTINATION_STOCK_IMAGES['istanbul-turkey'] || GENERATED_ASSETS.uzbekistanCulture,
    mobileFallbackUrl: DESTINATION_STOCK_IMAGES['istanbul-turkey'] || GENERATED_ASSETS.uzbekistanCulture,
    visualStoryNote: 'Historic domes and coastal heritage skyline over Istanbul.',
    isTemporaryMedia: false
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(goNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [currentIndex, goNext]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
      aria-label="Signature Holiday Experiences"
    >
      {HERO_SLIDES.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        const canPlayVideo = Boolean(slide.videoUrl) && !failedVideos[slide.id];
        const dramaticClass = idx % 2 === 0 ? 'animate-hero-zoom-in' : 'animate-hero-zoom-out';

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {canPlayVideo ? (
              <div className={`w-full h-full ${isCurrent ? 'animate-hero-video' : ''}`}>
                <video
                  key={`${slide.id}-${isCurrent ? 'active' : 'idle'}`}
                  src={slide.videoUrl}
                  poster={slide.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={isCurrent ? 'auto' : 'metadata'}
                  onError={() =>
                    setFailedVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <img
                key={`${slide.id}-img-${isCurrent ? 'active' : 'idle'}`}
                src={slide.posterUrl}
                alt={slide.visualStoryNote || slide.heading}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${isCurrent ? dramaticClass : ''}`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/45" />
          </div>
        );
      })}

      {/* Clean Unobstructed Content: Title, Subtitle & CTA Button Only */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
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

          {/* Unconventional Architectural Diamond Next / Previous Controls (No Titles) */}
          <div className="flex items-center gap-5 self-start md:self-end pb-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <span className="absolute inset-1.5 rotate-45 border border-white/45 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:rotate-[135deg] group-hover:bg-[#D94E28] group-hover:border-[#D94E28] group-hover:scale-110 shadow-xl" />
              <span className="relative z-10 text-white transition-transform duration-300 group-hover:-translate-x-0.5">
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </span>
            </button>

            <div className="flex items-center gap-1.5" aria-hidden="true">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 h-2 bg-[#D94E28] -skew-x-12'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/80 rotate-45'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <span className="absolute inset-1.5 rotate-45 border border-white/60 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:rotate-[135deg] group-hover:bg-[#D94E28] group-hover:border-[#D94E28] group-hover:scale-110 shadow-xl" />
              <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
