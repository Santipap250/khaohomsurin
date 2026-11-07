import Image from "next/image";
import { site } from "@/config/site";

/** Historical owner-provided label reference; it is not an approved current contact card. */
export function Logo({ size = 44, priority = false, className = "" }: { size?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/images/brand/label-crop.jpg"
      alt={`ภาพอ้างอิงฉลากเดิม ${site.labelBrand}; หมายเลขที่พิมพ์บนฉลากยังไม่ยืนยันว่าเป็นเบอร์ติดต่อปัจจุบัน`}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={`rounded-full object-contain ${className}`}
    />
  );
}
