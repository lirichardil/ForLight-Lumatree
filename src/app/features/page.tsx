import type { Metadata } from "next";
import DimToWarm from "@/components/dim-to-warm";
import FrameSequence from "@/components/frame-sequence";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";

export const metadata: Metadata = {
  title: "How it works. Lumatree",
  description:
    "Deep-recessed optics for UGR9 glare control, CRI92 rendering, and dim-to-warm across the whole range.",
};

const CONTROL = [
  {
    name: "Casambi and Matter",
    body: "Pendant and Wall join a house system without a gateway. Task and Wash fixtures dim from the touch strip on the base.",
  },
  {
    name: "DALI",
    body: "Every fixture in the range accepts DALI, so a specification can address the whole room from one controller.",
  },
  {
    name: "TRIAC leading edge",
    body: "Pendant and Wall run from an existing wall dimmer where a retrofit cannot pull new control wiring.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-[--color-gallery] px-6 pb-28 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-[--color-ink]">
              Three numbers do most of the work.
            </h1>
          </Reveal>

          <div className="mt-20 grid gap-12 border-t border-[--color-line] pt-12 md:grid-cols-3">
            {[
              [
                "UGR9",
                "Unified glare rating on Pendant and Wall. Below 10 means glare is effectively imperceptible. Specification grade office lighting typically sits at 19.",
              ],
              [
                "CRI92",
                "Colour rendering across the whole range. Wood, textile and skin hold their colour instead of flattening toward grey.",
              ],
              [
                "1800K",
                "The bottom of the tunable range. Dimmed all the way down, the light sits near candlelight rather than holding one fixed colour.",
              ],
            ].map(([figure, body], i) => (
              <Reveal key={figure} delay={i * 0.08}>
                <p className="figure text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-[--color-ink]">
                  {figure}
                </p>
                <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-[#5c5c5c]">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FrameSequence sequence="lens-detail" scrollVh={220}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-16 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <h2 className="max-w-[20ch] text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.08] tracking-[-0.035em] text-white">
              Each optic sits in its own well, below the surface of the wood.
            </h2>
            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/60">
              The recess is what does the glare control. From a seated
              position the source is not in view, only the light it puts on
              the surface.
            </p>
          </div>
        </div>
      </FrameSequence>

      <section className="bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <DimToWarm />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[--color-line] bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-[--color-ink]">
              Control, without committing to one ecosystem.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {CONTROL.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="border-t border-[--color-line] pt-6">
                  <h3 className="text-lg tracking-[-0.03em] text-[--color-ink]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#5c5c5c]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-20">
              <PillButton href="/products">See the range</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
