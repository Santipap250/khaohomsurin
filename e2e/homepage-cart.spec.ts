import { expect, test } from "@playwright/test";

const CART_STORAGE_KEY = "khs-cart-v1";
const productName = "ข้าวซ้อมมือปะกาอำปึล (ข้าวดอกมะขาม)";

async function resetCart(page: import("@playwright/test").Page) {
  await page.addInitScript((key) => {
    if (!window.sessionStorage.getItem("e2e-cart-reset")) {
      window.localStorage.removeItem(key);
      window.sessionStorage.setItem("e2e-cart-reset", "1");
    }
  }, CART_STORAGE_KEY);
}

function featuredSection(page: import("@playwright/test").Page) {
  return page.locator("section").filter({
    has: page.getByRole("heading", { name: "เลือกขนาดที่เหมาะกับคุณ" }),
  });
}

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await resetCart(page);
    await page.goto("/");
  });

  test("แสดง Hero, Product Grid และราคากับค่าส่งครบถ้วน", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ข้าวซ้อมมือปะกาอำปึล" }),
    ).toBeVisible();
    await expect(page.getByText("ข้าวดอกมะขามจากสุรินทร์")).toBeVisible();

    const section = featuredSection(page);
    await expect(section).toBeVisible();
    await expect(section.locator("article")).toHaveCount(3);
    await expect(section).toContainText("แพ็ก 1 กก.");
    await expect(section).toContainText("฿99");
    await expect(section).toContainText("ค่าส่ง 20 บาท");
    await expect(section).toContainText("แพ็ก 2 กก.");
    await expect(section).toContainText("฿178");
    await expect(section).toContainText("ค่าส่ง 25 บาท");
    await expect(section).toContainText("แพ็ก 3 กก.");
    await expect(section).toContainText("฿270");
    await expect(section).toContainText("ส่งฟรี");
    await expect(section.getByRole("button", { name: "เพิ่มลงตะกร้า" })).toBeVisible();
  });

  test("แสดงเมนูมือถือและไม่เกิด horizontal overflow", async ({ page }) => {
    test.skip(test.info().project.name !== "chromium-mobile", "เมนูมือถือทดสอบใน project มือถือเท่านั้น");
    await expect(page.getByRole("button", { name: "เปิดเมนู" })).toBeVisible();
    await page.getByRole("button", { name: "เปิดเมนู" }).click();
    await expect(page.getByRole("navigation", { name: "เมนูมือถือ" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "เมนูมือถือ" }).getByRole("link", { name: "ตะกร้าสินค้า" }),
    ).toBeVisible();

    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    }));
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewport);
    expect(overflow.bodyWidth).toBeLessThanOrEqual(overflow.viewport);
  });
});

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    await resetCart(page);
    await page.goto("/");
  });

  test("เพิ่มแพ็ก 3 กก. พร้อมจำนวน แล้วคำนวณยอดรวมและค่าส่งฟรี", async ({ page }) => {
    const section = featuredSection(page);
    const threeKg = section.locator("label").filter({ hasText: "3 กก. · ฿270 · ส่งฟรี" }).locator("input");
    await threeKg.check({ force: true });
    await expect(threeKg).toBeChecked();
    const quantity = section.getByRole("group", { name: "จำนวน" });
    await quantity.getByRole("button", { name: "เพิ่มจำนวน" }).click();
    await quantity.getByRole("button", { name: "เพิ่มจำนวน" }).click();
    await expect(quantity.locator("output")).toHaveText("3");

    await section.getByRole("button", { name: "เพิ่มลงตะกร้า" }).click();
    await expect(page.getByText(`เพิ่ม ${productName} จำนวน 3 ลงตะกร้าแล้ว`, { exact: true })).toBeVisible();
    await page.goto("/cart");

    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "รายการสินค้า" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "สรุปคำสั่งซื้อ" })).toBeVisible();
    await expect(page.locator('section[aria-labelledby="cart-items"]').getByText(productName, { exact: true })).toBeVisible();
    await expect(page.locator("output")).toHaveText("3");
    const summary = page.getByRole("region", { name: "สรุปคำสั่งซื้อ" });
    await expect(summary).toContainText("฿810");
    await expect(summary).toContainText("ฟรี");
    await expect(summary.locator("p").filter({ hasText: "ยอดรวมสุทธิ" }).first())
      .toContainText("฿810");
  });

  test("แก้จำนวนสินค้าแล้วอัปเดตยอดรวม และลบสินค้าได้", async ({ page }) => {
    const section = featuredSection(page);
    const threeKg = section.locator("label").filter({ hasText: "3 กก. · ฿270 · ส่งฟรี" }).locator("input");
    await threeKg.check({ force: true });
    await expect(threeKg).toBeChecked();
    await section.getByRole("button", { name: "เพิ่มลงตะกร้า" }).click();
    await page.goto("/cart");

    const cartItems = page.locator('section[aria-labelledby="cart-items"]');
    await expect(cartItems.getByText(productName, { exact: true })).toBeVisible();
    await cartItems.getByRole("button", { name: "เพิ่มจำนวน" }).click();
    await expect(cartItems.locator("output")).toHaveText("2");
    const summary = page.getByRole("region", { name: "สรุปคำสั่งซื้อ" });
    await expect(summary).toContainText("฿540");
    await expect(summary).toContainText("ฟรี");
    await expect(summary).toContainText("ยอดรวมสุทธิ฿540");

    await page.getByRole("button", { name: `ลบ ${productName} ออกจากตะกร้า` }).click();
    await expect(page.getByText("ตะกร้ายังว่างอยู่")).toBeVisible();
    await expect(page.getByRole("link", { name: "ดูสินค้า" })).toBeVisible();
  });

  test("คงสินค้าไว้หลัง reload และล้างตะกร้าได้", async ({ page }) => {
    const section = featuredSection(page);
    const twoKg = section.locator("label").filter({ hasText: "2 กก. · ฿178 · ส่ง 25 บ." }).locator("input");
    await twoKg.check({ force: true });
    await expect(twoKg).toBeChecked();
    await section.getByRole("button", { name: "เพิ่มลงตะกร้า" }).click();
    await page.goto("/cart");

    await expect(page.locator('section[aria-labelledby="cart-items"]').getByRole("link", { name: productName })).toBeVisible();
    await expect(page.locator("output")).toHaveText("1");
    await page.getByRole("button", { name: "ล้างตะกร้า" }).click();
    await expect(page.getByText("ตะกร้ายังว่างอยู่")).toBeVisible();
  });
});
