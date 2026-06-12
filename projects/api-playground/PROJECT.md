# API 联调演示台 (api-playground)

## 项目摘要

- `slug`：`api-playground`
- 模板：`vite-page`
- 模式：**单页面项目**（开发者联调工具，非营销站）
- 技术栈：Vite + vanilla JS + CDN（Tailwind / anime.js）

## 当前目标

- 实现一个独立的「API 联调演示页」，对接三个后端接口做真实 fetch 联调：
  1. `POST /upload`（multipart 文件上传）
  2. `GET /users/search`（用户搜索 + 分页）
  3. `POST /auth/login`（JSON 登录，Base64 mock token）
- Base URL 可在页面顶部配置，默认 `http://localhost:3000`，存 localStorage。

## Readiness Gate

- Discovery：✅ 已确认（dev-tool 风格，PC/Pad/H5）
- Assets：✅ 无需图片素材（纯工具界面）
- API：✅ 三个接口契约已由 main 提供
- Preview：✅ Vite 本地预览
- Reuse Decision：✅ 复用 Tailwind/anime.js CDN，自写逻辑
- Adaptation：✅ PC/Pad/H5 响应式

## Ready / Not Ready

- 当前状态：`Ready`（已实现并验证）

## 预览方式

- `pnpm install && pnpm dev`
- 端口：`http://127.0.0.1:4369/`
- 注意：前端直连用户填写的 Base URL，CORS 由后端处理，不依赖 Vite `/api` 代理。

## 关联文档

- [DISCOVERY.md](./DISCOVERY.md)
- [ASSETS.md](./ASSETS.md)
- [API.md](./API.md)
- [HANDOFF.md](./HANDOFF.md)

## 最近进展

- 项目初始化、三块联调区实现完成，CDP 实地验证通过。
