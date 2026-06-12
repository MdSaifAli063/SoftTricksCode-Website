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
        title="SoftTricksCode | Software Services & AI Solutions, Web Development"
        description="SoftTricksCode delivers modern web applications, AI-powered solutions, software consulting, cloud services, and full-stack development for businesses and startups."
        pathname="/"
        image="https://ik.imagekit.io/77nsbwefl/SoftTricksCode_HD_8000x8000.png"
      />
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
