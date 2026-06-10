# 运营数据 Dashboard

- **Slug**：`ops-data-dashboard`
- **类型**：单页面数据 Dashboard（vite-page 模板）
- **状态**：active（mock 模式，可预览交付）
- **创建来源**：main agent 转交 → 用户选「按默认方案做」

## 概述

通用网站运营数据 dashboard，单页面集中展示核心运营指标。

## 结构

- 顶部栏（标题 + 更新时间 + 周期/数据来源标识）
- 4 个 KPI 卡片：访问量 / 活跃用户 / 转化率 / 营收
- 访问趋势折线（PV + 用户数）
- 渠道占比环形图
- 地区分布柱状图（Top 7 省份）
- 热门页面明细表格

## 技术

- 单页面 + Vite 本地预览
- Tailwind CDN + ECharts CDN + Lucide + Axios
- 浅色主题，PC / Pad / H5 自适应
- 数据 mock，预留 `/api` 代理切真实接口

## 关键文件

- `src/generated/page.js`：dashboard 主体（结构 + mock 数据 + ECharts 渲染）
- `src/main.js`：将 dashboard 挂载到 `#app`
- `index.html`：CDN 依赖 + 浅色基底
- `.webgen/config.json`：预览端口 `4347`、代理规则

## 预览

```sh
cd projects/ops-data-dashboard
pnpm install   # 或 npm install
pnpm dev       # Vite, 端口见 .webgen/config.json (4347)
```

## 当前状态 / Blocker

- 无 blocker（mock 模式）。
- 切真实接口需后端提供 `GET /api/dashboard/overview`（结构见 API.md）。
