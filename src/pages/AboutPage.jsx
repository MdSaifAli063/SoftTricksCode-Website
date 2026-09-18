import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import About from '../components/sections/About';
import Team from '../components/sections/Team';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Soft Tricks Code | Company, Founders & Leadership"
        description="Meet the Soft Tricks Code leadership and engineering team building modern web apps, AI tools, and full-stack software solutions for high-growth companies."
        pathname="/about"
      />
      <PageBanner
        badge="About"
        title="Meet Soft Tricks Code"
        subtitle="Two founders on a mission to build software that solves real-world problems."
        breadcrumbs={['About']}
      />
      <About showTeamLink={false} pageMode />
      <Team />
    </>
  );
}
