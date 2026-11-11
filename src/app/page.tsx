import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import {
  Cooking,
  Featured,
  FactStrip,
  FaqPreview,
  FinalCta,
  Intro,
  Origin,
  QualityTeaser,
  Showcase,
  Testimonials,
  Why,
} from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: { absolute: "ข้าวซ้อมมือปะกาอำปึล ข้าวดอกมะขาม | ข้าวหอมสุรินทร์" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactStrip />
      <Intro />
      <Featured />
      <Why />
      <Origin />
      <QualityTeaser />
      <Showcase />
      <Cooking />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
