import Image from "next/image";
import truck from "../../public/giaBlueTruck.jpeg";
import { company, credentials, ticker } from "@/content/site";
import { ArrowIcon, ExternalIcon, PhoneIcon } from "./Icons";

function CredentialCard() {
  return (
    <aside
      aria-label="Carrier credentials"
      className="relative w-full max-w-md overflow-hidden rounded-2xl bg-ink-950/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <p className="eyebrow text-sand-50/60">Carrier record</p>
        <p className="font-mono text-[11px] text-sand-50/45">FMCSA</p>
      </div>
      <dl className="divide-y divide-white/[0.07] px-5">
        {credentials.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-400">{row.label}</dt>
            <dd className="text-right font-mono text-sm text-sand-50">{row.value}</dd>
          </div>
        ))}
      </dl>
      <a
        href={company.saferUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-sun-300 transition hover:bg-white/[0.07]"
      >
        Check it yourself on FMCSA SAFER
        <ExternalIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="sr-only">(opens the U.S. DOT website in a new tab)</span>
      </a>
    </aside>
  );
}

function RouteLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        id="route-a"
        d="M-40 720 C 220 700, 300 520, 520 540 S 860 690, 1040 520 S 1300 240, 1480 260"
        stroke="#F28C28"
        strokeOpacity=".55"
        strokeWidth="1.5"
        strokeDasharray="2 10"
        className="animate-dash"
      />
      <path
        d="M-40 820 C 300 800, 520 640, 760 700 S 1200 820, 1480 600"
        stroke="#B7C1D3"
        strokeOpacity=".18"
        strokeWidth="1"
        strokeDasharray="2 12"
        className="animate-dash"
      />
      <circle r="5" fill="#FFA94D" className="route-dot">
        <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
          <mpath href="#route-a" />
        </animateMotion>
      </circle>
      <circle r="14" fill="#F28C28" opacity=".18" className="route-dot">
        <animateMotion dur="16s" repeatCount="indefinite">
          <mpath href="#route-a" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="surface-dark relative isolate overflow-hidden bg-ink-950 text-sand-50">
      <Image
        src={truck}
        alt="Blue GIA Blessed Trucking Volvo tractor with its USDOT and MC numbers on the door"
        priority
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[35%_60%] opacity-90"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#070D1A_8%,rgba(7,13,26,0.86)_38%,rgba(7,13,26,0.3)_70%,rgba(7,13,26,0.45)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#070D1A,transparent_45%)]" />
      <div className="absolute inset-0 -z-10 bg-ink-950/60 lg:hidden" />
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <RouteLines />

      <div className="wrap relative grid min-h-[100svh] items-center gap-14 pb-28 pt-32 lg:grid-cols-12 lg:pb-32 lg:pt-36">
        <div className="lg:col-span-7">
          {/* The small line carries the search terms; the tagline carries the brand. */}
          <h1>
            <span className="hero-in eyebrow block text-sun-300">
              {company.name} · {company.region} trucking company
            </span>
            <span
              style={{ fontStretch: "112%" }}
              className="hero-rise mt-6 block text-balance text-[clamp(2.75rem,7.2vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
            >
              Your freight,
              <br />
              in <span className="text-sun-500">good hands.</span>
            </span>
          </h1>
          <p
            style={{ "--d": "120ms" }}
            className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-sand-50/75 sm:text-xl"
          >
            An asset-based trucking company out of New Jersey moving full truckload freight and intermodal
            containers across the lower 48. Our own trucks, our own drivers, and dispatch that answers around
            the clock.
          </p>
          <div style={{ "--d": "200ms" }} className="hero-in mt-10 flex flex-wrap gap-3">
            <a href="#quote" className="btn-sun group">
              Request a quote
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a href={`tel:${company.phone}`} className="btn-ghost">
              <PhoneIcon className="h-4 w-4" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        <div style={{ "--d": "280ms" }} className="hero-in lg:col-span-5 lg:justify-self-end">
          <CredentialCard />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-ink-950/60 py-4 backdrop-blur">
        <div className="flex w-max animate-ticker" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {ticker.map((item) => (
                <li key={item} className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-sand-50/60">
                  <span className="px-7">{item}</span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-sun-500" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
