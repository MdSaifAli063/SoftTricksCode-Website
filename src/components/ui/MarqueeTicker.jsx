const TAPE_A = [
  'DIGITAL AGENCY',
  'MARKETING SOLUTION',
  'BUSINESS SOLUTION',
  'SOFTWARE AGENCY',
  'INNOVATIVE STRATEGY',
];

const TAPE_B = [
  'DIGITAL AGENCY',
  'DESIGN AGENCY',
  'INNOVATIVE STRATEGY',
  'WEB DEVELOPMENT',
  'AI SOLUTIONS',
];

function Tape({ items, reverse, dark }) {
  const content = (
    <>
      {[...items, ...items].map((text, i) => (
        <span key={`${text}-${i}`} className="flex shrink-0 items-center gap-6 px-8">
          <span className="whitespace-nowrap text-[10px] font-bold tracking-[0.2em] sm:text-xs">
            {text}
          </span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[8px]">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`w-full overflow-hidden py-3.5 sm:py-4 ${
        dark ? 'bg-stc-black text-white' : 'bg-stc-primary text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)]'
      }`}
    >
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {content}
      </div>
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div className="relative z-10 overflow-x-hidden py-6 sm:py-8">
      {/* Dark tape — tilted up */}
      <div className="relative z-10 w-[112%] -translate-x-[6%] rotate-[2.5deg]">
        <Tape items={TAPE_A} dark />
      </div>

      {/* Blue tape — tilted down, overlaps center */}
      <div className="relative z-20 -mt-3 w-[112%] -translate-x-[6%] -rotate-[2.5deg] sm:-mt-4">
        <Tape items={TAPE_B} reverse />
      </div>
    </div>
  );
}
