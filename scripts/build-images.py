# Builds every image in public/img from the original photos.
#   python -I scripts/build-images.py <originals dir> <cutouts dir>
# Originals: 1.jpg (musk box), 3.jpg (musk set), 4.jpg (fruity set), 5.jpg (fruity box).
# Cutouts:   cut_3.png, cut_4.png (made by scripts/cutout.py with isnet-general-use).
import os, sys
import numpy as np
from PIL import Image, ImageFilter

SRC, CUT = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
os.makedirs(OUT, exist_ok=True)


def flat_white(path, crop=None):
    """Fit the studio background from the border band and divide it out, so the
    backdrop becomes pure white and `mix-blend-mode: multiply` melts it into the page."""
    im = Image.open(path).convert("RGB")
    if crop:
        im = im.crop(crop)
    a = np.asarray(im).astype(np.float64)
    h, w, _ = a.shape
    band = max(8, int(min(h, w) * 0.035))
    yy, xx = np.mgrid[0:h, 0:w]
    m = np.zeros((h, w), bool)
    m[:band], m[-band:], m[:, :band], m[:, -band:] = True, True, True, True
    x, y = xx[m] / w, yy[m] / h
    A = np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], 1)
    X, Y = xx / w, yy / h
    Afull = np.stack([np.ones_like(X), X, Y, X * X, Y * Y, X * Y], -1)
    out = np.empty_like(a)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, a[..., c][m], rcond=None)
        bg = np.clip(Afull @ coef, 120, 255)
        out[..., c] = a[..., c] / bg * 255
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def save(im, name, width=None, quality=86):
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + ".webp"), "WEBP", quality=quality, method=6)
    if im.mode == "RGB":
        im.save(os.path.join(OUT, name + ".jpg"), "JPEG", quality=quality, optimize=True, progressive=True)
    print(name, im.size)


def tight(im, pad=0.04):
    bbox = im.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    im = im.crop(bbox)
    p = int(max(im.size) * pad)
    canvas = Image.new("RGBA", (im.width + 2 * p, im.height + 2 * p), (0, 0, 0, 0))
    canvas.paste(im, (p, p))
    return canvas


def clean_alpha(im):
    # Drop the faint halo the model leaves on the wall, keep soft edges.
    r, g, b, a = im.split()
    a = a.point(lambda v: 0 if v < 18 else (255 if v > 235 else v))
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    return Image.merge("RGBA", (r, g, b, a))


# Boxes (studio shots)
save(flat_white(os.path.join(SRC, "1.jpg")), "box-musk", 1200)
save(flat_white(os.path.join(SRC, "5.jpg"), crop=(430, 0, 1640, 1116)), "box-fruity", 1400)

# Full sets (cutouts)
sets = {"musk": "cut_3.png", "fruity": "cut_4.png"}
for scent, f in sets.items():
    im = clean_alpha(Image.open(os.path.join(CUT, f)).convert("RGBA"))
    save(tight(im, 0.02), "set-" + scent, 1400, 88)

# Where each product sits inside the set images, in % (used by the zoom-in "inside the box" view)
centers = {
    "musk": {"mist": (275, 1210), "lotion": (690, 1220), "gel": (1290, 1250), "scrub": (972, 1505), "butter": (430, 1572)},
    "fruity": {"mist": (220, 1187), "scrub": (387, 1570), "gel": (697, 1257), "butter": (992, 1532), "lotion": (1310, 1345)},
}
for scent, f in sets.items():
    full = clean_alpha(Image.open(os.path.join(CUT, f)).convert("RGBA"))
    l, t, r, b = full.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    pad = int(max(r - l, b - t) * 0.02)
    W, H = r - l + 2 * pad, b - t + 2 * pad
    print(scent, {k: (round((x - l + pad) / W * 100, 1), round((y - t + pad) / H * 100, 1)) for k, (x, y) in centers[scent].items()})
