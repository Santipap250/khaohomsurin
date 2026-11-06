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
type CustomerDetails = {
  name: string;
  address: string;
  phone: string;
  instructions: string;
};

const fieldClass = "mt-1 w-full rounded-xl border border-ivory/20 bg-ivory px-3 py-2.5 text-ink placeholder:text-earth/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function CartView() {
  const { items, hydrated, setQty, remove, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", address: "", phone: "", instructions: "" });
  const [messageEdit, setMessageEdit] = useState<string | null>(null);
  const lines = useMemo(() => resolveLines(items), [items]);
  const t = totals(lines);
  const generatedMessage = useMemo(() => buildOrderMessage(lines, site.name, customer), [lines, customer]);
  const message = messageEdit ?? generatedMessage;
  const lineUrl = isLineUrl(site.contact.lineUrl) ? site.contact.lineUrl : null;

  function updateCustomer(field: keyof CustomerDetails, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
    setMessageEdit(null);
    setStatus("idle");
  }

  async function onCopy() {
    const ok = await copyText(message);
    setStatus(ok ? "copied" : "copy-failed");
  }

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
                  onChange={(n) => {
                    setQty(l.productId, l.variantId, n);
                    setMessageEdit(null);
                  }}
                />
                <button
                  type="button"
                  aria-label={`ลบ ${l.name} ออกจากตะกร้า`}
                  onClick={() => {
                    remove(l.productId, l.variantId);
                    setMessageEdit(null);
                  }}
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

        <fieldset className="mt-6 space-y-3">
          <legend className="font-serif-th text-lg text-gold-soft">รายละเอียดสำหรับจัดส่ง</legend>
          <label className="block text-sm" htmlFor="customer-name">
            ชื่อผู้รับ
            <input id="customer-name" autoComplete="name" value={customer.name} onChange={(e) => updateCustomer("name", e.target.value)} className={fieldClass} placeholder="ชื่อและนามสกุล" />
          </label>
          <label className="block text-sm" htmlFor="customer-address">
            ที่อยู่จัดส่ง
            <textarea id="customer-address" autoComplete="street-address" value={customer.address} onChange={(e) => updateCustomer("address", e.target.value)} className={fieldClass} rows={3} placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด และรหัสไปรษณีย์" />
          </label>
          <label className="block text-sm" htmlFor="customer-phone">
            เบอร์โทรติดต่อ
            <input id="customer-phone" type="tel" autoComplete="tel" inputMode="tel" value={customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} className={fieldClass} placeholder="เบอร์โทรศัพท์" />
          </label>
          <label className="block text-sm" htmlFor="delivery-instructions">
            คำแนะนำเพิ่มเติม (ถ้ามี)
            <textarea id="delivery-instructions" value={customer.instructions} onChange={(e) => updateCustomer("instructions", e.target.value)} className={fieldClass} rows={2} placeholder="เช่น ช่วงเวลาที่สะดวกรับของ" />
          </label>
        </fieldset>

        <div className="mt-6 flex flex-col gap-3">
          <button type="button" onClick={onCopy} className={buttonClass("gold", "w-full")}>
            คัดลอกข้อความสั่งซื้อ
          </button>
          {lineUrl ? (
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("ghostLight", "w-full")}>
              เปิด LINE เพื่อส่งข้อความ
            </a>
          ) : (
            <p role="alert" className="rounded-2xl border border-gold/60 bg-gold/10 p-4 text-sm text-gold-soft">
              ยังไม่ได้ตั้งค่า LINE Official Account ของร้าน คัดลอกข้อความด้านล่างแล้วส่งให้ร้านผ่านช่องทางติดต่อที่ร้านแจ้ง
            </p>
          )}
        </div>

        <div role="status" aria-live="polite" className="mt-4 text-sm">
          {status === "copied" && <p className="text-gold-soft">คัดลอกข้อความแล้ว ให้นำไปวางในแชต LINE แล้วตรวจสอบข้อมูลก่อนส่ง คำขอจะยังไม่ถึงร้านจนกว่าคุณจะส่งข้อความเอง</p>}
          {status === "copy-failed" && <p className="text-gold-soft">คัดลอกอัตโนมัติไม่สำเร็จ เลือกข้อความด้านล่างแล้วคัดลอกด้วยตนเอง</p>}
        </div>

        <label className="mt-5 block text-sm text-ivory/80" htmlFor="order-text">
          ข้อความสั่งซื้อ (แก้ไขได้ก่อนคัดลอก)
        </label>
        <textarea
          id="order-text"
          value={message}
          onChange={(e) => {
            setMessageEdit(e.target.value);
            setStatus("idle");
          }}
          rows={10}
          className="mt-2 w-full rounded-2xl bg-ivory p-4 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
        <p className="mt-4 text-xs leading-relaxed text-ivory/70">
          นี่คือการส่งคำขอสั่งซื้อ ไม่ใช่การชำระเงิน และยังไม่มีการบันทึกคำสั่งซื้อในระบบ ร้านจะยืนยันยอดและวิธีชำระเงินในแชต
        </p>
      </section>
    </div>
  );
}
