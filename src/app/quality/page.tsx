import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/layout/PageHead";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "คุณภาพและกระบวนการ",
  description: "ขั้นตอนตั้งแต่การคัดเลือกวัตถุดิบถึงการส่งมอบสินค้าข้าวหอมสุรินทร์",
  alternates: { canonical: "/quality" },
};

const steps = [
  { t: "การคัดเลือกวัตถุดิบ", d: "วิธีและเกณฑ์การคัดเลือกข้าวก่อนบรรจุ" },
  { t: "การผลิต", d: "ขั้นตอนการสีและเตรียมข้าว" },
  { t: "การจัดเก็บ", d: "สถานที่และวิธีจัดเก็บก่อนส่งถึงลูกค้า" },
  { t: "การบรรจุ", d: "แพ็กใสพร้อมสติกเกอร์ฉลากบุญยังข้าวหอม (ยืนยันจากภาพสินค้า)" },
  { t: "การส่งมอบสินค้า", d: "วิธีจัดส่งและระยะเวลา" },
];

export default function QualityPage() {
  return (
    <>
      <PageHead
        title="คุณภาพและกระบวนการ"
        intro="เว็บไซต์นี้ไม่อ้างว่าเป็นออร์แกนิก ไม่แสดงเครื่องหมายรับรองหรือ GI จนกว่าเจ้าของแบรนด์จะมีหลักฐานยืนยัน"
        crumbs={[{ label: "คุณภาพ" }]}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <ol className="divide-y divide-earth/25 border-y border-earth/25">
          {steps.map((s, i) => (
            <li key={s.t}>
              <Reveal className="py-7">
                <h2 className="font-serif-th text-2xl text-forest">
                  {i + 1}. {s.t}
                </h2>
                <p className="mt-2 text-ink/80">{s.d}</p>
                {i !== 3 && (
                  <p className="mt-3">
                    <Pending>รอข้อมูลจากเจ้าของแบรนด์</Pending>
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/products/red-rice-slate.jpg"
              alt="เมล็ดข้าวกองบนแผ่นหินชนวนสีเข้มพร้อมรวงข้าว"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
