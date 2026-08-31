import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { pricingPlans } from '../../data/pricing';
import SectionBadge from '../ui/SectionBadge';
import MarqueeTicker from '../ui/MarqueeTicker';
import { useBooking } from '../../context/BookingContext';
import clsx from 'clsx';

export default function Pricing({ compact = false, pageMode = false }) {
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const handleCta = (plan) => {
    if (plan.cta === 'Book a Call') openBooking();
    else if (plan.cta === 'Contact Us') navigate('/contact');
    else openBooking();
  };

  return (
    <section
      id="pricing"
      className={clsx(
        'relative overflow-x-hidden',
        pageMode ? 'section-light !pt-0 !pb-12' : 'bg-stc-black',
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
          pageMode ? 'section-padding !pt-12 !pb-8' : 'section-padding',
          compact && '!pt-10'
        )}
      >
        {!pageMode && (
          <div className="mb-12 text-center">
            <SectionBadge className="mb-4">Pricing Plan</SectionBadge>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem]">
              Transparent Pricing Structure
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-stc-gray sm:text-base">
              All plans are negotiable based on project scope. Free consultation with our founders.
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={clsx('relative', plan.popular && 'lg:-mt-6 lg:mb-6')}
            >
              {plan.popular && (
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-stc-primary/30 blur-2xl"
                  aria-hidden
                />
              )}
              <div
                className={clsx(
                  'relative flex h-full flex-col rounded-3xl p-7 sm:p-9 transition',
                  plan.popular
                    ? 'border-2 border-stc-primary bg-[#061024] shadow-2xl ring-1 ring-stc-primary/30'
                    : 'border border-slate-800/90 bg-[#070c18] shadow-xl'
                )}
              >
                {plan.popular && (
                  <span className="absolute right-7 top-7 rounded-full bg-blue-950/80 border border-blue-500/50 px-3.5 py-1 text-xs font-semibold text-blue-200 shadow-sm">
                    Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl font-bold text-white">
                  {plan.popular ? 'Popular Plan' : `${plan.name} Plan`}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="font-serif text-4xl font-bold text-stc-primary sm:text-5xl">
                    {plan.priceLabel}
                  </span>
                  {plan.price && (
                    <span className="ml-1 text-sm text-slate-400">
                      / project
                    </span>
                  )}
                </div>
                <p className="mt-7 text-sm font-semibold text-white">
                  Features
                </p>
                <ul className="mt-4 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-slate-200"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stc-primary">
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
                    plan.popular
                      ? 'bg-stc-primary text-white hover:bg-stc-primary-light shadow-fly'
                      : 'border border-slate-700/80 bg-[#131b2e] text-white hover:bg-[#1a253e]'
                  )}
                >
                  Get Started Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <p
            className={clsx(
              'mt-10 text-center text-sm',
              pageMode ? 'text-stc-muted' : 'text-stc-gray'
            )}
          >
            All prices are negotiable. Book a free call with Md Saif Ali or Ashwini T Gadad anytime.
          </p>
        )}
      </div>
    </section>
  );
}
