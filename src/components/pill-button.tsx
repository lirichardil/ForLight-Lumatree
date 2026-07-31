import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The one interactive shape on the site.
 *
 * Shape rule: controls are full-pill, everything else is square. Borrowed
 * from aircenter.space, which uses exactly this split.
 *
 * Contrast: solid is ink-on-gallery inverted (white text on #111112, 16.8:1);
 * quiet is ink on transparent with a hairline, so it never floats unbounded
 * over a photographic background.
 */
type Props = {
  href: string;
  children: string;
  variant?: "solid" | "quiet" | "onStage";
  className?: string;
};

const VARIANTS = {
  solid:
    "bg-[--color-ink] text-[--color-gallery] hover:bg-black",
  quiet:
    "border border-[--color-line] text-[--color-ink] hover:border-[--color-ink]",
  onStage:
    "border border-white/25 text-white hover:border-white/70 hover:bg-white/5",
} as const;

export default function PillButton({
  href,
  children,
  variant = "solid",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium whitespace-nowrap transition-all duration-300 active:scale-[0.98] ${VARIANTS[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight
        size={14}
        weight="bold"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
