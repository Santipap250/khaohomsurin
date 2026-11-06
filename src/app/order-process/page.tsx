import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "ขั้นตอนการสั่งซื้อ",
  description: "วิธีเลือกสินค้า ตรวจข้อความสั่งซื้อ และส่งรายละเอียดให้ร้านด้วยตนเอง",
  alternates: { canonical: "/order-process" },
};

const steps = [
  ["เลือกสินค้า", "เลือกดูสินค้าที่หน้าเว็บและระบุจำนวนที่ต้องการ"],
  ["เพิ่มลงตะกร้า", "สินค้าและจำนวนจะเก็บไว้ใน Local Storage ของเบราว์เซอร์ที่ใช้อยู่"],
  ["กรอกรายละเอียดจัดส่ง", "กรอกชื่อผู้รับ ที่อยู่ เบอร์โทร และคำแนะนำเพิ่มเติมในหน้าตะกร้า ข้อมูลนี้ไม่ได้ส่งเข้า backend ของเว็บไซต์"],
  ["ตรวจข้อความ", "ตรวจและแก้ข้อความสรุปได้ก่อนคัดลอก รวมถึงตรวจรายการ จำนวน และข้อมูลจัดส่ง"],
  ["คัดลอกข้อความ", "กดคัดลอก แล้วตรวจ clipboard ของอุปกรณ์ก่อนนำไปวาง"],
  ["เปิดช่องทางร้านและส่งเอง", "เมื่อเจ้าของตั้งค่าลิงก์ LINE Official Account ที่ยืนยันแล้ว ให้เปิด LINE วางข้อความ และกดส่งด้วยตนเอง ปัจจุบันยังไม่มี LINE URL ที่ตั้งค่าไว้ จึงยังเปิดแชตจากเว็บไซต์ไม่ได้"],
  ["รอร้านยืนยัน", "คำขอจะยังไม่ถึงร้านจนกว่าคุณจะส่งข้อความผ่านช่องทางของร้าน ร้านต้องยืนยันราคา วิธีชำระเงิน และการจัดส่งก่อนถือเป็นคำสั่งซื้อ"],
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
        {!site.contact.lineUrl && (
          <p role="status" className="mt-8 rounded-2xl border border-gold/60 bg-gold/10 p-4 text-ink">
            สถานะปัจจุบัน: รอลิงก์ LINE Official Account ที่เจ้าของแบรนด์ยืนยัน อย่าส่งข้อมูลส่วนบุคคลไปยังลิงก์ที่ไม่ทราบแหล่งที่มา
          </p>
        )}
        <p className="mt-8 text-sm text-earth">ข้อมูลเกี่ยวกับการจัดเก็บและส่งข้อมูล อ่านได้ที่ <Link href="/privacy" className="text-forest underline underline-offset-4">ประกาศความเป็นส่วนตัว</Link></p>
      </section>
    </>
  );
}
