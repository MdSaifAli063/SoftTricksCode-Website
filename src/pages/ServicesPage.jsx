import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Services from '../components/sections/Services';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services — Soft Tricks Code"
        description="Comprehensive web development, AI solutions, full-stack, SaaS, UI/UX, and cloud services from Soft Tricks Code."
        pathname="/services"
      />
      <PageBanner
        badge="Services"
        title="Full-Stack Software Solutions"
        subtitle="From concept to deployment — we handle every layer of your product."
        breadcrumbs={['Services']}
      />
      <Services showAllLink={false} pageMode />
    </>
  );
}
