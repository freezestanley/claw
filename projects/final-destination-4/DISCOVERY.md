# DISCOVERY.md — 死神来了4

## Design Read
Reading this as: **event/movie promo landing for a horror-film audience**, with a **dark-cinematic / fatalistic（宿命）language**, leaning toward **native CSS + Tailwind utilities + cinematic motion**（倒计时、噪点颗粒、血渍/裂痕纹理）。

## 三档位
- `DESIGN_VARIANCE: 8`（非对称、错位排版，营造不安感）
- `MOTION_INTENSITY: 7`（入场、倒计时、纹理浮动；reduced-motion 降级）
- `VISUAL_DENSITY: 4`（留白制造压迫，重点突出片名与倒计时）

## 目标 / 用户
- 目标：传达恐怖、宿命、紧迫感，引导用户记住上映日期并点击购票/预约 CTA。
- 用户：恐怖片观众、影迷、票务平台跳转人群。

## 结构
见 PROJECT.md 模块顺序。

## 风格语言
- 配色：near-black `#070708` 背景 + 血红 `#8b0000` / 猩红 `#c81212` 强调 + 冷灰 `#9aa0a6`。
- 纹理：噪点（SVG feTurbulence）、血渍/喷溅（径向渐变 + SVG）、裂痕（SVG path）。
- 字体：衬线标题（思源宋体 / Noto Serif SC 系统回退）营造庄重宿命感 + 无衬线正文。
- 倒计时：等宽数字，红色发光，宿命主题文案。

## 适配
- 断点：H5 ≤767 / Pad 768–1023 / PC ≥1024。
- 触控热区 ≥44px；CTA、倒计时块在 H5 优先首屏；hover 效果均有非 hover 兜底。
- Pad 横竖屏可用。

## Readiness Gate
- 素材：全部 inline-SVG / CSS 占位，无 blocker。
- API：无（纯静态前端倒计时），无 blocker。
- 预览：Vite，端口 4480。
- 适配目标已明确。
- ✅ 可进入最终实现。
