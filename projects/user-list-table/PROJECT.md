# PROJECT — user-list-table

通用用户列表页 demo（table + 搜索筛选 + 分页 + 行详情查看）。独立单页面项目，不复用其它项目代码。

- **slug**: user-list-table
- **类型**: 单页面管理后台风列表页
- **数据源**: `GET /users/search`，Base URL `http://localhost:3000`（可配置）；无后端时降级 mock
- **技术**: Vite + 原生 JS + Tailwind(CDN) + Axios(CDN)
- **适配**: PC / Pad / H5 自适应

## 状态
- [x] session-lock 锁定
- [x] Discovery
- [x] 方案确认（用户已授权直接开工）
- [x] 实现
- [x] CDP 验证
- [ ] 交付确认
