import { useState, useEffect } from 'react';
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
  X,
  ZoomIn,
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

function ProjectPreview({ project, variant = 'carousel', onClick }) {
  const isCarousel = variant === 'carousel';

  return (
    <div
      onClick={() => onClick && onClick(project)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(project);
        }
      }}
      aria-label={`View full image for ${project.title}`}
      className={clsx(
        'group/img relative w-full overflow-hidden bg-slate-950',
        onClick && 'cursor-zoom-in',
        isCarousel
          ? 'aspect-[16/10] sm:aspect-[16/10] md:aspect-auto md:h-full md:min-h-[380px] lg:min-h-[440px]'
          : 'aspect-[16/10]'
      )}
    >
      {/* Sleek browser window control pill */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-slate-950/70 px-2.5 py-1 backdrop-blur-md border border-white/15 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-rose-500/90" />
        <span className="h-2 w-2 rounded-full bg-amber-500/90" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/90" />
      </div>

      {/* Hover zoom indicator */}
      <div className="pointer-events-none absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 backdrop-blur-md border border-white/15 transition-opacity duration-300 group-hover/img:opacity-100">
        <ZoomIn size={15} />
      </div>

      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover/img:scale-105"
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

function LightboxModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-2.5 sm:p-6 backdrop-blur-xl"
        >
          {/* Top Bar with Cancel / Close button */}
          <div className="absolute top-3 right-3 z-[10000] flex items-center gap-2 sm:top-6 sm:right-6">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md border border-white/30 transition hover:bg-rose-600 hover:border-rose-600 shadow-2xl active:scale-95 cursor-pointer"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[94vh] max-w-6xl w-full overflow-hidden rounded-2xl bg-slate-900 border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          >
            {/* Full Image Container */}
            <div className="relative flex-1 overflow-auto bg-slate-950 flex items-center justify-center p-2 sm:p-4 min-h-[40vh] max-h-[72vh] sm:max-h-[78vh]">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[70vh] sm:max-h-[76vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
            </div>

            {/* Bottom Footer Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-slate-950 px-4 py-3 sm:px-6 sm:py-4 border-t border-white/10">
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-serif text-sm sm:text-lg font-bold text-white">
                  {project.title}
                </h4>
                <p className="truncate text-[11px] text-stc-gray sm:text-sm mt-0.5">
                  {project.category} • {project.tech?.join(', ')}
                </p>
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-stc-primary px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-stc-primary-light shadow-fly shrink-0"
                >
                  Visit Website ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio({ limit, showAllLink = true, pageMode = false }) {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

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
                    <ProjectPreview project={project} variant="carousel" onClick={setSelectedProject} />
                    <div className="fly-service-panel relative !p-5 sm:!p-7 md:!p-8">
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <span className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-stc-primary/40 bg-stc-primary/20 shadow-sm">
                              <CategoryIcon className="text-stc-primary-light" size={18} />
                            </span>
                            <span className="rounded-full border border-stc-primary/40 bg-stc-primary/15 px-3 py-0.5 sm:px-3.5 sm:py-1 text-xs font-semibold text-stc-primary-light">
                              {project.category}
                            </span>
                          </div>

                          <h3 className="mt-3 sm:mt-5 font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl leading-snug">
                            {project.title}
                          </h3>

                          <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-blue-100/90 md:text-base">
                            {project.description}
                          </p>

                          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-stc-primary/40 bg-stc-primary/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-blue-100"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6 flex justify-end">
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

        <LightboxModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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
                  <ProjectPreview project={project} variant="grid" onClick={setSelectedProject} />
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

      <LightboxModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
