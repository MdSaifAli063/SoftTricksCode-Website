import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Cpu, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';

const PRODUCT_SLIDES = [
  {
    src: '/images/products/products-lab-preview.jpg',
    alt: 'Modular Cloud Architecture & Core Product Systems',
  },
  {
    src: '/images/products/product-slide-2.jpg',
    alt: 'SaaS Analytics & Data Intelligence Platform',
  },
  {
    src: '/images/products/product-slide-3.jpg',
    alt: 'High-Performance Cloud Infrastructure & API Engine',
  },
  {
    src: '/images/products/product-slide-4.jpg',
    alt: 'Multi-Platform Mobile & Web Digital Product Suite',
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

  return (
    <section id="products-teaser" className="section-dark px-4 py-10 sm:px-6 sm:py-16 md:px-8 lg:px-16 lg:py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-stc-primary/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-stc-cyan/15 blur-[130px]" />

      <div className="container-page relative z-10">
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

        {/* Content Showcase Grid */}
        <div className="mt-2 sm:mt-6 grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Product Division Story & 3 Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-blue-100/90 text-balance max-w-2xl">
              Soft Tricks Code operates with a dual engineering engine: delivering bespoke,
              high-performance software services for businesses, while actively researching,
              architecting, and launching our own independent software products.
            </p>

            {/* 3 Pillars of Soft Tricks Code Products */}
            <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3.5">
              <div className="flex items-start gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-white/20 bg-white p-3 sm:p-4 shadow-sm sm:shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-stc-primary">
                  <Rocket size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold !text-slate-900 leading-snug">
                    In-House Innovation Lab
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm !text-slate-600 leading-relaxed">
                    We identify real-world industry bottlenecks and engineer focused, proprietary
                    digital products from concept to live deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-white/20 bg-white p-3 sm:p-4 shadow-sm sm:shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-cyan-50 text-cyan-600">
                  <Cpu size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold !text-slate-900 leading-snug">
                    Battle-Tested Architecture
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm !text-slate-600 leading-relaxed">
                    Every product is engineered with modern cloud infrastructure, airtight data
                    security, and sub-second performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-white/20 bg-white p-3 sm:p-4 shadow-sm sm:shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold !text-slate-900 leading-snug">
                    Hands-On Product Ownership
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm !text-slate-600 leading-relaxed">
                    Because we run our own production software products, we bring firsthand product
                    ownership and scalability wisdom to every solution we create.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Conceptual Product Lab Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:self-end"
          >
            <Link
              to="/products"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="group relative block mx-auto w-full max-w-lg lg:max-w-none focus:outline-none"
              aria-label="Explore Soft Tricks Code Proprietary Software Products"
            >
              {/* Pulsing neon aura */}
              <div className="absolute -inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-stc-primary/40 via-stc-cyan/30 to-stc-primary/40 opacity-60 blur-xl transition duration-500 group-hover:opacity-90" />

              {/* Card Container (Dark Theme) */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-stc-black/90 p-3 sm:p-5 shadow-2xl backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-fly-card">
                {/* Window Header */}
                <div className="mb-2.5 sm:mb-3.5 flex items-center justify-between gap-2 border-b border-white/10 pb-2 sm:pb-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-xs font-medium text-stc-gray whitespace-nowrap truncate">
                      stc-product-division
                    </span>
                  </div>
                </div>

                {/* Conceptual Image Frame with Automatic Slideshow */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-950 aspect-[16/10] sm:aspect-[4/3] shadow-inner">
                  {/* Sliding Images */}
                  {PRODUCT_SLIDES.map((slide, idx) => (
                    <motion.img
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      width="800"
                      height="600"
                      initial={false}
                      animate={{
                        opacity: activeSlide === idx ? 1 : 0,
                        scale: activeSlide === idx ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={clsx(
                        'absolute inset-0 h-full w-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105',
                        activeSlide === idx ? 'z-10' : 'z-0'
                      )}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  ))}

                  {/* Subtle dark gradient for edge polish */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Slide Progress Pill Indicators */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 rounded-full bg-slate-950/60 px-2 py-1 backdrop-blur-md border border-white/10">
                    {PRODUCT_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                        aria-label={`Slide ${idx + 1}`}
                        className={clsx(
                          'h-1 rounded-full transition-all duration-300',
                          activeSlide === idx
                            ? 'w-3.5 bg-stc-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]'
                            : 'w-1 bg-white/30 hover:bg-white/60'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer specs */}
                <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-2 text-[10px] sm:text-xs text-stc-gray font-medium px-0.5 sm:px-1">
                  <span className="whitespace-nowrap truncate">SaaS · Mobile Apps · Web Tools</span>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-400 font-semibold whitespace-nowrap shrink-0">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>Production Ready</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Wide Bottom Product Division Banner Card (Shiny White Theme & Responsive) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 sm:mt-8 md:mt-10"
        >
          <Link
            to="/products"
            className="group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/80 bg-gradient-to-r from-white via-white/95 to-white/90 p-3.5 sm:p-5 md:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.18),0_0_25px_rgba(0,212,255,0.2)] ring-1 ring-stc-cyan/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(0,0,0,0.22),0_0_35px_rgba(0,212,255,0.35)] hover:ring-stc-cyan/50"
            aria-label="Explore Soft Tricks Code Proprietary Software Products"
          >
            {/* Glossy top edge specular reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Inner glossy ambient lighting */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-slate-100/30" />

            {/* Iridescent shimmer accents in corners */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-stc-cyan/20 to-stc-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125 group-hover:from-stc-cyan/30" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-tr from-stc-primary/15 to-transparent blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-6">
              {/* Left Side: Icon + Headline + Description */}
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/80 text-stc-primary shadow-[0_0_12px_rgba(0,212,255,0.2)] transition-transform duration-300 group-hover:scale-105">
                  <Layers size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                    <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold !text-slate-900 leading-snug">
                      Services + Products
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50/80 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-stc-primary shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-stc-primary animate-pulse" />
                      <span>Active Division</span>
                    </span>
                  </div>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm !text-slate-600 leading-relaxed max-w-3xl">
                    Explore our launched digital products and upcoming pipeline on the products page.
                  </p>
                </div>
              </div>

              {/* Right Side: Action Button with Shiny Glow */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-stc-primary via-blue-600 to-stc-primary px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all duration-300 group-hover:shadow-[0_6px_22px_rgba(0,212,255,0.45)] group-hover:scale-[1.02]">
                  <span>Live Suite</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
