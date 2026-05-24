import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

export default function CircleArrowBtn({ to, href, onClick, className, label }) {
  const classes = clsx(
    'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stc-primary text-white shadow-fly transition hover:scale-105 hover:bg-stc-primary-light',
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label || 'Learn more'}>
        <ArrowUpRight size={20} />
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={label || 'Learn more'} target="_blank" rel="noopener noreferrer">
        <ArrowUpRight size={20} />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={label || 'Learn more'}>
      <ArrowUpRight size={20} />
    </button>
  );
}
