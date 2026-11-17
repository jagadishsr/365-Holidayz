import React, { useState } from 'react';
import { CheckCircle2, Send, MessageCircle, Mail, AlertCircle } from 'lucide-react';
import { EnquiryData } from '../../types';
import { ALL_DESTINATIONS } from '../../data/destinations';
import { ALL_HOLIDAY_TYPES } from '../../data/holidayTypes';
import { CLIENT_ASSETS } from '../../data/stockImages';

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
    specialNotes: packageContext
      ? `Interested in package: ${packageContext.title} (${packageContext.price})`
      : '',
    consentAgreed: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<{
    done: boolean;
    deliveredViaWebhook: boolean;
    errorNote?: string;
  } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your name';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone or WhatsApp number';
    }
    if (!formData.destination) newErrors.destination = 'Please select a destination';
    if (!formData.approxDate.trim()) newErrors.approxDate = 'Please share your approximate dates';
    if (!formData.consentAgreed) {
      newErrors.consentAgreed = 'Please confirm permission to be contacted';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const webhookUrl = (import.meta.env.VITE_ENQUIRY_WEBHOOK_URL || '').trim();
    setIsSubmitting(true);

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submittedAt: new Date().toISOString(),
            brand: '365Holidayz',
            packageReference: packageContext?.id || 'Bespoke',
            ...formData
          })
        });
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
        setIsSubmitting(false);
        setSubmissionState({ done: true, deliveredViaWebhook: true });
        return;
      } catch (err) {
        setIsSubmitting(false);
        setSubmissionState({
          done: true,
          deliveredViaWebhook: false,
          errorNote: err instanceof Error ? err.message : 'Unable to reach webhook endpoint.'
        });
        return;
      }
    }

    setIsSubmitting(false);
    setSubmissionState({ done: true, deliveredViaWebhook: false });
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(
      `Holiday Enquiry: ${formData.destination} (${formData.fullName})`
    );
    const body = encodeURIComponent(
      `Hello 365Holidayz Team,\n\n` +
        `Name: ${formData.fullName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Destination: ${formData.destination}\n` +
        `Departure City: ${formData.departureCity || 'Not specified'}\n` +
        `Preferred Dates: ${formData.approxDate}\n` +
        `Travellers: ${formData.adultsCount} Adults, ${formData.childrenCount} Children\n` +
        `Holiday Category: ${formData.holidayType || 'Not specified'}\n` +
        `Message: ${formData.specialNotes}\n`
    );
    window.location.href = `mailto:${CLIENT_ASSETS.verifiedContacts.email}?subject=${subject}&body=${body}`;
  };

  const whatsappText = encodeURIComponent(
    `Hello 365Holidayz, I would like to plan a trip to ${formData.destination} for ${formData.adultsCount} adults around ${formData.approxDate}. Name: ${formData.fullName}, Phone: ${formData.phone}. ${formData.specialNotes}`
  );
  const whatsappUrl = `https://wa.me/918939958899?text=${whatsappText}`;

  return (
    <div className={`bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 ${className}`}>
      <div className="mb-6 space-y-1.5 border-b border-[#E5E2DC] pb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D94E28] block">
          Bespoke Consultation
        </span>
        <h3 className="font-display text-2xl font-bold text-[#111827]">
          Plan Your Trip
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563]">
          Share your travel preferences below for an authentic itinerary tailored by our senior desk.
        </p>

        {packageContext && (
          <div className="mt-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E2DC] flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-[#111827] truncate">{packageContext.title}</span>
            <span className="font-mono-tabular font-bold text-[#010048] shrink-0">
              {packageContext.price}
            </span>
          </div>
        )}
      </div>

      {submissionState?.done ? (
        <div className="space-y-5 py-2">
          {submissionState.deliveredViaWebhook ? (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Enquiry Received</h4>
                <p className="text-xs text-emerald-900">
                  Thank you, {formData.fullName}. Your request has been sent to our specialists for {formData.destination}.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E2DC] text-[#111827] space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#D94E28] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Send Directly via WhatsApp or Email</h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {submissionState.errorNote
                      ? `Live webhook could not be reached (${submissionState.errorNote}). `
                      : 'Direct form storage webhook is not configured yet. '}
                    Use one of the verified channels below to dispatch your pre-filled enquiry immediately to our India desk.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleMailto}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-[#E5E2DC] hover:bg-[#F3F1EC] text-[#111827] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSubmissionState(null)}
            className="w-full text-center text-xs font-medium text-[#6B7280] hover:text-[#111827] underline pt-2 cursor-pointer"
          >
            Edit Enquiry Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your full name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              />
              {errors.fullName && <p className="text-[11px] text-[#D94E28] mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              />
              {errors.email && <p className="text-[11px] text-[#D94E28] mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              />
              {errors.phone && <p className="text-[11px] text-[#D94E28] mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Preferred Destination *
              </label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              >
                <option value="">Select destination</option>
                {ALL_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.displayLabel || d.name}>
                    {d.displayLabel || d.name}
                  </option>
                ))}
                <option value="Custom Multi-Country Itinerary">Custom Multi-Country Itinerary</option>
              </select>
              {errors.destination && (
                <p className="text-[11px] text-[#D94E28] mt-1">{errors.destination}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Number of Travellers
              </label>
              <select
                value={formData.adultsCount}
                onChange={(e) => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveller' : 'Travellers'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Preferred Travel Dates *
              </label>
              <input
                type="text"
                value={formData.approxDate}
                onChange={(e) => setFormData({ ...formData, approxDate: e.target.value })}
                placeholder="e.g. Nov 2026"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              />
              {errors.approxDate && (
                <p className="text-[11px] text-[#D94E28] mt-1">{errors.approxDate}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                Holiday Style
              </label>
              <select
                value={formData.holidayType}
                onChange={(e) => setFormData({ ...formData, holidayType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
              >
                <option value="">Any Style</option>
                {ALL_HOLIDAY_TYPES.map((ht) => (
                  <option key={ht.id} value={ht.title}>
                    {ht.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
              Message
            </label>
            <textarea
              rows={3}
              value={formData.specialNotes}
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              placeholder="Departure city, dietary requests, room preferences, or celebration details..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2DC] bg-[#FAF9F6] text-sm text-[#111827] focus:outline-hidden focus:border-[#010048]"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.consentAgreed}
              onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-[#E5E2DC] text-[#010048] focus:ring-[#010048]"
            />
            <span className="text-xs text-[#4B5563] leading-normal">
              I consent to 365Holidayz contacting me via email, phone, or WhatsApp regarding this holiday request.
            </span>
          </label>
          {errors.consentAgreed && (
            <p className="text-[11px] text-[#D94E28]">{errors.consentAgreed}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors disabled:opacity-60 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Preparing Enquiry...' : 'Submit Enquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
