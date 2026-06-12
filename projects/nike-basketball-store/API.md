# API — nike basketball store

## 概述
纯前端演示页面，**无远端 API 依赖**。商品数据为页面内静态数组，购物袋状态为前端内存状态（不持久化）。

## 数据
- 商品列表：硬编码在 `src/generated/page.js` 的 `PRODUCTS` 数组（id/name/series/price/colorway/svg 变体）。
- 购物袋：内存中的 `cart` 状态（Map），刷新即清空。

## 代理
开发期 `/api` 代理保留 scaffold 默认配置但未使用。预览壳的 `/api/health` 探测会落到 warning（预期，无后端）。

## 鉴权
无。

## 状态
无 API blocker。结算为演示交互（toast/alert），不发起真实请求。
