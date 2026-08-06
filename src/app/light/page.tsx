import type { Metadata } from "next";
import DimToWarm from "@/components/dim-to-warm";
import FrameSequence from "@/components/frame-sequence";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { BAR, OPTIC, UGR_FAMILIES } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${OPTIC} optics. Lumatree`,
  description: `${OPTIC}: recessed optics for UGR9 glare control on ${UGR_FAMILIES}, CRI92 rendering, and dim-to-warm to 1800K across the whole range.`,
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
      <section className="bg-gallery px-6 pb-28 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="figure text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b]">
              {OPTIC} optics
            </p>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-ink">
              You see the light. Never the source.
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#5c5c5c]">
              Every LED in the {BAR} bar sits at the bottom of a machined well,
              below the surface of the timber. The depth of that recess is what
              controls glare: from any normal seated position the emitter is out
              of view, and what reaches you is the light it puts on the surface
              rather than the source itself.
            </p>
            <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-[#6b6b6b]">
              Commercial lighting reaches low glare figures with louvres and
              troffers. {OPTIC} reaches them in a timber bar you would hang over
              a dining table.
            </p>
          </Reveal>

          <div className="mt-24 grid gap-12 border-t border-line pt-12 md:grid-cols-3">
            {[
              [
                "UGR9",
                `Unified glare rating, measured on ${UGR_FAMILIES}. Below 10 means glare is effectively imperceptible. Specification grade office lighting typically sits at 19.`,
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
                <p className="figure text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-ink">
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
              Twelve wells along a single face.
            </h2>
            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/60">
              The recess depth is identical on every mount in the range. Only{" "}
              {UGR_FAMILIES} carry a measured UGR figure, but the optic is the
              same component throughout.
            </p>
          </div>
        </div>
      </FrameSequence>

      <section className="bg-gallery px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <DimToWarm />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-gallery px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
              Control, without committing to one ecosystem.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {CONTROL.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-lg tracking-[-0.03em] text-ink">
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
              <PillButton href="/collection">See the range</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
