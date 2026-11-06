import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/layout/PageHead";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "เรื่องราวของเรา",
  description: "เรื่องราวของข้าวหอมสุรินทร์ ใต้ฉลากบุญยังข้าวหอม",
  alternates: { canonical: "/story" },
};

const chapters = [
  {
    img: "/images/brand/label-crop.jpg",
    alt: "ฉลากสติกเกอร์จริง บุญยังข้าวหอม ข้าว สุรินทร์",
    round: true,
    title: "ชื่อที่อยู่บนฉลาก",
    body: `ฉลากกลมสีเขียวทองลายรวงข้าวเขียนว่า “${site.labelBrand}” และระบุแหล่งที่มาว่า “${site.labelDescriptor}” นี่คือสิ่งที่ลูกค้าจะเห็นเมื่อได้รับสินค้า`,
    pending: null,
  },
  {
    img: "/images/products/rice-grains-macro.jpg",
    alt: "ภาพใกล้เมล็ดข้าวในถ้วยไม้",
    round: false,
    title: "ผืนดินสุรินทร์",
    body: "จังหวัดสุรินทร์คือแหล่งที่มาที่ระบุบนฉลาก ข้อมูลพื้นที่เพาะปลูก ฤดูกาล และผู้ปลูกยังไม่ถูกยืนยัน จึงยังไม่เล่าในหน้านี้",
    pending: "เรื่องราวการปลูกและเกษตรกร",
  },
  {
    img: "/images/products/boonyang-rice-lifestyle.jpg",
    alt: "แพ็กข้าวบุญยังข้าวหอมวางบนพื้นหินพร้อมรวงข้าว",
    round: false,
    title: "จากแปลงสู่แพ็ก",
    body: "ข้าวบรรจุในแพ็กใสสี่เหลี่ยม ติดสติกเกอร์ฉลากหนึ่งดวง ให้เห็นเมล็ดข้าวจริงตั้งแต่ก่อนเปิดแพ็ก",
    pending: "กระบวนการผลิตและการบรรจุ",
  },
  {
    img: "/images/products/boonyang-rice-pack.jpg",
    alt: "แพ็กข้าวบนโต๊ะไม้ข้างช้อนเมล็ดข้าว",
    round: false,
    title: "ถึงโต๊ะอาหาร",
    body: "สั่งผ่าน LINE ร้านยืนยันรายการและแจ้งรายละเอียดการชำระเงินกับการจัดส่งโดยตรงกับลูกค้า",
    pending: "คุณค่าของสินค้าและชุมชน",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHead title="เรื่องราวของเรา" intro="เล่าเฉพาะสิ่งที่ยืนยันได้ ส่วนที่รอข้อมูลมีป้ายกำกับ" crumbs={[{ label: "เรื่องราว" }]} />
      {chapters.map((c, i) => (
        <section key={c.title} className={i % 2 ? "bg-ivory-deep" : "bg-ivory"}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-0">
            <div className={`lg:py-16 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="lg:sticky lg:top-24">
                <div
                  className={`relative mx-auto w-full overflow-hidden ${
                    c.round ? "aspect-square max-w-md rounded-full ring-4 ring-gold/70 ring-offset-8 ring-offset-ivory" : "aspect-[4/5] max-w-lg rounded-[2rem]"
                  }`}
                >
                  <Image src={c.img} alt={c.alt} fill sizes="(min-width: 1024px) 32rem, 90vw" className="object-cover" />
                </div>
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
