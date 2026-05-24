import { Helmet } from 'react-helmet-async';
import PageBanner from '../components/ui/PageBanner';
import Portfolio from '../components/sections/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio — SoftTricksCode</title>
        <meta
          name="description"
          content="Explore our projects across healthcare, AI, EdTech, mobile, and web development."
        />
      </Helmet>
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
