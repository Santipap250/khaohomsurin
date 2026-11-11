import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { ScrollUi } from "@/components/layout/ScrollUi";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#163d2c", width: "device-width", initialScale: 1 };
const socialImageUrl = `${site.url}/images/social/khaohomsurin-facebook-square.jpg`;
const socialImageAlt = "KHAO HOM SURIN — ข้าวหอมสุรินทร์ ภายใต้ฉลากบุญยังข้าวหอม";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} ${site.nameEn}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    locale: site.locale,
    siteName: site.name,
    title: "ข้าวหอมสุรินทร์ | KHAO HOM SURIN",
    description: "ทำความรู้จักข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม) และเรื่องราวของบุญยังข้าวหอมจากเว็บไซต์ KHAO HOM SURIN",
    images: [{ url: socialImageUrl, width: 1920, height: 1920, type: "image/jpeg", alt: socialImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ข้าวหอมสุรินทร์ | KHAO HOM SURIN",
    description: "ทำความรู้จักข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม) และเรื่องราวของบุญยังข้าวหอมจากเว็บไซต์ KHAO HOM SURIN",
    images: [{ url: socialImageUrl, alt: socialImageAlt }],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: [site.nameEn],
  url: site.url,
  description: site.description,
  ...(site.contact.phone.verified && site.contact.phone.number ? { telephone: site.contact.phone.number } : {}),
  ...(site.contact.email ? { email: site.contact.email } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <Providers>
          <ScrollUi />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
