"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Short muted looping footage. Autoplay is viewport-gated and disabled for reduced motion / Data Saver. */
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
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const mayAutoplay = !reducedMotion && !connection?.saveData;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (mayAutoplay && !userPaused.current) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
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
      <p className="absolute bottom-3 left-3 max-w-[calc(100%-4.5rem)] rounded-lg bg-forest-deep/75 px-2.5 py-1.5 text-xs leading-relaxed text-ivory shadow backdrop-blur-sm">
        ภาพวิดีโอประกอบบรรยากาศ ไม่ใช่หลักฐานยืนยันกระบวนการผลิตจริง
      </p>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "หยุดวิดีโอ" : "เล่นวิดีโอ"}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-forest-deep/80 text-ivory backdrop-blur transition hover:bg-forest-deep"
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
