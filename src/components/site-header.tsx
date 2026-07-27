"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { NAV_LINKS } from "@/lib/nav";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const zones = gsap.utils.toArray<HTMLElement>(".ignition-zone");
    if (zones.length === 0) return;

    const raf = requestAnimationFrame(() => {
      setDark(window.scrollY < window.innerHeight * 0.2);
    });

    const triggers = zones.map((zone) =>
      ScrollTrigger.create({
        trigger: zone,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setDark(self.progress < 0.6),
        onLeave: () => setDark(false),
        onLeaveBack: () => setDark(true),
      })
    );

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={clsx(
          "transition-colors duration-500",
          dark ? "bg-transparent" : "bg-vellum/80 backdrop-blur-md border-b border-canopy/10"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className={clsx(
              "font-display text-lg italic tracking-tight transition-colors duration-500",
              dark ? "text-white" : "text-canopy"
            )}
            onClick={() => setOpen(false)}
          >
            Lumatree
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "font-mono text-[11px] uppercase tracking-[0.16em] opacity-80 transition-colors duration-500 hover:opacity-100",
                  dark ? "text-white" : "text-canopy"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={clsx(
              "flex flex-col gap-1.5 sm:hidden transition-colors duration-500",
              dark ? "text-white" : "text-canopy"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-canopy/10 bg-vellum px-6 py-6 sm:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-canopy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
