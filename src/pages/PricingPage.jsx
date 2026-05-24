import { Helmet } from 'react-helmet-async';
import PageBanner from '../components/ui/PageBanner';
import Pricing from '../components/sections/Pricing';

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing — SoftTricksCode</title>
        <meta
          name="description"
          content="Starter ₹15,000 | Professional ₹45,000 | Enterprise custom. Transparent, negotiable pricing."
        />
      </Helmet>
      <PageBanner
        badge="Pricing"
        title="Plans That Scale With You"
        subtitle="Transparent pricing. All plans are negotiable — free consultation available."
        breadcrumbs={['Pricing']}
      />
      <Pricing pageMode />
      <section className="section-padding section-light pt-0">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-auto sm:max-w-5xl sm:px-0">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-stc-black">
            Plan Comparison
          </h2>
          <div className="fly-card-light min-w-[560px] overflow-hidden rounded-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 text-left font-semibold text-stc-muted">Feature</th>
                  <th className="p-4 text-center font-semibold text-stc-black">Starter</th>
                  <th className="p-4 text-center font-semibold text-stc-primary">Professional</th>
                  <th className="p-4 text-center font-semibold text-stc-black">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-stc-muted">
                {[
                  ['Pages', 'Up to 5', 'Up to 15', 'Unlimited'],
                  ['Backend', '—', '✓', '✓'],
                  ['Admin panel', '—', '✓', '✓'],
                  ['Support', '1 month', '3 months', '24/7 priority'],
                ].map(([feature, ...vals]) => (
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
      </section>
    </>
  );
}
