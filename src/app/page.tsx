import Link from "next/link";
import IgnitionHero from "@/components/ignition-hero";
import ProductCard from "@/components/product-card";
import MediaSlot from "@/components/media-slot";
import CircleButton from "@/components/circle-button";
import CharButton from "@/components/char-button";
import Reveal from "@/components/reveal";
import { getFeaturedProducts } from "@/lib/products";
import { resolvePublicMedia } from "@/lib/media";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <IgnitionHero
        eyebrow="Lumatree — Modular Lighting"
        heading={
          <>
            Light, shaped
            <br />
            like <span className="text-filament">growth.</span>
          </>
        }
        cta={{ label: "View collection", href: "/products" }}
        description="A modular lighting series built around one idea: soft, diffused light, shown through the contrast it leaves in shadow."
        rightContent={
          <ul className="flex flex-col gap-3">
            <li>
              <CircleButton href="/features">Features</CircleButton>
            </li>
            <li>
              <CircleButton href="/products">Products</CircleButton>
            </li>
            <li>
              <CircleButton href="/company">Company</CircleButton>
            </li>
          </ul>
        }
      />

      <section className="relative overflow-hidden px-6 py-32 text-center sm:px-10">
        <div
          aria-hidden="true"
          className="glow-blob-soft pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 opacity-70"
        />
        <Reveal className="relative mx-auto max-w-3xl">
          <p className="text-balance font-display text-4xl leading-[1.05] text-canopy sm:text-5xl">
            Every fixture is built for <span className="text-filament">one</span> thing:
            soft light, made visible by what it leaves in shadow.
          </p>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-canopy/60">
            No fixture in the Lumatree series aims for brightness. Each one is
            shaped, gently, to diffuse — so a room reads in gradients of light
            and shade rather than a single flat wash.
          </p>
        </Reveal>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex items-end justify-between border-b border-canopy/10 pb-6">
            <h2 className="font-display text-3xl text-canopy">The series</h2>
            <Link
              href="/products"
              className="font-sans text-[13px] font-medium text-canopy/60 transition-colors hover:text-canopy"
            >
              View all →
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-28 sm:px-10 md:grid-cols-2 md:items-center md:gap-16">
        <MediaSlot
          srcImage={resolvePublicMedia("/media/home/craft.jpg")}
          alt="Material detail — blown opal glass and brushed bronze"
          label="Craft detail"
          tone="light"
          aspectClassName="aspect-[4/3]"
        />
        <div>
          <p className="font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-filament">
            Materials
          </p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-canopy sm:text-4xl">
            Opal glass, hand-blown. Bronze, hand-brushed.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-canopy/60">
            Every diffuser is blown, not molded, so the glass keeps a
            thickness that varies by a millimeter or two across its surface —
            enough to break a bulb&apos;s point of light into something
            closer to daylight through a leaf canopy.
          </p>
        </div>
      </Reveal>

      <section className="relative overflow-hidden bg-canopy px-6 py-28 text-vellum sm:px-10">
        <div
          aria-hidden="true"
          className="glow-blob pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-25"
        />
        <Reveal className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
          <h2 className="max-w-xl font-display text-4xl leading-snug sm:text-5xl">
            See the full series, or bring one into a room you&apos;re already
            picturing.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <CharButton href="/products" variant="light">
              Browse products
            </CharButton>
            <CharButton href="/contact" variant="light">
              Talk to us
            </CharButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
