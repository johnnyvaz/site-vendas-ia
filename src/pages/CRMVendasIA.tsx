import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lazy loaded CRM-specific components
const CRMHero = lazy(() => import('@/components/crm/CRMHero'));
const CRMFeatures = lazy(() => import('@/components/crm/CRMFeatures'));
const CRMPricing = lazy(() => import('@/components/crm/CRMPricing'));
const CRMFinalCTA = lazy(() => import('@/components/crm/CRMFinalCTA'));

// Loading component for lazy loaded sections
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">Carregando...</div>
  </div>
);

const CRMVendasIA = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMHero />
        </Suspense>

        {/* Features Section */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMFeatures />
        </Suspense>

        {/* Pricing */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMPricing />
        </Suspense>

        {/* Final CTA */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMFinalCTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CRMVendasIA;