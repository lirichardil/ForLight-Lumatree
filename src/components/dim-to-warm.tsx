"use client";

import { useState } from "react";

/**
 * Dim-to-warm, made operable.
 *
 * Motivation: the range dims from 2700K down toward candlelight, and that is
 * a relationship between two variables. A photograph can show one point on
 * the curve; a slider lets the reader traverse it. This is the one place on
 * the site where chroma appears, and it is emitted light, not UI colour.
 *
 * The colour ramp is a blackbody approximation over the specified
 * 1800K to 2700K tunable range.
 */

const STOPS: [number, [number, number, number]][] = [
  [1800, [255, 138, 61]],
  [2100, [255, 152, 79]],
  [2400, [255, 167, 95]],
  [2700, [255, 180, 107]],
];

function blackbody(k: number) {
  let a = STOPS[0];
  let b = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (k >= STOPS[i][0] && k <= STOPS[i + 1][0]) {
      a = STOPS[i];
      b = STOPS[i + 1];
      break;
    }
  }
  const t = (k - a[0]) / Math.max(1, b[0] - a[0]);
  const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export default function DimToWarm() {
  // 0 = fully dimmed and warmest, 100 = full output at 2700K.
  const [level, setLevel] = useState(72);
  const kelvin = Math.round(1800 + (level / 100) * 900);
  const color = blackbody(kelvin);
  const intensity = 0.16 + (level / 100) * 0.84;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
      {/* The lamp. Sits on its own dark set so the light has somewhere to fall. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stage">
        <div className="stage-floor absolute inset-0" />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 blur-3xl transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, ${color} 0%, transparent 70%)`,
            opacity: intensity * 0.55,
          }}
        />

        <div className="absolute left-1/2 top-1/2 flex w-[62%] -translate-x-1/2 -translate-y-1/2 items-center justify-evenly rounded-[3px] px-3 py-[9px] shadow-[0_18px_44px_rgba(0,0,0,0.6)]"
          style={{
            background: "linear-gradient(180deg,#a9723f 0%,#8a5334 46%,#5e3722 100%)",
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out"
              style={{
                background: `radial-gradient(circle at 50% 42%, color-mix(in srgb, ${color} ${30 + intensity * 70}%, #17130f) 0%, #17130f 74%)`,
                boxShadow: `0 0 ${8 + intensity * 20}px ${intensity * 6}px color-mix(in srgb, ${color} ${intensity * 55}%, transparent), inset 0 1px 2px rgba(0,0,0,.85)`,
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="max-w-md text-3xl leading-[1.08] tracking-[-0.035em] text-[--color-ink] md:text-5xl">
          It gets warmer as it gets darker.
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#5c5c5c]">
          Most LED holds one colour at every level, so a dimmed room turns
          grey. Every Lumatree fixture drops toward candlelight instead, the
          way a filament does.
        </p>

        <div className="mt-10 max-w-md">
          <label
            htmlFor="dim"
            className="flex items-baseline justify-between text-[13px] text-[#5c5c5c]"
          >
            <span>Output</span>
            <span className="figure text-[--color-ink]">
              {kelvin}K at {level}%
            </span>
          </label>
          <input
            id="dim"
            type="range"
            min={0}
            max={100}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            aria-label="Dim level, which also sets colour temperature"
            className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-[--color-gallery-dim] accent-[--color-ink] outline-offset-4"
            style={{
              background: `linear-gradient(90deg, ${blackbody(1800)} 0%, ${blackbody(2700)} 100%)`,
            }}
          />
          <div className="mt-3 flex justify-between">
            <span className="figure text-[11px] text-[#6b6b6b]">1800K</span>
            <span className="figure text-[11px] text-[#6b6b6b]">2700K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
