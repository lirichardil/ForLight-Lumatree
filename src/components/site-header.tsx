"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import PillButton from "@/components/pill-button";

/**
 * Fixed header, 64px tall, single line at desktop.
 *
 * The bar always carries the light ground, including over a dark product
 * scene. Going transparent at scroll-top put ink-coloured text on the dark
 * hero and made the wordmark and CTA unreadable. Keeping page chrome on one
 * ground is also the rule the rest of the site follows: the dark sections
 * are photographs, not a theme.
 *
 * Colours here use the @theme utilities (bg-gallery, text-ink), never the
 * bg-[--color-gallery] form. Tailwind v3 read bg-[--x] as bg-[var(--x)]; v4
 * dropped that shorthand in favour of bg-(--x) and now emits the value raw,
 * so `background-color: --color-gallery` reaches the browser and is discarded.
 * It type-checks, lints and builds — it just does nothing. That is what left
 * this bar transparent with ink-coloured text over the dark hero.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    // IntersectionObserver rather than a scroll listener: one callback when
    // the sentinel leaves the top, not work on every frame.
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:8px;width:1px;";
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-gallery/88 backdrop-blur-xl transition-colors duration-500 ${
        lifted ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[15px] font-semibold tracking-[-0.03em] text-ink"
        >
          Lumatree
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-[#5c5c5c] transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <PillButton href="/contact">Enquire</PillButton>
        </div>

        <button
          type="button"
          className="flex flex-col gap-[5px] text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-gallery px-6 py-8 md:hidden">
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg tracking-[-0.02em] text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <PillButton href="/contact">Enquire</PillButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
