import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/layout/PageHead";
import { ButtonLink } from "@/components/ui/Button";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "เรื่องราวข้าวปะกาอำปึล | ข้าวดอกมะขามสุรินทร์",
  description:
    "รู้จักข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นเมืองสุรินทร์ พร้อมที่มา ชื่อเรียก และแหล่งข้อมูลที่ตรวจสอบได้",
  alternates: { canonical: "/story" },
};

type Chapter = {
  img: string;
  alt: string;
  title: string;
  body: string;
  note: string;
  video?: { src: string; poster: string; label: string };
};

const chapters: Chapter[] = [
  {
    img: "/images/products/rice-grains-macro.jpg",
    alt: "ภาพประกอบเมล็ดข้าวทั่วไป ไม่ใช่ภาพยืนยันลักษณะพันธุ์ปะกาอำปึล",
    video: {
      src: "/videos/rice-macro.mp4",
      poster: "/videos/rice-macro-poster.jpg",
      label: "วิดีโอภาพใกล้เมล็ดข้าวทั่วไป ใช้ประกอบเรื่องราว ไม่ใช่ภาพยืนยันพันธุ์",
    },
    title: "ชื่อที่เล่าถึงดอกมะขาม",
    body:
      "กรมการข้าวใช้ชื่อ “ปะกาอำปึล” ส่วนแหล่งข้อมูลท้องถิ่นพบการเขียน “ปกาอำปึล” และ “ผกาอำปึล” ด้วย แหล่งอ้างอิงแปลชื่อนี้ว่า “ดอกมะขาม” และอธิบายว่าสีบนเปลือกเมื่อข้าวสุกแก่เป็นที่มาของชื่อ จึงเป็นที่รู้จักอีกชื่อว่า “ข้าวดอกมะขาม”",
    note: "ภาพและวิดีโอเป็นภาพประกอบ ไม่ได้ยืนยันสีหรือรูปลักษณ์ของเมล็ดพันธุ์ในล็อตสินค้า",
  },
  {
    img: "/images/products/boonyang-rice-lifestyle.jpg",
    alt: "ภาพจัดวางแพ็กข้าวเพื่อประกอบเรื่องราว ไม่ใช่หลักฐานของแปลงปลูก",
    title: "ข้าวพื้นเมืองจากแนวชายแดน",
    body:
      "ข้อมูลที่อ้างกรมการข้าวระบุปะกาอำปึลเป็นข้าวเจ้าพื้นเมืองของจังหวัดสุรินทร์ และมีถิ่นปลูกตามแนวชายแดนไทย–กัมพูชา โดยกล่าวถึงฝั่งไทยในจังหวัดสุรินทร์และฝั่งกัมพูชาในจังหวัดอุดรมีชัย ข้อมูลระดับภูมิภาคนี้ไม่ได้ระบุว่าแพ็กสินค้าทุกล็อตมาจากแปลงใดโดยเฉพาะ",
    note: "ภาพจัดวางประกอบบรรยากาศ ไม่ใช่หลักฐานยืนยันแหล่งปลูกหรือกระบวนการผลิตของสินค้าล็อตนี้",
  },
  {
    img: "/images/products/rice-grains-macro.jpg",
    alt: "ภาพประกอบเมล็ดข้าวทั่วไป ไม่ได้ยืนยันสายพันธุ์",
    title: "เล่าตามหลักฐาน ไม่เติมตำนาน",
    body:
      "แหล่งข้อมูลที่ตรวจสอบได้อธิบายชื่อพันธุ์และถิ่นปลูกในระดับภูมิภาค แต่ไม่ได้ระบุปีเริ่มปลูกที่แน่นอน บุคคลผู้ริเริ่ม หรือเหตุการณ์กำเนิดพันธุ์ที่ยืนยันได้ เว็บไซต์จึงเล่าเท่าที่มีหลักฐาน และจะไม่แต่งวันกำเนิดหรือเรื่องเล่าชุมชนขึ้นเอง",
    note: "ภาพประกอบทั่วไป ไม่ใช่ภาพเอกสารประวัติศาสตร์หรือภาพหลักฐานการเพาะปลูก",
  },
  {
    img: "/images/products/boonyang-rice-pack.jpg",
    alt: "ภาพแพ็กอ้างอิงของข้าวซ้อมมือปะกาอำปึล; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน",
    title: "ปะกาอำปึลคือพันธุ์ ข้าวซ้อมมือคือลักษณะการสี",
    body:
      "“ปะกาอำปึล” คือชื่อข้าวพื้นเมือง ส่วน “ข้าวซ้อมมือ” บอกวิธีแปรรูป: ตาม Rice Knowledge Bank ของกรมการข้าว การตำข้าวแบบเดิมได้ข้าวที่ผ่านการขัดสีเพียงเล็กน้อย ทั้งสองคำจึงอธิบายคนละเรื่อง สินค้านี้ระบุเป็นข้าวซ้อมมือปะกาอำปึล แต่พื้นที่ปลูกของล็อต ปีเก็บเกี่ยว น้ำหนัก ราคา และการรับรองยังรอยืนยัน",
    note: "ภาพแพ็กอ้างอิงจากไฟล์ที่ได้รับมา; artwork และหมายเลขโทรศัพท์บนสติกเกอร์ยังไม่ยืนยัน",
  },
];

