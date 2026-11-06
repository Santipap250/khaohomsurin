import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faq";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-earth/25 border-y border-earth/25">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-lg font-medium text-forest">
            <span>{f.q}</span>
            <ChevronDown className="faq-icon h-5 w-5 shrink-0 transition-transform" aria-hidden />
          </summary>
          <p className="pb-5 pr-8 text-ink/85">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
