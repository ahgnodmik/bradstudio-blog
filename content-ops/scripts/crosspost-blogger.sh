#!/bin/bash
# 맥에서 Blogger 교차 발행 → 기록 커밋·push. launchd가 매일 실행(수동 실행도 가능).
# 인증: 저장소 루트 .env 의 BLOGGER_CLIENT_ID / BLOGGER_CLIENT_SECRET / BLOGGER_REFRESH_TOKEN
set -euo pipefail

REPO="$HOME/Desktop/application/bradstudio-blog"
cd "$REPO"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

git pull --rebase origin main
node content-ops/scripts/crosspost-blogger.mjs --limit 15 || echo "일부 실패 — 위 로그 확인"

if git status --porcelain content-ops/derivatives | grep -q .; then
	ids=$(git status --porcelain content-ops/derivatives | sed -E 's#.*derivatives/([^/]+)/.*#\1#' | sort -u | tr '\n' ' ')
	n=$(echo "$ids" | wc -w | tr -d ' ')
	git add content-ops/derivatives
	git commit -m "chore: Blogger 교차 발행 기록 ${n}건 — ${ids}"
	git pull --rebase origin main
	git push
	echo "기록 ${n}건 push"
else
	echo "새로 발행한 글 없음"
fi