const sources = [
  {
    label: "กรมการข้าว — ข่าวการขับเคลื่อนข้าวปะกาอำปึลสู่สินค้าอัตลักษณ์/GI (เมษายน 2569)",
    href: "https://brm-rsc.ricethailand.go.th/page/68360",
  },
  {
    label: "เทคโนโลยีชาวบ้าน/ข่าวสด — ข้าวปะกาอำปึล ข้าวพื้นถิ่นเมืองสุรินทร์; ระบุกรมการข้าวเป็นแหล่งข้อมูล",
    href: "https://www.khaosod.co.th/technologychaoban/techno-news/article_278379",
  },
  {
    label: "มูลนิธิเกษตรกรรมยั่งยืน (ประเทศไทย) — ข้าวเจ้าปกาอำปึล; อ้างหนังสือสถาบันวิจัยสังคม จุฬาฯ",
    href: "https://sathai.org/?p=554",
  },
  {
    label: "กรมการข้าว, Rice Knowledge Bank — เครื่องสีข้าวและความหมายของข้าวซ้อมมือ",
    href: "https://rkb.ricethailand.go.th/web/content_page.php?code=A-6H4Z7Z47LK",
  },
  {
    label: "Kammapana et al. (2023), Walailak Journal — ลักษณะทางกายภาพและองค์ประกอบของข้าวพื้นเมืองสุรินทร์ (DOI)",
    href: "https://doi.org/10.48048/tis.2023.4566",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHead
        title="ข้าวปะกาอำปึล หรือข้าวดอกมะขาม"
        intro="เรื่องราวของข้าวซ้อมมือจากข้าวเจ้าพื้นเมืองสุรินทร์ เล่าจากแหล่งข้อมูลที่ตรวจสอบได้ พร้อมบอกส่วนที่หลักฐานยังไม่ตอบ"
        crumbs={[{ label: "เรื่องราว" }]}
      />
      {chapters.map((chapter, index) => (
        <section key={chapter.title} className={index % 2 ? "bg-ivory-deep" : "bg-ivory"}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-0">
            <div className={`lg:py-16 ${index % 2 ? "lg:order-2" : ""}`}>
              <div className="lg:sticky lg:top-24">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[2rem]">
                  {chapter.video ? (
                    <LoopVideo
                      src={chapter.video.src}
                      poster={chapter.video.poster}
                      label={chapter.video.label}
                      className="absolute inset-0"
                    />
                  ) : (
                    <Image
                      src={chapter.img}
                      alt={chapter.alt}
                      fill
                      sizes="(min-width: 1024px) 32rem, 90vw"
                      className="object-cover"
                    />
                  )}
                </div>
                {!chapter.video && <p className="mt-2 text-sm leading-relaxed text-earth">{chapter.note}</p>}
              </div>
            </div>
            <Reveal className="flex flex-col justify-center lg:min-h-[85vh]">
              <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">{chapter.title}</h2>
              <p className="mt-5 max-w-lg text-lg text-ink/85">{chapter.body}</p>
              {chapter.video && <p className="mt-4 max-w-lg text-sm text-earth">{chapter.note}</p>}
            </Reveal>
          </div>
        </section>
      ))}
      <section className="bg-ivory-deep py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-serif-th text-3xl text-forest">แหล่งข้อมูลอ้างอิง</h2>
          <p className="mt-3 text-ink/80">
            ใช้ยืนยันชื่อพันธุ์ ถิ่นปลูก และความหมายของคำว่า “ข้าวซ้อมมือ” งานวิจัยเรื่ององค์ประกอบเป็นผลจากตัวอย่างที่เก็บในพื้นที่และปีที่ระบุ ไม่ใช่ผลตรวจของสินค้าล็อตนี้
          </p>
          <ul className="mt-6 space-y-3">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest underline underline-offset-4"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-forest py-16 text-center text-ivory">
        <ButtonLink href="/products">ดูข้อมูลสินค้า</ButtonLink>
      </section>
    </>
  );
}
