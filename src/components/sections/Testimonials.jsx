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
        <div>
          <SectionBadge className="mb-4">Testimonials</SectionBadge>
          <h2 className="font-serif text-3xl font-bold leading-tight text-stc-black sm:text-4xl lg:text-[2.5rem]">
            Real Experiences Shared By Our Clients
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stc-muted sm:text-base">
            Our clients share real experiences working with SoftTricksCode — showcasing the quality,
            reliability, and innovative solutions we deliver across industries.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-stc-primary px-6 py-3 text-sm font-semibold text-white shadow-fly transition hover:bg-stc-primary-light"
            >
              View All Testimonials
            </Link>
            <CircleArrowBtn to="/contact" label="View testimonials" />
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stc-navy via-stc-black to-stc-navy p-6 shadow-2xl sm:p-8 md:p-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stc-primary/30 blur-3xl"
              aria-hidden
            />

            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              loop
              navigation={{
                prevEl: '.testimonial-prev',
                nextEl: '.testimonial-next',
              }}
              className="relative z-10"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="min-h-[280px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" />
                        ))}
                      </div>
                      <Quote className="shrink-0 text-stc-primary/80" size={40} />
                    </div>
                    <p className="mt-6 text-center text-sm leading-relaxed text-white/90 sm:text-base">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <hr className="my-8 border-white/15" />
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-12 w-12 rounded-full border-2 border-stc-primary/40 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-stc-gray">{t.company}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="relative z-10 mt-6 flex justify-end gap-2 pr-2">
              <button
                type="button"
                className="testimonial-prev flex h-11 w-11 items-center justify-center rounded-full border border-stc-primary/40 bg-stc-navy text-stc-primary-light transition hover:bg-stc-primary/20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="testimonial-next flex h-11 w-11 items-center justify-center rounded-full bg-stc-primary text-white transition hover:bg-stc-primary-light"
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
