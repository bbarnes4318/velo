#!/usr/bin/env bash
set -euo pipefail

cd /opt/territory-lock

echo '=== DOCKERFILE ==='
cat Dockerfile

echo '=== COMPOSE APP BUILD ==='
python3 - <<'PY'
from pathlib import Path
text = Path('docker-compose.yml').read_text()
for line in text.splitlines():
    if any(term in line for term in ('build:', 'context:', 'dockerfile:', 'container_name:', 'volumes:', 'command:', 'image:')):
        print(line)
PY

echo '=== OLD PACKAGE SCRIPTS ==='
python3 - <<'PY'
import json
p=json.load(open('package.json'))
print(json.dumps(p.get('scripts',{}), indent=2))
print('dependencies=' + ','.join(sorted((p.get('dependencies',{}) or {}).keys())))
PY

echo '=== NEW PACKAGE SCRIPTS ==='
cd /opt/velo
python3 - <<'PY'
import json
p=json.load(open('package.json'))
print(json.dumps(p.get('scripts',{}), indent=2))
print('dependencies=' + ','.join(sorted((p.get('dependencies',{}) or {}).keys())))
PY
