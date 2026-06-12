#!/bin/sh

# project-verify-scaffold.sh
# 校验已生成项目的脚手架文件清单与模版 scaffold 一致，
# 防止「新建项目时自行精简/裁剪脚手架」（如丢失 src/lib/cookie.js）。
#
# 用法: sh scripts/project-verify-scaffold.sh <project-slug> <template-id>
# 退出码: 0=一致通过 1=参数/路径错误 2=缺失脚手架文件（校验失败）

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKSPACE_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
PROJECTS_ROOT="$WORKSPACE_ROOT/projects"
TEMPLATES_ROOT="$WORKSPACE_ROOT/templates"

usage() {
  echo "Usage: $0 <project-slug> <template-id>" >&2
  exit 1
}

if [ "$#" -ne 2 ]; then
  usage
fi

SLUG=$1
TEMPLATE_ID=$2

case "$SLUG" in
  *[!a-z0-9-]* | "" )
    echo "Invalid project slug: $SLUG" >&2
    exit 1
    ;;
esac

SCAFFOLD_ROOT="$TEMPLATES_ROOT/$TEMPLATE_ID/scaffold"
PROJECT_ROOT="$PROJECTS_ROOT/$SLUG"

if [ ! -d "$SCAFFOLD_ROOT" ]; then
  echo "Template scaffold not found: $SCAFFOLD_ROOT" >&2
  exit 1
fi

if [ ! -d "$PROJECT_ROOT" ]; then
  echo "Project not found: $PROJECT_ROOT" >&2
  exit 1
fi

# 列出 scaffold 下所有相对路径文件（排除可被业务覆盖的 lockfile 噪声不在此列；
# scaffold 内的文件都视为必须存在的脚手架基线）。
MISSING=0
MISSING_LIST=""

# 用 find 收集 scaffold 相对路径，逐个核对项目内是否存在。
SCAFFOLD_ABS=$(CDPATH= cd -- "$SCAFFOLD_ROOT" && pwd)

for rel in $(cd "$SCAFFOLD_ABS" && find . -type f | sed 's|^\./||'); do
  if [ ! -f "$PROJECT_ROOT/$rel" ]; then
    MISSING=1
    MISSING_LIST="$MISSING_LIST\n  - $rel"
  fi
done

if [ "$MISSING" -ne 0 ]; then
  echo "SCAFFOLD VERIFY FAILED: project '$SLUG' is missing scaffold files copied from template '$TEMPLATE_ID':" >&2
  # shellcheck disable=SC2059
  printf "$MISSING_LIST\n" >&2
  echo "" >&2
  echo "Fix: regenerate scaffold via 'sh scripts/project-init.sh $SLUG $TEMPLATE_ID'" >&2
  echo "or copy the missing files from '$SCAFFOLD_ROOT'. Do NOT hand-trim the scaffold." >&2
  exit 2
fi

echo "SCAFFOLD VERIFY OK: project '$SLUG' matches template '$TEMPLATE_ID' scaffold file set."
exit 0
