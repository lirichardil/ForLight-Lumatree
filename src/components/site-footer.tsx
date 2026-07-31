import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

const CERTIFICATIONS = ["CRI 92", "IP20", "FSC certified wood", "5 year warranty"];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[--color-line] bg-[--color-gallery]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.03em] text-[--color-ink]">
              Lumatree
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#5c5c5c]">
              One wood-clad LED bar, built in six mounts. Made from FSC
              certified timber.
            </p>
          </div>

          <nav>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#5c5c5c] transition-colors hover:text-[--color-ink]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c} className="figure text-[12px] text-[#5c5c5c]">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-[--color-line] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[#6b6b6b]">
            {new Date().getFullYear()} Lumatree. All rights reserved.
          </p>
          <p className="text-[12px] text-[#6b6b6b]">
            Specifications subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}
