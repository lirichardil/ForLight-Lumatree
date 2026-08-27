import Link from "next/link";
import FixtureDiagram from "@/components/fixture-diagram";
import { compactBeam, compactFigure } from "@/lib/figures";
import type { Product } from "@/lib/catalogue";

const FAMILY_LABEL: Record<string, string> = {
  ARCHITECTURAL: "Architectural",
  TASK: "Task",
  WASH: "Wash",
};

export default function FixtureCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className={`group flex flex-col border-t border-line pt-6 ${className}`}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl tracking-[-0.03em] text-ink">
          {product.name}
        </h3>
        <span className="figure text-[11px] text-[#6b6b6b]">
          {FAMILY_LABEL[product.family] ?? product.family}
        </span>
      </div>

      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#5c5c5c]">
        {product.tagline}
      </p>

      {/* Fixed aspect so the six cards line up, and every diagram keeps the
          same mm-per-pixel scale. A short fixture genuinely occupies less of
          its frame than a tall one. That is the comparison. */}
      <div className="mt-6 aspect-[5/4] bg-gallery-dim p-3 transition-colors duration-500 group-hover:bg-[#e4e4df]">
        <FixtureDiagram
          slug={product.slug}
          className="h-full w-full text-ink"
        />
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <dt className="text-[11px] text-[#6b6b6b]">Output</dt>
          <dd className="figure mt-1 text-[13px] text-ink">
            {compactFigure(product.lumens)} lm
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-[#6b6b6b]">Load</dt>
          <dd className="figure mt-1 text-[13px] text-ink">
            {compactFigure(product.watts)} W
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-[#6b6b6b]">Beam</dt>
          <dd className="figure mt-1 text-[13px] text-ink">
            {compactBeam(product.beamAngle)}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
