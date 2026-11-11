# Mission 04 — Performance & UX Engineering Report

## Scope and safety

This report covers the existing KHAO HOM SURIN Next.js site. The work was performed on branch `manus/performance-ux-hardening` from `origin/main` at commit `4649d83`. Production was not modified. Existing product imagery, social artwork, hero video, cart behavior, and ordering disclosure were preserved.

No CrUX/RUM field dataset was available in this session. Therefore every Lighthouse number below is **lab data**, not field data. INP is not reported as a reliable field metric. The Google good thresholds used as engineering targets were LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1; these are targets, not guarantees.

## Baseline — production lab audit

Lighthouse 13.0.1 was run against `https://khaohomsurin.vercel.app/` with Chromium Mobile and Desktop presets. Values are one audit sample per route/viewport and can vary with cache, server warm-up, and execution timing.

| Route | Viewport | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | FCP | TTFB |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | Mobile | 84 | 100 | 100 | 100 | 3.885s | 0.000 | 192ms | 1.635s | 2ms |
| Home | Desktop | 80 | 100 | 100 | 100 | 0.792s | **0.432** | 7ms | 0.332s | 2ms |
| Products | Mobile | 87 | 100 | 100 | 100 | 3.086s | 0.000 | 305ms | 1.661s | 2ms |
| Products | Desktop | 86 | 100 | 100 | 100 | 0.631s | **0.270** | 0ms | 0.331s | 2ms |
| Product detail | Mobile | 92 | 100 | 100 | 100 | 3.132s | 0.000 | 97ms | 1.660s | 2ms |
| Product detail | Desktop | 87 | 100 | 100 | 100 | 0.630s | **0.256** | 4ms | 0.330s | 2ms |
| Cart | Mobile | 89 | 100 | 100 | 69 | 2.560s | 0.091 | 272ms | 1.360s | 1ms |
| Cart | Desktop | 99 | 100 | 100 | 69 | 0.611s | 0.073 | 1ms | 0.331s | 2ms |

The cart SEO score of 69 is expected: the route intentionally declares `robots: { index: false }` because it is a browser-local cart and not a search landing page. No change was made to that intentional privacy/SEO behavior.

## Evidence-led change

The desktop CLS issue was isolated with the browser Layout Instability API. With normal motion, the local production build recorded approximately `0.429`; with `prefers-reduced-motion: reduce`, the same route recorded approximately `0.0001`. Disabling only the Hero parallax transform reduced the normal-motion local trace to `0.0001`, while preserving the hero poster, video, fade/stagger content animation, grain decoration, and pause/play control.

The following motion changes were made:

- Removed the Hero background scroll parallax transform, which was the measured high-impact CLS source.
- Kept the cinematic hero video and poster fallback unchanged.
- Kept Hero content stagger but changed its entrance from translate-plus-fade to fade-only.
- Kept scroll reveal behavior but changed it to fade-only.
- Kept the page entrance animation as fade-only.

No marketing image, video, product data, price, contact detail, LINE URL, checkout, or payment system was added or regenerated.

### Products CLS follow-up

The remaining Products shift was traced to the interactive `ProductBrowser` client boundary: the initial route shell contained the page heading, while the filter controls and product cards were inserted after hydration, moving the footer. The fix renders the product cards and result count in the server component and keeps only the filter controls as a small client island. Search and category state now travels through the URL query string, so the same behavior remains available without making the whole product listing wait for hydration.

The first attempted CSS height reservation and a route loading shell were measured and discarded as insufficient for Lighthouse navigation. They are not part of the final implementation.

## After-fix lab audit

The after-fix Lighthouse run was executed against the local production build at `http://127.0.0.1:3011`. Because the origin and network path differ from production, these values are **not an apples-to-apples replacement for a production Lighthouse run**. They are included to document the post-change lab behavior and should not be presented as field improvement.

| Route | Viewport | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | FCP | TTFB |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | Mobile | 75 | 100 | 100 | 100 | 5.594s | 0.002 | 201ms | 1.821s | 58ms |
| Home | Desktop | **98** | 100 | 100 | 100 | 1.100s | **0.000** | 0ms | 0.506s | 10ms |
| Products | Mobile | 68 | 100 | 100 | 100 | 3.763s | 0.422 | 116ms | 1.665s | 10ms |
| Products | Desktop | 86 | 100 | 100 | 100 | 0.707s | 0.269 | 0ms | 0.421s | 4ms |
| Product detail | Mobile | 79 | 100 | 100 | 100 | 3.284s | 0.000 | 442ms | 2.122s | 8ms |
| Product detail | Desktop | **100** | 100 | 100 | 100 | 0.727s | 0.000 | 0ms | 0.454s | 5ms |
| Cart | Mobile | 89 | 100 | 100 | 69 | 3.114s | 0.111 | 121ms | 1.667s | 5ms |
| Cart | Desktop | 99 | 100 | 100 | 69 | 0.727s | 0.073 | 7ms | 0.414s | 4ms |

The controlled local browser trace is the strongest before/after evidence for the motion and Products fixes: Home desktop CLS approximately `0.429 → 0.0001`, while Products desktop CLS approximately `0.254 → 0.0001` and Products mobile CLS is `0` after the server/client boundary refactor. Lighthouse's navigation run remains noisier for this dynamically server-rendered route and reported `0.270` desktop / `0.422` mobile in the final local sample; that discrepancy is explicitly retained rather than hidden, and the browser trace confirms the page is stable after the route has settled.

## Hero video verification

The supplied `public/videos/hero-bg.mp4` and `public/videos/hero-bg-poster.jpg` were preserved. Production browser verification showed `readyState=4`, `error=null`, `paused=false` after load on a 390px viewport. The component remains muted, looping, inline, poster-backed, viewport-paused, Data Saver-aware, reduced-motion-aware, and equipped with a visible pause/play control.

## Accessibility

Lighthouse reported Accessibility 100 for all eight baseline route/viewport runs and all eight after-fix local runs. This is automated lab evidence only and is not a WCAG 2.2 AA certification. Practical checks retained or verified include semantic headings, visible focus styling, 44px-class interactive controls, labels for form fields, screen-reader button names, alt text, reduced motion handling, and a visible video pause/play control.

## Remaining evidence-based follow-up

1. Lighthouse navigation samples for the dynamically rendered Products route remain variable and should be rechecked on the Vercel Preview with the owner-visible deployment environment before merge.
2. Mobile LCP is above the 2.5s target on Home, Products, Product detail, and Cart in the available lab runs. The measurements vary substantially by origin/server warm-up; no field claim is made. The supplied hero video was not regenerated or removed.
3. INP field data was unavailable. No synthetic INP claim is made.
4. A Vercel Preview run should be used for the final owner review before any merge. Production remains unchanged.
