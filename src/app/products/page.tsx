import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ดูข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นถิ่นสุรินทร์ ข้าวใหม่ปีนี้ พร้อมแพ็ก 1, 2 และ 3 กก. และราคาสำหรับสั่งซื้อ",
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
      <PageHead title="สินค้า" intro="ข้าวใหม่ปีนี้: ข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม) จากจังหวัดสุรินทร์ มีแพ็ก 1, 2 และ 3 กก. พร้อมราคาและค่าส่ง" crumbs={[{ label: "สินค้า" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductBrowser products={filterProducts(query, category)} categories={categories} query={query} category={category} />
      </section>
    </>
  );
}
