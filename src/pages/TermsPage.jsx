import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  DollarSign,
  Key,
  ShieldCheck,
  Users,
  GitPullRequest,
  Wrench,
  AlertTriangle,
  XCircle,
  Scale,
  Mail,
  Calendar,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import GlowButton from '../components/ui/GlowButton';
import { useBooking } from '../context/BookingContext';
import { SITE } from '../constants/site';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance & Services Scope', icon: FileText },
  { id: 'proposals', title: '2. Proposals & Statements of Work', icon: CheckCircle2 },
  { id: 'milestones', title: '3. Milestone Payments & Invoicing', icon: DollarSign },
  { id: 'ip-ownership', title: '4. Source Code Ownership & IP', icon: Key },
  { id: 'confidentiality', title: '5. Confidentiality & NDAs', icon: ShieldCheck },
  { id: 'client-duties', title: '6. Client Obligations & Feedback', icon: Users },
  { id: 'scope-changes', title: '7. Scope Changes & Agile Sprints', icon: GitPullRequest },
  { id: 'warranty', title: '8. Warranty & Post-Launch Support', icon: Wrench },
  { id: 'liability', title: '9. Limitation of Liability & Dependencies', icon: AlertTriangle },
  { id: 'termination', title: '10. Agreement Termination', icon: XCircle },
  { id: 'jurisdiction', title: '11. Governing Law & Dispute Resolution', icon: Scale },
  { id: 'contact', title: '12. Legal Notices & Contact', icon: Mail },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');
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
        title="Terms of Service — Soft Tricks Code"
        description="Review the Terms of Service for Soft Tricks Code. Clear guidelines regarding custom software agreements, milestone payments, source code ownership, and warranties."
        pathname="/terms"
      />

      <PageBanner
        badge="Legal & Agreements"
        title="Terms of Service"
        subtitle="Transparent, collaborative, and fair contractual terms governing our custom software engineering, AI solutions, and client partnerships."
        breadcrumbs={['Legal', 'Terms of Service']}
      />

      {/* Key Guarantees Strip (Clean Light Cards) */}
      <section className="border-b border-slate-200 bg-slate-50/80 py-6">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">40-40-20 Milestones</p>
                <p className="text-[11px] text-stc-muted">Transparent payment stages</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Key size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">100% Code Assignment</p>
                <p className="text-[11px] text-stc-muted">Full ownership upon final release</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Wrench size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">1–3 Mos Free Support</p>
                <p className="text-[11px] text-stc-muted">Post-launch bug warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-semibold text-xs text-stc-black sm:text-sm">Strict Mutual NDA</p>
                <p className="text-[11px] text-stc-muted">Total trade secret protection</p>
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
                    <Sparkles size={14} /> Contract Consultation
                  </div>
                  <h4 className="mt-2 font-heading text-lg font-bold text-stc-black">Need a Custom SOW or Tailored Agreement?</h4>
                  <p className="mt-2 text-xs text-stc-muted leading-relaxed">
                    We accommodate custom enterprise milestones, dedicated team allocations, and customized SLAs.
                  </p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <GlowButton
                      variant="primary"
                      className="w-full justify-center text-xs py-2.5"
                      onClick={openBooking}
                    >
                      Book Free Project Discovery
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

              {/* Section 1: Acceptance & Services Scope */}
              <motion.article
                id="acceptance"
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 01</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Acceptance & Services Scope</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) govern the professional software development and technical consulting services provided by <strong className="text-stc-black">Soft Tricks Code</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) to clients (&quot;Client&quot;, &quot;you&quot;).
                  </p>
                  <p>
                    Our core service offerings include, but are not limited to:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                      <strong className="text-stc-black block">🚀 Custom Web Development</strong>
                      Responsive websites, modern React/Next.js/Vite SPAs, and enterprise web portals.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                      <strong className="text-stc-black block">📱 Mobile App Development</strong>
                      Cross-platform iOS and Android applications built with React Native and Flutter.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                      <strong className="text-stc-black block">🤖 AI & Machine Learning Solutions</strong>
                      Custom LLM integrations, RAG pipelines, chatbots, automation agents, and predictive APIs.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                      <strong className="text-stc-black block">☁️ Cloud, DevOps & SaaS Architecture</strong>
                      AWS/GCP infrastructure, Docker containerization, CI/CD pipelines, and multi-tenant SaaS.
                    </div>
                  </div>
                  <p>
                    By accepting a written project estimate, executing a Statement of Work (SOW), or paying an initial invoice, the Client agrees to be legally bound by these Terms.
                  </p>
                </div>
              </motion.article>

              {/* Section 2: Proposals & SOW */}
              <motion.article
                id="proposals"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 02</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Proposals & Statements of Work</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Each custom software engagement is preceded by an agreed proposal, quote, or formal Statement of Work (SOW). The SOW explicitly defines:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                    <li>Deliverable specifications, UI mockups, and feature checklists</li>
                    <li>Technical architecture, frameworks, and deployment target environments</li>
                    <li>Estimated delivery timelines and sprint review checkpoints</li>
                    <li>Total project fee and phased milestone payment schedule</li>
                  </ul>
                  <p className="text-xs">
                    All proposals remain valid for thirty (30) days from issuance unless otherwise specified in writing.
                  </p>
                </div>
              </motion.article>

              {/* Section 3: Milestone Payments (Highlight Card) */}
              <motion.article
                id="milestones"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-md sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stc-primary text-white shadow-md">
                    <DollarSign size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 03 • Payment Structure</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Milestone Payments & Invoicing</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
                  <p>
                    Unless otherwise agreed in a dedicated enterprise contract, our standard project payment framework operates on a transparent, milestone-gated structure:
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
                      <span className="text-xs font-bold uppercase text-stc-primary">Milestone 1 • 40%</span>
                      <h4 className="mt-1 font-bold text-stc-black text-base">Project Kickoff</h4>
                      <p className="mt-2 text-xs text-slate-600">
                        Due upon contract execution before sprint commencement. Covers discovery, UI/UX architecture, schema design, and environment setup.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm">
                      <span className="text-xs font-bold uppercase text-cyan-600">Milestone 2 • 40%</span>
                      <h4 className="mt-1 font-bold text-stc-black text-base">Beta / Core Build</h4>
                      <p className="mt-2 text-xs text-slate-600">
                        Due upon demo of working staging application with core business logic, APIs, frontend-backend integration, and client review.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
                      <span className="text-xs font-bold uppercase text-emerald-600">Milestone 3 • 20%</span>
                      <h4 className="mt-1 font-bold text-stc-black text-base">Final Handover</h4>
                      <p className="mt-2 text-xs text-slate-600">
                        Due upon final QA approval, prior to production domain deployment, DNS switchover, and complete source code repository transfer.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-1.5 text-slate-600">
                    <p><strong className="text-stc-black">Invoicing Terms:</strong> Invoices are payable within seven (7) business days of issuance via Bank Wire (NEFT/RTGS/IMPS), UPI, Stripe, or authorized payment gateways.</p>
                    <p><strong className="text-stc-black">Negotiability:</strong> As noted on our pricing page, all package pricing is negotiable based on startup budgets, phased rollouts, and custom enterprise needs.</p>
                  </div>
                </div>
              </motion.article>

              {/* Section 4: IP & Source Code Ownership */}
              <motion.article
                id="ip-ownership"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Key size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 04</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Source Code Ownership & IP</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    <strong className="text-stc-black">100% Client Ownership Guarantee:</strong> Upon full and final settlement of all agreed project milestone fees, Soft Tricks Code unconditionally assigns and transfers to the Client all worldwide rights, titles, and ownership of the bespoke source code, database architectures, custom designs, and documentation created specifically for the project.
                  </p>
                  <p>
                    <strong>Open-Source & Third-Party Dependencies:</strong> Standard open-source libraries (e.g. React, Tailwind CSS, Node.js, standard NPM packages) included within the deliverables remain subject to their respective open-source licenses (such as MIT, Apache 2.0, or BSD).
                  </p>
                  <p>
                    <strong>Portfolio Attribution:</strong> Soft Tricks Code reserves the standard professional right to display screenshots, non-confidential summaries, and live links in our portfolio and marketing materials, unless the Client explicitly requests a strict white-label or non-disclosure embargo in writing.
                  </p>
                </div>
              </motion.article>

              {/* Section 5: Confidentiality */}
              <motion.article
                id="confidentiality"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 05</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Confidentiality & NDAs</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Both parties agree to treat all business information, technical architectures, user data, trade secrets, and proprietary algorithms disclosed during the engagement as strictly confidential.
                  </p>
                  <p>
                    Soft Tricks Code will never disclose, resell, or distribute client trade secrets to any third party. We readily execute bilateral Non-Disclosure Agreements (NDAs) prior to formal discovery sessions.
                  </p>
                </div>
              </motion.article>

              {/* Section 6: Client Duties */}
              <motion.article
                id="client-duties"
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 06</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Client Obligations & Feedback</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>Successful software engineering requires active collaboration. The Client agrees to:</p>
                  <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                    <li>Provide required branding assets, API credentials, copy, and database schemas in a timely manner.</li>
                    <li>Designate a primary project point of contact for sprint sign-offs.</li>
                    <li>Review milestone deliverables and provide consolidated feedback within five (5) business days of milestone submission.</li>
                  </ul>
                </div>
              </motion.article>

              {/* Section 7: Scope Changes */}
              <motion.article
                id="scope-changes"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <GitPullRequest size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 07</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Scope Changes & Agile Sprints</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    We build using flexible agile methodologies. If the Client requests new features, workflows, or architectural changes outside the original SOW:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                    <li>We will provide an itemized written estimate detailing the additional cost and timeline impact.</li>
                    <li>No out-of-scope work will commence without explicit written approval (via email or signed Change Order).</li>
                    <li>Ongoing in-scope sprints continue smoothly without interruption.</li>
                  </ul>
                </div>
              </motion.article>

              {/* Section 8: Warranty */}
              <motion.article
                id="warranty"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Wrench size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 08</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Warranty & Post-Launch Support</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Every project delivered by Soft Tricks Code includes a complimentary post-launch bug-fixing warranty:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <strong className="text-stc-black block text-sm">Starter Plan: 1 Month Support</strong>
                      Complimentary resolution of any bugs, alignment issues, or discrepancies against original agreed specs.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <strong className="text-stc-black block text-sm">Professional / Custom: 3 Months Support</strong>
                      Extended bug warranty, performance tuning, and technical advisory.
                    </div>
                  </div>
                  <p className="text-xs">
                    Warranty covers defect rectification within the original scope. Custom ongoing SLA maintenance retainers (server monitoring, security updates, feature expansions) are available upon request.
                  </p>
                </div>
              </motion.article>

              {/* Section 9: Liability */}
              <motion.article
                id="liability"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <AlertTriangle size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 09</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Limitation of Liability & Dependencies</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Soft Tricks Code is not liable for disruptions, service outages, or policy changes caused by third-party APIs or infrastructure providers (e.g. AWS, Google Cloud, OpenAI API downtime, payment gateway processing errors, or Apple App Store / Google Play Store review delays).
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, the total aggregate liability of Soft Tricks Code for any claims arising out of a project shall not exceed the total fees actually paid by the Client to Soft Tricks Code for that specific engagement.
                  </p>
                </div>
              </motion.article>

              {/* Section 10: Termination */}
              <motion.article
                id="termination"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <XCircle size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 10</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Agreement Termination</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    Either party may terminate an engagement with fourteen (14) days written notice. Upon termination:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
                    <li>The Client pays for all verified sprint milestones and hours completed up to the date of notice.</li>
                    <li>Soft Tricks Code immediately hands over all work-in-progress code repositories, design assets, and documentation completed to date.</li>
                  </ul>
                </div>
              </motion.article>

              {/* Section 11: Jurisdiction */}
              <motion.article
                id="jurisdiction"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="fly-card-light p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-stc-primary">
                    <Scale size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 11</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Governing Law & Dispute Resolution</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India. Both parties agree to first seek an amicable, good-faith negotiated resolution for any disputes.
                  </p>
                  <p>
                    If amicable resolution cannot be achieved within thirty (30) days, the dispute shall fall under the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
                  </p>
                </div>
              </motion.article>

              {/* Section 12: Contact */}
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stc-primary">Section 12</span>
                    <h2 className="font-heading text-xl font-bold text-stc-black sm:text-2xl">Legal Notices & Contact</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                  <p>
                    For questions regarding these Terms, contract negotiations, or to request a customized enterprise Statement of Work, please contact:
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
                      to="/privacy-policy"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stc-primary hover:underline"
                    >
                      View Privacy Policy <ChevronRight size={14} />
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
