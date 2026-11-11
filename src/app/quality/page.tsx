import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "คุณภาพและกระบวนการ",
  description: "ข้อมูลแหล่งที่มา การสี ขนาดบรรจุ และการส่งมอบข้าวซ้อมมือปะกาอำปึลจากจังหวัดสุรินทร์ พร้อมส่วนที่ต้องยืนยันกับร้าน",
  alternates: { canonical: "/quality" },
};

const qualityPoints = [
  {
    title: "แหล่งที่มา",
    description: "ข้าวเจ้าพื้นถิ่นจังหวัดสุรินทร์ โดยชาวนาปลูกเอง",
  },
  {
    title: "ชนิดและการสี",
    description: "ข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม; ข้าวซ้อมมือหมายถึงการสีที่ขัดเพียงเล็กน้อย",
  },
  {
    title: "ความสดใหม่",
    description: "ข้าวใหม่ปีนี้ออกแล้ว พร้อมจำหน่ายในแพ็ก 1 กก., 2 กก. และ 3 กก.",
  },
  {
    title: "ข้อมูลโภชนาการที่แจ้งโดยเจ้าของสินค้า",
    description: "อิ่มเร็ว อิ่มนาน กากใยสูง และมีวิตามินบีและไฟเบอร์สูง ตามข้อมูลที่เจ้าของสินค้าแจ้ง",
  },
];

const processSteps = [
  ["เลือกแพ็กที่ต้องการ", "เลือก 1 กก., 2 กก. หรือ 3 กก. ตามราคาและค่าส่งที่แสดงในหน้าสินค้า"],
  ["เตรียมคำสั่งซื้อ", "เพิ่มสินค้าในตะกร้า กรอกชื่อ ที่อยู่ และเบอร์โทร แล้วตรวจข้อความให้ครบถ้วน"],
  ["ส่งรายละเอียดให้ร้าน", "คัดลอกข้อความ เปิด LINE แยกต่างหาก วางข้อความ และกดส่งด้วยตนเอง"],
  ["ร้านยืนยันก่อนจัดส่ง", "ร้านจะตรวจรายการ ที่อยู่ ยอดรวม และรายละเอียดการจัดส่งก่อนถือเป็นคำสั่งซื้อ"],
] as const;

export default function QualityPage() {
  return (
    <>
      <PageHead
        title="คุณภาพและกระบวนการ"
        intro="ข้าวใหม่ปีนี้จากข้าวเจ้าพื้นถิ่นสุรินทร์ คัดข้อมูลที่ยืนยันแล้วมาแสดงอย่างตรงไปตรงมา และแยกข้อมูลที่ต้องสอบถามร้านออกอย่างชัดเจน"
        crumbs={[{ label: "คุณภาพ" }]}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-wide text-earth">ข้อมูลที่ยืนยันแล้ว</p>
              <h2 className="font-serif-th mt-1 text-3xl text-forest">คุณภาพที่บอกได้จากข้อมูลสินค้า</h2>
            </div>
            <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">ยืนยันแล้ว</span>
          </div>
          <ol className="divide-y divide-earth/25 border-y border-earth/25">
            {qualityPoints.map((point, index) => (
              <li key={point.title}>
                <Reveal className="py-6">
                  <div className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/25 text-sm font-semibold text-forest">{index + 1}</span>
                    <div>
                      <h3 className="font-serif-th text-xl text-forest">{point.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink/80">{point.description}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-3xl border border-earth/25 bg-ivory-deep p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-earth">ข้อมูลที่ยังต้องสอบถามร้าน</p>
            <h2 className="font-serif-th mt-2 text-2xl text-forest">รายละเอียดเฉพาะล็อต</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              มาตรฐานหรือการรับรอง, วันบรรจุ, สถานที่และวิธีจัดเก็บ, รวมถึงระยะเวลาขนส่ง ยังไม่ได้ระบุเป็นข้อมูลยืนยันบนเว็บไซต์
              จึงควรสอบถามร้านผ่าน LINE ก่อนส่งคำสั่งซื้อ และเว็บไซต์จะไม่อ้างว่าเป็นออร์แกนิกหรือมีเครื่องหมายรับรองที่ยังไม่มีหลักฐาน
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LoopVideo
            src="/videos/pouring-rice.mp4"
            poster="/videos/pouring-rice-poster.jpg"
            label="วิดีโอเทเมล็ดข้าวจากถ้วยลงชามบนโต๊ะไม้"
            className="aspect-[4/5] rounded-[2rem]"
          />
          <div className="mt-6 rounded-3xl bg-forest p-6 text-ivory sm:p-8">
            <p className="text-sm tracking-wide text-gold-soft">กระบวนการสั่งซื้อ</p>
            <h2 className="font-serif-th mt-2 text-2xl text-gold-soft">จากหน้าสินค้าถึงร้าน</h2>
            <ol className="mt-5 space-y-4">
              {processSteps.map(([title, description], index) => (
                <li key={title} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-forest">{index + 1}</span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-ivory/70">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
