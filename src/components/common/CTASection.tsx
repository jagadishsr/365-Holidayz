import React from 'react';
import { Calendar, Compass, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLIENT_ASSETS } from '../../data/stockImages';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  onOpenEnquiry?: () => void;
  destinationContext?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = 'Your bespoke journey begins with a conversation',
  subtitle = 'With 30+ years of tailored travel expertise, we craft itineraries shaped around your personal pace, preferences, and desires.',
  className = '',
  onOpenEnquiry,
  destinationContext
}) => {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-[#010048] via-[#080562] to-[#000032] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#c59b27]/30 ${className}`}>
      {/* Luxury subtle pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #c59b27 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c59b27]/20 border border-[#c59b27]/40 text-xs font-bold text-[#f3e098] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#f3e098]" />
          <span>Your Travel, Our Passion • Expertly Curated</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {subtitle}
        </p>

        {destinationContext && (
          <div className="text-xs sm:text-sm text-[#f3e098] font-semibold bg-[#000032]/80 py-1.5 px-4 rounded-full inline-block border border-[#c59b27]/40">
            Currently exploring: <strong className="text-white">{destinationContext}</strong>
          </div>
        )}

        {/* Contact Strip */}
        <div className="py-2 flex items-center justify-center gap-4 text-xs text-slate-300 flex-wrap">
          <span className="font-bold text-[#f3e098]">Booking Desk:</span>
          <a href="tel:+918939958899" className="hover:text-white flex items-center gap-1 font-semibold">
            <Phone className="w-3 h-3 text-[#c59b27]" />
            <span>+91-8939958899</span>
          </a>
          <span className="text-slate-600">|</span>
          <a href="tel:+919444179215" className="hover:text-white font-semibold">
            <span>9444179215</span>
          </a>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">24x7support@365holidayz.com</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {onOpenEnquiry ? (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] font-black text-sm tracking-wide hover:from-[#e5c158] hover:to-[#c59b27] shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#010048]" />
              <span>Plan Your Trip</span>
            </button>
          ) : (
            <Link
              to={destinationContext ? `/plan-your-trip?destination=${encodeURIComponent(destinationContext)}` : '/plan-your-trip'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] text-[#010048] font-black text-sm tracking-wide hover:from-[#e5c158] hover:to-[#c59b27] shadow-xl transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#010048]" />
              <span>Plan Your Trip</span>
            </Link>
          )}

          <a
            href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 font-bold text-sm border border-emerald-500/40 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join WhatsApp Community</span>
          </a>

          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all"
          >
            <Compass className="w-4 h-4 text-[#f3e098]" />
            <span>Talk to an Expert</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
