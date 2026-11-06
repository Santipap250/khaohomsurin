"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart-store";
import { isLineUrl, priceLabel, formatPrice } from "@/lib/format";
import { buildOrderMessage, copyText, resolveLines, totals } from "@/lib/order";
import { QuantitySelector } from "./QuantitySelector";

type Status = "idle" | "copied" | "copy-failed";

export function CartView() {
  const { items, hydrated, setQty, remove, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const lines = useMemo(() => resolveLines(items), [items]);
  const t = totals(lines);
  const message = useMemo(() => buildOrderMessage(lines, site.name), [lines]);
  const lineUrl = isLineUrl(site.contact.lineUrl) ? site.contact.lineUrl : null;

  if (!hydrated) {
    return (
      <div className="rounded-3xl bg-white/60 p-10 text-center text-earth" role="status">
        กำลังโหลดตะกร้า…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-earth/40 p-12 text-center">
        <p className="font-serif-th text-2xl text-forest">ตะกร้ายังว่างอยู่</p>
        <p className="mt-2 text-earth">เลือกสินค้าแล้วกดเพิ่มลงตะกร้า รายการจะอยู่ที่นี่</p>
        <Link href="/products" className={buttonClass("forest", "mt-6")}>
          ดูสินค้า
        </Link>
      </div>
    );
  }

  async function onOrder() {
    const ok = await copyText(message);
    setStatus(ok ? "copied" : "copy-failed");
    if (lineUrl) window.open(lineUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="cart-items">
        <div className="flex items-center justify-between">
          <h2 id="cart-items" className="font-serif-th text-2xl text-forest">
            รายการสินค้า
          </h2>
          <button type="button" onClick={clear} className="min-h-11 px-2 text-sm text-earth underline underline-offset-4">
            ล้างตะกร้า
          </button>
        </div>
        <ul className="mt-4 divide-y divide-earth/20">
          {lines.map((l) => (
            <li key={`${l.productId}:${l.variantId}`} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div className="min-w-0">
                <Link href={`/products/${l.slug}`} className="font-serif-th text-lg text-forest">
                  {l.name}
                </Link>
                <p className="text-sm text-earth">{l.weightLabel ?? l.variantLabel}</p>
                <p className="mt-1 text-sm">{l.unitPrice === null ? <Pending>รอกำหนดราคา</Pending> : priceLabel(l.unitPrice)}</p>
              </div>
              <div className="flex items-center gap-2">
                <QuantitySelector
                  value={l.qty}
                  label={`จำนวน ${l.name}`}
                  onChange={(n) => setQty(l.productId, l.variantId, n)}
                />
                <button
                  type="button"
                  aria-label={`ลบ ${l.name} ออกจากตะกร้า`}
                  onClick={() => remove(l.productId, l.variantId)}
                  className="grid h-11 w-11 place-items-center rounded-full text-earth hover:bg-ivory-deep"
                >
                  <Trash2 className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-earth">ตะกร้าเก็บในเบราว์เซอร์ของคุณเท่านั้น</p>
      </section>

      <section aria-labelledby="order-summary" className="h-fit rounded-3xl bg-forest p-6 text-ivory sm:p-8">
        <h2 id="order-summary" className="font-serif-th text-2xl text-gold-soft">
          สรุปคำสั่งซื้อ
        </h2>
        <p className="mt-4 flex items-baseline justify-between gap-4">
          <span>ยอดรวม</span>
          <span className="font-serif-th text-2xl">
            {t.allUnpriced ? "ขอสอบถามราคา" : formatPrice(t.sum)}
          </span>
        </p>
        {!t.allUnpriced && t.hasUnpriced && (
          <p className="mt-1 text-sm text-ivory/70">ยอดนี้ยังไม่รวมรายการที่รอกำหนดราคา</p>
        )}

        {!lineUrl && (
          <p role="alert" className="mt-5 rounded-2xl border border-gold/60 bg-gold/10 p-4 text-sm text-gold-soft">
            ยังไม่ได้ตั้งค่า LINE Official Account ของร้าน จึงยังเปิดแชต LINE ให้อัตโนมัติไม่ได้ คัดลอกข้อความด้านล่างแล้วส่งให้ร้านตามช่องทางที่ร้านแจ้ง
          </p>
        )}

        <button type="button" onClick={onOrder} className={buttonClass("gold", "mt-5 w-full")}>
          {lineUrl ? "สั่งซื้อผ่าน LINE" : "คัดลอกข้อความสั่งซื้อ"}
        </button>

        <div role="status" className="mt-4 text-sm">
          {status === "copied" && (
            <p className="text-gold-soft">
              คัดลอกข้อความสั่งซื้อแล้ว {lineUrl ? "เปิดแชต LINE แล้ว กดวางข้อความในแชตและส่งให้ร้าน" : ""}
            </p>
          )}
          {status === "copy-failed" && (
            <p className="text-gold-soft">เครื่องนี้คัดลอกอัตโนมัติไม่ได้ กดค้างที่ข้อความด้านล่างเพื่อเลือกและคัดลอกเอง</p>
          )}
        </div>

        <label className="mt-4 block text-sm text-ivory/80" htmlFor="order-text">
          ข้อความสั่งซื้อ (แก้ชื่อและที่อยู่ก่อนส่งได้)
        </label>
        <textarea
          id="order-text"
          readOnly
          value={message}
          rows={10}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-2 w-full rounded-2xl bg-ivory p-4 text-sm text-ink"
        />
        <p className="mt-4 text-xs leading-relaxed text-ivory/70">
          นี่คือการส่งคำขอสั่งซื้อ ไม่ใช่การชำระเงิน และยังไม่มีการบันทึกคำสั่งซื้อในระบบ ร้านจะยืนยันยอดและวิธีชำระเงินในแชต
        </p>
      </section>
    </div>
  );
}
