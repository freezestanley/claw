# Handoff

## 当前状态

- 单页 API 联调台已实现，CDP 实地验证通过。
- session 已锁定 slug `api-playground`（见 `.webgen/session-lock.json`），仅服务本项目。

## 关键文件

- `index.html`：CDN 引入 + 顶部 viewport/字体。
- `src/main.js`：全部联调逻辑（Base URL 管理、登录/搜索/上传、错误兜底、状态可视化）。
- `vite.config.js`：dev server，端口 4369（保留 `/api` 代理但本项目不依赖）。

## 预览

- `cd projects/api-playground && pnpm install && PORT=4369 pnpm dev`
- 访问 `http://127.0.0.1:4369/`
- 真实联调需后端起在 `http://localhost:3000`（页面顶部可改 Base URL）。

## 设计要点

- dev-tool 风格：slate 中性 + emerald 强调，等宽字体呈现响应体。
- 每个请求展示：HTTP 状态码 + 耗时(ms) + 原始响应体(JSON 高亮)。
- 三块均有网络错误兜底（后端未起时明确提示，不白屏）。

## 剩余风险 / 注意

- `X-Total-Count` 跨域读取依赖后端 `Access-Control-Expose-Headers`；读不到自动回退 `pagination.total`。
- token 为 Base64 mock，非真 JWT；仅作演示存 localStorage。
- 未做生产 build（按流程：开发完成 → 追问用户是否还改 →（无修改）→ build）。
