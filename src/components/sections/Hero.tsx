"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { InstallApp } from "@/components/ui/InstallApp";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";

const grains = [
  { left: "8%", d: "19s", delay: "0s", dx: "40px", r: "20deg" },
  { left: "24%", d: "24s", delay: "5s", dx: "-30px", r: "-30deg" },
  { left: "41%", d: "21s", delay: "11s", dx: "50px", r: "60deg" },
  { left: "58%", d: "26s", delay: "3s", dx: "-45px", r: "10deg" },
  { left: "74%", d: "22s", delay: "8s", dx: "30px", r: "-50deg" },
  { left: "90%", d: "25s", delay: "14s", dx: "-35px", r: "35deg" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-forest-deep text-ivory lg:flex-row">
      <div className="relative h-[56svh] shrink-0 lg:absolute lg:inset-0 lg:left-[36%] lg:h-auto lg:[mask-image:linear-gradient(to_right,transparent,#000_38%)]">
        <Image
          src="/videos/hero-bg-poster.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-[50%_55%]"
        />
        <HeroVideo
          src="/videos/hero-bg.mp4"
          poster="/videos/hero-bg-poster.jpg"
          label="วิดีโอแพ็กข้าวบุญยังข้าวหอมวางซ้อนกันบนพื้นหินท่ามกลางรวงข้าวและแสงอุ่น กล้องเคลื่อนช้า ๆ"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[56svh] bg-gradient-to-t from-forest-deep via-transparent to-transparent lg:inset-0 lg:h-auto lg:bg-gradient-to-r lg:from-forest-deep/70 lg:via-transparent lg:to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        {grains.map((g, i) => (
          <span
            key={i}
            className="grain"
            style={{ left: g.left, ["--d" as string]: g.d, ["--delay" as string]: g.delay, ["--dx" as string]: g.dx, ["--r" as string]: g.r }}
          />
        ))}
      </div>

      <div className="relative mx-auto -mt-16 flex w-full max-w-7xl items-end px-4 pb-20 sm:px-6 lg:mt-0 lg:items-center lg:pb-16 lg:pt-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.div variants={item} className="mb-5 hidden lg:block">
            <Logo size={84} />
          </motion.div>
          <motion.p variants={item} className="eyebrow text-gold-soft">
            <span className="gold-rule mr-3 bg-gold" aria-hidden />
            {site.name} · {site.nameEn}
          </motion.p>
          <motion.h1 variants={item} className="font-serif-th mt-4 text-[2.1rem] sm:text-5xl lg:text-6xl">
            ข้าวซ้อมมือปะกาอำปึล
            <span className="mt-2 block text-[1.35rem] text-ivory/90 sm:text-3xl lg:text-4xl">
              ข้าวดอกมะขาม พื้นเมืองสุรินทร์
            </span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-base leading-8 text-ivory/75 sm:text-lg">
            ข้าวใหม่ปีนี้ออกแล้ว ข้าวเจ้าซ้อมมือพื้นถิ่นสุรินทร์ พร้อมแพ็ก 1–3 กก. และโปรโมชั่นส่งฟรีเมื่อสั่ง 3 กก.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2 text-xs font-semibold tracking-wide text-ivory/75">
            <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1.5 text-gold-soft">ชาวนาปลูกเอง</span>
            <span className="rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5">เก็บเงินปลายทางไม่บวกเพิ่ม</span>
          </motion.div>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products">เลือกชมสินค้า</ButtonLink>
            <ButtonLink href="/cart" variant="ghostLight">
              ไปที่ตะกร้า
            </ButtonLink>
          </motion.div>
          <motion.div variants={item}>
            <InstallApp />
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#intro"
        aria-label="เลื่อนลงไปอ่านต่อ"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sm text-ivory/70 sm:flex"
      >
        เลื่อนลง
        <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
          <span className="scroll-cue absolute inset-0 bg-gold" />
        </span>
      </a>
    </section>
  );
}
