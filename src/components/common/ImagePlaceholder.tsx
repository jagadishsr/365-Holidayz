import React, { useState } from 'react';
import { Camera, Check, Copy, Info, Sparkles } from 'lucide-react';
import { 
  DESTINATION_STOCK_IMAGES, 
  HERO_SLIDER_STOCK_IMAGES, 
  HOLIDAY_TYPE_STOCK_IMAGES, 
  PACKAGE_STOCK_IMAGES,
  ABOUT_TEAM_IMAGES 
} from '../../data/stockImages';

export type AspectRatioType = 'hero' | 'card' | 'portrait' | 'gallery' | 'team' | 'square';

interface ImagePlaceholderProps {
  subject: string;
  recommendedDimensions?: string;
  aspectRatio?: AspectRatioType;
  category?: string;
  className?: string;
  localPathSuggestion?: string;
  overlayGradient?: boolean;
  src?: string;
  alt?: string;
  compact?: boolean;
  priority?: boolean;
  packageId?: string;
}

// Keyword-based fallback resolver for generic destinations and themes
function resolveStockImage(subject: string, category?: string, packageId?: string): string {
  if (packageId && PACKAGE_STOCK_IMAGES[packageId]) {
    return PACKAGE_STOCK_IMAGES[packageId];
  }

  const text = `${subject} ${category || ''}`.toLowerCase();

  if (text.includes('philippines') || text.includes('bohol') || text.includes('cebu') || text.includes('kawasan')) {
    return 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80';
  }
  if (text.includes('maldives') || text.includes('overwater') || text.includes('atoll')) {
    return DESTINATION_STOCK_IMAGES['maldives'];
  }
  if (text.includes('bali') || text.includes('ubud') || text.includes('seminyak') || text.includes('tegalalang')) {
    return DESTINATION_STOCK_IMAGES['bali'];
  }
  if (text.includes('thailand') || text.includes('phuket') || text.includes('krabi') || text.includes('samui')) {
    return DESTINATION_STOCK_IMAGES['thailand'];
  }
  if (text.includes('istanbul') || text.includes('turkey') || text.includes('türkiye') || text.includes('bosphorus') || text.includes('cappadocia')) {
    return DESTINATION_STOCK_IMAGES['istanbul-turkey'];
  }
  if (text.includes('sri lanka') || text.includes('ceylon') || text.includes('galle') || text.includes('sigiriya')) {
    return DESTINATION_STOCK_IMAGES['sri-lanka'];
  }
  if (text.includes('singapore') || text.includes('sentosa') || text.includes('gardens by the bay')) {
    return DESTINATION_STOCK_IMAGES['singapore'];
  }
  if (text.includes('malaysia') || text.includes('kuala lumpur') || text.includes('petronas') || text.includes('langkawi')) {
    return DESTINATION_STOCK_IMAGES['malaysia'];
  }
  if (text.includes('vietnam') || text.includes('hanoi') || text.includes('ha long') || text.includes('saigon')) {
    return DESTINATION_STOCK_IMAGES['vietnam'];
  }
  if (text.includes('dubai') || text.includes('burj') || text.includes('dune')) {
    return DESTINATION_STOCK_IMAGES['dubai'];
  }
  if (text.includes('bahrain') || text.includes('manama')) {
    return DESTINATION_STOCK_IMAGES['bahrain'];
  }
  if (text.includes('jordan') || text.includes('petra') || text.includes('wadi rum') || text.includes('dead sea')) {
    return DESTINATION_STOCK_IMAGES['jordan'];
  }
  if (text.includes('oman') || text.includes('muscat') || text.includes('wahiba') || text.includes('jebel akhdar')) {
    return DESTINATION_STOCK_IMAGES['oman'];
  }
  if (text.includes('mauritius') || text.includes('le morne') || text.includes('chamarel')) {
    return DESTINATION_STOCK_IMAGES['mauritius'];
  }
  if (text.includes('seychelles') || text.includes('praslin') || text.includes('la digue') || text.includes('mahe')) {
    return DESTINATION_STOCK_IMAGES['seychelles'];
  }
  if (text.includes('georgia') || text.includes('tbilisi') || text.includes('kazbegi') || text.includes('caucasus')) {
    return DESTINATION_STOCK_IMAGES['georgia'];
  }
  if (text.includes('azerbaijan') || text.includes('baku') || text.includes('caspian') || text.includes('gabala')) {
    return DESTINATION_STOCK_IMAGES['azerbaijan'];
  }
  if (text.includes('hong kong') || text.includes('macau')) {
    return DESTINATION_STOCK_IMAGES['hong-kong-macau'];
  }
  if (text.includes('honeymoon') || text.includes('romantic') || text.includes('candlelit')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-honeymoon'];
  }
  if (text.includes('family') || text.includes('group')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-family-group'];
  }
  if (text.includes('adventure') || text.includes('balloon') || text.includes('safari') || text.includes('rafting')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-adventure'];
  }
  if (text.includes('luxury') || text.includes('yacht') || text.includes('pool villa')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-luxury-escapes'];
  }
  if (text.includes('women solo') || text.includes('solo')) {
    return HOLIDAY_TYPE_STOCK_IMAGES['ht-women-solo'];
  }
  if (text.includes('aameena') || text.includes('founder')) {
    return ABOUT_TEAM_IMAGES.founder;
  }
  if (text.includes('specialist') || text.includes('team') || text.includes('portrait')) {
    return ABOUT_TEAM_IMAGES.specialist1;
  }
  if (text.includes('event') || text.includes('365eventz') || text.includes('celebration')) {
    return 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80';
  }

  // Default evocative luxury travel landscape
  return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  subject,
  recommendedDimensions,
  aspectRatio = 'card',
  category,
  className = '',
  localPathSuggestion,
  overlayGradient = false,
  src,
  alt,
  compact = false,
  packageId
}) => {
  const [imageError, setImageError] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [copied, setCopied] = useState(false);

  // Derive default dimensions
  const dimensionsMap: Record<AspectRatioType, string> = {
    hero: '1920 × 1000 px (Hero Landscape)',
    card: '1200 × 900 px (4:3 Landscape)',
    gallery: '1200 × 800 px (3:2 Landscape)',
    portrait: '900 × 1200 px (3:4 Portrait)',
    team: '800 × 1000 px (4:5 Editorial Portrait)',
    square: '1000 × 1000 px (1:1 Square)'
  };

  const aspectClassMap: Record<AspectRatioType, string> = {
    hero: 'min-h-[460px] md:min-h-[580px] lg:min-h-[640px] aspect-[16/9] w-full',
    card: 'aspect-[4/3] w-full',
    gallery: 'aspect-[3/2] w-full',
    portrait: 'aspect-[3/4] w-full',
    team: 'aspect-[4/5] w-full',
    square: 'aspect-square w-full'
  };

  const dimText = recommendedDimensions || dimensionsMap[aspectRatio];

  // Effective image URL: prioritize explicit src, otherwise resolve from curated stock images
  const effectiveImageUrl = src || resolveStockImage(subject, category, packageId);

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const path = localPathSuggestion || `./assets/images/${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`;
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If we have an image and it didn't fail
  if (effectiveImageUrl && !imageError) {
    return (
      <div 
        className={`relative overflow-hidden group bg-[#010048] ${aspectClassMap[aspectRatio]} ${className}`}
        onMouseEnter={() => !compact && setShowMetadata(true)}
        onMouseLeave={() => setShowMetadata(false)}
      >
        <img
          src={effectiveImageUrl}
          alt={alt || subject}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Soft, light gradient so images remain clear and vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/35 via-transparent to-transparent pointer-events-none" />

        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/75 via-[#010048]/30 to-transparent pointer-events-none" />
        )}

        {/* Category Pill Tag (always visible in corner if provided) */}
        {category && !compact && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-[#010048]/90 text-[#f3e098] border border-[#c59b27]/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-md">
              {category}
            </span>
          </div>
        )}

        {/* Subtle Specs Indicator Tooltip on Hover */}
        {!compact && showMetadata && (
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 p-2 rounded bg-[#010048]/95 text-white border border-[#c59b27]/30 text-[11px] backdrop-blur-md animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 truncate">
              <Camera className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
              <span className="truncate font-medium text-slate-200">{subject}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyPath}
              className="px-2 py-0.5 rounded bg-[#080562] hover:bg-[#c59b27] hover:text-[#010048] text-[10px] font-bold text-[#f3e098] transition-colors shrink-0"
              title="Click to copy local asset path"
            >
              {copied ? 'Copied!' : 'Copy Path'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Graceful fallback to branded editorial placeholder if image loading fails
  return (
    <div
      className={`relative overflow-hidden group border border-[#c59b27]/30 bg-gradient-to-br from-[#010048] via-[#080562] to-[#000032] text-white flex flex-col justify-between p-4 select-none ${aspectClassMap[aspectRatio]} ${className}`}
      role="img"
      aria-label={`Image for: ${subject}`}
    >
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="px-2 py-0.5 rounded bg-[#c59b27]/20 border border-[#c59b27]/40 text-[10px] font-bold text-[#f3e098] uppercase">
          {category || 'Travel Feature'}
        </span>
        <span className="text-[10px] text-slate-400 font-mono bg-black/40 px-2 py-0.5 rounded">
          {dimText}
        </span>
      </div>

      <div className="relative z-10 my-auto text-center px-2 py-4">
        <Camera className="w-8 h-8 text-[#c59b27] mx-auto mb-2 opacity-80" />
        <p className="text-sm font-semibold text-slate-100 line-clamp-2">
          {subject}
        </p>
      </div>

      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="text-[10px] text-slate-300">Stock placeholder</span>
        <button
          type="button"
          onClick={handleCopyPath}
          className="text-[10px] text-[#c59b27] hover:underline"
        >
          {copied ? 'Copied' : 'Copy Path'}
        </button>
      </div>
    </div>
  );
};
