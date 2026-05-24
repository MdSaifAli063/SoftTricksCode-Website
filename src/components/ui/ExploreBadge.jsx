import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ExploreBadge({ to = '/portfolio' }) {
  return (
    <Link
      to={to}
      className="group absolute bottom-3 right-3 z-20 flex h-20 w-20 items-center justify-center sm:bottom-auto sm:right-[-1rem] sm:top-1/2 sm:h-28 sm:w-28 sm:-translate-y-1/2"
      aria-label="Explore our work"
    >
      <span
        className="absolute inset-0 animate-spin-slow rounded-full border border-white/20"
        style={{ animationDuration: '12s' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path id="exploreCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-white text-[9px] font-semibold uppercase tracking-[0.2em]">
            <textPath href="#exploreCircle" startOffset="0%">
              EXPLORE MORE • EXPLORE MORE •
            </textPath>
          </text>
        </svg>
      </span>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stc-primary text-white shadow-fly transition group-hover:scale-110 sm:h-14 sm:w-14">
        <ArrowUpRight size={22} />
      </span>
    </Link>
  );
}
