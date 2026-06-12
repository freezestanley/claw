# PROJECT.md — 可可熊 CocoBear 儿童巧克力落地页

- **slug**: kids-chocolate-landing
- **类型**: 单页中文营销落地页（演示占位品牌）
- **品牌**: 可可熊 CocoBear（虚构占位，无真实商标）
- **栈**: Vite (vanilla JS) + Tailwind CDN + anime.js；纯内联 SVG 插画
- **状态**: 已定稿交付（已实现 + 正式 build + 三端截图自检通过 + 用户确认无修改）

## 主色与基调
- 可可棕 `#6B4226` / 奶油白 `#FFF8EF` + 糖果点缀（橙 `#FF9E45` / 莓红 `#F0586B` / 薄荷 `#7FD4B6`）
- 兼顾孩子可爱感（吉祥物、糖果插画）与家长安全感（安全营养信任模块）

## 页面模块（6 个）
1. Hero（吉祥物 + 主张 + 双 CTA）
2. 产品系列（4 款占位包装 SVG，移动端横向滑动）
3. 原料卖点（真实可可 / 低糖 / 无氢化油 / 天然色香）
4. 安全营养（家长安心：检测 / 过敏原 / 溯源）
5. 品牌故事
6. 购买引导 + FAQ（手风琴）

## 关键文件
- `index.html` —— 文档头、Tailwind 主题、字体、reduced-motion 降级
- `src/main.js` —— 挂载入口
- `src/generated/page.js` —— 页面结构、数据、交互/动效
- `src/generated/svg.js` —— 内联 SVG 插画库（吉祥物/产品/糖果）
- `docs/shots/` —— PC / Pad / H5 自检截图

## 预览 / 构建
- 预览: `pnpm install && pnpm dev`（端口 4369）
- 构建: `pnpm build` → 产物在 `dist/`，并生成 `dist.zip`

## Readiness Gate
全部满足（见 DISCOVERY.md），无 API/素材 blocker。
