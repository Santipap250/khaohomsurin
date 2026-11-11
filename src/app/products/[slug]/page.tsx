import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/layout/PageHead";
import { AddToCart } from "@/components/products/AddToCart";
import { Gallery } from "@/components/products/Gallery";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonClass } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pending } from "@/components/ui/Pending";
import { ShareButton } from "@/components/ui/ShareButton";
import { site } from "@/config/site";
import { getProduct, products } from "@/data/products";
import { priceLabel } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, images: [{ url: p.images[0].src, width: p.images[0].width, height: p.images[0].height, alt: p.images[0].alt }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const v = p.variants[0];
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 2);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    image: [`${site.url}${p.images[0].src}`],
    brand: { "@type": "Brand", name: site.labelBrand },
    category: p.category,
    // Offers are emitted only when the owner has confirmed a real price.
    ...(v.price !== null
      ? { offers: { "@type": "Offer", priceCurrency: "THB", price: v.price, url: `${site.url}/products/${p.slug}` } }
      : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: site.url },
      { "@type": "ListItem", position: 2, name: "สินค้า", item: `${site.url}/products` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/products/${p.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
      <PageHead title={p.name} crumbs={[{ label: "สินค้า", href: "/products" }, { label: p.name }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Gallery images={p.images} />
        <div>
          <p className="text-earth">{p.category}</p>
          <p className="mt-1 text-sm text-earth">{p.nameEn}</p>
          <p className="mt-4 text-lg text-ink/85">{p.description}</p>

          <p className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-sm text-earth">ราคา</span>
            {v.price === null ? <Pending>รอกำหนดราคา</Pending> : <span className="font-serif-th text-3xl text-forest">เริ่มต้น {priceLabel(v.price)}</span>}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-3">
            <span className="text-sm text-earth">ขนาดบรรจุ</span>
            {p.variants.map((variant) => variant.weightLabel).filter(Boolean).join(" · ") || <Pending>รอกำหนดขนาด</Pending>}
          </p>

          <div className="mt-8 rounded-3xl bg-white/70 p-5 ring-1 ring-earth/15">
            <AddToCart product={p} withQuantity />
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/cart" className={buttonClass("gold")}>
                ไปที่ตะกร้า
              </Link>
              <ShareButton title={p.name} path={`/products/${p.slug}`} />
            </div>
          </div>

          <h2 className="font-serif-th mt-10 text-2xl text-forest">ข้อมูลสินค้า</h2>
          <dl className="mt-3 divide-y divide-earth/20 border-y border-earth/20">
            {p.details.map((d) => (
              <div key={d.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[12rem_1fr]">
                <dt className="text-earth">{d.label}</dt>
                <dd>{d.value ?? <Pending />}</dd>
              </div>
            ))}
          </dl>

          <h2 className="font-serif-th mt-10 text-2xl text-forest">คำแนะนำการเก็บรักษา</h2>
          <p className="mt-3">{p.storage ?? <Pending>รอข้อมูลจากเจ้าของแบรนด์</Pending>}</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif-th text-2xl text-forest">สินค้าที่เกี่ยวข้อง</h2>
          <div className="mt-6 grid gap-8">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
