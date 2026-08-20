export const services = [
  {
    id: 'website',
    icon: '🌐',
    title: 'Website',
    description:
      'Professional business websites, landing pages, and company sites — fast, responsive, and built to convert visitors into customers.',
    tags: ['WordPress', 'React', 'SEO-ready'],
    featured: true,
  },
  {
    id: 'web-apps',
    icon: '💻',
    title: 'Web Apps',
    description:
      'Custom web applications, SaaS platforms, admin dashboards, and portals with secure backends and scalable architecture.',
    tags: ['React', 'Next.js', 'Node.js'],
    featured: true,
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Mobile App Development',
    description:
      'iOS and Android apps with React Native or Flutter — polished UX, push notifications, and reliable performance.',
    tags: ['React Native', 'Flutter', 'iOS & Android'],
    featured: true,
  },
  {
    id: 'digital-marketing',
    icon: '📣',
    title: 'Digital Marketing',
    description:
      'SEO, social media, paid ads, and content strategy to grow your brand online and drive qualified leads.',
    tags: ['SEO', 'Social Media', 'Google Ads'],
    featured: true,
  },
  {
    id: 'branding',
    icon: '🎨',
    title: 'Logo Designing & Branding',
    description:
      'Memorable logos, brand identity, color systems, and visual guidelines that make your business stand out.',
    tags: ['Logo Design', 'Brand Kit', 'UI Identity'],
    featured: true,
  },
  {
    id: 'web',
    icon: '🌐',
    title: 'Web Development',
    description:
      'Full-stack web development — from MVPs to enterprise platforms with modern frameworks and best practices.',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI & ML Solutions',
    description:
      'Smart chatbots, recommendation engines, and predictive tools powered by cutting-edge AI.',
    tags: ['Python', 'TensorFlow', 'OpenAI'],
  },
  {
    id: 'ecommerce',
    icon: '🛍️',
    title: 'E-Commerce Platforms',
    description:
      'Full-featured online stores with payments, inventory, and admin dashboards.',
    tags: ['Stripe', 'WooCommerce', 'Custom'],
  },
  {
    id: 'healthcare',
    icon: '🏥',
    title: 'Healthcare Software',
    description:
      'Patient management, telemedicine platforms, and health tracking applications.',
    tags: ['HIPAA-aware', 'Telemedicine'],
  },
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture Tech',
    description:
      'Crop monitoring, smart farm dashboards, and IoT integrations for modern agriculture.',
    tags: ['IoT', 'Dashboards', 'AI'],
  },
  {
    id: 'edtech',
    icon: '🎓',
    title: 'EdTech Platforms',
    description:
      'LMS systems, quiz apps, and online course marketplaces for educators worldwide.',
    tags: ['LMS', 'Video', 'Quizzes'],
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & DevOps',
    description:
      'AWS/GCP deployment, CI/CD pipelines, Docker, and Kubernetes for scalable infrastructure.',
    tags: ['AWS', 'Docker', 'K8s'],
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Cybersecurity Solutions',
    description:
      'Penetration testing tools, security audits, and hardened application architecture.',
    tags: ['Audits', 'Pentest', 'Secure SDLC'],
  },
];

export const featuredServices = services.filter((s) => s.featured);
