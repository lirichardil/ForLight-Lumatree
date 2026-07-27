import type { Metadata } from "next";
import ProductGrid from "@/components/product-grid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Lumatree",
  description: "The full Lumatree lighting fixture series.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="px-6 pb-24 pt-36 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          The series
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl italic leading-snug sm:text-5xl">
          Six fixtures, one idea: soft light, shaped like growth.
        </h1>

        <div className="mt-16">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
