# Marketing asset installation

ไฟล์ภาพใน `marketing/facebook/` ถูกจัดทำจากภาพสินค้าเดิมใน `public/images/products/` และเรนเดอร์เป็นไฟล์ JPG ตามขนาดที่กำหนด โดยไม่มีการสร้างฉลากหรือแพ็กเกจใหม่

1. คัดลอก `marketing/facebook/khaohomsurin-og-1200x630.jpg` ไปยัง `public/images/social/khaohomsurin-og-1200x630.jpg` เพื่อเป็นภาพ Open Graph หลัก
2. ตรวจสอบว่าไฟล์ถูกเสิร์ฟแบบสาธารณะจาก `https://khaohomsurin.vercel.app/images/social/khaohomsurin-og-1200x630.jpg` หลัง deploy
3. ใน `src/app/layout.tsx` metadata ใช้ URL สัมบูรณ์จาก `site.url` และตั้งค่า `og:type`, `og:url`, `og:image`, ขนาดภาพ, alt text, `twitter:card` และ `twitter:image` แล้ว
4. ใช้ไฟล์โพสต์และสตอรี่แยกตามสัดส่วน ไม่ควรนำภาพ Open Graph ไปยืดหรือ crop แทน

ไฟล์ภาพทั้งหมดเป็น JPG และมีขนาดต่ำกว่า 500 KB: Open Graph 1200×630, Feed 1080×1350, Story 1080×1920
