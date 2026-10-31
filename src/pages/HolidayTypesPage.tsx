import React, { useState } from 'react';
import { Sparkles, Compass, Play, Clock, Video, Film, CheckCircle2 } from 'lucide-react';
import { ALL_HOLIDAY_TYPES } from '../data/holidayTypes';
import { DESTINATION_VIDEOS, DestinationVideo } from '../data/destinationVideos';
import { HolidayTypeCard } from '../components/cards/HolidayTypeCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { VideoModal } from '../components/common/VideoModal';

interface HolidayTypesPageProps {
  onOpenEnquiry?: () => void;
}

export const HolidayTypesPage: React.FC<HolidayTypesPageProps> = ({ onOpenEnquiry }) => {
  const [activeVideo, setActiveVideo] = useState<DestinationVideo | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const filteredVideos = selectedCategoryFilter === 'all'
    ? DESTINATION_VIDEOS
    : DESTINATION_VIDEOS.filter((v) => v.holidayTypeId === selectedCategoryFilter);

  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Holiday Types' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Curated Travel Philosophies</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Signature Holiday Types
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Travel designed not around rigid itineraries, but around how you wish to feel. From intimate romantic overwater horizons to multi-generational family comfort, wild expeditions, and empowered solo exploration.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Core Holiday Types Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
              The 5 Signature Themes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#010048]">
              Choose Your Travel Style
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Click "1-Min Video" on any card below to watch a cinematic high-definition preview of the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_HOLIDAY_TYPES.map((ht) => (
            <HolidayTypeCard
              key={ht.id}
              holidayType={ht}
              onWatchVideo={(vid) => setActiveVideo(vid)}
            />
          ))}
        </div>
      </section>

      {/* 2. Dedicated Section: 1-Minute Relevant Video for Each Destination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-[#010048] via-[#050454] to-[#010048] rounded-2xl p-6 sm:p-10 border-2 border-[#c59b27]/40 shadow-xl text-white space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c59b27]/25 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#c9182b] text-white text-[11px] font-black uppercase tracking-wider">
                  <Film className="w-3 h-3 inline mr-1" />
                  1-Min Video Reels
                </span>
                <span className="text-xs text-[#f3e098] font-bold">
                  Direct HD Destination Previews
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                1-Minute Cinematic Previews For Each Destination
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Watch 60-second curated destination reels highlighting key monuments, landscape vistas, villa stays, and bespoke excursions across our top international routes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-[#c59b27] text-[#010048]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                All Destinations ({DESTINATION_VIDEOS.length})
              </button>
              {ALL_HOLIDAY_TYPES.map((ht) => (
                <button
                  key={ht.id}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(ht.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryFilter === ht.id
                      ? 'bg-[#c59b27] text-[#010048]'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {ht.title}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group rounded-xl overflow-hidden bg-[#000032] border border-[#c59b27]/30 hover:border-[#c59b27] shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail with Play Trigger */}
                <div
                  className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#010048]/40 group-hover:bg-[#010048]/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#c9182b] group-hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 bg-[#010048]/90 text-[#f3e098] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-[#c59b27]/40">
                    {video.destination}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27]">
                      {video.holidayTypeTitle}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-[#f3e098] transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-white/10 hover:bg-[#c59b27] hover:text-[#010048] text-xs font-bold text-[#f3e098] transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch 1-Min Tour</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />

      {/* Active Video Player Modal */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onOpenEnquiry={onOpenEnquiry}
        />
      )}
    </div>
  );
};
