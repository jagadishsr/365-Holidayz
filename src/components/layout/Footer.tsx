import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { CLIENT_ASSETS } from '../../data/stockImages';

const FOOTER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Travel Guide', href: '/travel-guide' },
  { label: 'Happy Clients', href: '/happy-clients' },
  { label: 'Contact', href: '/contact' }
];

const FEATURED_LINKS = [
  { label: 'Malaysia – Langkawi', href: '/destinations/malaysia' },
  { label: 'Maldives', href: '/destinations/maldives' },
  { label: 'Vietnam – Phu Quoc', href: '/destinations/vietnam' },
  { label: 'Thailand – Krabi & Phuket', href: '/destinations/thailand' },
  { label: 'Indonesia – Bali', href: '/destinations/bali' },
  { label: 'Singapore', href: '/destinations/singapore' },
  { label: 'Dubai & UAE', href: '/destinations/dubai' },
  { label: 'Mauritius', href: '/destinations/mauritius' }
];

export const Footer: React.FC = () => {
  const { phone1, phone2, email, instagram, facebook } = CLIENT_ASSETS.verifiedContacts;

  return (
    <footer className="bg-[#111827] text-[#FAF9F6] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white overflow-hidden shrink-0">
                <img
                  src={CLIENT_ASSETS.logo}
                  alt="365Holidayz"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-white block">
                  365Holidayz
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#9CA3AF]">
                  Premium Tours &amp; Travel
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#D1D5DB] leading-relaxed max-w-md">
              Over three decades of hands-on international travel curation. Private stays, verified local partners, and thoughtful routing tailored around your pace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="365Holidayz on Instagram"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-medium text-white hover:bg-white hover:text-[#111827] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="365Holidayz on Facebook"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-medium text-white hover:bg-white hover:text-[#111827] transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[#E5E7EB] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature Destinations Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FEATURED_LINKS.map((dest) => (
                <li key={dest.href}>
                  <Link
                    to={dest.href}
                    className="text-[#E5E7EB] hover:text-white transition-colors"
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Booking Desk Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
              India Booking Desk
            </h3>
            <div className="space-y-3 text-sm text-[#E5E7EB]">
              <a
                href={`tel:${phone1.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#D94E28] shrink-0" />
                <span>{phone1}</span>
              </a>
              <a
                href={`tel:${phone2.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#D94E28] shrink-0" />
                <span>{phone2}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                <span>{email}</span>
              </a>
            </div>
            <p className="text-xs text-[#9CA3AF] pt-2 leading-relaxed">
              In association with 365Eventz for destination weddings, milestone celebrations, and corporate retreats.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} 365Holidayz. Your world, expertly curated.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Our Heritage
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Speak With Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
