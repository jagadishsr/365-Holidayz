import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Package } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { PACKAGE_STOCK_IMAGES } from '../../data/stockImages';
import { splitPackageTitle } from '../../utils/packageTitle';

interface PackageCardProps {
  pkg: Package;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, className = '' }) => {
  const displayPrice = pkg.inrPriceDisplay || pkg.priceDisplay;
  const { mainTitle, subTitle } = splitPackageTitle(pkg.title);

  return (
    <article
      className={`flex flex-col bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden group hover:border-[#010048]/35 transition-all duration-300 ${className}`}
    >
      {/* Clean Borderless Photography */}
      <Link to={`/packages/${pkg.slug}`} className="block relative overflow-hidden">
        <ImagePlaceholder
          src={pkg.imageUrl || PACKAGE_STOCK_IMAGES[pkg.id]}
          packageId={pkg.id}
          destinationSlug={pkg.destinationSlug}
          category={pkg.holidayType}
          subject={pkg.imageSubject}
          aspectRatio="card"
        />
      </Link>

      {/* Editorial Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-3">
          {/* Typographic Metadata Line (Zero Pills) */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
            <span>
              {pkg.destination} &middot; {pkg.duration}
            </span>
            <span>{pkg.holidayType}</span>
          </div>

          <h3 className="font-display text-xl font-extrabold text-[#111827] leading-snug group-hover:text-[#010048] transition-colors">
            <Link to={`/packages/${pkg.slug}`} className="block">
              <span className="block line-clamp-1">{mainTitle}</span>
              {subTitle && (
                <span className="block text-xs sm:text-sm font-normal text-[#4B5563] mt-0.5 line-clamp-1">
                  {subTitle}
                </span>
              )}
            </Link>
          </h3>

          {/* Concise Top Inclusions */}
          <ul className="space-y-1.5 pt-1 text-xs text-[#4B5563]">
            {pkg.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: Starting INR Rate & Clean CTAs */}
        <div className="pt-5 border-t border-[#E5E2DC] space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                Starting From
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-mono-tabular text-2xl font-bold text-[#010048]">
                  {displayPrice}
                </span>
                <span className="text-xs text-[#6B7280]">/ person</span>
              </div>
              {pkg.originalCurrency && pkg.originalCurrency !== 'INR' && pkg.originalPrice && (
                <span className="block text-[11px] text-[#6B7280] font-mono-tabular mt-0.5">
                  Ref: {pkg.originalCurrency} {pkg.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <span className="text-[11px] font-medium text-[#6B7280] text-right">
              {pkg.roomBasis}
              <br />
              {pkg.persons}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to={`/packages/${pkg.slug}`}
              className="flex-1 py-2.5 px-4 rounded-full border border-[#E5E2DC] text-center text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] transition-colors whitespace-nowrap"
            >
              View Details
            </Link>
            <Link
              to={`/contact?destination=${encodeURIComponent(pkg.destination)}&packageId=${encodeURIComponent(pkg.id)}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
