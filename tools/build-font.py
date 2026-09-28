"""Dev tool: build 'Mimloo Neulis' webfonts = Neulis Neue glyph shapes embedded in the menu PDF,
merged into NeulisAlt (../social brand fonts) for kerning, metrics and any glyph the PDF subset lacks.

usage: uv run --with pymupdf --with fonttools --with brotli python tools/build-font.py
Replace with licensed Neulis Neue webfonts when available (see CLAUDE.md).
"""
import io
import re
import pymupdf
from fontTools.ttLib import TTFont
from fontTools.cffLib import CFFFontSet
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.boundsPen import BoundsPen

PDF = "Mimloo_Menu_Final.pdf"
BASE = "../social/brand/fonts/neulis-font-family/NeulisAlt-{}.otf"

def pdf_widths(doc, xref):
    """glyph name -> advance width, from the font dict's /Widths + /Encoding /Differences."""
    first = int(doc.xref_get_key(xref, "FirstChar")[1])
    widths = [float(w) for w in doc.xref_get_key(xref, "Widths")[1].strip("[]").split()]
    enc = doc.xref_get_key(xref, "Encoding")
    enc_obj = doc.xref_object(int(enc[1].split()[0])) if enc[0] == "xref" else enc[1]
    diffs = re.search(r"/Differences\s*\[(.*?)\]", enc_obj, re.S).group(1)
    out, code = {}, None
    for tok in re.findall(r"/[^\s/\[\]]+|\d+", diffs):
        if tok.startswith("/"):
            if 0 <= code - first < len(widths):
                out[tok[1:]] = widths[code - first]
            code += 1
        else:
            code = int(tok)
    return out


doc = pymupdf.open(PDF)
pdf_fonts = {}
for page in doc:
    for xref, _, _, base, *_ in page.get_fonts():
        weight = base.split("-")[-1]
        if weight not in pdf_fonts:
            cff = CFFFontSet()
            cff.decompile(io.BytesIO(doc.extract_font(xref)[3]), None)
            pdf_fonts[weight] = (cff[cff.fontNames[0]], pdf_widths(doc, xref))

for weight, (src, widths) in pdf_fonts.items():
    font = TTFont(BASE.format(weight))
    top = font["CFF "].cff.topDictIndex[0]
    private = top.Private
    hmtx = font["hmtx"]
    src_cs = src.CharStrings
    swapped = []
    for name in src_cs.keys():
        if name == ".notdef" or name not in top.CharStrings:
            continue
        if name not in widths:
            continue
        cs = src_cs[name]
        width = round(widths[name])
        # The charstring stores width relative to the Private dict's nominalWidthX.
        pen = T2CharStringPen(width - private.nominalWidthX, None)
        cs.draw(pen)
        new = pen.getCharString(private=private, globalSubrs=top.GlobalSubrs)
        top.CharStrings[name] = new
        bp = BoundsPen(None)
        new.draw(bp)
        lsb = round(bp.bounds[0]) if bp.bounds else 0
        hmtx[name] = (width, lsb)
        swapped.append(name)
    for rec in font["name"].names:
        if rec.nameID in (1, 3, 4, 6, 16):
            rec.string = str(rec.toUnicode()).replace("NeulisAlt", "Mimloo Neulis").replace("Neulis Alt", "Mimloo Neulis")
    font.flavor = "woff2"
    out = f"public/fonts/MimlooNeulis-{weight}.woff2"
    font.save(out)
    print(out, f"{len(swapped)} glyphs from PDF")
