#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKSPACE_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
SLUG="preview-regression"
PROJECT_ROOT="$WORKSPACE_ROOT/projects/$SLUG"
CONFIG_JSON="$PROJECT_ROOT/.webgen/config.json"
PID_FILE="$PROJECT_ROOT/.webgen/preview.pid"

cleanup() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE" 2>/dev/null || true)
    if [ -n "${PID:-}" ]; then
      kill "$PID" 2>/dev/null || true
    fi
  fi
  rm -rf "$PROJECT_ROOT"
}

trap cleanup EXIT

bash "$WORKSPACE_ROOT/scripts/project-init.sh" "$SLUG" demo-site >/dev/null
(
  cd "$PROJECT_ROOT"
  pnpm install >/dev/null
)

bash "$WORKSPACE_ROOT/scripts/project-preview.sh" "$SLUG" >/dev/null

PID=$(cat "$PID_FILE")
HEALTHCHECK=$(node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync(process.argv[1], 'utf8')); process.stdout.write(data.preview.healthcheck);" "$CONFIG_JSON")

kill -0 "$PID"
curl -fsS "$HEALTHCHECK" >/dev/null
sleep 1
kill -0 "$PID"
curl -fsS "$HEALTHCHECK" >/dev/null

echo "preview persistence ok"
