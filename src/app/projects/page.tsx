import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { PROJECTS, hasProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects. Lumatree",
  description:
    "Rooms specified in Lumatree: the fixtures used, the practices behind them and what each space had to do.",
};

/**
 * Reference installations.
 *
 * Returns 404 while `PROJECTS` is empty rather than rendering an empty state.
 * See src/lib/projects.ts for why — briefly, a credibility page with nothing
 * on it damages the thing it exists to build.
 */
export default function ProjectsPage() {
  if (!hasProjects) notFound();

  return (
    <>
      <section className="bg-gallery px-6 pb-24 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-ink">
              Rooms it has already done.
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#5c5c5c]">
              What each space had to do, which fixtures answered it, and who
              specified them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-gallery px-6 pb-32 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col border-t border-line pt-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl tracking-[-0.03em] text-ink">
                      {project.name}
                    </h2>
                    <span className="figure text-[11px] whitespace-nowrap text-[#6b6b6b]">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] text-[#6b6b6b]">
                    {project.location}
                    {project.practice ? ` · ${project.practice}` : ""}
                  </p>

                  <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#5c5c5c]">
                    {project.summary}
                  </p>

                  <p className="figure mt-5 text-[11px] text-[#6b6b6b]">
                    {project.fixtures.join(" · ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-gallery px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
                Specified Lumatree on a project? We would like to see it.
              </h2>
              <PillButton href="/contact">Get in touch</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
