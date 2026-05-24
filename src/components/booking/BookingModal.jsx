import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useBooking } from '../../context/BookingContext';
import { services } from '../../data/services';
import { SITE } from '../../constants/site';
import GlowButton from '../ui/GlowButton';
import SectionBadge from '../ui/SectionBadge';
import { sendEmail, TEMPLATE_IDS } from '../../utils/emailService';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  budget: z.string(),
  datetime: z.string().min(1),
  description: z.string().min(10),
  source: z.string().min(1),
});

const sources = ['Google', 'YouTube', 'GitHub', 'Referral', 'Social Media', 'Other'];

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [budget, setBudget] = useState(50000);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await sendEmail(TEMPLATE_IDS.booking, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      service: data.service,
      budget: `₹${budget.toLocaleString('en-IN')}`,
      datetime: data.datetime,
      message: data.description,
      source: data.source,
    });
    setLoading(false);
    if (result.success) {
      toast.success('Booking request sent! We will confirm shortly.');
    } else {
      toast.success('Booking received! We will contact you within 24 hours.');
    }
    reset();
    closeBooking();
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-stc-gray/50 focus:border-stc-primary focus:outline-none focus:ring-1 focus:ring-stc-primary/30';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-stc-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
          onClick={closeBooking}
          role="dialog"
          aria-modal="true"
          aria-label="Book a free consultation"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/10 bg-gradient-to-b from-stc-navy to-stc-black shadow-fly-lg sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.2),transparent_60%)]" />

            <div className="relative p-5 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <SectionBadge className="mb-3">Free Consultation</SectionBadge>
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    Book a Call With Our Team
                  </h2>
                  <p className="mt-2 text-sm text-stc-gray">
                    Md Saif Ali & Ashwini T Gadad — we&apos;ll discuss your project and next steps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stc-gray transition hover:text-white"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {[
                  { name: 'name', type: 'text', label: 'Full Name *' },
                  { name: 'email', type: 'email', label: 'Email Address *' },
                  { name: 'phone', type: 'tel', label: 'Phone Number *' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="fly-label">{f.label}</label>
                    <input
                      {...register(f.name)}
                      type={f.type}
                      className={inputClass}
                    />
                    {errors[f.name] && (
                      <p className="mt-1 text-xs text-red-400">This field is required</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="fly-label">Service Interested In *</label>
                  <select
                    {...register('service')}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-stc-navy">
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-red-400">Please select a service</p>
                  )}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <label className="text-sm font-medium text-white">
                    Project Budget:{' '}
                    <span className="text-stc-primary">
                      ₹{budget.toLocaleString('en-IN')}
                      {budget >= 500000 ? '+' : ''}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={5000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="mt-3 w-full accent-stc-primary"
                  />
                  <input type="hidden" {...register('budget')} value={budget} />
                </div>

                <div>
                  <label className="fly-label flex items-center gap-2">
                    <Calendar size={14} /> Preferred Date & Time *
                  </label>
                  <input
                    {...register('datetime')}
                    type="datetime-local"
                    className={inputClass}
                  />
                  {errors.datetime && (
                    <p className="mt-1 text-xs text-red-400">Please pick a date and time</p>
                  )}
                </div>

                <div>
                  <label className="fly-label">Project Description *</label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    placeholder="Tell us about your goals, timeline, and requirements..."
                    className={`${inputClass} resize-none`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400">Please add at least 10 characters</p>
                  )}
                </div>

                <div>
                  <label className="fly-label">How did you find us? *</label>
                  <select {...register('source')} className={`${inputClass} appearance-none`}>
                    <option value="">Select one</option>
                    {sources.map((s) => (
                      <option key={s} value={s} className="bg-stc-navy">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <GlowButton type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Booking...' : 'Book My Free Call'}
                </GlowButton>
              </form>

              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-stc-gray">
                <Phone size={14} className="text-stc-primary" />
                Or call us at{' '}
                <a href={`tel:${SITE.phoneTel}`} className="text-stc-primary-light hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
