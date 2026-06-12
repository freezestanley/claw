# HANDOFF.md — 死神来了4

## 当前进度
- 已完成项目脚手架、文档、`index.html` 单页实现。
- session 锁定 slug = `final-destination-4`。

## 文件
- `index.html` — 全部页面结构 + 样式 + 倒计时/动效脚本（自包含）。
- `src/main.js` — 预留入口（当前页面逻辑内联在 index.html，main.js 仅占位）。
- `vite.config.js` — 预览端口 4480（通过 PORT 环境变量）。

## 预览
```
cd projects/final-destination-4
pnpm install
PORT=4480 pnpm dev   # http://127.0.0.1:4480/
```

## 剩余风险 / 待办
- 上映日期为占位「2026-10-31」，倒计时按此计算；确认后可改。
- 购票/预约 CTA 为占位 `#`，需接真实票务链接。
- 所有图为自绘 SVG 占位，如需真实物料需用户提供授权素材。
