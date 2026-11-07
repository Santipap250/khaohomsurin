import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "คุณภาพและกระบวนการ",
  description: "ข้อมูลคุณภาพและขั้นตอนของสินค้าข้าวหอมสุรินทร์; รายละเอียดที่ยังไม่ยืนยันแสดงเป็นสถานะรอข้อมูล",
  alternates: { canonical: "/quality" },
};

const steps = [
  { t: "การคัดเลือกวัตถุดิบ", d: "วิธีและเกณฑ์การคัดเลือกข้าวก่อนบรรจุ" },
  { t: "การผลิต", d: "ขั้นตอนการสีและเตรียมข้าว" },
  { t: "การจัดเก็บ", d: "สถานที่และวิธีจัดเก็บก่อนส่งถึงลูกค้า" },
  { t: "การบรรจุ", d: "แพ็กใสพร้อมสติกเกอร์โลโก้บุญยังข้าวหอม (ยืนยันจากภาพสินค้า)" },
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
          <LoopVideo
            src="/videos/pouring-rice.mp4"
            poster="/videos/pouring-rice-poster.jpg"
            label="วิดีโอเทเมล็ดข้าวจากถ้วยลงชามบนโต๊ะไม้"
            className="aspect-[4/5] rounded-[2rem]"
          />
        </div>
      </section>
    </>
  );
}
