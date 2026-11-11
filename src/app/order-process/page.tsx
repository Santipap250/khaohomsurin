import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { site } from "@/config/site";
import { isLineUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "ขั้นตอนการสั่งซื้อ",
  description: "วิธีเลือกแพ็กข้าว ตรวจยอด กรอกข้อมูลจัดส่ง และส่งคำสั่งซื้อให้ร้านผ่าน LINE ด้วยตนเอง",
  alternates: { canonical: "/order-process" },
};

const steps = [
  ["เลือกสินค้าและแพ็ก", "เลือกข้าวใหม่ปีนี้ตามแพ็กที่ต้องการ: 1 กก. ราคา 99 บาท ค่าส่ง 20 บาท, 2 กก. ราคา 178 บาท ค่าส่ง 25 บาท หรือ 3 กก. ราคา 270 บาท ส่งฟรี; เก็บเงินปลายทางไม่บวกเพิ่ม"],
  ["เพิ่มลงตะกร้า", "เลือกจำนวนแล้วกดเพิ่มลงตะกร้า สินค้าและจำนวนจะเก็บไว้ใน Local Storage ของเบราว์เซอร์ที่ใช้อยู่เท่านั้น"],
  ["กรอกรายละเอียดจัดส่ง", "กรอกชื่อผู้รับ ที่อยู่จัดส่ง เบอร์โทร และคำแนะนำเพิ่มเติมในหน้าตะกร้า ข้อมูลนี้ไม่ได้ถูกส่งเข้า backend ของเว็บไซต์"],
  ["ตรวจรายการและยอดรวม", "ตรวจแพ็ก จำนวน ยอดสินค้า ค่าส่ง และยอดรวมสุทธิให้ถูกต้องก่อนส่งข้อความ โดยแพ็ก 3 กก. จะแสดงค่าส่งฟรี"],
  ["คัดลอกข้อความสั่งซื้อ", "กดคัดลอกข้อความ แล้วตรวจ clipboard ของอุปกรณ์ก่อนนำไปวางในช่องทางติดต่อของร้าน"],
  ["เปิด LINE และส่งเอง", isLineUrl(site.contact.lineUrl) ? "กดเปิด LINE ซึ่งแยกจากปุ่มคัดลอก วางข้อความ และกดส่งด้วยตนเอง การเปิด LINE เพียงอย่างเดียวยังไม่ส่งคำขอให้ร้าน" : "ใช้เฉพาะช่องทางที่เจ้าของแบรนด์ยืนยัน วางข้อความและกดส่งด้วยตนเอง"],
  ["รอร้านยืนยัน", "คำขอจะยังไม่ถึงร้านจนกว่าคุณจะส่งข้อความ ร้านจะยืนยันรายการ ที่อยู่ ยอด วิธีชำระเงิน และรายละเอียดจัดส่งก่อนถือเป็นคำสั่งซื้อ"],
] as const;

export default function OrderProcessPage() {
  return (
    <>
      <PageHead
        title="ขั้นตอนการสั่งซื้อ"
        intro="เว็บไซต์ช่วยจัดเตรียมข้อความสั่งซื้อเท่านั้น ไม่มีระบบรับออเดอร์หรือชำระเงินออนไลน์ ลูกค้าตรวจข้อมูลแล้วส่งให้ร้านด้วยตนเอง"
        crumbs={[{ label: "ขั้นตอนการสั่งซื้อ" }]}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
        <div>
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
        </div>

        <aside className="h-fit rounded-3xl bg-forest p-6 text-ivory sm:p-8 lg:sticky lg:top-24">
          <p className="text-sm tracking-wide text-gold-soft">เช็กลิสต์ก่อนส่ง</p>
          <h2 className="font-serif-th mt-2 text-2xl text-gold-soft">ตรวจให้ครบในครั้งเดียว</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-ivory/85">
            <li>ชื่อผู้รับและเบอร์โทรสะกดถูกต้อง</li>
            <li>ที่อยู่มีบ้านเลขที่ ตำบล อำเภอ จังหวัด และรหัสไปรษณีย์</li>
            <li>เลือกแพ็กและจำนวนถูกต้อง</li>
            <li>ตรวจค่าส่งและยอดรวมสุทธิแล้ว</li>
            <li>ส่งข้อความผ่าน LINE แล้วรอร้านยืนยัน</li>
          </ul>
          <div className="mt-6 border-t border-ivory/15 pt-5 text-sm text-ivory/75">
            <p>ช่องทางติดต่อร้าน</p>
            <p className="mt-2 text-gold-soft">LINE: bom_is_happiness</p>
            <p className="mt-1">โทรศัพท์: {site.contact.phone.number}</p>
            <p className="mt-1 break-all">อีเมล: {site.contact.email}</p>
            {site.contact.facebookUrl && (
              <p className="mt-1">
                <ExternalLink href={site.contact.facebookUrl} className="text-gold-soft underline underline-offset-4">
                  เปิดเพจ Facebook
                </ExternalLink>
              </p>
            )}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
        <div className="rounded-3xl border border-earth/25 bg-ivory-deep p-6 sm:p-8">
          <h2 className="font-serif-th text-2xl text-forest">หมายเหตุสำคัญ</h2>
          <p className="mt-3 leading-relaxed text-ink/80">
            เว็บไซต์นี้ไม่มีฐานข้อมูลคำสั่งซื้อและไม่มีการชำระเงินออนไลน์ การกดคัดลอกหรือเปิด LINE ยังไม่ถือว่าเป็นการสั่งซื้อ
            คำสั่งซื้อจะเริ่มเมื่อคุณส่งข้อความให้ร้านและร้านยืนยันรายการ ยอด วิธีชำระเงิน และการจัดส่งแล้ว
          </p>
          <p className="mt-4 text-sm text-earth">อ่านรายละเอียดการเก็บข้อมูลได้ที่ <Link href="/privacy" className="text-forest underline underline-offset-4">ประกาศความเป็นส่วนตัว</Link></p>
        </div>
      </section>
    </>
  );
}
