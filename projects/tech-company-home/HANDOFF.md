# Handoff

## 当前进度

- 项目脚手架已生成（vite-page 模板）。
- 科技公司官网首页已实现，深色科技风，板块齐全：
  导航 / Hero / 信任栏 / 产品(4) / 特性(6) / 数据指标(4) / 团队(4) / CTA 表单 / 页脚。
- 响应式：PC/Pad/H5，移动端汉堡菜单，锚点平滑滚动，CTA 表单前端演示。

## 改了哪些文件

- `index.html`（深色基底 + CDN + SEO meta）
- `src/main.js`（挂载首页到 #app）
- `src/generated/page.js`（首页主体实现）
- `DISCOVERY.md` / `API.md` / `ASSETS.md` / `PROJECT.md` / `.webgen/config.json`

## 如何预览

```sh
cd projects/tech-company-home
pnpm install
pnpm dev   # 默认端口 4267
```

## 下一步 / 剩余风险

- 替换真实品牌信息：公司名、slogan、产品文案、品牌色、logo、团队、客户 logo（均为占位）。
- CTA 留资接真实接口：`POST /api/leads`（API.md）。
- 如需浅色版本或更多板块（定价/FAQ/博客），可继续迭代。
