# PROJECT.md — LUMIÈRE 璐米 · 戒指网店首页

- **slug**：`jewelry-ring-store`
- **类型**：单页面网店首页（H5 优先，PC / Pad 兼容）
- **技术栈**：Vite + 原生 JS + Tailwind(CDN) + Google Fonts
- **风格**：清新轻奢，米白 (#faf7f2) + 香槟金 (#c8a96a)
- **品类**：戒指（婚嫁 / 日常 / 定制）
- **状态**：active

## 页面结构
固定导航 → Hero 主视觉 → 戒指系列橱窗(4 款) → 品牌故事 → 匠心工艺(4 步) → 客户之声 → 预约表单 → 页脚

## 文件
- `index.html` — 入口 + Tailwind 主题(米白/香槟金) + 字体
- `src/main.js` — 整页内容 + 交互(心愿/预约/滚动入场)
- `src/rings.js` — 内联 SVG 戒指插画(占位主视觉)
- `src/style.css` — 金色渐变、动画、按钮、毛玻璃导航

## 预览
```bash
cd projects/jewelry-ring-store
pnpm install
pnpm dev   # http://127.0.0.1:4322
```

## 待确认 / 可迭代
- 真实产品图、品牌名（当前用占位品牌 LUMIÈRE 璐米 + SVG 戒指）
- 真实价格、门店信息、ICP 备案号
- 如需购物车/结算/商品详情页，再扩展
