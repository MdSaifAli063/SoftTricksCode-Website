import { useState } from 'react';
import Seo from '../components/ui/Seo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Briefcase, Send } from 'lucide-react';
import PageBanner from '../components/ui/PageBanner';
import SectionBadge from '../components/ui/SectionBadge';
import GlowButton from '../components/ui/GlowButton';
import { openRoles, experienceLevels, workModes } from '../data/hiring';
import { sendEmail, TEMPLATE_IDS } from '../utils/emailService';
import { SITE } from '../constants/site';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  role: z.string().min(1, 'Select a role'),
  experience: z.string().min(1, 'Select experience level'),
  workMode: z.string().min(1, 'Select work preference'),
  portfolio: z
    .string()
    .optional()
    .refine((v) => !v?.trim() || /^https?:\/\/.+/i.test(v.trim()), 'Enter a valid portfolio or GitHub URL'),
  linkedin: z
    .string()
    .optional()
    .refine((v) => !v?.trim() || /^https?:\/\/.+/i.test(v.trim()), 'Enter a valid LinkedIn URL'),
  message: z.string().min(30, 'Tell us about yourself (at least 30 characters)'),
});

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stc-black placeholder:text-slate-400 focus:border-stc-primary focus:outline-none focus:ring-2 focus:ring-stc-primary/20';

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stc-muted';

export default function HiringPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { portfolio: '', linkedin: '' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await sendEmail(TEMPLATE_IDS.hiring, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      subject: `[Job Application] ${data.role} — ${data.name}`,
      applying_for: data.role,
      experience: data.experience,
      work_mode: data.workMode,
      portfolio: data.portfolio || 'Not provided',
      linkedin: data.linkedin || 'Not provided',
      message: data.message,
      reply_to: data.email,
    });
    setLoading(false);

    if (result.success) {
      toast.success('Application sent! We will review and contact you soon.');
      reset();
      return;
    }

    const body = encodeURIComponent(
      `Role: ${data.role}\nExperience: ${data.experience}\nWork mode: ${data.workMode}\nPhone: ${data.phone}\nPortfolio: ${data.portfolio?.trim() || '—'}\nLinkedIn: ${data.linkedin?.trim() || '—'}\n\n${data.message}`
    );
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Job Application: ${data.role} — ${data.name}`)}&body=${body}`;

    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
      window.location.assign(mailto);
      toast.success('Opening your email app to send the application.');
    } else {
      toast.error('Could not send online. Try again or email us directly.');
      setTimeout(() => {
        window.location.assign(mailto);
      }, 1500);
    }
  };

  return (
    <>
      <Seo
        title="Careers — Soft Tricks Code"
        description="Join Soft Tricks Code for frontend, backend, AI, cloud, and product engineering roles. Remote-friendly hiring from startups to enterprise projects."
        pathname="/careers"
        robots="noindex, follow"
      />

      <PageBanner
        badge="Careers"
        title="We're Hiring — Build With Us"
        subtitle="Remote-friendly roles across engineering and design. Apply in minutes — applications go straight to our team."
        breadcrumbs={['Careers']}
      />

      <section className="section-padding section-light !pt-10">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/about"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stc-primary hover:underline"
          >
            <ArrowLeft size={18} /> Back to team
          </Link>

          <div className="mb-12 max-w-2xl">
            <SectionBadge className="mb-4">Open roles</SectionBadge>
            <h2 className="font-serif text-2xl font-bold text-stc-black sm:text-3xl">
              Developers, designers & builders welcome
            </h2>
            <p className="mt-3 text-stc-muted">
              Soft Tricks Code is growing. We work on real client products — websites, apps, AI, and
              custom software. If you love shipping quality work, we want to hear from you.
            </p>
          </div>

          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {openRoles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="fly-card-light flex flex-col p-5 transition hover:border-stc-primary/40 hover:shadow-fly-card"
              >
                <Briefcase className="mb-3 text-stc-primary" size={22} />
                <h3 className="font-serif text-lg font-bold text-stc-black">{role.title}</h3>
                <p className="mt-1 text-xs font-semibold text-stc-primary">{role.type}</p>
                <p className="mt-2 flex-1 text-sm text-stc-muted">{role.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <SectionBadge className="mb-4">Apply now</SectionBadge>
            <h2 className="font-serif text-2xl font-bold text-stc-black sm:text-3xl">
              Submit your application
            </h2>
            <p className="mt-2 text-sm text-stc-muted">
              Fill out the form below. Your details are emailed to{' '}
              <a href={`mailto:${SITE.email}`} className="font-medium text-stc-primary hover:underline">
                {SITE.email}
              </a>
              .
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="fly-card-light mt-8 space-y-5 p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="hire-name" className={labelClass}>
                      Full name *
                    </label>
                    <input id="hire-name" type="text" {...register('name')} className={inputClass} />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="hire-email" className={labelClass}>
                      Email *
                    </label>
                    <input id="hire-email" type="email" {...register('email')} className={inputClass} />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="hire-phone" className={labelClass}>
                    Phone / WhatsApp *
                  </label>
                  <input id="hire-phone" type="tel" {...register('phone')} className={inputClass} />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hire-role" className={labelClass}>
                    Role applying for *
                  </label>
                  <select id="hire-role" {...register('role')} className={inputClass}>
                    <option value="">Select role</option>
                    {openRoles.map((r) => (
                      <option key={r.id} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hire-exp" className={labelClass}>
                    Experience *
                  </label>
                  <select id="hire-exp" {...register('experience')} className={inputClass}>
                    <option value="">Select level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-xs text-red-500">{errors.experience.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hire-mode" className={labelClass}>
                    Work preference *
                  </label>
                  <select id="hire-mode" {...register('workMode')} className={inputClass}>
                    <option value="">Select mode</option>
                    {workModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                  {errors.workMode && (
                    <p className="mt-1 text-xs text-red-500">{errors.workMode.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hire-portfolio" className={labelClass}>
                    Portfolio / GitHub
                  </label>
                  <input
                    id="hire-portfolio"
                    type="url"
                    placeholder="https://github.com/you"
                    {...register('portfolio')}
                    className={inputClass}
                  />
                  {errors.portfolio && (
                    <p className="mt-1 text-xs text-red-500">{errors.portfolio.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hire-linkedin" className={labelClass}>
                    LinkedIn
                  </label>
                  <input
                    id="hire-linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    {...register('linkedin')}
                    className={inputClass}
                  />
                  {errors.linkedin && (
                    <p className="mt-1 text-xs text-red-500">{errors.linkedin.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="hire-message" className={labelClass}>
                  About you & why you want to join *
                </label>
                <textarea
                  id="hire-message"
                  rows={5}
                  {...register('message')}
                  className={`${inputClass} resize-y`}
                  placeholder="Skills, projects, availability, expected CTC (optional)..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <GlowButton type="submit" className="w-full gap-2 sm:w-auto" disabled={loading}>
                {loading ? 'Sending...' : (
                  <>
                    Submit application <Send size={18} />
                  </>
                )}
              </GlowButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
