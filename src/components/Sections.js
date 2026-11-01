import Image from "next/image";
import yard from "../../public/trucks.jpg";
import logo from "../../public/GiaLogoFinal.png";
import { company, faqs, process, services, values } from "@/content/site";
import { ContainerIcon, ExternalIcon, MailIcon, RouteIcon, ShieldIcon, TruckIcon } from "./Icons";
import { ScrollLitText } from "./Reveal";

function SectionHead({ eyebrow, title, children, dark = false }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p data-reveal className={`eyebrow ${dark ? "text-sun-300" : "text-sun-700"}`}>
          {eyebrow}
        </p>
        <h2
          data-reveal
          style={{ "--reveal-delay": "80ms", fontStretch: "108%" }}
          className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em]"
        >
          {title}
        </h2>
      </div>
      {children && (
        <div
          data-reveal
          style={{ "--reveal-delay": "160ms" }}
          className={`text-lg leading-relaxed lg:col-span-5 ${dark ? "text-sand-50/70" : "text-steel-500"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Statement() {
  return (
    <section aria-label="Who we are" className="surface-light bg-sand-50 py-24 sm:py-32">
      <div className="wrap">
        <p className="eyebrow text-sun-700">Who we are</p>
        <ScrollLitText
          className="mt-6 max-w-5xl text-balance text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-ink-900"
          text="A small, hands-on carrier built on one simple promise: treat every load like it's our own."
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-steel-500">
          When you book GIA you deal with the people who run the trucks, not a call center. Dispatch answers
          around the clock, every day of the year.
        </p>
      </div>
    </section>
  );
}

const serviceIcons = [TruckIcon, ContainerIcon, RouteIcon];

export function Services() {
  return (
    <section id="services" className="surface-light border-y border-ink-900/[0.06] bg-sand-200/60 py-24 sm:py-32">
      <div className="wrap">
        <SectionHead eyebrow="Trucking services" title="Truckload and container freight, done the right way.">
          Full truckload general freight and intermodal containers out of New Jersey, on interstate authority,
          with the same people looking after your load from pickup to signature.
        </SectionHead>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <li
                key={s.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` }}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-[0_1px_0_rgba(11,20,38,0.06),0_20px_40px_-28px_rgba(11,20,38,0.35)] ring-1 ring-ink-900/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,20,38,0.45)] sm:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-sun-500 transition duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-sun-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-sm text-steel-500">{s.id}</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-500">{s.body}</p>
                <ul className="mt-auto space-y-2.5 border-t border-ink-900/10 pt-6 text-sm">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rotate-45 bg-sun-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="surface-dark relative overflow-hidden bg-ink-900 py-24 text-sand-50 sm:py-32">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="wrap relative">
        <SectionHead dark eyebrow="How we work" title="From first call to signed delivery.">
          No portals to learn and no call centers. Four steps, one team, and a person on the line whenever
          you need an update.
        </SectionHead>

        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-sun-500/40 lg:block"
          />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => (
              <li key={p.step} data-reveal style={{ "--reveal-delay": `${i * 110}ms` }} className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-ink-900 font-mono text-sm font-semibold text-sun-400 ring-1 ring-sun-500/60">
                  {p.step.padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-sand-50/65">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="surface-light bg-sand-50 py-24 sm:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={yard}
              alt="Tractor-trailers parked in a yard on a winter morning"
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent" />
          </div>
          <div className="absolute -bottom-8 right-4 w-40 rounded-2xl bg-sand-50 p-4 shadow-[0_24px_50px_-20px_rgba(11,20,38,0.45)] ring-1 ring-ink-900/5 sm:-right-6 sm:w-48">
            <Image src={logo} alt="GIA Blessed Trucking Inc logo" sizes="12rem" className="h-auto w-full" />
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow text-sun-700">
            Our mission
          </p>
          <h2
            data-reveal
            style={{ "--reveal-delay": "80ms", fontStretch: "108%" }}
            className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em]"
          >
            Honest, dependable, and built for the long haul.
          </h2>
          <p data-reveal style={{ "--reveal-delay": "140ms" }} className="mt-6 text-lg leading-relaxed text-steel-500">
            At GIA Blessed Trucking we deliver safe, on-time and cost-effective freight service with honesty and
            dependability. We grow by earning long-term relationships, one load at a time, and by being the
            carrier our customers never have to chase.
          </p>
          <ul className="mt-10 space-y-6">
            {values.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                style={{ "--reveal-delay": `${200 + i * 80}ms` }}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ink-900/10 pt-6"
              >
                <span className="font-mono text-sm text-sun-700">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-1 leading-relaxed text-steel-500">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Credentials() {
  const tiles = [
    { k: "USDOT number", v: company.usdot },
    { k: "MC number", v: company.mc },
    { k: "Authority", v: "Motor carrier of property (except household goods)" },
    { k: "Operation", v: "Interstate · General freight · Containers" },
  ];
  return (
    <section id="credentials" className="surface-light bg-sand-100 py-24 sm:py-32">
      <div className="wrap">
        <div className="surface-dark overflow-hidden rounded-3xl bg-ink-950 text-sand-50 ring-1 ring-ink-900">
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-sun-500 text-ink-950">
                <ShieldIcon className="h-6 w-6" />
              </span>
              <h2
                data-reveal
                style={{ fontStretch: "108%" }}
                className="mt-8 text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.025em]"
              >
                Check us before you book us.
              </h2>
              <p data-reveal style={{ "--reveal-delay": "100ms" }} className="mt-5 text-lg leading-relaxed text-sand-50/70">
                Our operating authority is public record with the U.S. Department of Transportation. Look us up,
                then call us. Brokers and shippers can request our full carrier packet.
              </p>
              <div data-reveal style={{ "--reveal-delay": "180ms" }} className="mt-8 flex flex-wrap gap-3">
                <a href={company.saferUrl} target="_blank" rel="noopener noreferrer" className="btn-sun">
                  Verify on FMCSA
                  <ExternalIcon className="h-4 w-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent("Carrier packet request")}`}
                  className="btn-ghost"
                >
                  <MailIcon className="h-4 w-4" />
                  Request carrier packet
                </a>
              </div>
            </div>
            <dl className="grid gap-px self-center overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:col-span-7">
              {tiles.map((t, i) => (
                <div
                  key={t.k}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` }}
                  className="flex min-h-[9.5rem] flex-col justify-between gap-6 bg-ink-950 p-6 sm:p-7"
                >
                  <dt className="eyebrow text-steel-400">{t.k}</dt>
                  <dd className={`font-mono font-medium tracking-tight ${i < 2 ? "text-3xl text-sun-400 sm:text-4xl" : "text-lg"}`}>
                    {t.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="surface-light bg-sand-50 pt-24 sm:pt-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow text-sun-700">
            FAQ
          </p>
          <h2
            data-reveal
            style={{ "--reveal-delay": "80ms", fontStretch: "108%" }}
            className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em]"
          >
            Questions shippers ask us.
          </h2>
          <p data-reveal style={{ "--reveal-delay": "140ms" }} className="mt-6 text-lg leading-relaxed text-steel-500">
            Something else? Call{" "}
            <a href={`tel:${company.phone}`} className="font-semibold text-ink-900 underline underline-offset-4">
              {company.phoneDisplay}
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-900 transition group-open:rotate-45 group-open:bg-sun-500"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-steel-500">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
