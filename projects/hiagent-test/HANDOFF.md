# Handoff

## 当前状态

- 已实现 hiagent 居中文案页，本地预览验证通过。

## 最近改动

- 基于 vite-page 模版生成脚手架。
- 修复（SO-007）：补回此前误删的 `src/lib/cookie.js`、`src/lib/api.js`、`src/runtime/create-preview-runtime.js`、`src/runtime/render-preview-shell.js`。
- 恢复 `src/main.js` 为模版标准版本，保留 `CookieUtil.log()` 与 runtime/health 执行链路。
- `src/generated/page.js` 保持本项目正文：正中央显示「hiagent」，三端 clamp 自适应字号；index.html 恢复 Tailwind/lucide CDN 以支撑预览壳。

## 下一步

- 等待用户确认是否还有修改；无修改后进入 build 流程。

## 预览命令

- 默认：`pnpm dev`

## 打包说明

- 默认：`pnpm build`（产物 dist + dist.zip）

## 风险与注意事项

- 纯静态页，无 API/素材依赖，风险低。
