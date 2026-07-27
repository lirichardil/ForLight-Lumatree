import Link from "next/link";
import IgnitionHero from "@/components/ignition-hero";
import ProductCard from "@/components/product-card";
import MediaSlot from "@/components/media-slot";
import { getFeaturedProducts } from "@/lib/products";
import { resolvePublicMedia } from "@/lib/media";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <IgnitionHero />

      <section className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          The idea
        </p>
        <p className="text-balance mt-6 font-display text-3xl italic leading-snug sm:text-4xl">
          Every fixture in the series is built for one thing: soft light,
          made visible by what it leaves in shadow.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-canopy/60">
          No fixture in the Lumatree series aims for brightness. Each one is
          shaped, gently, to diffuse — so a room reads in gradients of light
          and shade rather than in a single flat wash.
        </p>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between border-b border-canopy/10 pb-6">
            <h2 className="font-display text-3xl italic">The series</h2>
            <Link
              href="/products"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-canopy/60 transition-colors hover:text-canopy"
            >
              View all →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-28 sm:px-10 md:grid-cols-2 md:items-center md:gap-16">
        <MediaSlot
          srcImage={resolvePublicMedia("/media/home/craft.jpg")}
          alt="Material detail — blown opal glass and brushed bronze"
          label="Craft detail"
          tone="light"
          aspectClassName="aspect-[4/3]"
        />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Materials
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-snug sm:text-4xl">
            Opal glass, hand-blown. Bronze, hand-brushed.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-canopy/60">
            Every diffuser is blown, not molded, so the glass keeps a
            thickness that varies by a millimeter or two across its surface —
            enough to break a bulb&apos;s point of light into something
            closer to daylight through a leaf canopy.
          </p>
        </div>
      </section>

      <section className="border-t border-canopy/10 bg-bark px-6 py-24 text-vellum sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="max-w-lg font-display text-3xl italic leading-snug sm:text-4xl">
            See the full series, or bring one into a room you&apos;re
            already picturing.
          </h2>
          <div className="flex shrink-0 gap-4">
            <Link
              href="/products"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-canopy bg-filament rounded-full px-6 py-3 transition-opacity hover:opacity-90"
            >
              Browse products
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-vellum border border-vellum/30 rounded-full px-6 py-3 transition-colors hover:border-vellum/60"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
