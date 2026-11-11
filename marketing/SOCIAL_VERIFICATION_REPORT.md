# Social sharing verification report

## สถานะก่อนส่งงาน

- Production homepage: `https://khaohomsurin.vercel.app/` ตอบกลับ HTTP 200 และไม่ต้องยืนยันตัวตน
- Metadata ก่อนแก้ไขชี้ไปที่ `khaohomsurin-facebook-og.jpg` เดิม
- ภาพใหม่เป็น Open Graph landscape 1200×630 และไฟล์มีขนาดต่ำกว่า 500 KB

## Metadata ที่แก้ไข

- `og:title`: `ข้าวหอมสุรินทร์ | KHAO HOM SURIN`
- `og:description`: ข้อความแนะนำข้าวซ้อมมือปะกาอำปึลและแบรนด์บุญยังข้าวหอม
- `og:image`: `${site.url}/images/social/khaohomsurin-og-1200x630.jpg`
- `og:image:width`: `1200`
- `og:image:height`: `630`
- `og:image:alt`: KHAO HOM SURIN — ข้าวหอมสุรินทร์ ภายใต้ฉลากบุญยังข้าวหอม
- `og:type`: `website`
- `og:url`: `site.url`
- `twitter:card`: `summary_large_image`
- `twitter:image`: URL เดียวกับ Open Graph

## Facebook Sharing Debugger

ยังไม่ได้กดยืนยันการ refresh cache ผ่าน Facebook Sharing Debugger ในสภาพแวดล้อมนี้ จึงไม่อ้างว่า cache ถูก refresh แล้ว หลัง Preview/Production พร้อมใช้งาน ให้เปิด `https://developers.facebook.com/tools/debug/` แล้ววาง URL homepage จากนั้นกด **Debug** และ **Scrape Again** หากระบบแสดงข้อมูลเก่า

ตรวจสอบให้ครบ: URL หน้าเว็บ, ชื่อ, คำอธิบาย, ภาพ 1200×630, URL ภาพที่เปิดสาธารณะ และไม่มี response 401/403

## Brand asset discrepancy

ตัวเลขโทรศัพท์ที่มองเห็นในสินทรัพย์เดิมไม่ตรงกัน: `label-crop.jpg`/`logo.png` แสดง `0873549653`, `label-reference.jpg` แสดง `0854655139` และภาพแพ็ก `boonyang-rice-pack.jpg` แสดงตัวเลขที่อ่านได้เป็นอีกแบบหนึ่ง จึงไม่นำหมายเลขใดไปใช้ในภาพใหม่หรือข้อความการตลาด และยังคงข้อมูลติดต่อในเว็บไซต์เป็นสถานะรอยืนยัน
