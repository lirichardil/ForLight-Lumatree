import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="bg-canopy px-6 py-16 text-vellum sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl">Lumatree</p>
          <p className="mt-3 text-sm leading-relaxed text-vellum/60">
            Light, shaped like growth. A modular fixture series built around
            soft, diffused light.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] font-medium text-vellum/70 transition-colors hover:text-filament"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-vellum/10 pt-6 text-[12px] text-vellum/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Lumatree</span>
        <span>Designed for soft light.</span>
      </div>
    </footer>
  );
}
