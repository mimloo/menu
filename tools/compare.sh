#!/usr/bin/env bash
# Dev tool: renders boards and builds ref/cmp-N.png = PDF (top) over our render (bottom),
# plus ref/diff-N.png (R,B = PDF, G = render: PDF-only ink shows green-ish holes = magenta, render-only = green).
set -e
cd "$(dirname "$0")/.."
npm run -s export >/dev/null
i=1
for id in brunch-mains bowls sides-sips; do
  [ -f ref/page-$i.png ] || pdftoppm -png -scale-to-x 1920 -scale-to-y 1080 -f $i -l $i Mimloo_Menu_Final.pdf ref/page
  magick exports/$id.png -resize 1920x1080 ref/out-$i.png
  magick ref/page-$i.png ref/out-$i.png -append ref/cmp-$i.png
  magick ref/page-$i.png ref/out-$i.png -colorspace gray \( -clone 0 \) -combine ref/diff-$i.png
  i=$((i+1))
done
echo done
