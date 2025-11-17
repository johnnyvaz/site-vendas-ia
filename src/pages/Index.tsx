import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Solutions from '@/components/Solutions';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

// Lazy loaded new components for better performance
const DisparoRapido = lazy(() => import('@/components/products/DisparoRapido'));
const Portfolio = lazy(() => import('@/components/products/Portfolio'));
const ConsentManager = lazy(() => import('@/components/forms/ConsentManager'));

// Loading component for lazy loaded sections
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">Carregando...</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Solutions />
        
        {/* Disparo Rápido showcase - lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <DisparoRapido />
        </Suspense>
        
        {/* Complete ecosystem portfolio - lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <Portfolio />
        </Suspense>
        
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      
      {/* LGPD Consent Manager - lazy loaded */}
      {/* <Suspense fallback={null}>
        <ConsentManager />
      </Suspense> */}
      
      {/* <CookieBanner /> */}
    </div>
  );
};

export default Index;
