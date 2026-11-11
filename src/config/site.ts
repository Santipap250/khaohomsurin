/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------------------------------------------------
 * Owner: edit this file (or set the environment variables in .env.example).
 * - Any value set to `null` is shown on the website as "waiting for setup".
 * - Links set to `null` are NOT rendered, so no broken or unverified link is shown.
 */

const fromEnv = (value: string | undefined): string | null => {
  const v = value?.trim();
  return v ? v : null;
};

const vercelHost = fromEnv(process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const site = {
  /** Website brand */
  name: "ข้าวหอมสุรินทร์",
  nameEn: "KHAO HOM SURIN",
  /** Name printed on the original product-label reference. */
  labelBrand: "บุญยังข้าวหอม",
  /** Neutral description; channel readiness is shown from its actual configuration. */
  tagline: "ข้าวซ้อมมือปะกาอำปึล · ข้าวดอกมะขาม",
  description:
    "ข้าวซ้อมมือปะกาอำปึล หรือข้าวดอกมะขาม ข้าวเจ้าพื้นเมืองสุรินทร์ ดูเรื่องราวและข้อมูลสินค้า; รายละเอียดของแต่ละล็อตที่ยังไม่ยืนยันจะแสดงแยกไว้",
  locale: "th_TH",

  /** Domain: set NEXT_PUBLIC_SITE_URL in Vercel when the real domain is ready. */
  url: (
    fromEnv(process.env.NEXT_PUBLIC_SITE_URL) ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
  ).replace(/\/$/, ""),

  contact: {
    /** Contact details provided by the owner for the current ordering channel. */
    phone: { number: "0854655139", verified: true },
    /** LINE ID: bom_is_happiness, represented as a personal LINE profile URL. */
    lineUrl: "https://line.me/ti/p/~bom_is_happiness",
    facebookUrl: "https://www.facebook.com/profile.php?id=100088032757338",
    email: "Bom-tan@hotmail.com",
    address: null as string | null,
    mapUrl: null as string | null,
    openingHours: null as string | null,
  },
} as const;

export const nav = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "สินค้า" },
  { href: "/story", label: "เรื่องราว" },
  { href: "/quality", label: "คุณภาพ" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
  { href: "/contact", label: "ติดต่อ" },
] as const;
