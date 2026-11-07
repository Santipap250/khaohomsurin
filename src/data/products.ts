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
    summary: "แพ็กข้าวภายใต้ฉลากบุญยังข้าวหอม รายละเอียดชนิดข้าว ขนาดและราคายังรอการยืนยัน",
    description:
      "ภาพแพ็กและฉลากที่ได้รับมาแสดงเพื่ออ้างอิง ชื่อบนฉลากอ้างอิงคือ “บุญยังข้าวหอม” รายละเอียดชนิดข้าว ขนาดบรรจุ ราคา และข้อมูลติดต่อบนฉลากจะใช้เมื่อเจ้าของแบรนด์ยืนยันแล้ว",
    images: [
      {
        src: "/images/products/boonyang-rice-pack.jpg",
        alt: "ภาพแพ็กอ้างอิงภายใต้ฉลากบุญยังข้าวหอม; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน",
        width: 768,
        height: 1376,
        position: "50% 55%",
        note: "ภาพแพ็กอ้างอิงจากไฟล์ที่ได้รับมา; artwork และหมายเลขโทรศัพท์บนสติกเกอร์ยังไม่ยืนยันว่าเป็นโลโก้หรือช่องทางติดต่อปัจจุบัน",
      },
      {
        src: "/images/brand/label-crop.jpg",
        alt: "ภาพอ้างอิงฉลากดั้งเดิมที่มีชื่อบุญยังข้าวหอมและข้อความข้าว สุรินทร์",
        width: 600,
        height: 600,
        note: "ภาพฉลากอ้างอิงเดิมแสดงตามต้นฉบับ; หมายเลขโทรศัพท์ที่พิมพ์บนฉลากเป็นข้อมูลในภาพ ไม่ยืนยันว่าเป็นเบอร์ติดต่อปัจจุบัน",
      },
    ],
    variants: [{ id: "standard", label: "แพ็กมาตรฐาน", weightLabel: null, price: null }],
    details: [
      { label: "ชื่อบนฉลากอ้างอิง", value: "บุญยังข้าวหอม" },
      { label: "ข้อความบนฉลากอ้างอิง", value: "ข้าว สุรินทร์" },
      { label: "ข้อมูลติดต่อปัจจุบัน", value: null },
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
