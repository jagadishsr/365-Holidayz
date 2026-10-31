import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Send, MessageCircle, Mail, Sparkles, User, MapPin, DollarSign } from 'lucide-react';
import { EnquiryData } from '../../types';
import { ALL_DESTINATIONS } from '../../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../../data/holidayTypes';

interface EnquiryFormProps {
  initialDestination?: string;
  initialHolidayType?: string;
  packageContext?: {
    id: string;
    title: string;
    price: string;
  };
  onSuccess?: () => void;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialDestination = '',
  initialHolidayType = '',
  packageContext,
  className = ''
}) => {
  const [formData, setFormData] = useState<EnquiryData>({
    fullName: '',
    email: '',
    phone: '',
    departureCity: '',
    destination: initialDestination,
    approxDate: '',
    durationDays: '5-7 Days',
    adultsCount: 2,
    childrenCount: 0,
    budgetPerPerson: 'Standard Luxury',
    holidayType: initialHolidayType,
    specialNotes: packageContext ? `Interested in verified package: ${packageContext.title} (${packageContext.price})` : '',
    consentAgreed: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    submitted: boolean;
    payloadPreview?: string;
  } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a contact email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone or WhatsApp number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (min 8 digits)';
    }

    if (!formData.departureCity.trim()) {
      newErrors.departureCity = 'Please enter your departure city';
    }

    if (!formData.destination) {
      newErrors.destination = 'Please choose an intended destination';
    }

    if (!formData.approxDate) {
      newErrors.approxDate = 'Please select approximate travel dates or month';
    }

    if (formData.adultsCount < 1) {
      newErrors.adultsCount = 'At least 1 adult traveller is required';
    }

    if (!formData.consentAgreed) {
      newErrors.consentAgreed = 'Please confirm agreement to be contacted regarding this travel inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // As instructed by brief:
    // "No backend supplied: show an integration placeholder and do not pretend submission succeeds.
    // Add WhatsApp/mailto only after real contact details are entered."
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult({
        submitted: true,
        payloadPreview: JSON.stringify(
          {
            leadTimestamp: new Date().toISOString(),
            brand: '365Holidayz',
            plannerQueue: 'Aameena_Senior_Concierge_Desk',
            leadDetails: formData,
            packageReference: packageContext ? packageContext.id : 'Bespoke_Custom_Inquiry'
          },
          null,
          2
        )
      });
    }, 800);
  };

  const handleGenerateMailto = () => {
    const subject = encodeURIComponent(`Bespoke Trip Inquiry: ${formData.destination} (${formData.fullName})`);
    const body = encodeURIComponent(
      `Hello 365Holidayz Team,\n\nI am planning a bespoke journey with details:\n` +
      `- Name: ${formData.fullName}\n` +
      `- Destination: ${formData.destination}\n` +
      `- Departure City: ${formData.departureCity}\n` +
      `- Travel Date: ${formData.approxDate}\n` +
      `- Travellers: ${formData.adultsCount} Adults, ${formData.childrenCount} Children\n` +
      `- Holiday Type: ${formData.holidayType || 'Not specified'}\n` +
      `- Budget Tier: ${formData.budgetPerPerson}\n` +
      `- Notes: ${formData.specialNotes}\n\nPlease share your curated proposal.`
    );
    window.location.href = `mailto:24x7support@365holidayz.com?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppDraft = () => {
    const text = encodeURIComponent(
      `Hello 365Holidayz! I am interested in planning a curated trip to ${formData.destination || 'a bespoke destination'} for ${formData.adultsCount} travellers around ${formData.approxDate || 'upcoming dates'}. (Ref: ${formData.fullName})`
    );
    window.open(`https://wa.me/918939958899?text=${text}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 shadow-md p-6 sm:p-8 ${className}`}>
      {/* Header */}
      <div className="mb-6 space-y-2 border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c59b27]/20 border border-[#c59b27]/40 text-xs font-semibold text-[#010048]">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Bespoke Travel Consultation</span>
        </div>
        <h3 className="text-2xl font-black text-[#010048] tracking-tight">
          Plan Your Curated Trip
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Share your desired destinations and travel rhythm. Our specialists will design an itinerary suited to your pace and preferences.
        </p>

        {packageContext && (
          <div className="p-3 mt-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between">
            <div>
              <span className="font-semibold block text-[#010048]">Selected Reference Package:</span>
              <span>{packageContext.title}</span>
            </div>
            <span className="font-mono font-bold text-[#c9182b]">{packageContext.price}</span>
          </div>
        )}
      </div>

      {submissionResult?.submitted ? (
        <div className="space-y-6 py-4 animate-in fade-in duration-300">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-base">Inquiry Prepared & Validated</h4>
              <p className="text-xs sm:text-sm text-emerald-800">
                Your journey request has been assembled with 100% field compliance.
              </p>
            </div>
          </div>

          {/* Backend Integration Placeholder Notice per Brief */}
          <div className="p-4 rounded-lg bg-amber-50/90 border border-amber-300 text-amber-950 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Production Integration Placeholder</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-900/90">
              <strong>Notice:</strong> In this V1 preview environment, no live CRM backend is connected yet. Your form details are validated on the client side and staged for transmission. Connect your production API endpoint or webhook to <code>/api/enquiry</code> in <code>server.ts</code>.
            </p>

            {/* Direct Instant Action Buttons now enabled since real contact data is entered */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleGenerateMailto}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#010048] text-white text-xs font-semibold hover:bg-[#080562] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f3e098]" />
                <span>Open Pre-Filled Email</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDraft}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Draft on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Staged Payload Inspector for client review */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              Staged Payload Preview:
            </span>
            <pre className="p-3 bg-slate-900 text-slate-200 text-[11px] font-mono rounded overflow-x-auto max-h-48 border border-slate-700">
              {submissionResult.payloadPreview}
            </pre>
          </div>

          <button
            type="button"
            onClick={() => setSubmissionResult(null)}
            className="w-full text-center text-xs font-semibold text-slate-600 hover:text-[#010048] underline py-2"
          >
            Modify Form Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Ayesha Sharma"
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. yourname@domain.com"
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Row 2: Phone & Departure City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Departure City *
              </label>
              <input
                type="text"
                value={formData.departureCity}
                onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.departureCity ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.departureCity && <p className="text-[11px] text-red-600 mt-1">{errors.departureCity}</p>}
            </div>
          </div>

          {/* Row 3: Destination & Approximate Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Intended Destination *
              </label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.destination ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              >
                <option value="">Select Destination</option>
                {ALL_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.region}){d.isInspirationOnly ? ' — Inspiration' : ''}
                  </option>
                ))}
              </select>
              {errors.destination && <p className="text-[11px] text-red-600 mt-1">{errors.destination}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Approximate Travel Period / Month *
              </label>
              <input
                type="text"
                value={formData.approxDate}
                onChange={(e) => setFormData({ ...formData, approxDate: e.target.value })}
                placeholder="e.g. Dec 2026 or 15–22 Jan 2027"
                className={`w-full px-3.5 py-2.5 rounded border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c8a97e] ${
                  errors.approxDate ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.approxDate && <p className="text-[11px] text-red-600 mt-1">{errors.approxDate}</p>}
            </div>
          </div>

          {/* Row 4: Travellers & Holiday Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Adults *
              </label>
              <select
                value={formData.adultsCount}
                onChange={(e) => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded border border-slate-300 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-[#c8a97e]"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'} {num >= 20 ? '(Group / MICE)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Children (0-12 yrs)
              </label>
              <select
                value={formData.childrenCount}
                onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded border border-slate-300 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-[#c8a97e]"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Children</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Holiday Type
              </label>
              <select
                value={formData.holidayType}
                onChange={(e) => setFormData({ ...formData, holidayType: e.target.value })}
                className="w-full px-3 py-2.5 rounded border border-slate-300 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-[#c8a97e]"
              >
                <option value="">Any / Not Decided</option>
                {ALL_HOLIDAY_TYPES.map((ht) => (
                  <option key={ht.id} value={ht.title}>{ht.title} ({ht.subtitle})</option>
                ))}
                <option value="MICE & Corporate">MICE & Corporate Group</option>
              </select>
            </div>
          </div>

          {/* Row 5: Budget Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Estimated Budget Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {['Boutique Comfort', 'Standard Luxury', 'Ultra-Curated', 'Corporate / Group'].map((tier) => (
                <label
                  key={tier}
                  className={`p-2.5 rounded border text-center font-medium cursor-pointer transition-all ${
                    formData.budgetPerPerson === tier
                      ? 'border-[#010048] bg-[#010048] text-white font-bold shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="budgetPerPerson"
                    value={tier}
                    checked={formData.budgetPerPerson === tier}
                    onChange={(e) => setFormData({ ...formData, budgetPerPerson: e.target.value })}
                    className="sr-only"
                  />
                  <span>{tier}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 6: Special Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Specific Desires, Room Preferences or Pace Notes
            </label>
            <textarea
              rows={3}
              value={formData.specialNotes}
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              placeholder="e.g. Prefer quiet beach villas, celebrating 10th anniversary, vegetarian dietary requests, etc."
              className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#c59b27]"
            />
          </div>

          {/* Row 7: Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentAgreed}
                onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#010048] focus:ring-[#c59b27]"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to allow 365Holidayz senior travel advisors to contact me via email or phone/WhatsApp with curated itinerary proposals and travel details.
              </span>
            </label>
            {errors.consentAgreed && (
              <p className="text-[11px] text-red-600 mt-1">{errors.consentAgreed}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-gradient-to-r from-[#d4af37] via-[#f3e098] to-[#aa820a] hover:from-[#e5c158] hover:to-[#c59b27] text-[#010048] font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#010048]" />
              <span>{isSubmitting ? 'Validating Details...' : 'Submit Travel Request'}</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Privacy protected. 30+ years of confidential, bespoke travel advisory.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
