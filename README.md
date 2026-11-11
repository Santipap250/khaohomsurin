# ข้าวหอมสุรินทร์ · KHAO HOM SURIN

เว็บไซต์ข้อมูลและจำหน่าย **ข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม)** ข้าวเจ้าพื้นเมืองสุรินทร์ ใต้ฉลากอ้างอิง **บุญยังข้าวหอม** — Next.js (App Router) + TypeScript strict + Tailwind CSS v4 + Motion

## Project Overview
- ชื่อเว็บไซต์: ข้าวหอมสุรินทร์ / KHAO HOM SURIN
- ชื่อบนฉลากอ้างอิงเดิม: บุญยังข้าวหอม; ในภาพมีข้อความ “ข้าว สุรินทร์” และหมายเลขโทรศัพท์เก่าที่ไม่ยืนยันว่าเป็นเบอร์ติดต่อปัจจุบัน
- `public/images/brand/label-reference.jpg` และ `label-crop.jpg` เป็นไฟล์อ้างอิงเดิม ห้ามแก้ทับหรือใช้หมายเลขที่พิมพ์ในภาพเป็นช่องทางติดต่อโดยไม่ยืนยัน
- `public/images/brand/logo.png` เป็นแบบ artwork ที่ยังไม่ได้รับการยืนยัน ไม่ใช้แสดงเป็นโลโก้ทางการ; ข้อมูล Boonyung Group และเบอร์ติดต่อในแบบนั้นยังไม่ยืนยัน ส่วนชื่อพันธุ์ข้าวปะกาอำปึลอ้างอิงตามแหล่งข้อมูลที่ลิงก์ไว้ในหน้าเรื่องราว

## Features
หน้า: หน้าแรก, สินค้า (ค้นหา/กรองหมวดหมู่), รายละเอียดสินค้า (แกลเลอรี, จำนวน, แชร์), ตะกร้า, เรื่องราว, คุณภาพ, คำถามที่พบบ่อย, ติดต่อ, 404, error, loading
ระบบ: ตะกร้า (Local Storage), ข้อความคำขอสั่งซื้อที่ผู้ใช้คัดลอกและส่งเอง (เปิด LINE แยกเฉพาะเมื่อมี URL ที่ถูกต้อง), เมนูมือถือ, Back to top, Scroll progress, Accordion, `prefers-reduced-motion`
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
เบอร์ติดต่อและช่องทาง LINE ปัจจุบันยังรอเจ้าของแบรนด์ยืนยัน ระบบจึงไม่แสดงเบอร์หรือลิงก์โทรศัพท์ เบอร์ที่เห็นในภาพฉลากเป็นเพียงข้อมูลพิมพ์ในภาพ ไม่ใช่ช่องทางติดต่อที่ยืนยันแล้ว

## Product Configuration — `src/data/products.ts`
เพิ่ม/แก้สินค้า ขนาด (`variants`) ราคา (`price`) และรูป ที่ไฟล์นี้ไฟล์เดียว `null` = ยังไม่ยืนยัน แสดงป้าย “รอข้อมูล” รีวิวลูกค้าอยู่ที่ `src/data/reviews.ts` (เว้นว่างจนกว่าจะมีรีวิวจริงที่ได้รับอนุญาต) คำถามที่พบบ่อยอยู่ที่ `src/data/faq.ts`

## ข้อมูลอะไรเก็บที่ไหน
- เก็บในเบราว์เซอร์ผู้ใช้เท่านั้น: ตะกร้าสินค้า (Local Storage)
- ไม่มี Backend: ไม่มีการบันทึกคำสั่งซื้อ ไม่มีระบบชำระเงิน การสั่งซื้อคือคัดลอกข้อความแล้วส่งทาง LINE
- ถ้าต้องการฐานข้อมูลคำสั่งซื้อหรือชำระเงิน ต้องต่อระบบภายนอกเพิ่ม

## ภาพ
`public/images/brand/label-reference.jpg` และ `label-crop.jpg` คือฉลากอ้างอิงเดิมที่เก็บไว้ไม่แก้ไข `public/images/brand/logo.png` เป็น artwork concept ที่ยังไม่อนุมัติและไม่แสดงเป็นโลโก้ปัจจุบัน `public/images/products/boonyang-rice-pack.jpg` เป็นภาพแพ็กอ้างอิงของสินค้าที่ระบุเป็นข้าวซ้อมมือปะกาอำปึล; ภาพ lifestyle ภาพเมล็ดข้าวและวิดีโอเป็นภาพประกอบ ไม่ใช่หลักฐานยืนยันแปลงปลูกหรือกระบวนการผลิตของแต่ละล็อต

## แหล่งข้อมูลเนื้อหาข้าวปะกาอำปึล
- [กรมการข้าว: การขับเคลื่อนข้าวปะกาอำปึลสู่สินค้าอัตลักษณ์/GI](https://brm-rsc.ricethailand.go.th/page/68360)
- [เทคโนโลยีชาวบ้าน/ข่าวสด: ข้าวปะกาอำปึล ข้าวพื้นถิ่นเมืองสุรินทร์](https://www.khaosod.co.th/technologychaoban/techno-news/article_278379)
- [มูลนิธิเกษตรกรรมยั่งยืน: ข้าวเจ้าปกาอำปึล](https://sathai.org/?p=554)
- [กรมการข้าว Rice Knowledge Bank: เครื่องสีข้าวและข้าวซ้อมมือ](https://rkb.ricethailand.go.th/web/content_page.php?code=A-6H4Z7Z47LK)
- [งานวิจัยข้าวพื้นเมืองสุรินทร์, Walailak Journal (2023)](https://doi.org/10.48048/tis.2023.4566)

ไม่พบหลักฐานยืนยันปีเริ่มปลูก ผู้ริเริ่มพันธุ์ หรือการรับรองแปลง/ผลิตภัณฑ์ล็อตนี้ จึงไม่ใส่ปีหรือเรื่องกำเนิดที่ไม่มีหลักฐาน; ชนิดและระดับการสีระบุไว้ใน `src/data/products.ts` ส่วนพื้นที่ปลูกของล็อต ราคาน้ำหนัก และมาตรฐานยังเป็นข้อมูลรอยืนยัน

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
