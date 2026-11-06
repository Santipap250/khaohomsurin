# ข้าวหอมสุรินทร์ · KHAO HOM SURIN

เว็บไซต์แบรนด์ข้าวสุรินทร์ ใต้ฉลาก **บุญยังข้าวหอม** — Next.js (App Router) + TypeScript strict + Tailwind CSS v4 + Motion

## Project Overview
- ชื่อเว็บไซต์: ข้าวหอมสุรินทร์ / KHAO HOM SURIN
- ชื่อบนฉลากสินค้าจริง: บุญยังข้าวหอม (ข้าว สุรินทร์) — แยกบทบาทกันตลอดทั้งเว็บไซต์
- ใช้ภาพถ่ายจริงที่เจ้าของแบรนด์ให้มา ไม่วาดหรือสร้างฉลากใหม่ SVG ในเว็บไซต์เป็นสัญลักษณ์เสริม ไม่ใช่โลโก้ทางการ

## Features
หน้า: หน้าแรก, สินค้า (ค้นหา/กรองหมวดหมู่), รายละเอียดสินค้า (แกลเลอรี, จำนวน, แชร์), ตะกร้า, เรื่องราว, คุณภาพ, คำถามที่พบบ่อย, ติดต่อ, 404, error, loading
ระบบ: ตะกร้า (Local Storage), สรุปคำสั่งซื้อส่งทาง LINE พร้อมสำรองเมื่อ Clipboard API ใช้ไม่ได้, เมนูมือถือ, Back to top, Scroll progress, Accordion, `prefers-reduced-motion`
SEO: metadata รายหน้า, canonical, Open Graph, Twitter Card, sitemap.xml, robots.txt, JSON-LD (Organization, Product, BreadcrumbList, FAQPage)

## Technology Stack
Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Motion, Lucide React, Zod, next/image, Fontsource (Noto Serif Thai, IBM Plex Sans Thai — โหลดจาก npm ไม่เรียก Google Fonts ตอน build)

## Installation / Development / Build
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment Variables (ไม่บังคับ — ดู `.env.example`)
| ตัวแปร | ใช้ทำอะไร |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | โดเมนจริง (canonical, sitemap, OG) |
| `NEXT_PUBLIC_LINE_URL` | ลิงก์ LINE OA ต้องขึ้นต้น `https://line.me/` หรือ `https://lin.ee/` |

ทั้งสองค่าเป็นค่าสาธารณะ ห้ามใส่ความลับ

## Brand Configuration — `src/config/site.ts`
ชื่อ ฉลาก คำโปรย โดเมน และช่องทางติดต่อทั้งหมดอยู่ที่ไฟล์เดียว ค่าที่เป็น `null` จะแสดง “รอการตั้งค่า” และ **ไม่สร้างลิงก์**
เบอร์ `0854655139` อ่านจากฉลาก ยังไม่ยืนยัน เมื่อเจ้าของยืนยัน ให้เปลี่ยน `verified: true`

## Product Configuration — `src/data/products.ts`
เพิ่ม/แก้สินค้า ขนาด (`variants`) ราคา (`price`) และรูป ที่ไฟล์นี้ไฟล์เดียว `null` = ยังไม่ยืนยัน แสดงป้าย “รอข้อมูล” รีวิวลูกค้าอยู่ที่ `src/data/reviews.ts` (เว้นว่างจนกว่าจะมีรีวิวจริงที่ได้รับอนุญาต) คำถามที่พบบ่อยอยู่ที่ `src/data/faq.ts`

## ข้อมูลอะไรเก็บที่ไหน
- เก็บในเบราว์เซอร์ผู้ใช้เท่านั้น: ตะกร้าสินค้า (Local Storage)
- ไม่มี Backend: ไม่มีการบันทึกคำสั่งซื้อ ไม่มีระบบชำระเงิน การสั่งซื้อคือคัดลอกข้อความแล้วส่งทาง LINE
- ถ้าต้องการฐานข้อมูลคำสั่งซื้อหรือชำระเงิน ต้องต่อระบบภายนอกเพิ่ม

## ภาพ
`public/images/brand/label-reference.jpg` (ภาพสติกเกอร์เต็ม), `label-crop.jpg` (ครอปสติกเกอร์ดวงกลางจากภาพเดียวกัน ไม่ได้ปรับแต่งตัวอักษร) และ `public/images/products/*` ตามเนื้อหาของแต่ละภาพ

## GitHub Upload
```bash
git init
git add .
git commit -m "feat: build Khao Hom Surin website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```
แทน `USERNAME` และ `REPOSITORY` ด้วยของคุณก่อนรัน GitHub Actions (`.github/workflows/ci.yml`) จะ lint, typecheck และ build ทุกครั้งที่ push

## Vercel Deployment
1. สร้าง Repository บน GitHub แล้ว push โปรเจกต์
2. เปิด vercel.com → Add New → Project → Import Git Repository
3. Root Directory: `./` · Framework: Next.js (ตรวจพบอัตโนมัติ) · Build Command: `npm run build`
4. ใส่ Environment Variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_LINE_URL`) ถ้ามี
5. กด Deploy แล้วเปิด Production URL ทดสอบทุกหน้า
6. ตั้งโดเมนจริงที่ Settings → Domains แล้วอัปเดต `NEXT_PUBLIC_SITE_URL` จากนั้น Redeploy

## Troubleshooting
- ปุ่ม LINE ไม่เปิด: ยังไม่ได้ตั้ง `NEXT_PUBLIC_LINE_URL` หรือรูปแบบลิงก์ไม่ถูกต้อง (ระบบจะแสดงคำเตือนและยังคัดลอกข้อความให้)
- canonical เป็น localhost: ยังไม่ได้ตั้ง `NEXT_PUBLIC_SITE_URL`
- เปลี่ยนค่า env แล้วไม่เปลี่ยน: ค่า `NEXT_PUBLIC_*` ฝังตอน build ต้อง Redeploy
- ตะกร้าหาย: ผู้ใช้ล้างข้อมูลเบราว์เซอร์หรือเปลี่ยนเครื่อง
