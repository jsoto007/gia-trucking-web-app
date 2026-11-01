import { company, nav } from "@/content/site";
import { Wordmark } from "./Header";
import Year from "./Year";

export default function Footer() {
  return (
    <footer className="surface-dark bg-ink-950 text-sand-50">
      <div className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-sm leading-relaxed text-sand-50/60">
              {company.tagline} Full truckload freight and intermodal containers, dispatched around the clock
              from {company.region}.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-steel-400">Explore</p>
            <ul className="mt-5 space-y-3">
              {[...nav, { label: "Get a quote", href: "#quote" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sand-50/75 transition hover:text-sun-400">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow text-steel-400">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`tel:${company.phone}`} className="font-mono text-sand-50/85 hover:text-sun-400">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="break-all font-mono text-sm text-sand-50/85 hover:text-sun-400">
                  {company.email}
                </a>
              </li>
              <li className="pt-2 font-mono text-xs uppercase tracking-[0.16em] text-steel-400">
                USDOT {company.usdot} · {company.mc}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-sand-50/60 sm:flex-row sm:justify-between">
          <p>
            &copy; <Year /> {company.legalName}. All rights reserved.
          </p>
          <p>Website by J Soto</p>
        </div>
      </div>
    </footer>
  );
}
