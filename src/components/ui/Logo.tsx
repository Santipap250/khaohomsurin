import Image from "next/image";
import { site } from "@/config/site";

/** The owner-supplied logo (public/images/brand/logo.png). Replace that file to change it everywhere. */
export function Logo({ size = 44, priority = false, className = "" }: { size?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/images/brand/logo.png"
      alt={`โลโก้ ${site.labelBrand} ${site.groupName}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={className}
    />
  );
}
