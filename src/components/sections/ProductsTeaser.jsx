import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  Terminal,
} from 'lucide-react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';
import { FeatureSteps } from '../ui/feature-section';

const PRODUCT_STAGES = [
  {
    step: 'Phase 01',
    badge: 'PaaS Foundation',
    title: 'Scalable Platform (PaaS) & Cloud Infrastructure',
    content:
      'Engineered multi-region cloud platform infrastructure with enterprise PaaS orchestration, automated load balancing, and resilient micro-service meshes.',
    image: '/images/products/feature-step-1.jpg',
  },
  {
    step: 'Phase 02',
    badge: 'SaaS Solutions',
    title: 'Intelligent SaaS & Multi-Device Software',
    content:
      'We architect intuitive, high-speed SaaS products connected seamlessly across mobile applications, desktop portals, cloud databases, and application servers.',
    image: '/images/products/feature-step-2.jpg',
  },
  {
    step: 'Phase 03',
    badge: 'Unified Architecture',
    title: 'Full-Tier Cloud Ecosystem & Live Sync',
    content:
      'End-to-end synchronized digital products connecting physical cloud infrastructure, containerized code, and real-time user dashboards.',
    image: '/images/products/feature-step-3.jpg',
  },
];

const PRODUCT_SLIDES = [
  {
    id: 'dailydoubt',
    src: '/images/products/dailydoubt-showcase.jpg',
    alt: 'Dailydoubt — Digital Business & Shop Ledger developed by Soft Tricks Code',
    title: 'Dailydoubt',
    badge: 'Live & Active',
    badgeType: 'live',
    tagline: 'Your Digital Business & Shop Ledger, Made Simple.',
    caption: 'Dailydoubt — Digital Shop Ledger & GST Invoicing (Live on Web & Android)',
    url: 'https://www.dailydoubt.com',
    ctaText: 'Visit Dailydoubt',
    isExternal: true,
  },
  {
    id: 'ui-builder',
    src: '/images/products/ui-builder-showcase.jpg',
    alt: 'STC UI Builder — Visual Drag-and-Drop Website & UI Builder Studio',
    title: 'STC UI Builder',
    badge: 'Coming Soon',
    badgeType: 'upcoming',
    tagline: 'Next-Generation Visual Drag-and-Drop UI & Web Studio.',
    caption: 'STC UI Builder — Visual Web Canvas & React Code Studio (Coming Soon)',
    url: '/products',
    ctaText: 'Explore Pipeline',
    isExternal: false,
  },
];

