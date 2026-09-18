import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Services from '../components/sections/Services';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Software Development & AI Services"
        description="Explore custom web development, mobile apps, AI solutions, full-stack SaaS engineering, UI/UX design, and cloud consulting services from Soft Tricks Code."
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
