import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Package } from '../../types';
import { getActiveFlashOffers } from '../../services/googleSheetsPackages';
import { splitPackageTitle } from '../../utils/packageTitle';

interface FlashOffersDrawerProps {
  packages: Package[];
  onEnquirePackage: (pkg: Package) => void;
}

const FLASH_INTERVALS_MS = [4000, 7000, 5000, 6000];

export const FlashOffersDrawer: React.FC<FlashOffersDrawerProps> = ({
  packages,
  onEnquirePackage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const flashOffers = getActiveFlashOffers(packages);

  React.useEffect(() => {
    let waitTimer: number | undefined;
    let resetTimer: number | undefined;
    let step = 0;

    const scheduleNextFlash = () => {
      const delay = FLASH_INTERVALS_MS[step % FLASH_INTERVALS_MS.length];
      step += 1;
      waitTimer = window.setTimeout(() => {
        setIsFlashing(true);
        resetTimer = window.setTimeout(() => {
          setIsFlashing(false);
          scheduleNextFlash();
        }, 920);
      }, delay);
    };

    scheduleNextFlash();

    return () => {
      if (waitTimer) window.clearTimeout(waitTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <>
      {/* Persistent Right-Edge Hanging Tab */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Flash Offers"
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 py-4 px-2.5 sm:px-3 bg-[#010048] hover:bg-[#D94E28] text-white rounded-l-xl shadow-lg transition-colors duration-300 cursor-pointer border-y border-l border-white/15 ${
          isFlashing ? 'animate-flash-offers-once' : ''
        }`}
      >
        <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
          FLASH OFFERS
        </span>
      </button>

      {/* Slide-over Offers Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          <aside className="relative z-10 w-full max-w-md bg-[#FAF9F6] h-full overflow-y-auto shadow-2xl border-l border-[#E5E2DC] flex flex-col">
            <div className="p-6 sm:p-8 border-b border-[#E5E2DC] flex items-start justify-between gap-4 bg-white">
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Seasonal Windows</span>
                </span>
                <h2 className="font-display text-2xl font-extrabold text-[#111827]">
                  Flash Offers
                </h2>
                <p className="text-xs text-[#4B5563]">
                  Active seasonal packages with valid booking windows. Availability confirmed directly on enquiry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
                aria-label="Close Flash Offers"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex-1">
              {flashOffers.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-[#E5E2DC] text-center space-y-3">
                  <p className="text-sm font-medium text-[#111827]">
                    No active flash offers listed at the moment.
                  </p>
                  <Link
                    to="/destinations"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D94E28]"
                  >
                    <span>Explore All Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                flashOffers.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl bg-white border border-[#E5E2DC] space-y-3.5 hover:border-[#010048]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                      <span>{pkg.destination}</span>
                      <span>{pkg.duration}</span>
                    </div>

                    <h3 className="font-display text-lg font-extrabold text-[#111827] leading-snug">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="hover:text-[#D94E28] transition-colors block"
                      >
                        {(() => {
                          const { mainTitle, subTitle } = splitPackageTitle(pkg.title);
                          return (
                            <>
                              <span className="block">{mainTitle}</span>
                              {subTitle && (
                                <span className="block text-xs font-normal text-[#4B5563] mt-0.5">
                                  {subTitle}
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </Link>
                    </h3>

                    <div className="flex items-baseline justify-between gap-2 pt-1">
                      <div>
                        <span className="font-mono-tabular text-xl font-bold text-[#010048]">
                          {pkg.inrPriceDisplay || pkg.priceDisplay}
                        </span>
                        <span className="text-xs text-[#6B7280] ml-1.5">/ person</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D94E28]">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.bookingValidity}</span>
                      </span>
                    </div>

                    <div className="pt-2 flex items-center gap-2.5">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-2.5 px-3.5 rounded-full border border-[#E5E2DC] text-center text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onEnquirePackage(pkg);
                        }}
                        className="flex-1 py-2.5 px-3.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-[#E5E2DC] bg-white">
              <Link
                to="/destinations"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#111827] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#D94E28] transition-colors"
              >
                <span>Browse All Active Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
