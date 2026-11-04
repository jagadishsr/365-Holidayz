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
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#f8fafc]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5a36] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
              <Clock className="w-3 h-3" />
              <span>1-Min Preview Reel</span>
            </span>
            <span className="text-xs font-black text-slate-700 hidden sm:inline-block">
              {video.holidayTypeTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
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
        <div className="p-6 space-y-4 bg-white">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#ff5a36] font-black uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#ff5a36]" />
              <span>{video.destination}</span>
              <span>•</span>
              <span className="text-slate-500 font-semibold">{video.duration}</span>
            </div>
            <h3 id="video-modal-title" className="text-lg sm:text-2xl font-black text-slate-900">
              {video.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {video.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ff5a36] block mb-2">
              Featured In This 1-Minute Reel:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              {video.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-600 text-center sm:text-left font-medium">
              <span>Ready to experience {video.destination}? Speak directly with our senior holiday specialists.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs shadow-md transition-all"
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff5a36] hover:bg-[#e04825] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
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
