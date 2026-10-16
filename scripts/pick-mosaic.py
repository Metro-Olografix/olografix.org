#!/usr/bin/env python3
"""Pick the ten photos of the home mosaic at random from the photogallery.

Each photo comes from a different album, so no photo (and no event) appears twice.
Originals go to static/images/mosaic/, WebP variants (640/1280/1920, never upscaled)
to static/images/opt/ where partials/img.html picks them up, and the selection to
data/mosaic.json, which layouts/index.html reads in tile order (m1 … m10).

Run it from the repo root to draw a new mosaic:   python3 scripts/pick-mosaic.py [--seed S]
Redraw only some tiles (e.g. a screenshot slipped in): python3 scripts/pick-mosaic.py --reroll 4 9
Rerolled tiles come from albums the mosaic doesn't use yet. Photos that are too dark to read
in the mosaic's grayscale are skipped automatically; screenshots and the like need a human eye.
Needs Python 3 and Pillow (pip install pillow). Files of replaced tiles are left in place:
delete them from static/images/mosaic/ and static/images/opt/ if you don't want to keep them.
"""
import argparse
import io
import json
import random
import re
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageStat

SERVER = "https://gallery.olografix.org"
TILES = 10
MIN_WIDTH = 760  # smaller originals look soft in the large tiles
MIN_LUMA = 55  # mean brightness (0-255) below which a photo turns to a black tile in grayscale
ROOT = Path(__file__).resolve().parent.parent


def fetch(url):
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read()


def albums():
    """Album slugs (and years) from the Italian photogallery pages."""
    out = {}
    for md in (ROOT / "content/italiano/photogallery").rglob("index.md"):
        text = md.read_text(encoding="utf-8")
        album = re.search(r'^album:\s*"?([^"\n]+)"?', text, re.M)
        year = re.search(r'^year:\s*"?([^"\n]+)"?', text, re.M)
        if album:
            out[album.group(1).strip()] = year.group(1).strip() if year else ""
    return out


def save_tile(album, year, img, data, im):
    stem = f"{album}-{Path(img['name']).stem[:8]}"
    src_dir, opt_dir = ROOT / "static/images/mosaic", ROOT / "static/images/opt"
    src_dir.mkdir(parents=True, exist_ok=True)
    (src_dir / f"{stem}.jpg").write_bytes(data)
    for w in (640, 1280, 1920):
        if w > im.width and w != 640:
            break
        out = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        out.save(opt_dir / f"{stem}-{w}.webp", "WEBP", quality=78, method=6)
    print(f"{year or '----'}  {album}  {img['name']}")
    return {"src": f"/images/mosaic/{stem}.jpg", "album": album, "year": year}


def draw(rng, album, year, usable):
    """A random photo from the album that is bright enough, or None."""
    for img in rng.sample(usable, min(len(usable), 8)):
        data = fetch(f"{SERVER}/{album}/{img['name']}")
        im = Image.open(io.BytesIO(data)).convert("RGB")
        if ImageStat.Stat(im.convert("L")).mean[0] >= MIN_LUMA:
            return save_tile(album, year, img, data, im)
    return None


def main():
    ap = argparse.ArgumentParser(description="Draw the home mosaic from the photogallery.")
    ap.add_argument("--seed", help="random seed, for a reproducible draw")
    ap.add_argument("--reroll", nargs="+", type=int, metavar="N", help="redraw only these tiles (1-10)")
    args = ap.parse_args()
    rng = random.Random(args.seed)
    data_file = ROOT / "data/mosaic.json"

    pools = {}
    for album, year in sorted(albums().items()):
        try:
            images = json.loads(fetch(f"{SERVER}/{album}/index.json")).get("images", [])
        except Exception:
            continue  # parent albums with sub-albums have no index
        usable = [i for i in images if i["width"] >= MIN_WIDTH and i["width"] > i["height"]]
        if usable:
            pools[album] = (year, usable)

    tiles = json.loads(data_file.read_text(encoding="utf-8")) if args.reroll else [None] * TILES
    slots = [n - 1 for n in args.reroll] if args.reroll else list(range(TILES))
    for n in slots:
        tiles[n] = None
    used = {t["album"] for t in tiles if t}
    candidates = [a for a in sorted(pools) if a not in used]
    rng.shuffle(candidates)
    for n in slots:
        while tiles[n] is None:
            album = candidates.pop()
            tiles[n] = draw(rng, album, *pools[album])

    data_file.parent.mkdir(exist_ok=True)
    data_file.write_text(json.dumps(tiles, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
