import { Check } from 'lucide-react';
import clsx from 'clsx';

export default function SectionBadge({ children, className, variant = 'blue' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold',
        variant === 'blue' && 'bg-stc-primary text-white',
        variant === 'outline' && 'border border-stc-primary/30 bg-stc-primary/10 text-stc-primary',
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
        <Check size={10} strokeWidth={3} className="text-white" />
      </span>
      {children}
    </span>
  );
}
