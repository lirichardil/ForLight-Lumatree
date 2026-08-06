import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import Reveal from "@/components/reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Enquire. Lumatree",
  description:
    "Request specification sheets, finish samples and lead times for the Lumatree range.",
};

export default async function ContactPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-gallery px-6 pb-32 pt-40 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Reveal>
          <h1 className="max-w-[13ch] text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.045em] text-ink">
            Tell us about the space.
          </h1>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-[#5c5c5c]">
            We quote from drawings and send finish samples on request. For
            specification work, include the ceiling height and the mounting
            positions you are considering.
          </p>

          <dl className="mt-14 flex flex-col gap-5 border-t border-line pt-8">
            <div>
              <dt className="text-[12px] text-[#6b6b6b]">Enquiries</dt>
              <dd className="mt-1 text-[14px] text-ink">
                hello@lumatree.com
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-[#6b6b6b]">Lead time</dt>
              <dd className="figure mt-1 text-[14px] text-ink">
                6 to 8 weeks
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm productNames={products.map((p) => p.name)} />
        </Reveal>
      </div>
    </div>
  );
}
