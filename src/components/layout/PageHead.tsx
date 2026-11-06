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
    <div className="bg-forest text-ivory">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16">
        <nav aria-label="Breadcrumb" className="text-sm text-ivory/70">
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
        <h1 className="font-serif-th mt-6 text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-ivory/80">{intro}</p>}
      </div>
    </div>
  );
}
