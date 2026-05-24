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
      {items.map((text) => (
        <span key={text} className="flex shrink-0 items-center gap-6 px-8">
          <span className="text-[10px] font-bold tracking-[0.2em] sm:text-xs">{text}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[8px]">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`overflow-hidden py-3.5 ${dark ? 'bg-stc-black text-white' : 'bg-stc-primary text-white'}`}
      style={{ transform: reverse ? 'rotate(-2.5deg)' : 'rotate(2.5deg)' }}
    >
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {content}
        {content}
      </div>
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div className="relative z-10 overflow-hidden py-2">
      <Tape items={TAPE_A} dark />
      <div className="-mt-2">
        <Tape items={TAPE_B} reverse />
      </div>
    </div>
  );
}
