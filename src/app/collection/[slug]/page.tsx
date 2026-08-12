import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FixtureDiagram from "@/components/fixture-diagram";
import FixtureCard from "@/components/fixture-card";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import type { Product } from "@/lib/catalogue";
import { quoteReason } from "@/lib/commerce";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found. Lumatree" };
  return {
    title: `${product.name}. Lumatree`,
    description: product.tagline,
  };
}

/** Grouped into three clusters rather than one long hairline-per-row table. */
function specClusters(p: Product) {
  return [
    {
      name: "Light",
      rows: [
        ["Output", `${p.lumens} lm`],
        ["Load", `${p.watts} W`],
        ["Beam angle", `${p.beamAngle} degrees`],
        ["Colour rendering", `CRI ${p.cri}`],
        ...(p.ugr !== null ? [["Glare", `UGR ${p.ugr}`]] : []),
        ["Colour temperature", p.kelvin],
      ],
    },
    {
      name: "Body",
      rows: [
        ["Profile", `${p.profileMm} mm`],
        ["Emitting length", `${p.litLengthMm} mm`],
        ["Overall", p.overallMm],
        ...(p.baseMm ? [["Base", `${p.baseMm} mm`]] : []),
        ["Weight", `${p.weightKg} kg`],
      ],
    },
    {
      name: "Control",
      rows: p.control.map((c) => [c, ""]),
    },
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const clusters = specClusters(product);
  const reason = quoteReason(product.slug);
  const all = await getAllProducts();
  const others = all.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Hero: the fixture drawn to scale on its own dark set. */}
      <section className="bg-stage">
        <div className="stage-floor">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-40 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-10">
            <div>
              <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1] tracking-[-0.045em] text-white">
                {product.name}
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
                {product.tagline}
              </p>

              <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8">
                <div>
                  <dt className="text-[11px] text-white/45">Output</dt>
                  <dd className="figure mt-2 text-lg text-white">
                    {product.lumens.split(" ")[0]}
                    <span className="text-[11px] text-white/45"> lm</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-white/45">Load</dt>
                  <dd className="figure mt-2 text-lg text-white">
                    {product.watts.split(" ")[0]}
                    <span className="text-[11px] text-white/45"> W</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-white/45">
                    {product.ugr !== null ? "Glare" : "Rendering"}
                  </dt>
                  <dd className="figure mt-2 text-lg text-white">
                    {product.ugr !== null ? `UGR${product.ugr}` : `CRI${product.cri}`}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex items-center justify-center py-10">
              <FixtureDiagram
                slug={product.slug}
                className="h-[min(60vh,520px)] w-full text-white/85"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description plus finishes. */}
      <section className="bg-gallery px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="max-w-xl text-[clamp(1.15rem,2.1vw,1.6rem)] font-light leading-[1.45] tracking-[-0.02em] text-ink">
              {product.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-[13px] text-[#5c5c5c]">Finishes</h2>
            <ul className="mt-6 flex flex-col">
              {product.finishes.map((finish) => (
                <li
                  key={finish}
                  className="flex items-center gap-4 border-b border-line py-4"
                >
                  <span
                    className="h-8 w-14"
                    style={{
                      background:
                        finish === "Oak"
                          ? "linear-gradient(180deg,#d8b483,#c9a06a)"
                          : finish === "Walnut"
                            ? "linear-gradient(180deg,#a9723f,#8a5334)"
                            : "linear-gradient(180deg,#3a3733,#2c2926)",
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-ink">{finish}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-[#6b6b6b]">
              All three are FSC certified. Grain runs along the length of the
              extrusion.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specifications, clustered. */}
      <section className="border-t border-line bg-gallery px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-light tracking-[-0.04em] text-ink">
              Specifications
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {clusters.map((cluster, ci) => (
              <Reveal key={cluster.name} delay={ci * 0.08}>
                <div className="bg-gallery-dim p-8">
                  <h3 className="text-[13px] text-[#5c5c5c]">{cluster.name}</h3>
                  <dl className="mt-6 flex flex-col gap-5">
                    {cluster.rows.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[12px] text-[#6b6b6b]">{label}</dt>
                        {value && (
                          <dd className="figure mt-1 text-[14px] leading-snug text-ink">
                            {value}
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Quoted fixtures say why. A bare Enquire where the rest of the
              range will carry a price reads as evasion; naming the measurement
              we need turns it into a reason. Direct fixtures get the cart
              button here once Shopify is connected — see src/lib/commerce.ts. */}
          <Reveal>
            <div className="mt-16 flex flex-col gap-5">
              {reason && (
                <p className="max-w-md border-l border-line pl-5 text-[13px] leading-relaxed text-[#6b6b6b]">
                  {reason}
                </p>
              )}
              <PillButton href="/contact" className="w-fit">
                Enquire
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rest of the range. */}
      <section className="border-t border-line bg-gallery px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-[13px] text-[#5c5c5c]">Rest of the range</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <FixtureCard product={p} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
