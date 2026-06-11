# PROJECT.md — ÉLAN 伊岚 · 女装时尚网店首页

- **slug**：`women-fashion-store`
- **类型**：单页女装电商首页（H5 优先，PC/Pad 兼容）
- **背景**：经 main 纠偏后按「女装」重建（与戒指项目 jewelry-ring-store 无关，不复用）
- **技术栈**：Vite + 原生 JS + Tailwind(CDN) + Fraunces/思源宋黑字体
- **风格**：清新轻奢女装基调，象牙白 + 胭脂玫瑰 (ivory #fbf7f4 / rose #c9899a / ink #332b2a)
- **状态**：active

## 页面结构
公告滚动条 → 导航(含购物袋) → Hero 主视觉 → 分类导航(连衣裙/上衣/外套/裤装) → 本季新品网格(8 款女装单品·带价格·可加购) → 限时促销 Banner → 品牌故事 → 价值主张 → 会员订阅 → 页脚 → 购物袋抽屉

## 关键点
- 商品图：内联 SVG **女装衣形插画**（连衣裙/衬衫/外套/裤装/半裙的衣形剪影），明确服饰语义，非人像、非珠宝
- 交互：加入购物袋(抽屉+角标弹跳+小计)、移动端菜单、邮箱订阅、滚动入场、商品图 hover 放大

## 文件
- `index.html` / `src/main.js` / `src/garments.js`(衣形 SVG) / `src/style.css`

## 预览
```bash
cd projects/women-fashion-store
pnpm install
pnpm dev   # http://127.0.0.1:4325
```

## 默认假设（待替换）
品牌名 ÉLAN 伊岚(占位)、SVG 衣形占位图、价格/门店/备案号占位、仅首页、购物袋前端演示无后端。
