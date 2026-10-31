import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Award, Heart, Shield, Calendar, Users, Building, ArrowRight, Mail } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { CTASection } from '../components/common/CTASection';
import { ABOUT_TEAM_IMAGES, CLIENT_ASSETS } from '../data/stockImages';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Header */}
      <div className="bg-[#010048] text-white py-14 sm:py-18 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'About Us' }]} className="text-slate-400" />

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f3e098] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>30+ Years of Dedication</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              The Story of 365Holidayz
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Combining three decades of travel expertise with thoughtfully designed destinations, holiday experiences, and deeply personalised travel planning.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Founder Story: Aameena & 30+ Years Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Photo with High-Res Image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <ImagePlaceholder
                src={ABOUT_TEAM_IMAGES.founder}
                subject="Founder Aameena in bespoke travel consultation office"
                category="Founder & Director"
                aspectRatio="team"
                recommendedDimensions="800 × 1000 px"
                className="rounded-2xl shadow-2xl border-2 border-[#c59b27]/40"
              />
              <div className="absolute -bottom-4 -right-4 p-4 rounded-xl bg-[#010048] text-white border-2 border-[#c59b27]/50 shadow-2xl hidden sm:block">
                <span className="text-3xl font-black text-[#f3e098] block">30+</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-200 font-bold">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
                Founder & Visionary
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#010048] tracking-tight">
                A Journey Guided by Aameena
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              When <strong>Aameena</strong> established the foundations of 365Holidayz, it was born out of a conviction that genuine luxury travel is not found in standardized itineraries or hurried tourist buses. It is found in empathy, personal care, and intimate destination wisdom.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Over <strong>thirty years of navigating global frontiers</strong>, Aameena has cultivated direct, enduring relationships with boutique hoteliers, licensed private chauffeurs, maritime captains, and cultural conservationists across the Maldives, Bali, Sri Lanka, Turkey, and beyond.
            </p>

            <blockquote className="p-4 sm:p-5 border-l-4 border-[#c59b27] bg-slate-50 rounded-r-lg text-sm sm:text-base italic text-slate-800 leading-relaxed">
              “Travel should leave you replenished, enlightened, and deeply moved. When we design a journey, we treat your holiday time as the precious, irreplaceable gift that it is.”
              <footer className="mt-2 text-xs font-bold text-[#010048] not-italic">
                — Aameena, Founder of 365Holidayz
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/90 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
              Core Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#010048]">
              Our Service Philosophy
            </h2>
            <p className="text-sm text-slate-600">
              Four fundamental pillars that define how every 365Holidayz itinerary is brought to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-lg font-black text-[#c59b27] block">01</span>
              <h3 className="text-base font-bold text-[#010048]">Fewer Pages, Clearer Choices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We distill thousands of overwhelming hotel options into handpicked sanctuaries that meet our verified standards for service, hygiene, and location.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-lg font-black text-[#c59b27] block">02</span>
              <h3 className="text-base font-bold text-[#010048]">Human-to-Human Planning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No automated bot scripts or call center queues. You collaborate with seasoned travel specialists who understand real travel dynamics.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-lg font-black text-[#c59b27] block">03</span>
              <h3 className="text-base font-bold text-[#010048]">Transparent Pricing Basis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We preserve authentic client spreadsheet pricing without hidden surprise charges, ambiguous terms, or fabricated discount countdowns.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-lg font-black text-[#c59b27] block">04</span>
              <h3 className="text-base font-bold text-[#010048]">Support From Gate to Gate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From the moment your chauffeur awaits you at the arrival terminal until your return flight home, our team remains on call to ensure comfort.
              </p>
            </div>
          </div>
        </section>

        {/* 365Eventz Connection per brief */}
        <section className="bg-gradient-to-br from-[#010048] via-[#080562] to-[#000032] text-white rounded-2xl p-8 sm:p-12 border border-[#c59b27]/30 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b27]/20 text-[#f3e098] text-xs font-bold uppercase tracking-wider border border-[#c59b27]/30">
                <Building className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Sister Enterprise Synergy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                In Association with 365Eventz
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Beyond leisure travel, 365Holidayz operates in seamless synergy with <strong>365Eventz</strong>, our dedicated sister division for milestone celebrations, destination weddings, executive corporate retreats, and international MICE delegations.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether orchestrating a 30-delegate leadership summit in Dubai and Bahrain or an intimate 100-guest beachfront union in Bali, our combined infrastructure manages airline charter logistics, gala banquets, and audiovisual staging with flawless precision.
              </p>

              <div className="pt-2">
                <Link
                  to="/packages?holidayType=MICE+%26+Corporate"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#f3e098] hover:text-white"
                >
                  <span>Explore MICE & Corporate group packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <ImagePlaceholder
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                subject="365Eventz destination celebration setup on seaside terrace"
                category="Event Setup"
                aspectRatio="card"
                recommendedDimensions="1200 × 900 px"
                className="rounded-xl border border-[#c59b27]/40 shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Team Placeholders adhering to brief */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
              Advisory Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#010048]">
              The Senior Planning Concierge
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Only verified executive bios are showcased, supported by professional leadership portraits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl bg-white border border-[#c59b27]/30 text-center space-y-3 shadow-md hover:shadow-lg transition-shadow">
              <ImagePlaceholder
                src={ABOUT_TEAM_IMAGES.founder}
                subject="Aameena - Founder & Managing Director portrait"
                category="Founder"
                aspectRatio="team"
                recommendedDimensions="800 × 1000 px"
                className="rounded-lg mx-auto"
                compact={true}
              />
              <div>
                <h3 className="font-bold text-base text-[#010048]">Aameena</h3>
                <p className="text-xs text-[#c59b27] font-bold">Founder & Managing Director</p>
                <p className="text-xs text-slate-500 mt-1">30+ years international travel planning & bespoke curation</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#c59b27]/30 text-center space-y-3 shadow-md hover:shadow-lg transition-shadow">
              <ImagePlaceholder
                src={ABOUT_TEAM_IMAGES.specialist1}
                subject="Senior Destination Specialist - Islands & Far East"
                category="Islands & Far East"
                aspectRatio="team"
                recommendedDimensions="800 × 1000 px"
                className="rounded-lg mx-auto"
                compact={true}
              />
              <div>
                <h3 className="font-bold text-base text-[#010048]">Senior Desk: Islands & Far East</h3>
                <p className="text-xs text-[#c59b27] font-bold">Bespoke Concierge</p>
                <p className="text-xs text-slate-500 mt-1">Maldives, Bali, Thailand & Vietnam itinerary architect</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#c59b27]/30 text-center space-y-3 shadow-md hover:shadow-lg transition-shadow">
              <ImagePlaceholder
                src={ABOUT_TEAM_IMAGES.specialist2}
                subject="Senior Destination Specialist - Middle East & Mediterranean"
                category="Middle East"
                aspectRatio="team"
                recommendedDimensions="800 × 1000 px"
                className="rounded-lg mx-auto"
                compact={true}
              />
              <div>
                <h3 className="font-bold text-base text-[#010048]">Senior Desk: Middle East</h3>
                <p className="text-xs text-[#c59b27] font-bold">Heritage & Corporate Specialist</p>
                <p className="text-xs text-slate-500 mt-1">Turkey, Jordan, Oman, Dubai & corporate MICE logistics</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CTASection />
    </div>
  );
};
