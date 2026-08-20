import { motion } from 'framer-motion';
import {
  Globe,
  AppWindow,
  Smartphone,
  Megaphone,
  Palette,
  Settings,
} from 'lucide-react';
import { services, featuredServices } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import CircleArrowBtn from '../ui/CircleArrowBtn';
import GlowButton from '../ui/GlowButton';
import { staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';

const featuredImages = {
  website:
    'https://ik.imagekit.io/77nsbwefl/image_483729fa.png',
  'web-apps':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=560&q=80',
  mobile:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=560&q=80',
  'digital-marketing':
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEN15fmc-f7ErAVuAgwjn2KrmK-zXDxzV1iLOpeCzzJQgBuWBe40Ex12q&s=10',
  branding:
    'https://ik.imagekit.io/77nsbwefl/image_4337613c.png',
};

const imageFallback =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=560&q=80';

const featuredMeta = {
  website: { icon: Globe, label: 'Website' },
  'web-apps': { icon: AppWindow, label: 'Web Apps' },
  mobile: { icon: Smartphone, label: 'Mobile Apps' },
  'digital-marketing': { icon: Megaphone, label: 'Digital Marketing' },
  branding: { icon: Palette, label: 'Branding' },
  web: { icon: Settings, label: 'Web Development' },
};

export default function Services({
  limit,
  showAllLink = true,
  showFeatured = false,
  pageMode = false,
}) {
  const featured = showFeatured ? featuredServices : [];
  const nonFeatured = services.filter((s) => !s.featured);
  const items = limit && !showFeatured ? services.slice(0, limit) : services;
  const gridItems = showFeatured
    ? nonFeatured.slice(0, Math.max(0, (limit || 6) - featured.length))
    : items;

  const sectionClass = pageMode
    ? 'section-padding section-light !pt-12 !pb-16'
    : showFeatured
      ? 'section-padding section-light'
      : 'section-padding section-dark';

  return (
    <section id="services" className={sectionClass}>
      <div className="mx-auto max-w-7xl">
        {!pageMode && (
          <SectionHeading
            badge="Our Services"
            title="Transforming Ideas into Digital Software Solutions"
            subtitle="From concept to deployment — we deliver web, mobile, AI, and enterprise software tailored to your industry."
            variant={showFeatured ? 'light' : 'dark'}
            split={showFeatured}
            actionLabel="View All Services"
            actionTo="/services"
          />
        )}

        {showFeatured && (
          <div className="space-y-6">
            {featured.map((service, i) => {
              const Meta = featuredMeta[service.id] || featuredMeta.web;
              const Icon = Meta.icon;
              const imageRight = i % 2 === 1;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="fly-service-card"
                >
                  <div className="grid lg:grid-cols-2">
                    <img
                      src={featuredImages[service.id] || imageFallback}
                      alt={service.title}
                      className={`h-56 w-full bg-slate-100 object-cover lg:h-full lg:min-h-[260px] ${
                        imageRight ? 'lg:order-2' : 'lg:order-1'
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = imageFallback;
                      }}
                    />
                    <div
                      className={`fly-service-panel relative ${
                        imageRight ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="relative z-10">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stc-primary/40 bg-stc-primary/20">
                          <Icon className="text-stc-primary-light" size={22} />
                        </span>
                        <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-3xl">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/90">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-stc-primary/40 bg-stc-primary/15 px-2.5 py-0.5 text-xs font-medium text-blue-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                          <CircleArrowBtn to="/services" label={`Learn about ${service.title}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!showFeatured && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gridItems.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <div
                  className={`h-full p-6 transition ${
                    pageMode
                      ? 'fly-card-light hover:border-stc-primary/30'
                      : 'fly-glass hover:border-stc-primary/30'
                  }`}
                >
                  <span className="text-3xl" role="img" aria-hidden>
                    {service.icon}
                  </span>
                  <h3
                    className={`mt-4 font-serif text-xl font-bold ${
                      pageMode ? 'text-stc-black' : 'text-white'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <hr className={`my-3 ${pageMode ? 'border-slate-200' : 'border-white/10'}`} />
                  <p
                    className={`text-sm leading-relaxed ${
                      pageMode ? 'text-stc-muted' : 'text-stc-gray'
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-stc-primary/15 px-2.5 py-0.5 text-xs text-stc-primary-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {showAllLink && !showFeatured && (
          <div className="mt-12 text-center">
            <GlowButton to="/services" variant="outline">
              View All Services
            </GlowButton>
          </div>
        )}
      </div>
    </section>
  );
}
