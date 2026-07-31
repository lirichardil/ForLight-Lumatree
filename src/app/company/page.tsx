import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";

export const metadata: Metadata = {
  title: "Company. Lumatree",
  description:
    "Why Lumatree builds one bar in six mounts, and how the range is made.",
};

export default function CompanyPage() {
  return (
    <>
      <section className="bg-[--color-gallery] px-6 pb-24 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="max-w-[18ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-[--color-ink]">
              We built one good bar, then stopped redesigning it.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-[--color-gallery] px-6 pb-28 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="max-w-lg text-[clamp(1.05rem,1.9vw,1.35rem)] font-light leading-[1.6] tracking-[-0.015em] text-[--color-ink]">
              Most lighting ranges are a set of unrelated products sharing a
              badge. The pendant renders colour differently from the floor
              lamp, and a room fitted with both never quite settles.
            </p>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#5c5c5c]">
              Lumatree works the other way around. One extrusion, one optical
              assembly, one driver family, then six ways to mount it. A room
              specified entirely in Lumatree holds a single colour of light
              from the ceiling to the side table, because it is a single
              product in six positions.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="flex flex-col">
              {[
                ["Timber", "FSC certified oak, walnut and black ash"],
                ["Optics", "Deep-recessed, individually seated in the profile"],
                ["Rendering", "CRI92 across every fixture and finish"],
                ["Protection", "IP20, for dry interior use"],
                ["Warranty", "Five years"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[7rem_1fr] gap-6 border-b border-[--color-line] py-5"
                >
                  <dt className="text-[12px] text-[#6b6b6b]">{label}</dt>
                  <dd className="text-[14px] leading-relaxed text-[--color-ink]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[--color-line] bg-[--color-gallery] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-[--color-ink]">
                Working on a project? We quote from drawings.
              </h2>
              <PillButton href="/contact">Enquire</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
