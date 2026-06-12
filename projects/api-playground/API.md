# API 契约

Base URL（默认）：`http://localhost:3000`（页面可配置，存 localStorage `apiPlayground.baseUrl`）。
前端直连，CORS 由后端 OPTIONS 预检（204）处理，**不走 Vite `/api` 代理**。

## 1. POST /upload

- Content-Type：`multipart/form-data`（用 FormData，**不手动设 Content-Type**，浏览器自动加 boundary）。
- 字段名任意；最多 5 个文件；每个 ≤10MB；任意 MIME。
- 成功 `201`：`{ success, message, files: [{ originalName, savedName, mimetype, size, path }] }`
- 无文件 `400`：`{ success:false, message }`
- `path` 可拼 Base URL 给可点链接。

## 2. GET /users/search

- Query：
  - `q`：模糊匹配名/邮箱
  - `role`：精确，`admin` / `user` / `editor`
  - `department`：精确（如 `技术部`，需 `encodeURIComponent`）
  - `page`：默认 1，≥1
  - `pageSize`：默认 10，范围 1–50
- 多参数 AND 交集。
- 成功 `200`：响应头 `X-Total-Count`（=`pagination.total`）；
  body `{ success, data:[{id,name,email,role,department}], pagination:{page,pageSize,total,totalPages} }`
- 注意：fetch 跨域读 `X-Total-Count` 需后端在 `Access-Control-Expose-Headers` 暴露；读不到时回退用 `pagination.total`。

## 3. POST /auth/login

- Content-Type：`application/json`，body `{ username, password }` 均必填。
- 带 `Authorization` 头或 `application/json` 触发浏览器 `OPTIONS` 预检（服务端自动 `204`）。
- 成功 `200`：`{ success, token(Base64 mock，非真 JWT), user:{id,name,email,role,department}, expireAt(ISO，7天) }`
- 失败 `401`：`{ success:false, message }`
- 缺参 `400`：`{ statusCode, error, message }`
- token/expireAt 存 localStorage（`apiPlayground.token` / `apiPlayground.expireAt` / `apiPlayground.user`）；
  后续请求带 `Authorization: Bearer <token>`。
- 测试账号：`admin` / `admin123`。

## 错误兜底

- 三块均需处理网络错误 / 连接失败（`localhost:3000` 未启动时给明确提示，不白屏、无未捕获异常）。
- 登录区即使无 token 也带 `Authorization: Bearer placeholder` 以触发预检（按需求）。
