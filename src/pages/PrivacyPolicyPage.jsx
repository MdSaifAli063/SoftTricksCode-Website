import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  FileText,
  Key,
  Server,
  Cookie,
  Users,
  Eye,
  Trash2,
  Mail,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import GlowButton from '../components/ui/GlowButton';
import { useBooking } from '../context/BookingContext';
import { SITE } from '../constants/site';

const SECTIONS = [
  { id: 'intro', title: '1. Introduction & Overview', icon: Shield },
  { id: 'collection', title: '2. Information We Collect', icon: Eye },
  { id: 'usage', title: '3. How We Use Your Information', icon: Server },
  { id: 'ip-confidentiality', title: '4. Client IP & AI Confidentiality', icon: Key },
  { id: 'sharing', title: '5. Third-Party Data Sharing', icon: Users },
  { id: 'security', title: '6. Data Security & Storage Protocols', icon: Lock },
  { id: 'cookies', title: '7. Cookies & Tracking Technologies', icon: Cookie },
  { id: 'rights', title: '8. Your Rights & Data Controls', icon: FileText },
  { id: 'retention', title: '9. Data Retention & Secure Disposal', icon: Trash2 },
  { id: 'contact', title: '10. Contact Information & Inquiries', icon: Mail },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <Seo
        title="Privacy Policy — Soft Tricks Code"
        description="Learn how Soft Tricks Code protects client data, respects intellectual property, enforces strict NDAs, and securely handles software development information."
        pathname="/privacy-policy"
      />

      <PageBanner
        badge="Legal & Trust"
        title="Privacy Policy"
        subtitle="Your trust, proprietary software data, and intellectual property confidentiality are paramount to our engineering philosophy."
        breadcrumbs={['Legal', 'Privacy Policy']}
      />

      {/* Key Guarantees Strip (Clean Light Cards) */}
      <section className="border-b border-slate-200 bg-slate-50/80 py-6">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                <Lock size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">100% NDA Protection</p>
                <p className="text-[11px] text-stc-muted">Mutual confidentiality</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Key size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">Full IP Ownership</p>
                <p className="text-[11px] text-stc-muted">Client owns 100% code</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Shield size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">Zero Model Training</p>
                <p className="text-[11px] text-stc-muted">No public AI training</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Server size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">256-Bit SSL Security</p>
                <p className="text-[11px] text-stc-muted">Encrypted at rest & transit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (Light Background matching other pages) */}
      <section className="section-padding section-light min-h-screen">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="fly-card-light p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-heading text-base font-bold text-stc-black flex items-center gap-2">
                      <FileText size={18} className="text-stc-primary" />
                      Table of Contents
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] text-stc-muted font-medium">
                      <Calendar size={12} /> March 2026
                    </span>
                  </div>

                  <nav className="space-y-1">
                    {SECTIONS.map((sec) => {
                      const Icon = sec.icon;
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => scrollToSection(sec.id)}
                          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-stc-primary text-white shadow-md font-semibold translate-x-1'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-stc-black'
                          }`}
                        >
                          <Icon size={14} className={isActive ? 'text-white' : 'text-stc-primary'} />
                          <span className="truncate">{sec.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Quick Consultation Callout */}
                <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-stc-primary text-xs font-bold uppercase tracking-wider">
                    <Sparkles size={14} /> Legal Assistance
                  </div>
                  <h4 className="mt-2 font-heading text-lg font-bold text-stc-black">Have Questions About Your Data or NDA?</h4>
                  <p className="mt-2 text-xs text-stc-muted leading-relaxed">
                    We are happy to sign your custom mutual NDA or discuss data governance before project kick-off.
                  </p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <GlowButton
                      variant="primary"
                      className="w-full justify-center text-xs py-2.5"
                      onClick={openBooking}
                    >
                      Book Free Discovery Call
                    </GlowButton>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2 text-xs font-semibold text-stc-black transition hover:bg-slate-50"
                    >
                      <Mail size={13} className="text-stc-primary" /> {SITE.email}
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Content */}
            <main className="space-y-8 lg:col-span-8">
              
              {/* Last Updated Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs text-stc-muted shadow-sm">
                <span>Effective Date: <strong className="text-stc-black">January 1, 2026</strong></span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 size={14} /> Current Version (Updated: March 2026)
                </span>
              </div>

              {/* Section 1: Intro */}
              <motion.article
                id="intro"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Shield size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 01</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Introduction & Overview</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Welcome to <strong className="text-stc-black">Soft Tricks Code</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We specialize in delivering custom software solutions, high-performance web applications, mobile apps, artificial intelligence engineering, SaaS architectures, and cloud deployments.
                  </p>
                  <p>
                    This Privacy Policy articulates our practices regarding the collection, handling, disclosure, and protection of information obtained through our website (<strong className="text-stc-primary">softtrickscode.com</strong>), client communication channels, consultation bookings, and custom software development engagements.
                  </p>
                  <p>
                    By accessing our platform, requesting consultations, or contracting our software engineering services, you acknowledge the terms established within this policy.
                  </p>
                </div>
              </motion.article>

              {/* Section 2: Collection */}
              <motion.article
                id="collection"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Eye size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 02</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Information We Collect</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                  <p>We collect information strictly necessary to provide cutting-edge software engineering and responsive client service:</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <h4 className="font-bold text-stc-black text-sm">A. Personal Identification</h4>
                      <ul className="mt-2 space-y-1.5 text-xs list-disc list-inside text-slate-600">
                        <li>Full Name and Company Name</li>
                        <li>Work Email Address & Phone / WhatsApp Number</li>
                        <li>Billing details and invoicing addresses</li>
                        <li>Job application details (for careers)</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <h4 className="font-bold text-stc-black text-sm">B. Project & Technical Scope</h4>
                      <ul className="mt-2 space-y-1.5 text-xs list-disc list-inside text-slate-600">
                        <li>Product requirement documents (PRDs)</li>
                        <li>Wireframes, UI designs, and database specifications</li>
                        <li>Repository access and staging environment credentials</li>
                        <li>API configurations and cloud architecture diagrams</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <h4 className="font-bold text-stc-black text-sm">C. Automated Usage & Telemetry</h4>
                    <p className="mt-1 text-xs text-slate-600">
                      We collect anonymized browser data, IP addresses, device types, and page interaction metrics solely to enhance website performance, diagnose technical errors, and optimize user experience.
                    </p>
                  </div>
                </div>
              </motion.article>

              {/* Section 3: Usage */}
              <motion.article
                id="usage"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Server size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 03</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">How We Use Your Information</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>Your information is used strictly for legitimate business and development purposes:</p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stc-primary" />
                      <span><strong>Software Engineering:</strong> Architecting, coding, testing, and deploying custom applications and AI platforms.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stc-primary" />
                      <span><strong>Client Communications:</strong> Project sprint updates, discovery meetings, milestone releases, and technical documentation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stc-primary" />
                      <span><strong>Invoicing & Contracts:</strong> Managing formal proposals, NDAs, Statement of Work (SOW) milestones, and receipts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stc-primary" />
                      <span><strong>Post-Launch Support:</strong> Providing bug resolution, server monitoring, security updates, and SLA maintenance.</span>
                    </li>
                  </ul>
                </div>
              </motion.article>

              {/* Section 4: Client IP & AI Confidentiality (Highlight Card) */}
              <motion.article
                id="ip-confidentiality"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-md sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stc-primary text-white shadow-md">
                    <Key size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 04 • Core Principle</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Client IP & AI Confidentiality</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
                  <p>
                    At <strong className="text-stc-black">Soft Tricks Code</strong>, we treat our clients&apos; intellectual property, software architectures, algorithms, and business logic with the highest level of confidentiality:
                  </p>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-1.5">
                    <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" /> 100% Intellectual Property Ownership
                    </h4>
                    <p className="text-xs text-slate-600">
                      Upon completion of agreed milestone payments, 100% of custom source code, documentation, UI assets, and database schemas are transferred directly and exclusively to the client. We make no claim to your proprietary business assets.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 space-y-1.5">
                    <h4 className="font-bold text-cyan-800 text-sm flex items-center gap-2">
                      <Shield size={16} className="text-cyan-600" /> Strict AI & Machine Learning Guardrails
                    </h4>
                    <p className="text-xs text-slate-600">
                      When building custom AI, RAG, LLM integrations, or fine-tuned models for your business, we configure isolated enterprise API pipelines. <strong>Your private datasets, customer records, and source code are NEVER submitted to public AI models for training or redistribution.</strong>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 space-y-1.5">
                    <h4 className="font-bold text-blue-800 text-sm flex items-center gap-2">
                      <Lock size={16} className="text-stc-primary" /> Non-Disclosure Agreement (NDA) Guarantee
                    </h4>
                    <p className="text-xs text-slate-600">
                      We execute bilateral or unilateral NDAs prior to reviewing proprietary materials. All engineers, contractors, and staff assigned to your project operate under strict confidentiality clauses.
                    </p>
                  </div>
                </div>
              </motion.article>

              {/* Section 5: Third-Party Sharing */}
              <motion.article
                id="sharing"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Users size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 05</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Third-Party Data Sharing</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    <strong className="text-stc-black">We never sell, lease, or monetize client personal data or source code to data brokers or third parties.</strong>
                  </p>
                  <p>
                    Data is shared solely with trusted enterprise sub-processors required to host, execute, and deliver modern software solutions:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm list-disc list-inside">
                    <li><strong>Cloud Infrastructure:</strong> AWS (Amazon Web Services), Google Cloud Platform (GCP), Vercel, and Cloudflare for scalable hosting and edge delivery.</li>
                    <li><strong>Source Code Management:</strong> GitHub Enterprise with encrypted private repositories and two-factor authentication.</li>
                    <li><strong>Communication & Forms:</strong> EmailJS and Google Workspace for encrypted transactional messaging and inquiry response.</li>
                    <li><strong>Compliance & Legal Authorities:</strong> Disclosed only when strictly mandated by enforceable court orders or Indian statutory law.</li>
                  </ul>
                </div>
              </motion.article>

              {/* Section 6: Security */}
              <motion.article
                id="security"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Lock size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 06</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Data Security & Storage Protocols</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>We deploy robust enterprise-grade safeguards to protect data integrity:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="font-bold text-stc-black text-xs">🔐 256-Bit SSL/TLS Encryption</p>
                      <p className="mt-1 text-xs text-slate-600">All traffic across our platform and client APIs is encrypted in transit and at rest using modern cryptographic standards.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="font-bold text-stc-black text-xs">🛡️ Least-Privilege Access</p>
                      <p className="mt-1 text-xs text-slate-600">Access to production keys, staging servers, and databases is strictly limited to authorized engineers on a need-to-know basis.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="font-bold text-stc-black text-xs">⚡ Secure CI/CD Pipelines</p>
                      <p className="mt-1 text-xs text-slate-600">Automated security linting, secret scanning, dependency vulnerability alerts, and isolated build runners.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="font-bold text-stc-black text-xs">🔑 Credential Offboarding</p>
                      <p className="mt-1 text-xs text-slate-600">Upon project completion and signoff, client access tokens, temporary passwords, and API keys are systematically purged.</p>
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Section 7: Cookies */}
              <motion.article
                id="cookies"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Cookie size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 07</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Cookies & Tracking Technologies</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>Our website utilizes cookies and local storage tokens for functionality and optimization:</p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><strong>Essential Cookies:</strong> Required for site navigation, security tokens, and responsive UI states.</li>
                    <li><strong>Analytics Cookies:</strong> Anonymized telemetry to understand visitor journeys, popular services, and page load performance.</li>
                  </ul>
                  <p className="text-xs">
                    You can manage or disable cookie preferences directly through your browser settings. Disabling cookies will not restrict your access to core website information.
                  </p>
                </div>
              </motion.article>

              {/* Section 8: Your Rights */}
              <motion.article
                id="rights"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <FileText size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 08</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Your Rights & Data Controls</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>Regardless of your geographic location, you retain the following rights regarding your information:</p>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <strong className="text-stc-black block text-sm">Right to Access & Portability</strong>
                      Request a copy of any personal data or project logs we hold concerning you.
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <strong className="text-stc-black block text-sm">Right to Rectification</strong>
                      Request immediate correction of inaccurate or incomplete contact or billing records.
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <strong className="text-stc-black block text-sm">Right to Erasure (Right to Be Forgotten)</strong>
                      Request permanent deletion of your personal records and consultation notes.
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <strong className="text-stc-black block text-sm">Right to Object / Withdraw Consent</strong>
                      Opt out of non-essential newsletters or communications at any time.
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Section 9: Retention */}
              <motion.article
                id="retention"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Trash2 size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 09</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Data Retention & Secure Disposal</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    We retain personal and project data only as long as necessary to fulfill active contract milestones, honor post-launch warranty obligations, or satisfy Indian statutory accounting and tax compliance.
                  </p>
                  <p>
                    Temporary development branches, staging databases, and shared secrets are permanently deleted within 60 days of official project delivery and final handover signoff.
                  </p>
                </div>
              </motion.article>

              {/* Section 10: Contact */}
              <motion.article
                id="contact"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 10</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Contact Information & Inquiries</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                  <p>
                    If you have questions, feedback, or requests regarding this Privacy Policy or our confidentiality procedures, please contact our leadership team directly:
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                    <h4 className="font-heading text-base font-bold text-stc-black">Soft Tricks Code</h4>
                    <p className="mt-1 text-xs text-stc-primary font-medium">Software Development & AI Solutions</p>
                    
                    <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                      <div>
                        <span className="text-stc-muted block">Official Inquiries:</span>
                        <a href={`mailto:${SITE.email}`} className="text-stc-black hover:text-stc-primary font-medium">
                          {SITE.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-stc-muted block">Direct Contact:</span>
                        <a href={`tel:${SITE.phoneTel}`} className="text-stc-black hover:text-stc-primary font-medium">
                          {SITE.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-stc-muted block">Headquarters:</span>
                        <span className="text-stc-black">Bangalore, Karnataka, India</span>
                      </div>
                      <div>
                        <span className="text-stc-muted block">Leadership:</span>
                        <span className="text-stc-black">Md Saif Ali (CEO) & Ashwini T Gadad (COO)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to="/terms"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stc-primary hover:underline"
                    >
                      View Terms of Service <ChevronRight size={14} />
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-stc-black"
                    >
                      Contact Our Team <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>

            </main>
          </div>
        </div>
      </section>
    </>
  );
}
