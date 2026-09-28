"""Dev tool: slice vector illustrations out of the menu PDF into standalone SVGs.

usage: uv run --with pymupdf python tools/slice.py [Mimloo_Menu_Final.pdf]
Each asset = every drawing on `page` whose bbox lies inside `region` (x, y, w, h in
3840x2160 artboard units). Output goes to public/assets/<name>.svg and sizes to src/lib/art.json.
"""
import sys
import pymupdf

PDF = sys.argv[1] if len(sys.argv) > 1 else "Mimloo_Menu_Final.pdf"
OUT = "public/assets"
PAGE_W, PAGE_H = 3840, 2160

ASSETS = {
    # name: (page, region) or (page, [drawing seqnos])
    "portion-grownup": (1, (3165, 1860, 85, 75)),
    "portion-little": (1, (3420, 1872, 65, 58)),
    "chef-star": (1, (3465, 2005, 65, 62)),
    "icon-gluten": (1, (2315, 1872, 34, 56)),
    "icon-dairy": (1, (2470, 1872, 46, 56)),
    "icon-egg": (1, (2628, 1872, 42, 56)),
    "icon-tree-nut": (1, (2757, 1872, 50, 56)),
    "icon-vegan": (1, (2945, 1872, 45, 56)),
    "icon-protein": (1, (2315, 2012, 38, 48)),
    "icon-whole-grain": (1, (2486, 2012, 44, 48)),
    "icon-antioxidant": (1, (2700, 2010, 50, 52)),
    "icon-good-fats": (1, (2929, 2012, 47, 48)),
    "icon-probiotic": (1, (3127, 2012, 56, 48)),
    "blob-top-right": (1, (3040, -40, 820, 420)),
    "wave-1": (1, [1]),
    "parents-character": (1, (135, 1710, 410, 415)),
    "wave-2": (2, [11]),
    "sensory-character": (2, (3255, 445, 265, 235)),
    "house-cloud": (2, (3015, 1210, 760, 500)),
    "wave-3": (3, [25]),
    "cloud-little-size": (3, (1100, 60, 680, 350)),
    "little-face": (3, (1665, 1000, 180, 150)),
    "plant-sprout": (3, (2695, 1745, 185, 160)),
    "plant-blades": (3, (2310, 1778, 205, 125)),
}


def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def pt(p):
    return f"{fmt(p.x)} {fmt(p.y)}"


def path_d(items):
    d, cur = [], None
    for it in items:
        kind = it[0]
        if kind == "l":
            a, b = it[1], it[2]
            if cur is None or abs(cur.x - a.x) > 0.01 or abs(cur.y - a.y) > 0.01:
                d.append(f"M{pt(a)}")
            d.append(f"L{pt(b)}")
            cur = b
        elif kind == "c":
            a, c1, c2, b = it[1:5]
            if cur is None or abs(cur.x - a.x) > 0.01 or abs(cur.y - a.y) > 0.01:
                d.append(f"M{pt(a)}")
            d.append(f"C{pt(c1)} {pt(c2)} {pt(b)}")
            cur = b
        elif kind == "re":
            r = it[1]
            d.append(f"M{fmt(r.x0)} {fmt(r.y0)}H{fmt(r.x1)}V{fmt(r.y1)}H{fmt(r.x0)}Z")
            cur = None
        elif kind == "qu":
            q = it[1]
            d.append(f"M{pt(q.ul)}L{pt(q.ur)}L{pt(q.lr)}L{pt(q.ll)}Z")
            cur = None
    return "".join(d)


def color(c):
    r, g, b = (round(v * 255) for v in c)
    return f"#{r:02x}{g:02x}{b:02x}"


def element(dr):
    attrs = [f'd="{path_d(dr["items"])}{"Z" if dr.get("closePath") else ""}"']
    t = dr["type"]
    if "f" in t and dr.get("fill"):
        attrs.append(f'fill="{color(dr["fill"])}"')
        if dr.get("even_odd"):
            attrs.append('fill-rule="evenodd"')
        if (dr.get("fill_opacity") or 1) < 1:
            attrs.append(f'fill-opacity="{fmt(dr["fill_opacity"])}"')
    else:
        attrs.append('fill="none"')
    if "s" in t and dr.get("color"):
        attrs.append(f'stroke="{color(dr["color"])}" stroke-width="{fmt(dr.get("width") or 1)}"')
        caps = {0: "butt", 1: "round", 2: "square"}
        joins = {0: "miter", 1: "round", 2: "bevel"}
        lc = dr.get("lineCap")
        lc = lc[0] if isinstance(lc, (tuple, list)) else lc
        if lc:
            attrs.append(f'stroke-linecap="{caps.get(int(lc), "butt")}"')
        lj = dr.get("lineJoin")
        if lj:
            attrs.append(f'stroke-linejoin="{joins.get(int(lj), "miter")}"')
    return f"<path {' '.join(attrs)}/>"


def inside(r, region):
    x, y, w, h = region
    return r.x0 >= x and r.y0 >= y and r.x1 <= x + w and r.y1 <= y + h


import json

meta = {}
doc = pymupdf.open(PDF)
drawings = {i + 1: p.get_drawings() for i, p in enumerate(doc)}
for name, (pno, region) in ASSETS.items():
    if isinstance(region, list):
        picked = [d for d in drawings[pno] if d["seqno"] in region]
    else:
        picked = [d for d in drawings[pno] if inside(d["rect"], region)]
    if not picked:
        print(f"!! {name}: nothing in region")
        continue
    pad = max((d.get("width") or 0) for d in picked if "s" in d["type"]) / 2 if any("s" in d["type"] for d in picked) else 0
    x0 = max(0, min(d["rect"].x0 for d in picked) - pad)
    y0 = max(0, min(d["rect"].y0 for d in picked) - pad)
    x1 = min(PAGE_W, max(d["rect"].x1 for d in picked) + pad)
    y1 = min(PAGE_H, max(d["rect"].y1 for d in picked) + pad)
    w, h = x1 - x0, y1 - y0
    body = "\n".join(element(d) for d in picked)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{fmt(x0)} {fmt(y0)} {fmt(w)} {fmt(h)}" '
           f'width="{fmt(w / 2)}" height="{fmt(h / 2)}">\n{body}\n</svg>\n')
    open(f"{OUT}/{name}.svg", "w").write(svg)
    meta[name] = {k: round(v / 2, 2) for k, v in (("x", x0), ("y", y0), ("w", w), ("h", h))}
    print(f"{name}: {len(picked)} paths, {fmt(w / 2)}x{fmt(h / 2)} @1920 (origin {fmt(x0 / 2)},{fmt(y0 / 2)})")

# Natural size + original position (1920x1080 board units) for each asset.
with open("src/lib/art.json", "w") as f:
    json.dump(meta, f, indent=1)
