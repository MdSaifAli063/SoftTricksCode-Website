import { Helmet } from 'react-helmet-async';
import PageBanner from '../components/ui/PageBanner';
import Services from '../components/sections/Services';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — SoftTricksCode</title>
        <meta
          name="description"
          content="Web development, mobile apps, AI/ML, healthcare, agriculture, EdTech, cloud, and cybersecurity services."
        />
      </Helmet>
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
