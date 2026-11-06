"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyText } from "@/lib/order";

export function CopyButton({ text, label = "คัดลอก", className = "" }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  async function onClick() {
    const ok = await copyText(text);
    setState(ok ? "ok" : "fail");
    window.setTimeout(() => setState("idle"), 2500);
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-current/30 px-4 text-sm font-medium transition hover:bg-black/5 ${className}`}
    >
      {state === "ok" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">
        {state === "ok" ? "คัดลอกแล้ว" : state === "fail" ? "คัดลอกไม่ได้ กรุณาเลือกข้อความเอง" : label}
      </span>
    </button>
  );
}
