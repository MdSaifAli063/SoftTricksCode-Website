import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionBadge from '../ui/SectionBadge';
import CircleArrowBtn from '../ui/CircleArrowBtn';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Testimonials() {
  return (
    <section className="section-padding overflow-hidden bg-[#d6e4ff]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <SectionBadge className="mb-4">Testimonials</SectionBadge>
          <h2 className="font-serif text-3xl font-bold leading-tight text-stc-black sm:text-4xl lg:text-[2.5rem]">
            Real Experiences Shared By Our Clients
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-800 sm:text-base lg:mx-0">
            Our clients share real experiences working with Soft Tricks Code — showcasing the quality,
            reliability, and innovative solutions we deliver across industries.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/contact"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-stc-primary px-6 py-3 text-sm font-semibold text-white shadow-fly transition hover:bg-stc-primary-light sm:w-auto sm:max-w-none"
            >
              View All Testimonials
            </Link>
            <CircleArrowBtn to="/contact" label="View testimonials" />
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-stc-navy via-stc-black to-stc-navy p-4 shadow-2xl sm:p-8 md:p-10 lg:max-w-none">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stc-primary/30 blur-3xl sm:h-48 sm:w-48"
              aria-hidden
            />

            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              observer={true}
              observeParents={true}
              loop
              navigation={{
                prevEl: '.testimonial-prev',
                nextEl: '.testimonial-next',
              }}
              className="relative z-10 w-full min-w-0"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="flex min-h-[240px] min-w-0 flex-col sm:min-h-[280px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-wrap gap-0.5 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" />
                        ))}
                      </div>
                      {/* Keep desktop icon same as before; shrink only on mobile */}
                      <Quote className="shrink-0 text-stc-primary/80 block h-9 w-9 sm:hidden" />
                      <Quote className="shrink-0 text-stc-primary/80 hidden sm:block" size={40} />
                    </div>
                    <p className="mt-4 px-1 text-center text-sm leading-relaxed text-white/90 sm:mt-6 sm:px-0 sm:text-base">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="mt-auto sm:mt-0">
                      <hr className="my-4 border-white/15 sm:my-8" />
                      <div className="flex min-w-0 items-center justify-center gap-3 px-1 sm:justify-start sm:px-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-12 w-12 rounded-full border-2 border-stc-primary/40 object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">{t.name}</p>
                          <p className="truncate text-sm text-stc-gray">{t.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="relative z-10 mt-4 flex justify-end gap-2 pr-0 sm:mt-6 sm:pr-2">
              <button
                type="button"
                className="testimonial-prev flex h-10 w-10 items-center justify-center rounded-full border border-stc-primary/40 bg-stc-navy text-stc-primary-light transition hover:bg-stc-primary/20 sm:h-11 sm:w-11"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="testimonial-next flex h-10 w-10 items-center justify-center rounded-full bg-stc-primary text-white transition hover:bg-stc-primary-light sm:h-11 sm:w-11"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
