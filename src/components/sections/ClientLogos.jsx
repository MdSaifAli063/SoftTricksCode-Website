const logos = [
  'Healthcare',
  'AgriTech',
  'EdTech',
  'E-Commerce',
  'FinTech',
  'SaaS',
  'Real Estate',
  'AI & Automation',
  'Logistics',
];

const MARQUEE_ITEMS = [
  ...logos,
  ...logos,
  ...logos,
  ...logos,
];

export default function ClientLogos() {
  return (
    <section className="border-y border-slate-200 bg-white py-6 sm:py-7 overflow-hidden">
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 py-1 hover:[animation-play-state:paused] sm:gap-12 lg:gap-14">
          {MARQUEE_ITEMS.map((name, idx) => (
            <div key={`${name}-${idx}`} className="flex items-center gap-8 sm:gap-12 lg:gap-14">
              <span className="whitespace-nowrap font-body text-sm font-semibold text-slate-600 transition hover:text-stc-primary sm:text-base lg:text-lg">
                {name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-stc-primary/40" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
