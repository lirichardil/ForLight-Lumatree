"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FixtureSilhouette from "@/components/fixture-silhouette";
import MediaSlot from "@/components/media-slot";

const CANOPY = "#14120f";
const VELLUM = "#ede7da";

type IgnitionHeroProps = {
  eyebrow?: string;
  heading?: ReactNode;
  cueText?: string;
  heightVh?: number;
  media?: { srcImage?: string; srcVideo?: string; label: string };
};

export default function IgnitionHero({
  eyebrow = "Lumatree — Modular Lighting",
  heading = (
    <>
      Light, shaped
      <br />
      like growth.
    </>
  ),
  cueText = "Scroll to switch it on",
  heightVh = 220,
  media,
}: IgnitionHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(stageRef.current, { backgroundColor: VELLUM });
        gsap.set(glowRef.current, { opacity: 0.5, scale: 1.1 });
        gsap.set(cueRef.current, { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        stageRef.current,
        { backgroundColor: CANOPY },
        { backgroundColor: VELLUM, ease: "none" },
        0
      )
        .fromTo(
          glowRef.current,
          { opacity: 0.12, scale: 0.55 },
          { opacity: 0.75, scale: 1.3, ease: "sine.out" },
          0
        )
        .to(glowRef.current, { opacity: 0.5, scale: 1.12, ease: "sine.inOut" }, 0.72)
        .to(cueRef.current, { opacity: 0, ease: "none" }, 0);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="ignition-zone relative"
      style={{ height: `${heightVh}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: CANOPY }}
      >
        <div
          ref={glowRef}
          className="glow-filament absolute h-[46vh] w-[46vh] rounded-full"
          style={{ top: "38%", left: "50%", translate: "-50% -50%" }}
        />

        <div className="mix-blend-difference relative flex h-full w-full max-w-7xl flex-col justify-between px-6 py-28 text-white sm:px-10 sm:py-32">
          <div className="max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
              {eyebrow}
            </p>
            <h1 className="mt-5 font-display text-[13vw] italic leading-[0.95] sm:text-6xl md:text-7xl">
              {heading}
            </h1>
          </div>

          <p
            ref={cueRef}
            className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60"
          >
            {cueText}
          </p>
        </div>

        {media ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-16">
            <MediaSlot
              srcImage={media.srcImage}
              srcVideo={media.srcVideo}
              alt={media.label}
              label={media.label}
              tone="dark"
              aspectClassName="aspect-square"
              className="h-[52vh] w-auto"
              priority
            />
          </div>
        ) : (
          <div className="mix-blend-difference pointer-events-none absolute inset-0 flex items-center justify-center text-white">
            <FixtureSilhouette className="h-[46vh] w-auto opacity-90" />
          </div>
        )}
      </div>
    </div>
  );
}
