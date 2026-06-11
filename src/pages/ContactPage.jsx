import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact — Soft Tricks Code"
        description="Contact Soft Tricks Code for website development, AI solutions, SaaS, and software consulting with fast response times."
        pathname="/contact"
        image="/favicon.svg"
      />
      <PageBanner
        badge="Contact"
        title="Let's Build Something Great"
        subtitle="Tell us about your project — we respond within 24 hours."
        breadcrumbs={['Contact']}
      />
      <Contact pageMode />
    </>
  );
}
