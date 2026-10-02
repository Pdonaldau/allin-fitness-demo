"""Crop and compress the Facebook images in Assets/ into web-ready files in img/.

Run from the repo root:  py -3 tools/build_images.py
The originals in Assets/ are never changed.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Assets"
OUT = ROOT / "img"
OUT.mkdir(exist_ok=True)


def save(img, name, width=None, quality=80):
    if width and img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(OUT / f"{name}.webp", "WEBP", quality=quality, method=6)
    print(f"{name}.webp  {img.width}x{img.height}")


def crop(file, box):
    return Image.open(SRC / file).convert("RGB").crop(box)


# Photos. Boxes skip the text baked into the Facebook posters.
save(crop("Allin2.jpg", (0, 590, 1440, 1290)), "hero", 1600)        # busy gym floor
save(crop("Allin1.jpg", (780, 300, 1440, 1440)), "floor-machines", 700)  # plate-loaded kit
save(crop("Allin5.jpg", (0, 0, 1440, 1440)), "cardio", 1000)        # treadmills + StairMaster
save(crop("Allin6.jpg", (0, 350, 1440, 1440)), "founders", 1200)   # 7th birthday photo
for small, name in [("Allin3.jpg", "floor-wide"), ("Allin4.jpg", "boxing"), ("Allin8.jpg", "floor-strength")]:
    save(crop(small, (0, 0, 206, 206)), name, quality=88)

# Logo: the white circular badge from Allin1, turned into white-on-transparent.
badge = Image.open(SRC / "Allin1.jpg").convert("L").crop((95, 0, 435, 345))
size = badge.size
alpha = badge.point(lambda v: 0 if v < 90 else min(255, (v - 90) * 3))
circle = Image.new("L", size, 0)
ImageDraw.Draw(circle).ellipse((2, 2, size[0] - 3, size[1] - 3), fill=255)
alpha = ImageOps.autocontrast(Image.composite(alpha, Image.new("L", size, 0), circle))
logo = Image.new("RGBA", size, (255, 255, 255, 0))
logo.putalpha(alpha)
logo = logo.crop(logo.getbbox())
logo.save(OUT / "logo.png", optimize=True)
print(f"logo.png  {logo.width}x{logo.height}")
