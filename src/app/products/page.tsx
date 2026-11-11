import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ดูข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นเมืองสุรินทร์ พร้อมข้อมูลสินค้าและสถานะรายละเอียดที่รอยืนยัน",
  alternates: { canonical: "/products" },
};

function filterProducts(query: string, category: string) {
  const q = query.trim().toLowerCase();
  return products.filter((product) => {
    const inCategory = category === "ทั้งหมด" || product.category === category;
    const haystack = `${product.name} ${product.nameEn} ${product.summary} ${product.category}`.toLowerCase();
    return inCategory && (!q || haystack.includes(q));
  });
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0, 60) : "";
  const category = typeof params.category === "string" && categories.includes(params.category) ? params.category : "ทั้งหมด";
  return (
    <>
      <PageHead title="สินค้า" intro="สินค้าปัจจุบันคือข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม); ราคา ขนาดบรรจุ และพื้นที่ปลูกของล็อตนี้จะแสดงเมื่อยืนยัน" crumbs={[{ label: "สินค้า" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductBrowser products={filterProducts(query, category)} categories={categories} query={query} category={category} />
      </section>
    </>
  );
}
