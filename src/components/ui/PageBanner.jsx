import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import SectionBadge from './SectionBadge';

export default function PageBanner({ badge, title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="hero-flytech border-b border-white/10 pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="container-page relative z-10">
        {breadcrumbs.length > 0 && (
          <nav
            className="mb-4 flex flex-wrap items-center gap-1 text-xs text-stc-gray sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-white">
              <Home size={14} /> Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb} className="flex items-center gap-1">
                <ChevronRight size={14} className="opacity-50" />
                <span className="text-stc-primary-light">{crumb}</span>
              </span>
            ))}
          </nav>
        )}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          {badge && <SectionBadge className="mb-4">{badge}</SectionBadge>}
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-stc-gray sm:text-lg">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
