# DISCOVERY.md — dunk-hero

## 项目目标
漫画风格、篮球飞人主题的**单页宣传/落地页**。营造"扣篮腾空、英雄气质"的热血视觉，引导用户报名/订阅。非电商。

## 受众
篮球爱好者、街球/扣篮文化人群、青少年与年轻潮流用户。审美偏热血、张扬、撞色、动感。

## 品牌
- 未提供真实品牌/球星素材。使用合理占位品牌名：**飞跃 FLYDUNK**（标语：腾空即巅峰 / RISE ABOVE）。
- 自绘 SVG 漫画插画与 logo 占位，避免侵权。

## Design Read（design-taste-frontend）
**Reading this as:** consumer/event landing for 篮球扣篮文化人群, with an American-comic / 半调网点 (halftone) + 粗描边 + speed-lines language, leaning toward 原生 CSS + Tailwind utilities + 自绘 SVG comic 插画 + anime.js 轻动效（滚动 reveal + 拟声词弹入）.

### 三档位
- `DESIGN_VARIANCE: 9` —— 漫画分镜本身就是非对称、撞角、错位构图。
- `MOTION_INTENSITY: 6` —— 入场/滚动 reveal、speed lines、数字滚动、拟声词弹入；尊重 reduced-motion。
- `VISUAL_DENSITY: 4` —— 大字标题 + 留白让插画与撞色呼吸，分镜区可稍密。

### 反模板纪律
- 不用 AI 紫渐变、不用居中 hero+深色 slate 套路、不用三张等宽白卡。
- 用美式 comic 配色：高饱和撞色（电光蓝 / 烈焰橙红 / 明黄）+ 纸张米白底 + 纯黑粗描边。
- 半调网点（CSS radial-gradient 点阵）、speed lines（SVG/CSS 斜线）、拟声词（BOOM/SLAM/SWISH）。
- 排版禁用 em-dash 作装饰。

## 页面结构（单页）
1. 顶部 comic 导航条（粗描边 + logo + 锚点 + CTA）
2. **Hero**：大字标题 + 飞人扣篮 SVG 插画 + 拟声词 + 主 CTA（漫画对话框/爆炸贴纸感）
3. 英雄亮点 / 能力数值（弹跳力/滞空/速度/命中，雷达/数值卡，comic 面板）
4. 招牌动作 / 连环画分镜（3-4 格 comic panel，分镜讲一次扣篮）
5. 数据战绩（大数字滚动统计，撞色面板）
6. 画廊（飞人动作 SVG 网格，halftone 底）
7. 报名 / 订阅 CTA（comic 表单，对话框风格）
8. 页脚（粗描边、社媒占位、版权）

## 适配（PC / Pad / H5）
- 断点：H5 ≤767，Pad 768–1023，PC ≥1024。
- Hero 移动端单列、插画下移；分镜移动端纵向堆叠。
- 触控热区 ≥44px；不依赖 hover（hover 效果都有非 hover 基础态）。
- Pad 横竖屏可用；H5 首屏优先标题+CTA。

## 风格关键词
American comic / pop-art halftone / 粗黑描边 / 撞色 / speed lines / 拟声词 / 动感倾斜面板 / 英雄气质。

## 状态
- Design Read 与档位已定 ✅
- 结构已定 ✅
- 素材策略：自绘 SVG 占位（见 ASSETS.md）✅
- API：本站为纯宣传页，报名/订阅走 mock，无强依赖（见 API.md）✅
- 预览：vite，端口 4282 ✅
- Readiness Gate：**通过**，可进入实现。
