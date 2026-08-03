#!/usr/bin/env bash
set -euo pipefail

source_dir=/opt/velo
target_dir=/opt/territory-lock
backup_root=/opt/territory-lock-backups
stamp="$(date -u +%Y%m%d-%H%M%S)"
backup_dir="$backup_root/$stamp"
rollback_tag="territory-lock-app:rollback-$stamp"

echo '=== UPDATE DEPLOYMENT SOURCE ==='
cd "$source_dir"
git fetch --prune origin main
git reset --hard origin/main
printf 'source_commit=%s\n' "$(git rev-parse --short HEAD)"
grep -R -F 'Market Test Pilot' src >/dev/null
grep -R -Fi 'one listing guaranteed' src >/dev/null
echo 'current_funnel_markers=present'

echo '=== BACK UP CURRENT LIVE APPLICATION ==='
mkdir -p "$backup_dir"
cp -a "$target_dir/src" "$backup_dir/src"
if [ -d "$target_dir/public" ]; then cp -a "$target_dir/public" "$backup_dir/public"; fi
cp -a "$target_dir/docker-compose.yml" "$backup_dir/docker-compose.yml"
cp -a "$target_dir/Dockerfile" "$backup_dir/Dockerfile"
old_image_id="$(docker inspect -f '{{.Image}}' territory-lock-app)"
docker image tag "$old_image_id" "$rollback_tag"
printf 'backup=%s\n' "$backup_dir"
printf 'rollback_image=%s\n' "$rollback_tag"

rollback() {
  status=$?
  echo "Deployment failed with status $status. Restoring the previous application."
  rm -rf "$target_dir/src" "$target_dir/public"
  cp -a "$backup_dir/src" "$target_dir/src"
  if [ -d "$backup_dir/public" ]; then cp -a "$backup_dir/public" "$target_dir/public"; fi
  docker image tag "$rollback_tag" territory-lock-app:latest || true
  cd "$target_dir"
  docker compose up -d --force-recreate app || true
  exit "$status"
}
trap rollback ERR

echo '=== INSTALL CURRENT VELO SOURCE ==='
rm -rf "$target_dir/src" "$target_dir/public"
cp -a "$source_dir/src" "$target_dir/src"
if [ -d "$source_dir/public" ]; then
  cp -a "$source_dir/public" "$target_dir/public"
else
  mkdir -p "$target_dir/public"
fi
grep -R -F 'Market Test Pilot' "$target_dir/src" >/dev/null
echo 'source_replacement=complete'

echo '=== BUILD AND RECREATE TERRITORY-LOCK APP ==='
cd "$target_dir"
docker compose build app
docker compose up -d --force-recreate app
docker compose ps app

echo '=== VERIFY LOCAL HTTPS ROUTE ==='
for attempt in {1..24}; do
  status="$(docker inspect -f '{{.State.Status}}' territory-lock-app 2>/dev/null || true)"
  body="$(curl -ksS --max-time 10 --resolve properties.leadsbystorm.com:443:127.0.0.1 https://properties.leadsbystorm.com/ 2>/dev/null || true)"
  printf 'attempt=%s status=%s\n' "$attempt" "$status"
  if printf '%s' "$body" | grep -q 'Walk into listing conversations'; then
    echo 'local_https_verification=passed'
    trap - ERR
    find "$backup_root" -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} + 2>/dev/null || true
    exit 0
  fi
  sleep 5
done

echo 'The rebuilt container did not serve the current pilot package.'
exit 1
