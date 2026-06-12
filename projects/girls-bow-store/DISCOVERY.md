# DISCOVERY.md — girls-bow-store

> 用户需求原文：「再生成一个女生蝴蝶结的 pc 网店」。其余风格/品牌/商品范围未指定，按合理默认收敛（参考既有 hair-clip-store 女生饰品风格），无硬阻塞，自行推进。

## 1. 页面目标

- 展示一个女生蝴蝶结 / 缎带发饰品牌网店首页。
- 传达甜美、温柔、少女、精致的品牌气质。
- 引导浏览商品 → 关注/订阅（展示用，无真实下单后端）。

## 2. 目标用户

- 学生女孩、甜系/法式/韩系穿搭爱好者。
- 喜欢发饰、蝴蝶结、缎带、珍珠等小饰品的女生。
- 设备：以 **PC 桌面浏览**为主，兼顾 Pad 与手机。

## 3. 页面结构（单页 / 锚点分区）

1. 顶部公告条（上新滚动）
2. 导航（品牌名 + 锚点 + 关注按钮）
3. Hero：主标语 + 蝴蝶结主视觉（SVG 大蝴蝶结）+ 数据点
4. 品牌故事（Our Story）
5. 系列 / 材质（缎带 / 丝绒 / 珍珠，SVG 蝴蝶结风格卡）
6. 单品橱窗（人气蝴蝶结单品网格，SVG 蝴蝶结 + 文案）
7. Lookbook 氛围图墙（真实图，待人工核对）
8. 关注我们（邮箱订阅，展示用）
9. 页脚

## 4. 风格 / 视觉

- 调性：甜美法式少女、奶油+樱花粉+酒红丝带。
- 色板：
  - blush 樱花粉 `#f7d9e3`
  - rose 玫瑰 `#e8859b`
  - wine 酒红丝带 `#a23b56`
  - cream 奶油底 `#fdf6f4`
  - ink 深褐字 `#4a2230`
- 字体：Display 用 Fraunces（衬线，法式优雅）；正文 Poppins + Noto Sans SC。
- 动效：anime.js 滚动入场 + 浮动徽标 + hover；尊重 prefers-reduced-motion。

## 5. PC / Pad / H5 适配

- 断点：H5 ≤767，Pad 768–1023，PC ≥1024。
- PC 为主视觉：大 Hero 双栏、多列商品网格（PC 3 列）。
- Pad：2 列网格，横竖屏可用。
- H5：单列、首屏标语优先，触控热区 ≥44px，无 hover 依赖。

## 设计品味（taste-skill v2 / design-taste-frontend）

> 2026-06-11：安装 `design-taste-frontend` 后，对本项目跑 Design Read + audit。

### Design Read
**Reading this as:** 甘系法式少女蝴蝶结发饰 PC 网店首页，面向学生/甜系穿搭爱好者，采用「奶油粉 + 酒红丝带的法式甜美」语言，倾向 Tailwind utilities + Fraunces 衡线体 + 克制滚动动效的设计体系（非现成 UI 框架，属 aesthetic-as-system）。

### 三档位（本项目采用值）
- **DESIGN_VARIANCE: 6** — 甘系售卖站需干净可信，不走 Awwwards 极端偏移；Hero 双栏 + lookbook 不均等拼图已提供适度变化。
- **MOTION_INTENSITY: 4** — 滚动入场 + 蝴蝶结轻摆 + hover，不做重型滚动劫持；尊重 reduced-motion。
- **VISUAL_DENSITY: 3** — 甜系需呼吸感/留白，信息不堆砸。

### 现状档位读取（existing site）
现有建物 ~ VARIANCE 6 / MOTION 4 / DENSITY 3，**与目标档位一致** → 判定为 **Redesign–Preserve（保留品牌、渐进演化）**，非推倒重做。

### Audit 发现
- **保留**：调性准确（奶油+樱花粉+酒红丝带）、程序化 SVG 蝴蝶结主视觉（绝对贴题零破图）、Fraunces 衡线体、锅点 IA（品牌故事/系列/单品/Lookbook/关注）、H1→H2→H3 层级清晰、完整 PC/Pad/H5 断点 + 触控热区 + reduced-motion 降级。
- **修正（已处理）**：3 张 Pexels lookbook 图浏览器破图（热链限制）→ 全部换为已 CDP 复验的 Unsplash 图，现 **6/6 零破图**。
- **anti-slop 检查**：无 AI 紫渐变、无千篇一律 glassmorphism、无无限循环动效、未用 Inter/slate-900 默认色。符合品味纪律。
- **待核（低优先）**：真实图贴题性因视觉模型 403 未能自动核对，截图已存于 `.webgen/audit/`，请人工确认；若不贴题随时换 URL。

## Readiness Gate 状态

- [x] 页面目标 / 用户 / 结构 / 风格已澄清
- [x] 素材策略已定（SVG 蝴蝶结主视觉 + 真实氛围图，见 ASSETS.md）
- [x] API：纯展示，无真实后端，订阅为前端 mock（见 API.md）
- [x] 预览方式 / 端口 / 代理 / 依赖命令已定（见 .webgen/config.json）
- [x] PC/Pad/H5 适配目标与断点已定
- 结论：**无硬阻塞，进入实现。**
