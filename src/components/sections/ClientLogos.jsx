const logos = [
  'Healthcare',
  'AgriTech',
  'EdTech',
  'E-Commerce',
  'FinTech',
  'SaaS',
  'React',
  'Node.js',
  'AWS',
];

export default function ClientLogos() {
  return (
    <section className="border-y border-slate-200 bg-white py-10 sm:py-12">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {logos.map((name) => (
            <span
              key={name}
              className="font-body text-base font-semibold text-slate-600 transition hover:text-stc-primary sm:text-lg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
