import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Globe,
  Smartphone,
  ShieldCheck,
  Zap,
  Handshake,
  Sparkles,
  PhoneCall,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import SectionBadge from '../components/ui/SectionBadge';
import Pricing from '../components/sections/Pricing';
import { useBooking } from '../context/BookingContext';
import clsx from 'clsx';

const WEB_COMPARISON_ROWS = [
  ['Pages / Views', 'Up to 5 Pages', 'Up to 15 Pages', 'Unlimited Custom'],
  ['Mobile & Tablet Responsive', '✓ Included', '✓ Included', '✓ Included'],
  ['Backend & Database', '—', '✓ Node / PostgreSQL / Mongo', '✓ Scalable Microservices'],
  ['Admin CMS Dashboard', '—', '✓ Custom Admin Panel', '✓ Advanced Telemetry Suite'],
  ['SEO & Speed Optimization', 'Basic Meta & Speed', 'Advanced Core Web Vitals', 'Enterprise Multi-region SEO'],
  ['Free Bug Fixing & Support', '1 Month Free', '3 Months Free', '24/7 Dedicated SLA'],
  ['Source Code & IP Rights', '100% Full Ownership', '100% Full Ownership', '100% Full Ownership'],
  ['Estimated Delivery Timeline', '5–8 Days', '2–3 Weeks', 'Phased Milestones'],
];

const APP_COMPARISON_ROWS = [
  ['Supported Platforms', 'Android or iOS', 'Android + iOS (Cross-Platform)', 'Android + iOS + Web Platform'],
  ['UI Screens & User Flows', '6–8 Screens', '15–20 Screens', 'Unlimited Custom Flows'],
  ['User Authentication', 'Email / Google / OTP', 'Email / Google / Apple / OTP', 'Enterprise SSO & Biometrics'],
  ['Push Notifications', '—', '✓ Real-time & Segmented', '✓ Automated AI-Driven'],
  ['Payment Gateway Integration', '—', '✓ Razorpay / Stripe / UPI', '✓ Multi-Currency & In-App Purchases'],
  ['Admin Web Dashboard', '—', '✓ Real-time Content & Users', '✓ Full Telemetry & Operations Panel'],
  ['Store Submission', 'Play Store Guidance', 'Full Play Store & App Store Submission', 'Full Release & Compliance Management'],
  ['Free Warranty & Maintenance', '2 Months Free', '4 Months Free', '24/7 Dedicated SLA'],
  ['Source Code & IP Rights', '100% Full Ownership', '100% Full Ownership', '100% Full Ownership'],
  ['Estimated Delivery Timeline', '2–3 Weeks', '4–6 Weeks', 'Phased Milestones'],
];

const WEB_PLANS = [
  { name: 'Starter (Web)', price: '₹5,999', highlight: false },
  { name: 'Professional (Web)', price: '₹14,999', highlight: true },
  { name: 'Enterprise (Web)', price: 'Custom Quote', highlight: false },
];

const APP_PLANS = [
  { name: 'Starter (App)', price: '₹24,999', highlight: false },
  { name: 'Popular (App)', price: '₹39,999', highlight: true },
  { name: 'Custom (App)', price: 'Custom Quote', highlight: false },
];

const PRICING_FAQS = [
  {
    q: 'Are your pricing packages negotiable?',
    a: 'Yes, 100%! We frequently partner with bootstrapped founders, startups, and growing businesses. We can adjust the initial scope, phase features into milestones, or customize payment schedules to fit your exact budget.',
  },
  {
    q: 'What is your payment milestone structure?',
    a: 'Our standard schedule is 40% upfront deposit to initiate UI/UX and architecture, 40% upon delivering the functional beta prototype for your testing, and 20% upon final store submission or domain launch and source code handover.',
  },
  {
    q: 'Do I get full ownership of the source code and intellectual property?',
    a: 'Absolutely! Upon project completion and final payment, you receive 100% ownership of the full source code repository, designs, database schemas, and intellectual property. No vendor lock-in, ever.',
  },
  {
    q: 'What is included in the free post-launch support and warranty?',
    a: 'Web packages include 1 to 3 months of free maintenance, and Mobile App packages include 2 to 4 months. This covers bug fixing, minor layout tweaks, server monitoring, and technical advice from our engineering team.',
  },
  {
    q: 'How do we get started with our project?',
    a: 'Click "Book a Call" to schedule a free 30-minute discovery call with our founders (Saif & Ashwini), or reach out directly on WhatsApp. We will evaluate your requirements and send a clear, tailored proposal within 24 hours.',
  },
];

