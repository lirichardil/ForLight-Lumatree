import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="border-t border-canopy/10 bg-vellum px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl italic">Lumatree</p>
          <p className="mt-3 text-sm leading-relaxed text-canopy/60">
            Light, shaped like growth. A modular fixture series built around
            soft, diffused light.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-canopy/70 transition-colors hover:text-canopy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-canopy/10 pt-6 text-[11px] text-canopy/40 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono">© {new Date().getFullYear()} Lumatree</span>
        <span className="font-mono">Designed for soft light.</span>
      </div>
    </footer>
  );
}
