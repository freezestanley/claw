# HANDOFF.md — girls-bow-store

## 当前状态

- 已完成 Discovery + Readiness Gate，已实现单页面（PC 优先，PC/Pad/H5 适配）。
- 未 build（按工作区约定：开发完成先追问用户「是否还有修改」，确认后再打包）。

## 改了哪些文件 / 文件在哪

- `projects/girls-bow-store/index.html` — 页面壳、字体、Tailwind 主题色、SEO meta
- `projects/girls-bow-store/src/main.js` — 全部页面内容（商品数据 + SVG 蝴蝶结 + 交互 + 动效）
- `projects/girls-bow-store/src/style.css` — 自定义样式（按钮 / 阴影 / 动画 / reduced-motion）
- `projects/girls-bow-store/.webgen/config.json` — 预览端口 4276、断点、素材/API 状态
- `projects/girls-bow-store/.webgen/session-lock.json` — session 锁定本项目
- `PROJECT.md / DISCOVERY.md / ASSETS.md / API.md`

## 如何预览

```bash
cd projects/girls-bow-store
pnpm install
pnpm dev        # http://127.0.0.1:4276/
```

构建（用户确认后再执行）：

```bash
pnpm build      # 产出 dist/ 与 dist.zip
```

## Blocker / 剩余风险

- **视觉模型(image) 403 不可用**：真实氛围图贴题性未自动核对，已在 ASSETS.md 标「⚠️ 待核」；产品主视觉改用自绘 SVG 蝴蝶结规避破图与跑题风险。请预览时确认真实图是否合适。
- 真实图为外网 CDN 热链，离线/内网环境可能不可见（SVG 部分不受影响）。
- 无真实后端：订阅为前端 mock。
