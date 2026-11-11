import type { Product } from "@/types";
import Link from "next/link";
import { ProductFilterControls } from "./ProductFilterControls";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({
  products,
  categories,
  query = "",
  category = "ทั้งหมด",
}: {
  products: Product[];
  categories: string[];
  query?: string;
  category?: string;
}) {
  return (
    <div>
      <div className="surface-card rounded-[2rem] p-4 sm:p-5">
        <ProductFilterControls key={`${category}:${query}`} categories={categories} query={query} category={category} />
      </div>
      <div className="mt-10 flex items-end justify-between gap-4 border-b border-earth/20 pb-4">
        <div>
          <p className="eyebrow">คัดสรรจากสุรินทร์</p>
          <p className="mt-1 font-serif-th text-2xl text-forest">สินค้าที่พร้อมสั่งซื้อ</p>
        </div>
        <p className="text-sm text-earth" role="status">
          {products.length} รายการ
        </p>
      </div>
      {products.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-earth/40 p-10 text-center">
          <p className="font-serif-th text-xl text-forest">ไม่พบสินค้าที่ตรงกับคำค้นหา</p>
          <Link href="/products" className="mt-4 inline-flex min-h-11 items-center rounded-full border border-forest/40 px-5 text-forest">
            ล้างตัวกรอง
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i === 0} headingLevel={2} />
          ))}
        </div>
      )}
    </div>
  );
}
