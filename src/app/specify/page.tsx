import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { getAllProducts } from "@/lib/products";
import { BAR, OPTIC, UGR_FAMILIES } from "@/lib/brand";
import { SAMPLES } from "@/lib/shop";

const SAMPLE_SET = SAMPLES[0];

export const metadata: Metadata = {
  title: "Specify. Lumatree",
  description:
    "Photometric files, spec sheets, CAD and finish samples for the six Lumatree mounts. IES available on request.",
};

/**
 * The trade hub.
 *
 * This is a placeholder in the sense that no file is served yet, not in the
 * sense that it says nothing. A specifier arriving here needs one question
 * answered — can I get an IES file — and the page answers it above the fold.
 *
 * Availability is stated honestly per asset. Overstating it is worse than a
 * gap: a lighting designer who downloads a promised file and finds nothing
 * does not come back. Midgard and GRAU both ship download sections with
 * uneven coverage per family, so partial is normal here.
 *
 * When files land, swap `status` to "ready" and give the row an href. The
 * table renders links instead of labels with no other change.
 */

type Status = "ready" | "request" | "preparing";

const STATUS_LABEL: Record<Status, string> = {
  ready: "Download",
  request: "On request",
  preparing: "In preparation",
};

const STATUS_CLASS: Record<Status, string> = {
  ready: "text-ink",
  request: "text-[#5c5c5c]",
  preparing: "text-[#9a9a9a]",
};

const ASSETS: { key: string; label: string; note: string; status: Status }[] = [
  {
    key: "ies",
    label: "Photometric",
    note: "IES files for DIALux and AGi32, per fixture and per colour temperature.",
    status: "request",
  },
  {
    key: "spec",
    label: "Spec sheet",
    note: "Dimensions, output, load, beam angles, finishes and control options.",
    status: "request",
  },
  {
    key: "cad",
    label: "CAD",
    note: "STEP and DWG for coordination drawings.",
    status: "preparing",
  },
  {
    key: "install",
    label: "Installation",
    note: "Mounting detail, cable entry and clearance.",
    status: "request",
  },
];

const FINISHES = [
  ["Oak", "Pale, open grain. The lens wells read most clearly against it."],
  ["Walnut", "Mid brown, tight figure. Warms further under the 1800K floor."],
  ["Black Ash", "Near-black stain, grain still legible in raking light."],
];

export default async function SpecifyPage() {
  const products = await getAllProducts();

  return (
    <>
      <section className="bg-gallery px-6 pb-24 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="max-w-[17ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-ink">
              Everything you need to put this in a drawing.
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#5c5c5c]">
              Photometric files are available for every fixture in the range.
              Send us the room and we will return the calculation with them, or
              take the {"IES"} and run it yourself. We quote from drawings and
              send finish samples on request.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <PillButton href="/contact">Request files</PillButton>
              <p className="text-[13px] text-[#6b6b6b]">
                Typically returned within two working days.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What exists, stated plainly. */}
      <section className="bg-gallery px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-4">
            {ASSETS.map((asset, i) => (
              <Reveal key={asset.key} delay={i * 0.06}>
                <div className="flex h-full flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg tracking-[-0.03em] text-ink">
                      {asset.label}
                    </h2>
                    <span
                      className={`figure text-[11px] whitespace-nowrap ${STATUS_CLASS[asset.status]}`}
                    >
                      {STATUS_LABEL[asset.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#5c5c5c]">
                    {asset.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Per-fixture matrix. Stacks on mobile rather than scrolling sideways. */}
      <section className="border-t border-line bg-gallery px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
              By fixture.
            </h2>
          </Reveal>

          <div className="mt-14">
            {/* Column headings, desktop only: on mobile each row repeats them. */}
            <div className="hidden grid-cols-[1.4fr_repeat(4,1fr)] gap-6 border-b border-line pb-4 lg:grid">
              <span className="text-[11px] text-[#6b6b6b]">Fixture</span>
              {ASSETS.map((a) => (
                <span key={a.key} className="text-[11px] text-[#6b6b6b]">
                  {a.label}
                </span>
              ))}
            </div>

            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.04}>
                <div className="grid gap-3 border-b border-line py-6 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-6">
                  <div>
                    <p className="text-[15px] tracking-[-0.02em] text-ink">
                      {product.name}
                    </p>
                    <p className="figure mt-1 text-[11px] text-[#6b6b6b]">
                      {product.lumens.split(" ")[0]} lm
                      {product.ugr ? ` · UGR${product.ugr}` : ""}
                    </p>
                  </div>

                  {ASSETS.map((a) => (
                    <div key={a.key} className="flex items-baseline gap-2">
                      <span className="text-[11px] text-[#6b6b6b] lg:hidden">
                        {a.label}
                      </span>
                      <span
                        className={`figure text-[12px] ${STATUS_CLASS[a.status]}`}
                      >
                        {STATUS_LABEL[a.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-[#6b6b6b]">
              UGR is measured on {UGR_FAMILIES} only. The {OPTIC} recess is
              identical across the range, but the Task and Wash mounts are not
              rated, so they carry no figure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Samples. In Common With makes this a nav item; at six SKUs it is a
          section, but it still needs to be findable. */}
      <section className="border-t border-line bg-gallery px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <Reveal>
              <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
                Three finishes. We post samples.
              </h2>
              <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[#5c5c5c]">
                Timber does not photograph honestly, and the {BAR} profile is
                narrow enough that grain scale matters. Ask for the set before
                committing a specification.
              </p>

              {/* The set is offcuts of the real profile rather than flat
                  swatches, so it shows the recess depth and not just the
                  grain. Defined in src/lib/shop.ts, which is also where it
                  becomes the first purchasable product. */}
              {SAMPLE_SET?.contents && (
                <ul className="mt-8 flex flex-col">
                  {SAMPLE_SET.contents.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line py-3 text-[13px] text-[#5c5c5c]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10">
                <PillButton href="/contact" variant="quiet">
                  Request samples
                </PillButton>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="flex flex-col">
                {FINISHES.map(([name, note]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[7rem_1fr] gap-6 border-b border-line py-5"
                  >
                    <dt className="text-[13px] text-ink">{name}</dt>
                    <dd className="text-[13px] leading-relaxed text-[#5c5c5c]">
                      {note}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
