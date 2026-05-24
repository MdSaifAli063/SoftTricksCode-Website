import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import SectionBadge from './SectionBadge';
import CircleArrowBtn from './CircleArrowBtn';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  variant = 'dark',
  actionLabel,
  actionTo,
  split = false,
}) {
  const isLight = variant === 'light';

  if (split) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-xl">
          {badge && <SectionBadge className="mb-4">{badge}</SectionBadge>}
          <h2
            className={clsx(
              'font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]',
              isLight ? 'text-stc-black' : 'text-white'
            )}
          >
            {title}
          </h2>
        </div>
        <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
          {subtitle && (
            <p className={clsx('text-sm leading-relaxed sm:text-base', isLight ? 'text-stc-muted' : 'text-stc-gray')}>
              {subtitle}
            </p>
          )}
          {actionLabel && actionTo && (
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={actionTo}
                className="inline-flex items-center gap-3 rounded-full bg-stc-primary px-5 py-2.5 text-sm font-semibold text-white"
              >
                {actionLabel}
              </Link>
              <CircleArrowBtn to={actionTo} />
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  const alignClass =
    align === 'center' ? 'text-center mx-auto' : align === 'left' ? 'text-left' : 'text-right';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx('mb-10 max-w-3xl sm:mb-12', alignClass)}
    >
      {badge && (
        <SectionBadge className={clsx('mb-4', align === 'center' && 'mx-auto')}>{badge}</SectionBadge>
      )}
      <h2
        className={clsx(
          'font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]',
          isLight ? 'text-stc-black' : 'text-white'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('mt-4 text-base sm:text-lg', isLight ? 'text-stc-muted' : 'text-stc-gray')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
