import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Portfolio from '../components/sections/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Seo
        title="Portfolio — Soft Tricks Code"
        description="See Soft Tricks Code website, AI, SaaS, and product design case studies delivering measurable business impact."
        pathname="/portfolio"
      />
      <PageBanner
        badge="Portfolio"
        title="Projects That Deliver Results"
        subtitle="Real solutions built for healthcare, agriculture, education, and more."
        breadcrumbs={['Portfolio']}
      />
      <Portfolio showAllLink={false} pageMode />
    </>
  );
}
