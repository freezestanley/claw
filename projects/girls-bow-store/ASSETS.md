# ASSETS.md — girls-bow-store

## 素材策略

用户未提供任何素材；允许去线上找可商用免授权图（Unsplash / Pexels）。
但本环境 **视觉模型(image)当前 403 不可用**，无法对真实图做贴题性自动核对。
因此按 AGENTS.md「找不到可用真实图（或校验不过）时退化为自绘 SVG」原则：

- **产品主视觉（蝴蝶结本体）→ 用程序化内联 SVG 蝴蝶结**：绝对贴题、零破图、可换色，作为商品橱窗与 Hero 主图。这是当前最稳的「贴题」方案。
- **氛围 / lookbook / 故事背景 → 用已 curl 校验的真实图**，但**贴题性待人工核对**（视觉模型不可用）。预览时请孟老板确认，不贴题随时换 URL。

## SVG 蝴蝶结（主视觉，自绘，贴题确定）

- Hero 大蝴蝶结、单品卡蝴蝶结、系列卡蝴蝶结：均为内联 SVG，配色随品牌色板变化。
- 状态：✅ 确定贴题，无外链依赖。

## 真实图清单（已 curl 校验 200 + image/*；贴题性待人工核对 ⚠️）

| 用途 | URL | HTTP | 贴题核对 |
|------|-----|------|----------|
| Hero 背景氛围(粉色柔光) | https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1400&q=80 | 200 image/jpeg | ⚠️ 待核 |
| 品牌故事图(缎带/礼物氛围) | https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1100&q=80 | 200 image/jpeg | ⚠️ 待核 |
| Lookbook L1(礼盒蝴蝶结) | https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1000&q=80 | 200 image/jpeg | ⚠️ 待核 |
| Lookbook L2 | https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1000&q=80 | 200 image/jpeg | ⚠️ 待核 |
| Lookbook L3 | https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000&q=80 | 200 image/jpeg | ⚠️ 待核 |
| Lookbook L4 | https://images.unsplash.com/photo-1546877625-cb8c71916608?w=1000&q=80 | 200 image/jpeg | ⚠️ 待核 |

> **2026-06-11 修正（taste audit）**：原 3 张 Pexels lookbook 图虽 curl 返回 200，但在浏览器 CDP 中 `naturalWidth=0` 破图（Pexels 热链/referer 限制）。已全部换为 Unsplash CDN 图并在 CDP 复验：**6/6 图全部加载、零破图**。经验：curl-200 ≠ 浏览器可渲染，需以 CDP `naturalWidth>0` 为准。
> 说明：选用的真实图偏「礼物缎带 / 蝴蝶结 / 粉色氛围」，与发饰蝴蝶结主题相邻但非完全等同；
> 因视觉模型不可用，建议孟老板在预览时逐张确认；如不贴题，告诉我即可替换为更准的发饰图。

## 字体（CDN）

- Fraunces / Poppins / Noto Sans SC — Google Fonts。

## 部署提醒

- 真实图为外网 CDN 热链，交付时依赖外网；如需完全自托管，再下载进 `dist/assets` 并改引用。
- SVG 蝴蝶结为内联，无外链，离线可用。
