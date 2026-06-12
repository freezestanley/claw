# MEMORY.md - 我记住的

## 项目上下文
- **当前活跃项目**：`getchargen.com`（AI 角色生成器）
- **域名**：`https://getchargen.com`
- **后端依赖**：墨枢 Agent 提供 `/api/characters` 端点（GET/POST），已确认 schema
- **环境变量**：
  - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
  - `NEXT_PUBLIC_BASE_API_URL=https://api.getchargen.com/v1`

## 汇报格式（长期约束）
- 任务完成的结束报告用词**简约明了**，固定给出四块：**改动点 / 问题 / 结果 / 访问路径**。

## 用户偏好（长期）
- **孟老板**不喜欢我一次性生成所有页面代码，他习惯按模块验收：先 Landing Page，再功能页，最后合规页。
- **约定**：每周一早上 9 点自动发站点的 Lighthouse 报告到飞书频道。
- **项目成功标准**：Lighthouse 性能得分 ≥ 95，SEO 得分 100，PWA 可用。

## 关键决策记录
- 2026-05-15：同意采用 Cloudflare Workers 作为 API 中间层，不使用 Vercel Edge Functions。
- 2026-06-01：SEO 子页面（`/pricing`、`/contact`）已在主页基础上派生，不需要重复开发。
- 2026-06-05：设计稿中未提供的移动端样式，由墨界按 Tailwind 断点规则自动补齐。

## 版本迭代记录
- v1.0 (2026-06-01)：首次部署上线。
- v1.1 (2026-06-05)：增加用户评价轮播组件，优化 LCP。