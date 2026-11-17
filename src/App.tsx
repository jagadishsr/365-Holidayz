import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { HolidayTypeDetailPage } from './pages/HolidayTypeDetailPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { AboutPage } from './pages/AboutPage';
import { HappyClientsPage } from './pages/HappyClientsPage';
import { ContactPage } from './pages/ContactPage';
import { EnquiryForm } from './components/common/EnquiryForm';
import { FlashOffersDrawer } from './components/common/FlashOffersDrawer';
import { usePackagesData } from './services/googleSheetsPackages';
import { Package } from './types';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);
  return null;
}

function getSubdirectoryBasename(): string {
  if (typeof window === 'undefined') return '/';
  const knownRoutes = [
    'destinations',
    'holiday-types',
    'packages',
    'travel-guide',
    'happy-clients',
    'about',
    'contact',
    'plan-your-trip'
  ];
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length > 0 && !knownRoutes.includes(segments[0])) {
    return `/${segments[0]}`;
  }
  return '/';
}

export function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryPackageContext, setEnquiryPackageContext] = useState<Package | undefined>(undefined);
  const { packages, loading: packagesLoading, status: sheetStatus, refresh: refreshPackages } =
    usePackagesData();

  const basename = getSubdirectoryBasename();

  const handleOpenEnquiry = (pkg?: Package) => {
    setEnquiryPackageContext(pkg);
    setEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalOpen(false);
    setEnquiryPackageContext(undefined);
  };

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111827] selection:bg-[#010048] selection:text-[#FAF9F6]">
        <Header onOpenEnquiry={() => handleOpenEnquiry()} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  packages={packages}
                  packagesLoading={packagesLoading}
                  onOpenEnquiry={() => handleOpenEnquiry()}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/destinations"
              element={
                <DestinationsPage
                  packages={packages}
                  packagesLoading={packagesLoading}
                  sheetStatus={sheetStatus}
                  onRefreshPackages={refreshPackages}
                />
              }
            />
            <Route
              path="/destinations/:slug"
              element={<DestinationDetailPage packages={packages} />}
            />
            <Route
              path="/packages"
              element={<Navigate to="/destinations" replace />}
            />
            <Route
              path="/packages/:id"
              element={<PackageDetailPage packages={packages} />}
            />
            <Route
              path="/holiday-types"
              element={<Navigate to="/destinations" replace />}
            />
            <Route
              path="/holiday-types/:slug"
              element={<HolidayTypeDetailPage packages={packages} />}
            />
            <Route
              path="/travel-guide"
              element={<TravelGuidePage packages={packages} />}
            />
            <Route path="/happy-clients" element={<HappyClientsPage />} />
            <Route path="/contact" element={<ContactPage packages={packages} />} />
            <Route path="/plan-your-trip" element={<ContactPage packages={packages} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Persistent Right-Edge FLASH OFFERS Hanging Tab & Drawer */}
        <FlashOffersDrawer
          packages={packages}
          onEnquirePackage={(pkg) => handleOpenEnquiry(pkg)}
        />

        {/* Global Bespoke Enquiry Modal */}
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl my-auto max-h-[90vh] overflow-y-auto border border-[#E5E2DC]">
              <button
                type="button"
                onClick={handleCloseEnquiry}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white text-[#4B5563] hover:text-[#111827] border border-[#E5E2DC] transition-colors cursor-pointer"
                aria-label="Close enquiry modal"
              >
                <X className="w-5 h-5" />
              </button>
              <EnquiryForm
                onSuccess={handleCloseEnquiry}
                initialDestination={enquiryPackageContext?.destination}
                initialHolidayType={enquiryPackageContext?.holidayType}
                packageContext={
                  enquiryPackageContext
                    ? {
                        id: enquiryPackageContext.id,
                        title: enquiryPackageContext.title,
                        price:
                          enquiryPackageContext.inrPriceDisplay ||
                          enquiryPackageContext.priceDisplay
                      }
                    : undefined
                }
                className="border-0 shadow-none"
              />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
