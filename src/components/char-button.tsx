"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type CharButtonProps = {
  children: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "dark" | "light";
  className?: string;
};

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[3px]"
          style={{ transitionDelay: `${i * 12}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
      aria-hidden="true"
    >
      <path
        d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function classes(variant: "dark" | "light", className?: string) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300";
  const theme =
    variant === "dark"
      ? "bg-canopy text-vellum hover:bg-filament hover:text-canopy"
      : "bg-vellum text-canopy border border-canopy/15 hover:border-filament hover:text-filament";
  return [base, theme, className].filter(Boolean).join(" ");
}

export default function CharButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "dark",
  className,
}: CharButtonProps): ReactNode {
  const content = (
    <>
      <span className="flex overflow-hidden">
        <Chars text={children} />
      </span>
      <Arrow />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes(variant, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes(variant, className)}>
      {content}
    </button>
  );
}
