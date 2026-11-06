"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({ products, categories }: { products: Product[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("ทั้งหมด");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === "ทั้งหมด" || p.category === category;
      const hay = `${p.name} ${p.nameEn} ${p.summary} ${p.category}`.toLowerCase();
      return inCategory && (!q || hay.includes(q));
    });
  }, [products, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="กรองตามหมวดหมู่" className="flex flex-wrap gap-2">
          {["ทั้งหมด", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`min-h-11 rounded-full border px-5 text-sm font-medium transition ${
                category === c ? "border-forest bg-forest text-ivory" : "border-earth/40 text-earth hover:bg-ivory-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">ค้นหาสินค้า</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-earth" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า"
            maxLength={60}
            className="min-h-11 w-full rounded-full border border-earth/40 bg-white/70 pl-11 pr-4 text-base placeholder:text-earth/60"
          />
        </label>
      </div>

      <p className="mt-6 text-sm text-earth" role="status">
        พบ {results.length} รายการ
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-earth/40 p-10 text-center">
          <p className="font-serif-th text-xl text-forest">ไม่พบสินค้าที่ตรงกับคำค้นหา</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("ทั้งหมด");
            }}
            className="mt-4 min-h-11 rounded-full border border-forest/40 px-5 text-forest"
          >
            ล้างตัวกรอง
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-8">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
