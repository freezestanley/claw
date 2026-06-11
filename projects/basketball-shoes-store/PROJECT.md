# PROJECT.md — APEX KICKS 锋锐 · 篮球鞋网店首页

- **slug**：`basketball-shoes-store`
- **类型**：单页篮球鞋电商首页（H5 优先，PC/Pad 兼容）
- **技术栈**：Vite + 原生 JS + Tailwind(CDN) + Google Fonts(Archivo Black/Oswald)
- **风格**：运动潮流暗色高能量，炭黑底 + 电光绿 (#c6f135) + 烈焰橙 (#ff5a1f)
- **状态**：active（默认假设版，待用户细化）

## 页面结构
公告滚动条 → 导航(含购物袋) → Hero(浮动球鞋+性能数字) → 明星签名款 Banner → 全部球鞋网格(6 款, 可加购) → 球鞋科技(4 卖点) → 球员口碑 → 会员 CTA → 页脚 → 购物袋抽屉

## 交互
加入购物袋(抽屉+角标弹跳+小计)、移动端菜单、邮箱订阅、滚动入场、球鞋 hover 旋转放大

## 文件
- `index.html` — 入口 + Tailwind 主题 + 字体
- `src/main.js` — 整页内容 + 购物袋/菜单/订阅/动画
- `src/shoe.js` — 内联 SVG 篮球鞋侧视插画(多配色)
- `src/style.css` — 动画、抽屉、按钮、球场网格纹理

## 预览
```bash
cd projects/basketball-shoes-store
pnpm install
pnpm dev   # http://127.0.0.1:4324
```

## 默认假设（待用户确认/替换）
- 品牌名 APEX KICKS 锋锐(占位)
- 球鞋图：SVG 插画占位(无真实图)
- 价格/型号/参数/备案号占位
- 仅首页，购物袋为前端演示，无真实结算后端
