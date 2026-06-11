#!/bin/zsh

# preview-manager.sh —— WebGen 预览服务总量治理
# 解决「每个项目预览常驻一个服务，累积占用系统资源」的问题。
# 不改动 project-preview.sh 的启动/复用逻辑，只在其上做跨项目治理。
#
# 用法:
#   preview-manager.sh list                 列出所有项目预览状态 + 实际端口/进程
#   preview-manager.sh stop <slug>           停止指定项目预览
#   preview-manager.sh stop-all             停止全部 WebGen 项目预览
#   preview-manager.sh stop-others <slug>   只保留 <slug>，停止其它所有预览
#   preview-manager.sh reap                 清理孤儿：pid 文件失联但端口仍被占用的残留 vite 进程
#   preview-manager.sh running-count         输出当前实际在 LISTEN 的预览数量
#   preview-manager.sh gate [slug]           门禁：超阈值(默认 8)时提示占资源并要求用户先关预览；超限返回退出码 10

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKSPACE_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
PROJECTS_ROOT="$WORKSPACE_ROOT/projects"
STOP_SCRIPT="$SCRIPT_DIR/project-preview-stop.sh"

# 预览数量门禁阈值（启动后超过该值则提示用户），可用环境变量 WEBGEN_PREVIEW_MAX 覆盖
PREVIEW_MAX=${WEBGEN_PREVIEW_MAX:-8}

usage() {
  sed -n '3,15p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
}

pid_alive() { kill -0 "$1" >/dev/null 2>&1; }

# 列出所有含 .webgen/config.json 的项目 slug
list_slugs() {
  for p in "$PROJECTS_ROOT"/*/; do
    slug=$(basename "$p")
    [ -f "$p/.webgen/config.json" ] || continue
    printf '%s\n' "$slug"
  done
}

# 读取项目记录的预览端口
project_port() {
  cfg="$PROJECTS_ROOT/$1/.webgen/config.json"
  node -e 'const d=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));process.stdout.write(String((d.preview&&d.preview.port)||""));' "$cfg" 2>/dev/null || true
}

cmd_list() {
  printf '%-26s %-7s %-9s %-8s %s\n' "PROJECT" "PORT" "STATE" "PID" "PORT_OWNER(实际)"
  printf '%-26s %-7s %-9s %-8s %s\n' "-------" "----" "-----" "---" "----------------"
  list_slugs | while IFS= read -r slug; do
    cfg="$PROJECTS_ROOT/$slug/.webgen/config.json"
    pidfile="$PROJECTS_ROOT/$slug/.webgen/preview.pid"
    port=$(project_port "$slug")
    state=$(node -e 'const d=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));const s=(d.preview&&d.preview.state)||{};process.stdout.write(s.status||"stopped");' "$cfg" 2>/dev/null || echo "?")
    pid=""
    [ -f "$pidfile" ] && pid=$(cat "$pidfile" 2>/dev/null || true)
    owner=""
    # 只看真正在 LISTEN 的进程，避免把浏览器到该端口的连接误判为占用者
    [ -n "$port" ] && owner=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null | tr '\n' ',' | sed 's/,$//')
    [ -z "$owner" ] && owner="-"
    printf '%-26s %-7s %-9s %-8s %s\n' "$slug" "${port:-?}" "$state" "${pid:--}" "$owner"
  done
}

cmd_stop() {
  slug=$1
  [ -d "$PROJECTS_ROOT/$slug" ] || { echo "No such project: $slug" >&2; exit 1; }
  zsh "$STOP_SCRIPT" "$slug"
}

cmd_stop_all() {
  list_slugs | while IFS= read -r slug; do
    zsh "$STOP_SCRIPT" "$slug" || true
  done
  cmd_reap
}

cmd_stop_others() {
  keep=$1
  list_slugs | while IFS= read -r slug; do
    [ "$slug" = "$keep" ] && continue
    zsh "$STOP_SCRIPT" "$slug" || true
  done
  echo "Kept running: $keep"
}

# 清理孤儿：项目记录的端口仍被 vite 进程占用，但该 pid 不在 pid 文件中（或 pid 文件已失联）
cmd_reap() {
  reaped=0
  list_slugs | while IFS= read -r slug; do
    pidfile="$PROJECTS_ROOT/$slug/.webgen/preview.pid"
    port=$(project_port "$slug")
    [ -n "$port" ] || continue
    tracked=""
    [ -f "$pidfile" ] && tracked=$(cat "$pidfile" 2>/dev/null || true)
    # 该端口上真正 LISTEN 的进程
    for owner in $(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null); do
      if [ "$owner" != "$tracked" ]; then
        # 仅清理确属 node/vite 的进程，避免误杀
        if ps -p "$owner" -o command= 2>/dev/null | grep -q "vite"; then
          kill -9 "$owner" >/dev/null 2>&1 || true
          echo "Reaped orphan vite pid $owner on port $port (project $slug)"
          reaped=$((reaped + 1))
        fi
      fi
    done
  done
  echo "Reap done."
}

# 统计当前真正在 LISTEN 的预览数（按项目记录的端口点名）
running_slugs() {
  list_slugs | while IFS= read -r slug; do
    port=$(project_port "$slug")
    [ -n "$port" ] || continue
    if lsof -nP -iTCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1; then
      printf '%s\n' "$slug"
    fi
  done
}

cmd_running_count() {
  running_slugs | grep -c . || true
}

# 门禁：如果启动新预览后会超过阈值，输出提示 + 清单 + 恢复方法，并以退出码 10 阻止启动。
# 传入 slug 时：若该项目已在运行，不计为新增（允许复用）。
cmd_gate() {
  want=${1:-}
  current=$(running_slugs)
  count=$(printf '%s\n' "$current" | grep -c . || true)

  already_running=0
  if [ -n "$want" ]; then
    if printf '%s\n' "$current" | grep -qx "$want"; then
      already_running=1
    fi
  fi

  # 启动后的预计数量
  projected=$count
  if [ "$already_running" -eq 0 ] && [ -n "$want" ]; then
    projected=$((count + 1))
  fi

  if [ "$projected" -le "$PREVIEW_MAX" ]; then
    exit 0
  fi

  # 超阈：输出提示与清单
  echo "GATE_BLOCKED"
  printf '⚠️ 当前已有 %s 个预览服务在运行，再启动新预览会超过上限（%s 个），可能占用过多系统资源。\n' "$count" "$PREVIEW_MAX"
  echo "请先关闭部分预览再继续。当前运行中的预览："
  printf '%s\n' "$current" | while IFS= read -r s; do
    [ -n "$s" ] || continue
    printf '  - %s  (端口 %s)\n' "$s" "$(project_port "$s")"
  done
  exit 10
}

[ "$#" -ge 1 ] || usage
action=$1
shift || true

case "$action" in
  list) cmd_list ;;
  stop) [ "$#" -eq 1 ] || usage; cmd_stop "$1" ;;
  stop-all) cmd_stop_all ;;
  stop-others) [ "$#" -eq 1 ] || usage; cmd_stop_others "$1" ;;
  reap) cmd_reap ;;
  running-count) cmd_running_count ;;
  gate) cmd_gate "${1:-}" ;;
  *) usage ;;
esac
