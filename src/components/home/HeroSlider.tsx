import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSheetSlideMedia, HolidayCategory } from '../../types';

const SLIDE_DURATION_MS = 6000;

interface HeroSlideMeta {
  id: string;
  holidayCategory: HolidayCategory;
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
}

const HERO_SLIDE_METADATA: HeroSlideMeta[] = [
  {
    id: 'slide-honeymoon',
    holidayCategory: 'Honeymoon',
    heading: 'HONEYMOON',
    subtitle: 'Private alpine rail journeys and secluded island retreats crafted for two.',
    ctaLabel: 'Explore Honeymoon',
    ctaLink: '/destinations?category=Honeymoon'
  },
  {
    id: 'slide-family',
    holidayCategory: 'Family & Group',
    heading: 'FAMILY & GROUP',
    subtitle: 'Effortless international journeys paced naturally for every generation.',
    ctaLabel: 'Explore Family Holidays',
    ctaLink: '/destinations?category=Family+%26+Group'
  },
  {
    id: 'slide-adventure',
    holidayCategory: 'Adventure',
    heading: 'ADVENTURE',
    subtitle: 'Wadi Rum desert canyons, alpine cable cars in Gabala, and island water sports.',
    ctaLabel: 'Explore Adventure',
    ctaLink: '/destinations?category=Adventure'
  },
  {
    id: 'slide-luxury',
    holidayCategory: 'Luxury Escapes',
    heading: 'LUXURY ESCAPES',
    subtitle: 'Private Maldives overwater infinity villas above undisturbed turquoise reefs.',
    ctaLabel: 'Explore Luxury Escapes',
    ctaLink: '/destinations?category=Luxury+Escapes'
  },
  {
    id: 'slide-women-solo',
    holidayCategory: 'Women Solo',
    heading: 'WOMEN SOLO',
    subtitle: 'Empowered, vetted small-group exploration from Malaysia to cosmopolitan capitals.',
    ctaLabel: 'Explore Women Solo',
    ctaLink: '/destinations?category=Women+Solo'
  },
  {
    id: 'slide-wellness',
    holidayCategory: 'Wellness & Retreats',
    heading: 'WELLNESS & RETREATS',
    subtitle: 'Serene open-air pavilions tucked inside Bali’s quiet emerald jungle valleys.',
    ctaLabel: 'Explore Wellness Retreats',
    ctaLink: '/destinations?category=Wellness+%26+Retreats'
  },
  {
    id: 'slide-culture',
    holidayCategory: 'Culture & Heritage',
    heading: 'CULTURE & HERITAGE',
    subtitle: 'Walk sunlit Istanbul mosques, rose-red Petra canyons, and Ceylon tea trails.',
    ctaLabel: 'Explore Culture & Heritage',
    ctaLink: '/destinations?category=Culture+%26+Heritage'
  }
];

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
  const originParam =
    typeof window !== 'undefined' && window.location?.origin
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : '';

  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=${id}&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1${originParam}${startParam}`;

  return { id, embedUrl };
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

interface HeroSliderProps {
  heroMedia?: HeroSheetSlideMedia[];
  loading?: boolean;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ heroMedia = [], loading = false }) => {
  const slides = useMemo(() => {
    return HERO_SLIDE_METADATA.slice(0, Math.max(heroMedia.length, 0))
      .map((meta, idx) => {
        const media = heroMedia[idx];
        return {
          ...meta,
          videoUrl: media?.videoUrl,
          fallbackImageUrl: media?.fallbackImageUrl
        };
      })
      .filter((s) => Boolean(s.videoUrl || s.fallbackImageUrl));
  }, [heroMedia]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [initializedStart, setInitializedStart] = useState(false);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  // Pick a fresh random opening slide strictly once sheet slides are ready
  useEffect(() => {
    if (slides.length > 0 && !initializedStart) {
      setCurrentIndex(getRandomInitialSlideIndex(slides.length));
      setInitializedStart(true);
    } else if (slides.length > 0 && currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, initializedStart, currentIndex]);

  useEffect(() => {
    setFailedVideos({});
  }, [heroMedia]);

  // Listen to YouTube IFrame API postMessage errors (e.g. blocked/private/unavailable video)
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== 'string' || !event.origin.includes('youtube.com')) return;
      if (typeof event.data !== 'string') return;
      try {
        const payload = JSON.parse(event.data) as { event?: string; id?: string; info?: unknown };
        if (payload?.event === 'onError' && payload.id) {
          setFailedVideos((prev) => ({ ...prev, [payload.id!]: true }));
        }
      } catch {
        // Ignore non-JSON postMessage frames
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const transitionTo = useCallback(
    (computeNext: (curr: number) => number) => {
      if (slides.length <= 1) return;
      setCurrentIndex((curr) => {
        const next = computeNext(curr);
        if (next !== curr) {
          setPrevIndex(curr);
        }
        return next;
      });
      setTransitionKey((k) => k + 1);
    },
    [slides.length]
  );

  useEffect(() => {
    if (prevIndex === null) return;
    const clearExit = window.setTimeout(() => setPrevIndex(null), 960);
    return () => window.clearTimeout(clearExit);
  }, [prevIndex, transitionKey]);

  const goNext = useCallback(() => {
    transitionTo((curr) => (curr + 1) % Math.max(slides.length, 1));
  }, [slides.length, transitionTo]);

  const goPrev = useCallback(() => {
    transitionTo((curr) => (curr - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1));
  }, [slides.length, transitionTo]);

  const jumpToSlide = useCallback(
    (idx: number) => {
      transitionTo(() => idx);
    },
    [transitionTo]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(goNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [currentIndex, slides.length, goNext]);

  // Clean loading state prior to sheet sync so old stock assets never flash or collide
  if (slides.length === 0) {
    return (
      <section
        className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
        aria-label="Signature Holiday Experiences"
      >
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
              {loading ? 'CURATED HOLIDAYS' : HERO_SLIDE_METADATA[0].heading}
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-2xl">
              {HERO_SLIDE_METADATA[0].subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const activeSlide = slides[currentIndex] || slides[0];
  const nextIndex = slides.length > 1 ? (currentIndex + 1) % slides.length : -1;

  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] lg:h-[94vh] overflow-hidden bg-[#111827] text-white"
      aria-label="Signature Holiday Experiences"
    >
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        const isExiting = idx === prevIndex && !isCurrent;
        const isNext = idx === nextIndex && !isCurrent && !isExiting;

        // Pre-warm the next slide silently underneath (z-0) so YouTube is already playing when crossfading!
        const shouldMount = isCurrent || isExiting || isNext;
        const yt = parseYouTubeEmbed(slide.videoUrl);
        const isVideoFailed = Boolean(failedVideos[slide.id]) || !slide.videoUrl;
        const canPlayYt = Boolean(yt) && !isVideoFailed;
        const canPlayMp4 = Boolean(slide.videoUrl) && !yt && !isVideoFailed;

        const zClass = isCurrent
          ? 'z-20 animate-hero-bounce-enter'
          : isExiting
            ? 'z-10 animate-hero-bounce-exit pointer-events-none'
            : isNext
              ? 'z-0 pointer-events-none'
              : 'opacity-0 -z-10 pointer-events-none';

        return (
          <div key={slide.id} className={`absolute inset-0 bg-[#111827] ${zClass}`}>
            {/* Custom Fallback Image from Row 6 under vid1..vid6 (Only shown when video fails or is absent) */}
            {isVideoFailed && slide.fallbackImageUrl && (
              <img
                src={slide.fallbackImageUrl}
                alt={slide.heading}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover animate-hero-mild-zoom"
              />
            )}

            {/* Primary Sheet YouTube Video Layer (pre-warmed on next slide so transitions never black out) */}
            {canPlayYt && yt && shouldMount && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  key={`${slide.id}-yt-${yt.id}`}
                  src={yt.embedUrl}
                  title={slide.heading}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="origin-when-cross-origin"
                  onLoad={(e) => {
                    try {
                      e.currentTarget.contentWindow?.postMessage(
                        JSON.stringify({ event: 'listening', id: slide.id }),
                        '*'
                      );
                    } catch {
                      // Ignore cross-origin frame postMessage restrictions
                    }
                  }}
                  onError={() =>
                    setFailedVideos((prev) => ({
                      ...prev,
                      [slide.id]: true
                    }))
                  }
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full scale-[1.18] border-0 pointer-events-none"
                />
              </div>
            )}

            {/* Direct MP4 Fallback Stream if non-YouTube video URL is placed in sheet */}
            {canPlayMp4 && shouldMount && (
              <video
                key={`${slide.id}-${slide.videoUrl}`}
                src={slide.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() =>
                  setFailedVideos((prev) => ({
                    ...prev,
                    [slide.id]: true
                  }))
                }
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40 pointer-events-none" />
          </div>
        );
      })}

      {/* Clean Unobstructed Content */}
      <div className="relative z-30 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div
            key={`${activeSlide.id}-${transitionKey}`}
            className="max-w-3xl space-y-5 animate-hero-text-bounce"
          >
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
          {slides.length > 1 && (
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
          )}
        </div>
      </div>
    </section>
  );
};
