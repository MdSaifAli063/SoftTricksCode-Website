import { motion } from 'framer-motion';
import {
  ReceiptText,
  FileSpreadsheet,
  Calculator,
  Languages,
  FileText,
  ShieldCheck,
  ExternalLink,
  Download,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Globe,
  Zap,
  Sparkles,
  Code2,
  Layers,
} from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import SectionBadge from '../components/ui/SectionBadge';
import GlowButton from '../components/ui/GlowButton';
import { products, upcomingProducts } from '../data/products';
import { useBooking } from '../context/BookingContext';

const featureIcons = {
  ReceiptText,
  FileSpreadsheet,
  Calculator,
  Languages,
  FileText,
  ShieldCheck,
};

export default function ProductsPage() {
  const { openBooking } = useBooking();
  const flagship = products[0];

  return (
    <>
      <Seo
        title="Our Products & Digital Solutions | Soft Tricks Code"
        description="Explore proprietary software products developed by Soft Tricks Code, including Dailydoubt — a digital business ledger and GST invoicing app for Indian retail merchants."
        keywords="Dailydoubt, Soft Tricks Code products, digital shop ledger, GST invoice app, Indian business calculator, retail ledger app, business accounting software"
        pathname="/products"
      />

      <PageBanner
        badge="Our Products"
        title="Proprietary Digital Products Built to Scale"
        subtitle="Alongside our custom software engineering services, we architect, build, and launch independent software products designed to transform everyday business operations."
        breadcrumbs={['Products']}
      />

      {/* Main Content Area in Light Theme (Like Services Page) - Fully Responsive */}
      <section className="section-light py-6 sm:py-10 md:py-12 relative overflow-hidden">
        <div className="container-page relative z-10">
          {/* Flagship Product Showcase Card (Dark blue/navy style, fully mobile responsive) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="fly-glass-featured !bg-gradient-to-br !from-[#0c1f42] !via-[#07152d] !to-[#030a17] relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 xl:p-8 shadow-2xl border border-stc-primary/40"
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-stc-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-stc-cyan/15 blur-3xl" />

            {/* Top metadata tags - wraps gracefully on small screens */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3 sm:pb-3.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <SectionBadge variant="blue" className="py-0.5 px-2.5 text-[11px] sm:text-xs">
                  {flagship.badge}
                </SectionBadge>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {flagship.status}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-stc-gray">
                  {flagship.category}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-medium text-stc-gray">
                <span className="flex items-center gap-1">
                  <Smartphone size={13} className="text-stc-primary-light shrink-0" /> Android App
                </span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1">
                  <Globe size={13} className="text-stc-cyan shrink-0" /> Web Platform
                </span>
              </div>
            </div>

            {/* Main Product Feature Grid: Text & Media */}
            <div className="mt-4 sm:mt-5 grid items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
              {/* Left Column: Product Story & Actions */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight !text-white leading-tight">
                    {flagship.name}
                  </h2>
                  <p className="mt-1 font-serif text-xs sm:text-sm lg:text-base font-medium text-stc-cyan">
                    {flagship.tagline}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm lg:text-[14px] leading-relaxed text-blue-100/90 max-w-2xl">
                    {flagship.heroDescription}
                  </p>

                  {/* Key Metrics Strip - 4 cols */}
                  <div className="mt-3 sm:mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                    {flagship.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 sm:py-2.5 text-center backdrop-blur-sm transition duration-200 hover:border-stc-cyan/30 hover:bg-white/10 min-h-[58px] sm:min-h-[64px]"
                      >
                        <div className="font-serif text-base sm:text-lg lg:text-xl font-bold !text-white leading-snug">
                          {metric.value}
                        </div>
                        <div className="mt-0.5 text-[10px] sm:text-[11px] text-slate-300 leading-snug font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Language Support Chips */}
                  <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-stc-gray">
                    <span className="flex items-center gap-1 font-semibold !text-white">
                      <Languages size={13} className="text-stc-primary-light shrink-0" /> Languages:
                    </span>
                    {flagship.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-white"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Responsive stacking on mobile */}
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <GlowButton
                    href={flagship.websiteUrl}
                    className="w-full sm:w-auto gap-2 shadow-fly justify-center py-2.5 px-4 sm:px-5 text-xs sm:text-sm"
                  >
                    <span>Visit www.dailydoubt.com</span>
                    <ExternalLink size={14} />
                  </GlowButton>

                  <GlowButton
                    href={flagship.downloadUrl}
                    variant="outline"
                    className="w-full sm:w-auto gap-2 justify-center py-2.5 px-4 sm:px-5 text-xs sm:text-sm"
                  >
                    <Download size={14} />
                    <span>Download Android App</span>
                  </GlowButton>
                </div>
              </div>

              {/* Right Column: High-Res Screenshot Frame */}
              <div className="lg:col-span-6 xl:col-span-5">
                <div className="group relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Subtle pulsing background aura */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-stc-primary/40 to-stc-cyan/30 opacity-75 blur-lg transition duration-500 group-hover:opacity-100" />

                  {/* Image container frame */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-stc-black/80 shadow-2xl backdrop-blur-md">
                    <a
                      href={flagship.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden aspect-[16/10] bg-slate-950"
                      aria-label="Open Dailydoubt website"
                    >
                      <img
                        src={flagship.image}
                        alt="Dailydoubt - Digital Business and Shop Ledger developed by Soft Tricks Code"
                        width="800"
                        height="500"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="eager"
                        decoding="async"
                      />
                    </a>

                    {/* Bottom overlay badge */}
                    <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-stc-black/90 px-3 py-2 text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1.5 font-medium !text-white text-[11px]">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        Live on Android & Web
                      </span>
                      <a
                        href={flagship.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-stc-primary-light hover:underline text-[11px]"
                      >
                        Explore Features <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture / Tech Stack Pills */}
            <div className="mt-4 sm:mt-5 border-t border-white/10 pt-3 sm:pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stc-gray shrink-0">
                <Code2 size={13} className="text-stc-primary-light shrink-0" />
                Engineered With:
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {flagship.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stc-primary/30 bg-stc-primary/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-stc-primary-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Deep-Dive Features Grid (Responsive 1/2/3 Columns) */}
          <div className="mt-14 sm:mt-20 lg:mt-24">
            <div className="text-center px-2">
              <SectionBadge className="mb-3">Dailydoubt Features</SectionBadge>
              <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-slate-900">
                Engineered for Speed, Simplicity & Indian Retailers
              </h3>
              <p className="mx-auto mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600">
                Discover why daily shopkeepers, wholesalers, and kirana stores rely on Dailydoubt to
                automate their day-to-day accounts, GST billing, and business calculations.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {flagship.features.map((feature, i) => {
                const Icon = featureIcons[feature.icon] || Zap;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:border-stc-primary/40 hover:shadow-xl"
                  >
                    <div>
                      <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-stc-primary/30 bg-stc-primary/10 text-stc-primary shadow-sm transition group-hover:scale-105 group-hover:border-stc-primary group-hover:bg-stc-primary group-hover:text-white">
                        <Icon size={22} className="transition group-hover:text-white" />
                      </div>
                      <h4 className="mt-3.5 sm:mt-4 font-serif text-lg sm:text-xl font-bold text-slate-900">
                        {feature.title}
                      </h4>
                      <hr className="my-2.5 sm:my-3 border-slate-200" />
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Innovation Pipeline: Upcoming Product (Responsive Layout) */}
          <div className="mt-14 sm:mt-20 lg:mt-24">
            <div className="text-center px-2">
              <SectionBadge className="mb-3">Upcoming Product</SectionBadge>
              <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-slate-900">
                Coming Soon from Soft Tricks Code Lab
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-600">
                We are actively developing our next proprietary developer tool designed to accelerate modern web design.
              </p>
            </div>

            <div className="mx-auto mt-6 sm:mt-8 max-w-4xl">
              {upcomingProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 lg:p-8 shadow-lg shadow-slate-200/50 transition duration-300 hover:border-stc-primary/40 hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className={product.image ? 'lg:col-span-7' : 'lg:col-span-12'}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                          <Sparkles size={12} />
                          {product.badge}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{product.category}</span>
                      </div>

                      <h4 className="mt-3 sm:mt-4 font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-slate-900">
                        {product.name}
                      </h4>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-stc-primary">
                        {product.tagline}
                      </p>
                      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600">
                        {product.description}
                      </p>

                      <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 border-t border-slate-100 pt-3.5 sm:pt-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
                          Tech Stack:
                        </span>
                        {product.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-slate-100 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {product.image && (
                      <div className="lg:col-span-5">
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-md aspect-[16/10] bg-slate-950">
                          <img
                            src={product.image}
                            alt={product.name}
                            width="600"
                            height="375"
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Consultation CTA - Responsive Buttons & Visible White Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dark-card mt-12 sm:mt-16 md:mt-20 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-stc-navy via-stc-black to-stc-navy p-5 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl border border-white/10"
          >
            <Layers className="mx-auto text-stc-primary-light" size={32} />
            <h3 className="mt-3 sm:mt-4 font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold !text-white leading-snug">
              Have a Proprietary Product Idea You Want Built?
            </h3>
            <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base !text-blue-100/90 leading-relaxed">
              Soft Tricks Code partners with startups and enterprises to build full-scale SaaS,
              mobile platforms, and AI engines from discovery to market launch.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-4">
              <GlowButton
                onClick={openBooking}
                className="w-full sm:w-auto gap-2 justify-center py-2.5 sm:py-3 text-xs sm:text-sm"
              >
                <span>Book a Free Product Discovery Call</span>
                <ArrowRight size={15} />
              </GlowButton>
              <GlowButton
                to="/services"
                variant="outline"
                className="w-full sm:w-auto justify-center py-2.5 sm:py-3 text-xs sm:text-sm"
              >
                <span>Explore Custom Engineering Services</span>
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
