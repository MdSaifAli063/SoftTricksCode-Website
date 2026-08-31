import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Share2, ChevronLeft, ChevronRight, Phone, ArrowUpRight } from 'lucide-react';
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import { team } from '../../data/team';
import SectionBadge from '../ui/SectionBadge';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';

const SOCIAL_ICONS = [
  { key: 'github', Icon: FaGithub },
  { key: 'youtube', Icon: FaYoutube },
  { key: 'linkedin', Icon: FaLinkedin },
  { key: 'instagram', Icon: FaInstagram },
  { key: 'twitter', Icon: FaXTwitter },
];

function getPhotoClass(variant) {
  if (variant === 'cutout') {
    return 'object-contain object-bottom px-4 pt-6';
  }
  return 'object-cover';
}

function TeamCard({ member }) {
  const [hover, setHover] = useState(false);
  const [imgError, setImgError] = useState(false);
  const socials = SOCIAL_ICONS.filter(({ key }) => member.social?.[key]?.trim());

  if (member.hiring) {
    const careersPath = member.hiringPath || '/careers';
    return (
      <Link
        to={careersPath}
        className="group flex h-full min-h-[300px] flex-col items-center justify-center rounded-4xl border-2 border-dashed border-stc-primary/30 bg-stc-light p-8 text-center transition hover:border-stc-primary hover:bg-white hover:shadow-fly-card sm:min-h-[360px] lg:min-h-[420px]"
        aria-label="View open roles and apply"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-stc-primary text-3xl text-stc-primary transition group-hover:scale-105 group-hover:bg-stc-primary/10">
          +
        </div>
        <h3 className="mt-6 font-serif text-xl font-bold text-stc-black">{member.name}</h3>
        <p className="mt-1 font-medium text-stc-primary">{member.role}</p>
        <p className="mt-3 text-sm text-stc-muted">{member.bio}</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-stc-primary px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-stc-primary-light">
          View roles & apply
          <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    );
  }

  return (
    <article
      className="group relative min-h-[300px] overflow-hidden rounded-4xl bg-slate-200 shadow-md sm:min-h-[360px] lg:min-h-[420px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={member.avatar}
        alt={member.name}
        onError={() => setImgError(true)}
        className={clsx(
          'h-[300px] w-full object-[var(--team-photo-mobile-position)] transition duration-500 group-hover:scale-[1.03] sm:h-[360px] sm:object-[var(--team-photo-position)] lg:h-[420px]',
          imgError ? 'hidden' : getPhotoClass(member.imageVariant)
        )}
        style={{
          '--team-photo-mobile-position':
            member.mobileCropPosition || member.cropPosition || 'center 32%',
          '--team-photo-position': member.cropPosition || 'center 32%',
        }}
        loading="lazy"
        decoding="async"
      />

      {imgError && (
        <div className="flex h-[300px] items-center justify-center bg-slate-300 text-sm text-stc-muted sm:h-[360px] lg:h-[420px]">
          Photo unavailable
        </div>
      )}

      <button
        type="button"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stc-black/75 text-white backdrop-blur-sm transition hover:bg-stc-primary"
        aria-label={`Share ${member.name}`}
      >
        <Share2 size={18} />
      </button>

      <AnimatePresence>
        {hover && socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-4 top-16 z-20 flex flex-col gap-2"
          >
            {socials.map(({ key, Icon }) => (
              <a
                key={key}
                href={member.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stc-primary text-white shadow-fly"
                aria-label={key}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-stc-primary via-stc-primary/85 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-20 p-6 pt-16">
        <h3 className="font-serif text-xl font-bold leading-tight text-white sm:text-2xl">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-blue-100">{member.role}</p>
        {member.phone && (
          <a
            href={`tel:${member.phoneTel}`}
            className="pointer-events-auto mt-3 inline-flex items-center gap-2 text-sm text-white/95 transition hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <Phone size={14} />
            </span>
            {member.phone}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <section className="section-padding section-light overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionBadge className="mb-4">Our Team</SectionBadge>
            <h2 className="font-serif text-3xl font-bold text-stc-black sm:text-4xl">
              Creative Minds Building Innovative Solutions
            </h2>
            <p className="mt-3 text-stc-muted">
              Meet the founders and builders behind Soft Tricks Code.
            </p>
          </div>
          <div className="flex shrink-0 gap-2 self-start lg:self-auto">
            <button
              type="button"
              className="team-prev flex h-11 w-11 items-center justify-center rounded-full bg-stc-primary text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="team-next flex h-11 w-11 items-center justify-center rounded-full bg-stc-navy text-white"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ prevEl: '.team-prev', nextEl: '.team-next' }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {team.map((member) => (
            <SwiperSlide key={member.id} className="!h-auto">
              <TeamCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
