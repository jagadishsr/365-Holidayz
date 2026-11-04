import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Clock, Calendar, CheckCircle, Send, Sparkles, Shield, User, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CLIENT_ASSETS } from '../data/stockImages';
import { ALL_DESTINATIONS } from '../data/destinations';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    passengers: '2',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Holiday Enquiry from ${formData.fullName} - ${formData.destination || 'International Tour'}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDestination: ${formData.destination}\nTravel Date: ${formData.travelDate}\nPassengers: ${formData.passengers}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:24x7support@365holidayz.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/918939958899?text=${encodeURIComponent(
    `Hi 365Holidayz, I would like to enquire about holiday packages and custom itineraries.`
  )}`;

  return (
    <div className="pt-24 pb-20 space-y-14 bg-[#f8fafc]">
      {/* Page Header (Soft Pastel Sky Header) */}
      <section className="bg-gradient-to-b from-[#e0f2fe] via-[#f0f7ff] to-[#f8fafc] py-12 sm:py-16 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} className="text-slate-500" />

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-xs font-bold text-sky-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>We Are Here To Assist 24x7</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Contact 365Holidayz
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Have questions about your upcoming trip or need a customized holiday itinerary? Speak directly with our senior travel specialists for prompt, transparent, and personalised holiday advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Channels (Pastel Cards) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Phone Assistance (Pastel Mint Card) */}
            <div className="p-6 rounded-2xl bg-[#f0fdf4] border-2 border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Direct Booking Desk India
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Call Our Travel Concierge
                  </h3>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-emerald-100 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-medium">Primary Line:</span>
                  <a href="tel:+918939958899" className="font-bold text-emerald-800 hover:text-emerald-950 text-base">
                    +91-8939958899
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-medium">Secondary Line:</span>
                  <a href="tel:+919444179215" className="font-bold text-emerald-800 hover:text-emerald-950 text-base">
                    +91-9444179215
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-1 text-xs text-emerald-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Available Mon – Sun, 9:00 AM – 9:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Chat (Pastel Peach Card) */}
            <div className="p-6 rounded-2xl bg-[#fff7ed] border-2 border-orange-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block">
                    Fastest Response
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    WhatsApp Chat Support
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Get instant package brochures, custom day-wise quotes, flight updates, and visa checklists straight to your WhatsApp.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 89399 58899)</span>
              </a>
            </div>

            {/* Email & Support (Pastel Lavender Card) */}
            <div className="p-6 rounded-2xl bg-[#faf5ff] border-2 border-purple-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 block">
                    Official Email Desk
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Send Itinerary Enquiry
                  </h3>
                </div>
              </div>

              <div className="pt-2 text-sm">
                <a
                  href="mailto:24x7support@365holidayz.com"
                  className="font-bold text-purple-900 hover:text-purple-950 underline underline-offset-4 text-base"
                >
                  24x7support@365holidayz.com
                </a>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Guaranteed response within 2 hours during active business hours.
                </p>
              </div>
            </div>

            {/* Operating Credentials & Trust */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Shield className="w-4 h-4 text-[#ff5a36]" />
                <span>365Holidayz Operating Commitments</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent INR (₹) pricing with zero hidden surcharges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Indian meals & vegetarian arrangements guaranteed across all tours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>30+ years of proven South India & pan-India traveller trust.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Quick Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-slate-200/90 shadow-md p-6 sm:p-10 space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5a36]">
                Quick Enquiry & Custom Itinerary
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Request A Free Holiday Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Fill out the quick details below, and our senior travel planner will formulate a comprehensive proposal tailored to your dates, pax count, and budget.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#f0fdf4] border-2 border-emerald-300 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-emerald-900">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-700 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our senior holiday consultant will review your itinerary for <strong>{formData.destination || 'your destination'}</strong> and contact you via phone or WhatsApp shortly.
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Instant WhatsApp Follow-up</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Phone / WhatsApp No *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Destination of Interest
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    >
                      <option value="">Select Destination</option>
                      {ALL_DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.region})
                        </option>
                      ))}
                      <option value="Philippines">Philippines (Client Special)</option>
                      <option value="Türkiye & Georgia">Türkiye & Georgia (Diwali Special)</option>
                      <option value="Singapore & Malaysia">Singapore & Malaysia (5 Days Special)</option>
                      <option value="Custom Multi-Country">Custom Multi-Country Circuit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Travel Date */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Approx Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2026"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    />
                  </div>

                  {/* Passengers */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      No. of Travellers
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    >
                      <option value="1">1 Person (Solo)</option>
                      <option value="2">2 Adults (Couple / Twin)</option>
                      <option value="3-4">3 - 4 Pax (Family)</option>
                      <option value="5-8">5 - 8 Pax (Small Group)</option>
                      <option value="9+">9+ Pax (Corporate / MICE)</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Budget Per Person
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                    >
                      <option value="">Any Budget</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000+">₹2,00,000+ (Ultra Luxury)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Specific Requirements or Meal Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Vegetarian / Jain food requested, prefer overwater villa, private transfers only, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#ff5a36] bg-[#f8fafc]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#ff5a36] hover:bg-[#e04422] text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Holiday Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
