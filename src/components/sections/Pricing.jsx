import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Globe, Smartphone, BrainCircuit, Sparkles } from 'lucide-react';
import { webPricingPlans, appPricingPlans, aiPricingPlans } from '../../data/pricing';
import SectionBadge from '../ui/SectionBadge';
import MarqueeTicker from '../ui/MarqueeTicker';
import { useBooking } from '../../context/BookingContext';
import clsx from 'clsx';

const TABS = [
  { id: 'web', label: 'Websites & SaaS', shortLabel: 'Web', Icon: Globe },
  { id: 'app', label: 'Mobile Apps (Android & iOS)', shortLabel: 'Apps', Icon: Smartphone },
  { id: 'ai', label: 'AI Solutions', shortLabel: 'AI Add-On', Icon: BrainCircuit, badge: 'ADD-ON' },
];

export default function Pricing({
  compact = false,
  pageMode = false,
  activeCategory: externalCategory,
  onCategoryChange: externalOnCategoryChange,
}) {
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const [internalCategory, setInternalCategory] = useState('web');
  const isControlled = externalCategory !== undefined;
  const currentCategory = isControlled ? externalCategory : internalCategory;

  const handleCategorySwitch = (cat) => {
    if (isControlled && externalOnCategoryChange) {
      externalOnCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const handleCta = (plan) => {
    if (plan.cta === 'Book a Call') openBooking();
    else if (plan.cta === 'Contact Us') navigate('/contact');
    else if (plan.cta?.toLowerCase().includes('chatbot')) openBooking();
    else openBooking();
  };

  const isAi = currentCategory === 'ai';
  const currentPlans =
    currentCategory === 'app'
      ? appPricingPlans
      : currentCategory === 'ai'
      ? aiPricingPlans
      : webPricingPlans;

  return (
    <section
      id="pricing"
      className={clsx(
        'relative overflow-x-hidden',
        pageMode ? 'section-light !pt-0 !pb-12' : 'bg-stc-black text-white',
        compact ? 'pb-16 pt-0' : ''
      )}
    >
      {!pageMode && (
        <div className="footer-waves pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      )}

      {!pageMode && <MarqueeTicker />}

      <div
        className={clsx(
          'relative z-10 mx-auto max-w-7xl',
          pageMode ? 'section-padding !pt-8 !pb-8' : 'section-padding',
          compact && '!pt-10'
        )}
      >
        {!pageMode && (
          <div className="mb-10 text-center">
            <SectionBadge className="mb-4">Pricing Plans</SectionBadge>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem]">
              Transparent Pricing Structure
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              All plans are negotiable based on project scope. Free consultation with our founders.
            </p>
          </div>
        )}

        {/* Category Toggle Tabs - Grid on mobile for zero cut-off */}
        <div className="mb-10 flex justify-center px-3">
          <div className="grid w-full max-w-xs sm:max-w-none grid-cols-3 sm:inline-flex sm:w-auto items-center rounded-2xl border border-slate-700/80 bg-slate-900/95 p-1 sm:p-1.5 shadow-2xl backdrop-blur-xl">
            {TABS.map(({ id, label, shortLabel, Icon, badge }) => {
              const isActive = currentCategory === id;
              const isAiTab = id === 'ai';
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleCategorySwitch(id)}
                  className={clsx(
                    'relative flex items-center justify-center gap-1 sm:gap-2.5 rounded-xl px-1.5 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-0',
                    isActive
                      ? isAiTab
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/40'
                        : 'bg-stc-primary text-white shadow-lg shadow-stc-primary/40'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Icon size={14} className="shrink-0 sm:size-4" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                  {badge && !isActive && (
                    <span className="hidden md:inline ml-1 rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-bold text-violet-400">
                      {badge}
                    </span>
                  )}
                  {badge && isActive && (
                    <span className="hidden md:inline ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Banner Note - Fully Responsive & Centered */}
        {isAi && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 -mt-6 flex justify-center px-4"
          >
            <div
              className={clsx(
                'inline-flex max-w-sm sm:max-w-md items-center justify-center gap-2 rounded-xl sm:rounded-full border px-3.5 py-2 sm:px-5 sm:py-1.5 text-center text-[11px] sm:text-xs font-semibold shadow-xs leading-snug',
                pageMode
                  ? 'border-violet-200/90 bg-violet-50 text-violet-700'
                  : 'border-violet-500/30 bg-violet-950/70 text-violet-200'
              )}
            >
              <Sparkles size={13} className="shrink-0 text-violet-400" />
              <span>AI solutions are add-ons for any Web or Mobile App plan.</span>
            </div>
          </motion.div>
        )}

        {/* Animated Plan Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {currentPlans.map((plan, i) => {
              const isPopular = plan.popular;
              const isAiPlan = isAi;
              const popularGlow = isAiPlan
                ? 'pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-violet-500/20 blur-2xl'
                : 'pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-stc-primary/30 blur-2xl';
              const cardBorder = isPopular
                ? isAiPlan
                  ? 'border-2 border-violet-500/80 bg-[#0c0d1e] shadow-2xl ring-1 ring-violet-500/30'
                  : 'border-2 border-stc-primary bg-[#061024] shadow-2xl ring-1 ring-stc-primary/40'
                : 'border border-slate-800/90 bg-[#070c18] shadow-xl hover:border-slate-700';

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={clsx('relative', isPopular && 'lg:-mt-4 lg:mb-4')}
                >
                  {isPopular && (
                    <div className={popularGlow} aria-hidden />
                  )}
                  <div
                    className={clsx(
                      'pricing-card relative flex h-full flex-col rounded-3xl p-7 sm:p-9 transition',
                      cardBorder
                    )}
                  >
                    {/* Top Tier & Popular Status Row (Prevents title overlap) */}
                    <div className="mb-3 flex items-center justify-between min-h-[28px]">
                      <span
                        className={clsx(
                          'text-xs font-semibold tracking-wider uppercase',
                          isAiPlan ? 'text-violet-400' : 'text-slate-400'
                        )}
                      >
                        {isAiPlan
                          ? (i === 0 ? 'Starter AI' : i === 1 ? 'Advanced AI' : 'Enterprise AI')
                          : (isPopular ? 'Most Popular' : 'Core Tier')}
                      </span>

                      {isPopular && (
                        <span
                          className={clsx(
                            'rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
                            isAiPlan
                              ? 'border border-violet-400/40 bg-violet-900/70 text-violet-200'
                              : 'border border-blue-400/40 bg-blue-900/60 text-blue-200'
                          )}
                        >
                          ⭐ Popular
                        </span>
                      )}
                    </div>

                    {/* Clean Plan Heading without badge collision */}
                    <h3 className="font-serif text-2xl font-bold !text-white leading-tight">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed !text-slate-300">
                      {plan.description}
                    </p>

                    {/* Price Display */}
                    <div className="mt-6 flex items-baseline">
                      <span
                        className={clsx(
                          'font-serif text-4xl font-bold sm:text-5xl',
                          isAiPlan && isPopular ? '!text-violet-300' : '!text-stc-cyan'
                        )}
                      >
                        {plan.priceLabel}
                      </span>
                      <span className="ml-2 text-sm font-medium !text-slate-400">
                        / {plan.period || 'project'}
                      </span>
                    </div>

                    <p className="mt-7 text-sm font-semibold !text-white">
                      Features & Deliverables
                    </p>
                    <ul className="mt-4 flex-1 space-y-3.5">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm !text-slate-200"
                        >
                          <span
                            className={clsx(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                              isAiPlan
                                ? isPopular
                                  ? 'bg-violet-500/30 text-violet-300'
                                  : 'bg-violet-500/20 text-violet-400'
                                : 'bg-stc-primary shadow-sm shadow-stc-primary/40'
                            )}
                          >
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleCta(plan)}
                      className={clsx(
                        'mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition',
                        isPopular
                          ? isAiPlan
                            ? 'bg-violet-600 text-white shadow-fly hover:bg-violet-500'
                            : 'bg-stc-primary text-white shadow-fly hover:bg-stc-primary-light'
                          : 'border border-slate-700/80 bg-[#131b2e] text-white hover:bg-[#1a253e]'
                      )}
                    >
                      <span>{plan.cta || 'Get Started Now'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {!compact && (
          <p
            className={clsx(
              'mt-12 text-center text-sm font-medium',
              pageMode ? 'text-slate-600' : 'text-slate-400'
            )}
          >
            {isAi
              ? 'AI add-on prices are starting estimates. Final pricing depends on data volume, model choice & integration complexity.'
              : 'All prices are negotiable. Need a custom mobile app or web platform? Book a free discovery call with our founders anytime.'}
          </p>
        )}
      </div>
    </section>
  );
}
