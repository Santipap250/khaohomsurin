import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { FaqList } from "@/components/sections/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย",
  description: "วิธีสั่งซื้อ ราคา และข้อมูลข้าวซ้อมมือปะกาอำปึลหรือข้าวดอกมะขาม พื้นเมืองสุรินทร์",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <PageHead title="คำถามที่พบบ่อย" crumbs={[{ label: "คำถามที่พบบ่อย" }]} />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FaqList items={faqs} />
      </section>
    </>
  );
}
