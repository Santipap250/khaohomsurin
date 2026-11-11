import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ข้าวหอมสุรินทร์ | KHAO HOM SURIN",
    short_name: "ข้าวหอมสุรินทร์",
    description: "ข้าวซ้อมมือปะกาอำปึล ข้าวดอกมะขาม พื้นเมืองสุรินทร์",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f0df",
    theme_color: "#163d2c",
    lang: "th",
    dir: "ltr",
    icons: [
      { src: "/images/pwa/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/images/pwa/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
