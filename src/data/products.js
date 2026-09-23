export const products = [
  {
    id: 'dailydoubt',
    name: 'Dailydoubt',
    slug: 'dailydoubt',
    tagline: 'Your Digital Business & Shop Ledger, Made Simple.',
    badge: 'Flagship Launched Product',
    category: 'FinTech & Retail Management',
    status: 'Live & Active',
    websiteUrl: 'https://www.dailydoubt.com',
    downloadUrl:
      'https://expo.dev/accounts/softtrickscode/projects/dailydoubt/builds/560786a7-31ae-453f-b127-891592814ae7',
    image: '/images/products/dailydoubt.webp',
    heroDescription:
      'Dailydoubt helps Indian shopkeepers, retailers, and small businesses track daily collections, categorized expenses, and net profit — with built-in GST tax invoicing, a smart business calculator, and multi-lingual support.',
    story:
      'Engineered and launched by Soft Tricks Code, Dailydoubt replaces cumbersome paper bahi-khatas with a blazing-fast, secure, and intuitive 3-number ledger that gives shop owners instant financial clarity over daily earnings, tax compliance, and business growth.',
    languages: ['English', 'हिंदी (Hindi)', 'ಕನ್ನಡ (Kannada)'],
    metrics: [
      { value: '3-Tap', label: 'Daily Ledger Entry' },
      { value: '100%', label: 'GST Compliant' },
      { value: '3', label: 'Indian Languages' },
      { value: '0', label: 'Device Permissions' },
    ],
    features: [
      {
        id: 'ledger',
        title: '3-Number Daily Ledger',
        description:
          'Input Daily Collection, Shop Business Expenses, and Home Expenses. Dailydoubt instantly calculates exact Net Daily & Monthly Profit with clear trend graphs.',
        icon: 'ReceiptText',
      },
      {
        id: 'gst-invoicing',
        title: 'Smart GST Invoicing',
        description:
          'Generate professional GST invoices with automatic 50/50 CGST & SGST split, sequential numbering (INV-0001), parchment PDFs, and 1-tap WhatsApp sharing.',
        icon: 'FileSpreadsheet',
      },
      {
        id: 'calculator',
        title: 'Indian Business Calculator',
        description:
          'Built-in numeric pad with Indian numbering formatting (₹ 1,25,000), quick GST rate chips (+5%, +12%, +18%, +28%), discount percentage keys, and running tape audit.',
        icon: 'Calculator',
      },
      {
        id: 'trilingual',
        title: 'Trilingual by Design',
        description:
          'Native localization for retail shopkeepers across India in English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ) for zero-friction onboarding.',
        icon: 'Languages',
      },
      {
        id: 'reports',
        title: 'Multi-Tab Financial Reports',
        description:
          'Export structured financial summaries by Day, Week, Month, or Custom Date Range directly to Excel spreadsheets and clean printable PDFs.',
        icon: 'FileText',
      },
      {
        id: 'security',
        title: 'Zero Permissions & Cloud Sync',
        description:
          'Respects merchant privacy with zero invasive device permissions. 100% cloud-synced via Supabase with PostgreSQL Row Level Security (RLS).',
        icon: 'ShieldCheck',
      },
    ],
    techStack: [
      'React Native',
      'Expo EAS',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL RLS',
      'Node.js',
      'PDF Engine',
    ],
    platforms: ['Android App', 'Web Platform'],
  },
];

export const upcomingProducts = [
  {
    id: 'ui-builder',
    name: 'STC UI Builder',
    tagline: 'Visual Drag-and-Drop UI & Website Builder',
    category: 'Developer Tools & SaaS',
    status: 'In Development',
    badge: 'Coming Soon',
    description:
      'Next-generation visual interface builder empowering developers, creators, and businesses to assemble high-converting web layouts, responsive UI components, and export clean, production-ready React, Tailwind CSS, and HTML code in seconds.',
    image: '/images/products/ui-builder-showcase.webp',
    tech: ['React', 'Tailwind CSS', 'TypeScript', 'Canvas Engine', 'Node.js'],
  },
];
