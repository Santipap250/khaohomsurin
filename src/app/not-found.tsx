import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ไม่พบหน้าที่ต้องการ",
  description: "ไม่พบหน้าหรือสินค้าที่คุณกำลังค้นหา กลับไปดูข้อมูลสินค้าและเรื่องราวของข้าวหอมสุรินทร์ได้จากหน้าแรก",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <h1 className="font-serif-th text-4xl text-forest">ไม่พบหน้าที่ต้องการ</h1>
      <p className="mt-4 text-ink/80">ลิงก์อาจพิมพ์ผิดหรือหน้านี้ถูกย้ายแล้ว</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/" variant="forest">
          กลับหน้าแรก
        </ButtonLink>
        <ButtonLink href="/products" variant="ghostDark">
          ดูสินค้า
        </ButtonLink>
      </div>
    </section>
  );
}
