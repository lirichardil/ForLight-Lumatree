"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEQUENCES, allFramePaths, type SequenceId } from "@/lib/sequence";

type Props = {
  sequence: SequenceId;
  /** Pinned scroll length, in viewports. More viewports means slower scrub. */
  scrollVh?: number;
  /** Overlay content, positioned over the pinned canvas. */
  children?: ReactNode;
  className?: string;
};

/**
 * Scroll-scrubbed image sequence on a pinned canvas.
 *
 * Motivation (one sentence, per the motion rule): the fixture's dim-to-warm
 * behaviour is a change over time, so it cannot be photographed, only played,
 * and handing the playhead to the reader lets them inspect it at their pace.
 *
 * Mechanics:
 *  - every frame is decoded up front behind a progress readout, so scrubbing
 *    never hits a half-loaded image
 *  - ScrollTrigger pins the section and scrubs a plain object; the canvas is
 *    painted in onUpdate, so React never re-renders per frame
 *  - under reduced motion the pin is skipped and a single poster frame is
 *    drawn, which still communicates the product
 */
export default function FrameSequence({
  sequence,
  scrollVh = 300,
  children,
  className = "",
}: Props) {
  const spec = SEQUENCES[sequence];
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // --- decode every frame before the scene becomes scrubbable ----------------
  useEffect(() => {
    let cancelled = false;
    const paths = allFramePaths(spec);
    const images: HTMLImageElement[] = new Array(paths.length);
    let done = 0;

    paths.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      const settle = () => {
        if (cancelled) return;
        done += 1;
        setProgress(done / paths.length);
        if (done === paths.length) setReady(true);
      };
      img.onload = settle;
      // A missing frame must not deadlock the loader. Count it and move on;
      // the renderer skips images that never completed.
      img.onerror = settle;
      img.src = src;
      images[i] = img;
    });

    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [spec]);

  // --- pin, scrub, paint -----------------------------------------------------
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx2d = canvas.getContext("2d", { alpha: false });
    if (!ctx2d) return;

    const state = { frame: 0 };

    const paint = () => {
      const img = imagesRef.current[Math.round(state.frame)];
      if (!img?.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
      }
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Landscape viewports cover-fit. Portrait ones would crop a 16:9 frame
      // off both edges and cut the fixture in half, so they fit to width and
      // then zoom 1.7x. The zoom eats letterbox space rather than subject:
      // the fixture occupies the middle ~45% of every frame, so 1.7x still
      // leaves it comfortably inside. Clamped so it never exceeds cover.
      // Letterboxing is invisible because the frames share this background.
      const portrait = cw / ch < 1.2;
      const scale = portrait
        ? Math.min(
            (cw / img.naturalWidth) * 1.7,
            ch / img.naturalHeight
          )
        : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx2d.fillStyle = "#0b0b0c";
      ctx2d.fillRect(0, 0, cw, ch);
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Poster frame: two thirds in, where the fixture reads as fully lit.
      state.frame = Math.floor(spec.frames * 0.66);
      paint();
      window.addEventListener("resize", paint);
      return () => window.removeEventListener("resize", paint);
    }

    gsap.registerPlugin(ScrollTrigger);
    const gsapCtx = gsap.context(() => {
      gsap.to(state, {
        frame: spec.frames - 1,
        ease: "none",
        snap: "frame",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${scrollVh}%`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        onUpdate: paint,
      });
    }, wrap);

    paint();
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("resize", paint);
      gsapCtx.revert();
    };
  }, [ready, spec, scrollVh]);

  return (
    <section ref={wrapRef} className={`relative bg-stage ${className}`}>
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-label={spec.alt}
          role="img"
          className="absolute inset-0 h-full w-full"
        />

        {/* Loading state, shaped like the scene it replaces rather than a spinner. */}
        {!ready && (
          <div className="absolute inset-0 flex items-end justify-center bg-stage pb-16">
            <div className="w-full max-w-xs px-6">
              <div className="h-px w-full bg-white/15">
                <div
                  className="h-px bg-white/70 transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="figure mt-3 text-[11px] text-white/40">
                {Math.round(progress * 100)}%
              </p>
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
