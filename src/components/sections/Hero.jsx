import { motion } from 'framer-motion';
import GlowButton from '../ui/GlowButton';
import ExploreBadge from '../ui/ExploreBadge';
import { useBooking } from '../../context/BookingContext';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=600&q=75';

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="hero-flytech relative pb-0 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(7rem+env(safe-area-inset-top,0px))]">
      <div className="container-page relative z-10 pb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl font-serif text-[1.85rem] font-bold leading-[1.15] text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          Innovate with Smart Software Solutions for Business Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stc-gray sm:text-lg"
        >
          Innovate with SoftTricksCode — your software partner for websites, mobile apps, AI tools,
          and custom platforms across healthcare, agriculture, education, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <GlowButton onClick={openBooking} variant="outline" className="w-full sm:w-auto">
            Free Consultation
          </GlowButton>
          <GlowButton to="/portfolio" variant="white" className="w-full sm:w-auto">
            Explore Our Work
          </GlowButton>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="container-page relative z-10 pb-16 sm:pb-20"
      >
        <div className="relative overflow-hidden rounded-4xl border border-white/10 shadow-fly-lg sm:rounded-5xl">
          <img
            src={HERO_IMAGE}
            alt="SoftTricksCode team collaborating on software projects"
            width="1200"
            height="600"
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stc-primary/30 via-transparent to-transparent" />
          <ExploreBadge to="/portfolio" />
        </div>
      </motion.div>
    </section>
  );
}
