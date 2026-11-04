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
      <div className="bg-gradient-to-r from-[#f5f3ff] via-[#f0fdf4] to-[#f8fafc] text-slate-900 py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Holiday Types' }]} className="text-slate-500" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a36] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5a36]" />
              <span>Curated Travel Philosophies</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Signature Holiday Types
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Travel designed not around rigid itineraries, but around how you wish to feel. From intimate romantic overwater horizons to multi-generational family comfort, wild expeditions, and empowered solo exploration.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Core Holiday Types Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a36]">
              The 5 Signature Themes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Choose Your Travel Style
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
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
        <div className="bg-gradient-to-br from-[#eff6ff] via-[#f8fafc] to-[#fdf2f8] rounded-3xl p-6 sm:p-10 border border-blue-200/80 shadow-md text-slate-900 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ff5a36] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                  <Film className="w-3 h-3 inline mr-1" />
                  1-Min Video Reels
                </span>
                <span className="text-xs text-slate-700 font-bold">
                  Direct HD Destination Previews
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                1-Minute Cinematic Previews For Each Destination
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Watch 60-second curated destination reels highlighting key monuments, landscape vistas, villa stays, and bespoke excursions across our top international routes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-[#ff5a36] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Destinations ({DESTINATION_VIDEOS.length})
              </button>
              {ALL_HOLIDAY_TYPES.map((ht) => (
                <button
                  key={ht.id}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(ht.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    selectedCategoryFilter === ht.id
                      ? 'bg-[#ff5a36] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#ff5a36] shadow-md hover:shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
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
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff5a36] group-hover:bg-red-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs border border-slate-200">
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
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5a36]">
                      {video.holidayTypeTitle}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-[#ff5a36] transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#f0fdf4] hover:bg-[#ff5a36] hover:text-white text-xs font-black text-[#047857] transition-all cursor-pointer border border-emerald-200 hover:border-[#ff5a36]"
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
