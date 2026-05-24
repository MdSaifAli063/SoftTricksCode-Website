import { motion } from 'framer-motion';
import { Settings, Smartphone } from 'lucide-react';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import CircleArrowBtn from '../ui/CircleArrowBtn';
import GlowButton from '../ui/GlowButton';
import { staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';

const featuredImages = {
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&h=500&fit=crop',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=500&fit=crop',
};

const featuredMeta = {
  web: { icon: Settings, label: 'Web Development' },
  mobile: { icon: Smartphone, label: 'Mobile Apps' },
};

export default function Services({
  limit,
  showAllLink = true,
  showFeatured = false,
  pageMode = false,
}) {
  const items = limit ? services.slice(0, limit) : services;
  const featured = showFeatured ? services.slice(0, 2) : [];
  const gridItems = showFeatured ? services.slice(2, limit || 6) : items;

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
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="fly-service-card"
                >
                  <div className="grid lg:grid-cols-2">
                    <img
                      src={featuredImages[service.id] || featuredImages.web}
                      alt={service.title}
                      className="h-56 w-full object-cover lg:h-full lg:min-h-[260px]"
                      loading="lazy"
                    />
                    <div className="fly-service-panel relative">
                      <div className="relative z-10">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stc-primary/40 bg-stc-primary/20">
                          <Icon className="text-stc-primary-light" size={22} />
                        </span>
                        <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-3xl">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-stc-gray">
                          {service.description}
                        </p>
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
                <div className="fly-glass h-full p-6 transition hover:border-stc-primary/30">
                  <span className="text-3xl" role="img" aria-hidden>
                    {service.icon}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold text-white">{service.title}</h3>
                  <hr className="my-3 border-white/10" />
                  <p className="text-sm leading-relaxed text-stc-gray">{service.description}</p>
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
