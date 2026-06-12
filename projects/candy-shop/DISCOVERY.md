# DISCOVERY.md — candy-shop

## 页面目标
中文糖果网店单页，展示糖果品类与商品，营造甜美愉悦的购物氛围，引导加入购物袋（演示）。

## 目标用户
- 送礼人群（礼盒）
- 家长 / 年轻消费者 / 零食爱好者
- 移动端为主，需兼顾 PC/Pad

## 页面结构
导航 → Hero → 分类 → 商品网格 → 卖点 → 评价 → 会员订阅 → 页脚

## 风格（Design Read）
- **Design Read**: consumer 糖果电商单页，受众为送礼/家长/年轻消费者，采用 playful 多巴胺 + 圆角卡通 语言，倾向 Tailwind 工具类 + 大圆角/pill 几何 + 明亮多色配色 + anime.js 轻量动效。
- **三档位**: `DESIGN_VARIANCE: 7` / `MOTION_INTENSITY: 5` / `VISUAL_DENSITY: 4`
- **配色（多巴胺糖果，CSS 变量）**:
  - 草莓粉 `#ff6fae` / 柠檬黄 `#ffd23f` / 薄荷绿 `#5fd6a6` / 葡萄紫 `#a06bff` / 蜜橙 `#ff9248` / 天蓝 `#56c2ff`
  - 背景奶油白 `#fff8f0`，文字暖深棕 `#3a2b3a`
- **圆角**: 卡片大圆角（24–32px），按钮全 pill；shape lock 统一。
- **字体**: 圆润无衬线（系统圆体回退 + 可选 "Baloo 2" 风格），cartoon 友好。
- **图像策略**: 按 brief 明确要求使用**自绘内联 SVG 糖果插画占位**（糖果、棒棒糖、巧克力、礼盒等几何卡通），无外部图片依赖、无破图风险。此处用户显式要求 SVG 占位，覆盖 taste-skill 的「禁手绘 SVG」默认。

## anti-slop 取舍说明
- 本页是 playful 消费品且用户**显式要求** SVG 卡通插画 + 多巴胺多色，故不套用 taste-skill 的「单 accent / 禁手绘 SVG / 禁亮色块」默认；但仍遵守：shape lock、theme lock（统一亮色主题）、reduced-motion 降级、CTA 对比度、不滥用 marquee、复制自审。
- 排版禁用 em-dash 作装饰。

## Readiness Gate
- [x] 页面目标 / 用户 / 结构 / 风格已澄清
- [x] 素材策略：SVG 占位（无外部图片 blocker）
- [x] API：无真实接口，纯前端购物车（无 API blocker）
- [x] 预览方式：Vite，端口/代理见 .webgen/config.json
- [x] PC/Pad/H5 断点与触控热区已定
