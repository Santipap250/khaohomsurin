import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/story", "/quality", "/faq", "/contact", "/order-process", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
