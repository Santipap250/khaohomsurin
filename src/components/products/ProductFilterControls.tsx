"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function ProductFilterControls({
  categories,
  query,
  category,
}: {
  categories: string[];
  query: string;
  category: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(query);
  const [isPending, startTransition] = useTransition();

  function update(nextCategory: string, nextQuery = text) {
    const params = new URLSearchParams();
    if (nextCategory !== "ทั้งหมด") params.set("category", nextCategory);
    if (nextQuery.trim()) params.set("q", nextQuery.trim().slice(0, 60));
    const suffix = params.toString();
    startTransition(() => router.replace(`${pathname}${suffix ? `?${suffix}` : ""}`));
  }

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${isPending ? "opacity-70" : ""}`}>
      <div role="group" aria-label="กรองตามหมวดหมู่" className="flex flex-wrap gap-2">
        {["ทั้งหมด", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => update(item)}
            className={`min-h-11 rounded-full border px-5 text-sm font-medium transition ${
              category === item ? "border-forest bg-forest text-ivory shadow-[0_8px_18px_rgba(22,61,44,0.16)]" : "border-earth/25 bg-ivory/60 text-earth hover:border-gold hover:bg-gold/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <form
        role="search"
        className="relative block sm:w-72"
        onSubmit={(event) => {
          event.preventDefault();
          update(category);
        }}
      >
        <label htmlFor="product-search" className="sr-only">
          ค้นหาสินค้า
        </label>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-earth" aria-hidden />
        <input
          id="product-search"
          type="search"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="ค้นหาสินค้า"
          maxLength={60}
          className="min-h-11 w-full rounded-full border border-earth/20 bg-ivory/70 pl-11 pr-4 text-base shadow-inner outline-none placeholder:text-earth/60 focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </form>
    </div>
  );
}
