import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/layout/PageHead";
import { isLineUrl } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "เรื่องราวของเรา",
  description: "เรื่องราวของข้าวหอมสุรินทร์ ใต้ชื่อบุญยังข้าวหอม",
  alternates: { canonical: "/story" },
};

type Chapter = { img: string; alt: string; round: boolean; title: string; body: string; pending: string | null; note?: string; video?: { src: string; poster: string; label: string } };
const chapters: Chapter[] = [
  {
    img: "/images/brand/label-crop.jpg",
    alt: "ฉลากอ้างอิงเดิมบุญยังข้าวหอมและข้อความข้าว สุรินทร์; หมายเลขที่พิมพ์ยังไม่ยืนยันว่าใช้ติดต่อปัจจุบัน",
    round: true,
    title: "ฉลากอ้างอิงเดิม",
    body: `ฉลากอ้างอิงที่ได้รับมาระบุชื่อ “${site.labelBrand}” และข้อความ “ข้าว สุรินทร์” ภาพแสดงตามต้นฉบับเพื่ออ้างอิง หมายเลขโทรศัพท์ที่พิมพ์อยู่ยังไม่ยืนยันว่าเป็นช่องทางปัจจุบัน`,
    pending: null,
  },
  {
    img: "/images/products/rice-grains-macro.jpg",
    alt: "ภาพใกล้เมล็ดข้าวในถ้วยไม้",
    video: { src: "/videos/rice-macro.mp4", poster: "/videos/rice-macro-poster.jpg", label: "วิดีโอภาพใกล้เมล็ดข้าวในถ้วยไม้" },
    round: false,
    title: "ผืนดินสุรินทร์",
    body: "ฉลากอ้างอิงเดิมมีข้อความ ‘ข้าว สุรินทร์’ แต่ข้อมูลพื้นที่เพาะปลูก ฤดูกาล และผู้ปลูกยังไม่ยืนยัน จึงยังไม่เล่าเป็นข้อเท็จจริง",
    pending: "เรื่องราวการปลูกและเกษตรกร",
  },
  {
    img: "/images/products/boonyang-rice-lifestyle.jpg",
    alt: "ภาพจัดวางแพ็กข้าวประกอบบรรยากาศ",
    round: false,
    title: "จากแปลงสู่แพ็ก",
    body: "ภาพจัดวางนี้ใช้เพื่อสื่อบรรยากาศเท่านั้น ไม่ใช่หลักฐานยืนยันเมล็ดข้าว บรรจุภัณฑ์จริง หรือขั้นตอนการผลิต",
    pending: "กระบวนการผลิตและการบรรจุ",
    note: "ภาพประกอบบรรยากาศ ไม่ใช่หลักฐานของสินค้าหรือกระบวนการผลิตจริง",
  },
  {
    img: "/images/products/boonyang-rice-pack.jpg",
    alt: "ภาพแพ็กอ้างอิงใต้ฉลากบุญยังข้าวหอม; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน",
    round: false,
    title: "ถึงโต๊ะอาหาร",
    note: "ภาพแพ็กอ้างอิงจากไฟล์ที่ได้รับมา; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอการยืนยัน",
    body: isLineUrl(site.contact.lineUrl) ? "คัดลอกข้อความและเปิด LINE แยกกัน ลูกค้าต้องวางและกดส่งเอง ร้านจะได้รับคำขอหลังจากส่งข้อความแล้ว" : "คัดลอกข้อความได้ แต่ยังไม่มีลิงก์ LINE ที่ตั้งค่าไว้จากร้าน โปรดรอช่องทางที่เจ้าของยืนยันก่อนส่งรายละเอียด ร้านจะยังไม่ได้รับคำขอจนกว่าคุณจะส่งข้อความเอง",
    pending: "คุณค่าของสินค้าและชุมชน",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHead title="เรื่องราวของเรา" intro="เล่าเฉพาะข้อมูลที่ตรวจจากฉลากอ้างอิงและไฟล์ที่ได้รับมา ส่วนเบอร์โทร รายละเอียดสินค้า และกระบวนการที่ยังไม่ยืนยันจะไม่แสดงเป็นข้อเท็จจริง" crumbs={[{ label: "เรื่องราว" }]} />
      {chapters.map((c, i) => (
        <section key={c.title} className={i % 2 ? "bg-ivory-deep" : "bg-ivory"}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-0">
            <div className={`lg:py-16 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="lg:sticky lg:top-24">
                <div
                  className={`relative mx-auto w-full overflow-hidden ${
                    c.round ? "aspect-square max-w-md" : "aspect-[4/5] max-w-lg rounded-[2rem]"
                  }`}
                >
                  {c.video ? (
                    <LoopVideo src={c.video.src} poster={c.video.poster} label={c.video.label} className="absolute inset-0" />
                  ) : (
                    <Image src={c.img} alt={c.alt} fill sizes="(min-width: 1024px) 32rem, 90vw" className={c.round ? "object-contain" : "object-cover"} />
                  )}
                </div>
                {!c.video && c.note && <p className="mt-2 text-sm leading-relaxed text-earth">{c.note}</p>}
              </div>
            </div>
            <Reveal className="flex flex-col justify-center lg:min-h-[85vh]">
              <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">{c.title}</h2>
              <p className="mt-5 max-w-lg text-lg text-ink/85">{c.body}</p>
              {c.pending && (
                <p className="mt-4">
                  <Pending>{c.pending}: รอข้อมูล</Pending>
                </p>
              )}
            </Reveal>
          </div>
        </section>
      ))}
      <section className="bg-forest py-16 text-center text-ivory">
        <ButtonLink href="/products">เลือกชมสินค้า</ButtonLink>
      </section>
    </>
  );
}
