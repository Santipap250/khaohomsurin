import Link from "next/link";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_10px_24px_rgba(14,42,30,0.12)] transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-offset-4";
const variants = {
  gold: "bg-gold text-forest-deep hover:bg-gold-soft",
  forest: "bg-forest text-ivory hover:bg-forest-deep",
  ghostLight: "border border-ivory/40 bg-ivory/5 text-ivory hover:border-gold-soft hover:bg-ivory/10",
  ghostDark: "border border-forest/30 bg-white/30 text-forest hover:border-forest hover:bg-white/70",
} as const;

export function ButtonLink({
  href,
  variant = "gold",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: keyof typeof variants = "gold", extra = "") =>
  `${base} ${variants[variant]} ${extra}`;
