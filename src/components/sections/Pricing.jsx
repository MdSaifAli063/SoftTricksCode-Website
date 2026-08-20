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
        'relative overflow-x-hidden bg-stc-black',
        pageMode ? '!pt-0' : '',
        compact ? 'pb-16 pt-0' : ''
      )}
    >
      <div className="footer-waves pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      {!pageMode && <MarqueeTicker />}

      <div
        className={clsx(
          'relative z-10 mx-auto max-w-7xl',
          pageMode ? 'section-padding !pt-12' : 'section-padding',
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
                  className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-stc-primary/20 blur-2xl"
                  aria-hidden
                />
              )}
              <div
                className={clsx(
                  'relative flex h-full flex-col rounded-3xl border p-6 backdrop-blur-xl sm:p-8',
                  plan.popular
                    ? 'border-stc-primary/60 bg-stc-primary/10 shadow-fly-lg'
                    : 'fly-glass border-white/10'
                )}
              >
                {plan.popular && (
                  <span className="absolute right-6 top-6 rounded-full bg-stc-primary/30 px-3 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
                <h3 className="font-serif text-xl font-bold text-white">
                  {plan.popular ? 'Popular Plan' : `${plan.name} Plan`}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stc-gray">{plan.description}</p>
                <div className="mt-6">
                  <span className="font-serif text-4xl font-bold text-stc-primary sm:text-5xl">
                    {plan.priceLabel}
                  </span>
                  {plan.price && (
                    <span className="ml-1 text-sm text-stc-gray">/ project</span>
                  )}
                </div>
                <p className="mt-6 text-sm font-semibold text-white">Features</p>
                <ul className="mt-4 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stc-gray">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stc-primary">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleCta(plan)}
                  className={clsx(
                    'mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition',
                    plan.popular
                      ? 'bg-stc-primary text-white hover:bg-stc-primary-light'
                      : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
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
          <p className="mt-10 text-center text-sm text-stc-gray">
            All prices are negotiable. Book a free call with Md Saif Ali or Ashwini T Gadad anytime.
          </p>
        )}
      </div>
    </section>
  );
}
