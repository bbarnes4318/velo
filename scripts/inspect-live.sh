#!/usr/bin/env bash
set -euo pipefail

source_dir=/opt/velo
target_dir=/opt/territory-lock
backup_root=/opt/territory-lock-backups
stamp="$(date -u +%Y%m%d-%H%M%S)"
backup_dir="$backup_root/$stamp"

echo '=== VERIFY REDESIGNED SOURCE ==='
cd "$source_dir"
printf 'source_commit=%s\n' "$(git rev-parse --short HEAD)"
grep -R -F 'Agent-Driven Program' src >/dev/null
grep -R -F 'One Listing Guaranteed' src >/dev/null
echo 'redesign_markers=present'

echo '=== BACK UP CURRENT LIVE SOURCE ==='
mkdir -p "$backup_dir"
cp -a "$target_dir/src" "$backup_dir/src"
if [ -d "$target_dir/public" ]; then cp -a "$target_dir/public" "$backup_dir/public"; fi
cp -a "$target_dir/docker-compose.yml" "$backup_dir/docker-compose.yml"
cp -a "$target_dir/Dockerfile" "$backup_dir/Dockerfile"
printf 'backup=%s\n' "$backup_dir"

restore_source() {
  echo 'Restoring previous source after deployment failure.'
  rm -rf "$target_dir/src" "$target_dir/public"
  cp -a "$backup_dir/src" "$target_dir/src"
  if [ -d "$backup_dir/public" ]; then cp -a "$backup_dir/public" "$target_dir/public"; fi
}
trap restore_source ERR

echo '=== INSTALL REDESIGNED SOURCE ==='
rm -rf "$target_dir/src" "$target_dir/public"
cp -a "$source_dir/src" "$target_dir/src"
if [ -d "$source_dir/public" ]; then cp -a "$source_dir/public" "$target_dir/public"; else mkdir -p "$target_dir/public"; fi

grep -R -F 'Agent-Driven Program' "$target_dir/src" >/dev/null
echo 'source_replacement=complete'

echo '=== BUILD AND RECREATE LIVE CONTAINER ==='
cd "$target_dir"
docker compose build app
docker compose up -d --force-recreate app
docker compose ps app

echo '=== VERIFY CONTAINER ==='
for attempt in {1..24}; do
  status="$(docker inspect -f '{{.State.Status}}' territory-lock-app 2>/dev/null || true)"
  health="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' territory-lock-app 2>/dev/null || true)"
  printf 'attempt=%s status=%s health=%s\n' "$attempt" "$status" "$health"
  body="$(curl -ksS --max-time 10 --resolve properties.leadsbystorm.com:443:127.0.0.1 https://properties.leadsbystorm.com/ 2>/dev/null || true)"
  if printf '%s' "$body" | grep -q 'Agent-Driven Program'; then
    echo 'local_https_verification=passed'
    trap - ERR
    exit 0
  fi
  sleep 5
done

echo 'The rebuilt container did not serve the redesigned page.'
exit 1
