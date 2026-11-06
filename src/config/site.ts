/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------------------------------------------------
 * Owner: edit this file (or set the environment variables in .env.example).
 * - Any value set to `null` is shown on the website as "waiting for setup".
 * - Links set to `null` are NOT rendered, so no broken or fake link is shown.
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
  /** Brand printed on the real product label. Keep it separate from the website brand. */
  labelBrand: "บุญยังข้าวหอม",
  labelDescriptor: "พื้นเมืองสุรินทร์ · ข้าวดอกมะขาม",
  /** Group name printed on the logo */
  groupName: "Boonyung Group",
  tagline: "ความหอมจากผืนดินสุรินทร์",
  description:
    "ข้าวหอมสุรินทร์ ผลิตภัณฑ์ข้าวบรรจุแพ็กใต้ฉลากบุญยังข้าวหอม ดูสินค้า สรุปรายการ และสั่งซื้อผ่าน LINE",
  locale: "th_TH",

  /** Domain: set NEXT_PUBLIC_SITE_URL in Vercel when the real domain is ready. */
  url: (
    fromEnv(process.env.NEXT_PUBLIC_SITE_URL) ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
  ).replace(/\/$/, ""),

  contact: {
    /**
     * Phone number printed on the owner-supplied logo ("ติดต่อ"). Set `verified: false`
     * to show it as plain text with an "unverified" badge instead of a call link.
     */
    phone: { number: "0873549653", verified: true },
    /** Must start with https://line.me/ or https://lin.ee/ — otherwise treated as not configured. */
    lineUrl: fromEnv(process.env.NEXT_PUBLIC_LINE_URL),
    facebookUrl: null as string | null,
    email: null as string | null,
    address: null as string | null,
    /** Google Maps link for the shop / farm */
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
