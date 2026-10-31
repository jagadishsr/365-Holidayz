import React from 'react';
import { X, Play, Clock, Sparkles, MessageCircle, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { DestinationVideo } from '../../data/destinationVideos';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface VideoModalProps {
  video: DestinationVideo | null;
  onClose: () => void;
  onOpenEnquiry?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onOpenEnquiry }) => {
  if (!video) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi 365Holidayz, I just watched the 1-minute video tour for ${video.destination} and would like to plan a trip!`
  );
  const whatsappUrl = `https://wa.me/918939958899?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000028]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#010048] rounded-2xl border-2 border-[#c59b27]/40 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c59b27]/30 bg-[#000032]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c9182b] text-white text-[11px] font-black uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>1-Min Preview Reel</span>
            </span>
            <span className="text-xs font-bold text-[#f3e098] hidden sm:inline-block">
              {video.holidayTypeTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Video Player Container */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Info & Instant Actions */}
        <div className="p-5 sm:p-6 space-y-4 bg-gradient-to-b from-[#010048] to-[#000032]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#c59b27] font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#f3e098]" />
              <span>{video.destination}</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{video.duration}</span>
            </div>
            <h3 id="video-modal-title" className="text-lg sm:text-2xl font-black text-white">
              {video.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {video.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="pt-2 border-t border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#f3e098] block mb-2">
              Featured In This 1-Minute Reel:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {video.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#f3e098] shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              <span>Ready to experience {video.destination}? Speak directly with our senior holiday specialists.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>

              {onOpenEnquiry && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEnquiry();
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#010048]" />
                  <span>Plan This Trip</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
