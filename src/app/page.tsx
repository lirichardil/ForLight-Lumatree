import FrameSequence from "@/components/frame-sequence";
import DimToWarm from "@/components/dim-to-warm";
import FixtureCard from "@/components/fixture-card";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { getAllProducts } from "@/lib/products";

/**
 * Page theme: light throughout. The dark sections are full-bleed product
 * scenes, the way a magazine runs a dark photograph across a white spread.
 * All chrome, body copy and controls stay on the light ground, so the theme
 * itself never flips.
 *
 * Layout families, one each: pinned scene, asymmetric figure split,
 * annotated scene, interactive demo, span-varied catalogue grid, closing
 * statement. No family repeats.
 */
export default async function Home() {
  const products = await getAllProducts();

  // Varied spans give the grid rhythm instead of six identical tiles, and
  // pair each family on its own row.
  const SPANS = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-7",
    "lg:col-span-5",
  ];

  return (
    <>
      {/* 1. Ignition. Scroll drives the dimmer from unlit to full output. */}
      <FrameSequence sequence="hero-ignition" scrollVh={320}>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 pb-14 pt-28 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <h1 className="max-w-[13ch] text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.98] tracking-[-0.045em] text-white">
              One bar.
              <br />
              Six fixtures.
            </h1>
          </div>

          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-[14px] leading-relaxed text-white/60">
              A wood-clad linear LED bar with deep-recessed optics, built in
              six mounts.
            </p>
            <div className="pointer-events-auto">
              <PillButton href="/products" variant="onStage">
                See the range
              </PillButton>
            </div>
          </div>
        </div>
      </FrameSequence>

      {/* 2. The figures behind the modularity claim. */}
      <section className="bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.04] tracking-[-0.04em] text-[--color-ink]">
              The same extrusion, mounted six ways.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-[#5c5c5c]">
              Floor Task and Table Task carry an identical 425mm arm. Only the
              stem height and the base plate change. Floor Wash and Table Wash
              share one 20 x 35 profile. Six fixtures come out of three core
              assemblies, which is why the light stays consistent across a
              whole room rather than close enough.
            </p>

            <dl className="mt-14 grid grid-cols-3 gap-8 border-t border-[--color-line] pt-8">
              {[
                ["6", "mounts"],
                ["3", "finishes"],
                ["1", "bar"],
              ].map(([figure, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="figure text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-[--color-ink]">
                    {figure}
                  </dd>
                  <p className="mt-3 text-[12px] text-[#6b6b6b]">{label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 3. Optics. The rotation exposes recess depth, which is the UGR9 story. */}
      <FrameSequence sequence="lens-detail" scrollVh={240}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-16 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[15ch] text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.06] tracking-[-0.035em] text-white">
              The optics sit deep in the wood.
            </h2>
            <div className="flex gap-10">
              <div>
                <p className="figure text-[clamp(2rem,4vw,3rem)] leading-none text-white">
                  UGR9
                </p>
                <p className="mt-2 max-w-[18ch] text-[12px] leading-relaxed text-white/60">
                  Glare rating on Pendant and Wall. Most specification grade
                  lighting sits at 19.
                </p>
              </div>
              <div>
                <p className="figure text-[clamp(2rem,4vw,3rem)] leading-none text-white">
                  92
                </p>
                <p className="mt-2 max-w-[18ch] text-[12px] leading-relaxed text-white/60">
                  Colour rendering index, across the whole range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FrameSequence>

      {/* 4. Dim-to-warm, operable rather than described. */}
      <section className="bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <DimToWarm />
          </Reveal>
        </div>
      </section>

      {/* 5. The transformation, then the catalogue it produces. */}
      <FrameSequence sequence="hero-transform" scrollVh={420}>
        <div className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-28 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <p className="figure text-[11px] uppercase tracking-[0.2em] text-white/45">
              Pendant. Wall. Floor Task. Table Task. Floor Wash. Table Wash.
            </p>
          </div>
        </div>
      </FrameSequence>

      <section className="bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.04] tracking-[-0.04em] text-[--color-ink]">
              The range.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
            {products.map((product, i) => (
              <Reveal
                key={product.id}
                delay={(i % 2) * 0.08}
                className={SPANS[i] ?? "lg:col-span-6"}
              >
                <FixtureCard product={product} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Close. */}
      <section className="border-t border-[--color-line] bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.04] tracking-[-0.04em] text-[--color-ink]">
                Specification sheets and lead times on request.
              </h2>
              <PillButton href="/contact">Enquire</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
