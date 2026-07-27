import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Contact — Lumatree",
  description: "Get in touch about the Lumatree lighting fixture series.",
};

export default async function ContactPage() {
  const products = await getAllProducts();

  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 sm:pt-44">
      <div
        aria-hidden="true"
        className="glow-blob-soft pointer-events-none absolute -right-32 top-24 h-[30rem] w-[30rem] opacity-60"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-filament">
            Contact
          </p>
          <h1 className="text-balance mt-4 font-display text-4xl leading-snug text-canopy sm:text-5xl">
            Ask us anything before it arrives.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-canopy/60">
            Sizing for a specific room, lead times, dealer availability — if
            you&apos;re picturing a fixture somewhere, tell us where and
            we&apos;ll help you get the right one.
          </p>

          <div className="mt-12 space-y-6 border-t border-canopy/10 pt-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-canopy/50">
                Email
              </p>
              <p className="mt-1 text-sm text-canopy">hello@lumatree.example</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-canopy/50">
                Studio
              </p>
              <p className="mt-1 text-sm text-canopy">By appointment only</p>
            </div>
          </div>
        </div>

        <ContactForm productNames={products.map((p) => p.name)} />
      </div>
    </div>
  );
}
