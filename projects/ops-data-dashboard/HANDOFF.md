# Handoff

## 当前进度

- 项目脚手架已生成（vite-page 模板）。
- Dashboard 已实现：4 KPI 卡片 + 访问趋势折线 + 渠道占比环形 + 地区分布柱状 + 热门页面表格。
- 浅色主题，PC / Pad / H5 自适应；图表用 ECharts，窗口变化自动 resize。
- 数据为 mock（`USE_MOCK=true`），预留 `/api` 代理。

## 改了哪些文件

- `index.html`（浅色基底 + ECharts CDN）
- `src/main.js`（直接挂载 dashboard 到 #app）
- `src/generated/page.js`（dashboard 主体实现）
- `DISCOVERY.md` / `API.md` / `ASSETS.md` / `PROJECT.md` / `.webgen/config.json`（落实默认方案、清除 blocker）

## 如何预览

```sh
cd projects/ops-data-dashboard
pnpm install
pnpm dev   # 默认端口 4347（见 .webgen/config.json）
```

## 下一步 / 剩余风险

- 接真实数据：`src/generated/page.js` 中 `USE_MOCK=false`，后端按 API.md 结构返回 `GET /api/dashboard/overview`，并设 `.env` 的 `VITE_API_PROXY_TARGET`。
- 如需更多图表/指标或深色主题，可在 `page.js` 扩展。
