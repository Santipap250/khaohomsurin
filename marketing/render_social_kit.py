from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "marketing" / "facebook"
OUT.mkdir(parents=True, exist_ok=True)
html_path = ROOT / "marketing" / "social-kit.html"

# The HTML is authored above; this pass renders exact pixel canvases in Chromium.
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path="/usr/bin/chromium", args=["--no-sandbox"])
    page = browser.new_page(viewport={"width":1200,"height":1920}, device_scale_factor=1)
    page.goto(html_path.as_uri(), wait_until="networkidle")
    targets = [
        ("og", "khaohomsurin-og-1200x630.jpg", 1200, 630),
        ("post", "facebook-post-1080x1350.jpg", 1080, 1350),
        ("story", "facebook-story-1080x1920.jpg", 1080, 1920),
    ]
    for selector, name, width, height in targets:
        page.set_viewport_size({"width": width, "height": height})
        page.locator(f"#{selector}").screenshot(path=str(OUT / (name + ".png")))
    browser.close()

for png in OUT.glob("*.jpg.png"):
    jpg = png.with_suffix("")
    with Image.open(png) as im:
        im.convert("RGB").save(jpg, "JPEG", quality=88, optimize=True, progressive=True)
    png.unlink()
    print(jpg, Image.open(jpg).size, jpg.stat().st_size)
