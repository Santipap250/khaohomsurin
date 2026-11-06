"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Short muted looping video. Loads only when near the viewport, pauses off-screen,
 * stays on the poster for prefers-reduced-motion / Data Saver, and has a pause control.
 */
export function LoopVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // Reduced motion / Data Saver: never autoplay; the viewer can still press play.
    if (reduce || conn?.saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <div className={`relative overflow-hidden bg-forest-deep ${className}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {(
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "หยุดวิดีโอ" : "เล่นวิดีโอ"}
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-forest-deep/70 text-ivory backdrop-blur transition hover:bg-forest-deep"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
        </button>
      )}
    </div>
  );
}
