import { motion } from 'framer-motion';
import { Quote, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { founders } from '../../data/founders';
import SectionBadge from '../ui/SectionBadge';
import clsx from 'clsx';

const IMG_MAIN =
  'https://ik.imagekit.io/77nsbwefl/finalposter.png';
const IMG_SECOND =
  'https://ik.imagekit.io/77nsbwefl/final%20team.png';

function FounderAvatar({ founder }) {
  const src = founder.avatar || founder.photo;
  const precropped = Boolean(founder.avatar);

  return (
    <div
      className={clsx(
        'relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-stc-primary/30 bg-slate-100',
        !precropped && founder.imageVariant === 'cutout' && 'p-0.5'
      )}
    >
      <img
        src={src}
        alt={founder.name}
        className={clsx(
          'h-full w-full',
          precropped
            ? 'object-cover object-center'
            : founder.imageVariant === 'cutout'
              ? 'object-contain object-bottom'
              : 'object-cover object-[center_22%]'
        )}
        loading="lazy"
      />
    </div>
  );
}

export default function About({ showTeamLink = true, pageMode = false }) {
  const [saif, ashwini] = founders;

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
            <div className="relative flex flex-col gap-4 sm:grid sm:grid-cols-2">
              <img
                src={IMG_MAIN}
                alt="Team collaboration"
                className="aspect-[4/5] w-full rounded-3xl object-cover sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[280px]"
                loading="lazy"
              />
              <div
                className="absolute left-1/2 top-[42%] z-10 hidden h-12 w-12 -translate-x-1/2 rounded-full bg-stc-primary sm:left-[42%] sm:top-[38%] sm:block sm:h-20 sm:w-20 sm:translate-x-0"
                aria-hidden
              />
              <img
                src={IMG_SECOND}
                alt="Professional workspace"
                className="w-full rounded-3xl object-cover shadow-lg sm:mt-20"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:flex-row sm:gap-6">
                {[saif, ashwini].map((founder) => (
                  <div key={founder.id} className="flex items-center gap-3">
                    <FounderAvatar founder={founder} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stc-black">{founder.name}</p>
                      <p className="text-xs text-stc-muted">
                        {founder.id === 'saif' ? 'Founder & CEO' : 'Co-Founder'}, SoftTricksCode
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Quote className="hidden shrink-0 text-stc-primary/40 sm:block" size={48} />
            </div>

            {!pageMode && <SectionBadge className="mb-4">About Us</SectionBadge>}

            <h2 className="font-serif text-3xl font-bold leading-tight text-stc-black sm:text-4xl">
              {pageMode
                ? 'Full-Stack Software Built for Real Impact'
                : 'About Us — Building Better Digital Experiences'}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-stc-muted">
              Founded by {saif.name} and co-founder {ashwini.name}, SoftTricksCode helps startups
              and enterprises build modern websites, mobile apps, AI solutions, and custom software
              — from MVPs to enterprise platforms.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {showTeamLink && (
                <Link
                  to="/about"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-stc-primary py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-fly transition hover:bg-stc-primary-light sm:w-auto sm:justify-start"
                >
                  More About Us
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                {[saif, ashwini].map((founder) => (
                  <a
                    key={founder.id}
                    href={`tel:${founder.phoneTel}`}
                    className="flex items-center gap-3 transition hover:opacity-80"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stc-primary text-white">
                      <Phone size={20} />
                    </span>
                    <div>
                      <p className="text-xs text-stc-muted">
                        {founder.id === 'saif' ? 'Founder' : 'Co-Founder'} · Need help?
                      </p>
                      <p className="font-semibold text-stc-black">{founder.phone}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
