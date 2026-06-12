# API.md — 后端联调

## Base URL
- 默认 `http://localhost:3000`，页面顶部可配置，存 `localStorage` key `ashfall.apiBaseUrl`。
- **实测后端已在运行**，三个接口真实联调成功（搜索返回 6 条真实用户数据）。

## 接口

### 1) POST /upload
- multipart/form-data，FormData 不手动设 Content-Type（浏览器自动带 boundary）。
- 前端：多选 ≤5、单个 ≤10MB 前置校验、显示文件名/大小。
- 成功 201 → 渲染 files 表格（originalName/savedName/mimetype/size/path），path 拼 Base URL 成可点链接。
- 无文件 400 → 友好错误提示。

### 2) GET /users/search
- Query：q(模糊)、role(admin/user/editor 下拉)、department(精确)、page(≥1)、pageSize(1–50)。
- 中文参数走 `URLSearchParams`（自动 encode）。
- 读响应头 `X-Total-Count` 作为总数（回退 pagination.total），渲染表格 + 上/下翻页。

### 3) POST /auth/login
- application/json，带 `Authorization: Bearer <token|preflight>` 头 → 触发浏览器 OPTIONS 预检（服务端 204）。
- 成功 200 → token/expireAt/user 存 localStorage（`ashfall.authToken/authExpireAt/authUser`），展示 user 信息 + 过期时间。
- 401/400 → 友好错误提示；「清除 token」按钮清 localStorage。
- 测试账号：admin / admin123。

## 错误兜底
- `ApiError` 区分 `network`（连接失败/CORS 阻断 → fetch TypeError）与 `http`（非 2xx）。
- 后端没起时给「无法连接后端服务」明确提示，不白屏、无未捕获异常（CDP 实测 errors=[]）。

## 联调页入口
- hash 路由 `#/tools`（或 `#/api-demo`），与 ASHFALL 首页共存。
- 首页 footer 有「开发者联调」入口；联调页有「← 返回官网」。
