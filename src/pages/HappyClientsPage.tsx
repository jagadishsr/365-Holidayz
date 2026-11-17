import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GENERATED_ASSETS, HAPPY_CLIENT_STORIES } from '../data/stockImages';
import { CTASection } from '../components/common/CTASection';

export const HappyClientsPage: React.FC = () => {
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
          Memorable departures, unhurried island stays, and shared reflections from families, couples, and small groups travelling with 365Holidayz.
        </p>
      </section>

      {/* Feature Highlight Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative aspect-[16/9] max-h-[540px] rounded-2xl overflow-hidden bg-[#111827] text-white">
          <img
            src={GENERATED_ASSETS.happyClientFamily}
            alt="Family walking along waterfront boardwalk during curated international holiday"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 block">
                Family, Honeymoon &amp; Small Group Travel
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
                Designed Around How People Actually Enjoy Travelling Together
              </h2>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111827] hover:bg-[#D94E28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors shrink-0 w-fit"
            >
              <span>Plan Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Generic Client Tour Gallery & Experience Shares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
        <div className="border-b border-[#E5E2DC] pb-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D94E28] block">
            Guest Experiences
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111827]">
            Stories Shared From The Road
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HAPPY_CLIENT_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                <img
                  src={story.image}
                  alt={`${story.traveller} in ${story.destination}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D94E28] block">
                    {story.tripType} &middot; {story.duration}
                  </span>
                  <p className="text-sm sm:text-base text-[#111827] leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2DC] space-y-0.5">
                  <p className="font-display text-base font-bold text-[#010048]">
                    {story.traveller}
                  </p>
                  <p className="text-xs font-medium text-[#6B7280]">{story.destination}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Editorial Highlight Spread */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="lg:col-span-6 aspect-[16/9] rounded-xl overflow-hidden bg-[#E8E4DC]">
            <img
              src={GENERATED_ASSETS.swissHoneymoon}
              alt="Couple at scenic snow-covered mountain railway station"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4 lg:pl-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D94E28] block">
              Alpine &amp; Island Honeymoons
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
              &ldquo;Every train connection and lakefront hotel check-in felt seamless.&rdquo;
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              &mdash; Arjun &amp; Kavya · Alpine Rail &amp; Lake Escape. Timed departures with pre-arranged station luggage care and private transfers allowed them to focus entirely on the views.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
