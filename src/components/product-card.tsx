import Link from "next/link";
import MediaSlot from "@/components/media-slot";
import type { ProductWithGallery } from "@/lib/products";

export default function ProductCard({ product }: { product: ProductWithGallery }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <MediaSlot
        srcImage={product.heroImage}
        alt={product.name}
        label={product.name}
        tone="light"
        className="shadow-soft transition-shadow duration-500 group-hover:shadow-soft-dark"
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-mist">
            {product.series}
          </p>
          <h3 className="mt-1 font-display text-2xl text-canopy">{product.name}</h3>
          <p className="mt-1 text-sm text-canopy/60">{product.tagline}</p>
        </div>
        <p className="whitespace-nowrap text-[12px] text-canopy/50">
          ⌀ {product.diameterCm}cm
        </p>
      </div>
    </Link>
  );
}
