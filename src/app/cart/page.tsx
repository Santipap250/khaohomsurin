import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { CartView } from "@/components/products/CartView";

export const metadata: Metadata = {
  title: "ตะกร้าสินค้า",
  description: "ตรวจรายการและเตรียมข้อความคำขอสั่งซื้อ ข้อมูลจะไม่ถูกส่งไปยังร้านจนกว่าคุณจะส่งด้วยตนเอง",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHead title="ตะกร้าสินค้า" crumbs={[{ label: "ตะกร้าสินค้า" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <CartView />
      </section>
    </>
  );
}
