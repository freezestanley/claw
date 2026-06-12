# API.md — girls-bow-store

## 概述

本项目为**纯展示型单页网店首页**，当前**无真实后端 API**。

## 接口

- 无远端业务接口。
- 商品数据：写死在 `src/main.js` 的 `products` 数组（前端静态）。

## 订阅 / 关注表单

- 邮箱订阅为**前端 mock**：提交后本地显示成功提示，不发请求、不存储。
- 后续若接真实订阅后端：走本地 `/api` 代理（vite.config.js 已配 `/api` → `VITE_API_PROXY_TARGET`），契约与鉴权再确认。

## 代理

- 开发期 `/api` 代理已在 `vite.config.js` 预留；当前无端点使用。
- `mockAllowed`: 仅前端展示级 mock，无网络 mock 服务。

## 状态

- 非阻塞：页面不依赖任何外部接口即可完整运行。
