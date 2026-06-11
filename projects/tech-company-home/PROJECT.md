# 科技公司官网首页 · 智核科技 Nexus AI

- **Slug**：`tech-company-home`
- **类型**：科技公司官网首页 / Landing（vite-page 模板）
- **状态**：active（默认方案，可预览交付）
- **创建来源**：main agent 转交「设计一个科技公司主页」

## 概述

虚构企业级 AI 基础设施公司「智核科技 Nexus AI」官网首页，深色科技风，含完整营销板块。

## 板块

导航 → Hero → 信任栏 → 产品/服务(4) → 核心特性(6) → 数据指标(4) → 团队(4) → CTA(留资表单) → 页脚

## 技术

- 单页面 + Vite 本地预览
- Tailwind CDN + Lucide（无第三方 UI 库）
- 深色 indigo→cyan 渐变科技风
- PC / Pad / H5 自适应（导航汉堡菜单 + 栅格响应）
- 锚点平滑滚动，CTA 表单前端演示占位

## 关键文件

- `src/generated/page.js`：首页主体（全部板块 + 交互）
- `src/main.js`：挂载到 `#app`
- `index.html`：CDN + 深色基底 + SEO meta
- `.webgen/config.json`：预览端口 `4267`

## 预览

```sh
cd projects/tech-company-home
pnpm install
pnpm dev   # 端口 4267（见 .webgen/config.json）
```

## 当前状态 / Blocker

- 无 blocker（默认方案）。
- 公司名/文案/logo/品牌色均为占位，提供真实素材后可替换为正式版。
- CTA 表单为前端演示，需要时接 `POST /api/leads`。
