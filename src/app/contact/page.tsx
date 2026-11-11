import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { ContactRows } from "@/components/layout/ContactRows";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ติดต่อและสั่งซื้อ",
  description: "ข้อมูลติดต่อและรายละเอียดการเตรียมคำขอสั่งซื้อข้าวซ้อมมือปะกาอำปึล พร้อมช่องทาง LINE โทรศัพท์ อีเมล และเพจ Facebook ของร้าน",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead title="ติดต่อและสั่งซื้อ" intro="ติดต่อร้านผ่าน LINE โทรศัพท์ อีเมล หรือเพจ Facebook แล้วเตรียมและส่งข้อความสั่งซื้อด้วยตนเอง" crumbs={[{ label: "ติดต่อ" }]} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-earth/15 sm:p-8">
          <ContactRows />
        </div>
        <div>
          <h2 className="font-serif-th text-2xl text-forest">สั่งซื้ออย่างไร</h2>
          <p className="mt-4 text-ink/85">เลือกสินค้า กรอกรายละเอียด ตรวจและคัดลอกข้อความ จากนั้นเปิดช่องทางร้านและส่งด้วยตนเอง การเปิดแชตอย่างเดียวไม่ส่งคำขอให้ร้าน</p>
          <Link href="/order-process" className="mt-3 inline-block text-forest underline underline-offset-4">อ่านขั้นตอนสั่งซื้อทั้งหมด</Link>
          <Link href="/cart" className={buttonClass("forest", "mt-6")}>
            ไปที่ตะกร้า
          </Link>
        </div>
      </section>
    </>
  );
}
