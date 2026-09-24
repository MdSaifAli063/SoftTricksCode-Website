import { lazy, Suspense } from 'react';
import Seo from '../components/ui/Seo';
import Hero from '../components/sections/Hero';
import ServiceHighlights from '../components/sections/ServiceHighlights';
import ClientLogos from '../components/sections/ClientLogos';
import LazySection from '../components/ui/LazySection';

const Services = lazy(() => import('../components/sections/Services'));
const ProductsTeaser = lazy(() => import('../components/sections/ProductsTeaser'));
const WhyChoose = lazy(() => import('../components/sections/WhyChoose'));
const StatsBar = lazy(() => import('../components/sections/StatsBar'));
const Portfolio = lazy(() => import('../components/sections/Portfolio'));
const Pricing = lazy(() => import('../components/sections/Pricing'));
const About = lazy(() => import('../components/sections/About'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const Contact = lazy(() => import('../components/sections/Contact'));

export default function Home() {
  return (
    <>
      <Seo
        title="Soft Tricks Code | Software Development & AI Solutions"
        description="Soft Tricks Code provides custom web development, mobile apps, SaaS platforms, AI solutions, and software consulting engineered for growing global businesses."
        pathname="/"
      />

      <Hero />
      <ServiceHighlights />
      <ClientLogos />
      
      <Suspense fallback={null}>
        <Services limit={6} showFeatured />
        <ProductsTeaser />
        <WhyChoose />
        <StatsBar />
        <LazySection minHeight="400px">
          <Portfolio limit={3} />
        </LazySection>
        <LazySection minHeight="400px">
          <Pricing compact />
        </LazySection>
        <LazySection minHeight="300px">
          <About />
        </LazySection>
        <LazySection minHeight="300px">
          <Testimonials />
        </LazySection>
        <LazySection minHeight="300px">
          <FAQ />
        </LazySection>
        <LazySection minHeight="400px">
          <Contact showHeading={false} />
        </LazySection>
      </Suspense>
    </>
  );
}

