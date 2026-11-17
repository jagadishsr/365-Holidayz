import React, { useState } from 'react';
import {
  DESTINATION_STOCK_IMAGES,
  HOLIDAY_TYPE_STOCK_IMAGES,
  PACKAGE_STOCK_IMAGES,
  ABOUT_TEAM_IMAGES,
  GENERATED_ASSETS
} from '../../data/stockImages';

export type AspectRatioType = 'hero' | 'card' | 'portrait' | 'gallery' | 'team' | 'square';

interface ImagePlaceholderProps {
  subject: string;
  recommendedDimensions?: string;
  aspectRatio?: AspectRatioType;
  category?: string;
  className?: string;
  overlayGradient?: boolean;
  src?: string;
  alt?: string;
  compact?: boolean;
  priority?: boolean;
  packageId?: string;
  destinationSlug?: string;
}

export function resolveStockImage(
  subject: string,
  category?: string,
  packageId?: string,
  destinationSlug?: string,
  explicitImageUrl?: string
): string {
  if (explicitImageUrl && explicitImageUrl.trim()) {
    return explicitImageUrl.trim();
  }

  if (packageId && PACKAGE_STOCK_IMAGES[packageId]) {
    return PACKAGE_STOCK_IMAGES[packageId];
  }

  if (destinationSlug && DESTINATION_STOCK_IMAGES[destinationSlug]) {
    return DESTINATION_STOCK_IMAGES[destinationSlug];
  }

  const text = `${subject} ${category || ''} ${destinationSlug || ''}`.toLowerCase();

  if (
    text.includes('switzerland') ||
    text.includes('swiss') ||
    text.includes('interlaken') ||
    text.includes('geneva') ||
    text.includes('zurich') ||
    text.includes('zermatt') ||
    text.includes('lucerne')
  ) {
    return DESTINATION_STOCK_IMAGES['switzerland'];
  }
  if (text.includes('france') || text.includes('paris')) {
    return DESTINATION_STOCK_IMAGES['france'];
  }
  if (text.includes('italy') || text.includes('venice') || text.includes('rome') || text.includes('milan')) {
    return DESTINATION_STOCK_IMAGES['italy'];
  }
  if (text.includes('austria') || text.includes('vienna') || text.includes('salzburg') || text.includes('europe')) {
    return DESTINATION_STOCK_IMAGES['europe'];
  }
  if (text.includes('london') || text.includes('united kingdom') || /\buk\b/.test(text)) {
    return DESTINATION_STOCK_IMAGES['united-kingdom'];
  }
  if (text.includes('japan') || text.includes('tokyo') || text.includes('kyoto')) {
    return DESTINATION_STOCK_IMAGES['japan'];
  }
  if (text.includes('australia') || text.includes('sydney') || text.includes('melbourne')) {
    return DESTINATION_STOCK_IMAGES['australia'];
  }
  if (text.includes('kazakhstan') || text.includes('tien shan') || text.includes('almaty')) {
    return GENERATED_ASSETS.kazakhstanAdventure;
  }
  if (text.includes('uzbekistan') || text.includes('samarkand') || text.includes('bukhara')) {
    return GENERATED_ASSETS.uzbekistanCulture;
  }
  if (text.includes('greece') || text.includes('santorini') || text.includes('aegean')) {
    return GENERATED_ASSETS.greeceVertical;
  }
  if (text.includes('maldives') || text.includes('overwater') || text.includes('atoll') || text.includes('maafushi')) {
    return GENERATED_ASSETS.maldivesLuxury;
  }
  if (text.includes('bali') || text.includes('ubud') || text.includes('wellness')) {
    return GENERATED_ASSETS.baliWellness;
  }
  if (text.includes('thailand') || text.includes('phuket') || text.includes('krabi') || text.includes('samui')) {
    return DESTINATION_STOCK_IMAGES['thailand'];
  }
  if (text.includes('istanbul') || text.includes('turkey') || text.includes('türkiye') || text.includes('cappadocia')) {
    return DESTINATION_STOCK_IMAGES['istanbul-turkey'];
  }
  if (text.includes('sri lanka') || text.includes('srilanka') || text.includes('ceylon') || text.includes('galle') || text.includes('sigiriya')) {
    return DESTINATION_STOCK_IMAGES['sri-lanka'];
  }
  if (text.includes('singapore') || text.includes('sentosa')) {
    return DESTINATION_STOCK_IMAGES['singapore'];
  }
  if (text.includes('malaysia') || text.includes('langkawi') || text.includes('kuala lumpur')) {
    return DESTINATION_STOCK_IMAGES['malaysia'];
  }
  if (text.includes('vietnam') || text.includes('phu quoc') || text.includes('ha long')) {
    return DESTINATION_STOCK_IMAGES['vietnam'];
  }
  if (text.includes('dubai') || text.includes('burj')) {
    return DESTINATION_STOCK_IMAGES['dubai'];
  }
  if (text.includes('bahrain')) {
    return DESTINATION_STOCK_IMAGES['bahrain'];
  }
  if (text.includes('jordan') || text.includes('petra') || text.includes('wadi rum')) {
    return DESTINATION_STOCK_IMAGES['jordan'];
  }
  if (text.includes('oman') || text.includes('muscat')) {
    return DESTINATION_STOCK_IMAGES['oman'];
  }
  if (text.includes('mauritius') || text.includes('mauriitius') || text.includes('le morne')) {
    return DESTINATION_STOCK_IMAGES['mauritius'];
  }
  if (text.includes('seychelles') || text.includes('praslin') || text.includes('la digue')) {
    return DESTINATION_STOCK_IMAGES['seychelles'];
  }
  if (text.includes('georgia') || text.includes('tbilisi') || text.includes('kazbegi')) {
    return DESTINATION_STOCK_IMAGES['georgia'];
  }
  if (text.includes('azerbaijan') || text.includes('baku')) {
    return DESTINATION_STOCK_IMAGES['azerbaijan'];
  }
  if (text.includes('hong kong') || text.includes('macau')) {
    return DESTINATION_STOCK_IMAGES['hong-kong-macau'];
  }
  if (text.includes('honeymoon')) {
    return GENERATED_ASSETS.swissHoneymoon;
  }
  if (text.includes('family')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'];
  }
  if (text.includes('women solo') || text.includes('solo')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'];
  }
  if (text.includes('aameena') || text.includes('founder')) {
    return ABOUT_TEAM_IMAGES.founder;
  }

  return GENERATED_ASSETS.introSeAsia;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  subject,
  aspectRatio = 'card',
  category,
  className = '',
  overlayGradient = false,
  src,
  alt,
  packageId,
  destinationSlug
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClassMap: Record<AspectRatioType, string> = {
    hero: 'aspect-[16/9] w-full',
    card: 'aspect-[4/3] w-full',
    gallery: 'aspect-[3/2] w-full',
    portrait: 'aspect-[3/4] w-full',
    team: 'aspect-[4/5] w-full',
    square: 'aspect-square w-full'
  };

  const effectiveImageUrl = resolveStockImage(subject, category, packageId, destinationSlug, src);

  return (
    <div className={`relative overflow-hidden group bg-[#E8E4DC] ${aspectClassMap[aspectRatio]} ${className}`}>
      {!imageError ? (
        <img
          src={effectiveImageUrl}
          alt={alt || subject}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full bg-gradient-to-br from-[#010048] via-[#1E293B] to-[#334155] flex items-end p-5 text-white/90"
          role="img"
          aria-label={alt || subject}
        >
          <span className="text-xs font-medium tracking-wide line-clamp-2">{subject}</span>
        </div>
      )}

      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
