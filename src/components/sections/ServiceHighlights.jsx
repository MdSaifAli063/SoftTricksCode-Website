import { motion } from 'framer-motion';
import { Cloud, Brain, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    num: '01',
    icon: Cloud,
    title: 'Web & Cloud Services',
    description:
      'Custom websites, web applications, and scalable cloud deployment on AWS, GCP, and modern stacks.',
    featured: false,
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Intelligent chatbots, automation, and ML models that help your business work smarter and faster.',
    featured: true,
  },
  {
    num: '03',
    icon: Shield,
    title: 'Cyber Security',
    description:
      'Secure architecture, audits, and hardened applications built with security from day one.',
    featured: false,
  },
];

export default function ServiceHighlights() {
  return (
    <section className="relative z-20 -mt-6 px-4 pb-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-rays opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {highlights.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to="/services"
              className={`group relative block h-full p-6 transition hover:-translate-y-1 sm:p-7 ${
                item.featured ? 'fly-glass-featured' : 'fly-glass'
              }`}
            >
              <item.icon className="text-white/90" size={28} strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-lg font-bold text-white sm:text-xl">{item.title}</h3>
              <hr className="my-4 border-white/15" />
              <p className="text-sm leading-relaxed text-stc-gray">{item.description}</p>
              <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-stc-primary/30 text-xs font-bold text-white">
                {item.num}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
