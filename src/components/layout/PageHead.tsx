import Link from "next/link";

export function PageHead({
  title,
  intro,
  crumbs,
}: {
  title: string;
  intro?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="relative overflow-hidden bg-forest-deep text-ivory">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-gold/20 bg-gold/5 blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 lg:pt-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ivory/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold-soft">
                หน้าแรก
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold-soft">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ivory">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold-soft">
          <span className="gold-rule bg-gold" aria-hidden />
          KHAO HOM SURIN
        </div>
        <h1 className="font-serif-th mt-4 max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-8 text-ivory/75 sm:text-lg">{intro}</p>}
      </div>
    </div>
  );
}
