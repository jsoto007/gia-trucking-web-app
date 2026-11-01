"use client";

import { useEffect, useRef, useState } from "react";
import { company, nav } from "@/content/site";
import { CloseIcon, MenuIcon, PhoneIcon, SunMark } from "./Icons";

export function Wordmark({ className = "" }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <SunMark className="h-8 w-8 shrink-0" />
      <span className="whitespace-nowrap leading-none">
        <span className="block text-[15px] font-extrabold tracking-[0.08em]">GIA BLESSED</span>
        <span className="mt-1 block font-mono text-[9.5px] tracking-[0.32em] opacity-70">TRUCKING INC</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock scroll, make the page behind it inert, move
  // focus in, and close on Escape or when the viewport grows past the menu.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(Boolean);
    document.body.style.overflow = "hidden";
    behind.forEach((el) => el.setAttribute("inert", ""));
    menuRef.current?.querySelector("a")?.focus();

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1280px)");
    const onWide = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`surface-dark fixed inset-x-0 top-0 z-50 text-sand-50 transition-colors duration-300 ${
        solid ? "bg-ink-950/90 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-sun-500 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" aria-label={`${company.name}, back to top`} onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-sand-50/75 transition hover:bg-white/10 hover:text-sand-50"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.phone}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-mono text-[13px] text-sand-50/85 transition hover:text-sun-400 md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
          <a
            href={`tel:${company.phone}`}
            aria-label={`Call ${company.phoneDisplay}`}
            className="grid h-10 w-10 place-items-center rounded-full bg-sun-500 text-ink-950 md:hidden"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </a>
          <a href="#quote" className="btn-sun hidden whitespace-nowrap !px-5 !py-2.5 sm:inline-flex">
            Get a quote
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 rounded-full p-2.5 text-sand-50 hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink-950 xl:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex h-full flex-col py-6">
          <ul className="divide-y divide-white/10">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 text-2xl font-semibold tracking-tight"
                >
                  <span className="font-mono text-xs text-sun-400">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pb-4">
            <a href="#quote" onClick={() => setOpen(false)} className="btn-sun w-full">
              Get a quote
            </a>
            <a href={`tel:${company.phone}`} className="btn-ghost w-full">
              <PhoneIcon className="h-4 w-4" />
              Call dispatch {company.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
