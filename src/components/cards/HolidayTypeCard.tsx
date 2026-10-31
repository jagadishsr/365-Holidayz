import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play, Clock } from 'lucide-react';
import { HolidayType } from '../../types';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { HOLIDAY_TYPE_STOCK_IMAGES } from '../../data/stockImages';
import { DESTINATION_VIDEOS, DestinationVideo } from '../../data/destinationVideos';

interface HolidayTypeCardProps {
  holidayType: HolidayType;
  className?: string;
  onWatchVideo?: (video: DestinationVideo) => void;
}

export const HolidayTypeCard: React.FC<HolidayTypeCardProps> = ({ holidayType, className = '', onWatchVideo }) => {
  // Find matching destination video for this holiday type
  const matchingVideo = DESTINATION_VIDEOS.find((v) => v.holidayTypeId === holidayType.id) || DESTINATION_VIDEOS[0];

  return (
    <article className={`flex flex-col rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 ${className}`}>
      {/* Visual Placeholder with 1-Min Video Play Button */}
      <div className="relative">
        <ImagePlaceholder
          src={HOLIDAY_TYPE_STOCK_IMAGES[holidayType.id]}
          subject={holidayType.imageSubject}
          category={holidayType.title}
          aspectRatio="card"
          recommendedDimensions="1200 × 900 px"
        />

        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-full bg-[#010048]/95 text-[#f3e098] text-[10px] font-bold uppercase tracking-wider border border-[#c59b27]/40 shadow-md backdrop-blur-xs">
            {holidayType.badge}
          </span>
        </div>

        {/* 1-Min Video Quick Play Button Overlay */}
        {onWatchVideo && (
          <button
            type="button"
            onClick={() => onWatchVideo(matchingVideo)}
            className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#010048]/90 hover:bg-[#c9182b] text-white text-[11px] font-black uppercase tracking-wider shadow-lg border border-[#c59b27]/40 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
            title={`Watch 1-minute video tour for ${matchingVideo.destination}`}
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>1-Min Video</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div>
            <h3 className="text-xl font-bold text-[#010048] group-hover:text-[#c59b27] transition-colors">
              {holidayType.title}
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold mt-0.5">
              {holidayType.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {holidayType.description}
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Recommended Destinations:
            </span>
            <div className="flex flex-wrap gap-1">
              {holidayType.recommendedDestinations.slice(0, 3).map((dest, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                >
                  {dest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/holiday-types/${holidayType.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#010048] hover:text-[#c59b27] transition-colors"
          >
            <span>Explore Holiday Type</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to={`/packages?holidayType=${encodeURIComponent(holidayType.title)}`}
            className="text-[11px] font-medium text-slate-500 hover:text-[#010048] underline underline-offset-2"
          >
            View Packages
          </Link>
        </div>
      </div>
    </article>
  );
};
