import GlowButton from '../ui/GlowButton';
import ExploreBadge from '../ui/ExploreBadge';
import { useBooking } from '../../context/BookingContext';

const HERO_IMAGE_600 =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=300&q=70&fm=webp';
const HERO_IMAGE_900 =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&h=450&q=70&fm=webp';
const HERO_IMAGE_1200 =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=600&q=70&fm=webp';

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="hero-flytech relative pb-0 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(7rem+env(safe-area-inset-top,0px))]">
      <div className="container-page relative z-10 pb-8 text-center">
        <h1 className="mx-auto max-w-4xl font-serif text-[1.85rem] font-bold leading-[1.15] text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Innovate with Smart Software Solutions for Business Growth
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stc-gray sm:text-lg">
          Innovate with Soft Tricks Code — your software partner for proprietary digital products,
          high-performance websites, mobile apps, AI tools, and custom enterprise platforms.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlowButton onClick={openBooking} variant="outline" className="w-full sm:w-auto">
            Free Consultation
          </GlowButton>
          <GlowButton to="/portfolio" variant="white" className="w-full sm:w-auto">
            Explore Our Work
          </GlowButton>
        </div>
      </div>

      <div className="container-page relative z-10 pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 shadow-fly-lg sm:rounded-5xl">
          <img
            src={HERO_IMAGE_1200}
            srcSet={`${HERO_IMAGE_600} 600w, ${HERO_IMAGE_900} 900w, ${HERO_IMAGE_1200} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            alt="Soft Tricks Code team collaborating on software projects"
            width="1200"
            height="600"
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stc-primary/30 via-transparent to-transparent" />
          <ExploreBadge to="/portfolio" />
        </div>
      </div>
    </section>
  );
}
