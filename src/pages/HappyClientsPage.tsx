import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { CLIENT_ASSETS, GENERATED_ASSETS } from '../data/stockImages';
import { CTASection } from '../components/common/CTASection';

export const HappyClientsPage: React.FC = () => {
  const verifiedHighlights = [
    {
      title: 'Philippines — Manila · Cebu · Bohol',
      duration: '6 Nights / 7 Days',
      image: CLIENT_ASSETS.posterPhilippines,
      caption: 'Curated group island discovery featuring Bohol, Cebu heritage, and coastal excursions.'
    },
    {
      title: 'Türkiye & Georgia — Festival Departures',
      duration: 'All-Inclusive Circuit',
      image: CLIENT_ASSETS.posterTurkiyeGeorgia,
      caption: 'Istanbul, Cappadocia, Antalya, Tbilisi & Kazbegi departures with Indian dining and guides.'
    },
    {
      title: 'Singapore & Malaysia — Twin City Explorer',
      duration: '5 Days',
      image: CLIENT_ASSETS.posterSingaporeMalaysia,
      caption: 'Night Safari, Sentosa Island, Kuala Lumpur skyline, and Genting Highlands cable car.'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] pt-28 sm:pt-36">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D94E28] block">
          Journeys In Motion
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827]">
          HAPPY CLIENTS
        </h1>
        <p className="text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed">
          Thirty years of international departures across families, honeymooners, women-solo groups, and corporate teams.
        </p>
      </section>

      {/* Featured Visual Story Spread */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative aspect-[16/9] max-h-[540px] rounded-2xl overflow-hidden bg-[#111827] text-white">
          <img
            src={GENERATED_ASSETS.kazakhstanAdventure}
            alt="365Holidayz Travellers in Kazakhstan Highlands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 block">
                Small-Group &amp; Custom Departures
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                Authentic Travel Moments Across Continents
              </h2>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-[#D94E28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 w-fit"
            >
              <span>Share Dates With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Authentic Supplied Campaign & Departure Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        <div className="border-b border-[#E5E2DC] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
              Verified Departures
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
              Featured Group &amp; Festival Circuits
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verifiedHighlights.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F3F1EC]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D94E28] block">
                  {item.duration}
                </span>
                <h3 className="font-display text-lg font-bold text-[#111827]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Client Video Reels Slot Notice (No Fake Quotes Fabricated) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#F3F1EC] border border-[#E5E2DC] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#010048]">
              <PlayCircle className="w-4 h-4 text-[#D94E28]" />
              <span>Traveller Stories &amp; Video Highlights</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#111827]">
              Direct Client Trip Reels &amp; Photography
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              We publish only genuine traveller photographs and video stories approved by our guests. Follow our official Instagram channel for live departure stories from ongoing tours.
            </p>
          </div>

          <a
            href={CLIENT_ASSETS.verifiedContacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 w-fit"
          >
            <span>View Instagram Stories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
