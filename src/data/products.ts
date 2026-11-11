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
    // Keep the existing route stable so saved product links and carts keep working.
    slug: "boonyang-khao-hom",
    name: "ข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม)",
    nameEn: "Paka Ampul Hand-Milled Rice — Surin",
    category: "ข้าวซ้อมมือ",
    summary:
      "ข้าวซ้อมมือจากข้าวปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นเมืองสุรินทร์; รายละเอียดแปลงปลูกและข้อมูลจำหน่ายของล็อตนี้ยังรอยืนยัน",
    description:
      "สินค้านี้ระบุเป็นข้าวซ้อมมือจากข้าวปะกาอำปึล (ข้าวดอกมะขาม) ซึ่งเป็นข้าวเจ้าพื้นเมืองสุรินทร์ตามข้อมูลกรมการข้าวและแหล่งอ้างอิงที่ระบุไว้ในหน้าเรื่องราว คำว่า “ข้าวซ้อมมือ” บอกลักษณะการสีที่ขัดเพียงเล็กน้อย ไม่ใช่ชื่อพันธุ์ พื้นที่เพาะปลูกของล็อตนี้ ปีเก็บเกี่ยว น้ำหนัก ราคา และมาตรฐานรับรองยังรอยืนยัน",
    images: [
      {
        src: "/images/products/boonyang-rice-pack.jpg",
        alt: "ภาพแพ็กอ้างอิงของข้าวซ้อมมือปะกาอำปึล; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน",
        width: 768,
        height: 1376,
        position: "50% 55%",
        note: "ภาพแพ็กอ้างอิงจากไฟล์ที่ได้รับมา; artwork และหมายเลขโทรศัพท์บนสติกเกอร์ยังไม่ยืนยันว่าเป็นโลโก้หรือช่องทางติดต่อปัจจุบัน",
      },
      {
        src: "/images/brand/label-crop.jpg",
        alt: "ภาพอ้างอิงฉลากเดิมที่มีชื่อบุญยังข้าวหอมและข้อความข้าว สุรินทร์",
        width: 600,
        height: 600,
        note: "ภาพฉลากอ้างอิงเดิมแสดงตามต้นฉบับ; หมายเลขโทรศัพท์ที่พิมพ์บนฉลากเป็นข้อมูลในภาพ ไม่ยืนยันว่าเป็นเบอร์ติดต่อปัจจุบัน",
      },
    ],
    variants: [{ id: "standard", label: "แพ็กมาตรฐาน", weightLabel: null, price: null }],
    details: [
      { label: "ชื่อพันธุ์/ชื่อเรียก", value: "ปะกาอำปึล (ปกาอำปึล/ผกาอำปึล; ข้าวดอกมะขาม)" },
      { label: "ชนิดข้าว", value: "ข้าวเจ้า" },
      { label: "ลักษณะการสี", value: "ข้าวซ้อมมือ — ขัดสีเพียงเล็กน้อย" },
      { label: "พื้นที่ปลูกของสินค้าล็อตนี้", value: null },
      { label: "น้ำหนักบรรจุ", value: null },
      { label: "ปีที่เก็บเกี่ยว / วันที่บรรจุ", value: null },
      { label: "มาตรฐานหรือการรับรอง", value: null },
    ],
    storage: null,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categories = Array.from(new Set(products.map((p) => p.category)));
