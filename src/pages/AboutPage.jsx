import { Helmet } from 'react-helmet-async';
import PageBanner from '../components/ui/PageBanner';
import About from '../components/sections/About';
import Team from '../components/sections/Team';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — SoftTricksCode</title>
        <meta
          name="description"
          content="Meet Md Saif Ali, Ashwini T Gadad, and the SoftTricksCode team."
        />
      </Helmet>
      <PageBanner
        badge="About"
        title="Meet SoftTricksCode"
        subtitle="Two founders on a mission to build software that solves real-world problems."
        breadcrumbs={['About']}
      />
      <About showTeamLink={false} pageMode />
      <Team />
    </>
  );
}
