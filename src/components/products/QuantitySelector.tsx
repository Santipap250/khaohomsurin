"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  label = "จำนวน",
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
  min?: number;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-earth/40 bg-white/60">
      <button
        type="button"
        aria-label="ลดจำนวน"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-ivory-deep disabled:opacity-35"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <output aria-live="polite" className="min-w-10 text-center font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label="เพิ่มจำนวน"
        disabled={value >= 99}
        onClick={() => onChange(Math.min(99, value + 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-ivory-deep disabled:opacity-35"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
