import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { Home, Mail } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import SectionBadge from '../components/ui/SectionBadge';
import { SITE } from '../constants/site';

const quickLinks = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 — Soft Tricks Code"
        description="Page not found — return to the Soft Tricks Code homepage for software development, AI, and cloud solutions."
        pathname="/404"
        image="/favicon.svg"
        robots="noindex, follow"
      />

      <section className="hero-flytech flex min-h-[85vh] flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <div className="container-page relative z-10">
          <SectionBadge className="mb-6">Error 404</SectionBadge>

          <p className="font-serif text-[5.5rem] font-bold leading-none text-white/10 xs:text-[7rem] sm:text-[9rem]">
            404
          </p>
          <h1 className="-mt-10 font-serif text-2xl font-bold text-white xs:-mt-12 xs:text-3xl sm:-mt-16 sm:text-4xl md:text-5xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-stc-gray">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s
            get you back on track.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton to="/" className="w-full gap-2 sm:w-auto">
              <Home size={18} /> Back to Home
            </GlowButton>
            <GlowButton to="/contact" variant="outline" className="w-full sm:w-auto">
              Contact Us
            </GlowButton>
          </div>

          <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stc-gray transition hover:border-stc-primary/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href={`mailto:${SITE.email}`}
            className="mt-10 inline-flex items-center gap-2 text-sm text-stc-gray transition hover:text-stc-primary-light"
          >
            <Mail size={16} />
            {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
