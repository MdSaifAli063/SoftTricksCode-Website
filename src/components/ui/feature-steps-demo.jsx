import { FeatureSteps } from './feature-section';

const productFeatures = [
  {
    step: 'Phase 01',
    badge: 'AI & SaaS Core',
    title: 'Intelligent SaaS & AI Workflow Automation',
    content:
      'We architect intuitive, high-speed SaaS dashboards powered by real-time analytics, automated AI workflows, and proactive decision intelligence.',
    image: '/images/products/feature-step-1.webp',
  },
  {
    step: 'Phase 02',
    badge: 'Sub-50ms APIs',
    title: 'High-Throughput Cloud & Micro-Service Mesh',
    content:
      'Distributed multi-region infrastructure engineered with sub-50ms API response targets, automated load balancing, and fault-tolerant failovers.',
    image: '/images/products/feature-step-2.webp',
  },
  {
    step: 'Phase 03',
    badge: 'Multi-Platform',
    title: 'Unified Cross-Device Ecosystem & Live Sync',
    content:
      'End-to-end synchronized digital products spanning native mobile applications, responsive web portals, and offline-first cloud databases.',
    image: '/images/products/feature-step-3.webp',
  },
];

export function FeatureStepsDemo() {
  return (
    <FeatureSteps
      features={productFeatures}
      title="How We Engineer & Scale Products"
      subtitle="From AI-driven workflows to distributed cloud engines — our product architecture lifecycle."
      autoPlayInterval={4000}
      imageHeight="h-[320px] sm:h-[380px] lg:h-[440px]"
    />
  );
}

export default FeatureStepsDemo;
