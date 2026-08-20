import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolio, portfolioCategories } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import CircleArrowBtn from '../ui/CircleArrowBtn';
import GlowButton from '../ui/GlowButton';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';

function ProjectPreview({ project, variant = 'carousel' }) {
  const isContain = project.imageFit === 'contain';
  const isCarousel = variant === 'carousel';

  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden',
        isCarousel
          ? 'min-h-[220px] bg-gradient-to-br from-slate-900 via-stc-navy to-slate-900 p-4 sm:min-h-[280px] sm:p-5 md:min-h-[340px]'
          : 'bg-slate-100',
        !isCarousel && 'aspect-[16/10] overflow-hidden',
      )}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className={clsx(
          'w-full rounded-lg',
          isContain
            ? isCarousel
              ? 'max-h-[200px] object-contain object-top shadow-xl ring-1 ring-white/10 sm:max-h-[260px] md:max-h-[300px]'
              : 'h-full max-h-full object-contain object-top p-3'
            : isCarousel
              ? 'h-full min-h-[220px] object-cover md:min-h-[280px]'
              : 'h-full w-full object-cover transition duration-500 group-hover:scale-105'
        )}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=560&q=80';
        }}
      />
    </div>
  );
}

export default function Portfolio({ limit, showAllLink = true, pageMode = false }) {
  const [filter, setFilter] = useState('All');
  const items = limit ? portfolio.slice(0, limit) : portfolio;
  const filtered = filter === 'All' ? items : items.filter((p) => p.category === filter);
  const carouselItems = limit ? portfolio.slice(0, 4) : portfolio.slice(0, 5);

  if (!pageMode && limit) {
    return (
      <section id="portfolio" className="section-padding section-dark overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Projects"
            title="Our Projects Reflect Innovation and Quality"
            subtitle="Real solutions built for healthcare, agriculture, education, and enterprise clients."
            split
            actionLabel="View Portfolio"
            actionTo="/portfolio"
          />

          <div className="overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.portfolio-prev',
              nextEl: '.portfolio-next',
            }}
            breakpoints={{ 640: { spaceBetween: 24 } }}
            className="!overflow-hidden pb-4"
          >
            {carouselItems.map((project) => (
              <SwiperSlide key={project.id}>
                <article className="fly-glass grid overflow-hidden md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <ProjectPreview project={project} variant="carousel" />
                  <div className="relative flex flex-col justify-center p-6 sm:p-8">
                    <span className="mb-2 inline-flex w-fit rounded-full border border-stc-primary/40 bg-stc-primary/15 px-3 py-1 text-xs font-semibold text-stc-primary-light">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stc-gray sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/85"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-stc-primary"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              className="portfolio-prev flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-stc-primary"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="portfolio-next flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-stc-primary"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className={`section-padding ${pageMode ? 'section-light !pt-12' : 'section-dark'}`}>
      <div className="mx-auto max-w-7xl">
        {!pageMode && (
          <SectionHeading
            badge="Our Projects"
            title="Our Projects Reflect Innovation and Quality"
            subtitle="Browse our work across industries."
            variant="dark"
          />
        )}

        {!limit && (
          <div className="touch-scroll-x mb-8 gap-2 px-1 pb-2 sm:mb-10 sm:flex sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={clsx(
                  'shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition',
                  filter === cat
                    ? 'bg-stc-primary text-white'
                    : pageMode
                      ? 'border border-slate-200 bg-white text-stc-muted hover:border-stc-primary'
                      : 'border border-white/20 text-stc-gray hover:border-stc-primary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={clsx(
                  'group relative overflow-hidden rounded-3xl',
                  pageMode
                    ? 'border border-slate-200 bg-white shadow-md'
                    : 'fly-glass'
                )}
              >
                <ProjectPreview project={project} variant="grid" />
                <div className="p-5">
                  <span className="text-xs font-semibold text-stc-primary">{project.category}</span>
                  <h3
                    className={clsx(
                      'mt-1 font-serif text-lg font-bold',
                      pageMode ? 'text-stc-black' : 'text-white'
                    )}
                  >
                    {project.title}
                  </h3>
                  <p className={clsx('mt-2 text-sm line-clamp-2', pageMode ? 'text-stc-muted' : 'text-stc-gray')}>
                    {project.description}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 transition group-hover:opacity-100">
                  <CircleArrowBtn href={project.github} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {showAllLink && (
          <div className="mt-12 text-center">
            <GlowButton href="https://github.com/MdSaifAli063" variant={pageMode ? 'outline-dark' : 'outline'}>
              View All on GitHub
            </GlowButton>
          </div>
        )}
      </div>
    </section>
  );
}
