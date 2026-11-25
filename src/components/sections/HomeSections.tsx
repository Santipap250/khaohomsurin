import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/products/AddToCart";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { LoopVideo } from "@/components/ui/LoopVideo";
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
          <figure className="mx-auto w-full max-w-md drop-shadow-[0_24px_40px_rgba(22,61,44,0.18)]">
            <Image src="/images/brand/label-crop.jpg" alt="ภาพอ้างอิงฉลากเดิมซึ่งมีชื่อบุญยังข้าวหอมและข้อความข้าว สุรินทร์" width={600} height={600} sizes="(min-width: 1024px) 28rem, 90vw" className="h-auto w-full rounded-full" />
            <figcaption className="mt-3 text-center text-sm text-earth">ฉลากอ้างอิงเดิมจากเจ้าของแบรนด์; หมายเลขโทรศัพท์ที่พิมพ์บนภาพยังไม่ยืนยันว่าเป็นช่องทางติดต่อปัจจุบัน</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">ข้าวดอกมะขาม พื้นเมืองสุรินทร์</h2>
          <p className="mt-5 max-w-xl text-lg text-ink/85">
            ข้าวที่นำเสนอคือข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ซึ่งกรมการข้าวและแหล่งอ้างอิงระบุว่าเป็นข้าวเจ้าพื้นเมืองสุรินทร์
          </p>
          <p className="mt-4 max-w-xl text-ink/80">
            “{site.name}” คือชื่อเว็บไซต์ ส่วนฉลากอ้างอิงเดิมใช้ชื่อ “{site.labelBrand}” ข้าวใหม่ปีนี้มีแพ็ก 1, 2 และ 3 กก. พร้อมราคาและค่าส่งตามที่แสดงในหน้าสินค้า
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Featured() {
  const p = products[0];
  return (
    <section className="bg-forest py-20 text-ivory lg:py-28">
      <div className={wrap}>
        <Reveal>
          <p className="eyebrow text-gold-soft">สินค้าแนะนำ</p>
          <h2 className="font-serif-th mt-2 max-w-3xl text-3xl sm:text-4xl">เลือกขนาดที่เหมาะกับคุณ</h2>
          <p className="mt-4 max-w-2xl text-ivory/75">
            {p.name} มีขนาด 1, 2 และ 3 กก. แสดงราคาและค่าส่งตามข้อมูลที่เจ้าของแบรนด์ยืนยัน
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {p.variants.map((variant, index) => (
            <Reveal key={variant.id} delay={index * 0.06}>
              <article className={`flex h-full flex-col rounded-3xl border p-6 ${variant.id === "3kg" ? "border-gold/70 bg-gold/10" : "border-ivory/15 bg-ivory/5"}`}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold tracking-wide text-gold-soft">{variant.id === "3kg" ? "คุ้มที่สุด" : index === 0 ? "เริ่มต้น" : "คุ้มขึ้น"}</span>
                  <span className="rounded-full border border-ivory/20 px-3 py-1 text-ivory/75">{variant.weightLabel ?? <Pending dark>รอกำหนดขนาด</Pending>}</span>
                </div>
                <h3 className="font-serif-th mt-6 text-2xl">แพ็ก {variant.weightLabel ?? variant.label}</h3>
                <p className="mt-3 min-h-12 text-sm leading-7 text-ivory/70">
                  {variant.id === "3kg" ? "ส่งฟรี และเก็บเงินปลายทางไม่บวกเพิ่ม" : variant.id === "2kg" ? "ขนาดกลางสำหรับสั่งใช้ในบ้าน" : "เหมาะสำหรับเริ่มรู้จักข้าวซ้อมมือปะกาอำปึล"}
                </p>
                <p className="mt-6 font-serif-th text-4xl text-ivory">
                  {variant.price === null ? <Pending dark>รอกำหนดราคา</Pending> : priceLabel(variant.price)}
                  <span className="ml-2 font-sans text-sm text-ivory/70">บาท</span>
                </p>
                <p className="mt-1 text-sm text-gold-soft">{variant.shippingFee === 0 ? "ส่งฟรี" : variant.shippingFee === null ? "ค่าส่งรอยืนยัน" : `ค่าส่ง ${variant.shippingFee} บาท`}</p>
                <Link href={`/products/${p.slug}`} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-ivory px-4 py-3 text-center text-sm font-semibold text-forest transition hover:bg-gold-soft">
                  ดูรายละเอียดแพ็กนี้
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-8 rounded-3xl bg-ivory p-5 text-ink sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-serif-th text-xl text-forest">พร้อมเลือกขนาดแล้ว?</h3>
              <p className="mt-1 text-sm text-earth">เลือกแพ็กและจำนวนที่ต้องการ แล้วเพิ่มลงตะกร้าได้จากตรงนี้</p>
            </div>
            <AddToCart product={p} withQuantity />
          </div>
        </Reveal>

        <p className="mt-5 text-sm leading-6 text-ivory/55">
          ราคาตามข้อมูลปัจจุบันของร้าน ควรตรวจสอบยอดรวมและรอบจัดส่งกับร้านก่อนยืนยันคำสั่งซื้อ
        </p>
      </div>
    </section>
  );
}

const reasons = [
  { t: "ชื่อพันธุ์: ปะกาอำปึล", d: "มีชื่อเรียกว่าปกาอำปึล ผกาอำปึล หรือข้าวดอกมะขาม โดยแหล่งข้อมูลแปลชื่อว่า ‘ดอกมะขาม’" },
  { t: "ถิ่นปลูกสุรินทร์", d: "มีข้อมูลระบุการปลูกตามแนวชายแดนไทย–กัมพูชา โดยฝั่งไทยอยู่ในจังหวัดสุรินทร์" },
  { t: "ซ้อมมือคือวิธีสี", d: "คำว่าข้าวซ้อมมือหมายถึงข้าวที่ผ่านการขัดสีเพียงเล็กน้อย ไม่ใช่ชื่อพันธุ์ข้าว" },
];

export function Why() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <Reveal>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">รู้จักข้าวซ้อมมือดอกมะขาม</h2>
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
          <p className="eyebrow">ที่มาของข้าว</p>
          <h2 className="font-serif-th mt-2 text-3xl text-forest sm:text-4xl">ถิ่นปลูกตามแนวชายแดน</h2>
          <p className="mt-5 max-w-lg text-lg text-ink/85">
            แหล่งข้อมูลระบุว่าปะกาอำปึลเป็นข้าวเจ้าพื้นเมืองสุรินทร์ และมีถิ่นปลูกตามแนวชายแดนไทย–กัมพูชา ส่วนแปลงปลูกของสินค้าแต่ละล็อตยังรอยืนยัน
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
          <p className="eyebrow text-gold-soft">ความใส่ใจจากต้นทาง</p>
          <h2 className="font-serif-th mt-3 text-3xl sm:text-4xl">คุณภาพและกระบวนการ</h2>
          <p className="mt-4 max-w-md text-ivory/75">
            ข้าวใหม่จากชาวนาปลูกเองในจังหวัดสุรินทร์ ผ่านการสีแบบซ้อมมือ และแสดงรายละเอียดที่ยืนยันแล้วอย่างตรงไปตรงมา
          </p>
          <div className="mt-8">
            <ButtonLink href="/quality" variant="ghostLight">
              ดูกระบวนการทั้งหมด
            </ButtonLink>
          </div>
        </Reveal>
        <ol className="divide-y divide-ivory/15 border-y border-ivory/15">
          {steps.map((s, i) => {
            const confirmed = i === 0 || i === 1 || i === 3 || i === 4;
            return (
              <li key={s} className="flex items-center justify-between gap-4 py-5">
                <span className="font-serif-th text-lg">
                  {i + 1}. {s}
                </span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${confirmed ? "bg-gold/15 text-gold-soft" : "bg-ivory/10 text-ivory/55"}`}>
                  {confirmed ? "มีข้อมูลแล้ว" : "สอบถามร้าน"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Showcase() {
  const items = [
    { src: "/images/products/boonyang-rice-pack.jpg", alt: "ภาพแพ็กอ้างอิงภายใต้ฉลากบุญยังข้าวหอม; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน", w: 768, h: 1376, note: "ภาพแพ็กอ้างอิงจากไฟล์ที่ได้รับมา; artwork และหมายเลขโทรศัพท์บนสติกเกอร์ยังไม่ยืนยันว่าเป็นโลโก้หรือช่องทางติดต่อปัจจุบัน" },
    { src: "/images/brand/label-crop.jpg", alt: "ภาพอ้างอิงฉลากเดิมบุญยังข้าวหอมและข้อความข้าว สุรินทร์", w: 600, h: 600, note: "ฉลากอ้างอิงเดิม; ข้อมูลติดต่อที่พิมพ์บนภาพไม่ใช่ข้อมูลติดต่อปัจจุบันที่ยืนยันแล้ว" },
    { src: "/images/products/boonyang-rice-lifestyle.jpg", alt: "ภาพจัดวางแพ็กข้าวเชิงบรรยากาศ", w: 688, h: 1223, note: "ภาพจัดวางประกอบบรรยากาศ ไม่ใช่ภาพยืนยันรายละเอียดสินค้า" },
    { src: "/images/products/rice-grains-macro.jpg", alt: "ภาพประกอบเมล็ดข้าวระยะใกล้", w: 768, h: 1376, note: "ภาพประกอบ ไม่ได้ยืนยันชนิดหรือพันธุ์ข้าวของสินค้า" },
  ];
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 className="font-serif-th text-3xl text-forest sm:text-4xl">ภาพแพ็กและภาพประกอบ</h2>
        </Reveal>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:overflow-visible">
        {items.map((it, i) => (
          <li key={it.src} className={`w-[72%] shrink-0 snap-center sm:w-[44%] lg:w-auto ${i % 2 ? "lg:mt-12" : ""}`}>
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ivory-deep">
                <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 22vw, 72vw" className="object-cover transition duration-700 hover:scale-[1.04]" />
              </div>
              <figcaption className="mt-2 text-xs leading-relaxed text-earth">{it.note}</figcaption>
            </figure>
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
          <h2 className="font-serif-th text-3xl sm:text-5xl">ทำความรู้จักข้าวปะกาอำปึล</h2>
          <p className="mx-auto mt-5 max-w-xl text-ivory/80">อ่านที่มาของข้าวดอกมะขามและดูข้อมูลสินค้าที่ระบุไว้ โดยแยกข้อมูลที่ยังรอยืนยันให้ชัดเจน</p>
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
  const facts = [`เว็บไซต์: ${site.name}`, "สินค้า: ข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม)", "แพ็ก 1 กก. 99 บาท + ส่ง 20 บาท · 2 กก. 178 บาท + ส่ง 25 บาท · 3 กก. 270 บาท ส่งฟรี · เก็บเงินปลายทางไม่บวกเพิ่ม", `ฉลากอ้างอิง: ${site.labelBrand}`];
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
