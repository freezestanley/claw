# API.md — dunk-hero

## 概述
本项目是纯宣传 / 落地页，无强后端依赖。

## 报名 / 订阅
- 前端表单（姓名 + 邮箱/手机）。
- 开发期：提交走**前端 mock**（无真实后端），本地校验 + 成功态反馈。
- 若后续接真实接口：开发期统一走本地 `/api` 代理（vite proxy 已配置 `/api`）。

## 代理
- vite proxy：`/api` → `VITE_API_PROXY_TARGET`（默认 `http://127.0.0.1:8787`）。
- 当前无真实端点，`/api/health` 失败为预期态。

## 状态
- 无 blocker。报名 mock 即可交付。
