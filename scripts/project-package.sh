#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
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
DEPS_JSON="$PROJECT_ROOT/.webgen/deps.json"
ENV_STATUS_JSON="$PROJECT_ROOT/.webgen/env-status.json"

if [ ! -f "$DEPS_JSON" ]; then
  echo "Missing deps config under $PROJECT_ROOT/.webgen" >&2
  exit 1
fi

BUILD_CMD=$(node -e "const fs=require('fs'); const data=JSON.parse(fs.readFileSync(process.argv[1], 'utf8')); process.stdout.write(String(data.commands.build));" "$DEPS_JSON")

(
  cd "$PROJECT_ROOT"
  sh -c "$BUILD_CMD"
)

ARTIFACT_DIR="$PROJECT_ROOT/dist"
if [ ! -d "$ARTIFACT_DIR" ]; then
  echo "Build completed but dist/ was not found under $PROJECT_ROOT" >&2
  exit 1
fi

if [ -f "$ENV_STATUS_JSON" ]; then
  node -e "const fs=require('fs'); const file=process.argv[1]; const data=JSON.parse(fs.readFileSync(file, 'utf8')); data.nodeInstalled=true; data.lastCheckedAt=new Date().toISOString(); data.lastBuildAt=new Date().toISOString(); fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');" "$ENV_STATUS_JSON"
fi

printf 'Artifact directory: %s\n' "$ARTIFACT_DIR"
printf 'Next actions:\n'
printf -- '- Verify preview output if needed\n'
printf -- '- Package or send dist/ contents to the user\n'
