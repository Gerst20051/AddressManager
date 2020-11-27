#!/usr/bin/env sh

logo_webp=assets/logo.webp
logo_png=assets/logo.png
output=react-address-manager/public
dir=$(dirname $(realpath $0))

ffmpeg -i $dir/$logo_webp $dir/$logo_png
convert -resize x16 $dir/$logo_png $dir/$output/favicon.ico
convert -resize x192 $dir/$logo_png $dir/$output/logo192.png
convert -resize x512 $dir/$logo_png $dir/$output/logo512.png
