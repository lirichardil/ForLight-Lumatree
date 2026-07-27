"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import ProductCard from "@/components/product-card";
import type { ProductWithGallery } from "@/lib/products";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Pendant", value: "PENDANT" },
  { label: "Chandelier", value: "CHANDELIER" },
  { label: "Sconce", value: "SCONCE" },
  { label: "Floor", value: "FLOOR" },
] as const;

export default function ProductGrid({ products }: { products: ProductWithGallery[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("ALL");

  const visible = useMemo(
    () => (filter === "ALL" ? products : products.filter((p) => p.type === filter)),
    [products, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-canopy/10 pb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={clsx(
              "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
              filter === f.value ? "text-canopy" : "text-canopy/40 hover:text-canopy/70"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-sm text-canopy/50">
          Nothing in this category yet.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
