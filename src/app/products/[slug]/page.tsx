import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IgnitionHero from "@/components/ignition-hero";
import MediaSlot from "@/components/media-slot";
import CharButton from "@/components/char-button";
import Reveal from "@/components/reveal";
import { getAllProducts, getProductBySlug } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Lumatree`,
    description: product.tagline,
  };
}

const SPEC_ROWS = (product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>) => [
  ["Series", product.series],
  ["Type", product.type[0] + product.type.slice(1).toLowerCase()],
  ["Diameter", `${product.diameterCm} cm`],
  ["Height", `${product.heightCm} cm`],
  ["Color temperature", `${product.colorTempK}K`],
  ["Output", `${product.lumens} lm`],
  ["Dimmable", product.dimmable ? "Yes" : "No"],
  ["Materials", product.materials],
  ["Price", `$${product.priceUsd.toLocaleString()}`],
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <IgnitionHero
        eyebrow={product.series}
        heading={product.name}
        description={product.tagline}
        heightVh={140}
        media={{ srcImage: product.heroImage, label: product.name }}
      />

      <Reveal className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-filament">
          About {product.name}
        </p>
        <p className="text-balance mt-6 max-w-2xl font-display text-2xl leading-relaxed text-canopy sm:text-3xl">
          {product.description}
        </p>

        <div className="mt-16 border-t border-canopy/10">
          {SPEC_ROWS(product).map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-canopy/10 py-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-canopy/50">
                {label}
              </span>
              <span className="font-mono text-sm text-canopy">{value}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {product.gallery.length > 0 && (
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.14em] text-mist">
              Gallery
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.06}>
                  <MediaSlot
                    srcImage={src}
                    alt={`${product.name} — view ${i + 1}`}
                    label={`${product.name} ${i + 1}`}
                    tone="light"
                    aspectClassName="aspect-[4/5]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-canopy px-6 py-24 text-vellum sm:px-10">
        <div
          aria-hidden="true"
          className="glow-blob pointer-events-none absolute -left-20 bottom-0 h-[28rem] w-[28rem] opacity-25"
        />
        <Reveal className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
          <h2 className="max-w-lg font-display text-3xl leading-snug sm:text-4xl">
            Picture {product.name.toLowerCase()} in your own space?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <CharButton href="/contact" variant="light">
              Ask about this fixture
            </CharButton>
            <CharButton href="/products" variant="light">
              Back to series
            </CharButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
