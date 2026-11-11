"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Background video for the hero. The poster image stays underneath (it is the LCP image and the
 * fallback), and the video fades in once it is actually playing.
 * - No autoplay for prefers-reduced-motion or Data Saver (the poster stays; the viewer can press play).
 * - Pauses when the hero is off-screen to save battery, unless the viewer paused it themselves.
 * - Has a visible pause/play control (WCAG 2.2.2).
 */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const blocked = reduce || !!conn?.saveData;
    if (!blocked) v.play().catch(() => {});

    const io = new IntersectionObserver(
      ([entry]) => {
        if (blocked || userPaused.current) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "หยุดวิดีโอพื้นหลัง" : "เล่นวิดีโอพื้นหลัง"}
        className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-forest-deep/70 text-ivory backdrop-blur transition hover:bg-forest-deep"
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      </button>
    </>
  );
}
