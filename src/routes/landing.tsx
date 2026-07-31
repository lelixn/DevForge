import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/public-layout';
import { LandingNav } from '@/features/landing/components/LandingNav';
import { Hero } from '@/features/landing/components/Hero';
import { ProductPreview } from '@/features/landing/components/ProductPreview';
import { Features } from '@/features/landing/components/Features';
import { DevWorkflow } from '@/features/landing/components/DevWorkflow';
import { AIFeatures } from '@/features/landing/components/AIFeatures';
import { Testimonials } from '@/features/landing/components/Testimonials';
import { Pricing } from '@/features/landing/components/Pricing';
import { FAQ } from '@/features/landing/components/FAQ';
import { Footer } from '@/features/landing/components/Footer';

export const Route = createFileRoute('/landing')({
  component: LandingPage,
});

export function LandingPage() {
  return (
    <PublicLayout>
      <LandingNav />
      <Hero />
      <ProductPreview />
      <Features />
      <DevWorkflow />
      <AIFeatures />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </PublicLayout>
  );
}