export default function ProductsTeaser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide carousel every 3.8s, pausing on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PRODUCT_SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? PRODUCT_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % PRODUCT_SLIDES.length);
  };

  return (
    <section id="products-teaser" className="section-padding section-dark relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-stc-primary/25 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[32rem] w-[32rem] rounded-full bg-stc-cyan/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-blue-600/15 blur-[130px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Exact Split Section Heading with Dark Theme */}
        <SectionHeading
          badge="Our Products"
          title="Engineering Scalable Software & Digital Products"
          subtitle="Beyond client engineering services — we actively architect, launch, and operate our own proprietary software products built for real-world impact."
          variant="dark"
          split={true}
          actionLabel="View All Products"
          actionTo="/products"
        />

        {/* Animated Feature Steps Showcase with Light & Good Images (Placed Before Terminal Card) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 sm:mt-12 w-full"
        >
          <FeatureSteps
            features={PRODUCT_STAGES}
            autoPlayInterval={3800}
          />
        </motion.div>

        {/* Visual Bridge Divider */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-stc-cyan font-semibold px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            Live Product Lab
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Big Centered Black Card (The Hero Showcase) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8 sm:mt-12 w-full max-w-[1080px] mx-auto"
        >
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group relative block w-full focus:outline-none"
          >
            {/* Multi-layered pulsing neon aura */}
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-stc-primary/50 via-stc-cyan/45 to-stc-primary/50 opacity-75 blur-2xl transition duration-500 group-hover:opacity-100 group-hover:blur-3xl" />

            {/* Terminal Container (Dark Theme, High Tech) */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-b from-slate-900/95 via-stc-black/95 to-slate-950/95 p-3.5 sm:p-6 md:p-7 shadow-[0_25px_65px_rgba(0,0,0,0.6),0_0_35px_rgba(0,212,255,0.18)] backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:border-stc-cyan/40">
              
              {/* Window Header */}
              <div className="mb-2.5 sm:mb-4 flex items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2.5 sm:pb-4">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/90 shadow-sm" />
                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/90 shadow-sm" />
                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/90 shadow-sm" />
                  </div>
                  <div className="ml-1 sm:ml-2 flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-slate-300 min-w-0 truncate">
                    <Terminal size={13} className="text-stc-cyan shrink-0 hidden xs:inline-block" />
                    <span className="truncate hidden sm:inline">stc-product-division // proprietary-products</span>
                    <span className="truncate inline sm:hidden">stc-products</span>
                  </div>
                </div>

                {/* Dynamic Status Badges & Action Link */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-slate-300">
                    <span
                      className={clsx(
                        'h-1.5 w-1.5 rounded-full',
                        PRODUCT_SLIDES[activeSlide].badgeType === 'live'
                          ? 'bg-emerald-400 animate-pulse'
                          : 'bg-amber-400 animate-pulse'
                      )}
                    />
                    {PRODUCT_SLIDES[activeSlide].badge}
                  </span>
                  {PRODUCT_SLIDES[activeSlide].isExternal ? (
                    <a
                      href={PRODUCT_SLIDES[activeSlide].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-stc-primary/20 hover:bg-stc-primary/30 border border-stc-primary/40 px-2.5 py-1 sm:px-3.5 text-[11px] sm:text-xs font-bold text-stc-cyan transition-colors shrink-0"
                    >
                      <span>{PRODUCT_SLIDES[activeSlide].ctaText}</span>
                      <ExternalLink size={11} className="sm:w-3 sm:h-3" />
                    </a>
                  ) : (
                    <Link
                      to={PRODUCT_SLIDES[activeSlide].url}
                      className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-stc-primary/20 hover:bg-stc-primary/30 border border-stc-primary/40 px-2.5 py-1 sm:px-3.5 text-[11px] sm:text-xs font-bold text-stc-cyan transition-colors shrink-0"
                    >
                      <span>{PRODUCT_SLIDES[activeSlide].ctaText}</span>
                      <ArrowRight size={11} className="sm:w-3 sm:h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Front-View Product Slideshow Frame */}
              <div className="relative w-full overflow-hidden rounded-lg sm:rounded-2xl bg-slate-950 aspect-[16/9] shadow-inner">
                {/* Images */}
                {PRODUCT_SLIDES.map((slide, idx) => (
                  <motion.img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    width="1376"
                    height="768"
                    initial={false}
                    animate={{
                      opacity: activeSlide === idx ? 1 : 0,
                      scale: activeSlide === idx ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={clsx(
                      'absolute inset-0 h-full w-full object-cover object-top pointer-events-none transition-transform duration-700 group-hover:scale-[1.01]',
                      activeSlide === idx ? 'z-10' : 'z-0'
                    )}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none z-10" />

                {/* Current Product Caption Card (Bottom-Left) */}
                <div className="absolute bottom-2 left-2 sm:bottom-5 sm:left-5 z-20 pointer-events-none max-w-[82%] sm:max-w-md">
                  <div className="rounded-lg sm:rounded-xl bg-slate-950/90 p-2 sm:p-4 backdrop-blur-md border border-white/15 shadow-2xl">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1.5">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] sm:text-xs font-semibold border shrink-0',
                          PRODUCT_SLIDES[activeSlide].badgeType === 'live'
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        )}
                      >
                        {PRODUCT_SLIDES[activeSlide].badgeType === 'live' ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ) : (
                          <Sparkles size={10} className="text-amber-300" />
                        )}
                        {PRODUCT_SLIDES[activeSlide].badge}
                      </span>
                      <span className="font-serif text-xs sm:text-base font-bold text-white truncate">
                        {PRODUCT_SLIDES[activeSlide].title}
                      </span>
                    </div>
                    <p className="hidden sm:block text-xs sm:text-[13px] text-slate-300 font-medium leading-snug">
                      {PRODUCT_SLIDES[activeSlide].caption}
                    </p>
                  </div>
                </div>

                {/* Manual Navigation Controls (Prev / Next Buttons) */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous product slide"
                  className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/15 opacity-75 hover:opacity-100 hover:scale-110 hover:bg-slate-950 transition-all duration-200"
                >
                  <ChevronLeft size={16} className="sm:hidden" />
                  <ChevronLeft size={20} className="hidden sm:block" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next product slide"
                  className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/15 opacity-75 hover:opacity-100 hover:scale-110 hover:bg-slate-950 transition-all duration-200"
                >
                  <ChevronRight size={16} className="sm:hidden" />
                  <ChevronRight size={20} className="hidden sm:block" />
                </button>

                {/* Slide Progress Indicator (Top-Right) */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 rounded-full bg-slate-950/75 px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md border border-white/10">
                  {PRODUCT_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      aria-label={`Product slide ${idx + 1}`}
                      className={clsx(
                        'h-1 sm:h-1.5 rounded-full transition-all duration-300',
                        activeSlide === idx
                          ? 'w-4 sm:w-5 bg-stc-cyan shadow-[0_0_10px_rgba(0,212,255,0.9)]'
                          : 'w-1 sm:w-1.5 bg-white/30 hover:bg-white/60'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Terminal Footer Specs */}
              <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm text-stc-gray font-medium px-0.5">
                <span className="font-mono text-slate-300 leading-snug">
                  Flagship: Dailydoubt (FinTech Ledger) · Upcoming: STC UI Builder (Visual Web Studio)
                </span>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Proprietary Soft Tricks Code Suite</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Downside Section: Collaboration Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 sm:mt-10 md:mt-12 w-full max-w-[1080px] mx-auto"
        >
          {/* Full-Width Collaboration Banner in White Glow */}
          <Link
            to="/products"
            className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl border border-white/90 bg-gradient-to-r from-white via-white/95 to-white/90 p-4 sm:p-6 md:p-8 shadow-[0_16px_45px_rgba(0,0,0,0.18),0_0_35px_rgba(255,255,255,0.3),0_0_25px_rgba(0,212,255,0.2)] ring-1 ring-stc-cyan/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.25),0_0_45px_rgba(255,255,255,0.45),0_0_35px_rgba(0,212,255,0.35)]"
            aria-label="Explore Soft Tricks Code Proprietary Software Products"
          >
            {/* Specular line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 text-stc-primary shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Layers size={20} className="sm:hidden" />
                  <Layers size={26} className="hidden sm:block" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-slate-950 leading-snug">
                      Co-Architect & Scale Software Products
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-stc-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-stc-primary animate-pulse" />
                      Active Venture Lab
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
                    Whether you need our proprietary software or want our engineering team to co-build and scale your custom product roadmap.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-stc-primary px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-fly transition-all duration-300 group-hover:bg-stc-primary-light group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] group-hover:scale-105">
                  <span>Explore Product Suite</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
