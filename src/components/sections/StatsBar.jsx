import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useCounter } from '../../hooks/useCounter';

const stats = [
  { end: 50, suffix: '+', label: 'Projects Delivered' },
  { end: 30, suffix: '+', label: 'Happy Clients' },
  { end: 5, suffix: '+', label: 'Industries Served' },
  { end: 100, suffix: '%', label: 'Client Satisfaction' },
];

function StatItem({ end, suffix, label }) {
  const { ref, count } = useCounter(end, 2000, suffix);
  return (
    <div ref={ref} className="text-center px-4">
      <p className="font-serif text-3xl font-bold text-stc-primary sm:text-4xl">{count}</p>
      <p className="mt-1 text-xs text-stc-gray sm:text-sm">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="section-padding !py-10 sm:!py-14">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl sm:rounded-5xl">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=500&q=75"
            alt="Team meeting"
            width="1200"
            height="500"
            decoding="async"
            className="h-64 w-full object-cover sm:h-80 md:h-[420px]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stc-primary/50 via-stc-navy/40 to-transparent" />

          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stc-primary text-white shadow-fly-lg transition hover:scale-105 sm:h-20 sm:w-20"
            aria-label="Play intro video"
          >
            <Play size={28} fill="white" className="ml-1" />
          </button>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 -mt-12 mx-4 grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-gradient-card-dark px-6 py-8 shadow-glass sm:mx-8 md:mx-16 md:grid-cols-4 md:px-10 md:py-10"
        >
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
