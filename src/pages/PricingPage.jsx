import Seo from '../components/ui/Seo';
import PageBanner from '../components/ui/PageBanner';
import Pricing from '../components/sections/Pricing';

const COMPARISON_ROWS = [
  ['Pages', 'Up to 5', 'Up to 15', 'Unlimited'],
  ['Backend', '—', '✓', '✓'],
  ['Admin panel', '—', '✓', '✓'],
  ['Support', '1 month', '3 months', '24/7 priority'],
];

const PLANS = [
  { name: 'Starter', highlight: false },
  { name: 'Professional', highlight: true },
  { name: 'Enterprise', highlight: false },
];

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing — Soft Tricks Code"
        description="Discover transparent pricing for web development, AI, SaaS, and custom software from Soft Tricks Code."
        pathname="/pricing"
      />
      <PageBanner
        badge="Pricing"
        title="Plans That Scale With You"
        subtitle="Transparent pricing. All plans are negotiable — free consultation available."
        breadcrumbs={['Pricing']}
      />
      <Pricing pageMode />
      <section className="section-padding section-light pt-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-0">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-stc-black sm:text-3xl">
            Plan Comparison
          </h2>

          {/* Mobile: stacked plan cards */}
          <div className="grid gap-4 md:hidden">
            {PLANS.map((plan, planIndex) => (
              <div
                key={plan.name}
                className={`fly-card-light overflow-hidden rounded-3xl ${
                  plan.highlight ? 'ring-2 ring-stc-primary' : ''
                }`}
              >
                <div
                  className={`border-b border-slate-200 px-5 py-4 ${
                    plan.highlight ? 'bg-stc-primary/5' : 'bg-slate-50'
                  }`}
                >
                  <h3
                    className={`font-heading text-lg font-bold ${
                      plan.highlight ? 'text-stc-primary' : 'text-stc-black'
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-100 px-5 py-2">
                  {COMPARISON_ROWS.map(([feature, ...vals]) => (
                    <li key={feature} className="flex items-center justify-between gap-4 py-3 text-sm">
                      <span className="font-medium text-stc-black">{feature}</span>
                      <span className="shrink-0 text-stc-muted">{vals[planIndex]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tablet & desktop: table */}
          <div className="fly-card-light hidden overflow-hidden rounded-3xl md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-4 text-left font-semibold text-stc-muted">Feature</th>
                    <th className="p-4 text-center font-semibold text-stc-black">Starter</th>
                    <th className="p-4 text-center font-semibold text-stc-primary">Professional</th>
                    <th className="p-4 text-center font-semibold text-stc-black">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-stc-muted">
                  {COMPARISON_ROWS.map(([feature, ...vals]) => (
                    <tr key={feature} className="border-b border-slate-100">
                      <td className="p-4 font-medium text-stc-black">{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} className="p-4 text-center">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
