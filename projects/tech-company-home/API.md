# API

## 接口目标

- 首页为静态展示，无强依赖接口。

## Endpoint 清单

- 可选：`POST /api/leads` —— CTA 邮箱订阅/留资（当前为前端演示占位，未真正调用）。
  - body: `{ "email": "user@company.com" }`

## 代理约定

- 如接入留资接口，开发期走 `/api` 代理，`.env` 配 `VITE_API_PROXY_TARGET`。

## Blocking

- 当前状态：`Non-Blocking`（纯展示首页，无接口即可交付）。

## 复用决策

- 如需提交表单，复用 scaffold 自带 `src/lib/api.js`。
