import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { site } from "@/config/site";
import { isLineUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "ขั้นตอนการสั่งซื้อ",
  description: "วิธีเลือกสินค้า ตรวจข้อความสั่งซื้อ และส่งรายละเอียดให้ร้านด้วยตนเอง",
  alternates: { canonical: "/order-process" },
};

const steps = [
  ["เลือกสินค้า", "เลือกแพ็ก 1 กก. ราคา 99 บาท ค่าส่ง 20 บาท, 2 กก. ราคา 178 บาท ค่าส่ง 25 บาท หรือ 3 กก. ราคา 270 บาท ส่งฟรี; เก็บเงินปลายทางไม่บวกเพิ่ม"],
  ["เพิ่มลงตะกร้า", "สินค้าและจำนวนจะเก็บไว้ใน Local Storage ของเบราว์เซอร์ที่ใช้อยู่"],
  ["กรอกรายละเอียดจัดส่ง", "กรอกชื่อผู้รับ ที่อยู่ เบอร์โทร และคำแนะนำเพิ่มเติมในหน้าตะกร้า ข้อมูลนี้ไม่ได้ส่งเข้า backend ของเว็บไซต์"],
  ["ตรวจข้อความ", "ตรวจและแก้ข้อความสรุปได้ก่อนคัดลอก รวมถึงตรวจรายการ จำนวน และข้อมูลจัดส่ง"],
  ["คัดลอกข้อความ", "กดคัดลอก แล้วตรวจ clipboard ของอุปกรณ์ก่อนนำไปวาง"],
  ["เปิดช่องทางร้านและส่งเอง", isLineUrl(site.contact.lineUrl) ? "กดเปิด LINE ซึ่งแยกจากปุ่มคัดลอก วางข้อความ และกดส่งด้วยตนเอง การเปิด LINE เพียงอย่างเดียวยังไม่ส่งคำขอให้ร้าน" : "ปัจจุบันยังไม่มีลิงก์ LINE ที่ตั้งค่าไว้ให้เปิดจากเว็บไซต์ ใช้เฉพาะช่องทางที่เจ้าของแบรนด์ยืนยัน วางข้อความและกดส่งด้วยตนเอง"],
  ["รอร้านยืนยัน", "คำขอจะยังไม่ถึงร้านจนกว่าคุณจะส่งข้อความผ่านช่องทางของร้าน ร้านจะยืนยันรายการ ที่อยู่ และรายละเอียดจัดส่งก่อนถือเป็นคำสั่งซื้อ"],
] as const;

export default function OrderProcessPage() {
  return (
    <>
      <PageHead
        title="ขั้นตอนการสั่งซื้อ"
        intro="เว็บไซต์ช่วยจัดเตรียมข้อความเท่านั้น ไม่มีระบบรับออเดอร์หรือชำระเงินออนไลน์"
        crumbs={[{ label: "ขั้นตอนการสั่งซื้อ" }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-7">
          {steps.map(([title, description], index) => (
            <li key={title} className="flex gap-4">
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest font-semibold text-gold-soft">{index + 1}</span>
              <div>
                <h2 className="font-serif-th text-xl text-forest">{title}</h2>
                <p className="mt-1 leading-relaxed text-ink/85">{description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-earth">ข้อมูลเกี่ยวกับการจัดเก็บและส่งข้อมูล อ่านได้ที่ <Link href="/privacy" className="text-forest underline underline-offset-4">ประกาศความเป็นส่วนตัว</Link></p>
      </section>
    </>
  );
}
