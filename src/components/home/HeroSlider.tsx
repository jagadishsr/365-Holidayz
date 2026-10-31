import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight, Calendar, MapPin } from 'lucide-react';
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

  // Scroll active location pill into view
  useEffect(() => {
    if (pillsContainerRef.current) {
      const activeBtn = pillsContainerRef.current.querySelector<HTMLButtonElement>(`[data-slide-index="${currentSlide}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
      className="relative w-full h-[85vh] min-h-[640px] max-h-[940px] overflow-hidden bg-[#010048] text-white select-none"
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      onFocus={() => setIsPausedHover(true)}
      onBlur={() => setIsPausedHover(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Featured Destinations Hero Slider"
    >
      {/* Slide Images Background Layer - Bright & Clear */}
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
            {/* Vivid Background Photo with zero heavy dark masking */}
            <img
              src={imageUrl}
              alt={slide.title}
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [slide.id]: true }))}
              onError={(e) => {
                // Guaranteed fallback to high-uptime landscape
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85';
              }}
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-10000 ease-out"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* LIGHT & SUBTLE GRADIENTS:
                Significantly reduced opacity as requested so destination pictures remain clear, bright and vibrant */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#010048]/50 via-[#010048]/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/50 via-transparent to-[#010048]/20 z-10 pointer-events-none" />
          </div>
        );
      })}

      {/* Slide Content Layer - Text encapsulated in a frosted glass card for flawless legibility */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl bg-[#010048]/75 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl border border-[#c59b27]/30 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Eyebrow & Tag */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#c59b27]/30 border border-[#c59b27]/60 text-xs font-bold text-[#f3e098] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#f3e098]" />
              <span>{activeSlide.eyebrow}</span>
            </span>

            <span className="text-xs text-white font-bold px-3 py-1 rounded bg-[#c9182b] border border-red-400/40 shadow-sm">
              {activeSlide.tag}
            </span>
          </div>

          {/* Large Bold Sans-Serif Title (Strictly no serif) */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            {activeSlide.title}
          </h1>

          {/* Concise Factual Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-100 font-normal leading-relaxed">
            {activeSlide.summary}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-3.5 flex-wrap">
            {onOpenEnquiry ? (
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-sm tracking-wide shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#010048]" />
                <span>Plan Your Trip</span>
              </button>
            ) : (
              <Link
                to={`/plan-your-trip?destination=${encodeURIComponent(activeSlide.destination)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-sm tracking-wide shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#010048]" />
                <span>Plan Your Trip</span>
              </Link>
            )}

            <Link
              to={activeSlide.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-[#c59b27]/50 backdrop-blur-sm transition-all"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#f3e098]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Location Navigation Strip & Slider Controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* All Slider Locations Quick-Picker Bar */}
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c59b27] text-[#010048] shadow-lg scale-105 ring-2 ring-[#f3e098]'
                    : 'bg-[#000032]/85 hover:bg-[#080562] text-white/95 border border-white/20 backdrop-blur-md'
                }`}
                title={`View ${slide.destination}`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-[#010048]' : 'text-[#f3e098]'}`} />
                <span>{slide.destination}</span>
              </button>
            );
          })}
        </div>

        {/* Counter, Dots & Navigation Arrows */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#f3e098] bg-[#000032]/90 px-2.5 py-1 rounded-md border border-[#c59b27]/30 backdrop-blur-xs">
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
                    i === currentSlide ? 'w-6 bg-[#c59b27]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Autoplay Pause / Play Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded bg-[#000032]/80 text-slate-200 hover:text-white border border-[#c59b27]/30 transition-colors cursor-pointer"
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
              className="p-2.5 sm:p-3 rounded-full bg-[#000032]/85 hover:bg-[#080562] text-white border border-[#c59b27]/40 backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2.5 sm:p-3 rounded-full bg-[#000032]/85 hover:bg-[#080562] text-white border border-[#c59b27]/40 backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
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
