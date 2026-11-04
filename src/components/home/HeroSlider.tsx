import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';
import { HERO_SLIDES } from '../../data/sliderSlides';
import { HERO_SLIDER_STOCK_IMAGES, DESTINATION_STOCK_IMAGES } from '../../data/stockImages';

interface HeroSliderProps {
  onOpenEnquiry?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenEnquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedHover, setIsPausedHover] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const pillsContainerRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay 6 seconds
  useEffect(() => {
    if (isPlaying && !isPausedHover) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPausedHover, nextSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Scroll active location pill horizontally inside container only (NEVER touch window scroll)
  useEffect(() => {
    if (pillsContainerRef.current) {
      const activeBtn = pillsContainerRef.current.querySelector<HTMLButtonElement>(`[data-slide-index="${currentSlide}"]`);
      if (activeBtn) {
        const container = pillsContainerRef.current;
        const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      }
    }
  }, [currentSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  // Guaranteed fallback image URL in case of any external network glitch
  const getSlideImageUrl = (slide: typeof activeSlide) => {
    return (
      HERO_SLIDER_STOCK_IMAGES[slide.id] ||
      DESTINATION_STOCK_IMAGES[slide.destinationSlug] ||
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    );
  };

  return (
    <div
      className="relative w-full h-[80vh] min-h-[580px] max-h-[820px] overflow-hidden bg-slate-900 text-white select-none"
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      onFocus={() => setIsPausedHover(true)}
      onBlur={() => setIsPausedHover(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Featured Destinations Hero Slider"
    >
      {/* Slide Images Background Layer - Bright, Vivid & Clear */}
      {HERO_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        const imageUrl = getSlideImageUrl(slide);

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isCurrent}
          >
            <img
              src={imageUrl}
              alt={slide.title}
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [slide.id]: true }))}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85';
              }}
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-10000 ease-out"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Light, clean gradient overlay for crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 z-10 pointer-events-none" />
          </div>
        );
      })}

      {/* Slide Content Layer - Bold, Bright, Simple (GT Holidays Style) */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-24 sm:pb-28">
        <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Eyebrow & Tag in Soft Pastel Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#fefce8] text-[#854d0e] border border-yellow-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span>{activeSlide.eyebrow}</span>
            </span>

            <span className="text-xs font-black text-rose-900 px-3.5 py-1 rounded-full bg-[#fff1f2] border border-rose-200 shadow-md">
              {activeSlide.tag}
            </span>
          </div>

          {/* Large Bold Sans-Serif Title with strong text shadow */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            {activeSlide.title}
          </h1>

          {/* Concise Factual Text with strong shadow */}
          <p className="text-sm sm:text-base md:text-lg text-white font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {activeSlide.summary}
          </p>

          {/* Action CTAs (Simple & Bold) */}
          <div className="pt-3 flex items-center gap-3.5 flex-wrap">
            {onOpenEnquiry ? (
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Plan Your Trip</span>
              </button>
            ) : (
              <Link
                to={`/contact?destination=${encodeURIComponent(activeSlide.destination)}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Plan Your Trip</span>
              </Link>
            )}

            <Link
              to={activeSlide.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm border border-slate-200 shadow-xl transition-all hover:scale-105"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#ff5a36]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Location Navigation Strip & Slider Controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* All Slider Locations Quick-Picker Bar in Pastel Pills */}
        <div
          ref={pillsContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
          role="tablist"
          aria-label="Slider destinations"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                data-slide-index={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff5a36] text-white shadow-lg scale-105 ring-2 ring-white'
                    : 'bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}
                title={`View ${slide.destination}`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#ff5a36]'}`} />
                <span>{slide.destination}</span>
              </button>
            );
          })}
        </div>

        {/* Counter, Dots & Navigation Arrows */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-800 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>

            {/* Slide Progress Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-6 bg-[#ff5a36]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Autoplay Pause / Play Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-white/90 text-slate-800 hover:text-slate-950 border border-slate-200 transition-colors cursor-pointer shadow-sm"
              title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Previous / Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-slate-200 transition-all hover:scale-105 cursor-pointer shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-slate-200 transition-all hover:scale-105 cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
