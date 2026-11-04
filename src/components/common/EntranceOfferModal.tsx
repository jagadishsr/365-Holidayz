import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ArrowRight, MessageCircle, Calendar, CheckCircle2, Gift, Clock, Flame } from 'lucide-react';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface EntranceOfferModalProps {
  onOpenEnquiry?: () => void;
}

export const EntranceOfferModal: React.FC<EntranceOfferModalProps> = ({ onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user closed the popup in this session
    const hasSeenOffer = sessionStorage.getItem('365_has_seen_entrance_offer');
    if (!hasSeenOffer) {
      // Show entrance popup after a pleasant brief pause
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('365_has_seen_entrance_offer', 'true');
  };

  const handleClaimOffer = () => {
    handleClose();
    if (onOpenEnquiry) onOpenEnquiry();
  };

  const whatsappOfferUrl = `https://wa.me/918939958899?text=${encodeURIComponent(
    'Hi 365Holidayz, I saw the festive special offer on your website and would like to claim the package discount!'
  )}`;

  if (!isOpen) {
    return (
      /* Floating Persistent Mini Offer Trigger Badge */
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff5a36] hover:bg-[#e04422] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-white animate-bounce"
        title="View Exclusive Festive Offers"
      >
        <Gift className="w-4 h-4 text-white" />
        <span>Festive Offers (₹15,000 Off)</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-orange-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Pastel Ribbon */}
        <div className="bg-gradient-to-r from-[#fff1eb] via-[#ffe4d6] to-[#fff1eb] border-b border-orange-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff5a36] text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
              <Flame className="w-3 h-3 text-yellow-200" />
              <span>Limited Festive Deal</span>
            </span>
            <span className="text-xs font-bold text-orange-950 hidden sm:inline">
              365Holidayz Exclusive
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-orange-100 transition-colors cursor-pointer"
            aria-label="Close offer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Headline */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fefce8] border border-yellow-300 text-xs font-bold text-yellow-800 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span>Diwali & Winter Holiday Departures</span>
            </div>

            <h2 id="offer-modal-title" className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Flat <span className="text-[#ff5a36]">₹15,000 OFF</span> On International Packages!
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
              Book your dream vacation with 30+ years of travel trust. Includes flights, 4-star stays, Indian meals & visa facilitation.
            </p>
          </div>

          {/* 3 Hot Spotlight Offers in Pastel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Offer 1 */}
            <div className="p-3.5 rounded-2xl bg-[#f0f9ff] border border-sky-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
                Philippines 7D
              </span>
              <div className="text-base font-black text-slate-900">
                ₹59,999 <span className="text-[10px] text-slate-500 font-normal">PP</span>
              </div>
              <p className="text-[11px] text-sky-950 font-medium">
                Whale Sharks & Cebu
              </p>
            </div>

            {/* Offer 2 */}
            <div className="p-3.5 rounded-2xl bg-[#fff7ed] border border-orange-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">
                Singapore + KL 5D
              </span>
              <div className="text-base font-black text-slate-900">
                ₹31,500 <span className="text-[10px] text-slate-500 font-normal">PP</span>
              </div>
              <p className="text-[11px] text-orange-950 font-medium">
                Night Safari & Genting
              </p>
            </div>

            {/* Offer 3 */}
            <div className="p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Türkiye & Georgia
              </span>
              <div className="text-base font-black text-slate-900">
                Diwali Special
              </div>
              <p className="text-[11px] text-emerald-950 font-medium">
                Bosphorus & Caucasus
              </p>
            </div>
          </div>

          {/* Key Inclusions Pills */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-wrap items-center justify-around gap-2 text-xs text-slate-700 font-bold">
            <span className="flex items-center gap-1">✈️ Flights Included</span>
            <span className="flex items-center gap-1">🏨 4★ Handpicked Stays</span>
            <span className="flex items-center gap-1">🍛 Indian/Veg Meals</span>
            <span className="flex items-center gap-1">📄 Visa Assistance</span>
          </div>

          {/* Action CTAs (Bold GT Holidays Style) */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={handleClaimOffer}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Claim Festive Discount & Plan Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappOfferUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#ecfdf5] hover:bg-[#dcfce7] text-[#15803d] font-bold text-xs uppercase tracking-wider border border-[#bbf7d0] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Enquire On WhatsApp (+91 89399 58899)</span>
            </a>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
            >
              Continue to website without claiming discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
