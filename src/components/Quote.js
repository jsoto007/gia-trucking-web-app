"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/content/site";
import { freightTypes } from "@/lib/quote";
import { CheckIcon, ClockIcon, MailIcon, PhoneIcon } from "./Icons";

function Field({ label, name, required, className = "", children, ...input }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-ink-900">
        {label}
        {required && <span className="text-sun-700"> *</span>}
      </label>
      <div className="mt-2">
        {children ?? <input id={name} name={name} required={required} className="field" {...input} />}
      </div>
    </div>
  );
}

export default function Quote() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const doneRef = useRef(null);

  // The form collapses on success; bring the confirmation into view.
  useEffect(() => {
    if (status !== "sent" || !doneRef.current) return;
    doneRef.current.focus({ preventScroll: true });
    doneRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries());
    if (d.website) return; // honeypot: bots fill every field
    setStatus("sending");
    try {
      // The server validates, then sends through Mailgun (app/api/quote/route.js).
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!res.ok) throw new Error(`quote ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="surface-light bg-sand-50 py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow text-sun-700">
            Get a quote
          </p>
          <h2
            data-reveal
            style={{ "--reveal-delay": "80ms", fontStretch: "108%" }}
            className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em]"
          >
            Let&apos;s move your next load.
          </h2>
          <p data-reveal style={{ "--reveal-delay": "140ms" }} className="mt-6 text-lg leading-relaxed text-steel-500">
            Send the lane and the dates and we&apos;ll come back with a rate. Need it faster? Call dispatch,
            day or night.
          </p>

          <ul data-reveal style={{ "--reveal-delay": "200ms" }} className="mt-10 space-y-3">
            <li>
              <a
                href={`tel:${company.phone}`}
                className="group flex items-center gap-4 rounded-2xl bg-ink-900 p-5 text-sand-50 transition hover:bg-ink-800"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sun-500 text-ink-950">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="eyebrow block text-sand-50/60">Call us · 24/7</span>
                  <span className="mt-1 block font-mono text-lg">{company.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/10 transition hover:ring-ink-900/25"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand-100 text-ink-900">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block text-steel-500">Email the office</span>
                  <span className="mt-1 block break-all font-mono text-sm sm:text-base">{company.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl p-5 ring-1 ring-ink-900/10">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sand-100 text-ink-900">
                <ClockIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="eyebrow block text-steel-500">Hours</span>
                <span className="mt-1 block">Open 24 hours, 365 days a year</span>
              </span>
            </li>
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="lg:col-span-7">
          <div className="rounded-3xl bg-sand-100 p-6 ring-1 ring-ink-900/[0.06] sm:p-10">
            {status === "sent" ? (
              <div
                ref={doneRef}
                tabIndex={-1}
                role="status"
                className="flex min-h-[28rem] outline-none flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">Request received.</h3>
                <p className="mt-3 max-w-sm text-steel-500">
                  Thanks — we&apos;ll get back to you with a rate shortly. For anything urgent, call{" "}
                  <a className="font-semibold text-ink-900 underline" href={`tel:${company.phone}`}>
                    {company.phoneDisplay}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn-ink mt-8">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" required autoComplete="name" />
                <Field label="Company" name="company" autoComplete="organization" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
                <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
                <Field label="Pickup (city, state or ZIP)" name="pickup" required placeholder="Newark, NJ" />
                <Field label="Delivery (city, state or ZIP)" name="delivery" required placeholder="Atlanta, GA" />
                <Field label="Freight" name="freight" required>
                  <select id="freight" name="freight" required className="field" defaultValue={freightTypes[0]}>
                    {freightTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Ready date" name="date" type="date" />
                <Field label="Details" name="details" className="sm:col-span-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="field"
                    placeholder="Weight, commodity, container size, appointment times…"
                  />
                </Field>
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-steel-500">We reply by phone or email. No spam, ever.</p>
                  <button type="submit" disabled={status === "sending"} className="btn-sun disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Send quote request"}
                  </button>
                </div>
                {status === "error" && (
                  <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200 sm:col-span-2">
                    Your request didn&apos;t go through. Please call{" "}
                    <a className="font-semibold underline" href={`tel:${company.phone}`}>
                      {company.phoneDisplay}
                    </a>{" "}
                    or email{" "}
                    <a className="font-semibold underline" href={`mailto:${company.email}`}>
                      {company.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
