import { services } from '../../data/services';
import { founders } from '../../data/founders';
import { openRoles } from '../../data/hiring';
import { SITE } from '../../constants/site';

// Knowledge Corpus & Multi-Intent Classifier
export function processUserQuery(rawInput) {
  const query = (rawInput || '').toLowerCase().trim();

  if (!query) {
    return {
      text: "How can I help you today? Ask me about our services, pricing, projects, founders, or hiring!",
      actions: [
        { label: '🚀 Explore Services', action: 'nav_services' },
        { label: '💼 View Portfolio', action: 'nav_portfolio' },
        { label: '💰 Pricing Plans', action: 'nav_pricing' },
        { label: '📅 Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 1. Greetings & Pleasantries
  if (/^(hi|hello|hey|hola|namaste|good\s*(morning|afternoon|evening)|yo|start|sup|help|who\s*are\s*you)/i.test(query)) {
    return {
      text: `Hello! 👋 Welcome to **Soft Tricks Code**.

I'm your 24/7 AI Assistant, fully trained on everything we do. I can answer questions about:
• **Our Services** (Web, Mobile, AI/ML, SaaS, Cloud & DevOps, UI/UX)
• **Live Projects & Portfolio** (Computer World, LandHub, Mietaaf, AI Recruiters, Healthcare)
• **Pricing & Packages** (Starter ₹5,999, Professional ₹14,999, Enterprise)
• **Our Founders & Team** (Md Saif Ali, Ashwini T Gadad, Faraz Akram)
• **Hiring & Careers** (Open engineering & design roles)
• **Booking a Free Consultation**

What would you like to explore?`,
      actions: [
        { label: '🚀 View Services', action: 'nav_services' },
        { label: '💰 See Pricing', action: 'nav_pricing' },
        { label: '💼 View Portfolio', action: 'nav_portfolio' },
        { label: '📅 Book a Free Call', action: 'book_call' },
      ],
    };
  }

  // 2. Both Founders / General Founders query (Check plural first!)
  if (/(founders|co-founders|leadership|owners|who started|who created|executives)/i.test(query)) {
    const saif = founders.find((f) => f.id === 'saif');
    const ashwini = founders.find((f) => f.id === 'ashwini');
    return {
      text: `**Soft Tricks Code** was founded and is led by:

1. **${saif?.name || 'Md Saif Ali'}** — **Founder & CEO**
• **Role**: Full-Stack & AI Systems Architect (React, Next.js, Node.js, Python, Cloud).
• **Mission**: Building enterprise-grade digital systems and sharing software tutorials on YouTube (\`@SoftTricksCode\`).
• **Phone/WhatsApp**: \`${saif?.phone || '+91 90312 28966'}\`

2. **${ashwini?.name || 'Ashwini T Gadad'}** — **Co-Founder & COO**
• **Role**: Operations, Product Strategy, and Client Success.
• **Mission**: Leading operational execution, client partnerships, and delivery quality across global projects.
• **Phone**: \`${ashwini?.phone || '+91 90351 98788'}\``,
      actions: [
        { label: '👥 Meet The Full Team', action: 'nav_about' },
        { label: '💬 WhatsApp Saif', action: 'whatsapp_saif' },
        { label: '📅 Book Discovery Call', action: 'book_call' },
      ],
    };
  }

  // 3. Who is Saif / Founder Md Saif Ali
  if (/(saif|md saif ali|ceo|founder saif|lead engineer|saif ali)/i.test(query)) {
    const saif = founders.find((f) => f.id === 'saif');
    return {
      text: `**${saif?.name || 'Md Saif Ali'}** is the **Founder & CEO** and Lead Full-Stack & AI Developer at Soft Tricks Code.

• **Specialization**: React, Next.js, Node.js, Python, AI/ML, and Cloud Architecture.
• **Mission**: Building enterprise-grade software products and sharing practical coding tutorials with a global developer community.
• **Contact / Socials**:
  - YouTube: [Soft Tricks Code Channel](${saif?.social?.youtube || 'https://www.youtube.com/@SoftTricksCode'})
  - GitHub: [github.com/MdSaifAli063](${saif?.social?.github || 'https://github.com/MdSaifAli063'})
  - LinkedIn: [Md Saif Ali LinkedIn](${saif?.social?.linkedin || 'https://www.linkedin.com/in/mdsaifali063'})
  - Phone / WhatsApp: \`${saif?.phone || '+91 90312 28966'}\``,
      actions: [
        { label: '💬 Chat on WhatsApp', action: 'whatsapp_saif' },
        { label: '👥 Meet The Team', action: 'nav_about' },
        { label: '📅 Book Call with Saif', action: 'book_call' },
      ],
    };
  }

  // 4. Who is Ashwini / Co-Founder Ashwini T Gadad
  if (/(ashwini|ashwini t gadad|co-founder|co founder|coo|who is ashwini)/i.test(query)) {
    const ashwini = founders.find((f) => f.id === 'ashwini');
    return {
      text: `**${ashwini?.name || 'Ashwini T Gadad'}** is the **Co-Founder & COO** at Soft Tricks Code.

• **Focus**: Operations, Product Strategy, Client Success, and Requirements Engineering.
• **Role**: She oversees strategic execution, ensures seamless client deliveries, and drives business expansion across global markets.
• **Contact**:
  - LinkedIn: [Ashwini T Gadad LinkedIn](${ashwini?.social?.linkedin || 'https://www.linkedin.com/in/ashwini-gadad-154844378'})
  - Phone: \`${ashwini?.phone || '+91 90351 98788'}\``,
      actions: [
        { label: '👥 View Full Team', action: 'nav_about' },
        { label: '📅 Book Discovery Call', action: 'book_call' },
        { label: '📧 Email Us', action: 'email_us' },
      ],
    };
  }

  // 5. Who is Faraz / CTO / Team
  if (/(faraz|faraz akram|cto|team|engineers|who works|staff|employees)/i.test(query)) {
    return {
      text: `Our core leadership and technical engineering team includes:

1. **Md Saif Ali** — Founder & CEO (Full-Stack & AI Systems)
2. **Ashwini T Gadad** — Co-Founder & COO (Operations & Client Success)
3. **Faraz Akram** — CTO & DevOps Engineer (Frontend, Backend & CI/CD Pipelines)

We also have a passionate squad of full-stack engineers, UI/UX designers, and QA specialists building custom software solutions for startups worldwide.`,
      actions: [
        { label: '👥 Meet Our Team', action: 'nav_about' },
        { label: '💼 We Are Hiring!', action: 'nav_careers' },
        { label: '📅 Schedule a Meeting', action: 'book_call' },
      ],
    };
  }

  // 6. Pricing, Rates, Packages & Cost
  if (/(price|pricing|cost|rate|package|starter|professional|enterprise|how much|fee|quote|budget|charge)/i.test(query)) {
    return {
      text: `We offer transparent, highly competitive, and **negotiable** pricing plans:

🔵 **Starter Plan — ₹5,999** (~$75)
• Best for landing pages & portfolio websites (up to 5 pages)
• Responsive design, SEO setup, and 1 month free support

🌟 **Professional Plan — ₹14,999** (~$180) *(Most Popular)*
• Full business website or custom web app (up to 15 pages)
• Custom backend, database, admin dashboard & 3 months support

💎 **Enterprise Plan — Custom Quote**
• Large-scale SaaS platforms, AI integrations, unlimited pages & features
• Dedicated squad, DevOps setup, and 24/7 priority SLA

💡 *Every project is unique — we customize packages to match your exact budget and requirements!*`,
      actions: [
        { label: '💰 Explore Pricing Page', action: 'nav_pricing' },
        { label: '📅 Get a Custom Quote', action: 'book_call' },
        { label: '💬 Talk on WhatsApp', action: 'whatsapp_saif' },
      ],
    };
  }

  // 7. Discount & Negotiation
  if (/(discount|negotiat|cheap|lower price|deal|offer|best price|reduce price)/i.test(query)) {
    return {
      text: `Yes! We believe in building long-term partnerships with startups and businesses of all sizes.

• All our pricing tiers are **flexible and negotiable** based on your timeline and feature scope.
• We offer startup discounts and flexible milestone payment schedules.

Let's hop on a brief consultation call to tailor a package that fits your budget!`,
      actions: [
        { label: '📅 Book Free Consultation', action: 'book_call' },
        { label: '💬 WhatsApp Founder', action: 'whatsapp_saif' },
        { label: '📧 Request Quote by Email', action: 'email_us' },
      ],
    };
  }

  // 8. Web Development & Web Apps / Tech Stack
  if (/(web development|website|web app|saas|react|next\.?js|tailwind|frontend|backend|fullstack|node|python|django|mongodb|postgres)/i.test(query)) {
    return {
      text: `Our **Web Development & SaaS Engineering** capabilities include:

• **Modern Frontend**: React 19, Next.js, Vite, TypeScript, Tailwind CSS, Framer Motion.
• **High-Performance Architecture**: 100/100 Google Lighthouse scores, mobile-first responsive UX, server-side rendering (SSR), and technical SEO.
• **Robust Backends**: Node.js, Express, Python, Django, PostgreSQL, MongoDB, GraphQL, REST APIs.
• **Security & Payments**: OAuth, JWT, Stripe, Razorpay integration, multi-tenant RBAC permissions.

We build everything from landing pages to full enterprise SaaS portals!`,
      actions: [
        { label: '🚀 All Services', action: 'nav_services' },
        { label: '💼 Web Case Studies', action: 'nav_portfolio' },
        { label: '📅 Discuss Your Project', action: 'book_call' },
      ],
    };
  }

  // 9. Mobile App Development
  if (/(mobile|android|ios|flutter|react native|app development|play store|app store|phone app)/i.test(query)) {
    return {
      text: `Our **Mobile App Development** services cover:

• **Cross-Platform**: React Native & Flutter for fast, native 60fps performance on both **iOS** and **Android**.
• **Offline-First**: Local storage, background synchronization, and push notifications.
• **Native Features**: Camera/Hardware APIs, Maps & Geolocation, biometric authentication.
• **Deployment**: Complete end-to-end publishing support on Apple App Store & Google Play Store.`,
      actions: [
        { label: '📱 View Mobile Services', action: 'nav_services' },
        { label: '💼 Mobile Apps Portfolio', action: 'nav_portfolio' },
        { label: '📅 Request App Estimate', action: 'book_call' },
      ],
    };
  }

  // 10. AI & Machine Learning Solutions
  if (/(ai|machine learning|ml|chatbot|gpt|openai|gemini|llm|rag|langchain|automation|smart|predict)/i.test(query)) {
    return {
      text: `Our **AI & Machine Learning** solutions empower businesses with smart automation:

• **Custom AI Chatbots & Agents**: Built with OpenAI GPT-4o, Gemini API, and LangChain for 24/7 intelligent customer support.
• **RAG Systems**: Retrieval-Augmented Generation with Vector Databases (Pinecone/ChromaDB) to chat with your private company data.
• **Predictive Models**: Data forecasting, recommendation engines, and computer vision.
• **Workflow Automation**: Automated document parsing, extraction, and intelligent lead processing.`,
      actions: [
        { label: '🤖 AI Services Overview', action: 'nav_services' },
        { label: '💼 Live AI Projects', action: 'nav_portfolio' },
        { label: '📅 Book AI Consultation', action: 'book_call' },
      ],
    };
  }

  // 11. Specific Portfolio Projects (Computer World, LandHub, Mietaaf, ElectED, HireMind, Medicine Reminder)
  if (/(computer world|landhub|land hub|mietaaf|elected|hiremind|medicine reminder|hospital|crop|food delivery|pizza|portfolio|projects|case studies|live demo|work)/i.test(query)) {
    return {
      text: `Here are some of our featured live client projects & platforms:

1. **Computer World** — Computer & Laptop Sales, Repair services portal with real-time customer enquiry workflow. *(Next.js, TypeScript, Tailwind)*
2. **LandHub** — Bengaluru real estate property discovery, listings, and site visit booking platform. *(Next.js, React, Tailwind)*
3. **Mietaaf Men's E-commerce** — High-converting fashion ecommerce storefront with checkout and Razorpay payments. *(Next.js, TypeScript, Node.js)*
4. **HireMind AI** — AI-powered talent matching & recruitment platform using LLMs and semantic embeddings. *(Python, TensorFlow, React)*
5. **Medicine Reminder & Health System** — Healthcare patient portal with automated reminders and prescription tracking. *(Node.js, MongoDB)*
6. **ElectED** — Interactive democratic election process education platform. *(Next.js, PostgreSQL, Stripe)*`,
      actions: [
        { label: '💼 Open Full Portfolio', action: 'nav_portfolio' },
        { label: '💰 View Pricing Plans', action: 'nav_pricing' },
        { label: '📅 Build a Similar App', action: 'book_call' },
      ],
    };
  }

  // 12. Hiring, Jobs, Careers & Internships
  if (/(hire|hiring|career|job|jobs|vacancy|intern|internship|apply|work with you|resume|open role)/i.test(query)) {
    const rolesList = openRoles.map((r) => `• **${r.title}** (${r.type})`).join('\n');
    return {
      text: `We are actively hiring talented builders and designers to join **Soft Tricks Code**!

**Open Positions**:
${rolesList}

• **Work Modes**: Remote, Hybrid, On-site (India)
• **Experience Levels**: Fresher / Intern, 1–2 yrs, 3–5 yrs, 5+ yrs
• **Process**: Apply directly through our Careers page — our founders review every single application within 48 hours!`,
      actions: [
        { label: '🚀 View Open Roles & Apply', action: 'nav_careers' },
        { label: '📧 Email Resume Directly', action: 'email_us' },
      ],
    };
  }

  // 13. Project Timeline & Delivery
  if (/(how long|timeline|duration|deadline|delivery|turnaround|how many days|how fast|weeks)/i.test(query)) {
    return {
      text: `Our typical delivery timelines:

• **Landing Pages & Starter Sites**: **1 – 2 weeks**
• **Full Business Websites & E-Commerce**: **3 – 6 weeks**
• **Complex Web Apps, Mobile Apps & SaaS**: **2 – 4 months**

We work with agile sprint milestones so you see working progress every single week!`,
      actions: [
        { label: '📅 Get Exact Project Timeline', action: 'book_call' },
        { label: '💰 Check Packages', action: 'nav_pricing' },
      ],
    };
  }

  // 14. Payment Process & Milestones
  if (/(payment|milestone|advance|upfront|installments|terms|payment process|pay)/i.test(query)) {
    return {
      text: `We follow a safe, transparent **milestone-based payment structure**:

1. **40% Upfront**: Upon signing agreement & sprint kickoff
2. **40% Milestone Delivery**: After core feature build & staging preview approval
3. **20% Final Launch**: Upon final deployment, domain linking, and handover

*Flexible custom payment plans and EMI options are available for startups!*`,
      actions: [
        { label: '📅 Discuss Payment Options', action: 'book_call' },
        { label: '💰 View Pricing Tiers', action: 'nav_pricing' },
      ],
    };
  }

  // 15. NDA, Confidentiality & Code Ownership
  if (/(nda|confidential|privacy|security|agreement|contract|intellectual property|ip|code ownership)/i.test(query)) {
    return {
      text: `**100% Security & Code Ownership Guaranteed**:

• **Non-Disclosure Agreement (NDA)**: We gladly sign mutual NDAs before you share proprietary ideas or documents.
• **Full IP Ownership**: You retain 100% ownership of your source code, designs, database schemas, and digital assets.
• **Security Best Practices**: Encrypted credentials, clean repository handoffs, and secure CI/CD pipelines.`,
      actions: [
        { label: '📅 Request NDA & Consultation', action: 'book_call' },
        { label: '📧 Contact Us', action: 'email_us' },
      ],
    };
  }

  // 16. Contact, Email, Phone, Consultation, Location
  if (/(contact|email|phone|whatsapp|call|reach|location|address|headquarters|talk to human|consultation|book)/i.test(query)) {
    return {
      text: `Here is how you can connect directly with **Soft Tricks Code**:

• **Email**: [softtrickscode@gmail.com](mailto:softtrickscode@gmail.com)
• **Phone / WhatsApp (Founder Md Saif Ali)**: \`${SITE.phone}\`
• **Phone (Co-Founder Ashwini T Gadad)**: \`${SITE.coFounder.phone}\`
• **Phone (CTO Faraz Akram)**: \`+91 86037 78367\`
• **Location / Operations**: Operating globally from India for clients worldwide.
• **Free Consultation**: Schedule a 30-minute discovery call using our instant booking calendar!`,
      actions: [
        { label: '📅 Book Free Consultation', action: 'book_call' },
        { label: '💬 Open WhatsApp', action: 'whatsapp_saif' },
        { label: '📧 Send an Email', action: 'email_us' },
      ],
    };
  }

  // 17. Technologies & Tools / Tech Stack
  if (/(technology|technologies|tools|stack|frameworks|database|aws|cloud|docker|git)/i.test(query)) {
    return {
      text: `Our core engineering technology stack includes:

• **Frontend**: React, Next.js, Vite, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3.
• **Backend**: Node.js, Express, Python, Django, Fastify, REST APIs, GraphQL.
• **Databases**: PostgreSQL, MongoDB, Redis, MySQL, Supabase, Firebase.
• **Mobile**: React Native, Flutter, Expo, Swift, Kotlin.
• **AI & ML**: OpenAI GPT-4o, Google Gemini, LangChain, PyTorch, TensorFlow, Pinecone.
• **Cloud & DevOps**: AWS (EC2/S3/Lambda), Google Cloud Platform (GCP), Docker, Kubernetes, GitHub Actions, Vercel.`,
      actions: [
        { label: '🚀 Explore Services', action: 'nav_services' },
        { label: '💼 View Portfolio Projects', action: 'nav_portfolio' },
        { label: '📅 Discuss Architecture', action: 'book_call' },
      ],
    };
  }

  // 18. Client Testimonials & Reviews
  if (/(reviews|testimonial|testimonials|feedback|rating|client|reputation|trust)/i.test(query)) {
    return {
      text: `Clients love working with **Soft Tricks Code**!

⭐⭐⭐⭐⭐ **5.0 Average Client Rating**
• *"Soft Tricks Code transformed our business with an ultra-fast web application and exceptional attention to detail."*
• *"Delivered on time, communicated proactively, and exceeded our design and performance expectations."*

Read verified testimonials and client feedback across our homepage!`,
      actions: [
        { label: '🌟 View Testimonials on Home', action: 'nav_home' },
        { label: '💼 See Past Work', action: 'nav_portfolio' },
        { label: '📅 Start Your Project', action: 'book_call' },
      ],
    };
  }

  // 19. Blog & Engineering Articles
  if (/(blog|article|guide|tutorial|learn|read|documentation)/i.test(query)) {
    return {
      text: `Explore our engineering guides and technical tutorials on the **Soft Tricks Code Blog**:

• **React Best Practices for Production Apps in 2025**
• **Why We Choose Vite Over Webpack in 2025**
• **Building HIPAA-Aware Healthcare Software**
• **How AI Chatbots Transform Customer Support**`,
      actions: [
        { label: '📚 Open Blog', action: 'nav_blog' },
        { label: '📅 Book a Call', action: 'book_call' },
      ],
    };
  }

  // 20. All Services Inquiry
  if (/(service|services|offer|what do you do|help me with)/i.test(query)) {
    const list = services.slice(0, 7).map((s) => `• **${s.title}**: ${s.description.slice(0, 70)}...`).join('\n');
    return {
      text: `**Soft Tricks Code** provides end-to-end digital solutions:

${list}
• *Plus Cloud & DevOps, Cybersecurity, UI/UX Branding & Digital Marketing.*`,
      actions: [
        { label: '🚀 View All Services', action: 'nav_services' },
        { label: '💰 Check Pricing', action: 'nav_pricing' },
        { label: '📅 Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 21. Intelligent Fallback
  return {
    text: `Thanks for asking about **"${rawInput}"**!

**Soft Tricks Code** provides custom Web Development, Mobile Apps (React Native/Flutter), AI Solutions, Cloud DevOps, and SaaS Engineering with transparent pricing starting at ₹5,999.

Would you like to speak directly with our founders, explore our services, or book a free discovery call?`,
    actions: [
      { label: '🚀 View Services', action: 'nav_services' },
      { label: '💰 See Pricing Plans', action: 'nav_pricing' },
      { label: '📅 Book Free Call', action: 'book_call' },
      { label: '💬 WhatsApp Founder', action: 'whatsapp_saif' },
    ],
  };
}
