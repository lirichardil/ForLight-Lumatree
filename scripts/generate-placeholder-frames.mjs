/**
 * Generates placeholder frame sequences so the scroll architecture can be
 * built and reviewed before the rendered frames arrive.
 *
 * The geometry follows the real catalogue dimensions (42x36 profile, deep
 * recessed circular optics, the 425mm Task arm, the 1542mm Floor Wash), and
 * emission follows the real dim-to-warm curve from 1800K to 2700K. So the
 * motion being previewed is the motion that was specced, not filler.
 *
 * Replace with rendered WebP frames per References/3D-Render-Brief-CN.md,
 * then update src/lib/sequence.ts.
 *
 *   node scripts/generate-placeholder-frames.mjs
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(__dirname, "..", "public", "media", "sequences");

const W = 1280;
const H = 720;

const SEQUENCES = [
  { id: "hero-ignition", frames: 48, mode: "ignition" },
  { id: "lens-detail", frames: 36, mode: "lens" },
  { id: "hero-transform", frames: 72, mode: "transform" },
];

/** Blackbody-ish ramp between 1800K and 2700K, matching the dim-to-warm spec. */
function emitColor(k) {
  const stops = [
    [1800, [255, 138, 61]],
    [2200, [255, 160, 88]],
    [2700, [255, 180, 107]],
  ];
  let a = stops[0];
  let b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (k >= stops[i][0] && k <= stops[i + 1][0]) {
      a = stops[i];
      b = stops[i + 1];
      break;
    }
  }
  const t = (k - a[0]) / Math.max(1, b[0] - a[0]);
  const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Builds the scene for a given mode at normalised time t.
 * Returns the inner HTML of the stage plus the emission level, so the caller
 * can drive the floor pool and ambient lift consistently.
 */
function scene(mode, t) {
  const LENS_COUNT = 12;

  if (mode === "ignition") {
    // Beat 1 (0 to 0.18): unlit, rim light only.
    // Beat 2 (0.18 to 0.75): lenses ignite left to right, 1800K climbing.
    // Beat 3 (0.75 to 1): settled at 2700K, full output.
    const ignite = clamp01((t - 0.18) / 0.57);
    const kelvin = lerp(1800, 2700, easeInOut(ignite));
    const emit = easeInOut(ignite);
    const color = emitColor(kelvin);

    const lenses = Array.from({ length: LENS_COUNT }, (_, i) => {
      // Each lens has its own ignition window, so they light in sequence.
      const start = (i / LENS_COUNT) * 0.55;
      const local = clamp01((ignite - start) / 0.45);
      const on = easeInOut(local);
      return `<span class="lens" style="
        --on:${on};
        background: radial-gradient(circle at 50% 42%,
          color-mix(in srgb, ${color} ${40 + on * 60}%, #17130f) 0%,
          #17130f 74%);
        box-shadow: 0 0 ${10 + on * 26}px ${on * 9}px
          color-mix(in srgb, ${color} ${on * 55}%, transparent),
          inset 0 1px 2px rgba(0,0,0,.85);
      "></span>`;
    }).join("");

    return {
      emit,
      color,
      html: `
        <div class="rig" style="transform: translateY(${lerp(6, 0, emit)}px)">
          <div class="glow" style="
            opacity:${emit * 0.85};
            background: radial-gradient(60% 150% at 50% 50%, ${color} 0%, transparent 72%);
          "></div>
          <div class="bar bar-h">
            <div class="face">${lenses}</div>
          </div>
        </div>`,
    };
  }

  if (mode === "lens") {
    // Rotate the face toward camera to expose the recess depth. The whole
    // point of this beat is that the optics sit deep, which is the UGR9 story.
    const spin = easeInOut(t);
    const rotX = lerp(74, 8, spin);
    const scale = lerp(1.0, 1.85, spin);
    const color = emitColor(2700);
    const lenses = Array.from({ length: LENS_COUNT }, () => {
      const depth = lerp(1, 5, spin);
      return `<span class="lens" style="
        background: radial-gradient(circle at 50% ${lerp(40, 50, spin)}%,
          color-mix(in srgb, ${color} 88%, #17130f) 0%,
          color-mix(in srgb, ${color} 30%, #17130f) 46%,
          #14100d 78%);
        box-shadow: 0 0 26px 7px color-mix(in srgb, ${color} 34%, transparent),
          inset 0 ${depth}px ${depth * 1.6}px rgba(0,0,0,.92);
      "></span>`;
    }).join("");

    return {
      emit: 0.85,
      color,
      html: `
        <div class="rig" style="transform: scale(${scale}) rotateX(${rotX}deg)">
          <div class="glow" style="
            opacity:.6;
            background: radial-gradient(60% 150% at 50% 50%, ${color} 0%, transparent 72%);
          "></div>
          <div class="bar bar-h">
            <div class="face">${lenses}</div>
          </div>
        </div>`,
    };
  }

  // transform: one bar cycling through the six mounts.
  // Proportions track the catalogue: Floor Wash is tall and vertical, the
  // Task pair share an identical arm on different stems, Pendant hangs.
  const FORMS = [
    { name: "Pendant", rot: 0, len: 560, y: -90, stem: 0, cable: 150, base: 0 },
    { name: "Floor Wash", rot: 90, len: 420, y: 20, stem: 150, cable: 0, base: 130 },
    { name: "Table Wash", rot: 90, len: 250, y: 60, stem: 90, cable: 0, base: 90 },
    { name: "Floor Task", rot: 0, len: 300, y: -40, stem: 230, cable: 0, base: 130 },
    { name: "Table Task", rot: 0, len: 300, y: 60, stem: 110, cable: 0, base: 90 },
    { name: "Wall", rot: 0, len: 300, y: 0, stem: 0, cable: 0, base: 0 },
  ];

  const span = 1 / FORMS.length;
  const idx = Math.min(FORMS.length - 1, Math.floor(t / span));
  const next = FORMS[(idx + 1) % FORMS.length];
  const cur = FORMS[idx];
  // Hold each form, then morph. Reads as a deliberate reveal rather than a
  // constant tween that never lets the eye settle.
  const local = easeInOut(clamp01((t - idx * span) / span / 0.62 - 0.38));

  const rot = lerp(cur.rot, next.rot, local);
  const len = lerp(cur.len, next.len, local);
  const yOff = lerp(cur.y, next.y, local);
  const stem = lerp(cur.stem, next.stem, local);
  const cable = lerp(cur.cable, next.cable, local);
  const base = lerp(cur.base, next.base, local);
  const color = emitColor(2700);

  const lenses = Array.from(
    { length: Math.max(6, Math.round(len / 46)) },
    () => `<span class="lens" style="
      background: radial-gradient(circle at 50% 42%,
        color-mix(in srgb, ${color} 92%, #17130f) 0%, #17130f 74%);
      box-shadow: 0 0 22px 6px color-mix(in srgb, ${color} 42%, transparent),
        inset 0 2px 3px rgba(0,0,0,.85);
    "></span>`
  ).join("");

  return {
    emit: 0.8,
    color,
    html: `
      <div class="rig" style="transform: translateY(${yOff}px)">
        ${cable > 0 ? `<div class="cable" style="height:${cable}px"></div>` : ""}
        <div class="assembly" style="transform: rotate(${rot}deg)">
          <div class="glow" style="
            opacity:.7;
            background: radial-gradient(60% 150% at 50% 50%, ${color} 0%, transparent 72%);
          "></div>
          <div class="bar bar-h" style="width:${len}px">
            <div class="face">${lenses}</div>
          </div>
        </div>
        ${stem > 0 ? `<div class="stem" style="height:${stem}px"></div>` : ""}
        ${base > 0 ? `<div class="base" style="width:${base}px"></div>` : ""}
      </div>`,
  };
}

