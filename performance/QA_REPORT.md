# Mission 04 — QA Report

## Test environment

- Local production build: `next start` on `http://127.0.0.1:3011`
- Browser automation: Playwright with Chromium
- Viewports: 360, 390, 430, 768, 1024, and 1440px
- Critical routes: `/`, `/products`, `/products/boonyang-khao-hom`, `/cart`

## Route and responsive checks

The automated route matrix checked HTTP status, horizontal overflow, console errors, failed requests, presence of `main` and `footer`, unloaded images, and touch-target counts.

- 24 route/viewport combinations were exercised.
- 24 returned HTTP 200.
- No horizontal overflow was detected at the six requested widths.
- No console errors were detected.
- No broken images were detected.
- 23/24 checks had no failed request. The sole failed request was the hero MP4 request being aborted during viewport/video pause behavior; direct verification showed the video loaded successfully with `readyState=4` and `error=null` on both production and local builds.
- Interactive controls included 44px-class targets in the tested views; no button overlap was observed by the route checks.

## Customer journey

The following flow passed on the local production build at 390px:

1. Opened the product detail page.
2. Added the product to the cart.
3. Opened Cart and verified the item and quantity.
4. Reloaded Cart and verified Local Storage persistence.
5. Confirmed editable order fields and the editable order-message text area are present.
6. Confirmed the copy-order-message control is present.
7. Confirmed the owner-provided LINE link, telephone link, and email link render on the contact and ordering surfaces.
8. Confirmed the UI discloses that this is an order request, not an online payment or automatic checkout.

No fake checkout, payment, automatic order receiver, or unverified LINE account was introduced.

## Products filter regression check

After the CLS refactor, the Products page was checked at 390px. The initial server-rendered result showed `พบ 1 รายการ`; submitting a search for a non-matching term updated the URL with `q=` and showed `พบ 0 รายการ`; clearing the filter returned the result set through the same URL-driven flow. No horizontal overflow was detected. Product cards remain server-rendered while the category/search controls remain interactive.

## Screenshots

Baseline production screenshots are under [`screenshots/baseline-production`](./screenshots/baseline-production/). After-fix local production-build screenshots are under [`screenshots/after-local`](./screenshots/after-local/).

Representative after-fix images:

- [Home desktop](./screenshots/after-local/home-desktop-after.png)
- [Home mobile](./screenshots/after-local/home-mobile-after.png)
- [Products desktop](./screenshots/after-local/products-desktop-after.png)
- [Products mobile](./screenshots/after-local/products-mobile-after.png)
- [Product detail desktop](./screenshots/after-local/detail-desktop-after.png)
- [Product detail mobile](./screenshots/after-local/detail-mobile-after.png)
- [Cart desktop](./screenshots/after-local/cart-desktop-after.png)
- [Cart mobile](./screenshots/after-local/cart-mobile-after.png)

## Build checks

- `npm ci` completed before the audit work.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed and generated the expected App Router routes.

These checks were run against the performance branch after the final code changes. No unrelated dependency upgrade or automatic `npm audit fix` was used.
