#!/usr/bin/env bash

JOBS=4
DIR="$1"

if [[ -z "$DIR" || ! -d "$DIR" ]]; then
  echo "Usage: $0 <target-directory>"
  echo "Example: $0 ../content"
  exit 1
fi

convert() {
  input="$1"
  output="${input%.mp4}.webm"

  # if [ -f "$output" ]; then
  #   echo "Skipping (already exists): $output"
  #   return
  # fi

  # fps=$(ffprobe -v 0 -select_streams v:0 -show_entries stream=r_frame_rate \
  #   -of default=noprint_wrappers=1:nokey=1 "$input")

  echo "Converting: $input -> $output"

  # ffmpeg -i "$input" -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis "$output"
  
  ffmpeg -loglevel error -y \
    -i "$input" \
    -c:v libvpx-vp9 -b:v 0 -crf 25 -cpu-used 3 -deadline good \
    -c:a libopus -b:a 64k \
    -analyzeduration 0 -probesize 32k \
    "$output"

  echo "✓ Done: $output"
}

export -f convert

find "$DIR" -type f -name "*.mp4" -print0 \
  | xargs -0 -n 1 -P "$JOBS" bash -c 'convert "$0"'
