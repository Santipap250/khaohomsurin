import { products } from "@/data/products";
import type { CartItem } from "@/types";
import { formatPrice } from "./format";

export type OrderLine = {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  weightLabel: string | null;
  unitPrice: number | null;
  qty: number;
  slug: string;
};

export type OrderCustomerDetails = {
  name: string;
  address: string;
  phone: string;
  instructions: string;
};

/** Join cart items with product data. Items whose product no longer exists are dropped. */
export function resolveLines(items: CartItem[]): OrderLine[] {
  return items.flatMap((item) => {
    const product = products.find((p) => p.slug === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    if (!product || !variant) return [];
    return [
      {
        productId: product.slug,
        variantId: variant.id,
        name: product.name,
        variantLabel: variant.label,
        weightLabel: variant.weightLabel,
        unitPrice: variant.price,
        qty: item.qty,
        slug: product.slug,
      },
    ];
  });
}

export function totals(lines: OrderLine[]) {
  const priced = lines.filter((l) => l.unitPrice !== null);
  const sum = priced.reduce((n, l) => n + (l.unitPrice ?? 0) * l.qty, 0);
  return { sum, hasUnpriced: priced.length < lines.length, allUnpriced: priced.length === 0 };
}

export function buildOrderMessage(
  lines: OrderLine[],
  siteName: string,
  customer: OrderCustomerDetails = { name: "", address: "", phone: "", instructions: "" },
): string {
  const rows = lines.map((l, i) => {
    const size = l.weightLabel ?? l.variantLabel;
    const price = l.unitPrice === null ? "ราคา: ขอสอบถามร้าน" : `${formatPrice(l.unitPrice * l.qty)}`;
    return `${i + 1}. ${l.name} (${size}) x ${l.qty} — ${price}`;
  });
  const t = totals(lines);
  const total = t.allUnpriced
    ? "ยอดรวม: ขอสอบถามราคาจากร้าน"
    : `ยอดรวมที่ระบุราคาแล้ว: ${formatPrice(t.sum)}${t.hasUnpriced ? " (ยังมีรายการที่ขอสอบถามราคา)" : ""}`;
  return [
    `สวัสดีครับ/ค่ะ ต้องการสั่งซื้อจากเว็บไซต์ ${siteName}`,
    "",
    ...rows,
    "",
    total,
    "",
    `ชื่อผู้รับ: ${customer.name}`,
    `ที่อยู่จัดส่ง: ${customer.address}`,
    `เบอร์โทร: ${customer.phone}`,
    `คำแนะนำเพิ่มเติม: ${customer.instructions}`,
  ].join("\n");
}

/** Copy text with the Clipboard API, falling back to a hidden textarea. Returns success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy method
  }
  let fallbackArea: HTMLTextAreaElement | null = null;
  try {
    const ta = document.createElement("textarea");
    fallbackArea = ta;
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    return ok;
  } catch {
    return false;
  } finally {
    fallbackArea?.remove();
  }
}
