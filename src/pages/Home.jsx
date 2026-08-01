import Seo from '../components/ui/Seo';
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
      <Seo
        title="SoftTricksCode | Software Development, AI Solutions, Web & Mobile App Development"
        description="SoftTricksCode is a leading software company providing website development, mobile app development, AI solutions, cloud services, SaaS products, and custom software development for startups and enterprises."
        pathname="/"
      />

      <Hero />
      <ServiceHighlights />
      <ClientLogos />
      <Services limit={6} showFeatured />
      <WhyChoose />
      <StatsBar />
      <Portfolio limit={3} />
      <Pricing compact />
      <About />
      <Testimonials />
      <FAQ />
      <Contact showHeading={false} />
    </>
  );
}
