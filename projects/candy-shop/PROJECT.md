# PROJECT.md — 糖糖屋 Sweetie Hut（candy-shop）

- **slug**: candy-shop
- **session**: agent:webgen:proj-candy-shop（单 session 锁定）
- **类型**: 中文糖果网店单页（演示，非真实结账）
- **品牌名**: 糖糖屋 Sweetie Hut（默认占位，可替换）
- **风格**: 多巴胺糖果配色 + 圆角卡通风
- **技术栈**: Vite + 原生 JavaScript + Tailwind CSS(CDN) + anime.js(轻量动效)
- **页面模式**: single-page
- **适配目标**: PC / Pad / H5，支持 prefers-reduced-motion 降级

## 页面模块（自上而下）
1. 顶部导航（品牌 + 锚点 + 购物袋角标）
2. Hero（slogan + 主/次 CTA + 糖果 SVG 插画）
3. 分类（软糖 / 巧克力 / 棒棒糖 / 口香糖 / 硬糖 / 礼盒）
4. 商品网格（卡片 + 加入购物袋）
5. 卖点（无人工色素 / 礼盒装 / 顺丰冷链 等）
6. 用户评价
7. 会员 / 订阅（邮箱订阅占位）
8. 页脚

## 交互
- 轻量前端购物车：加购抽屉（Drawer）+ 数量角标 + 增减/删除/小计，**非真实结账**。

## 状态
- 已完成 Discovery / Readiness Gate
- 实现中
