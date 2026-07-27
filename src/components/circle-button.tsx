import Link from "next/link";

export default function CircleButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-canopy/15 py-2 pl-2 pr-5 transition-colors duration-300 hover:border-canopy/0"
    >
      <span className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-full bg-canopy transition-transform duration-400 ease-out group-hover:scale-x-100" />
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-vellum-dim text-canopy transition-colors duration-300 group-hover:bg-filament group-hover:text-canopy">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className="relative font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-canopy transition-colors duration-300 group-hover:text-vellum">
        {children}
      </span>
    </Link>
  );
}
