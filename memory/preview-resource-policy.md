# 预览资源治理策略（常驻）

## 背景
每个项目预览会常驻一个 Vite 服务，项目多了会累积占用系统资源。

## 规则（用户 2026-06-10 确认）
- **预览数量上限 = 8**。当「启动新预览后正在运行的预览数会超过 8」时：
  1. 不直接启动；
  2. 提示用户「占用资源了，请确认」；
  3. 先列出当前运行中的预览（slug + 端口），要求用户先关闭部分预览；
  4. 给出如何恢复/重新预览的方法。
- 同一项目复用已运行的预览**不计为新增**（不会触发门禁）。

## 实现
- 门禁逻辑在 `scripts/preview-manager.sh`：
  - `running-count`：当前真正在 LISTEN 的预览数
  - `gate [slug]`：超阈值时输出提示 + 清单，退出码 10
  - 阈值可用环境变量 `WEBGEN_PREVIEW_MAX` 覆盖（默认 8）
- 已接入 `scripts/project-preview.sh`：启动新预览前先过 gate；被拦截则打印提示与恢复方法，退出码 10。
- 临时绕过门禁（用户已确认仍要启动）：`WEBGEN_PREVIEW_GATE=0 sh scripts/project-preview.sh <slug>`

## 治理命令速查
- 一览：`zsh scripts/preview-manager.sh list`
- 关单个：`sh scripts/project-preview-stop.sh <slug>`
- 只留一个：`zsh scripts/preview-manager.sh stop-others <slug>`
- 全部关：`zsh scripts/preview-manager.sh stop-all`
- 清理孤儿：`zsh scripts/preview-manager.sh reap`（带安全校验，只杀确属 vite 的进程）
- 重新预览：`sh scripts/project-preview.sh <slug>`（或进项目目录 `pnpm dev`）

## 注意
- 统计预览数只看真正 LISTEN 的进程，不把浏览器到该端口的连接误判为占用者。
