#!/usr/bin/env bash
set -euo pipefail

echo '=== DEPLOYED SOURCE ==='
cd /opt/velo
printf 'directory=%s\n' "$(pwd)"
printf 'commit=%s\n' "$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
printf 'headline_in_source='
grep -F '50 Seller Opportunities. One Listing Guaranteed.' src/app/page.tsx >/dev/null && echo yes || echo no

echo '=== SYSTEMD ==='
found_systemd=no
for service in velo velocityre properties; do
  if systemctl list-unit-files "${service}.service" --no-legend 2>/dev/null | grep -q "${service}.service"; then
    found_systemd=yes
    printf '%s active=%s\n' "${service}.service" "$(systemctl is-active "${service}.service" 2>/dev/null || true)"
    systemctl show "${service}.service" -p WorkingDirectory -p ExecStart --no-pager 2>/dev/null || true
  fi
done
[ "$found_systemd" = yes ] || echo 'matching_systemd=none'

echo '=== PM2 ==='
if command -v pm2 >/dev/null 2>&1; then
  pm2 jlist | python3 -c 'import json,sys; data=json.load(sys.stdin); [print("name=%s status=%s cwd=%s script=%s" % (p.get("name",""), p.get("pm2_env",{}).get("status",""), p.get("pm2_env",{}).get("pm_cwd",""), p.get("pm2_env",{}).get("pm_exec_path",""))) for p in data]'
else
  echo 'pm2=not-installed'
fi

echo '=== DOCKER CONTAINERS ==='
if command -v docker >/dev/null 2>&1; then
  docker ps --format 'name={{.Names}} image={{.Image}} ports={{.Ports}}'
  echo '=== CONTAINERS CLAIMING DOMAIN ==='
  matched=no
  for id in $(docker ps -q); do
    result="$(docker inspect "$id" | python3 -c '
import json,sys
obj=json.load(sys.stdin)[0]
labels=obj.get("Config",{}).get("Labels",{}) or {}
matches={k:v for k,v in labels.items() if "properties.leadsbystorm.com" in str(v)}
if matches:
    print("name=" + obj.get("Name","").lstrip("/"))
    for k,v in sorted(matches.items()): print(k + "=" + str(v))
' || true)"
    if [ -n "$result" ]; then
      matched=yes
      printf '%s\n' "$result"
    fi
  done
  [ "$matched" = yes ] || echo 'claiming_container=none'
else
  echo 'docker=not-installed'
fi

echo '=== LISTENERS ==='
ss -ltnp 2>/dev/null | grep -E ':(80|443|3000|3001|8080)\b' || true

echo '=== LOCAL HOST HEADER CHECK ==='
for port in 80 3000 3001 8080; do
  body="$(curl -sS --max-time 5 -H 'Host: properties.leadsbystorm.com' "http://127.0.0.1:${port}/" 2>/dev/null || true)"
  if [ -n "$body" ]; then
    if printf '%s' "$body" | grep -q '50 Seller Opportunities. One Listing Guaranteed.'; then
      echo "port=${port} page=new"
    elif printf '%s' "$body" | grep -q 'Reach Tomorrow'; then
      echo "port=${port} page=old"
    else
      echo "port=${port} page=other"
    fi
  fi
done
