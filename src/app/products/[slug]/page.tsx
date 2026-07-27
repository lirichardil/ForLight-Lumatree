import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import IgnitionHero from "@/components/ignition-hero";
import MediaSlot from "@/components/media-slot";
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
        heading={<span className="not-italic">{product.name}</span>}
        cueText={product.tagline}
        heightVh={180}
        media={{ srcImage: product.heroImage, label: product.name }}
      />

      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          About {product.name}
        </p>
        <p className="text-balance mt-6 max-w-2xl font-display text-2xl italic leading-relaxed sm:text-3xl">
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
      </section>

      {product.gallery.length > 0 && (
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Gallery
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((src, i) => (
                <MediaSlot
                  key={src}
                  srcImage={src}
                  alt={`${product.name} — view ${i + 1}`}
                  label={`${product.name} ${i + 1}`}
                  tone="light"
                  aspectClassName="aspect-[4/5]"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-canopy/10 bg-bark px-6 py-20 text-vellum sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="max-w-lg font-display text-3xl italic leading-snug sm:text-4xl">
            Picture {product.name.toLowerCase()} in your own space?
          </h2>
          <div className="flex shrink-0 gap-4">
            <Link
              href="/contact"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-canopy bg-filament rounded-full px-6 py-3 transition-opacity hover:opacity-90"
            >
              Ask about this fixture
            </Link>
            <Link
              href="/products"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-vellum border border-vellum/30 rounded-full px-6 py-3 transition-colors hover:border-vellum/60"
            >
              Back to series
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
