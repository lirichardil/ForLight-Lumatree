"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CharButton from "@/components/char-button";
import MediaSlot from "@/components/media-slot";

type SplitHeroProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: string;
  cta?: { label: string; href: string };
  rightContent?: ReactNode;
  media?: { srcImage?: string; srcVideo?: string; label: string };
  heightVh?: number;
};

export default function IgnitionHero({
  eyebrow,
  heading,
  description,
  cta,
  rightContent,
  media,
  heightVh = 160,
}: SplitHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(blobARef.current, { x: 60, y: -40, scale: 1.15, ease: "none" }, 0)
        .to(blobBRef.current, { x: -40, y: 30, scale: 1.1, ease: "none" }, 0)
        .to(contentRef.current, { opacity: 0, y: -40, ease: "none" }, 0.55);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-vellum">
        <div
          ref={blobARef}
          aria-hidden="true"
          className="glow-blob pointer-events-none absolute -left-32 top-16 h-[34rem] w-[34rem] opacity-40"
        />
        <div
          ref={blobBRef}
          aria-hidden="true"
          className="glow-blob-soft pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] opacity-60"
        />

        <div
          ref={contentRef}
          className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 pt-20 sm:px-10 md:grid-cols-2 md:items-center md:pt-16"
        >
          <div>
            {eyebrow && (
              <p className="font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-filament">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-5 font-display text-[12vw] leading-[0.98] text-canopy sm:text-6xl md:text-7xl">
              {heading}
            </h1>
            {cta && (
              <div className="mt-9">
                <CharButton href={cta.href} variant="dark">
                  {cta.label}
                </CharButton>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            {description && (
              <p className="max-w-md text-base leading-relaxed text-canopy/65">{description}</p>
            )}
            {media ? (
              <MediaSlot
                srcImage={media.srcImage}
                srcVideo={media.srcVideo}
                alt={media.label}
                label={media.label}
                tone="light"
                aspectClassName="aspect-square"
                className="max-w-md shadow-soft"
                priority
              />
            ) : (
              rightContent
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
