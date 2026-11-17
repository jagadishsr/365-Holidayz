import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderSlide } from '../../types';
import { GENERATED_ASSETS, HOLIDAY_TYPE_STOCK_IMAGES, DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

const SLIDE_DURATION_MS = 6000;

function parseYouTubeEmbed(url?: string): { id: string; embedUrl: string } | null {
  if (!url) return null;
  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (!match || !match[1]) return null;

  const id = match[1];
  const startMatch = trimmed.match(/[?&#](?:t|start)=(\d+)/i);
  const startParam = startMatch ? `&start=${startMatch[1]}` : '';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${id}&playsinline=1${startParam}`;

  return { id, embedUrl };
}

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

interface HeroSliderProps {
  heroVideos?: string[];
}

function getRandomInitialSlideIndex(totalSlides: number): number {
  if (totalSlides <= 1) return 0;
  try {
    const lastIdxRaw = window.sessionStorage.getItem('365holidayz_hero_last_start');
    const lastIdx = lastIdxRaw !== null ? Number(lastIdxRaw) : -1;
    let picked = Math.floor(Math.random() * totalSlides);
    if (picked === lastIdx) {
      picked = (picked + 1 + Math.floor(Math.random() * (totalSlides - 1))) % totalSlides;
    }
    window.sessionStorage.setItem('365holidayz_hero_last_start', String(picked));
    return picked;
  } catch {
    return Math.floor(Math.random() * totalSlides);
  }
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ heroVideos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getRandomInitialSlideIndex(HERO_SLIDES.length)
  );
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [readyVideos, setReadyVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setFailedVideos({});
    setReadyVideos({});
  }, [heroVideos]);

  const slides = useMemo(
    () =>
      HERO_SLIDES.map((slide, idx) => {
        const sheetVideo = heroVideos[idx]?.trim();
        return sheetVideo ? { ...slide, videoUrl: sheetVideo } : slide;
      }),
    [heroVideos]
  );

  const transitionTo = useCallback((computeNext: (curr: number) => number) => {
    setCurrentIndex((curr) => {
      const next = computeNext(curr);
      if (next !== curr) {
        setPrevIndex(curr);
      }
      return next;
    });
    setTransitionKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (prevIndex === null) return;
    const clearExit = window.setTimeout(() => setPrevIndex(null), 900);
    return () => window.clearTimeout(clearExit);
  }, [prevIndex, transitionKey]);

  const goNext = useCallback(() => {
    transitionTo((curr) => (curr + 1) % slides.length);
  }, [slides.length, transitionTo]);

  const goPrev = useCallback(() => {
    transitionTo((curr) => (curr - 1 + slides.length) % slides.length);
  }, [slides.length, transitionTo]);

  const jumpToSlide = useCallback(
    (idx: number) => {
      transitionTo(() => idx);
    },
    [transitionTo]
  );

  useEffect(() => {
    const timer = window.setInterval(goNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [currentIndex, goNext]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
      aria-label="Signature Holiday Experiences"
    >
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        const isExiting = idx === prevIndex && !isCurrent;
        const shouldMountVideo = isCurrent || isExiting;
        const yt = parseYouTubeEmbed(slide.videoUrl);
        const canPlayMp4 = Boolean(slide.videoUrl) && !yt && !failedVideos[slide.id];
        const dramaticClass = idx % 2 === 0 ? 'animate-hero-zoom-in' : 'animate-hero-zoom-out';
        const isVideoReady = Boolean(readyVideos[slide.id]);

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 ${
              isCurrent
                ? 'z-20 animate-hero-bounce-enter'
                : isExiting
                  ? 'z-10 animate-hero-bounce-exit pointer-events-none'
                  : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Always render animated poster backdrop underneath so there is zero flicker while MP4/YouTube buffers */}
            <img
              key={`${slide.id}-poster-${isCurrent ? transitionKey : 'idle'}`}
              src={slide.posterUrl}
              alt={slide.visualStoryNote || slide.heading}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover ${isCurrent ? dramaticClass : ''}`}
            />

            {/* YouTube Full-Bleed Muted Background Loop (mounted on active + exiting slide for smooth crossfade) */}
            {yt && shouldMountVideo && (
              <div
                key={`${slide.id}-yt-wrap`}
                className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${
                  isCurrent ? 'animate-hero-video' : ''
                } ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <iframe
                  key={`${slide.id}-yt-${yt.id}`}
                  src={yt.embedUrl}
                  title={slide.heading || 'Holiday preview video'}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() =>
                    setReadyVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full scale-[1.18] border-0 pointer-events-none"
                />
              </div>
            )}

            {/* Direct MP4 Video Layer (Mixkit defaults, Pexels download/video links, Drive/CDN MP4s) */}
            {canPlayMp4 && (
              <div
                key={`${slide.id}-mp4-wrap`}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  isCurrent ? 'animate-hero-video' : ''
                } ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <video
                  key={`${slide.id}-${slide.videoUrl}`}
                  src={slide.videoUrl}
                  poster={slide.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() =>
                    setReadyVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  onPlaying={() =>
                    setReadyVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  onError={() =>
                    setFailedVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/45 pointer-events-none" />
          </div>
        );
      })}

      {/* Clean Unobstructed Content with Spring-Bounce Entrance */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div key={`${activeSlide.id}-${transitionKey}`} className="max-w-3xl space-y-5 animate-hero-text-bounce">
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
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => jumpToSlide(idx)}
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
