import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Share2, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
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

function TeamCard({ member }) {
  const [hover, setHover] = useState(false);
  const socials = SOCIAL_ICONS.filter(({ key }) => member.social?.[key]?.trim());

  if (member.hiring) {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-4xl border-2 border-dashed border-stc-primary/30 bg-stc-light p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-stc-primary text-3xl text-stc-primary">
          +
        </div>
        <h3 className="mt-6 font-serif text-xl font-bold text-stc-black">{member.name}</h3>
        <p className="mt-1 font-medium text-stc-primary">{member.role}</p>
        <p className="mt-3 text-sm text-stc-muted">{member.bio}</p>
      </div>
    );
  }

  return (
    <article
      className="group relative overflow-hidden rounded-4xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={member.avatar}
        alt={member.name}
        className="h-[380px] w-full object-cover object-top transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <button
        type="button"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-stc-black/80 text-white backdrop-blur-sm"
        aria-label="Share profile"
      >
        <Share2 size={18} />
      </button>

      {hover && socials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-4 top-16 flex flex-col gap-2"
        >
          {socials.map(({ key, Icon }) => (
            <a
              key={key}
              href={member.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-stc-primary text-white"
              aria-label={key}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      )}

      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-stc-primary/95 to-transparent p-6 transition',
          hover ? 'opacity-100' : 'opacity-0 sm:opacity-100'
        )}
      >
        <h3 className="font-serif text-xl font-bold text-white">{member.name}</h3>
        <p className="text-sm text-blue-100">{member.role}</p>
        {member.phone && (
          <a
            href={`tel:${member.phoneTel}`}
            className="mt-2 inline-flex items-center gap-1 text-xs text-white/90 hover:text-white"
          >
            <Phone size={12} /> {member.phone}
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
              Meet the founders and builders behind SoftTricksCode.
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
            <SwiperSlide key={member.id}>
              <TeamCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
