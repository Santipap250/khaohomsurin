import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { ScrollUi } from "@/components/layout/ScrollUi";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#163d2c", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} ${site.nameEn}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} ${site.nameEn}`,
    description: site.description,
    images: [{ url: "/images/products/boonyang-rice-pack.jpg", width: 768, height: 1376, alt: "ภาพแพ็กอ้างอิงข้าวซ้อมมือปะกาอำปึล; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.nameEn}`,
    description: site.description,
    images: [{ url: "/images/products/boonyang-rice-pack.jpg", alt: "ภาพแพ็กอ้างอิงข้าวซ้อมมือปะกาอำปึล; artwork และข้อมูลติดต่อบนสติกเกอร์ยังรอยืนยัน" }],
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
