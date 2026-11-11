# Premium KHAO HOM SURIN Redesign

## User outcome
ยกระดับเว็บไซต์ทั้งหมดให้ดูพรีเมียมแบบมืออาชีพ สวยขึ้นทั้ง desktop และ mobile โดยคงข้อมูลสินค้า ราคา ช่องทางติดต่อ และ customer flow เดิมไว้

## Design options
- **Contemporary Thai provenance editorial** (เลือก, 0.58): แบรนด์ข้าวพื้นถิ่นร่วมสมัยที่เล่าเรื่องแหล่งที่มาอย่างมีรสนิยม ใช้ภาพใหญ่ ตัวอักษร serif ไทย และ surface แบบกระดาษ/ผ้า
- **Quiet luxury apothecary** (0.24): มินิมอลสงบ ใช้พื้นที่ว่างมาก กรอบบาง และรายละเอียดทองแบบหรู
- **Modern farmer market** (0.18): เป็นมิตร เข้าถึงง่าย ใช้การ์ดสีอ่อน ป้ายราคา และจังหวะสนุกขึ้น

## Selected design
**Design movement:** Contemporary Thai provenance editorial — สื่อสารความเป็นข้าวพื้นถิ่นสุรินทร์ผ่านโครงสร้างแบบ editorial luxury ไม่ใช้ความหรูฉูดฉาด

**Core principles:** provenance first, restrained warmth, tactile surfaces, confident conversion.

**Color philosophy:** forest green ทำหน้าที่เป็นสีความน่าเชื่อถือและผืนดิน, ivory เป็นพื้นกระดาษ/ข้าวสาร, gold เป็นแสงแดดและตราคุณค่า, earth brown เป็นหมึกและรายละเอียดข้อมูล.

**Layout paradigm:** ใช้ hero แบบ split editorial, แถบข้อมูลสั้น, section ที่สลับพื้นผิวและการจัดวางแบบ asymmetric; หน้าสินค้าใช้ image-led commerce และ sticky purchase rail บน desktop.

**Signature elements:** เส้นกรอบทองบาง, ป้าย micro-label ตัวพิมพ์เล็ก tracking กว้าง, card มุมโค้งใหญ่พร้อมเงานุ่มและ grain texture เบามาก.

**Interaction philosophy:** ทุก hover/focus ให้ความรู้สึกเหมือนจับวัสดุจริง—ยกขึ้นเล็กน้อย เปลี่ยนแสง ไม่ใช้ motion ที่กระทบ layout; ปุ่มซื้อชัดและไม่แข่งขันกับข้อมูล.

**Animation:** fade/opacity และ scale เล็กน้อยเท่านั้น; preserve reduced-motion behavior; ไม่ใช้ transform ในส่วนที่มีผลต่อ CLS.

**Typography system:** Noto Serif Thai Variable สำหรับ headline/editorial title; IBM Plex Sans Thai สำหรับ UI, ราคา, metadata. H1 ใหญ่แต่กระชับ, body อ่านง่าย 17–18px, labels 11–13px tracking.

**Brand essence:** ข้าวพื้นถิ่นสุรินทร์ที่เล่าเรื่องอย่างจริงใจและสั่งซื้อได้ง่าย; personality: จริงใจ, อบอุ่น, ประณีต.

**Brand voice:** สุภาพ ชัดเจน ไม่กล่าวอ้างเกินหลักฐาน. ตัวอย่าง: “ข้าวใหม่จากสุรินทร์ พร้อมข้อมูลที่บอกได้ตรงไปตรงมา” และ “เลือกแพ็ก ตรวจยอด แล้วส่งรายละเอียดให้ร้านด้วยตนเอง”.

**Wordmark & logo:** ใช้เครื่องหมายวงกลมจากโลโก้แบรนด์เดิมเป็น seal ขนาดเล็กใน header/section label; ไม่สร้าง artwork ใหม่ทับตราที่เจ้าของให้มา.

**Signature brand color:** Forest green `#163d2c` ใช้เป็นสีหลักที่จดจำได้ คู่กับ gold `#c8a13a` แบบไม่มากเกินไป.

## Implementation scope
- Refresh global tokens, background texture, buttons, focus states, cards, section spacing, selection and media treatment.
- Rework header/footer into a clearer editorial shell with better active states and contact hierarchy.
- Upgrade PageHead for premium inner-page hero treatment.
- Upgrade homepage section rhythm and premium product purchase card without changing facts.
- Upgrade product listing/filter/card and product detail purchase rail.
- Add route manifest and project logo declaration required for delivery tooling.

## Project structure
- `src/app/globals.css`: shared tokens, surface utilities and global interaction polish.
- `src/components/layout`: site shell, header, footer, page headings.
- `src/components/sections`: homepage editorial sections.
- `src/components/products`: product cards, filters, purchase controls and detail presentation.
- `public/images`: existing owner/product assets, reused without inventing product claims.
