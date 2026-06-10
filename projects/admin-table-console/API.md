# API

## 接口目标

- 为后台用户列表提供数据。

## Base URL

- 开发期：本地 `/api` 代理（Vite server.proxy）
- 真实目标：待确认（`.env` 设 `VITE_API_PROXY_TARGET`）

## 鉴权方式

- 待确认（预留 bearer / cookie）

## Endpoint 清单

- `GET /api/users` —— 返回用户列表（当前 mock，未真正调用）

返回结构（与 `MOCK_USERS` 同构）：

```jsonc
{
  "list": [
    { "id": 10001, "name": "李伟", "email": "user1@example.com", "role": "管理员", "status": "active", "created": "2026-01-08" }
  ]
}
// status 取值: active | pending | disabled
```

> 当前为客户端分页（一次取全量后前端分页/筛选/排序）。
> 数据量大时建议改为服务端分页：`GET /api/users?page=1&pageSize=10&keyword=&status=`，返回 `{ list, total }`，并把 page.js 的 applyFilter/pageRows 改为按服务端返回渲染。

## 代理约定

- 开发期默认 `/api`；远端目标在 `.env` 配 `VITE_API_PROXY_TARGET`。

## Blocking

- 当前状态：`Non-Blocking`（mock 模式，`USE_MOCK=true`）。
- 切真实接口：`src/generated/page.js` 中 `USE_MOCK=false`，后端按上述结构返回。

## 复用决策

- 请求复用 scaffold 自带 `src/lib/api.js`。
