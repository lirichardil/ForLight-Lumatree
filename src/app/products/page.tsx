import type { Metadata } from "next";
import FixtureCard from "@/components/fixture-card";
import Reveal from "@/components/reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "The range. Lumatree",
  description:
    "Six mounts built from one wood-clad LED bar: Pendant, Wall, Floor Task, Table Task, Floor Wash and Table Wash.",
};

const FAMILIES = [
  {
    key: "ARCHITECTURAL",
    name: "Architectural",
    note: "Bi-emissive, 64 degrees down and 160 up, rated UGR9.",
  },
  {
    key: "TASK",
    name: "Task",
    note: "One 425mm arm on two stem heights.",
  },
  {
    key: "WASH",
    name: "Wash",
    note: "The bar stood vertical on a weighted disc.",
  },
];

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-[--color-gallery] px-6 pb-32 pt-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h1 className="max-w-[14ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-[--color-ink]">
            Six mounts, one bar.
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#5c5c5c]">
            Grouped by how the light is used rather than by where it hangs.
            Every fixture shares the same optics, the same CRI92 and the same
            dim-to-warm behaviour.
          </p>
        </Reveal>

        <div className="mt-28 flex flex-col gap-28">
          {FAMILIES.map((family) => {
            const inFamily = products.filter((p) => p.family === family.key);
            return (
              <section key={family.key}>
                <Reveal>
                  {/* No bottom rule here: each card carries its own top rule,
                      and both together read as a doubled hairline. */}
                  <div className="flex flex-col gap-2 pb-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl tracking-[-0.035em] text-[--color-ink]">
                      {family.name}
                    </h2>
                    <p className="text-[13px] text-[#5c5c5c]">{family.note}</p>
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
                  {inFamily.map((product, i) => (
                    <Reveal key={product.id} delay={i * 0.08}>
                      <FixtureCard product={product} className="h-full" />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
