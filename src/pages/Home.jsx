import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import ServiceHighlights from '../components/sections/ServiceHighlights';
import About from '../components/sections/About';
import ClientLogos from '../components/sections/ClientLogos';
import Services from '../components/sections/Services';
import WhyChoose from '../components/sections/WhyChoose';
import StatsBar from '../components/sections/StatsBar';
import Portfolio from '../components/sections/Portfolio';
import Pricing from '../components/sections/Pricing';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SoftTricksCode — Smart Software Solutions</title>
        <meta
          name="description"
          content="Innovate with smart IT solutions for business growth. Web, mobile, AI, and custom software by SoftTricksCode."
        />
      </Helmet>
      <Hero />
      <ServiceHighlights />
      <About />
      <ClientLogos />
      <Services limit={6} showFeatured />
      <WhyChoose />
      <StatsBar />
      <Portfolio limit={3} />
      <Pricing compact />
      <Testimonials />
      <FAQ />
      <Contact showHeading={false} />
    </>
  );
}
