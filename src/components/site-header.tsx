"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import CharButton from "@/components/char-button";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-canopy/8 bg-vellum/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-canopy"
          onClick={() => setOpen(false)}
        >
          Lumatree
        </Link>

        <nav className="hidden items-center gap-9 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] font-medium text-canopy/70 transition-colors hover:text-canopy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <CharButton href="/contact" variant="dark">
            Contact
          </CharButton>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 text-canopy sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-canopy/8 bg-vellum px-6 py-6 sm:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-sm font-medium text-canopy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CharButton href="/contact" variant="dark" className="mt-2">
                Contact
              </CharButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
