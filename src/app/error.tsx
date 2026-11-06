"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <h1 className="font-serif-th text-4xl text-forest">เกิดข้อผิดพลาดบางอย่าง</h1>
      <p className="mt-4 text-ink/80">ลองโหลดหน้านี้อีกครั้ง หากยังไม่หายให้กลับไปหน้าแรก</p>
      <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-full bg-forest px-7 font-semibold text-ivory">
        ลองอีกครั้ง
      </button>
    </section>
  );
}
