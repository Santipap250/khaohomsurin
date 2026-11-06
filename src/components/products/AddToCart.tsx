"use client";

import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { priceLabel } from "@/lib/format";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/types";
import { QuantitySelector } from "./QuantitySelector";

export function AddToCart({ product, withQuantity = false }: { product: Product; withQuantity?: boolean }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  function onAdd() {
    add(product.slug, variant.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="space-y-4">
      {product.variants.length > 1 && (
        <fieldset>
          <legend className="mb-2 text-sm text-earth">เลือกขนาดบรรจุ</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label key={v.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`variant-${product.slug}`}
                  className="peer sr-only"
                  checked={v.id === variantId}
                  onChange={() => setVariantId(v.id)}
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-earth/40 px-4 text-sm peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-gold">
                  {v.weightLabel ?? v.label} · {priceLabel(v.price)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {withQuantity && <QuantitySelector value={qty} onChange={setQty} />}
        <button type="button" onClick={onAdd} className={buttonClass("forest")}>
          {added ? <Check className="h-5 w-5" aria-hidden /> : <ShoppingBag className="h-5 w-5" aria-hidden />}
          {added ? "เพิ่มแล้ว" : "เพิ่มลงตะกร้า"}
        </button>
        {added && (
          <Link href="/cart" className="text-sm font-medium text-forest underline underline-offset-4">
            ไปที่ตะกร้า
          </Link>
        )}
      </div>
      <p className="sr-only" role="status">
        {added ? `เพิ่ม ${product.name} จำนวน ${qty} ลงตะกร้าแล้ว` : ""}
      </p>
    </div>
  );
}
