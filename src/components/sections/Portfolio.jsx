import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Smartphone,
  Sparkles,
  HeartPulse,
  GraduationCap,
  Layers,
  Code2,
} from 'lucide-react';
import { portfolio, portfolioCategories } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import CircleArrowBtn from '../ui/CircleArrowBtn';
import GlowButton from '../ui/GlowButton';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';

const categoryIcons = {
  Web: Globe,
  Mobile: Smartphone,
  AI: Sparkles,
  Healthcare: HeartPulse,
  EdTech: GraduationCap,
  All: Layers,
};

function ProjectPreview({ project, variant = 'carousel' }) {
  const isCarousel = variant === 'carousel';

  return (
    <div
      className={clsx(
        'group/img relative w-full overflow-hidden bg-slate-950',
        isCarousel
          ? 'h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px]'
          : 'aspect-[16/10]'
      )}
    >
      {/* Sleek browser window control pill */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-slate-950/60 px-2.5 py-1 backdrop-blur-md border border-white/15 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-rose-500/90" />
        <span className="h-2 w-2 rounded-full bg-amber-500/90" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/90" />
      </div>

      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover/img:scale-105"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=560&q=80';
        }}
      />

      {/* Subtle bottom shadow vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20" />
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
      <section id="portfolio" className="section-padding section-light overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Our Projects"
            title="Our Projects Reflect Innovation and Quality"
            subtitle="Real solutions built for healthcare, agriculture, education, and enterprise clients."
            split
            variant="light"
            actionLabel="View Portfolio"
            actionTo="/portfolio"
          />

          <div className="overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            observer={true}
            observeParents={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.portfolio-prev',
              nextEl: '.portfolio-next',
            }}
            breakpoints={{ 640: { spaceBetween: 24 } }}
            className="!overflow-hidden pb-4"
          >
            {carouselItems.map((project) => {
              const CategoryIcon = categoryIcons[project.category] || Code2;

              return (
                <SwiperSlide key={project.id} className="!h-auto">
                  <article className="fly-service-card group grid h-full overflow-hidden items-stretch md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                    <ProjectPreview project={project} variant="carousel" />
                    <div className="fly-service-panel relative">
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stc-primary/40 bg-stc-primary/20 shadow-sm">
                              <CategoryIcon className="text-stc-primary-light" size={22} />
                            </span>
                            <span className="rounded-full border border-stc-primary/40 bg-stc-primary/15 px-3.5 py-1 text-xs font-semibold text-stc-primary-light">
                              {project.category}
                            </span>
                          </div>

                          <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-3xl">
                            {project.title}
                          </h3>

                          <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/90 sm:text-base">
                            {project.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-stc-primary/40 bg-stc-primary/15 px-2.5 py-0.5 text-xs font-medium text-blue-100"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <CircleArrowBtn href={project.github} label={`View ${project.title}`} />
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              className="portfolio-prev flex h-11 w-11 items-center justify-center rounded-full bg-stc-primary text-white shadow-sm transition hover:bg-stc-primary-light"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="portfolio-next flex h-11 w-11 items-center justify-center rounded-full bg-stc-navy text-white shadow-sm transition hover:bg-stc-primary"
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
            {filtered.map((project) => {
              const CategoryIcon = categoryIcons[project.category] || Code2;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={clsx(
                    'group relative overflow-hidden rounded-4xl transition-all duration-300 hover:-translate-y-1 hover:shadow-fly-lg',
                    pageMode
                      ? 'border border-slate-200 bg-white shadow-md'
                      : 'fly-service-card'
                  )}
                >
                  <ProjectPreview project={project} variant="grid" />
                  <div
                    className={clsx(
                      'p-6',
                      !pageMode && 'fly-service-panel !p-6'
                    )}
                  >
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                              pageMode
                                ? 'bg-stc-primary/15 text-stc-primary'
                                : 'border border-stc-primary/40 bg-stc-primary/20 text-stc-primary-light'
                            )}
                          >
                            <CategoryIcon size={14} />
                            {project.category}
                          </span>
                        </div>

                        <h3
                          className={clsx(
                            'mt-3 font-serif text-xl font-bold leading-snug',
                            pageMode ? 'text-stc-black' : 'text-white'
                          )}
                        >
                          {project.title}
                        </h3>

                        <p
                          className={clsx(
                            'mt-2 text-sm line-clamp-2 leading-relaxed',
                            pageMode ? 'text-stc-muted' : 'text-blue-100/90'
                          )}
                        >
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tech?.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className={clsx(
                                'rounded-full px-2.5 py-0.5 text-xs font-medium',
                                pageMode
                                  ? 'bg-slate-100 text-slate-700'
                                  : 'border border-stc-primary/35 bg-stc-primary/15 text-blue-100'
                              )}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <CircleArrowBtn href={project.github} label={`View ${project.title}`} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
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
