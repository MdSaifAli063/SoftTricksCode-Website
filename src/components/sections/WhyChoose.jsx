import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Headphones, TrendingUp } from 'lucide-react';
import SectionBadge from '../ui/SectionBadge';
import clsx from 'clsx';

const reasons = [
  {
    icon: Zap,
    title: 'Proactive Problem Solving',
    text: 'We anticipate challenges and ship solutions before they become blockers for your team.',
  },
  {
    icon: Headphones,
    title: 'High Professional Team',
    text: 'Experienced developers, designers, and founders who treat your product like their own.',
  },
  {
    icon: TrendingUp,
    title: 'Focus on Business Growth',
    text: 'Architecture and roadmaps built to scale — from MVP to enterprise without costly rewrites.',
  },
];

export default function WhyChoose() {
  const [open, setOpen] = useState(1);

  return (
    <section className="section-padding bg-[#d6e4ff]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-2xl lg:mb-12"
        >
          <SectionBadge className="mb-4">Why Soft Tricks Code</SectionBadge>
          <h2 className="font-serif text-3xl font-bold leading-tight text-stc-black sm:text-4xl lg:text-[2.5rem]">
            Why Choose Us for Software Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stc-muted sm:text-lg">
            From startups to enterprises — strategy, design, and engineering under one roof.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="why-image-lframe overflow-hidden bg-slate-200">
              <picture>
                <source srcSet="/why-choose-team.webp" type="image/webp" />
                <img
                  src="/why-choose-team.jpg"
                  alt="Soft Tricks Code team collaborating on software projects"
                  width="640"
                  height="568"
                  className="block h-full min-h-[320px] w-full object-cover object-center sm:min-h-[380px] lg:min-h-[420px]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center gap-4">
            {reasons.map((r, i) => {
              const isOpen = open === i;
              const Icon = r.icon;

              return (
                <motion.button
                  key={r.title}
                  type="button"
                  onClick={() => setOpen(i)}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  layout
                  className={clsx(
                    'w-full rounded-3xl text-left transition-all duration-300',
                    isOpen
                      ? 'bg-stc-black px-6 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] sm:px-7 sm:py-7'
                      : 'bg-stc-primary px-6 py-5 shadow-fly hover:bg-stc-primary-light sm:px-7 sm:py-6'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={clsx(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                        isOpen
                          ? 'border border-stc-primary/50 bg-stc-primary/20'
                          : 'bg-white/15'
                      )}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.75}
                        className={isOpen ? 'text-stc-primary-light' : 'text-white'}
                      />
                    </span>
                    <h3
                      className={clsx(
                        'font-semibold leading-snug',
                        isOpen
                          ? 'text-lg text-white sm:text-xl'
                          : 'text-base text-white sm:text-lg'
                      )}
                    >
                      {r.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <hr className="my-5 border-stc-primary/30" />
                        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                          {r.text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