function document_(mode, t) {
  const { html, emit, color } = scene(mode, t);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:${W}px;height:${H}px;overflow:hidden;background:#0b0b0c}
    .stage{
      position:relative;width:${W}px;height:${H}px;
      display:flex;align-items:center;justify-content:center;
      perspective:1400px;
      background:
        radial-gradient(120% 62% at 50% 64%, #1b1b1e 0%, transparent 70%),
        linear-gradient(180deg,#0b0b0c 0%,#101012 55%,#08080a 100%);
    }
    /* Light landing on the set. This gradient is the point of the dark
       background: without something for the falloff to fall on, the fixture
       reads as pasted onto a void. */
    .pool{
      position:absolute;left:50%;bottom:8%;transform:translateX(-50%);
      width:1100px;height:340px;pointer-events:none;
      opacity:${(emit * 0.5).toFixed(3)};
      background:radial-gradient(50% 50% at 50% 50%, ${color} 0%, transparent 70%);
      filter:blur(48px);
    }
    .ambient{
      position:absolute;inset:0;pointer-events:none;
      opacity:${(emit * 0.14).toFixed(3)};
      background:radial-gradient(70% 55% at 50% 48%, ${color} 0%, transparent 75%);
    }
    .rig{position:relative;display:flex;flex-direction:column;align-items:center;
      transform-style:preserve-3d}
    .assembly{position:relative;display:flex;align-items:center;justify-content:center}
    .glow{position:absolute;inset:-90px -60px;filter:blur(34px);pointer-events:none}
    .bar{
      position:relative;height:34px;border-radius:3px;
      background:linear-gradient(180deg,#a9723f 0%,#8a5334 46%,#5e3722 100%);
      box-shadow:inset 0 1px 0 rgba(255,225,190,.32),
        inset 0 -2px 5px rgba(0,0,0,.55), 0 18px 44px rgba(0,0,0,.6);
    }
    .bar-h{width:560px}
    .face{position:absolute;inset:0;display:flex;align-items:center;
      justify-content:space-evenly;padding:0 14px}
    .lens{width:15px;height:15px;border-radius:50%;flex:0 0 auto}
    .cable{width:1px;background:linear-gradient(180deg,transparent,#4a4a4e)}
    .stem{width:7px;background:linear-gradient(180deg,#2a2a2d,#1a1a1c);border-radius:2px}
    .base{height:9px;border-radius:3px;
      background:linear-gradient(180deg,#2e2e31,#161618);
      box-shadow:0 12px 30px rgba(0,0,0,.65)}
  </style></head><body>
    <div class="stage"><div class="ambient"></div>${html}<div class="pool"></div></div>
  </body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });

let total = 0;
for (const seq of SEQUENCES) {
  const dir = path.join(OUT_ROOT, seq.id);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < seq.frames; i++) {
    const t = seq.frames === 1 ? 0 : i / (seq.frames - 1);
    await page.setContent(document_(seq.mode, t));
    await page.screenshot({
      path: path.join(dir, `frame-${String(i + 1).padStart(4, "0")}.jpg`),
      type: "jpeg",
      quality: 74,
    });
    total++;
  }
  console.log(`${seq.id}: ${seq.frames} frames`);
}

await browser.close();
console.log(`\n${total} placeholder frames written to public/media/sequences/`);
