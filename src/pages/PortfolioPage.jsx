import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Portfolio from '../components/sections/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Seo
        title="Portfolio & Case Studies"
        description="Explore Soft Tricks Code portfolio case studies showcasing high-performance websites, AI solutions, SaaS platforms, and digital products driving client ROI."
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
