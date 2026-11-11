import Image from "next/image";
import Link from "next/link";
import { Pending } from "@/components/ui/Pending";
import { priceLabel } from "@/lib/format";
import type { Product } from "@/types";
import { AddToCart } from "./AddToCart";

export function ProductCard({ product, priority = false, headingLevel = 3 }: { product: Product; priority?: boolean; headingLevel?: 2 | 3 }) {
  const img = product.images[0];
  const v = product.variants[0];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="surface-card group grid overflow-hidden rounded-[2rem] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(22,61,44,0.14)] sm:grid-cols-2">
      <figure>
        <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-ivory-deep" aria-label={`ดูรายละเอียด ${product.name}`}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            style={{ objectPosition: img.position }}
          />
          <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1 text-xs font-semibold text-gold-soft backdrop-blur">ข้าวใหม่ปีนี้</span>
        </Link>
        {img.note && <figcaption className="px-4 pt-2 text-xs leading-relaxed text-earth">{img.note}</figcaption>}
      </figure>
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
        <p className="eyebrow">{product.category}</p>
        <Heading className="font-serif-th text-2xl text-forest">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </Heading>
        <p className="text-ink/80">{product.summary}</p>
        <dl className="text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <dt className="text-earth">ขนาดบรรจุ</dt>
            <dd>{v.weightLabel ?? <Pending>รอกำหนดขนาด</Pending>}</dd>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <dt className="text-earth">ราคา</dt>
            <dd className="font-semibold text-forest">{v.price === null ? <Pending>รอกำหนดราคา</Pending> : `เริ่มต้น ${priceLabel(v.price)}`}</dd>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <dt className="text-earth">จัดส่ง</dt>
            <dd>{v.shippingFee === 0 ? "ฟรีเมื่อสั่งแพ็ก 3 กก." : `เริ่มต้น ${v.shippingFee ?? "รอยืนยัน"} บ.`}</dd>
          </div>
        </dl>
        <AddToCart product={product} />
        <Link href={`/products/${product.slug}`} className="text-sm font-medium text-forest underline underline-offset-4">
          ดูรายละเอียด
        </Link>
      </div>
    </article>
  );
}
