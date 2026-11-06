import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { ContactRows } from "@/components/layout/ContactRows";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ติดต่อและสั่งซื้อ",
  description: "ช่องทางติดต่อและสั่งซื้อข้าวหอมสุรินทร์ผ่าน LINE",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead title="ติดต่อและสั่งซื้อ" intro="ทุกช่องทางดึงจากไฟล์ตั้งค่ากลาง ช่องทางที่ยังไม่ตั้งค่าจะแสดงสถานะรอการตั้งค่า" crumbs={[{ label: "ติดต่อ" }]} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-earth/15 sm:p-8">
          <ContactRows />
        </div>
        <div>
          <h2 className="font-serif-th text-2xl text-forest">สั่งซื้ออย่างไร</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink/85">
            <li>เลือกสินค้าและเพิ่มลงตะกร้า</li>
            <li>ตรวจจำนวนในหน้าตะกร้า</li>
            <li>กดสั่งซื้อผ่าน LINE ระบบคัดลอกข้อความสรุปให้</li>
            <li>วางข้อความในแชต LINE ของร้านและส่ง</li>
          </ol>
          <Link href="/cart" className={buttonClass("forest", "mt-6")}>
            ไปที่ตะกร้า
          </Link>
        </div>
      </section>
    </>
  );
}
