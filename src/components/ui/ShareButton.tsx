"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { copyText } from "@/lib/order";

export function ShareButton({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed: fall back to copying the link
      }
    }
    if (await copyText(url)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }
  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-earth/40 px-4 text-sm font-medium text-earth transition hover:bg-ivory-deep"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? "คัดลอกลิงก์แล้ว" : "แชร์สินค้า"}</span>
    </button>
  );
}
