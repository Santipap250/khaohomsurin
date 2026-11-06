"use client";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function ScrollUi() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gold"
      />
      <button
        type="button"
        aria-label="กลับขึ้นด้านบน"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-forest text-ivory shadow-lg ring-1 ring-gold/50 transition duration-300 hover:bg-forest-deep ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        tabIndex={show ? 0 : -1}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </>
  );
}
