"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/config/site";
import { useCart } from "@/lib/cart-store";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const mobileNav = [
    ...nav,
    { href: "/cart", label: "ตะกร้าสินค้า" },
    { href: "/order-process", label: "ขั้นตอนการสั่งซื้อ" },
    { href: "/privacy", label: "ประกาศความเป็นส่วนตัว" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-forest-deep/95 text-ivory backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-deep"
      >
        ข้ามไปยังเนื้อหา
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-gold" onClick={() => setOpen(false)} aria-label={`${site.name} หน้าแรก`}>
          <Logo size={44} priority />
          <span className="leading-tight">
            <span className="font-serif-th block text-lg text-ivory">{site.name}</span>
            <span className="block text-[11px] tracking-[0.18em] text-gold-soft">{site.nameEn}</span>
          </span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] transition ${
                    isActive(item.href) ? "bg-gold/15 text-gold-soft" : "text-ivory/85 hover:text-gold-soft"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/cart"
            aria-label={hydrated && count > 0 ? `ตะกร้าสินค้า ${count} ชิ้น` : "ตะกร้าสินค้า"}
            className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-ivory/10"
            onClick={() => setOpen(false)}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {hydrated && count > 0 && (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-semibold text-forest-deep">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-ivory/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-forest-deep px-6 py-8 lg:hidden"
      >
        <nav aria-label="เมนูมือถือ">
          <p className="mb-4 px-4 text-sm tracking-wide text-gold-soft">เมนูเว็บไซต์</p>
          <ul className="space-y-1">
            {mobileNav.map((item, index) => (
              <li key={item.href}>
                {index === nav.length && <div className="mx-4 my-4 border-t border-ivory/15" aria-hidden="true" />}
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-serif-th block rounded-xl px-4 py-4 text-2xl ${
                    isActive(item.href) ? "bg-gold/15 text-gold-soft" : "text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
