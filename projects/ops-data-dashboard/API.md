# API

## 接口目标

- 为 dashboard 提供运营总览数据（KPI / 趋势 / 渠道 / 地区 / 热门页面）。

## Base URL

- 开发期：本地 `/api` 代理（Vite server.proxy）
- 真实目标：待确认（接入时填 `VITE_API_PROXY_TARGET`）

## 鉴权方式

- 待确认（预留 bearer / cookie，按真实后端确定）

## Endpoint 清单

- `GET /api/dashboard/overview` —— 返回与下述结构同构的 JSON（当前为 mock，未真正调用）

返回结构（与 `src/generated/page.js` 中 `MOCK_DATA` 同构）：

```jsonc
{
  "updatedAt": "2026-06-10 17:20",
  "kpis": [{ "key": "pv", "label": "访问量 (PV)", "value": 128430, "delta": 12.4, "icon": "eye", "unit": "" }],
  "trend": { "days": ["06-04"], "pv": [9800], "users": [3200] },
  "channels": [{ "name": "自然搜索", "value": 4231 }],
  "regions": { "names": ["广东"], "values": [8240] },
  "table": [{ "page": "/", "title": "首页", "pv": 42310, "uv": 18230, "bounce": 32.1, "avg": "02:14" }]
}
```

## 代理约定

- 开发期默认使用 `/api`
- 远端代理目标：在 `.env` 中设 `VITE_API_PROXY_TARGET`（默认占位 `http://127.0.0.1:8787`）

## Blocking

- 当前状态：`Non-Blocking`
- 默认 mock 模式（`USE_MOCK = true`），无需真实接口即可交付预览。
- 切真实接口：将 `src/generated/page.js` 中 `USE_MOCK` 改为 `false`，后端按上述结构返回即可。

## 复用决策

- 请求封装复用 scaffold 自带 `src/lib/api.js`（Axios + fetch 回退）。
