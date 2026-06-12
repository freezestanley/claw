# API.md — agent-admin-login

## 当前状态：演示态（无真实后端）

本登录页**不接真实后端**，所有登录交互均为前端模拟：

- 无真实 `/api/login` 调用。
- 提交后通过前端 `setTimeout` 模拟网络延迟（~1.2s）。
- 演示规则：
  - `admin / admin123` → 模拟登录成功（成功提示）。
  - 其它账号密码组合 → 模拟「账号或密码错误」。
- 「企业 SSO 登录」按钮为占位，不接真实 IdP，仅给演示提示。

## 预留
- 后续如接真实后端：登录走本地 `/api` 代理（Vite proxy 已配置 `/api` → 可配 target）。
- 建议契约（待定义）：`POST /api/auth/login { account, password, remember } → { token, profile }`。

## Blocker
- 无（演示态明确，无需真实接口）。
