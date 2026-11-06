import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/products/AddToCart";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import { faqs } from "@/data/faq";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { priceLabel } from "@/lib/format";
import { FaqList } from "./FaqList";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6";

export function Intro() {
  return (
    <section id="intro" className="bg-ivory py-20 lg:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <Reveal>
          <div className="mx-auto w-full max-w-md drop-shadow-[0_24px_40px_rgba(22,61,44,0.25)]">
            <Logo size={448} className="h-auto w-full" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">ตราที่บอกที่มาของข้าว</h2>
          <p className="mt-5 max-w-xl text-lg text-ink/85">
            “{site.name}” คือชื่อเว็บไซต์นี้ ส่วนบนโลโก้และบรรจุภัณฑ์ใช้ชื่อ “{site.labelBrand}” โดย {site.groupName} ระบุว่า “{site.labelDescriptor}”
          </p>
          <p className="mt-4 max-w-xl text-ink/80">
            โลโก้นี้เป็นไฟล์ที่เจ้าของแบรนด์ส่งมา เว็บไซต์ใช้อย่างที่เป็น ไม่แก้ไขตัวอักษรหรือลวดลาย
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Featured() {
  const p = products[0];
  const v = p.variants[0];
  return (
    <section className="bg-forest py-20 text-ivory lg:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-gold/40">
            <Image
              src={p.images[0].src}
              alt={p.images[0].alt}
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
              style={{ objectPosition: p.images[0].position }}
            />
          </div>
          <div className="absolute -bottom-6 right-4 hidden w-40 overflow-hidden rounded-2xl ring-4 ring-forest sm:block">
            <Image src={p.images[1].src} alt="" width={p.images[1].width} height={p.images[1].height} sizes="10rem" className="aspect-[3/4] object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-gold-soft">สินค้าแนะนำ</p>
          <h2 className="font-serif-th mt-2 text-3xl sm:text-4xl">{p.name}</h2>
          <p className="mt-4 max-w-lg text-ivory/85">{p.description}</p>
          <dl className="mt-6 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-ivory/60">ขนาดบรรจุ</dt>
            <dd>{v.weightLabel ?? <Pending dark>รอกำหนดขนาด</Pending>}</dd>
            <dt className="text-ivory/60">ราคา</dt>
            <dd>{v.price === null ? <Pending dark>รอกำหนดราคา</Pending> : priceLabel(v.price)}</dd>
          </dl>
          <div className="mt-8 rounded-3xl bg-ivory p-5 text-ink">
            <AddToCart product={p} withQuantity />
          </div>
          <Link href={`/products/${p.slug}`} className="mt-5 inline-block text-gold-soft underline underline-offset-4">
            ดูรายละเอียดสินค้า
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const reasons = [
  { t: "เห็นเมล็ดข้าวก่อนสั่ง", d: "บรรจุในแพ็กใส ดูสีและเมล็ดข้าวได้จากภาพถ่ายจริงของสินค้า" },
  { t: "โลโก้ตรงกับของแบรนด์", d: "ใช้ไฟล์โลโก้จากเจ้าของแบรนด์ ไม่วาดใหม่ ไม่แต่งเติมข้อความ" },
  { t: "สั่งตรงกับร้านผ่าน LINE", d: "สรุปรายการให้พร้อมส่ง ร้านเป็นผู้ยืนยันราคา การจัดส่ง และการชำระเงิน" },
];

export function Why() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <Reveal>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">เหตุผลที่เลือกข้าวหอมสุรินทร์</h2>
        </Reveal>
        <ul className="divide-y divide-earth/25 border-y border-earth/25">
          {reasons.map((r, i) => (
            <li key={r.t}>
              <Reveal delay={i * 0.06} className="py-7">
                <h3 className="font-serif-th text-xl text-forest">{r.t}</h3>
                <p className="mt-2 max-w-xl text-ink/80">{r.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Origin() {
  return (
    <section className="overflow-hidden bg-ivory-deep py-20 lg:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <Reveal>
          <p className="text-earth">ที่มาของข้าว</p>
          <h2 className="font-serif-th mt-2 text-3xl text-forest sm:text-4xl">จากผืนดินสุรินทร์</h2>
          <p className="mt-5 max-w-lg text-lg text-ink/85">
            โลโก้ระบุว่า “พื้นเมืองสุรินทร์ ข้าวดอกมะขาม” เรื่องราวของผู้ปลูก พื้นที่เพาะปลูก และฤดูกาลจะเพิ่มในหน้าเรื่องราวเมื่อเจ้าของแบรนด์ยืนยันข้อมูล
          </p>
          <div className="mt-8">
            <ButtonLink href="/story" variant="forest">
              อ่านเรื่องราวของเรา
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <LoopVideo
            src="/videos/rice-macro.mp4"
            poster="/videos/rice-macro-poster.jpg"
            label="วิดีโอภาพใกล้เมล็ดข้าวในถ้วยไม้ เคลื่อนกล้องช้า ๆ"
            className="aspect-[4/5] rounded-[2rem] lg:ml-12"
          />
        </Reveal>
      </div>
    </section>
  );
}

const steps = ["การคัดเลือกวัตถุดิบ", "การผลิต", "การจัดเก็บ", "การบรรจุ", "การส่งมอบสินค้า"];

export function QualityTeaser() {
  return (
    <section className="bg-forest-deep py-20 text-ivory lg:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <Reveal>
          <h2 className="font-serif-th text-3xl sm:text-4xl">คุณภาพและกระบวนการ</h2>
          <p className="mt-4 max-w-md text-ivory/80">
            เราแสดงเฉพาะกระบวนการที่เจ้าของแบรนด์ยืนยันแล้ว ขั้นตอนที่ยังไม่ยืนยันจะมีป้ายกำกับชัดเจน
          </p>
          <div className="mt-8">
            <ButtonLink href="/quality" variant="ghostLight">
              ดูกระบวนการทั้งหมด
            </ButtonLink>
          </div>
        </Reveal>
        <ol className="divide-y divide-ivory/15 border-y border-ivory/15">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center justify-between gap-4 py-5">
              <span className="font-serif-th text-lg">
                {i + 1}. {s}
              </span>
              <Pending dark>รอข้อมูล</Pending>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Showcase() {
  const items = [
    { src: "/images/products/boonyang-rice-pack.jpg", alt: "แพ็กข้าวบุญยังข้าวหอมบนโต๊ะไม้ในแสงธรรมชาติ", w: 768, h: 1376 },
    { src: "/images/products/boonyang-rice-lifestyle.jpg", alt: "แพ็กข้าววางซ้อนกันข้างรวงข้าวและถ้วยเมล็ดข้าว", w: 688, h: 1223 },
    { src: "/images/products/rice-grains-macro.jpg", alt: "เมล็ดข้าวในถ้วยไม้แบบใกล้", w: 768, h: 1376 },
    { src: "/images/products/red-rice-slate.jpg", alt: "เมล็ดข้าวกองบนแผ่นหินชนวนมีรวงข้าววางรอบ", w: 768, h: 1376 },
  ];
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">ภาพจากแพ็กและเมล็ดข้าว</h2>
        </Reveal>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:overflow-visible">
        {items.map((it, i) => (
          <li key={it.src} className={`w-[72%] shrink-0 snap-center sm:w-[44%] lg:w-auto ${i % 2 ? "lg:mt-12" : ""}`}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ivory-deep">
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 22vw, 72vw" className="object-cover transition duration-700 hover:scale-[1.04]" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Cooking() {
  return (
    <section className="bg-forest-deep py-20 text-ivory lg:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20`}>
        <Reveal>
          <h2 className="font-serif-th text-3xl sm:text-4xl">จากแพ็กสู่โต๊ะอาหาร</h2>
          <p className="mt-5 max-w-xl text-lg text-ivory/85">
            ข้าวหนึ่งหม้อคือมื้อธรรมดาที่ทุกบ้านมี คำแนะนำการซาวข้าว อัตราส่วนน้ำ และเวลาหุงที่เหมาะกับข้าวชนิดนี้จะเพิ่มเมื่อเจ้าของแบรนด์ยืนยันข้อมูลแล้ว
          </p>
          <p className="mt-4">
            <Pending dark>วิธีหุงที่แนะนำ: รอข้อมูล</Pending>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <LoopVideo
            src="/videos/steaming-rice.mp4"
            poster="/videos/steaming-rice-poster.jpg"
            label="วิดีโอข้าวสวยร้อน ๆ ในชามเซรามิก มีไอน้ำลอยขึ้น"
            className="mx-auto aspect-[9/14] w-full max-w-sm rounded-[2rem] ring-1 ring-gold/40"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-ivory py-20 lg:py-24">
      <div className={`${wrap} max-w-4xl`}>
        <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">เสียงจากลูกค้า</h2>
        {reviews.length === 0 ? (
          <p className="mt-5 max-w-xl text-ink/80">
            ยังไม่มีรีวิวที่ได้รับอนุญาตให้แสดง เราจะไม่แต่งรีวิวหรือคะแนนขึ้นเอง รีวิวจริงจะปรากฏที่นี่เมื่อลูกค้ายินยอม
          </p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.name}>
                <figure>
                  <blockquote className="font-serif-th text-xl text-forest">{r.text}</blockquote>
                  <figcaption className="mt-2 text-sm text-earth">{r.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function FaqPreview() {
  return (
    <section className="bg-ivory-deep py-20 lg:py-24">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20`}>
        <div>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">คำถามที่พบบ่อย</h2>
          <Link href="/faq" className="mt-4 inline-block text-forest underline underline-offset-4">
            ดูคำถามทั้งหมด
          </Link>
        </div>
        <FaqList items={faqs.slice(0, 3)} />
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-forest py-20 text-center text-ivory lg:py-28">
      <div className={`${wrap} max-w-3xl`}>
        <Reveal>
          <h2 className="font-serif-th text-3xl sm:text-5xl">รับกลิ่นหอมของข้าวสุรินทร์ไปที่บ้านคุณ</h2>
          <p className="mx-auto mt-5 max-w-xl text-ivory/80">เลือกสินค้า สรุปรายการ แล้วส่งคำขอสั่งซื้อให้ร้านทาง LINE</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/products">เลือกชมสินค้า</ButtonLink>
            <ButtonLink href="/contact" variant="ghostLight">
              ช่องทางติดต่อ
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FactStrip() {
  const [area, variety] = site.labelDescriptor.split(" · ");
  const facts = [area, variety, site.groupName, "แพ็กใส เห็นเมล็ดข้าว"];
  return (
    <div className="border-y border-gold/30 bg-ivory-deep">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 text-sm text-forest sm:px-6">
        {facts.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
