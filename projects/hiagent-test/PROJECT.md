# hiagent 测试页面

## 项目摘要

- `slug`：`hiagent-test`
- 模板：`vite-page`
- 模式：**单页面项目**
- 技术栈：Vite + CDN 优先浏览器资源

## 当前目标

- 单页面，页面正中央显示文字「hiagent」，极简静态页。

## Readiness Gate

- Discovery：已确认（极简文案页）
- Assets：已确认（无素材需求）
- API：已确认（无 API）
- Preview：已确认（Vite 本地预览）
- Reuse Decision：已确认（纯静态，无需复用组件）
- Adaptation：已确认（PC/Pad/H5 文字居中 + 自适应字号）

适配要求：

- 覆盖 `PC / Pad / H5`
- 文字居中、响应式自适应字号

## Ready / Not Ready

- 当前状态：`Ready`

## Blockers

- 无

## 预览方式

- 默认使用 `pnpm dev`

## 关联文档

- [DISCOVERY.md](./DISCOVERY.md)
- [ASSETS.md](./ASSETS.md)
- [API.md](./API.md)
- [HANDOFF.md](./HANDOFF.md)

## 最近进展

- 基于 vite-page 模版生成项目，已实现 hiagent 居中文案页。
