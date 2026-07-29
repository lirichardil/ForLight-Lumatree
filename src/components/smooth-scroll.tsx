"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis owns the scroll position; ScrollTrigger reads from it.
 *
 * The two must share a single ticker or they desync and pinned sections drift
 * by a frame under fast scrolling. So: Lenis is driven by gsap.ticker rather
 * than its own rAF loop, and ScrollTrigger.update runs on every Lenis frame.
 *
 * Disabled entirely under prefers-reduced-motion, which leaves native scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out. Long enough to feel weighted, short
      // enough that scrubbed frame sequences still track the wheel.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
