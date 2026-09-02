import { services } from '../../data/services';
import { founders } from '../../data/founders';
import { portfolio } from '../../data/portfolio';
import { openRoles } from '../../data/hiring';
import { SITE } from '../../constants/site';

/**
 * Intelligent Conversational AI Engine & Knowledge Base for Soft Tricks Code
 * High-accuracy semantic & intent classification across all business domains.
 */

function hasWord(query, regex) {
  return regex.test(query);
}

export function processUserQuery(rawInput) {
  const raw = rawInput || '';
  const query = raw.toLowerCase().trim();

  // 0. Empty input
  if (!query) {
    return {
      text: 'Hello! 👋 How can I help you today? Feel free to ask about our software services, pricing packages, live projects, or booking a consultation.',
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 1. Natural Greetings (Hi, Hello, Hey, Good Morning, etc.)
  if (
    hasWord(
      query,
      /^(hi|hello|hey|hola|namaste|good\s*(morning|afternoon|evening)|yo|start|sup|help|welcome|greetings|heyy|hiii)$/i
    ) ||
    query === 'hello there' ||
    query === 'hi there' ||
    query === 'hey there'
  ) {
    return {
      text: 'Hello! 👋 How can I help you today?',
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing Plans', action: 'nav_pricing' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 2. Positive / Casual Sentiment ("good", "fine", "doing well", "nice")
  if (
    hasWord(
      query,
      /^(good|i am good|im good|doing good|fine|im fine|all good|great|nice|well|super|awesome)$/i
    ) ||
    query.includes('im good') ||
    query.includes('doing well') ||
    query.includes('doing good') ||
    query.includes('all good')
  ) {
    return {
      text: 'Glad to hear that! 😊 What kind of project or software solution are you planning to build?',
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Pricing & Plans', action: 'nav_pricing' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 3. Affirmation ("yes", "sure", "interested", "tell me")
  if (hasWord(query, /^(yes|yeah|yep|yup|sure|definitely|of course|interested|tell me|go ahead|why not|ok|okay)$/i)) {
    return {
      text: 'Awesome! Would you like to check out our pricing packages, explore our services, or book a quick 30-minute discovery call with our founders?',
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'WhatsApp Founder', action: 'whatsapp_saif' },
      ],
    };
  }

  // 4. Negation ("no", "nah", "just browsing")
  if (hasWord(query, /^(no|nah|nope|not really|not now|just looking|just browsing|nothing)$/i)) {
    return {
      text: 'No problem at all! Feel free to explore our website or reach out anytime you have questions. 😊',
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 5. Bot Identity ("who are you", "what can you do")
  if (
    hasWord(
      query,
      /\b(who are you|what is your name|what can you do|are you (an? )?ai|are you a bot|how do you work)\b/i
    )
  ) {
    return {
      text: `I'm the **Soft Tricks Code AI Assistant** 🤖

I'm here to help you navigate our company, understand our software services, explore past projects, check pricing tiers, or connect directly with our founders, **Md Saif Ali** and **Ashwini T Gadad**.

What are you looking to build or learn about?`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 6. How are you / Casual pleasantries
  if (hasWord(query, /\b(how are you|how r u|how are you doing|how is it going|whats up)\b/i)) {
    return {
      text: `I'm doing great, thank you for asking! 😊 How can I assist you with your project or inquiry today?`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 7. Thank you / Appreciation / Goodbye
  if (hasWord(query, /\b(thank|thanks|thank you|awesome|bye|goodbye|cya|see you)\b/i)) {
    return {
      text: `You're very welcome! Glad I could help. 😊

If you have any more questions or want to discuss a custom project, feel free to reach out anytime.`,
      actions: [
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'WhatsApp Founder', action: 'whatsapp_saif' },
        { label: 'Explore Services', action: 'nav_services' },
      ],
    };
  }

  // ==========================================
  // 8. CORE SERVICES & OFFERINGS (HIGH PRIORITY)
  // ==========================================
  if (
    hasWord(
      query,
      /\b(service|services|what (services|solutions|work) do you offer|what do you (do|offer|build|provide)|what can you build|offerings?|capabilities)\b/i
    ) &&
    !hasWord(query, /\b(price|pricing|cost|rate|fee|budget|quote)\b/i)
  ) {
    const list = services
      .slice(0, 8)
      .map((s) => `• **${s.title}**: ${s.description.slice(0, 65)}...`)
      .join('\n');

    return {
      text: `**Soft Tricks Code** provides full-lifecycle digital & AI engineering solutions:

${list}
• *Plus Cloud & DevOps, Cybersecurity, UI/UX Branding & Digital Marketing.*

All projects include **100% full source code ownership**, signed **mutual NDAs**, and a **1–3 months free warranty**.`,
      actions: [
        { label: 'Explore All Services', action: 'nav_services' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 9. Web Development & SaaS
  if (
    hasWord(
      query,
      /\b(web development|website|web app|saas|react|next\.?js|vite|tailwind|frontend|backend|fullstack|full-stack|django|fastapi|portal|dashboard)\b/i
    )
  ) {
    return {
      text: `Our **Web Development & SaaS Engineering** services include:

• **Modern Frontend**: React 19, Next.js, Vite, TypeScript, Tailwind CSS, and Framer Motion.
• **High Performance & SEO**: 95+ Google Lighthouse scores, sub-second load times, and structured SEO.
• **Robust Backends**: Node.js, Express, Python (Django / FastAPI), PostgreSQL, MongoDB, Redis, and REST/GraphQL APIs.
• **Enterprise Features**: User authentication, role permissions, Stripe/Razorpay payments, and admin dashboards.`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 10. Mobile App Development
  if (
    hasWord(
      query,
      /\b(mobile|mobile app|android|ios|iphone|flutter|react native|play store|app store|phone app)\b/i
    )
  ) {
    return {
      text: `Our **Mobile App Development** services cover:

• **Cross-Platform**: React Native and Flutter for fast, native 60fps apps on both **iOS** and **Android**.
• **Device Features**: GPS Maps, Camera, Push Notifications, Bluetooth, and Biometric Auth (Face ID / Fingerprint).
• **Offline-First**: Local database caching with smooth background cloud sync.
• **Store Publishing**: End-to-end publishing on the Apple App Store and Google Play Store.`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 11. AI, Machine Learning, LLMs & Chatbots
  if (
    hasWord(
      query,
      /\b(ai|machine learning|ml|chatbot|chatbots|gpt|openai|gemini|llm|llms|rag|langchain|automation|artificial intelligence|vector|pinecone)\b/i
    )
  ) {
    return {
      text: `Our **AI & Machine Learning Solutions** include:

• **Custom AI Chatbots & Support Agents**: Built with OpenAI GPT-4o and Google Gemini for 24/7 client interactions.
• **Private RAG Systems**: Chat with your private company documents, PDFs, and databases securely using Vector DBs (Pinecone, ChromaDB).
• **Predictive Models**: Data forecasting, customer behavior analysis, and smart recommendation engines.
• **Workflow Automation**: Automated data extraction, OCR document parsing, and lead classification.`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 12. E-Commerce Platforms & Online Stores
  if (
    hasWord(
      query,
      /\b(ecommerce|e-commerce|online store|shop|shopping|cart|checkout|shopify|woocommerce|mietaaf)\b/i
    )
  ) {
    return {
      text: `Our **E-Commerce Development** solutions deliver fast, high-converting stores:

• **Custom Headless Stores**: Lightning-fast Next.js & Node.js online stores with product filters, cart, and instant search.
• **Payment Gateways**: Razorpay, Stripe, PayPal, Apple Pay, and Google Pay with automated invoices.
• **Admin & Inventory Control**: Real-time stock management, order tracking, and discount codes.
• **Live Case Study**: We built **Mietaaf** ([mietaaf.com](https://www.mietaaf.com/)), a modern men's fashion e-commerce brand.`,
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 13. Healthcare & Medical Software
  if (
    hasWord(
      query,
      /\b(healthcare|health|hospital|clinic|doctor|patient|medicine|prescription|telemedicine|hipaa)\b/i
    )
  ) {
    return {
      text: `Our **Healthcare & Medical Software** capabilities:

• **Patient Management & EHR Systems**: Online appointments, medical records, and digital prescriptions.
• **Automated Medicine Reminders**: Scheduled reminders via SMS, WhatsApp, and email (check our live **Medicine Reminder System**).
• **Telemedicine Platforms**: WebRTC video consultations with encrypted chat.
• **HIPAA-Aware Security**: 256-bit encryption for patient data at rest and in transit.`,
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 14. Real Estate & PropTech (LandHub)
  if (
    hasWord(
      query,
      /\b(real estate|property|properties|land|landhub|proptech|kengeri|plot|plots|site visit)\b/i
    )
  ) {
    return {
      text: `Our **Real Estate & PropTech** solutions:

• **Featured Client Project — LandHub** ([landhub.property](https://www.landhub.property/)):
  - Built with Next.js, React, TypeScript, and Tailwind CSS.
  - Interactive property search across Bengaluru and Kengeri.
  - Includes property listings, buyer/seller assistance, investment guides, and online site visit booking.`,
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 15. Computer World & IT Portals
  if (
    hasWord(
      query,
      /\b(computer world|computerworld|laptop repair|it services|hardware shop|computer repair)\b/i
    )
  ) {
    return {
      text: `Our **IT Services & Hardware Retail Portal** case study:

• **Featured Client Project — Computer World** ([computerworld.studio](https://computerworld.studio/)):
  - Built with Next.js, TypeScript, React, and Framer Motion.
  - Features computer and laptop inventory, repair service booking, and online customer enquiry workflows.`,
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 16. Cloud, DevOps & Infrastructure
  if (
    hasWord(
      query,
      /\b(cloud|devops|aws|gcp|azure|docker|kubernetes|ci\/cd|pipeline|server|infrastructure)\b/i
    )
  ) {
    return {
      text: `Our **Cloud & DevOps Engineering** services:

• **Cloud Platforms**: AWS (EC2, S3, Lambda, ECS, RDS), Google Cloud Platform (GCP), and DigitalOcean.
• **Containerization & Orchestration**: Docker, Kubernetes, and automated microservices scaling.
• **CI/CD Pipelines**: Automated build, test, and zero-downtime deployment pipelines with GitHub Actions.
• **Monitoring & Security**: 24/7 uptime monitoring, SSL/TLS certificates, firewall protection, and automated backups.`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 17. UI/UX Design & Branding
  if (
    hasWord(
      query,
      /\b(design|ui|ux|ui\/ux|figma|branding|logo|wireframe|prototype)\b/i
    )
  ) {
    return {
      text: `Our **UI/UX Design & Product Branding** services:

• **Figma UI/UX**: Interactive wireframes, high-fidelity prototypes, and comprehensive design systems.
• **Brand Identity**: Custom logos, typography sets, color palettes, and marketing asset kits.
• **User-Centric Architecture**: Conversion-optimized user funnels and accessibility-compliant UI designs.`,
      actions: [
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // ==========================================
  // 18. PRICING & PLANS
  // ==========================================
  if (
    hasWord(
      query,
      /\b(price|pricing|cost|costs|rate|rates|package|packages|starter|professional|enterprise|how much|fee|fees|budget|quote|charge|charges|estimate)\b/i
    ) &&
    !hasWord(query, /\b(discount|negotiat|special offer|cheaper)\b/i)
  ) {
    return {
      text: `We offer transparent, flexible, and **negotiable** pricing packages for both Web and Mobile Apps:

🌐 **Web & SaaS Development:**
• **Starter Plan — ₹5,999** (~$75): Up to 5 pages, responsive design, SEO setup, 1 Month Support
• **Professional Plan — ₹14,999** (~$180): Full web app, backend, database, admin panel, 3 Months Support *(Most Popular)*
• **Enterprise Plan — Custom Quote**: Scalable SaaS, custom AI solutions & dedicated engineering

📱 **Mobile App Development (Android & iOS):**
• **Starter App — ₹24,999** (~$300): Single-platform MVP (6–8 screens), Auth, Firebase/REST API, 2 Months Support
• **Popular App — ₹39,999** (~$480): Cross-platform Android + iOS (Flutter/React Native), Payments, Push Notifications, Admin Panel, 4 Months Warranty
• **Custom App — Custom Quote**: Real-time tracking, live chat, on-device AI/ML & enterprise ecosystem

💡 *All plans are 100% customizable and negotiable to your exact scope and budget.*`,
      actions: [
        { label: 'Explore Pricing Page', action: 'nav_pricing' },
        { label: 'Get a Custom Quote', action: 'book_call' },
        { label: 'WhatsApp Founder', action: 'whatsapp_saif' },
      ],
    };
  }

  // 19. Discounts & Negotiation
  if (
    hasWord(
      query,
      /\b(discount|discounts|negotiat\w*|cheap|cheaper|lower price|reduce (price|cost)|best price|concession|promo code|coupon|special offer|startup discount|student discount)\b/i
    )
  ) {
    return {
      text: `Yes, all our prices are **flexible and negotiable**!

We love working with startups, creators, and growing businesses. We can easily adjust scope, phase features into milestones, or provide custom payment plans to fit your budget.

Let's discuss your project on a free 15-minute consultation call!`,
      actions: [
        { label: 'Book Free Consultation', action: 'book_call' },
        { label: 'WhatsApp Founder', action: 'whatsapp_saif' },
        { label: 'View Pricing Tiers', action: 'nav_pricing' },
      ],
    };
  }

  // 20. Payment Milestones & Process
  if (
    hasWord(
      query,
      /\b(payment method|payment process|milestone|milestones|advance|upfront|installment|how do i pay|upi|bank transfer|stripe|razorpay)\b/i
    )
  ) {
    return {
      text: `We use a safe, transparent **40-40-20 milestone structure**:

1. **40% Kickoff**: Paid upon signing and sprint kickoff.
2. **40% Core Delivery**: Paid after reviewing a working staging demo.
3. **20% Final Launch**: Paid upon final QA approval, domain launch, and complete source code transfer.

We accept **UPI (GPay/PhonePe/Paytm)**, **Bank Wire (NEFT/RTGS)**, and **Stripe** for international clients.`,
      actions: [
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'Terms of Service', action: 'nav_terms' },
      ],
    };
  }

  // 21. Timelines & Durations
  if (
    hasWord(
      query,
      /\b(how long|timeline|timelines|duration|deadline|deadlines|delivery|turnaround|how many days|how fast|how many weeks)\b/i
    )
  ) {
    return {
      text: `Here are our typical delivery timelines:

⏱️ **Landing Pages & Starter Sites**: **1 – 2 weeks**
⏱️ **Full Business Sites & E-Commerce**: **3 – 6 weeks**
⏱️ **Complex Web Apps, Mobile Apps & SaaS**: **2 – 4 months** (with weekly milestone updates)
⏱️ **AI Integrations & Chatbots**: **1 – 3 weeks**

Need urgent delivery? We can allocate a dedicated sprint squad to meet tight deadlines.`,
      actions: [
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
      ],
    };
  }

  // ==========================================
  // 22. PORTFOLIO & PROJECTS
  // ==========================================
  if (
    hasWord(
      query,
      /\b(portfolio|projects?|case stud(y|ies)|past work|work examples|clients?|hiremind|elected)\b/i
    )
  ) {
    const list = portfolio
      .slice(0, 5)
      .map((p, i) => `${i + 1}. **${p.title}** (${p.category}) — *${p.tech.slice(0, 3).join(', ')}*`)
      .join('\n');

    return {
      text: `Here are some of our featured live client projects:

${list}

Every project includes responsive design, custom architecture, and 100% full source code ownership.`,
      actions: [
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // ==========================================
  // 23. FOUNDERS & LEADERSHIP
  // ==========================================
  if (hasWord(query, /\b(saif|md saif ali|saif ali|ceo|founder saif|youtube)\b/i)) {
    const saif = founders.find((f) => f.id === 'saif');
    return {
      text: `**${saif?.name || 'Md Saif Ali'}** is the **Founder & CEO** and Lead Architect at Soft Tricks Code.

• **Specialization**: React 19, Next.js, Node.js, Python, AI/LLM Integrations, and Cloud Architecture.
• **Community**: Runs the [Soft Tricks Code YouTube Channel](${saif?.social?.youtube || 'https://www.youtube.com/@SoftTricksCode'}) with coding tutorials for 25K+ developers.
• **Connect**:
  - GitHub: [github.com/MdSaifAli063](${saif?.social?.github || 'https://github.com/MdSaifAli063'})
  - LinkedIn: [Md Saif Ali LinkedIn](${saif?.social?.linkedin || 'https://www.linkedin.com/in/mdsaifali063'})
  - Phone / WhatsApp: \`${saif?.phone || '+91 90312 28966'}\``,
      actions: [
        { label: 'WhatsApp Saif', action: 'whatsapp_saif' },
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'Meet Our Team', action: 'nav_about' },
      ],
    };
  }

  if (hasWord(query, /\b(ashwini|ashwini t gadad|ashwini gadad|coo|co-founder ashwini)\b/i)) {
    const ashwini = founders.find((f) => f.id === 'ashwini');
    return {
      text: `**${ashwini?.name || 'Ashwini T Gadad'}** is the **Co-Founder & COO** at Soft Tricks Code.

• **Role**: She oversees day-to-day operations, product specifications, agile sprint roadmaps, and client success across global deliverables.
• **Connect**:
  - LinkedIn: [Ashwini T Gadad LinkedIn](${ashwini?.social?.linkedin || 'https://www.linkedin.com/in/ashwini-gadad-154844378'})
  - Phone: \`${ashwini?.phone || '+91 90351 98788'}\``,
      actions: [
        { label: 'Meet Our Team', action: 'nav_about' },
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'Email Us', action: 'email_us' },
      ],
    };
  }

  if (hasWord(query, /\b(faraz|faraz akram|cto|devops lead)\b/i)) {
    return {
      text: `**Faraz Akram** is the **Chief Technology Officer (CTO) & DevOps Lead** at Soft Tricks Code.

• **Role**: He manages scalable server deployments (AWS, GCP), Docker containerization, CI/CD automated test pipelines, and security architecture.
• **Phone**: \`+91 86037 78367\``,
      actions: [
        { label: 'Meet Our Team', action: 'nav_about' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  if (
    hasWord(
      query,
      /\b(founder|founders|co-founder|co founder|leadership|owner|owners|who started|who created|who runs|executive|management|team)\b/i
    )
  ) {
    const saif = founders.find((f) => f.id === 'saif');
    const ashwini = founders.find((f) => f.id === 'ashwini');
    return {
      text: `**Soft Tricks Code** was founded and is led by:

1. **${saif?.name || 'Md Saif Ali'}** — **Founder & CEO**
• Lead Full-Stack & AI Systems Architect.
• Creator of the YouTube channel \`@SoftTricksCode\` (25K+ developers).
• Direct: \`${saif?.phone || '+91 90312 28966'}\`

2. **${ashwini?.name || 'Ashwini T Gadad'}** — **Co-Founder & COO**
• Operations, Product Strategy & Client Delivery Success.
• Direct: \`${ashwini?.phone || '+91 90351 98788'}\`

3. **Faraz Akram** — **CTO & DevOps Lead**
• Cloud Infrastructure, CI/CD Automation & Security.
• Direct: \`+91 86037 78367\``,
      actions: [
        { label: 'Meet Our Team', action: 'nav_about' },
        { label: 'WhatsApp Saif', action: 'whatsapp_saif' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // ==========================================
  // 24. COMPANY OVERVIEW & LOCATION
  // ==========================================
  if (
    hasWord(
      query,
      /\b(what is soft tricks code|about soft tricks code|about company|tell me about soft tricks code|where are you located|where is your office|where is company|headquarters|location|bangalore|bengaluru|why choose soft tricks code|why choose you)\b/i
    )
  ) {
    return {
      text: `**Soft Tricks Code** is a software engineering and AI solutions agency based in **Bangalore (Bengaluru), Karnataka, India**, serving clients across the globe.

We specialize in building:
• **Custom Websites & High-Performance Web Apps** (React, Next.js, Node.js, Python)
• **Cross-Platform Mobile Apps** (iOS & Android with React Native & Flutter)
• **AI Integrations & Custom Chatbots** (OpenAI, Gemini, LangChain, RAG)
• **SaaS Products, Cloud & DevOps** (AWS, GCP, Docker, CI/CD)

Every client gets **100% full source code ownership**, signed **mutual NDAs**, and a **1–3 months free warranty** after launch.`,
      actions: [
        { label: 'Meet Our Team', action: 'nav_about' },
        { label: 'Explore Services', action: 'nav_services' },
        { label: 'View Portfolio', action: 'nav_portfolio' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // ==========================================
  // 25. CODE OWNERSHIP, IP & NDAs
  // ==========================================
  if (
    hasWord(
      query,
      /\b(code ownership|who owns the code|source code|intellectual property|github repo|repository|copyright)\b/i
    )
  ) {
    return {
      text: `**100% Unconditional Client Code Ownership**:

• **Complete Assignment**: Upon final milestone payment, we unconditionally assign all rights, titles, and ownership of your bespoke source code, database architectures, and design assets to you.
• **Direct Repository Transfer**: We transfer the complete GitHub/GitLab repository directly to your account.
• **No Lock-In**: You are free to host anywhere, self-manage, or hand over to an in-house team at any time.`,
      actions: [
        { label: 'Terms of Service', action: 'nav_terms' },
        { label: 'Privacy Policy', action: 'nav_privacy' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  if (
    hasWord(
      query,
      /\b(nda|non disclosure|confidential|confidentiality|secret|sign nda|protect idea)\b/i
    )
  ) {
    return {
      text: `**Client Confidentiality & Mutual NDAs**:

• **Pre-Discovery NDAs**: We readily execute bilateral Non-Disclosure Agreements (NDAs) before you share your pitch deck, specs, or proprietary business concepts.
• **Zero Public AI Training**: Your private project data and custom code are never used to train public AI models.
• **Enterprise Security**: 256-bit SSL encryption and restricted developer access.`,
      actions: [
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'Privacy Policy', action: 'nav_privacy' },
        { label: 'Terms of Service', action: 'nav_terms' },
      ],
    };
  }

  // 26. Post-Launch Warranty & Bug Support
  if (
    hasWord(
      query,
      /\b(warranty|maintenance|support|bug|bugs|fix|after launch|post launch|sla)\b/i
    )
  ) {
    return {
      text: `Every project delivered by Soft Tricks Code includes a complimentary **Post-Launch Bug Warranty**:

🛠️ **Starter Plan**: **1 Month Free Bug Fixing & Support**
🛠️ **Professional & Custom Plans**: **3 Months Free Bug Fixing & Support**

This covers bug fixes, responsive alignment adjustments, and performance tuning against agreed specifications. Ongoing monthly maintenance retainers are also available.`,
      actions: [
        { label: 'Terms of Service', action: 'nav_terms' },
        { label: 'Pricing & Packages', action: 'nav_pricing' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // 27. Privacy Policy & Terms of Service
  if (
    hasWord(
      query,
      /\b(privacy|privacy policy|gdpr|terms|terms of service|tos|legal|jurisdiction)\b/i
    )
  ) {
    return {
      text: `**Legal & Privacy Summary**:

• **Privacy**: 100% data confidentiality, zero public AI training on client data, and 256-bit SSL encryption.
• **Terms**: 40-40-20 milestone gates, 100% client code ownership, 1–3 months free warranty, governed under Bangalore, Karnataka jurisdiction.`,
      actions: [
        { label: 'Privacy Policy', action: 'nav_privacy' },
        { label: 'Terms of Service', action: 'nav_terms' },
        { label: 'Book Free Call', action: 'book_call' },
      ],
    };
  }

  // ==========================================
  // 28. CAREERS & HIRING
  // ==========================================
  if (
    hasWord(
      query,
      /\b(hire|hiring|career|careers|job|jobs|vacancy|vacancies|intern|internship|apply|resume|fresher|freshers)\b/i
    )
  ) {
    const rolesList = openRoles.map((r) => `• **${r.title}** (${r.type}) — *${r.location}*`).join('\n');
    return {
      text: `We are actively hiring talented developers and designers at **Soft Tricks Code**!

**Open Positions**:
${rolesList}

• **Work Options**: Remote, Hybrid, and On-site (India)
• **Experience Levels**: Interns / Freshers to Senior Engineers
• **Review Time**: Founders review every application within 48 hours.`,
      actions: [
        { label: 'View Open Roles & Apply', action: 'nav_careers' },
        { label: 'Email Us', action: 'email_us' },
        { label: 'Meet Our Team', action: 'nav_about' },
      ],
    };
  }

  // ==========================================
  // 29. CONTACT, BOOKING & CHANNELS
  // ==========================================
  if (
    hasWord(
      query,
      /\b(contact|email|phone|whatsapp|call|reach|talk to human|consultation|meeting|book( a)? call|schedule|connect)\b/i
    )
  ) {
    return {
      text: `Here is how you can connect directly with our founders:

• **Email**: [softtrickscode@gmail.com](mailto:softtrickscode@gmail.com)
• **Founder Md Saif Ali**: \`${SITE.phone}\` (Call / WhatsApp)
• **Co-Founder Ashwini T Gadad**: \`${SITE.coFounder.phone}\`
• **CTO Faraz Akram**: \`+91 86037 78367\`
• **Location**: Bangalore, Karnataka, India (Working with clients worldwide)
• **Booking**: You can book a free 30-minute discovery call directly on our site!`,
      actions: [
        { label: 'Book Free Call', action: 'book_call' },
        { label: 'WhatsApp Saif', action: 'whatsapp_saif' },
        { label: 'Email Us', action: 'email_us' },
        { label: 'Contact Page', action: 'nav_contact' },
      ],
    };
  }

  // ==========================================
  // 30. INTELLIGENT NATURAL FALLBACK
  // ==========================================
  return {
    text: `I'd be happy to help you with that! At **Soft Tricks Code**, we build custom websites, web applications, mobile apps (iOS & Android), AI integrations, and SaaS solutions starting from **₹5,999** (negotiable).

Could you tell me a little more about your requirements or what you'd like to build?`,
    actions: [
      { label: 'Explore Services', action: 'nav_services' },
      { label: 'Pricing & Packages', action: 'nav_pricing' },
      { label: 'View Portfolio', action: 'nav_portfolio' },
      { label: 'Book Free Call', action: 'book_call' },
    ],
  };
}
