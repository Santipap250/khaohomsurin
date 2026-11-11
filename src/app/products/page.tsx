import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ดูข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นเมืองสุรินทร์ พร้อมข้อมูลสินค้าและสถานะรายละเอียดที่รอยืนยัน",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHead title="สินค้า" intro="สินค้าปัจจุบันคือข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม); ราคา ขนาดบรรจุ และพื้นที่ปลูกของล็อตนี้จะแสดงเมื่อยืนยัน" crumbs={[{ label: "สินค้า" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductBrowser products={products} categories={categories} />
      </section>
    </>
  );
}
