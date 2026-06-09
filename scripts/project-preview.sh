#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKSPACE_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
GUARD_SCRIPT="$SCRIPT_DIR/project-guard.sh"

usage() {
  echo "Usage: $0 <project-slug>" >&2
  exit 1
}

if [ "$#" -ne 1 ]; then
  usage
fi

SLUG=$1
PROJECT_ROOT=$(sh "$GUARD_SCRIPT" "$SLUG")
CONFIG_JSON="$PROJECT_ROOT/.webgen/config.json"
PID_FILE="$PROJECT_ROOT/.webgen/preview.pid"
LOG_FILE="$PROJECT_ROOT/.webgen/preview.log"

if [ ! -f "$CONFIG_JSON" ]; then
  echo "Missing .webgen/config.json under $PROJECT_ROOT/.webgen" >&2
  exit 1
fi

read_json_field() {
  file=$1
  expr=$2
  node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync(process.argv[1], 'utf8')); const value=(function(){ return $expr; })(); if (value === undefined || value === null) process.exit(2); process.stdout.write(String(value));" "$file"
}

DEV_CMD=$(read_json_field "$CONFIG_JSON" "data.deps.commands.dev")
HEALTHCHECK=$(read_json_field "$CONFIG_JSON" "data.preview.healthcheck")

if [ -f "$PID_FILE" ]; then
  OLD_PID=$(cat "$PID_FILE")
  if kill -0 "$OLD_PID" 2>/dev/null; then
    printf 'Preview already running: %s\n' "$HEALTHCHECK"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

(
  cd "$PROJECT_ROOT"
  nohup sh -c "$DEV_CMD" > "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
)

attempt=0
while [ "$attempt" -lt 20 ]; do
  if curl -fsS "$HEALTHCHECK" >/dev/null 2>&1; then
    node -e "const fs=require('fs'); const file=process.argv[1]; const data=JSON.parse(fs.readFileSync(file, 'utf8')); data.envStatus.nodeInstalled=true; data.envStatus.lastCheckedAt=new Date().toISOString(); data.envStatus.lastPreviewAt=new Date().toISOString(); fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');" "$CONFIG_JSON"
    printf 'Preview ready: %s\n' "$HEALTHCHECK"
    exit 0
  fi
  attempt=$((attempt + 1))
  sleep 1
done

echo "Preview did not become healthy: $HEALTHCHECK" >&2
exit 1
