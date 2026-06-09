# 养老保险产品落地宣传页

## 项目摘要

- `slug`：`elderly-pension-landing`
- 模板：`vite-page`
- 模式：**单页面项目**
- 技术栈：Vite + CDN 优先浏览器资源（Tailwind / Web Awesome / Lucide）

## 当前目标

- 单页静态落地页，展示养老保险产品介绍文案。
- 暖色调视觉，配老人运动场景图片。
- 纯静态、无 API 调用。

## Readiness Gate

- Discovery：已确认（目标=保险产品宣传落地页 / 风格=暖色 / 内容=产品介绍文案 / 主题=养老）
- Assets：已确认（无指定品牌素材，使用暖色默认方案 + 公共 CDN 占位图）
- API：已确认（无 API，纯静态）
- Preview：已确认（Vite dev，端口 4173）
- Reuse Decision：已确认（复用 Tailwind + Web Awesome + Lucide，无需自定义组件库）

## Ready / Not Ready

- 当前状态：`Ready`

## Blockers

- 无

## 预览方式

- `pnpm install && pnpm dev`（端口 4173）
- 无 `/api` 代理需求

## 关联文档

- [DISCOVERY.md](./DISCOVERY.md)
- [ASSETS.md](./ASSETS.md)
- [API.md](./API.md)
- [HANDOFF.md](./HANDOFF.md)

## 最近进展

- 2026-06-09 项目初始化，Readiness Gate 通过，进入实现。
