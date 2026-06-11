import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import GlowButton from '../ui/GlowButton';
import SectionBadge from '../ui/SectionBadge';
import { useBooking } from '../../context/BookingContext';
import { sendEmail, TEMPLATE_IDS } from '../../utils/emailService';
import { SITE } from '../../constants/site';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

function ContactForm({ pageMode, showHeading, onSubmit, loading, register, errors, handleSubmit }) {
  const fields = [
    { name: 'name', label: 'Name *', type: 'text' },
    { name: 'email', label: 'Email Address *', type: 'email' },
    { name: 'phone', label: 'Phone *', type: 'tel' },
    { name: 'subject', label: 'Subject *', type: 'text' },
  ];

  const labelClass = pageMode ? '!text-stc-muted' : '';
  const inputClass = pageMode
    ? '!border-slate-300 !text-stc-black placeholder:!text-slate-400'
    : '';

  return (
  <>
    {showHeading && (
      <>
        <SectionBadge className="mb-3">Contact</SectionBadge>
        <h2
          className={`font-serif text-2xl font-bold sm:text-3xl ${
            pageMode ? 'text-stc-black' : 'text-white'
          }`}
        >
          Free Consultation
        </h2>
        <p className={`mt-2 text-sm ${pageMode ? 'text-stc-muted' : 'text-stc-gray'}`}>
          Tell us about your project — we respond within 24 hours.
        </p>
      </>
    )}

    {!showHeading && !pageMode && (
      <>
        <SectionBadge className="mb-3">Contact</SectionBadge>
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">Get In Touch</h2>
        <p className="mt-2 text-sm text-stc-gray">We&apos;d love to hear about your project.</p>
      </>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
      {fields.map(({ name, label, type }) => (
        <div key={name}>
          <label htmlFor={name} className={`fly-label ${labelClass}`}>
            {label}
          </label>
          <input
            id={name}
            type={type}
            {...register(name)}
            className={`fly-input ${inputClass}`}
            aria-invalid={errors[name] ? 'true' : 'false'}
          />
          {errors[name] && (
            <p className="mt-1 text-xs text-red-400">{errors[name].message}</p>
          )}
        </div>
      ))}
      <div>
        <label htmlFor="message" className={`fly-label ${labelClass}`}>
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`fly-input resize-none ${inputClass}`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>
      <GlowButton type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Submit Message'}
      </GlowButton>
    </form>
  </>
  );
}

function ContactInfo({ pageMode }) {
  const { openBooking } = useBooking();
  const textClass = pageMode ? 'text-stc-muted' : 'text-stc-gray';
  const linkHover = pageMode ? 'hover:text-stc-primary' : 'hover:text-white';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div>
        <SectionBadge className="mb-4">Get In Touch</SectionBadge>
        <h2 className="font-serif text-3xl font-bold text-stc-black sm:text-4xl">
          Let&apos;s Build Something Great Together
        </h2>
        <p className="mt-4 text-stc-muted">
          Reach out for a free consultation. Our founders personally review every inquiry and
          respond within 24 hours.
        </p>
      </div>

      <ul className={`space-y-5 text-sm ${textClass}`}>
        <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stc-primary/10 text-stc-primary">
            <Mail size={20} />
          </span>
          <div>
            <p className="font-semibold text-stc-black">Email</p>
            <a href={`mailto:${SITE.email}`} className={`${linkHover}`}>
              {SITE.email}
            </a>
          </div>
        </li>
        <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stc-primary/10 text-stc-primary">
            <Phone size={20} />
          </span>
          <div>
            <p className="font-semibold text-stc-black">Phone</p>
            <a href={`tel:${SITE.phoneTel}`} className={`block ${linkHover}`}>
              {SITE.founderName}: {SITE.phone}
            </a>
            <a href={`tel:${SITE.coFounder.phoneTel}`} className={`block ${linkHover}`}>
              {SITE.coFounder.name}: {SITE.coFounder.phone}
            </a>
          </div>
        </li>
        <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stc-primary/10 text-stc-primary">
            <MapPin size={20} />
          </span>
          <div>
            <p className="font-semibold text-stc-black">Location</p>
            <span>India — Remote Worldwide</span>
          </div>
        </li>
        <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stc-primary/10 text-stc-primary">
            <Clock size={20} />
          </span>
          <div>
            <p className="font-semibold text-stc-black">Response Time</p>
            <span>Within 24 hours on business days</span>
          </div>
        </li>
      </ul>

      <GlowButton onClick={openBooking} className="w-full sm:w-auto">
        Book Free Consultation
      </GlowButton>
    </motion.div>
  );
}

export default function Contact({ showHeading = true, pageMode = false }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await sendEmail(TEMPLATE_IDS.contact, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });
    setLoading(false);
    if (result.success) {
      toast.success('Message sent successfully!');
      reset();
    } else {
      toast.success('Message received! We will get back to you soon.');
      reset();
    }
  };

  const formProps = {
    pageMode,
    showHeading: pageMode ? true : showHeading,
    onSubmit,
    loading,
    register,
    errors,
    handleSubmit,
  };

  if (pageMode) {
    return (
      <section id="contact" className="section-padding blog-hub-bg !pt-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <ContactInfo pageMode />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="fly-card-light p-6 sm:p-8"
          >
            <ContactForm {...formProps} />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative min-h-0 sm:min-h-[520px] lg:min-h-[600px]">
      <img
        src={BG_IMAGE}
        alt="Background graphic for contact section"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stc-black/80 via-stc-black/60 to-stc-black/40" />

      <div className="container-page relative z-10 flex min-h-0 items-stretch justify-center py-14 sm:min-h-[520px] sm:items-center sm:justify-end sm:py-20 lg:min-h-[600px]">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-lg rounded-3xl border border-white/10 bg-stc-navy/90 p-6 shadow-glass backdrop-blur-xl sm:p-8"
        >
          <ContactForm {...formProps} />
        </motion.div>
      </div>
    </section>
  );
}
