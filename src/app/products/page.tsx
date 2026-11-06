import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ดูสินค้าข้าวหอมสุรินทร์ใต้ฉลากบุญยังข้าวหอม ค้นหา กรองหมวดหมู่ และเพิ่มลงตะกร้า",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHead title="สินค้า" intro="สินค้าทั้งหมดแก้ไขได้จากไฟล์ข้อมูลกลาง ราคาและขนาดบรรจุจะแสดงเมื่อเจ้าของแบรนด์ยืนยัน" crumbs={[{ label: "สินค้า" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductBrowser products={products} categories={categories} />
      </section>
    </>
  );
}
