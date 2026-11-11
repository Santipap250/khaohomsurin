import type { Product } from "@/types";

/**
 * PRODUCT DATA — the single place to add or edit products.
 * --------------------------------------------------------------------
 * - `price: null`, `weightLabel: null`, and `shippingFee: null` mean "not confirmed yet".
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
      "ข้าวใหม่ปีนี้ออกแล้ว ข้าวซ้อมมือจากข้าวปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นถิ่นจังหวัดสุรินทร์ ชาวนาปลูกเอง อิ่มเร็ว อิ่มนาน กากใยสูง มีวิตามินบีและไฟเบอร์สูง",
    description:
      "ข้าวใหม่ปีนี้ออกแล้ว เป็นข้าวจ้าวซ้อมมือจากข้าวปะกาอำปึล หรือข้าวดอกมะขาม ข้าวพื้นถิ่นจังหวัดสุรินทร์ที่ชาวนาปลูกเอง; ข้าวซ้อมมือหมายถึงการสีที่ขัดเพียงเล็กน้อย และข้อมูลโภชนาการที่แสดงเป็นข้อมูลตามรายละเอียดจากเจ้าของสินค้า",
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
        src: "/images/products/hand-holding-rice.jpg",
        alt: "ภาพประกอบ: มือกำลังโปรยเมล็ดข้าวลงในชามเหนือกองเมล็ดข้าว",
        width: 768,
        height: 1376,
        position: "50% 50%",
        note: "ภาพประกอบบรรยากาศ ไม่ใช่ภาพถ่ายของล็อตสินค้าจริง",
      },
      {
        src: "/images/products/rice-kitchen-prep.jpg",
        alt: "ภาพประกอบ: ตักเมล็ดข้าวในครัว มีถุงกระสอบติดสติกเกอร์อยู่ด้านหลัง",
        width: 768,
        height: 1376,
        position: "50% 55%",
        note: "ภาพประกอบบรรยากาศการเตรียมข้าวในครัว ไม่ใช่ภาพถ่ายของล็อตสินค้าจริง",
      },
      {
        src: "/images/products/farmer-rice-field.jpg",
        alt: "ภาพประกอบ: หญิงชาวนาสวมหมวกสานถือรวงข้าวในทุ่งนายามเช้า",
        width: 768,
        height: 1376,
        position: "50% 40%",
        note: "ภาพประกอบบรรยากาศทุ่งนา ไม่ใช่ภาพของเกษตรกรหรือแปลงปลูกจริงของล็อตนี้",
      },
    ],
    variants: [
      { id: "1kg", label: "แพ็ก 1 กก.", weightLabel: "1 กก.", price: 99, shippingFee: 20 },
      { id: "2kg", label: "แพ็ก 2 กก.", weightLabel: "2 กก.", price: 178, shippingFee: 25 },
      { id: "3kg", label: "แพ็ก 3 กก.", weightLabel: "3 กก.", price: 270, shippingFee: 0 },
    ],
    details: [
      { label: "ชื่อพันธุ์/ชื่อเรียก", value: "ปะกาอำปึล (ปกาอำปึล/ผกาอำปึล; ข้าวดอกมะขาม)" },
      { label: "ชนิดข้าว", value: "ข้าวเจ้า" },
      { label: "ลักษณะการสี", value: "ข้าวซ้อมมือ — ขัดสีเพียงเล็กน้อย" },
      { label: "พื้นที่ปลูก", value: "จังหวัดสุรินทร์; ชาวนาปลูกเอง" },
      { label: "น้ำหนักบรรจุ", value: "1 กก., 2 กก. หรือ 3 กก." },
      { label: "ปีที่เก็บเกี่ยว / วันที่บรรจุ", value: "ข้าวใหม่ ปีนี้ออกแล้ว" },
      { label: "มาตรฐานหรือการรับรอง", value: null },
    ],
    storage: null,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categories = Array.from(new Set(products.map((p) => p.category)));
