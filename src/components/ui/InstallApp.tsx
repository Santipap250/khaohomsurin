"use client";

import { Download, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

function isIosDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("macintosh") && navigator.maxTouchPoints > 1);
}

export function InstallApp() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos] = useState(() => typeof window !== "undefined" && isIosDevice());
  const [installed, setInstalled] = useState(() => typeof window !== "undefined" && isStandalone());
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    navigator.serviceWorker?.register("/sw.js").catch(() => undefined);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || (!installEvent && !isIos)) return null;

  async function handleInstall() {
    if (!installEvent) {
      setShowIosHelp(true);
      return;
    }
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setInstallEvent(null);
  }

  return (
    <div className="mt-5 max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-ivory/10 p-4 backdrop-blur-sm">
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-gold/20 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-forest-deep shadow-lg shadow-black/10">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif-th text-base text-gold-soft">เก็บข้าวหอมสุรินทร์ไว้ใกล้มือ</p>
            <p className="mt-1 text-sm leading-6 text-ivory/75">ติดตั้งเว็บไซต์ไว้บนหน้าจอหลัก เพื่อกลับมาดูสินค้าและสั่งซื้อได้เร็วขึ้น</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="relative mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-forest-deep shadow-lg shadow-black/15 transition hover:bg-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
        >
          {isIos ? <Share2 className="h-4 w-4" aria-hidden /> : <Download className="h-4 w-4" aria-hidden />}
          {isIos ? "เพิ่มไปยังหน้าจอหลัก" : "ติดตั้งเว็บไซต์บนมือถือ"}
        </button>

        {showIosHelp && (
          <div className="relative mt-3 rounded-xl border border-gold/25 bg-black/15 p-3 text-sm leading-6 text-ivory/85" role="dialog" aria-label="วิธีเพิ่มเว็บไซต์ไปยังหน้าจอหลัก">
            <button type="button" onClick={() => setShowIosHelp(false)} className="absolute right-2 top-2 rounded-full p-1 text-ivory/70 hover:bg-ivory/10 hover:text-ivory" aria-label="ปิดคำแนะนำ">
              <X className="h-4 w-4" aria-hidden />
            </button>
            <p className="pr-6"><strong className="text-gold-soft">วิธีติดตั้งบน iPhone/iPad</strong><br />กดปุ่มแชร์ <Share2 className="mx-1 inline h-4 w-4 align-[-2px]" aria-hidden /> แล้วเลือก <strong>เพิ่มไปยังหน้าจอโฮม</strong> จากนั้นกด “เพิ่ม”</p>
          </div>
        )}
      </div>
    </div>
  );
}