export default function PricingPage() {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('web');
  const [openFaq, setOpenFaq] = useState(0);

  const isApp = activeCategory === 'app';
  const isAi = activeCategory === 'ai';
  const comparisonRows = isApp ? APP_COMPARISON_ROWS : WEB_COMPARISON_ROWS;
  const plans = isApp ? APP_PLANS : WEB_PLANS;

  return (
    <>
      <Seo
        title="Pricing — Soft Tricks Code"
        description="Discover transparent, negotiable pricing for web development, mobile apps (Android & iOS), SaaS, and custom software from Soft Tricks Code."
        pathname="/pricing"
      />

      {/* Hero Page Banner (Crisp white title on dark gradient hero) */}
      <PageBanner
        badge="Pricing"
        title="Plans That Scale With You"
        subtitle="Transparent pricing for Web, SaaS & Mobile Apps. All plans are negotiable — free consultation available."
        breadcrumbs={['Pricing']}
      />

      <div className="section-light min-h-screen">
        {/* Trust & Guarantee Highlights Strip */}
        <section className="border-b border-slate-200/80 bg-white/80 py-5 shadow-sm backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-stc-primary shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-slate-800 sm:text-sm">100% IP Ownership</p>
                  <p className="text-[11px] text-slate-500 font-medium">Full source code rights</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shadow-sm">
                  <Handshake size={20} />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-slate-800 sm:text-sm">100% Negotiable</p>
                  <p className="text-[11px] text-slate-500 font-medium">Tailored to your budget</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-slate-800 sm:text-sm">Phased Milestones</p>
                  <p className="text-[11px] text-slate-500 font-medium">40 / 40 / 20 structure</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-slate-800 sm:text-sm">Free Warranty</p>
                  <p className="text-[11px] text-slate-500 font-medium">Up to 4 months support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Changeable Pricing Plans Section with Toggle Switch */}
        <Pricing
          pageMode
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Plan Feature Comparison Table — hidden for AI tab */}
        {!isAi && (
        <section id="comparison" className="section-padding !pt-2 !pb-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-0">
            <div className="mb-8 text-center">
              <SectionBadge className="mb-3">Deep Comparison</SectionBadge>
              <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                {isApp ? 'Mobile App Feature Comparison' : 'Website & Web App Feature Comparison'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Compare features and deliverables across {isApp ? 'mobile application' : 'web development'} tiers
              </p>

              {/* Matching Pill Toggle Switch for the Comparison Table */}
              <div className="mt-6 flex justify-center px-3">
                <div className="grid w-full max-w-xs sm:max-w-none grid-cols-2 sm:inline-flex sm:w-auto items-center rounded-2xl border border-slate-700/80 bg-slate-900/95 p-1 sm:p-1.5 shadow-xl backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('web')}
                    className={clsx(
                      'relative flex items-center justify-center gap-1 sm:gap-2.5 rounded-xl px-2 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-0',
                      !isApp
                        ? 'bg-stc-primary text-white shadow-lg shadow-stc-primary/40'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <Globe size={14} className="shrink-0 sm:size-4" />
                    <span className="hidden sm:inline">Websites & SaaS</span>
                    <span className="sm:hidden">Web</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('app')}
                    className={clsx(
                      'relative flex items-center justify-center gap-1 sm:gap-2.5 rounded-xl px-2 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-0',
                      isApp
                        ? 'bg-stc-primary text-white shadow-lg shadow-stc-primary/40'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <Smartphone size={14} className="shrink-0 sm:size-4" />
                    <span className="hidden sm:inline">Mobile Apps (Android & iOS)</span>
                    <span className="sm:hidden">Apps</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop & Tablet Table (Clean, High-Contrast, Visible) */}
            <div className="fly-card-light hidden overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-900">
                      <th className="p-4 text-left font-bold text-slate-800">Features & Deliverables</th>
                      {plans.map((p) => (
                        <th
                          key={p.name}
                          className={clsx(
                            'p-4 text-center font-bold',
                            p.highlight ? 'text-stc-primary bg-stc-primary/5' : 'text-slate-900'
                          )}
                        >
                          <div className="font-heading text-base font-bold">{p.name}</div>
                          <div className="mt-0.5 text-xs font-semibold text-stc-primary">{p.price}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {comparisonRows.map(([feature, ...vals], rIdx) => (
                      <tr
                        key={feature}
                        className={clsx(
                          'border-b border-slate-100 transition-colors hover:bg-slate-50/70',
                          rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                        )}
                      >
                        <td className="p-4 font-semibold text-slate-800">{feature}</td>
                        {vals.map((v, i) => (
                          <td
                            key={i}
                            className={clsx(
                              'p-4 text-center font-semibold text-slate-600',
                              plans[i]?.highlight ? 'bg-stc-primary/[0.03] text-slate-900 font-bold' : ''
                            )}
                          >
                            {v.startsWith('✓') ? (
                              <span className="inline-flex items-center justify-center gap-1.5 text-emerald-600 font-bold">
                                <Check size={16} strokeWidth={2.5} />
                                <span>{v.replace('✓', '').trim() || 'Included'}</span>
                              </span>
                            ) : (
                              <span>{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Stacked Plan Cards - Fully Responsive Stacked View */}
            <div className="grid gap-4 md:hidden">
              {plans.map((plan, planIndex) => (
                <div
                  key={plan.name}
                  className={clsx(
                    'fly-card-light overflow-hidden rounded-3xl border bg-white shadow-md',
                    plan.highlight ? 'ring-2 ring-stc-primary border-stc-primary/30' : 'border-slate-200'
                  )}
                >
                  <div
                    className={clsx(
                      'border-b border-slate-200 px-5 py-4',
                      plan.highlight ? 'bg-gradient-to-r from-blue-50 to-indigo-50/60' : 'bg-slate-50'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span
                          className={clsx(
                            'text-[10px] font-bold uppercase tracking-wider',
                            plan.highlight ? 'text-stc-primary' : 'text-slate-500'
                          )}
                        >
                          {plan.highlight ? '⭐ Most Popular Tier' : 'Plan Tier'}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-slate-900 mt-0.5">
                          {plan.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-heading text-lg font-extrabold text-stc-primary">
                          {plan.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="divide-y divide-slate-100 px-5 py-2">
                    {comparisonRows.map(([feature, ...vals]) => {
                      const val = vals[planIndex];
                      const isIncluded = val.startsWith('✓');
                      const isNotIncluded = val === '—';

                      return (
                        <li key={feature} className="py-3">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                            {feature}
                          </div>
                          <div className="mt-1 text-sm font-bold text-slate-800">
                            {isIncluded ? (
                              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                                <Check size={16} strokeWidth={2.5} className="shrink-0" />
                                <span>{val.replace('✓', '').trim() || 'Included'}</span>
                              </span>
                            ) : isNotIncluded ? (
                              <span className="text-slate-400 font-medium">— Not Included</span>
                            ) : (
                              <span className="text-slate-700">{val}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Direct Founder Negotiation Banner */}
        <section className="section-padding !pt-4 !pb-12">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1836] via-[#0d214a] to-[#040814] p-8 sm:p-12 text-white shadow-2xl">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-stc-primary/30 blur-3xl"
                aria-hidden
              />
              <div className="relative z-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-900/60 px-3.5 py-1 text-xs font-semibold text-blue-200">
                  <Handshake size={14} />
                  <span>100% Negotiable Pricing & Milestones</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold !text-white sm:text-3xl">
                  Have A Unique Budget or Custom Scope? Let's Talk.
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed !text-slate-200 sm:text-base">
                  Every business is different. Whether you are bootstrapping an MVP or launching an enterprise platform, we negotiate pricing, milestone deliverables, and flexible payment terms directly with you.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-stc-primary px-5 py-3.5 sm:px-7 text-sm font-bold text-white shadow-fly transition hover:bg-stc-primary-light active:scale-[0.98] whitespace-nowrap"
                  >
                    <PhoneCall size={16} className="shrink-0" />
                    <span className="hidden sm:inline">Book Free 30-Min Discovery Call</span>
                    <span className="sm:hidden">Book Free Discovery Call</span>
                  </button>

                  <a
                    href="https://wa.me/919142512606?text=Hi%20Soft%20Tricks%20Code,%20I'd%20like%20to%20discuss%20pricing%20and%20scope%20for%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-emerald-500/50 bg-emerald-950/60 px-5 py-3.5 sm:px-6 text-sm font-bold text-emerald-300 transition hover:bg-emerald-900/70 active:scale-[0.98] whitespace-nowrap"
                  >
                    <MessageSquare size={16} className="shrink-0 text-emerald-400" />
                    <span className="hidden sm:inline">Chat on WhatsApp (Founder)</span>
                    <span className="sm:hidden">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Accordion */}
        <section className="section-padding !pt-4 !pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <SectionBadge className="mb-3">Pricing FAQ</SectionBadge>
              <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Clear answers regarding payments, negotiation, deliverables, and guarantees.
              </p>
            </div>

            <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md">
              {PRICING_FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.q} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between text-left font-serif text-base font-semibold text-slate-900 sm:text-lg focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={clsx(
                          'shrink-0 text-stc-primary transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm leading-relaxed text-slate-600 font-normal">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
