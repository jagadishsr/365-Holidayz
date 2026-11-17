import React from 'react';
import { ArrowRight } from 'lucide-react';
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
  title = 'YOUR NEXT JOURNEY STARTS HERE.',
  subtitle = 'Tell us where you want to go and how you like to travel. Our senior specialists will craft your itinerary from first flight to return transfer.',
  className = '',
  onOpenEnquiry,
  destinationContext
}) => {
  return (
    <section
      className={`bg-[#F3F1EC] border-t border-[#E5E2DC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D94E28] block">
          Bespoke Travel Concierge
        </span>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] text-balance leading-[1.04]">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
          {destinationContext ? `Planning a custom trip to ${destinationContext}? ` : ''}
          {subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onOpenEnquiry ? (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to={destinationContext ? `/contact?destination=${encodeURIComponent(destinationContext)}` : '/contact'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <a
            href={CLIENT_ASSETS.verifiedContacts.whatsappCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#111827]/20 hover:border-[#111827] text-[#111827] text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
          >
            <span>WhatsApp India Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
};
