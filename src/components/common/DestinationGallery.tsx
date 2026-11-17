import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface DestinationGalleryProps {
  images: string[];
  title: string;
  eyebrow?: string;
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({
  images,
  title,
  eyebrow = 'Visual Album'
}) => {
  const cappedImages = images.filter(Boolean).slice(0, 8);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [brokenUrls, setBrokenUrls] = useState<Record<string, boolean>>({});
  const railRef = useRef<HTMLDivElement>(null);

  const visibleImages = cappedImages.filter((url) => !brokenUrls[url]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [title, cappedImages.length]);

  useEffect(() => {
    if (selectedIndex >= visibleImages.length && visibleImages.length > 0) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, visibleImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % visibleImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, visibleImages.length]);

  if (visibleImages.length === 0) return null;

  const currentUrl = visibleImages[selectedIndex] || visibleImages[0];
  const hasScrollableThumbnails = visibleImages.length > 4;

  const goPrev = () => {
    const nextIdx = (selectedIndex - 1 + visibleImages.length) % visibleImages.length;
    setSelectedIndex(nextIdx);
    scrollThumbnailIntoView(nextIdx);
  };

  const goNext = () => {
    const nextIdx = (selectedIndex + 1) % visibleImages.length;
    setSelectedIndex(nextIdx);
    scrollThumbnailIntoView(nextIdx);
  };

  const scrollThumbnailIntoView = (index: number) => {
    const container = railRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const scrollRailBy = (direction: -1 | 1) => {
    const container = railRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction * Math.max(container.clientWidth * 0.72, 240),
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D94E28] block">
            {eyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-end">
          <span className="font-mono-tabular text-xs font-semibold tracking-wider text-[#6B7280]">
            {String(selectedIndex + 1).padStart(2, '0')} / {String(visibleImages.length).padStart(2, '0')}
          </span>
          {hasScrollableThumbnails && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollRailBy(-1)}
                aria-label="Scroll gallery thumbnails left"
                className="w-9 h-9 rounded-full border border-[#E5E2DC] bg-white hover:bg-[#111827] hover:text-white text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRailBy(1)}
                aria-label="Scroll gallery thumbnails right"
                className="w-9 h-9 rounded-full border border-[#E5E2DC] bg-white hover:bg-[#111827] hover:text-white text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Showcase Image Frame */}
      <div className="relative aspect-[16/9] max-h-[540px] w-full rounded-2xl overflow-hidden bg-[#E8E4DC] group">
        <img
          src={currentUrl}
          alt={`${title} — photo ${selectedIndex + 1}`}
          referrerPolicy="no-referrer"
          onError={() =>
            setBrokenUrls((prev) => ({
              ...prev,
              [currentUrl]: true
            }))
          }
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />

        {visibleImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous gallery photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 hover:bg-[#D94E28] text-white backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next gallery photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 hover:bg-[#D94E28] text-white backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open full-screen photo view"
          className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/55 hover:bg-[#111827] text-white text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Expand className="w-3.5 h-3.5" />
          <span>Expand</span>
        </button>
      </div>

      {/* Bottom Thumbnail Rail (Displays 4 cleanly across, scrolls smoothly up to 8 images) */}
      <div
        ref={railRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-1.5 scrollbar-none"
        role="listbox"
        aria-label={`${title} thumbnails`}
      >
        {visibleImages.map((imgUrl, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={`${imgUrl}-${idx}`}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                setSelectedIndex(idx);
                scrollThumbnailIntoView(idx);
              }}
              className={`relative w-[calc(38%-8px)] sm:w-[calc(25%-12px)] shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-[#E8E4DC] border-2 transition-all duration-200 cursor-pointer focus:outline-none ${
                isSelected
                  ? 'border-[#D94E28] ring-2 ring-[#D94E28]/25 opacity-100 scale-[0.99]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${title} thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                onError={() =>
                  setBrokenUrls((prev) => ({
                    ...prev,
                    [imgUrl]: true
                  }))
                }
                className="w-full h-full object-cover"
              />
              {isSelected && (
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D94E28] ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-6xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentUrl}
              alt={`${title} enlarged photo ${selectedIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />

            {visibleImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
