"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types";

export function Gallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ivory-deep ring-1 ring-earth/15">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={active === 0}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="object-cover"
          style={{ objectPosition: current.position }}
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="ภาพสินค้า">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                aria-label={`ดูภาพที่ ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`relative block aspect-square w-full overflow-hidden rounded-2xl ring-2 transition ${
                  i === active ? "ring-gold" : "ring-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="10rem" className="object-cover" style={{ objectPosition: img.position }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
