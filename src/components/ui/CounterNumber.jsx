import { useCounter } from '../../hooks/useCounter';
import GlassCard from './GlassCard';

export default function CounterNumber({ end, suffix = '+', label, icon: Icon }) {
  const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10) || 0;
  const displaySuffix = String(end).includes('%') ? '%' : suffix;
  const { ref, count } = useCounter(numericEnd, 2000, displaySuffix);

  return (
    <GlassCard tilt={false} className="text-center">
      <div ref={ref}>
        {Icon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stc-cyan/10 text-stc-cyan">
            <Icon size={24} aria-hidden />
          </div>
        )}
        <div className="font-heading text-3xl font-extrabold gradient-text sm:text-4xl md:text-5xl">
          {count}
        </div>
        <p className="mt-2 text-sm text-stc-gray">{label}</p>
      </div>
    </GlassCard>
  );
}
