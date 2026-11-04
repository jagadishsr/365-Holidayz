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
    <section className={`relative overflow-hidden bg-gradient-to-r from-[#f0fdf4] via-[#f8fafc] to-[#fff7ed] text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 ${className}`}>
      {/* Subtle pastel accents */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #cbd5e1 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef3c7] border border-amber-300 text-xs font-black text-amber-900 uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Your Travel, Our Passion • Expertly Curated in INR (₹)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>

        {destinationContext && (
          <div className="text-xs sm:text-sm text-slate-800 font-bold bg-white/90 py-1.5 px-4 rounded-full inline-block border border-slate-300 shadow-xs">
            Currently exploring: <strong className="text-[#ff5a36]">{destinationContext}</strong>
          </div>
        )}

        {/* Contact Strip */}
        <div className="py-2 flex items-center justify-center gap-4 text-xs text-slate-700 flex-wrap font-medium">
          <span className="font-black text-slate-900">Direct Booking Desk India:</span>
          <a href="tel:+918939958899" className="hover:text-[#ff5a36] flex items-center gap-1 font-bold text-slate-900">
            <Phone className="w-3.5 h-3.5 text-[#ff5a36]" />
            <span>+91-8939958899</span>
          </a>
          <span className="text-slate-300">|</span>
          <a href="tel:+919444179215" className="hover:text-[#ff5a36] font-bold text-slate-900">
            <span>9444179215</span>
          </a>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">24x7support@365holidayz.com</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {onOpenEnquiry ? (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ff5a36] text-white font-black text-sm tracking-wide hover:bg-[#e04825] shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Plan Your Trip / Free Quote</span>
            </button>
          ) : (
            <Link
              to={destinationContext ? `/contact?destination=${encodeURIComponent(destinationContext)}` : '/contact'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ff5a36] text-white font-black text-sm tracking-wide hover:bg-[#e04825] shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Plan Your Trip / Free Quote</span>
            </Link>
          )}

          <a
            href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Join WhatsApp Community</span>
          </a>

          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-300 shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-[#ff5a36]" />
            <span>About 30+ Years Experience</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
