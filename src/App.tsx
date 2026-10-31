/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { HolidayTypesPage } from './pages/HolidayTypesPage';
import { HolidayTypeDetailPage } from './pages/HolidayTypeDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { AboutPage } from './pages/AboutPage';
import { PlanYourTripPage } from './pages/PlanYourTripPage';
import { EnquiryForm } from './components/common/EnquiryForm';
import { X } from 'lucide-react';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Dynamically detect subdirectory basename (e.g. /365/) for hosting under arbitrary subfolders
const getSubdirectoryBasename = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const knownRoutes = ['destinations', 'holiday-types', 'packages', 'travel-guide', 'about', 'plan-your-trip'];
  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
  if (firstSegment && !knownRoutes.includes(firstSegment)) {
    return `/${firstSegment}`;
  }
  return undefined;
};

export default function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const handleOpenEnquiry = () => {
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryModalOpen(false);
  };

  return (
    <BrowserRouter basename={getSubdirectoryBasename()}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-[#010048] font-sans antialiased selection:bg-[#010048] selection:text-[#f3e098]">
        {/* Approved Navigation Header */}
        <Header onOpenEnquiry={handleOpenEnquiry} />

        {/* Main Content View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
            <Route path="/holiday-types" element={<HolidayTypesPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/holiday-types/:slug" element={<HolidayTypeDetailPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/travel-guide" element={<TravelGuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/plan-your-trip" element={<PlanYourTripPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />
          </Routes>
        </main>

        {/* Brand Footer */}
        <Footer />

        {/* Global Quick Plan Your Trip Modal */}
        {isEnquiryModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000032]/80 backdrop-blur-xs animate-in fade-in"
            onClick={handleCloseEnquiry}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-enquiry-modal"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl bg-white animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseEnd => handleCloseEnquiry()}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <EnquiryForm onSuccess={handleCloseEnquiry} className="border-0 shadow-none" />
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
