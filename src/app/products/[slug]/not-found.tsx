import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ไม่พบสินค้านี้",
  description: "ไม่พบสินค้าที่คุณกำลังค้นหา กลับไปดูรายการสินค้าและข้อมูลข้าวหอมสุรินทร์ได้จากหน้าเลือกสินค้า",
  robots: { index: false, follow: true },
};

export default function ProductNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <h1 className="font-serif-th text-4xl text-forest">ไม่พบสินค้านี้</h1>
      <p className="mt-4 text-ink/80">สินค้านี้อาจถูกย้ายหรือไม่มีอยู่ในรายการปัจจุบัน</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/products" variant="forest">
          ดูสินค้าทั้งหมด
        </ButtonLink>
        <ButtonLink href="/" variant="ghostDark">
          กลับหน้าแรก
        </ButtonLink>
      </div>
    </section>
  );
}
