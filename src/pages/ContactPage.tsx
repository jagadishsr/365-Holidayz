import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { CLIENT_ASSETS } from '../data/stockImages';
import { EnquiryForm } from '../components/common/EnquiryForm';
import { Package } from '../types';
import { filterActivePackages } from '../services/googleSheetsPackages';

interface ContactPageProps {
  packages: Package[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ packages }) => {
  const [searchParams] = useSearchParams();
  const initialDestination = searchParams.get('destination') || '';
  const initialCategory = searchParams.get('holidayType') || searchParams.get('category') || '';
  const packageId = searchParams.get('packageId');

  const activePackages = filterActivePackages(packages);
  const selectedPackage = packageId ? activePackages.find((p) => p.id === packageId) : undefined;

  const { phone1, phone2, email, instagram, facebook, whatsappCommunity } =
    CLIENT_ASSETS.verifiedContacts;

  return (
    <div className="bg-[#FAF9F6] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Clean Editorial Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D94E28] block">
            India Booking Desk
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827]">
            CONTACT US
          </h1>
          <p className="text-base sm:text-xl text-[#4B5563] leading-relaxed">
            Speak directly with our senior holiday planners for custom itineraries, package availability, and group departures.
          </p>
        </div>

        {/* Two-Column Split: Verified Channels & Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] block mb-2">
                  Call Our Specialists
                </span>
                <div className="space-y-2.5">
                  <a
                    href={`tel:${phone1.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-lg font-bold text-[#010048] hover:text-[#D94E28] transition-colors font-mono-tabular"
                  >
                    <Phone className="w-4 h-4 text-[#D94E28] shrink-0" />
                    <span>{phone1}</span>
                  </a>
                  <a
                    href={`tel:${phone2.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-lg font-bold text-[#010048] hover:text-[#D94E28] transition-colors font-mono-tabular"
                  >
                    <Phone className="w-4 h-4 text-[#D94E28] shrink-0" />
                    <span>{phone2}</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-[#E5E2DC] pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] block mb-2">
                  Email Support
                </span>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-base font-semibold text-[#111827] hover:text-[#D94E28] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                  <span>{email}</span>
                </a>
              </div>

              <div className="border-t border-[#E5E2DC] pt-6 space-y-3">
                <a
                  href={whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#010048] hover:bg-[#D94E28] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="border-t border-[#E5E2DC] pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] block mb-3">
                  Connect Online
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#D94E28]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E2DC] text-xs font-semibold text-[#111827] hover:bg-[#F3F1EC] transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-[#010048]" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              initialDestination={
                initialDestination || (selectedPackage ? selectedPackage.destination : '')
              }
              initialHolidayType={
                initialCategory || (selectedPackage ? selectedPackage.holidayType : '')
              }
              packageContext={
                selectedPackage
                  ? {
                      id: selectedPackage.id,
                      title: selectedPackage.title,
                      price: selectedPackage.inrPriceDisplay || selectedPackage.priceDisplay
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
