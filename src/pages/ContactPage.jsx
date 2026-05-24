import { Helmet } from 'react-helmet-async';
import PageBanner from '../components/ui/PageBanner';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — SoftTricksCode</title>
        <meta
          name="description"
          content="Get in touch with SoftTricksCode for a free consultation. Call Md Saif Ali or Ashwini T Gadad."
        />
      </Helmet>
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
