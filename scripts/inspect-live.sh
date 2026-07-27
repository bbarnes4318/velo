#!/usr/bin/env bash
set -euo pipefail

cd /opt/territory-lock

echo '=== PROJECT DIRECTORY ==='
printf 'directory=%s\n' "$(pwd)"
ls -la | sed -n '1,80p'

echo '=== GIT SOURCE ==='
if [ -d .git ]; then
  printf 'commit=%s\n' "$(git rev-parse --short HEAD)"
  printf 'branch=%s\n' "$(git branch --show-current || true)"
  remote="$(git remote get-url origin 2>/dev/null || true)"
  remote="$(printf '%s' "$remote" | sed -E 's#https://[^/@]+@github\.com/#https://github.com/#')"
  printf 'origin=%s\n' "$remote"
else
  echo 'git_repository=no'
fi

echo '=== APPLICATION MARKERS ==='
[ -f package.json ] && python3 -c 'import json; p=json.load(open("package.json")); print("package="+str(p.get("name",""))); print("next="+str((p.get("dependencies",{}) or {}).get("next","")))'
printf 'old_headline='
grep -R -F 'Reach Tomorrow' src app 2>/dev/null | head -n 1 || echo not-found
printf 'new_headline='
grep -R -F '50 Seller Opportunities' src app 2>/dev/null | head -n 1 || echo not-found

echo '=== COMPOSE FILE ==='
sed -n '1,220p' docker-compose.yml

echo '=== DOCKERFILE ==='
if [ -f Dockerfile ]; then sed -n '1,220p' Dockerfile; else echo 'Dockerfile=missing'; fi

echo '=== BUILD CONTEXT FILES ==='
for file in package-lock.json next.config.js next.config.mjs next.config.ts; do
  [ -f "$file" ] && echo "$file=present"
done
