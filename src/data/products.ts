import type { Product } from "@/types";

/**
 * PRODUCT DATA — the single place to add or edit products.
 * --------------------------------------------------------------------
 * - `price: null` and `weightLabel: null` mean "not confirmed yet" and are shown as such.
 * - To add a size: add an entry to `variants` (id must be unique within the product).
 * - To add a product: copy the object below, change `slug`, texts and images.
 * - Put new photos in public/images/products/ and reference them as "/images/products/<file>".
 * Do not enter facts (variety, certification, nutrition, farming method) that are not confirmed.
 */
export const products: Product[] = [
  {
    slug: "boonyang-khao-hom",
    name: "บุญยังข้าวหอม",
    nameEn: "Boonyang Khao Hom — Surin rice",
    category: "ข้าวสาร",
    summary: "ข้าวสุรินทร์บรรจุแพ็กใส ติดฉลากบุญยังข้าวหอม มองเห็นเมล็ดข้าวได้ก่อนตัดสินใจ",
    description:
      "ข้าวสุรินทร์บรรจุแพ็กใสสี่เหลี่ยม ติดสติกเกอร์ฉลาก “บุญยังข้าวหอม” สีเขียวทอง ลูกค้าเห็นเมล็ดข้าวจริงผ่านแพ็กก่อนสั่งซื้อ รายละเอียดชนิดข้าว ขนาดบรรจุและราคาจะแสดงเมื่อเจ้าของแบรนด์ยืนยันข้อมูล",
    images: [
      {
        src: "/images/products/boonyang-rice-pack.jpg",
        alt: "แพ็กข้าวบุญยังข้าวหอมบนโต๊ะไม้ มีช้อนเมล็ดข้าวอยู่ด้านข้าง",
        width: 768,
        height: 1376,
        position: "50% 55%",
      },
      {
        src: "/images/brand/label-crop.jpg",
        alt: "ฉลากสติกเกอร์จริง บุญยังข้าวหอม ข้าว สุรินทร์ ลายรวงข้าวสีทองและใบข้าวสีเขียว",
        width: 620,
        height: 620,
        position: "50% 50%",
      },
    ],
    variants: [{ id: "standard", label: "แพ็กมาตรฐาน", weightLabel: null, price: null }],
    details: [
      { label: "ชื่อบนฉลาก", value: "บุญยังข้าวหอม · ข้าว สุรินทร์" },
      { label: "รูปแบบบรรจุ", value: "แพ็กใส สติกเกอร์ฉลากกลม" },
      { label: "ชนิดข้าว", value: null },
      { label: "น้ำหนักบรรจุ", value: null },
      { label: "ปีที่เก็บเกี่ยว / วันที่บรรจุ", value: null },
      { label: "มาตรฐานหรือการรับรอง", value: null },
    ],
    storage: null,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categories = Array.from(new Set(products.map((p) => p.category)));
