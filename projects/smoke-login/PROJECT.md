# PROJECT.md — smoke-login

- **slug**: smoke-login
- **sessionKey**: agent:webgen:proj-smoke-login-9f2a
- **类型**: 单页面 · 登录页(冒烟测试)
- **目标**: 验证 v2 调度链路;最小可用登录页
- **需求**: 用户名 + 密码表单 + 登录按钮,清新简约风,PC/H5 自适应
- **登录逻辑**: 纯前端模拟 — 非空账号密码 → "登录成功";任一为空 → 提示必填
- **后端**: 无
- **预览**: 静态单文件 index.html(无构建依赖)

## 状态
- [x] SO-006 自检 (NO_LOCK → 干净)
- [x] 锁定 slug
- [x] 页面实现
- [x] 预览验证
