import type { Metadata } from "next";
import MediaSlot from "@/components/media-slot";
import DiffusionCompare from "@/components/diffusion-compare";
import Reveal from "@/components/reveal";
import { resolvePublicMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "Features — Lumatree",
  description: "How the Lumatree series diffuses light, and why softness is the point.",
};

const STEPS = [
  {
    stage: "Source",
    title: "A single warm-white LED.",
    body: "Every fixture starts from one small, dimmable source — nothing about the softness comes from the bulb itself.",
  },
  {
    stage: "Diffuser",
    title: "Hand-blown opal glass.",
    body: "The glass is where the light actually changes. Blown, not molded, so its thickness varies slightly across the surface and scatters the light unevenly, the way it would through something grown rather than machined.",
  },
  {
    stage: "Falloff",
    title: "A room in gradients.",
    body: "What reaches the room is a gradient, not a beam — brightest near the fixture, tapering by inches rather than snapping off at a shadow line.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="px-6 pb-24 pt-36 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Features
        </p>
        <h1 className="text-balance mt-4 max-w-2xl font-display text-4xl italic leading-snug sm:text-5xl">
          The whole design brief was softness.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-canopy/60">
          Lumatree isn&apos;t built to be bright. It&apos;s built so that the
          edge between light and shadow in a room is something you feel
          rather than notice — and that comes down to how each fixture
          diffuses, not how much it outputs.
        </p>

        <Reveal className="mt-20">
          <DiffusionCompare />
        </Reveal>

        <div className="mt-28 border-t border-canopy/10 pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            How it happens
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.stage} delay={i * 0.1}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-filament">
                  {step.stage}
                </p>
                <h3 className="mt-3 font-display text-2xl italic leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-canopy/60">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-28 grid grid-cols-1 gap-10 border-t border-canopy/10 pt-16 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              In a room
            </p>
            <h2 className="mt-4 font-display text-3xl italic leading-snug sm:text-4xl">
              Shadows with depth, not edges.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-canopy/60">
              Photograph any fixture in the series at night and the story is
              in what surrounds it — the wall it softens into, the shadow it
              never quite finishes casting.
            </p>
          </div>
          <MediaSlot
            srcImage={resolvePublicMedia("/media/features/room-contrast.jpg")}
            alt="A Lumatree fixture lit in a room, showing soft light-to-shadow falloff"
            label="Room in gradient"
            tone="light"
            aspectClassName="aspect-[4/3]"
          />
        </Reveal>
      </div>
    </div>
  );
}
