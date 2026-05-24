import { motion } from 'framer-motion';
import GlowButton from '../ui/GlowButton';
import { useBooking } from '../../context/BookingContext';

export default function CTABanner() {
  const { openBooking } = useBooking();

  return (
    <section className="section-padding">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-gradient-blue px-6 py-12 text-center shadow-fly-lg sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <h2 className="relative font-serif text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Ready to Build Your Next Big Idea?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-blue-100/90">
            Book a free consultation with our founders. We&apos;ll discuss your goals and create a
            roadmap tailored to your business.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton
              onClick={openBooking}
              className="w-full !bg-white !text-stc-primary shadow-lg hover:!bg-blue-50 sm:w-auto"
            >
              Book Free Call
            </GlowButton>
            <GlowButton
              to="/contact"
              variant="outline"
              className="w-full border-white/40 !text-white hover:!bg-white/10 sm:w-auto"
            >
              Contact Us
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
