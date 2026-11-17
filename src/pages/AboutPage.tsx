import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ABOUT_TEAM_IMAGES, GENERATED_ASSETS, resolveAssetUrl } from '../data/stockImages';
import { CTASection } from '../components/common/CTASection';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] pt-28 sm:pt-36">
      {/* Editorial Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 space-y-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D94E28] block">
          About 365Holidayz
        </span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.02] text-balance">
          THE LEGACY OF LUXURY
        </h1>
        <p className="text-lg sm:text-2xl text-[#4B5563] font-normal max-w-3xl leading-relaxed">
          Three decades of travel wisdom, curated for your next journey.
        </p>
      </section>

      {/* Full-Width Destination Photography Spread */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="aspect-[16/9] max-h-[600px] w-full rounded-2xl overflow-hidden bg-[#E8E4DC]">
          <img
            src={GENERATED_ASSETS.swissHoneymoon}
            alt="Three decades of curated international travel"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Approved Founder Narrative: Aameena */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Attached Founder Portrait */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8E4DC] border border-[#E5E2DC]">
              <img
                src={resolveAssetUrl(ABOUT_TEAM_IMAGES.founder)}
                alt="Aameena, Founder of 365Holidayz"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-[#E5E2DC] pt-4">
              <div>
                <p className="font-display text-lg font-bold text-[#111827]">Aameena</p>
                <p className="text-xs text-[#6B7280] uppercase tracking-[0.14em]">
                  Founder &amp; Managing Director
                </p>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-[#D94E28]">
                30+ Years
              </span>
            </div>
          </div>

          {/* Approved Quote Copy Verbatim */}
          <div className="lg:col-span-7 space-y-8 text-lg sm:text-xl text-[#111827] leading-relaxed font-normal">
            <p>
              I founded this company on a simple belief: true luxury isn&rsquo;t about how much you spend—it&rsquo;s about how deeply a place stays with you.
            </p>
            <p>
              Over 30 years of leading expeditions across continents, I realized that most travellers don&rsquo;t need another checklist of crowded landmarks. They want the quiet confidence of knowing everything has been handled with precision, and the rare thrill of standing somewhere that genuinely shifts their perspective.
            </p>
            <p>
              My philosophy is rooted in access and intuition. Because I have spent decades walking the ground in these destinations, I don&rsquo;t just arrange itineraries; I open doors. I choose properties with soul, time every transfer so the light is right, and leave room for the unscripted moments that turn a holiday into a lifelong memory.
            </p>
            <p className="font-semibold text-[#010048]">
              We handle the complexity so all that remains for you is the experience.
            </p>

            <div className="pt-6 border-t border-[#E5E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-[#4B5563]">
                In association with <strong className="text-[#111827]">365Eventz</strong> for milestone celebrations &amp; corporate delegations.
              </div>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors w-fit shrink-0"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
