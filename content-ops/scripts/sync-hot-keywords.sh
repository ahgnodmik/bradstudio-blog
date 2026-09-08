#!/bin/bash
# 로컬 핫 키워드 폴더 → 저장소 동기화 후 push.
# launchd가 매주 월 08:30 KST 실행. 수동 실행도 가능.
set -euo pipefail

SRC="$HOME/Desktop/application/Hot-keyword-thisweek/keywords"
REPO="$HOME/Desktop/application/bradstudio-blog"
DEST="$REPO/content-ops/hot-keywords"

cd "$REPO"
mkdir -p "$DEST"
cp "$SRC"/*.md "$DEST"/ 2>/dev/null || { echo "no keyword files found in $SRC"; exit 0; }

if git status --porcelain content-ops/hot-keywords | grep -q .; then
	git add content-ops/hot-keywords
	git commit -m "content: sync hot keyword board $(date +%Y-%m-%d)"
	git push
	echo "synced and pushed"
else
	echo "no changes"
fi
