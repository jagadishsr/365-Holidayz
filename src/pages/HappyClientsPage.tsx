import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GENERATED_ASSETS, HAPPY_CLIENT_STORIES } from '../data/stockImages';
import { CTASection } from '../components/common/CTASection';
import { useHappyClientsGallery } from '../services/happyClientsSheet';

export const HappyClientsPage: React.FC = () => {
  const { items: galleryItems, loading: galleryLoading } = useHappyClientsGallery();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [brokenUrls, setBrokenUrls] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedIndex === null || galleryItems.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % galleryItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, galleryItems.length]);

  const activeLightboxItem =
    selectedIndex !== null && galleryItems[selectedIndex]
      ? galleryItems[selectedIndex]
      : null;

  return (
    <div className="bg-[#FAF9F6] pt-28 sm:pt-36">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D94E28] block">
          Journeys In Motion
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827] text-balance">
          HAPPY CLIENTS
        </h1>
        <p className="text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
          Memorable departures, unhurried island stays, and shared reflections from families, couples, and small groups travelling with 365Holidayz.
        </p>
      </section>

      {/* Live Google Sheet Client Gallery */}
      {(galleryLoading || galleryItems.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
          <div className="border-b border-[#E5E2DC] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
                Traveller Album
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827] text-balance">
                Moments From Recent Departures
              </h2>
            </div>
            {galleryItems.length > 0 && (
              <p className="text-xs font-medium text-[#6B7280] font-mono-tabular">
                {String(galleryItems.length).padStart(2, '0')}{' '}
                {galleryItems.length === 1 ? 'Featured Departure' : 'Featured Departures'}
              </p>
            )}
          </div>

          {galleryLoading && galleryItems.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((skeleton) => (
                <div
                  key={skeleton}
                  className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#EAE6DF]" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-2/3 bg-[#EAE6DF] rounded" />
                    <div className="h-4 w-full bg-[#F1EDE7] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : galleryItems.length === 1 ? (
            <article className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <button
                type="button"
                onClick={() => setSelectedIndex(0)}
                className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-[#EAE6DF] group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94E28]"
                aria-label={`View full photo for ${galleryItems[0].title}`}
              >
                {brokenUrls[galleryItems[0].imageUrl] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-[#6B7280] bg-gradient-to-br from-[#F3EFE8] to-[#E5E0D6]">
                    <Camera className="w-8 h-8 opacity-60" />
                    <span className="text-sm font-medium text-center">{galleryItems[0].title}</span>
                  </div>
                ) : (
                  <img
                    src={galleryItems[0].imageUrl}
                    alt={galleryItems[0].title}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenUrls((prev) => ({
                        ...prev,
                        [galleryItems[0].imageUrl]: true
                      }))
                    }
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/60 text-white text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm inline-flex items-center gap-1.5 group-hover:bg-[#D94E28] transition-colors">
                  <Expand className="w-3.5 h-3.5" />
                  <span>View Photo</span>
                </span>
              </button>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] font-mono-tabular">
                  <span>01</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Client Gallery</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#010048] tracking-tight text-balance">
                  {galleryItems[0].title}
                </h3>
                {galleryItems[0].description && (
                  <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                    {galleryItems[0].description}
                  </p>
                )}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(0)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D94E28] hover:text-[#010048] transition-colors cursor-pointer"
                  >
                    <span>Inspect Fullscreen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div
              className={`grid grid-cols-1 gap-8 ${
                galleryItems.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {galleryItems.map((item, idx) => {
                const isBroken = brokenUrls[item.imageUrl];
                return (
                  <article
                    key={item.id}
                    className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden flex flex-col group"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6DF] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94E28]"
                      aria-label={`Open photo for ${item.title}`}
                    >
                      {isBroken ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-[#6B7280] bg-gradient-to-br from-[#F3EFE8] to-[#E5E0D6]">
                          <Camera className="w-7 h-7 opacity-60" />
                          <span className="text-xs font-medium text-center">{item.title}</span>
                        </div>
                      ) : (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setBrokenUrls((prev) => ({
                              ...prev,
                              [item.imageUrl]: true
                            }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                      <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 text-white text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Expand className="w-3.5 h-3.5" />
                        <span>Expand</span>
                      </span>
                    </button>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] font-mono-tabular">
                          <span>{String(idx + 1).padStart(2, '0')}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>Client Departure</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#010048] tracking-tight">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Feature Highlight Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative aspect-[16/9] max-h-[540px] rounded-2xl overflow-hidden bg-[#111827] text-white">
          <img
            src={GENERATED_ASSETS.happyClientFamily}
            alt="Family walking along waterfront boardwalk during curated international holiday"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 block">
                Family, Honeymoon &amp; Small Group Travel
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                Designed Around How People Actually Enjoy Travelling Together
              </h2>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-[#D94E28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 w-fit"
            >
              <span>Plan Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Generic Client Tour Gallery & Experience Shares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
        <div className="border-b border-[#E5E2DC] pb-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
            Guest Experiences
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827]">
            Stories Shared From The Road
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HAPPY_CLIENT_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                <img
                  src={story.image}
                  alt={`${story.traveller} in ${story.destination}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#D94E28]">
                    <span>{story.tripType}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{story.duration}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#111827] leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2DC] space-y-0.5">
                  <p className="font-display text-base font-bold text-[#010048]">
                    {story.traveller}
                  </p>
                  <p className="text-xs font-medium text-[#6B7280]">{story.destination}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Editorial Highlight Spread */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="lg:col-span-6 aspect-[16/9] rounded-xl overflow-hidden bg-[#E8E4DC]">
            <img
              src={GENERATED_ASSETS.swissHoneymoon}
              alt="Couple at scenic snow-covered mountain railway station"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4 lg:pl-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D94E28] block">
              Alpine &amp; Island Honeymoons
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
              &ldquo;Every train connection and lakefront hotel check-in felt seamless.&rdquo;
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              &mdash; Arjun &amp; Kavya &middot; Alpine Rail &amp; Lake Escape. Timed departures with pre-arranged station luggage care and private transfers allowed them to focus entirely on the views.
            </p>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Fullscreen Photo Lightbox */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close gallery lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />

              {galleryItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === null
                          ? 0
                          : (prev - 1 + galleryItems.length) % galleryItems.length
                      )
                    }
                    aria-label="Previous client photo"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === null ? 0 : (prev + 1) % galleryItems.length
                      )
                    }
                    aria-label="Next client photo"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#D94E28] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="text-center max-w-2xl space-y-1.5 text-white px-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                {activeLightboxItem.title}
              </h3>
              {activeLightboxItem.description && (
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {activeLightboxItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
