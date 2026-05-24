import { motion } from 'framer-motion';
import { Quote, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { founders } from '../../data/founders';
import SectionBadge from '../ui/SectionBadge';
import GlowButton from '../ui/GlowButton';
import { SITE } from '../../constants/site';

const IMG_MAIN =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=650&fit=crop';
const IMG_SECOND =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop';

export default function About({ showTeamLink = true, pageMode = false }) {
  const saif = founders[0];

  return (
    <section id="about" className="section-padding section-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-4">
              <img
                src={IMG_MAIN}
                alt="Team collaboration"
                className="col-span-1 row-span-2 h-full min-h-[280px] w-full rounded-3xl object-cover"
                loading="lazy"
              />
              <div className="absolute left-[42%] top-[38%] z-10 h-16 w-16 rounded-full bg-stc-primary sm:h-20 sm:w-20" aria-hidden />
              <img
                src={IMG_SECOND}
                alt="Professional workspace"
                className="col-span-1 mt-16 w-full rounded-3xl object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-start gap-4">
              <img
                src={saif.photo}
                alt={saif.name}
                className="h-14 w-14 rounded-full border-2 border-stc-primary/30 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-stc-black">{saif.name}</p>
                <p className="text-xs text-stc-muted">Founder, SoftTricksCode</p>
              </div>
              <Quote className="shrink-0 text-stc-primary/40" size={48} />
            </div>

            {!pageMode && <SectionBadge className="mb-4">About Us</SectionBadge>}

            <h2 className="font-serif text-3xl font-bold leading-tight text-stc-black sm:text-4xl">
              {pageMode
                ? 'Full-Stack Software Built for Real Impact'
                : 'About Us — Building Better Digital Experiences'}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-stc-muted">
              Founded by Md Saif Ali and co-founder Ashwini T Gadad, SoftTricksCode helps startups
              and enterprises build modern websites, mobile apps, AI solutions, and custom software
              — from MVPs to enterprise platforms.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {showTeamLink && (
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 rounded-full bg-stc-primary py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-fly transition hover:bg-stc-primary-light"
                >
                  More About Us
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              )}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stc-primary text-white"
                >
                  <Phone size={20} />
                </a>
                <div>
                  <p className="text-xs text-stc-muted">Need any help?</p>
                  <p className="font-semibold text-stc-black">{SITE.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
