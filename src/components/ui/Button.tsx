import Link from "next/link";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition duration-300 active:scale-[0.97] focus-visible:outline-offset-4";
const variants = {
  gold: "bg-gold text-forest-deep hover:bg-gold-soft",
  forest: "bg-forest text-ivory hover:bg-forest-deep",
  ghostLight: "border border-ivory/50 text-ivory hover:bg-ivory/10",
  ghostDark: "border border-forest/40 text-forest hover:bg-forest/5",
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
