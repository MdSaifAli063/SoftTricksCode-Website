import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  white: 'btn-white',
  'outline-dark': 'btn-outline-dark',
  ghost:
    'rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-stc-gray transition hover:bg-white/10 hover:text-white',
};

export default function GlowButton({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  to,
  href,
  disabled,
  ...props
}) {
  const classes = clsx(
    'inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stc-primary disabled:opacity-50',
    variants[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
