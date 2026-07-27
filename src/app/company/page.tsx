import type { Metadata } from "next";
import Link from "next/link";
import MediaSlot from "@/components/media-slot";
import Reveal from "@/components/reveal";
import { resolvePublicMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "Company — Lumatree",
  description: "The studio behind Lumatree, and why its fixtures are named the way they are.",
};

export default function CompanyPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          Company
        </p>
        <h1 className="text-balance mt-4 max-w-2xl font-display text-4xl italic leading-snug sm:text-5xl">
          We named the fixtures after how trees grow because that&apos;s
          the closest thing we found to how we wanted the light to behave.
        </h1>
      </div>

      <Reveal className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 px-6 sm:px-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Origin
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-snug sm:text-4xl">
            Started with one bad pendant lamp.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-canopy/60">
            Lumatree started as a small studio project: fixing a single
            fixture that lit a room unevenly, in one hard patch. Chasing the
            fix, further than the original problem needed, turned into a
            series. Each fixture answers the same question at a different
            scale — a bedside lamp, a dining chandelier, a stairwell —
            without changing the answer.
          </p>
        </div>
        <MediaSlot
          srcImage={resolvePublicMedia("/media/company/studio.jpg")}
          alt="Lumatree studio workspace"
          label="Studio"
          tone="light"
          aspectClassName="aspect-[4/3]"
        />
      </Reveal>

      <Reveal className="mx-auto mt-28 grid max-w-7xl grid-cols-1 gap-10 px-6 sm:px-10 md:grid-cols-2 md:items-center md:gap-16">
        <MediaSlot
          srcImage={resolvePublicMedia("/media/company/glassblowing.jpg")}
          alt="Glassblowing process for Lumatree diffusers"
          label="Glassblowing"
          tone="light"
          aspectClassName="aspect-[4/3]"
          className="md:order-2"
        />
        <div className="md:order-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Process
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-snug sm:text-4xl">
            Small runs, made by the same two glassblowers.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-canopy/60">
            Every diffuser in the series is blown by hand, in small batches,
            by the same workshop we started with. It&apos;s slower than
            molding, and it means no two diffusers scatter light in exactly
            the same way — which is the point, not a compromise.
          </p>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-28 max-w-3xl px-6 text-center sm:px-10">
        <p className="text-balance font-display text-2xl italic leading-relaxed sm:text-3xl">
          We&apos;d rather a room feel like it was lit by something that
          used to be alive than by something that was manufactured to spec.
        </p>
      </Reveal>

      <section className="mt-28 border-t border-canopy/10 bg-bark px-6 py-20 text-vellum sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="max-w-lg font-display text-3xl italic leading-snug sm:text-4xl">
            Want to see how a fixture would sit in your space?
          </h2>
          <div className="flex shrink-0 gap-4">
            <Link
              href="/contact"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-canopy bg-filament rounded-full px-6 py-3 transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
            <Link
              href="/products"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-vellum border border-vellum/30 rounded-full px-6 py-3 transition-colors hover:border-vellum/60"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
