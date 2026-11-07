import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/config/site";
import { isLineUrl } from "@/lib/format";
import { ContactRows } from "./ContactRows";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3 text-gold">
            <Logo size={64} />
            <div>
              <p className="font-serif-th text-xl text-ivory">{site.name}</p>
              <p className="text-xs tracking-[0.2em] text-gold-soft">{site.nameEn}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-ivory/80">
            {site.tagline} · สินค้าภายใต้ฉลาก “{site.labelBrand}”
          </p>
        </div>
        <nav aria-label="เมนูท้ายเว็บไซต์">
          <p className="font-serif-th text-lg text-gold-soft">เมนู</p>
          <ul className="mt-3 space-y-1">
            {[...nav, { href: "/cart", label: "ตะกร้าสินค้า" }, { href: "/order-process", label: "ขั้นตอนการสั่งซื้อ" }, { href: "/privacy", label: "ประกาศความเป็นส่วนตัว" }].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="inline-block py-1.5 text-ivory/85 hover:text-gold-soft">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-serif-th text-lg text-gold-soft">ติดต่อ</p>
          <ContactRows dark />
        </div>
      </div>
      <div className="border-t border-ivory/10 px-4 py-6 text-center text-sm text-ivory/60 sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name} · เว็บไซต์ไม่มีระบบรับออเดอร์หรือชำระเงินออนไลน์ {isLineUrl(site.contact.lineUrl) ? "ลูกค้าต้องคัดลอกข้อความ เปิด LINE แยกต่างหาก แล้วส่งเอง" : "ลิงก์ LINE รอการยืนยันและตั้งค่า"}
        </p>
      </div>
    </footer>
  );
}
