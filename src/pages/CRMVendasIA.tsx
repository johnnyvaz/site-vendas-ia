import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lazy loaded CRM-specific components
const CRMHero = lazy(() => import('@/components/crm/CRMHero'));
const CRMFeatures = lazy(() => import('@/components/crm/CRMFeatures'));
const CRMMASPPartnership = lazy(() => import('@/components/crm/CRMMASPPartnership'));
const CRMPricing = lazy(() => import('@/components/crm/CRMPricing'));
// const CRMCaseStudies = lazy(() => import('@/components/crm/CRMCaseStudies'));
const CRMMandala = lazy(() => import('@/components/crm/CRMMandala'));
const CRMTechStack = lazy(() => import('@/components/crm/CRMTechStack'));
const CRMTargetAudience = lazy(() => import('@/components/crm/CRMTargetAudience'));
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

        {/* MASP Partnership Section */}
        {/* <Suspense fallback={<SectionSkeleton />}>
          <CRMMASPPartnership />
        </Suspense> */}

        {/* Mandala da Inovação */}
        {/* <Suspense fallback={<SectionSkeleton />}>
          <CRMMandala />
        </Suspense> */}

        {/* Case Studies */}
        {/* <Suspense fallback={<SectionSkeleton />}>
          <CRMCaseStudies />
        </Suspense> */}

        {/* Pricing */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMPricing />
        </Suspense>

        {/* Target Audience */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMTargetAudience />
        </Suspense>

        {/* Tech Stack */}
        <Suspense fallback={<SectionSkeleton />}>
          <CRMTechStack />
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