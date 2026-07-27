#!/usr/bin/env bash
set -euo pipefail

container=territory-lock-app

echo '=== CONTAINER SUMMARY ==='
docker inspect "$container" | python3 -c '
import json,sys
obj=json.load(sys.stdin)[0]
config=obj.get("Config",{})
host=obj.get("HostConfig",{})
labels=config.get("Labels",{}) or {}
print("name=" + obj.get("Name","").lstrip("/"))
print("image=" + str(config.get("Image","")))
print("image_id=" + str(obj.get("Image","")))
print("created=" + str(obj.get("Created","")))
print("status=" + str(obj.get("State",{}).get("Status","")))
print("working_dir=" + str(config.get("WorkingDir","")))
print("entrypoint=" + repr(config.get("Entrypoint")))
print("cmd=" + repr(config.get("Cmd")))
print("restart_policy=" + str(host.get("RestartPolicy",{}).get("Name","")))
for key in sorted(labels):
    if key.startswith("com.docker.compose") or "coolify" in key.lower() or "traefik" in key.lower():
        print("label.%s=%s" % (key, labels[key]))
print("mounts:")
for m in obj.get("Mounts",[]):
    print("  %s:%s type=%s rw=%s" % (m.get("Source",""), m.get("Destination",""), m.get("Type",""), m.get("RW","")))
print("networks:")
for name,data in (obj.get("NetworkSettings",{}).get("Networks",{}) or {}).items():
    print("  %s ip=%s" % (name, data.get("IPAddress","")))
'

echo '=== IMAGE SUMMARY ==='
docker image inspect territory-lock-app | python3 -c '
import json,sys
obj=json.load(sys.stdin)[0]
print("id=" + obj.get("Id",""))
print("created=" + obj.get("Created",""))
print("repo_tags=" + repr(obj.get("RepoTags",[])))
print("working_dir=" + str(obj.get("Config",{}).get("WorkingDir","")))
print("cmd=" + repr(obj.get("Config",{}).get("Cmd")))
'

echo '=== COMPOSE AND ROUTING FILES ==='
for root in /opt /data/coolify; do
  [ -d "$root" ] || continue
  find "$root" -maxdepth 6 -type f \( -name 'docker-compose.yml' -o -name 'docker-compose.yaml' -o -name 'compose.yml' -o -name 'compose.yaml' \) -print0 2>/dev/null |
    while IFS= read -r -d '' file; do
      if grep -qE 'territory-lock-app|properties\.leadsbystorm\.com' "$file" 2>/dev/null; then
        echo "$file"
      fi
    done
done

echo '=== SOURCE DIRECTORIES ==='
for dir in /opt/velo /opt/territory-lock /opt/territory-lock-app /data/coolify/applications; do
  if [ -e "$dir" ]; then
    ls -ld "$dir"
  fi
done
