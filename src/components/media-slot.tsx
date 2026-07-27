"use client";

import { useState } from "react";
import clsx from "clsx";

type Tone = "dark" | "light";

type MediaSlotProps = {
  /** Path to a real image, once the AI-generated asset exists in /public. */
  srcImage?: string;
  /** Path to a real looping video, once the AI-generated asset exists in /public. */
  srcVideo?: string;
  alt: string;
  /** Small caption shown on the placeholder art only — never on real media. */
  label?: string;
  tone?: Tone;
  aspectClassName?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Renders a real image/video when given a working src; falls back to soft
 * gradient placeholder art in the same visual language otherwise. The path
 * convention (e.g. /media/products/<slug>/hero.jpg) is the integration
 * contract: drop a file at that path and the real asset takes over.
 */
export default function MediaSlot({
  srcImage,
  srcVideo,
  alt,
  label,
  tone = "light",
  aspectClassName = "aspect-[4/5]",
  className,
  priority = false,
}: MediaSlotProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = failed || (!srcImage && !srcVideo);

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[28px]",
        aspectClassName,
        className
      )}
    >
      {!showPlaceholder && srcVideo && (
        <video
          className="h-full w-full object-cover"
          src={srcVideo}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setFailed(true)}
        />
      )}
      {!showPlaceholder && !srcVideo && srcImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-full w-full object-cover"
          src={srcImage}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      )}
      {showPlaceholder && <PlaceholderArt tone={tone} label={label ?? alt} />}
    </div>
  );
}

function PlaceholderArt({ tone, label }: { tone: Tone; label: string }) {
  const isDark = tone === "dark";
  return (
    <div
      className={clsx(
        "relative flex h-full w-full items-end p-5",
        isDark ? "bg-bark" : "bg-vellum-dim"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 38%, rgba(242,163,78,0.55) 0%, rgba(242,163,78,0.14) 32%, transparent 62%)"
            : "radial-gradient(circle at 50% 38%, rgba(242,163,78,0.35) 0%, rgba(242,163,78,0.08) 34%, transparent 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <span
        className={clsx(
          "relative font-mono text-[10px] uppercase tracking-[0.14em]",
          isDark ? "text-vellum/50" : "text-canopy/40"
        )}
      >
        {label}
      </span>
    </div>
  );
}
